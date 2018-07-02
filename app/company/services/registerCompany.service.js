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
// import { Http, Jsonp, Headers, RequestOptions } from '@angular/http';
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
// Services
var authentication_service_1 = require('../../shared/services/authentication.service');
var RegisterCompanyService = (function () {
    function RegisterCompanyService(_http, _authService) {
        this._http = _http;
        this._authService = _authService;
        this._base_url = "http://kfupmf.mmed.email/backend/public/api/";
        this._base_url2 = "http://kfupm.mmed.email:8080/";
    }
    RegisterCompanyService.prototype.uploadLogo = function (file) {
        var formData = new FormData();
        formData.append('file', file, file.name);
        var headers = new http_1.Headers();
        // headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'image', formData, options)
            .map(function (res) { return res.json(); });
        // .subscribe(
        // data => console.log('success: '+ data),
        // error => console.log(error)
        // )
    };
    RegisterCompanyService.prototype.createCompanyAccount = function (coordinator) {
        var headers = new http_1.Headers();
        var body = JSON.stringify(coordinator);
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'companyAccount', body, options)
            .map(function (res) { return res.json(); });
    };
    RegisterCompanyService.prototype.updateCompany = function (company) {
        var params = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        var headers = new http_1.Headers();
        var body = JSON.stringify(company);
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(this._base_url + 'company/' + company.id + '?token=' + params, body, options)
            .map(function (res) { return res.json(); });
    };
    // getUserTypes(): Promise<UserType[]> {
    //     return this._http.get(this._base_url + "userType")
    //         .map(res => res.json())
    //         .toPromise();
    // }
    RegisterCompanyService.prototype.createUser = function (user) {
        var headers = new http_1.Headers();
        var body = JSON.stringify(user);
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'userInfo', body, options)
            .map(function (res) { return res.json(); });
    };
    RegisterCompanyService.prototype.updateCompanyCoordinator = function (coordinator) {
        var params = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        var headers = new http_1.Headers();
        var body = JSON.stringify(coordinator);
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(this._base_url + 'companyCoordinator/' + coordinator.id + '?token=' + params, body, options)
            .map(function (res) { return res.json(); });
    };
    RegisterCompanyService.prototype.createCompanyCoordinator = function (coordinator) {
        var headers = new http_1.Headers();
        var body = JSON.stringify(coordinator);
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'companyCoordinator', body, options)
            .map(function (res) { return res.json(); });
    };
    RegisterCompanyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, authentication_service_1.AuthenticationService])
    ], RegisterCompanyService);
    return RegisterCompanyService;
}());
exports.RegisterCompanyService = RegisterCompanyService;
//# sourceMappingURL=registerCompany.service.js.map