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
// Services
var alert_service_1 = require('../../shared/services/alert.service');
var registration_service_1 = require('../services/registration.service');
var authentication_service_1 = require('../../shared/services/authentication.service');
var RegistrationComponent = (function () {
    function RegistrationComponent(_regService, _alertService, _authService) {
        this._regService = _regService;
        this._alertService = _alertService;
        this._authService = _authService;
        this.terms = [];
    }
    RegistrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._regService.getTerms(0, -1).subscribe(function (result) {
            if (result.status) {
                _this.terms = result.data;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
    };
    RegistrationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'td-registration',
            templateUrl: 'registration.template.html',
            providers: [registration_service_1.RegistrationService]
        }), 
        __metadata('design:paramtypes', [registration_service_1.RegistrationService, alert_service_1.AlertService, authentication_service_1.AuthenticationService])
    ], RegistrationComponent);
    return RegistrationComponent;
}());
exports.RegistrationComponent = RegistrationComponent;
//# sourceMappingURL=registration.component.js.map