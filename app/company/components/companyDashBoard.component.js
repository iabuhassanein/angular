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
var company_service_1 = require('./../services/company.service');
var validation_service_1 = require('../../common/services/validation.service');
var alert_service_1 = require('../../shared/services/alert.service');
var authentication_service_1 = require('../../shared/services/authentication.service');
var CompanyDashBoardComponent = (function () {
    function CompanyDashBoardComponent(_companyService, _alertService, _authService) {
        this._companyService = _companyService;
        this._alertService = _alertService;
        this._authService = _authService;
        this.limit = 5;
        this.offset = 0;
        this.limitN = 5;
        this.offsetN = 0;
        this.noMoreNote = false;
        this.isGettingNote = false;
        this.currentPage = 1;
        this.oppCount = 0;
        this.noMore = false;
        this.opp_pages = [];
        this.fullName = '';
        this.companyName = '';
        this.companyAbout = '';
        this.oppData = [];
        this.oppAllData = [];
        this.notifications = [];
        this.limitS = 5;
        this.offsetS = 0;
        this.currentPageS = 1;
        this.stdCount = 0;
        this.noMoreS = false;
        this.std_pages = [];
        this.stdData = [];
        this.stdAllData = [];
        this.supervisorsData = [];
        this.changingSupvs = false;
        var session = this._authService.getSession();
        this.fullName = session.user_info.firstName + ' ' + session.user_info.lastName;
        var profile = this._authService.getProfile();
        this.companyName = profile.company.englishName;
        this.companyAbout = profile.company.englishAbout;
    }
    CompanyDashBoardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._companyService.getCompanyOppertunities(this.offset, this.limit).subscribe(function (result) {
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
        this._companyService.getNotification(this.offsetN, this.limitN).subscribe(function (result) {
            if (result.status) {
                _this.notifications = result.data;
                if (result.data.length < _this.limitN)
                    _this.noMoreNote = true;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
        this._companyService.getSupervisors(0, -1).subscribe(function (result) {
            if (result.status) {
                _this.supervisorsData = result.data;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
        this._companyService.getAppliedStudents(this.offsetS, this.limitS).subscribe(function (result) {
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
    CompanyDashBoardComponent.prototype.onScroll = function ($event) {
        var notcont = $event.target;
        if (notcont.scrollTop === (notcont.scrollHeight - notcont.offsetHeight)) {
            console.log('scrolled');
            this.loadMoreNotification();
        }
    };
    CompanyDashBoardComponent.prototype.Logout = function () {
        this._authService.logout();
    };
    CompanyDashBoardComponent.prototype.getFirstChar = function (str) {
        return str.charAt(0);
    };
    CompanyDashBoardComponent.prototype.changeSupervisore = function (SID, appliedID) {
        var _this = this;
        if (SID == 0)
            return;
        this.changingSupvs = true;
        this._companyService.changeSupervisor(SID, appliedID).subscribe(function (result) {
            if (result.status) {
                _this._alertService.success(result.message);
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.changingSupvs = false;
        }, function () {
            _this.changingSupvs = false;
        });
    };
    CompanyDashBoardComponent.prototype.loadMoreOpp = function () {
        var _this = this;
        if (this.noMore)
            return;
        this.offset += this.limit;
        this._companyService.getCompanyOppertunities(this.offset, this.limit).subscribe(function (result) {
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
    CompanyDashBoardComponent.prototype.viewNotification = function (index) {
        var note = this.notifications[index];
        switch (note.type) {
            case 'link':
                break;
            default:
                // this._alertService.notification(note.title + "\n\n" + note.content, false);
                this._companyService.readNotification(note.id);
                note.read = true;
                this.notifications[index] = note;
                break;
        }
    };
    CompanyDashBoardComponent.prototype.loadMoreNotification = function () {
        var _this = this;
        if (this.noMoreNote)
            return;
        this.isGettingNote = true;
        this.offsetN += this.limitN;
        this._companyService.getNotification(this.offsetN, this.limitN).subscribe(function (result) {
            if (result.status) {
                var arradata = result.data;
                if (arradata) {
                    arradata.forEach(function (obj, index) {
                        _this.notifications.push(obj);
                    });
                }
                if (arradata.length < _this.limitN) {
                    _this.noMoreNote = true;
                }
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        }, function () {
            _this.isGettingNote = false;
        });
    };
    CompanyDashBoardComponent.prototype.goToPage = function (index) {
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
    CompanyDashBoardComponent.prototype.goToPageS = function (index) {
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
    CompanyDashBoardComponent.prototype.loadMorestd = function () {
        var _this = this;
        if (this.noMoreS)
            return;
        this.offsetS += this.limitS;
        this._companyService.getAppliedStudents(this.offsetS, this.limitS).subscribe(function (result) {
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
    CompanyDashBoardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'company-dashboard',
            templateUrl: 'companyDashBoard.template.html',
            providers: [company_service_1.CompanyService, validation_service_1.ValidationService]
        }), 
        __metadata('design:paramtypes', [company_service_1.CompanyService, alert_service_1.AlertService, authentication_service_1.AuthenticationService])
    ], CompanyDashBoardComponent);
    return CompanyDashBoardComponent;
}());
exports.CompanyDashBoardComponent = CompanyDashBoardComponent;
//# sourceMappingURL=companyDashBoard.component.js.map