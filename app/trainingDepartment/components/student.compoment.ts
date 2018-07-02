import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// Services
import { AlertService } from '../../shared/services/alert.service';
import { ReportService } from '../services/report.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { ValidationService } from '../../common/services/validation.service';
import { StudentService } from './../services/student.service';

declare var $: any;

// Objects
import { AppliedOpportunity } from '../../objects/appliedOpportunity';
import { Student } from '../../objects/student';
import { StudentComment } from '../../objects/StudentComment';



@Component({
    moduleId: module.id,
    selector: 'td-student',
    templateUrl: 'student.template.html',
    providers: [StudentService, ValidationService]
})

export class StudentComponent {
    private _base_url = "http://kfupmf.mmed.email/backend/public/api/";
    private _base_url_img = "http://kfupmf.mmed.email/backend/public/";
    stdID: number;
    student: Student;
    subscribtion: any;
    addCommentForm: FormGroup;
    opps_data: AppliedOpportunity[] = [];
    comments: StudentComment[] = [];
    stdLogs: any [] = [];
    isCommenting: boolean = false;
    constructor(
        private _studentService: StudentService,
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
            this.stdID = +params['id'];
        });
        this._studentService.getStudent(this.stdID).subscribe(
            result => {
                if (result.status) {
                    this.student = result.data;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            });
        this._studentService.getStudentLogs(this.stdID).subscribe(
            result => {
                if (result.status) {
                    this.stdLogs = result.data;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            });
        this._studentService.getStudentOpportunities(this.stdID).subscribe(
            result => {
                if (result.status) {
                    this.opps_data = result.data;
                    setTimeout(function () {
                        $(".curs-po").click(function () {
                            $(this).parent().find(".accordion-section-content").toggle("fast");
                        });
                    }, 1500);
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            });

        this.getStudentComments();
    }
    ngAfterViewInit() {
    }

    addNewComment() {

        let comment: StudentComment = {
            stdID: this.stdID,
            comment: this.addCommentForm.controls['commentBody'].value
        }
        this.isCommenting = true;
        this._studentService.createStudentComment(comment).subscribe(
            result => {
                if (result.status) {
                    this._alertService.success(result.message);
                    this.addCommentForm.reset({ commentBody: '' });
                    this.getStudentComments();
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

    getStudentComments() {
        this._studentService.getStudentComments(this.stdID).subscribe(
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
}