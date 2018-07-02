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
// Services
var company_service_1 = require('./../services/company.service');
// import { ValidationService } from '../../common/services/validation.service';
var alert_service_1 = require('../../shared/services/alert.service');
var authentication_service_1 = require('../../shared/services/authentication.service');
var ViewStudentC = (function () {
    function ViewStudentC(_authService, _alertService, _companyService, _router) {
        this._authService = _authService;
        this._alertService = _alertService;
        this._companyService = _companyService;
        this._router = _router;
    }
    ViewStudentC.prototype.ngOnInit = function () {
        var _this = this;
        this.subscribtion = this._router.params.subscribe(function (params) {
            _this.sid = +params['id'];
        });
        this._companyService.getStudentOpp(this.sid).subscribe(function (result) {
            if (result.status) {
                _this.student = result.data;
                _this.oppertunity = _this.student.applied_opportunities.opportunity;
                console.log(_this.student);
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
    };
    ViewStudentC = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'company-student',
            templateUrl: 'student.template.html',
            providers: [company_service_1.CompanyService]
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, alert_service_1.AlertService, company_service_1.CompanyService, router_1.ActivatedRoute])
    ], ViewStudentC);
    return ViewStudentC;
}());
exports.ViewStudentC = ViewStudentC;
//# sourceMappingURL=student.component.js.map