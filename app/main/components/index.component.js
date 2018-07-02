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
var authentication_service_1 = require('../../shared/services/authentication.service');
var alert_service_1 = require('../../shared/services/alert.service');
var main_service_1 = require('../services/main.service');
var IndexPage = (function () {
    function IndexPage(_authService, _mainService, _alertService, _router) {
        this._authService = _authService;
        this._mainService = _mainService;
        this._alertService = _alertService;
        this._router = _router;
        this.isLoggindInb = false;
        this.isLoggindIn = 'no';
        this.loggindInURL = '/login';
        this.hloggindInURL = '/login';
        this.announcements = [];
    }
    IndexPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this._router.url == '/logout') {
            this._authService.logout();
        }
        else if (this._authService.check('currentUser')) {
            this.isLoggindInb = true;
            var session = this._authService.getSession();
            this.isLoggindIn = session.role;
            this.loggindInURL = this.getProfileURL(session.role);
            this.hloggindInURL = '/logout';
        }
        this._mainService.getAnnouncements(0, 5).subscribe(function (result) {
            if (result.status) {
                _this.announcements = result.data;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
    };
    IndexPage.prototype.ngAfterViewInit = function () {
        $(document).ready(function () {
            $('.owl-carousel').owlCarousel({
                rewindNav: true,
                pagination: true,
                loop: true,
                dots: true,
                autoplay: true,
                autoplayTimeout: 2500,
                autoplayHoverPause: true,
                items: 1,
            });
        });
    };
    IndexPage.prototype.getProfileURL = function (type) {
        switch (type) {
            case "ROLE_ADMIN":
                return '/admin';
            case "ROLE_TRAINING_DEPARTMENT":
                return '/training-department';
            case "ROLE_COMPANY_COORDINATOR":
                return '/company';
            case "ROLE_SUPERVISOR":
                return '/supervisor';
            case "ROLE_ACADEMIC_DEPARTMENT":
                return '/academic-department';
            case "ROLE_TRAINING_ADVISOR":
                return '/training-advisor';
            case "ROLE_STUDENT":
                return '/student';
            default:
                return '/';
        }
    };
    IndexPage = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'index',
            templateUrl: './index.template.html',
            providers: [main_service_1.MainService]
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, main_service_1.MainService, alert_service_1.AlertService, router_1.Router])
    ], IndexPage);
    return IndexPage;
}());
exports.IndexPage = IndexPage;
//# sourceMappingURL=index.component.js.map