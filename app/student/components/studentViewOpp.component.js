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
var alert_service_1 = require('../../shared/services/alert.service');
var student_service_1 = require('../services/student.service');
var authentication_service_1 = require('../../shared/services/authentication.service');
var StudentViewOpp = (function () {
    function StudentViewOpp(_alertService, _authService, _router, _studentService) {
        this._alertService = _alertService;
        this._authService = _authService;
        this._router = _router;
        this._studentService = _studentService;
        this._base_url = "http://kfupmf.mmed.email/backend/public/api/";
        this._base_url_img = "http://kfupmf.mmed.email/backend/public/";
        this.oppertunity = '';
        this.appling = false;
        this.is_applied = false;
    }
    StudentViewOpp.prototype.ngOnInit = function () {
        var _this = this;
        this.subscribtion = this._router.params.subscribe(function (params) {
            _this.oppID = +params['id'];
        });
        this._studentService.getOppertunity(this.oppID).subscribe(function (result) {
            if (result.status) {
                _this.oppertunity = result.data;
                _this.is_applied = result.is_applied;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
    };
    StudentViewOpp.prototype.ngOnDestroy = function () {
        this.subscribtion.unsubscribe();
    };
    StudentViewOpp.prototype.applyOpp = function () {
        var _this = this;
        this.appling = true;
        this._studentService.applyOppertunity(this.oppID).subscribe(function (result) {
            if (result.status) {
                _this._alertService.success(result.message);
                _this.is_applied = true;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.appling = false;
        }, function () {
            _this.appling = false;
        });
    };
    StudentViewOpp = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'student-viewopp',
            templateUrl: 'studentViewOpp.template.html'
        }), 
        __metadata('design:paramtypes', [alert_service_1.AlertService, authentication_service_1.AuthenticationService, router_1.ActivatedRoute, student_service_1.StudentService])
    ], StudentViewOpp);
    return StudentViewOpp;
}());
exports.StudentViewOpp = StudentViewOpp;
//# sourceMappingURL=studentViewOpp.component.js.map