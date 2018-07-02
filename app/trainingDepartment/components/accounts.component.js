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
// import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
// Services
var alert_service_1 = require('../../shared/services/alert.service');
var account_service_1 = require('../services/account.service');
var authentication_service_1 = require('../../shared/services/authentication.service');
var AccountComponent = (function () {
    // FilterData: any[] = [];
    // filterForm: FormGroup;
    function AccountComponent(_accountService, _alertService, _authService) {
        this._accountService = _accountService;
        this._alertService = _alertService;
        this._authService = _authService;
        this.adcLimit = 10;
        this.adcOffset = 0;
        this.adcNoMore = false;
        this.adc_pages = [];
        this.adcCount = 0;
        this.adcCurrentPage = 1;
        this.adcData = [];
        this.adcAllData = [];
        this.tdLimit = 10;
        this.tdOffset = 0;
        this.tdCurrentPage = 1;
        this.tdCount = 0;
        this.tdNoMore = false;
        this.td_pages = [];
        this.tdData = [];
        this.tdAllData = [];
        this.limitS = 10;
        this.offsetS = 0;
        this.currentPageS = 1;
        this.stdCount = 0;
        this.noMoreS = false;
        this.std_pages = [];
        this.stdData = [];
        this.stdAllData = [];
    }
    AccountComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.filterForm = this._fb.group({
        //     search: [0, Validators.compose([ValidationService.string, Validators.maxLength(80)])],
        //     major: [0, Validators.compose([ValidationService.numeric])],
        //     collage: [0, Validators.compose([ValidationService.numeric])],
        //     role: [0, Validators.compose([ValidationService.alphaNumUnder])],
        // });
        // this._accountService.getFilterData().subscribe(
        //     result => {
        //         if (result.status) {
        //             this.FilterData = result.data;
        //         } else {
        //             this._alertService.error(result.message);
        //         }
        //     },
        //     error => {
        //         this._authService.handelError(error);
        //     });
        this._accountService.getTrainingDepartmentAccounts(this.tdOffset, this.tdLimit).subscribe(function (result) {
            if (result.status) {
                _this.tdAllData = result.data;
                _this.tdCount = result.count;
                _this.td_pages = Array(Math.ceil(_this.tdCount / _this.tdLimit)).fill(1);
                _this.tdData = _this.tdAllData.slice(0, _this.tdLimit);
            }
            else {
                _this._alertService.error(result.message);
            }
            if (result.data.length < _this.tdLimit) {
                _this.tdNoMore = true;
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
        this._accountService.getAcademicDepartmentAccounts(this.adcOffset, this.adcLimit).subscribe(function (result) {
            if (result.status) {
                _this.adcAllData = result.data;
                _this.adcCount = result.count;
                _this.adc_pages = Array(Math.ceil(_this.adcCount / _this.adcLimit)).fill(1);
                _this.adcData = _this.adcAllData.slice(0, _this.adcLimit);
            }
            else {
                _this._alertService.error(result.message);
            }
            if (result.data.length < _this.adcLimit) {
                _this.adcNoMore = true;
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
        this._accountService.getStudentAccounts(this.offsetS, this.limitS).subscribe(function (result) {
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
    AccountComponent.prototype.goToPageS = function (index) {
        if (index === void 0) { index = 1; }
        if ((index < 1) || (index > this.std_pages.length))
            return;
        var offset = this.limitS * (index - 1);
        var limit = offset + this.limitS;
        this.currentPageS = index;
        if (this.stdAllData.length <= offset) {
            this.loadMorestd();
        }
        this.stdData = this.stdAllData.slice(offset, limit);
    };
    AccountComponent.prototype.loadMorestd = function () {
        var _this = this;
        if (this.noMoreS)
            return;
        this.offsetS += this.limitS;
        this._accountService.getStudentAccounts(this.offsetS, this.limitS).subscribe(function (result) {
            if (result.status) {
                var arradata = result.data;
                _this.stdCount = result.count;
                _this.std_pages = Array(Math.ceil(_this.stdCount / _this.limitS)).fill(1);
                if (arradata) {
                    arradata.forEach(function (obj, index) {
                        _this.stdAllData.push(obj);
                    });
                }
                if (arradata.length < _this.limitS) {
                    _this.noMoreS = true;
                }
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        }, function () {
            _this.goToPageS(_this.currentPageS);
        });
    };
    AccountComponent.prototype.tdGoToPage = function (index) {
        if (index === void 0) { index = 1; }
        if ((index < 1) || (index > this.td_pages.length))
            return;
        var offset = this.tdLimit * (index - 1);
        var limit = offset + this.tdLimit;
        this.tdCurrentPage = index;
        if (this.tdAllData.length <= offset) {
            this.tdLoadMore();
        }
        this.tdData = this.tdAllData.slice(offset, limit);
    };
    AccountComponent.prototype.tdLoadMore = function () {
        var _this = this;
        if (this.tdNoMore)
            return;
        this.tdOffset += this.tdLimit;
        this._accountService.getTrainingDepartmentAccounts(this.tdOffset, this.tdLimit).subscribe(function (result) {
            if (result.status) {
                var arradata = result.data;
                _this.tdCount = result.count;
                _this.td_pages = Array(Math.ceil(_this.tdCount / _this.tdLimit)).fill(1);
                if (arradata) {
                    arradata.forEach(function (obj, index) {
                        _this.tdAllData.push(obj);
                    });
                }
                if (arradata.length < _this.tdLimit) {
                    _this.tdNoMore = true;
                }
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        }, function () {
            _this.tdGoToPage(_this.tdCurrentPage);
        });
    };
    AccountComponent.prototype.adcGoToPage = function (index) {
        if (index === void 0) { index = 1; }
        if ((index < 1) || (index > this.adc_pages.length))
            return;
        var offset = this.adcLimit * (index - 1);
        var limit = offset + this.adcLimit;
        this.adcCurrentPage = index;
        if (this.adcAllData.length <= offset) {
            this.adcLoadMore();
        }
        this.adcData = this.adcAllData.slice(offset, limit);
    };
    AccountComponent.prototype.adcLoadMore = function () {
        var _this = this;
        if (this.adcNoMore)
            return;
        this.adcOffset += this.adcLimit;
        this._accountService.getAcademicDepartmentAccounts(this.adcOffset, this.adcLimit).subscribe(function (result) {
            if (result.status) {
                var arradata = result.data;
                _this.adcCount = result.count;
                _this.adc_pages = Array(Math.ceil(_this.adcCount / _this.adcLimit)).fill(1);
                if (arradata) {
                    arradata.forEach(function (obj, index) {
                        _this.adcAllData.push(obj);
                    });
                }
                if (arradata.length < _this.adcLimit) {
                    _this.adcNoMore = true;
                }
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        }, function () {
            _this.adcGoToPage(_this.adcCurrentPage);
        });
    };
    AccountComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'td-accounts',
            templateUrl: 'accounts.template.html',
            providers: [account_service_1.AccountService]
        }), 
        __metadata('design:paramtypes', [account_service_1.AccountService, alert_service_1.AlertService, authentication_service_1.AuthenticationService])
    ], AccountComponent);
    return AccountComponent;
}());
exports.AccountComponent = AccountComponent;
//# sourceMappingURL=accounts.component.js.map