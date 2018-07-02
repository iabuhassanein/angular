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
require('rxjs/add/operator/retry');
// Services
var authentication_service_1 = require("../../shared/services/authentication.service");
var CompanyService = (function () {
    function CompanyService(_http, _authService) {
        this._http = _http;
        this._authService = _authService;
        this._base_url = "http://kfupmf.mmed.email/backend/public/api/";
        this._base_url2 = "http://kfupm.mmed.email:8080/";
    }
    CompanyService.prototype.getCompanyOppertunities = function (offset, limit) {
        var params = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        return this._http.get(this._base_url + 'companyOpportunity?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    CompanyService.prototype.getStudentOpp = function (sid) {
        var params = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        return this._http.get(this._base_url + 'activeStudentOpp/' + sid + '?token=' + params)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    CompanyService.prototype.getAppliedStudents = function (offset, limit) {
        var params = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        return this._http.get(this._base_url + 'appliedStudents?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    CompanyService.prototype.getsendOffer = function (body, oppID) {
        var params = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'sendOfferToSTD/' + oppID + '?token=' + params, body, options)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    CompanyService.prototype.getOppAppliedStudents = function (oppID) {
        var params = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        return this._http.get(this._base_url + 'appliedStudents/' + oppID + '?token=' + params)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    CompanyService.prototype.readNotification = function (id) {
        var _this = this;
        var params = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        var headers = new http_1.Headers();
        var body = JSON.stringify({ "noteID": id });
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(this._base_url + 'readNotification?token=' + params, body, options)
            .map(function (res) { return res.json(); })
            .retry(2).subscribe(function (result) { }, function (error) {
            _this._authService.handelError(error);
        });
    };
    CompanyService.prototype.getNotification = function (offset, limit) {
        var params = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        return this._http.get(this._base_url + 'notification?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    CompanyService.prototype.uploadFile = function (file, user_id, opp_id) {
        var formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('user_id', user_id);
        formData.append('opp_id', opp_id);
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'fileToOpp', formData, options)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    CompanyService.prototype.getSupervisors = function (offset, limit) {
        var params = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        return this._http.get(this._base_url + 'supervisor?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    CompanyService.prototype.changeSupervisor = function (SID, appliedID) {
        var params = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        var body = JSON.stringify({ "supervisor": SID, "appliedOpportunity": appliedID });
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'trainingSupervisor?token=' + params, body, options)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    CompanyService.prototype.getCompanyOppertunity = function (oppID) {
        var params = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        return this._http.get(this._base_url + 'companyOpportunity/' + oppID + '?token=' + params)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    CompanyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, authentication_service_1.AuthenticationService])
    ], CompanyService);
    return CompanyService;
}());
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map