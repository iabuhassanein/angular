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
var alert_service_1 = require('../../shared/services/alert.service');
var authentication_service_1 = require('../../shared/services/authentication.service');
var validation_service_1 = require('../../common/services/validation.service');
var student_service_1 = require('./../services/student.service');
var StudentComponent = (function () {
    function StudentComponent(_studentService, _alertService, _authService, _router, _fb) {
        this._studentService = _studentService;
        this._alertService = _alertService;
        this._authService = _authService;
        this._router = _router;
        this._fb = _fb;
        this._base_url = "http://kfupmf.mmed.email/backend/public/api/";
        this._base_url_img = "http://kfupmf.mmed.email/backend/public/";
        this.opps_data = [];
        this.comments = [];
        this.stdLogs = [];
        this.isCommenting = false;
    }
    StudentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addCommentForm = this._fb.group({
            commentBody: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(512)])],
        });
        this.subscribtion = this._router.params.subscribe(function (params) {
            _this.stdID = +params['id'];
        });
        this._studentService.getStudent(this.stdID).subscribe(function (result) {
            if (result.status) {
                _this.student = result.data;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
        this._studentService.getStudentLogs(this.stdID).subscribe(function (result) {
            if (result.status) {
                _this.stdLogs = result.data;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
        this._studentService.getStudentOpportunities(this.stdID).subscribe(function (result) {
            if (result.status) {
                _this.opps_data = result.data;
                setTimeout(function () {
                    $(".curs-po").click(function () {
                        $(this).parent().find(".accordion-section-content").toggle("fast");
                    });
                }, 1500);
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
        this.getStudentComments();
    };
    StudentComponent.prototype.ngAfterViewInit = function () {
    };
    StudentComponent.prototype.addNewComment = function () {
        var _this = this;
        var comment = {
            stdID: this.stdID,
            comment: this.addCommentForm.controls['commentBody'].value
        };
        this.isCommenting = true;
        this._studentService.createStudentComment(comment).subscribe(function (result) {
            if (result.status) {
                _this._alertService.success(result.message);
                _this.addCommentForm.reset({ commentBody: '' });
                _this.getStudentComments();
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.isCommenting = false;
        }, function () {
            _this.isCommenting = false;
            return;
        });
    };
    StudentComponent.prototype.getStudentComments = function () {
        var _this = this;
        this._studentService.getStudentComments(this.stdID).subscribe(function (result) {
            if (result.status) {
                _this.comments = result.data;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
    };
    StudentComponent.prototype.ngOnDestroy = function () {
        this.subscribtion.unsubscribe();
    };
    StudentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'td-student',
            templateUrl: 'student.template.html',
            providers: [student_service_1.StudentService, validation_service_1.ValidationService]
        }), 
        __metadata('design:paramtypes', [student_service_1.StudentService, alert_service_1.AlertService, authentication_service_1.AuthenticationService, router_1.ActivatedRoute, forms_1.FormBuilder])
    ], StudentComponent);
    return StudentComponent;
}());
exports.StudentComponent = StudentComponent;
//# sourceMappingURL=student.compoment.js.map