"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
// Services
var validation_service_1 = require('../../common/services/validation.service');
var login_service_1 = require('../services/login.service');
var alert_service_1 = require('../../shared/services/alert.service');
var authentication_service_1 = require('../../shared/services/authentication.service');
var LoginComponent = (function () {
    function LoginComponent(_fb, _loginService, _alertService, _authtService, router, _route) {
        this._fb = _fb;
        this._loginService = _loginService;
        this._alertService = _alertService;
        this._authtService = _authtService;
        this.router = router;
        this._route = _route;
        this.loadingLogin = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        this.loginForm = this._fb.group({
            login: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(16), validation_service_1.ValidationService.noSpace, validation_service_1.ValidationService.alphaNumUnder])],
            password: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.password])],
        });
        if (this._authtService.check('currentUser') && this._authtService.check('profile')) {
            this._alertService.success('You Are Already Logged in');
            var session = this._authtService.getSession();
            var url = this.getProfileURL(session.role);
            this.router.navigate([url]);
            return;
        }
    };
    LoginComponent.prototype.loginProcess = function () {
        var _this = this;
        // this._alertService.success("Loading...");
        this.loadingLogin = true;
        this.user = {
            login: this.loginForm.controls['login'].value,
            password: this.loginForm.controls['password'].value
        };
        this._loginService.loginProccess(this.user).subscribe(function (loginStatus) {
            _this.loadingLogin = false;
            if (loginStatus)
                _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            _this._alertService.error("Internal Error, Please Refresh Page");
            _this.loadingLogin = false;
        });
    };
    LoginComponent.prototype.getProfileURL = function (type) {
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
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            providers: [validation_service_1.ValidationService, login_service_1.LoginService],
            template: "\n    \n<section class=\"header-section\">\n    <div class=\"container\">\n        <ng-header></ng-header>\n    </div>\n</section>\n<section class=\"s_4\">\n    <div class=\"container\">\n    <div class=\"row\">\n\n                <div class=\"bg-white marg-bottom\">\n                    <h3><span class=\"icon-portfolio\"></span> Login</h3>\n                    <div class=\"col-md-12\">\n                        <form class=\"new-form-b\" [formGroup]=\"loginForm\">\n                            <div class=\"form-group\">\n                                <label for=\"login\">Username:</label>\n                                <div class=\"input\">\n                                    <input name=\"login\" formControlName=\"login\" #login id=\"login\" type=\"text\" class=\"form-control\">\n                                    <control-messages [control]=\"loginForm.controls.login\"></control-messages>\n                                </div>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"password\">Password:</label>\n                                <div class=\"input\">\n                                    <input name=\"password\" formControlName=\"password\" id=\"password\" #password type=\"password\" class=\"form-control\">\n                                    <control-messages [control]=\"loginForm.controls.password\"></control-messages>\n                                </div>\n                                \n                            </div>\n                        </form>\n                        <div class=\"txt-center login-btn\">\n                                <button class=\"btn new-green\" [class.submit-btn-loader]=\"loadingLogin\" [disabled]=\"loadingLogin || (!loginForm.valid)\" (click)=\"loginProcess()\">Login <i class=\"fa fa-cog fa-spin fa-3x fa-fw loader-icon\"></i></button>\n                            </div>\n                    </div>\n                </div>\n        </div>\n    </div>\n</section>\n    "
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, login_service_1.LoginService, alert_service_1.AlertService, authentication_service_1.AuthenticationService, router_1.Router, router_1.ActivatedRoute])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map