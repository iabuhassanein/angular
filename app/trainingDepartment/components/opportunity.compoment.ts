import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { OpportunityService } from './../services/opportunity.service';
import { ActivatedRoute } from '@angular/router';

// Objects
import { CompanyOpportunity } from '../../objects/companyOpportunity';
import { OpportunityComment } from '../../objects/opportunityComment';

import { AlertService } from '../../shared/services/alert.service';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'view-opptd',
    templateUrl: 'opportunity.template.html',
    providers: [OpportunityService]
})

export class OpportunityComponent {
    private _base_url = "http://kfupmf.mmed.email/backend/public/api/";
    private _base_url_img = "http://kfupmf.mmed.email/backend/public/";
    opportunity: CompanyOpportunity = null;
    oppID: number;
    subscribtion: any;
    addCommentForm: FormGroup;
    comments: OpportunityComment[] = [];
    isCommenting: boolean = false;

    constructor(
        private _ADService: OpportunityService,
        private _alertService: AlertService,
        private _authService: AuthenticationService,
        private _router: ActivatedRoute,
        private _fb: FormBuilder
    ) { }

    ngOnInit() {
        this.addCommentForm = this._fb.group({
            commentBody: ['', Validators.compose([Validators.required, Validators.maxLength(512)])],
        });
        this.subscribtion = this._router.params.subscribe(params => {
            this.oppID = +params['id'];
        });
        this._ADService.getOpportunity(this.oppID).subscribe(

            result => {
                if (result.status) {
                    this.opportunity = result.data;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            });
        this.getOpportunityComments();
    }

    getOpportunityComments() {
        this._ADService.getOpportunityComments(this.oppID).subscribe(
            result => {
                if (result.status) {
                    this.comments = result.data;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            });
    }
    ngOnDestroy() {
        this.subscribtion.unsubscribe();
    }

    addNewComment() {

        let comment: OpportunityComment = {
            oppID: this.opportunity.id,
            comment: this.addCommentForm.controls['commentBody'].value
        }
        this.isCommenting = true;
        this._ADService.createOpportunityComment(comment).subscribe(
            result => {
                if (result.status) {
                    this._alertService.success(result.message);
                    this.addCommentForm.reset({ commentBody: '' });
                    this.getOpportunityComments();
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
                this.isCommenting = false;
            },
            () => {
                this.isCommenting = false;
                return;
            });
    }

    RequestMoreInfo() {
        this._alertService.success('We Request New Information');
    }
    
    ApproveOpp() {
        this._ADService.approveOppertunity(this.oppID).subscribe(
            result => {
                if (result.status) {
                    this._alertService.success(result.message);
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
                this.isCommenting = false;
            });

    }
}