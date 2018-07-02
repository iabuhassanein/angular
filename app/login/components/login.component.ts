import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { ValidationService } from '../../common/services/validation.service';
import { LoginService } from '../services/login.service';
import { AlertService } from '../../shared/services/alert.service';
import { AuthenticationService } from '../../shared/services/authentication.service';

// Objects
import { UserInfo } from '../../objects/userInfo';
import { Session } from '../../objects/session';

@Component({
    moduleId: module.id,
    selector: 'login',
    providers: [ValidationService, LoginService],
    template: `
    
<section class="header-section">
    <div class="container">
        <ng-header></ng-header>
    </div>
</section>
<section class="s_4">
    <div class="container">
    <div class="row">

                <div class="bg-white marg-bottom">
                    <h3><span class="icon-portfolio"></span> Login</h3>
                    <div class="col-md-12">
                        <form class="new-form-b" [formGroup]="loginForm">
                            <div class="form-group">
                                <label for="login">Username:</label>
                                <div class="input">
                                    <input name="login" formControlName="login" #login id="login" type="text" class="form-control">
                                    <control-messages [control]="loginForm.controls.login"></control-messages>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="password">Password:</label>
                                <div class="input">
                                    <input name="password" formControlName="password" id="password" #password type="password" class="form-control">
                                    <control-messages [control]="loginForm.controls.password"></control-messages>
                                </div>
                                
                            </div>
                        </form>
                        <div class="txt-center login-btn">
                                <button class="btn new-green" [class.submit-btn-loader]="loadingLogin" [disabled]="loadingLogin || (!loginForm.valid)" (click)="loginProcess()">Login <i class="fa fa-cog fa-spin fa-3x fa-fw loader-icon"></i></button>
                            </div>
                    </div>
                </div>
        </div>
    </div>
</section>
    `
})
export class LoginComponent {
    loadingLogin: boolean = false;
    user: UserInfo;
    returnUrl: string;
    loginForm: FormGroup;
    constructor(
        private _fb: FormBuilder,
        private _loginService: LoginService,
        private _alertService: AlertService,
        private _authtService: AuthenticationService,
        private router: Router,
        private _route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        this.loginForm = this._fb.group({
            login: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(16), ValidationService.noSpace])],
            password: ['', Validators.compose([Validators.required])],
        });
        if (this._authtService.check('currentUser') && this._authtService.check('profile')) {
            this._alertService.success('You Are Already Logged in');
            // let session: Session = this._authtService.getSession();
            // let url = this.getProfileURL(session.role);
            // this.router.navigate([url]);
            // return;
        }

    }

    loginProcess() {
        // this._alertService.success("Loading...");
        this.loadingLogin = true;
        this.user = {
            login: this.loginForm.controls['login'].value,
            password: this.loginForm.controls['password'].value
        }
        this._loginService.loginProccess(this.user).subscribe(
            loginStatus => {
                this.loadingLogin = false;
                if (loginStatus) this.router.navigate([this.returnUrl]);
            },
            error => {
                this._alertService.error("Internal Error, Please Refresh Page");
                this.loadingLogin = false;
            }
        );
    }

    getProfileURL(type: string): string {
        switch (type) {
            case "ROLE_ADMIN":
                return '/admin';
            case "ROLE_TRAINING_DEPARTMENT":
                return '/training-department';
            case "ROLE_COMPANY_COORDINATOR":
                return '/company';
            case "ROLE_SUPERVISOR":
                return '/supervisor';
            case "ROLE_ACADEMIC_DEPARTMENT":
                return '/academic-department';
            case "ROLE_TRAINING_ADVISOR":
                return '/training-advisor';
            case "ROLE_STUDENT":
                return '/student';
            default:
                return '/';
        }
    }
}