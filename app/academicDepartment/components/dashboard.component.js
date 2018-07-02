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
var academicDepartment_service_1 = require('../services/academicDepartment.service');
var authentication_service_1 = require('../../shared/services/authentication.service');
var AcademicDashboard = (function () {
    function AcademicDashboard(_ADService, _alertService, _authService) {
        this._ADService = _ADService;
        this._alertService = _alertService;
        this._authService = _authService;
        this.limit = 5;
        this.offset = 0;
        this.noMore = false;
        this.opp_pages = [];
        this.oppCount = 0;
        this.currentPage = 1;
        this.oppData = [];
        this.oppAllData = [];
        this.limitS = 5;
        this.offsetS = 0;
        this.currentPageS = 1;
        this.stdCount = 0;
        this.noMoreS = false;
        this.std_pages = [];
        this.stdData = [];
        this.stdAllData = [];
        this.coordinatorsData = [];
        this.fullName = '';
        this.changingCoord = false;
        var session = this._authService.getSession();
        this.fullName = session.user_info.firstName + ' ' + session.user_info.lastName;
    }
    AcademicDashboard.prototype.ngOnInit = function () {
        var _this = this;
        this._ADService.getADCoordinators(0, -1).subscribe(function (result) {
            if (result.status) {
                _this.coordinatorsData = result.data;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
        this._ADService.getOppertunities(this.offset, this.limit).subscribe(function (result) {
            if (result.status) {
                _this.oppAllData = result.data;
                _this.oppCount = result.count;
                _this.opp_pages = Array(Math.ceil(_this.oppCount / _this.limit)).fill(1);
                _this.oppData = _this.oppAllData.slice(0, _this.limit);
            }
            else {
                _this._alertService.error(result.message);
            }
            if (result.data.length < _this.limit) {
                _this.noMore = true;
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
        this._ADService.getADStudents(this.offsetS, this.limitS).subscribe(function (result) {
            if (result.status) {
                _this.stdAllData = result.data;
                _this.stdCount = result.count;
                _this.std_pages = Array(Math.ceil(_this.stdCount / _this.limitS)).fill(1);
                _this.stdData = _this.stdAllData.slice(0, _this.limitS);
            }
            else {
                _this._alertService.error(result.message);
            }
            if (result.data.length < _this.limitS) {
                _this.noMoreS = true;
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
    };
    AcademicDashboard.prototype.getFirstChar = function (str) {
        return str.charAt(0);
    };
    AcademicDashboard.prototype.changecoordinator = function (SID, coordID) {
        var _this = this;
        if (coordID == 0)
            return;
        this.changingCoord = true;
        this._ADService.changeCoordinator(SID, coordID).subscribe(function (result) {
            if (result.status) {
                _this._alertService.success(result.message);
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.changingCoord = false;
        }, function () {
            _this.changingCoord = false;
        });
    };
    AcademicDashboard.prototype.loadMoreOpp = function () {
        var _this = this;
        if (this.noMore)
            return;
        this.offset += this.limit;
        this._ADService.getOppertunities(this.offset, this.limit).subscribe(function (result) {
            if (result.status) {
                var arradata = result.data;
                _this.oppCount = result.count;
                _this.opp_pages = Array(Math.ceil(_this.oppCount / _this.limit)).fill(1);
                if (arradata) {
                    arradata.forEach(function (obj, index) {
                        _this.oppAllData.push(obj);
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
        }, function () {
            _this.goToPage(_this.currentPage);
        });
    };
    AcademicDashboard.prototype.goToPage = function (index) {
        if (index === void 0) { index = 1; }
        if ((index < 1) || (index > this.opp_pages.length))
            return;
        var offset = this.limit * (index - 1);
        var limit = offset + this.limit;
        this.currentPage = index;
        if (this.oppAllData.length <= offset) {
            this.loadMoreOpp();
        }
        this.oppData = this.oppAllData.slice(offset, limit);
    };
    AcademicDashboard = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: 'dashboard.template.html',
            providers: [academicDepartment_service_1.AcademicDepartmentService]
        }), 
        __metadata('design:paramtypes', [academicDepartment_service_1.AcademicDepartmentService, alert_service_1.AlertService, authentication_service_1.AuthenticationService])
    ], AcademicDashboard);
    return AcademicDashboard;
}());
exports.AcademicDashboard = AcademicDashboard;
//# sourceMappingURL=dashboard.component.js.map