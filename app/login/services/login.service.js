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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
// Services
var authentication_service_1 = require("../../shared/services/authentication.service");
var alert_service_1 = require('../../shared/services/alert.service');
var LoginService = (function () {
    function LoginService(_http, _authService, _alertService) {
        this._http = _http;
        this._authService = _authService;
        this._alertService = _alertService;
        this._base_url = "http://kfupmf.mmed.email/backend/public/api/";
        this._base_url2 = "http://kfupm.mmed.email:8080/";
    }
    LoginService.prototype.loginProccess = function (user) {
        var _this = this;
        var headers = new http_1.Headers();
        var body = JSON.stringify(user);
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'login', body, options)
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var res = response.json();
            if (res.status) {
                var sessdata = res.session;
                var profiledata = res.profile;
                _this._authService.delete('currentUser');
                _this._authService.delete('profile');
                _this._authService.set('currentUser', JSON.stringify(sessdata), null, '/');
                _this._authService.set('profile', JSON.stringify(profiledata), null, '/');
                // this.getProfile(sessdata.userInfo, sessdata.role);
                return true;
            }
            else {
                _this._alertService.error(res.message);
                return false;
            }
        });
    };
    LoginService.prototype.getProfile = function (id, type) {
        var _this = this;
        var params = this._authService.getToken(type);
        var url = '';
        var cookieName = '';
        var getData = false;
        switch (type) {
            case "ROLE_ADMIN":
                url = this._base_url + 'companyCoordinator?token=' + params;
                cookieName = 'admin';
                break;
            case "ROLE_TRAINING_DEPARTMENT":
                url = this._base_url + 'companyCoordinator?token=' + params;
                cookieName = 'trainingDepartment';
                break;
            case "ROLE_COMPANY_COORDINATOR":
                getData = true;
                url = this._base_url + 'companyCoordinator?token=' + params;
                cookieName = 'companyCoordinator';
                break;
            case "ROLE_SUPERVISOR":
                url = this._base_url + 'companyCoordinator?token=' + params;
                cookieName = 'supervisor';
                break;
            case "ROLE_ACADEMIC_DEPARTMENT":
                url = this._base_url + 'companyCoordinator?token=' + params;
                cookieName = 'companyCoordinator';
                break;
            case "ROLE_TRAINING_ADVISOR":
                url = this._base_url + 'companyCoordinator?token=' + params;
                cookieName = 'trainingAdvisor';
                break;
            case "ROLE_STUDENT":
                url = this._base_url + 'companyCoordinator?token=' + params;
                cookieName = 'student';
                break;
            default:
                break;
        }
        if (getData)
            return this._http.get(url)
                .map(function (response) {
                // login successful if there's a jwt token in the response
                var res = response.json();
                if (res.status) {
                    _this._authService.delete(cookieName);
                    _this._authService.set(cookieName, JSON.stringify(res.data));
                    return true;
                }
                else {
                    _this._alertService.error(res.message);
                    console.log('internal Error');
                    return false;
                }
            })
                .retry(2).subscribe(function (result) {
                return result;
            }, function (error) {
                console.log('internal Error');
                _this._alertService.error("Internal Error, Please Refresh Page");
                return false;
            });
        return false;
    };
    LoginService.prototype.logout = function () {
        this._authService.delete('currentUser');
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, authentication_service_1.AuthenticationService, alert_service_1.AlertService])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map