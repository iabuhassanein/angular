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
var trainingDepartment_routing_1 = require('./trainingDepartment.routing');
var forms_1 = require('@angular/forms');
var common_module_1 = require('../common/common.module');
// Components 
var dashboard_component_1 = require('./components/dashboard.component');
var accounts_component_1 = require('./components/accounts.component');
var companies_component_1 = require('./components/companies.component');
var content_component_1 = require('./components/content.component');
var registration_component_1 = require('./components/registration.component');
var reports_component_1 = require('./components/reports.component');
var shared_module_1 = require('../shared/shared.module');
var student_compoment_1 = require('./components/student.compoment');
var opportunity_compoment_1 = require('./components/opportunity.compoment');
// Services
var trainingDepartment_service_1 = require('./services/trainingDepartment.service');
// Guards
var auth_guard_1 = require('./security/auth.guard');
var TrainingDepartmentModule = (function () {
    function TrainingDepartmentModule() {
    }
    TrainingDepartmentModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                shared_module_1.SharedModule,
                common_module_1.AppCommonModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                trainingDepartment_routing_1.TrainingDepartmentRoute],
            declarations: [
                dashboard_component_1.TrainingDepartmentDashboard,
                accounts_component_1.AccountComponent,
                companies_component_1.CompaniesComponent,
                content_component_1.ContentComponent,
                registration_component_1.RegistrationComponent,
                reports_component_1.ReportStatisticsComponent,
                student_compoment_1.StudentComponent,
                opportunity_compoment_1.OpportunityComponent
            ],
            bootstrap: [dashboard_component_1.TrainingDepartmentDashboard],
            providers: [auth_guard_1.AuthGuard, trainingDepartment_service_1.TrainingDepartmentService]
        }), 
        __metadata('design:paramtypes', [])
    ], TrainingDepartmentModule);
    return TrainingDepartmentModule;
}());
exports.TrainingDepartmentModule = TrainingDepartmentModule;
//# sourceMappingURL=trainingDepartment.module.js.map