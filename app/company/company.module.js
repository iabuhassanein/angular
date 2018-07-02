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
var company_routing_1 = require('./company-routing');
var forms_1 = require('@angular/forms');
var common_module_1 = require('../common/common.module');
var shared_module_1 = require('../shared/shared.module');
// Components 
var companyRegister_component_1 = require('./components/companyRegister.component');
var companyDashBoard_component_1 = require('./components/companyDashBoard.component');
var newOppertunity_component_1 = require('./components/newOppertunity.component');
var newSupervisor_component_1 = require('./components/newSupervisor.component');
var viewOppertunity_component_1 = require('./components/viewOppertunity.component');
var profile_component_1 = require('./components/profile.component');
var student_component_1 = require('./components/student.component');
// Guards
var auth_guard_1 = require('./security/auth.guard');
// import { requestOptionsProvider } from '../shared/lib/customBrowserXhr';
var CompanyModule = (function () {
    function CompanyModule() {
    }
    CompanyModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule,
                shared_module_1.SharedModule,
                common_module_1.AppCommonModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                company_routing_1.companyRoute
            ],
            declarations: [
                companyDashBoard_component_1.CompanyDashBoardComponent,
                companyRegister_component_1.CompanyRegisterComponent,
                newOppertunity_component_1.NewOppertunityComponent,
                newSupervisor_component_1.NewSupervisorComponent,
                profile_component_1.ProfileComponent,
                viewOppertunity_component_1.ViewOppertunityComponent,
                student_component_1.ViewStudentC
            ],
            providers: [auth_guard_1.AuthGuard],
            bootstrap: [companyDashBoard_component_1.CompanyDashBoardComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], CompanyModule);
    return CompanyModule;
}());
exports.CompanyModule = CompanyModule;
//# sourceMappingURL=company.module.js.map