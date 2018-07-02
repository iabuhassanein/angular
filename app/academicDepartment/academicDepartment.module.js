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
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var academicDepartment_routing_1 = require('./academicDepartment.routing');
var forms_1 = require('@angular/forms');
var common_module_1 = require('../common/common.module');
// Components 
var dashboard_component_1 = require('./components/dashboard.component');
var reports_component_1 = require('./components/reports.component');
var viewStudent_component_1 = require('./components/viewStudent.component');
var ADOpportunity_component_1 = require('./components/ADOpportunity.component');
var shared_module_1 = require('../shared/shared.module');
// Services
var academicDepartment_service_1 = require('./Services/academicDepartment.service');
// Guards
var auth_guard_1 = require('./security/auth.guard');
var AcademicModule = (function () {
    function AcademicModule() {
    }
    AcademicModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                shared_module_1.SharedModule,
                common_module_1.AppCommonModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                academicDepartment_routing_1.AcademicRoute],
            declarations: [
                dashboard_component_1.AcademicDashboard,
                ADOpportunity_component_1.ADOpportunity,
                reports_component_1.Reports,
                viewStudent_component_1.ViewStudent
            ],
            bootstrap: [dashboard_component_1.AcademicDashboard],
            providers: [auth_guard_1.AuthGuard, academicDepartment_service_1.AcademicDepartmentService]
        }), 
        __metadata('design:paramtypes', [])
    ], AcademicModule);
    return AcademicModule;
}());
exports.AcademicModule = AcademicModule;
//# sourceMappingURL=academicDepartment.module.js.map