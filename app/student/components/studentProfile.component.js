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
var authentication_service_1 = require('../../shared/services/authentication.service');
var student_service_1 = require('../services/student.service');
var StudentProfile = (function () {
    function StudentProfile(_studentService, _alertService, _authService) {
        this._studentService = _studentService;
        this._alertService = _alertService;
        this._authService = _authService;
        this.limitN = 5;
        this.offsetN = 0;
        this.limit = 5;
        this.offset = 0;
        this.limitA = 5;
        this.offsetA = 0;
        this.currentPage = 1;
        this.oppCount = 0;
        this.noMore = false;
        this.opp_pages = [];
        this.oppData = [];
        this.oppAllData = [];
        this.aopp_pages = [];
        this.aoppCount = 0;
        this.aoppData = [];
        this.aoppAllData = [];
        this.anoMore = false;
        this.acurrentPage = 1;
        this.abroadOppertunities = [];
        this.obtainedOppertunities = [];
        this.notifications = [];
        this.announcements = [];
        this.noMoreNote = false;
        this.isGettingNote = false;
        this.isAccepting = false;
        this._base_url_img = "http://kfupmf.mmed.email/backend/public/image/";
    }
    StudentProfile.prototype.ngOnInit = function () {
        var _this = this;
        this.studentProfile = this._authService.getProfile();
        this._studentService.getNotification(this.offsetN, this.limitN).subscribe(function (result) {
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
        this._studentService.getOppertunities(this.offset, this.limit).subscribe(function (result) {
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
        this._studentService.getAnnouncements(0, 5).subscribe(function (result) {
            if (result.status) {
                _this.announcements = result.data;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
        this._studentService.getappliedOppertunities(this.offsetA, this.limitA).subscribe(function (result) {
            if (result.status) {
                _this.aoppAllData = result.data;
                _this.aoppCount = result.count;
                _this.abroadOppertunities = result.abroadOppertunities;
                _this.obtainedOppertunities = result.obtainedOppertunities;
                _this.aopp_pages = Array(Math.ceil(_this.aoppCount / _this.limitA)).fill(1);
                _this.aoppData = _this.aoppAllData.slice(0, _this.limitA);
            }
            else {
                _this._alertService.error(result.message);
            }
            if (result.data.length < _this.limitA) {
                _this.anoMore = true;
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
    };
    StudentProfile.prototype.acceptOpp = function (id) {
        var _this = this;
        this.isAccepting = true;
        this._studentService.acceptOpp(id).subscribe(function (result) {
            if (result.status) {
                if (result.isInTraining) {
                    _this._alertService.warning(result.message);
                }
                else {
                    _this._alertService.success(result.message);
                }
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.isAccepting = false;
        }, function () {
            _this.isAccepting = false;
        });
    };
    StudentProfile.prototype.onScroll = function ($event) {
        var notcont = $event.target;
        if (notcont.scrollTop === (notcont.scrollHeight - notcont.offsetHeight)) {
            this.loadMoreNotification();
        }
    };
    StudentProfile.prototype.loadMoreNotification = function () {
        var _this = this;
        if (this.noMoreNote)
            return;
        this.isGettingNote = true;
        this.offsetN += this.limitN;
        this._studentService.getNotification(this.offsetN, this.limitN).subscribe(function (result) {
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
    StudentProfile.prototype.OpenStudentCVUpload = function () {
        var elem = document.getElementById('uploadCVInput');
        if (elem && document.createEvent) {
            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", true, false);
            elem.dispatchEvent(evt);
        }
    };
    StudentProfile.prototype.UploadCVFile = function (event) {
        var _this = this;
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file = fileList[0];
            var subscribe = this._studentService.uploadCV(file).subscribe(function (result) {
                if (result.status) {
                    _this._alertService.success(result.message);
                }
                else {
                    _this._alertService.error(result.message);
                }
            }, function (error) {
                _this._authService.handelError(error);
            });
        }
    };
    StudentProfile.prototype.loadMoreOpp = function () {
        var _this = this;
        if (this.noMore)
            return;
        this.offset += this.limit;
        this._studentService.getOppertunities(this.offset, this.limit).subscribe(function (result) {
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
    StudentProfile.prototype.goToPage = function (index) {
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
    StudentProfile.prototype.loadMoreAOpp = function () {
        var _this = this;
        if (this.anoMore)
            return;
        this.offsetA += this.limitA;
        this._studentService.getappliedOppertunities(this.offsetA, this.limitA).subscribe(function (result) {
            if (result.status) {
                var arradata = result.data;
                _this.aoppCount = result.count;
                _this.aopp_pages = Array(Math.ceil(_this.aoppCount / _this.limitA)).fill(1);
                if (arradata) {
                    arradata.forEach(function (obj, index) {
                        _this.aoppAllData.push(obj);
                    });
                }
                if (arradata.length < _this.limitA) {
                    _this.anoMore = true;
                }
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        }, function () {
            _this.goToPageA(_this.acurrentPage);
        });
    };
    StudentProfile.prototype.goToPageA = function (index) {
        if (index === void 0) { index = 1; }
        if ((index < 1) || (index > this.aopp_pages.length))
            return;
        var offset = this.limitA * (index - 1);
        var limit = offset + this.limitA;
        this.acurrentPage = index;
        if (this.aoppAllData.length <= offset) {
            this.loadMoreAOpp();
        }
        this.aoppData = this.aoppAllData.slice(offset, limit);
    };
    StudentProfile = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'student-profile',
            templateUrl: 'studentProfile.template.html'
        }), 
        __metadata('design:paramtypes', [student_service_1.StudentService, alert_service_1.AlertService, authentication_service_1.AuthenticationService])
    ], StudentProfile);
    return StudentProfile;
}());
exports.StudentProfile = StudentProfile;
//# sourceMappingURL=studentProfile.component.js.map