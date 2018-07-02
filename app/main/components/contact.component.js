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
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var authentication_service_1 = require('../../shared/services/authentication.service');
// Object
// import { Session } from '../../objects/session';
// Services
var validation_service_1 = require('../../common/services/validation.service');
var alert_service_1 = require('../../shared/services/alert.service');
var main_service_1 = require('../services/main.service');
var ContactComponent = (function () {
    function ContactComponent(_authService, _alertService, _mainService, _router, _fb) {
        this._authService = _authService;
        this._alertService = _alertService;
        this._mainService = _mainService;
        this._router = _router;
        this._fb = _fb;
        this.isLoggindInb = false;
        this.isSending = false;
    }
    ContactComponent.prototype.ngOnInit = function () {
        if (this._authService.check('currentUser')) {
            this.isLoggindInb = true;
        }
        this.contactForm = this._fb.group({
            name: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100), validation_service_1.ValidationService.string])],
            email: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.email])],
            title: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.string])],
            content: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.string])],
        });
    };
    ContactComponent.prototype.sendMessage = function () {
        var _this = this;
        this.isSending = true;
        if (!this.contactForm.valid)
            return;
        this.message = {
            name: this.contactForm.controls['name'].value,
            email: this.contactForm.controls['email'].value,
            title: this.contactForm.controls['title'].value,
            content: this.contactForm.controls['content'].value,
        };
        this._mainService.sendMessage(this.message).subscribe(function (result) {
            if (result.status) {
                _this._alertService.success(result.message, 6000, 'dark');
                _this.contactForm.reset({ name: '', email: '', title: '', content: '' });
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.isSending = false;
        }, function () {
            _this.isSending = false;
            return;
        });
    };
    ContactComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'contact-us',
            templateUrl: './contact.template.html',
            providers: [main_service_1.MainService, validation_service_1.ValidationService]
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, alert_service_1.AlertService, main_service_1.MainService, router_1.Router, forms_1.FormBuilder])
    ], ContactComponent);
    return ContactComponent;
}());
exports.ContactComponent = ContactComponent;
//# sourceMappingURL=contact.component.js.map