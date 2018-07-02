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
var company_service_1 = require('./../services/company.service');
var router_1 = require('@angular/router');
var alert_service_1 = require('../../shared/services/alert.service');
var authentication_service_1 = require('../../shared/services/authentication.service');
var ViewOppertunityComponent = (function () {
    function ViewOppertunityComponent(_newCompanyService, _alertService, _authService, _router) {
        this._newCompanyService = _newCompanyService;
        this._alertService = _alertService;
        this._authService = _authService;
        this._router = _router;
        this._base_url = "http://kfupmf.mmed.email/backend/public/api/";
        this._base_url_img = "http://kfupmf.mmed.email/backend/public/";
        this.oppertunity = '';
        // limitS: number = 5;
        // offsetS: number = 0;
        // currentPageS: number = 1;
        // stdCount: number = 0;
        // noMoreS: boolean = false;
        // std_pages: number[] = [];
        this.stdData = [];
        this.stdDataAD = [];
        this.stdDataAC = [];
        this.stdAllIDS = '';
        this.filterType = 1;
        this.isSendingOffer = false;
    }
    ViewOppertunityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscribtion = this._router.params.subscribe(function (params) {
            _this.oppID = +params['id'];
        });
        this._newCompanyService.getCompanyOppertunity(this.oppID).subscribe(function (result) {
            if (result.status) {
                _this.oppertunity = result.data;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
        this._newCompanyService.getOppAppliedStudents(this.oppID).subscribe(function (result) {
            if (result.status) {
                _this.stdDataAD = result.data.applied;
                _this.stdDataAC = result.data.accepted;
                _this.stdData = _this.stdDataAD;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
    };
    ViewOppertunityComponent.prototype.ngOnDestroy = function () {
        this.subscribtion.unsubscribe();
    };
    // updateCheckedOptions(e: any) {
    //     // let sid = e.target.getAttribute('value');
    //     // if (e.target.checked) {
    //     //     this.stdAllIDS[sid] = sid;
    //     // } else {
    //     //     delete this.stdAllIDS[sid];
    //     // }
    //     let dsalkjd = this.getCheckedBoxes('selectSTD');
    //     console.log(dsalkjd);
    // }
    ViewOppertunityComponent.prototype.changeFilter = function (e) {
        var vid = e.target.value;
        if (vid == 1) {
            this.stdData = this.stdDataAD;
        }
        else if (vid == 2) {
            this.stdData = this.stdDataAC;
        }
    };
    ViewOppertunityComponent.prototype.sendOffer = function () {
        var _this = this;
        this.isSendingOffer = true;
        this._newCompanyService.getsendOffer(this.stdAllIDS, this.oppID).subscribe(function (result) {
            if (result.status) {
                _this._alertService.success(result.message);
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.isSendingOffer = false;
        }, function () {
            _this.isSendingOffer = false;
        });
        // console.log(this.stdAllIDS);
    };
    ViewOppertunityComponent.prototype.updateCheckedStudents = function () {
        var checkboxes = document.getElementsByName('selectSTD');
        var checkboxesChecked = [];
        // loop over them all
        for (var i = 0; i < checkboxes.length; i++) {
            // And stick the checked ones onto an array...
            var data = checkboxes[i];
            if (data.checked) {
                checkboxesChecked.push(data.getAttribute('value'));
            }
        }
        // // Return the array if it is non-empty, or null
        var newchebox = checkboxesChecked.length > 0 ? checkboxesChecked : null;
        this.stdAllIDS = JSON.stringify(newchebox);
    };
    ViewOppertunityComponent.prototype.getDay = function (date) {
        var date_str = date.toString();
        if (date_str.length == 14) {
            var day = date_str.substring(6, 8);
            return day;
        }
        else {
            return '';
        }
    };
    ViewOppertunityComponent.prototype.getMonth = function (date) {
        var date_str = date.toString();
        if (date_str.length == 14) {
            var month = getMonthString(parseInt(date_str.substring(4, 6)));
            return month;
        }
        else {
            return '';
        }
    };
    ViewOppertunityComponent.prototype.getYear = function (date) {
        var date_str = date.toString();
        if (date_str.length == 14) {
            var year = date_str.substring(0, 4);
            return year;
        }
        else {
            return '';
        }
    };
    ViewOppertunityComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'view-oppertunity',
            templateUrl: 'viewOppertunity.template.html',
            providers: [company_service_1.CompanyService, alert_service_1.AlertService]
        }), 
        __metadata('design:paramtypes', [company_service_1.CompanyService, alert_service_1.AlertService, authentication_service_1.AuthenticationService, router_1.ActivatedRoute])
    ], ViewOppertunityComponent);
    return ViewOppertunityComponent;
}());
exports.ViewOppertunityComponent = ViewOppertunityComponent;
function getMonthString(month) {
    switch (month) {
        case 1:
            return 'January';
        case 2:
            return 'February';
        case 3:
            return 'March';
        case 4:
            return 'April';
        case 5:
            return 'May';
        case 6:
            return 'June';
        case 7:
            return 'July';
        case 8:
            return 'August';
        case 9:
            return 'September';
        case 10:
            return 'October';
        case 11:
            return 'November';
        case 12:
            return 'December';
        default:
            return '';
    }
}
//# sourceMappingURL=viewOppertunity.component.js.map