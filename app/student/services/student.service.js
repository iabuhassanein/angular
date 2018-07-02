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
require('rxjs/add/operator/retry');
// Objects
// import { Student } from '../../objects/student';
// Services
var authentication_service_1 = require("../../shared/services/authentication.service");
var StudentService = (function () {
    function StudentService(_http, _authService) {
        this._http = _http;
        this._authService = _authService;
        this._base_url = "http://kfupmf.mmed.email/backend/public/api/";
        this._base_url2 = "http://kfupm.mmed.email:8080/";
    }
    StudentService.prototype.readNotification = function (id) {
        var _this = this;
        var params = this._authService.getToken("ROLE_STUDENT");
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
    StudentService.prototype.acceptOpp = function (oppID) {
        var params = this._authService.getToken("ROLE_STUDENT");
        var body = JSON.stringify({ "oppID": oppID });
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'acceptOpportunity?token=' + params, body, options)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    StudentService.prototype.getAnnouncements = function (offset, limit) {
        var params = this._authService.getToken("ROLE_STUDENT");
        return this._http.get(this._base_url + 'news?type=announcements&offset=' + offset + '&limit=' + limit)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    StudentService.prototype.getNotification = function (offset, limit) {
        var params = this._authService.getToken("ROLE_STUDENT");
        return this._http.get(this._base_url + 'notification?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    StudentService.prototype.getOppertunities = function (offset, limit) {
        var params = this._authService.getToken("ROLE_STUDENT");
        return this._http.get(this._base_url + 'opportunity?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    StudentService.prototype.getOppertunity = function (oppID) {
        var params = this._authService.getToken("ROLE_STUDENT");
        return this._http.get(this._base_url + 'opportunity/' + oppID + '?token=' + params)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    StudentService.prototype.getappliedOppertunities = function (offset, limit) {
        var params = this._authService.getToken("ROLE_STUDENT");
        return this._http.get(this._base_url + 'appliedOpportunity?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    StudentService.prototype.applyOppertunity = function (oppID) {
        var params = this._authService.getToken("ROLE_STUDENT");
        var body = JSON.stringify({ "oppID": oppID });
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'appliedOpportunity?token=' + params, body, options)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    StudentService.prototype.uploadCV = function (file) {
        var params = this._authService.getToken("ROLE_STUDENT");
        var formData = new FormData();
        formData.append('file', file, file.name);
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'uploadCV?token=' + params, formData, options)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    StudentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, authentication_service_1.AuthenticationService])
    ], StudentService);
    return StudentService;
}());
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map