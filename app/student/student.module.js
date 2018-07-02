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
var student_routing_1 = require('./student.routing');
var forms_1 = require('@angular/forms');
var common_module_1 = require('../common/common.module');
var shared_module_1 = require('../shared/shared.module');
var owlCarousel_1 = require('../common/modules/owlCarousel/owlCarousel');
// Components 
var studentProfile_component_1 = require('./components/studentProfile.component');
var studentViewOpp_component_1 = require('./components/studentViewOpp.component');
// Services 
var student_service_1 = require('./services/student.service');
// Guards
var auth_guard_1 = require('./security/auth.guard');
var authentication_service_1 = require('../shared/services/authentication.service');
var StudentModule = (function () {
    function StudentModule() {
    }
    StudentModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule,
                common_module_1.AppCommonModule,
                http_1.HttpModule,
                shared_module_1.SharedModule,
                owlCarousel_1.OwlModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                student_routing_1.studentRoute
            ],
            declarations: [
                studentProfile_component_1.StudentProfile,
                studentViewOpp_component_1.StudentViewOpp
            ],
            providers: [auth_guard_1.AuthGuard, student_service_1.StudentService, authentication_service_1.AuthenticationService],
            bootstrap: [studentProfile_component_1.StudentProfile]
        }), 
        __metadata('design:paramtypes', [])
    ], StudentModule);
    return StudentModule;
}());
exports.StudentModule = StudentModule;
//# sourceMappingURL=student.module.js.map