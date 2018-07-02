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
// Services
var authentication_service_1 = require("../../shared/services/authentication.service");
var registerCompany_service_1 = require('./../services/registerCompany.service');
var validation_service_1 = require('../../common/services/validation.service');
var alert_service_1 = require('../../shared/services/alert.service');
var ProfileComponent = (function () {
    function ProfileComponent(_fb, _authService, _alertService, _registerService) {
        this._fb = _fb;
        this._authService = _authService;
        this._alertService = _alertService;
        this._registerService = _registerService;
        this._base_url = "http://kfupmf.mmed.email/backend/public/api/";
        this._base_url_img = "http://kfupmf.mmed.email/backend/public/";
        this.logoRequired = false;
        this.isUpdatingP = false;
        this.isUpdatingU = false;
    }
    ProfileComponent.prototype.ngOnInit = function () {
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
        var profile = this._authService.getProfile();
        if (profile) {
            this.companycoordinator = profile;
        }
        else {
            return;
        }
        this.companyRegister.reset({
            companyName: this.companycoordinator.company.englishName,
            companyAddress: this.companycoordinator.company.address,
            companyCountry: this.companycoordinator.company.country,
            companyCity: this.companycoordinator.company.city,
            companyBox: this.companycoordinator.company.poBox,
            companyZipCode: this.companycoordinator.company.zipCode,
            companyWebsite: this.companycoordinator.company.website,
            companyAbout: this.companycoordinator.company.englishAbout,
        });
        this.userRegister.reset({
            userName: this.companycoordinator.user_info.firstName,
            userPostion: this.companycoordinator.position,
            userEmail: this.companycoordinator.user_info.email,
            userMobile: this.companycoordinator.mobile,
            userPhone: this.companycoordinator.user_info.phone,
            userFax: this.companycoordinator.fax
        });
        this.companyCoordinator.reset({
            login: this.companycoordinator.user_info.login,
            password: ''
        });
        if (this.companycoordinator.company.logo) {
            this.logo = this.companycoordinator.company.logo;
            var image = document.createElement('img');
            image.src = this._base_url_img + 'image/150x150/' + this.companycoordinator.company.logo;
            var div = document.getElementById('logo_container');
            div.innerHTML = "";
            div.appendChild(image);
        }
    };
    ProfileComponent.prototype.OpenCompanyIconUpload = function () {
        var elem = document.getElementById('companyLogoInput');
        if (elem && document.createEvent) {
            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", true, false);
            elem.dispatchEvent(evt);
        }
    };
    // appendHtml(document.body, html);
    ProfileComponent.prototype.UploadCompanyLogo = function (event) {
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
                _this.logoRequired = false;
            });
        }
    };
    ProfileComponent.prototype.companyUpdateProfile = function () {
        var _this = this;
        if (!(this.logo)) {
            this._alertService.error("You Must Upload Company Logo");
            this.logoRequired = true;
            return;
        }
        if (!this.companyRegister.valid)
            return;
        this.isUpdatingP = true;
        this.company = {
            id: this.companycoordinator.company.id,
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
        this._registerService.updateCompany(this.company).subscribe(function (result) {
            if (result.status) {
                _this._alertService.success(result.message);
                _this._authService.updateProfile(result.profile);
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.isUpdatingP = false;
        }, function () {
            _this.isUpdatingP = false;
            return;
        });
    };
    ProfileComponent.prototype.userUpdateProfile = function () {
        var _this = this;
        if (!this.userRegister.valid)
            return;
        this.isUpdatingU = true;
        this.user = {
            id: this.companycoordinator.user_info.id,
            firstName: this.userRegister.controls['userName'].value,
            lastName: '',
            phone: this.userRegister.controls['userPhone'].value,
            email: this.userRegister.controls['userEmail'].value
        };
        this.coordinator = {
            id: this.companycoordinator.id,
            mobile: this.userRegister.controls['userMobile'].value,
            position: this.userRegister.controls['userPostion'].value,
            fax: this.userRegister.controls['userFax'].value,
            userInfo: this.user
        };
        this._registerService.updateCompanyCoordinator(this.coordinator).subscribe(function (result) {
            if (result.status) {
                _this._alertService.success(result.message);
                _this._authService.updateProfile(result.profile);
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.isUpdatingU = false;
        }, function () {
            _this.isUpdatingU = false;
            return;
        });
    };
    ProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'company-profile',
            templateUrl: 'profile.template.html',
            providers: [registerCompany_service_1.RegisterCompanyService, validation_service_1.ValidationService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, authentication_service_1.AuthenticationService, alert_service_1.AlertService, registerCompany_service_1.RegisterCompanyService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map