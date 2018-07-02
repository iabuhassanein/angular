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
// SErvices
var alert_service_1 = require("../../shared/services/alert.service");
var authentication_service_1 = require("../../shared/services/authentication.service");
var AuthGuard = (function () {
    function AuthGuard(_router, _alertService, _authService) {
        this._router = _router;
        this._alertService = _alertService;
        this._authService = _authService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (this._authService.check('currentUser')) {
            try {
                var obj = JSON.parse(this._authService.get('currentUser'));
                if (obj.role == "ROLE_COMPANY_COORDINATOR")
                    return true;
                var session = this._authService.getSession();
                var url = this.getProfileURL(session.role);
                this._alertService.success('You Are Already Logged in');
                this._router.navigate([url]);
                return false;
            }
            catch (ex) {
                return false;
            }
        }
        // not logged in so redirect to login page with the return url
        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    AuthGuard.prototype.getProfileURL = function (type) {
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
    AuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, alert_service_1.AlertService, authentication_service_1.AuthenticationService])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map