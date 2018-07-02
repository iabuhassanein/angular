import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';

// Object
// import { Session } from '../../objects/session';
import { News } from '../../objects/news';

// Services
import { ValidationService } from '../../common/services/validation.service';
import { AlertService } from '../../shared/services/alert.service';
import { MainService } from '../services/main.service';


@Component({
    moduleId: module.id,
    selector: 'content-single',
    templateUrl: './content.template.html',
    providers: [MainService, ValidationService]
})

export class ContentComponent {
    isLoggindInb: boolean = false;
    post: News;
    postID: number;
    message: any;
    subscribtion: any;
    constructor(
        private _authService: AuthenticationService,
        private _alertService: AlertService,
        private _mainService: MainService,
        private _router: ActivatedRoute,
    ) { }
    
    ngOnInit(){
        if (this._authService.check('currentUser')) {
            this.isLoggindInb = true;
        }
        this.subscribtion = this._router.params.subscribe(params => {
            this.postID = +params['id'];
        });
        this._mainService.getPost(this.postID).subscribe(
            result => {
                if (result.status) {
                    this.post = result.data;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            });
    }
}

