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
var companies_service_1 = require('../services/companies.service');
var authentication_service_1 = require('../../shared/services/authentication.service');
var CompaniesComponent = (function () {
    function CompaniesComponent(_comService, _alertService, _authService) {
        this._comService = _comService;
        this._alertService = _alertService;
        this._authService = _authService;
        this._base_url_img = "http://kfupmf.mmed.email/backend/public/";
        this.limit = 10;
        this.offset = 0;
        this.noMore = false;
        this.coms_pages = [];
        this.comsCount = 0;
        this.currentPage = 1;
        this.comsData = [];
        this.comsAllData = [];
        this.limitA = 5;
        this.offsetA = 0;
        this.noMoreA = false;
        this.coms_pagesA = [];
        this.comsCountA = 0;
        this.currentPageA = 1;
        this.comsDataA = [];
        this.comsAllDataA = [];
        this.currentApproved = 0;
        this.approving = false;
    }
    CompaniesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._comService.getCompanies(this.offset, this.limit).subscribe(function (result) {
            if (result.status) {
                _this.comsAllData = result.data;
                _this.comsCount = result.count;
                _this.coms_pages = Array(Math.ceil(_this.comsCount / _this.limit)).fill(1);
                _this.comsData = _this.comsAllData.slice(0, _this.limit);
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
        this._comService.getCompaniesApproved(this.offsetA, this.limitA).subscribe(function (result) {
            if (result.status) {
                _this.comsAllDataA = result.data;
                _this.comsCountA = result.count;
                _this.coms_pagesA = Array(Math.ceil(_this.comsCountA / _this.limitA)).fill(1);
                _this.comsDataA = _this.comsAllDataA.slice(0, _this.limitA);
            }
            else {
                _this._alertService.error(result.message);
            }
            if (result.data.length < _this.limitA) {
                _this.noMoreA = true;
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
    };
    CompaniesComponent.prototype.loadMoreComs = function () {
        var _this = this;
        if (this.noMore)
            return;
        this.offset += this.limit;
        this._comService.getCompanies(this.offset, this.limit).subscribe(function (result) {
            if (result.status) {
                var arradata = result.data;
                _this.comsCount = result.count;
                _this.coms_pages = Array(Math.ceil(_this.comsCount / _this.limit)).fill(1);
                if (arradata) {
                    arradata.forEach(function (obj, index) {
                        _this.comsAllData.push(obj);
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
    CompaniesComponent.prototype.goToPage = function (index) {
        if (index === void 0) { index = 1; }
        if ((index < 1) || (index > this.coms_pages.length))
            return;
        var offset = this.limit * (index - 1);
        var limit = offset + this.limit;
        this.currentPage = index;
        if (this.comsAllData.length <= offset) {
            this.loadMoreComs();
        }
        this.comsData = this.comsAllData.slice(offset, limit);
    };
    CompaniesComponent.prototype.loadMoreComsA = function () {
        var _this = this;
        if (this.noMoreA)
            return;
        this.offsetA += this.limitA;
        this._comService.getCompaniesApproved(this.offsetA, this.limitA).subscribe(function (result) {
            if (result.status) {
                var arradata = result.data;
                _this.comsCountA = result.count;
                _this.coms_pagesA = Array(Math.ceil(_this.comsCountA / _this.limitA)).fill(1);
                if (arradata) {
                    arradata.forEach(function (obj, index) {
                        _this.comsAllDataA.push(obj);
                    });
                }
                if (arradata.length < _this.limitA) {
                    _this.noMoreA = true;
                }
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        }, function () {
            _this.goToPageA(_this.currentPageA);
        });
    };
    CompaniesComponent.prototype.approveCompany = function (idx, id) {
        var _this = this;
        var obj = this.comsData[idx];
        if (obj.approved)
            return;
        obj.approved = true;
        this._comService.approveCompany(id, idx).subscribe(function (result) {
            if (result.status) {
                _this._alertService.success(result.message);
            }
            else {
                _this._alertService.error(result.message);
                obj.approved = false;
            }
        }, function (error) {
            _this._authService.handelError(error);
            obj.approved = false;
        }, function () {
            _this.goToPage(_this.currentPage);
        });
    };
    CompaniesComponent.prototype.goToPageA = function (index) {
        if (index === void 0) { index = 1; }
        if ((index < 1) || (index > this.coms_pagesA.length))
            return;
        var offset = this.limitA * (index - 1);
        var limit = offset + this.limitA;
        this.currentPageA = index;
        if (this.comsAllDataA.length <= offset) {
            this.loadMoreComsA();
        }
        this.comsDataA = this.comsAllDataA.slice(offset, limit);
    };
    CompaniesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'td-companies',
            templateUrl: 'companies.template.html',
            providers: [companies_service_1.CompaniesService]
        }), 
        __metadata('design:paramtypes', [companies_service_1.CompaniesService, alert_service_1.AlertService, authentication_service_1.AuthenticationService])
    ], CompaniesComponent);
    return CompaniesComponent;
}());
exports.CompaniesComponent = CompaniesComponent;
//# sourceMappingURL=companies.component.js.map