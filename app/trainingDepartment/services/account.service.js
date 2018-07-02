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
// import { OpportunityComment } from '../../objects/opportunityComment';
// Services
var authentication_service_1 = require("../../shared/services/authentication.service");
var AccountService = (function () {
    function AccountService(_http, _authService) {
        this._http = _http;
        this._authService = _authService;
        this._base_url = "http://kfupmf.mmed.email/backend/public/api/";
        this._base_url2 = "http://kfupm.mmed.email:8080/";
    }
    AccountService.prototype.getTrainingDepartmentAccounts = function (offset, limit) {
        var params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/trainingDepartmentAccount?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    AccountService.prototype.getAcademicDepartmentAccounts = function (offset, limit) {
        var params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/academicDepartmentAccount?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    AccountService.prototype.getStudentAccounts = function (offset, limit) {
        var params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/studentAccount?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    AccountService.prototype.getFilterData = function () {
        var params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/filterData?token=' + params)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    AccountService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, authentication_service_1.AuthenticationService])
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map