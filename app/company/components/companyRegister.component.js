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
var registerCompany_service_1 = require('./../services/registerCompany.service');
var validation_service_1 = require('../../common/services/validation.service');
var alert_service_1 = require('../../shared/services/alert.service');
var authentication_service_1 = require("../../shared/services/authentication.service");
var CompanyRegisterComponent = (function () {
    function CompanyRegisterComponent(_fb, _router, _authService, _registerService, _alertService, _route) {
        this._fb = _fb;
        this._router = _router;
        this._authService = _authService;
        this._registerService = _registerService;
        this._alertService = _alertService;
        this._route = _route;
        this._base_url = "http://kfupmf.mmed.email/backend/public/api/";
        this._base_url_img = "http://kfupmf.mmed.email/backend/public/";
        this.logoRequired = false;
        this.isRegistering = false;
    }
    CompanyRegisterComponent.prototype.ngOnInit = function () {
        var returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        this.companyRegister = this._fb.group({
            companyName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100), validation_service_1.ValidationService.string])],
            companyAddress: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.string])],
            companyCountry: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.string])],
            companyCity: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.string])],
            companyBox: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.numeric])],
            companyZipCode: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.numeric])],
            companyWebsite: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.url])],
            companyAbout: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(160)])],
        });
        this.userRegister = this._fb.group({
            userName: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.string])],
            userPostion: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.string])],
            userEmail: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.email])],
            userMobile: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.numeric])],
            userPhone: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.numeric])],
            userFax: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.numeric])]
        });
        this.companyCoordinator = this._fb.group({
            login: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(16), validation_service_1.ValidationService.noSpace, validation_service_1.ValidationService.alphaNumUnder])],
            password: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.password])],
        });
        this.registerConditions = this._fb.group({
            term: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.accepted])]
        });
        if (this._authService.check('currentUser') && this._authService.check('profile')) {
            this._alertService.success('You Are Already Logged in');
            if (returnUrl != '/')
                this._router.navigate([returnUrl]);
            var session = this._authService.getSession();
            var url = this.getProfileURL(session.role);
            this._router.navigate([url]);
            return;
        }
        // if (this.companyRegister.valid && this.userRegister.valid && this.companyCoordinator.valid) {
        //     this.allNotValid = false;
        // } else {
        //     this.allNotValid = true;
        // }
    };
    CompanyRegisterComponent.prototype.OpenCompanyIconUpload = function () {
        var elem = document.getElementById('companyLogoInput');
        if (elem && document.createEvent) {
            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", true, false);
            elem.dispatchEvent(evt);
        }
    };
    // appendHtml(document.body, html);
    CompanyRegisterComponent.prototype.UploadCompanyLogo = function (event) {
        var _this = this;
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file = fileList[0];
            var subscribe = this._registerService.uploadLogo(file).subscribe(function (logoName) {
                _this.logo = logoName.fileName;
                var image = document.createElement('img');
                image.src = _this._base_url_img + 'image/150x150/' + _this.logo;
                var div = document.getElementById('logo_container');
                div.innerHTML = "";
                div.appendChild(image);
            });
        }
    };
    CompanyRegisterComponent.prototype.companyRegisterSubmit = function () {
        var _this = this;
        if (!(this.logo)) {
            this._alertService.error("You Must Upload Company Logo");
            this.logoRequired = true;
            return;
        }
        if (!this.companyRegister.valid)
            return;
        this.company = {
            englishName: this.companyRegister.controls['companyName'].value,
            arabicName: this.companyRegister.controls['companyName'].value,
            address: this.companyRegister.controls['companyAddress'].value,
            city: this.companyRegister.controls['companyCity'].value,
            poBox: this.companyRegister.controls['companyBox'].value,
            country: this.companyRegister.controls['companyCountry'].value,
            zipCode: this.companyRegister.controls['companyZipCode'].value,
            website: this.companyRegister.controls['companyWebsite'].value,
            englishAbout: this.companyRegister.controls['companyAbout'].value,
            arabicAbout: this.companyRegister.controls['companyAbout'].value,
            logo: this.logo
        };
        this.user = {
            firstName: this.userRegister.controls['userName'].value,
            lastName: '',
            login: this.companyCoordinator.controls['login'].value,
            password: this.companyCoordinator.controls['password'].value,
            phone: this.userRegister.controls['userPhone'].value,
            email: this.userRegister.controls['userEmail'].value,
            userRole: 'ROLE_COMPANY_COORDINATOR'
        };
        this.coordinator = {
            mobile: this.userRegister.controls['userMobile'].value,
            position: this.userRegister.controls['userPostion'].value,
            fax: this.userRegister.controls['userFax'].value,
            company: this.company,
            userInfo: this.user
        };
        this.isRegistering = true;
        this._registerService.createCompanyAccount(this.coordinator).subscribe(function (result) {
            if (result.status) {
                _this._alertService.success(result.message, 6000, 'dark');
                setTimeout(function () {
                    _this._router.navigate(['/login'], { queryParams: { returnUrl: '/company' } });
                }, 3000);
            }
            else {
                _this._alertService.error(result.message, 15000);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.isRegistering = false;
        }, function () {
            _this.isRegistering = false;
            return;
        });
    };
    CompanyRegisterComponent.prototype.getProfileURL = function (type) {
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
    CompanyRegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'companyReg',
            templateUrl: 'companyRegister.template.html',
            providers: [registerCompany_service_1.RegisterCompanyService, validation_service_1.ValidationService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, authentication_service_1.AuthenticationService, registerCompany_service_1.RegisterCompanyService, alert_service_1.AlertService, router_1.ActivatedRoute])
    ], CompanyRegisterComponent);
    return CompanyRegisterComponent;
}());
exports.CompanyRegisterComponent = CompanyRegisterComponent;
//# sourceMappingURL=companyRegister.component.js.map