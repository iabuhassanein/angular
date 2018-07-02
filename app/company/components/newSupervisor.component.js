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
var supervisor_service_1 = require('./../services/supervisor.service');
var validation_service_1 = require('../../common/services/validation.service');
// Services 
var authentication_service_1 = require("../../shared/services/authentication.service");
var alert_service_1 = require('../../shared/services/alert.service');
var NewSupervisorComponent = (function () {
    function NewSupervisorComponent(_fb, _authService, _alertService, _supervisorService) {
        this._fb = _fb;
        this._authService = _authService;
        this._alertService = _alertService;
        this._supervisorService = _supervisorService;
        this.createBtn = false;
        this.isAdding = false;
        this.loadingMore = false;
        this.noMore = false;
        this.createBtnStr = 'New Account';
        this.limit = 5;
        this.offset = 0;
        this.supervisors = [];
    }
    NewSupervisorComponent.prototype.ngAfterViewInit = function () {
        $(document).ready(function () {
            $(".n-clickj").click(function () {
                $(".hide-mk").show("slow");
            });
            $(".n-cli-cancel").click(function () {
                $(".hide-mk").hide("slow");
            });
        });
    };
    NewSupervisorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._supervisorService.getSupervisors(this.offset, -1).subscribe(function (result) {
            if (result.status) {
                _this.supervisors = result.data;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
        this.createSV = this._fb.group({
            supName: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.string])],
            supPostion: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.string])],
            supEmail: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.email])],
            supPhone: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.numeric])],
            supMobile: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.numeric])],
            supLogin: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(16), validation_service_1.ValidationService.noSpace, validation_service_1.ValidationService.alphaNumUnder])],
            supPass: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.password])],
        });
    };
    NewSupervisorComponent.prototype.loadMore = function () {
        var _this = this;
        this.loadingMore = true;
        this.offset += this.limit;
        this._supervisorService.getSupervisors(this.offset, this.limit).subscribe(function (result) {
            if (result.status) {
                var arradata = result.data;
                if (arradata) {
                    arradata.forEach(function (obj, index) {
                        _this.supervisors.push(obj);
                    });
                }
                if (arradata.length < _this.limit) {
                    _this.noMore = true;
                }
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.loadingMore = false;
        }, function () {
            _this.loadingMore = false;
            return;
        });
    };
    NewSupervisorComponent.prototype.createSrvBtn = function () {
        var _this = this;
        if (!this.createBtn) {
            this.createBtn = true;
            this.createBtnStr = 'Create';
            return;
        }
        if (!this.createSV.valid) {
            this._alertService.error('Please Check All Required fields');
            return;
        }
        if (this.isAdding) {
            return;
        }
        this.isAdding = true;
        this.newUserInfo = {
            firstName: this.createSV.controls['supName'].value,
            lastName: '',
            phone: this.createSV.controls['supPhone'].value,
            login: this.createSV.controls['supLogin'].value,
            email: this.createSV.controls['supEmail'].value,
            password: this.createSV.controls['supPass'].value,
            userRole: 'ROLE_SUPERVISOR',
        };
        this.newsupervisor = {
            mobile: this.createSV.controls['supMobile'].value,
            position: this.createSV.controls['supPostion'].value,
            userInfo: this.newUserInfo,
        };
        this._supervisorService.createSupervisor(this.newsupervisor).subscribe(function (result) {
            if (result.status) {
                _this.supervisors.push(result.data);
                _this.createSV.reset({ supName: '', supPostion: '', supEmail: '', supPhone: '', supMobile: '', supLogin: '', supPass: '' });
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.isAdding = false;
        }, function () {
            _this.isAdding = false;
            return;
        });
    };
    NewSupervisorComponent.prototype.cancelCreateBtn = function () {
        this.createBtn = false;
        this.createBtnStr = 'New Account';
        this.createSV.reset({ supName: '', supPostion: '', supEmail: '', supPhone: '', supMobile: '', supLogin: '', supPass: '' });
    };
    NewSupervisorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'new-supervisor',
            templateUrl: 'newSupervisor.template.html',
            providers: [supervisor_service_1.SupervisorService, validation_service_1.ValidationService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, authentication_service_1.AuthenticationService, alert_service_1.AlertService, supervisor_service_1.SupervisorService])
    ], NewSupervisorComponent);
    return NewSupervisorComponent;
}());
exports.NewSupervisorComponent = NewSupervisorComponent;
//# sourceMappingURL=newSupervisor.component.js.map