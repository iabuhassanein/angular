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
// Services
var authentication_service_1 = require("../../shared/services/authentication.service");
var StudentService = (function () {
    function StudentService(_http, _authService) {
        this._http = _http;
        this._authService = _authService;
        this._base_url = "http://kfupmf.mmed.email/backend/public/api/";
        this._base_url2 = "http://kfupm.mmed.email:8080/";
    }
    StudentService.prototype.getStudent = function (stdID) {
        var params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/student/' + stdID + '?token=' + params)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    StudentService.prototype.getStudentLogs = function (stdID) {
        var params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/studentLog/' + stdID + '?token=' + params)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    StudentService.prototype.getStudentOpportunities = function (stdID) {
        var params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/studentOpportunities/' + stdID + '?token=' + params)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    StudentService.prototype.createStudentComment = function (comment) {
        var params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        var headers = new http_1.Headers();
        var body = JSON.stringify(comment);
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'trainingDepartment/studentComment?token=' + params, body, options)
            .map(function (res) { return res.json(); });
    };
    StudentService.prototype.getStudentComments = function (stdID) {
        var params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/studentComment/' + stdID + '?token=' + params)
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