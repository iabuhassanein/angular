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
var ReportService = (function () {
    function ReportService(_http, _authService) {
        this._http = _http;
        this._authService = _authService;
        this._base_url = "http://kfupmf.mmed.email/backend/public/api/";
        this._base_url2 = "http://kfupm.mmed.email:8080/";
    }
    ReportService.prototype.getADStatistics = function () {
        var params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/statistics?token=' + params)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    ReportService.prototype.getFilterData = function () {
        var params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/filterData?token=' + params)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    ReportService.prototype.getReports = function (type, m, coop, summer, t, inter, c, city) {
        if (type === void 0) { type = 'student'; }
        if (m === void 0) { m = 0; }
        if (coop === void 0) { coop = 0; }
        if (summer === void 0) { summer = 0; }
        if (t === void 0) { t = 0; }
        if (inter === void 0) { inter = 0; }
        if (c === void 0) { c = 0; }
        if (city === void 0) { city = 0; }
        var params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/reports?token=' + params + '&type=' + type + '&major=' + m
            + '&term=' + t + '&company=' + c + '&city=' + city + '&coop=' + coop + '&summerTraining=' + summer + '&international=' + inter)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    ReportService.prototype.getReportsFile = function (type, m, coop, summer, t, inter, c, city) {
        if (type === void 0) { type = 'student'; }
        if (m === void 0) { m = 0; }
        if (coop === void 0) { coop = 0; }
        if (summer === void 0) { summer = 0; }
        if (t === void 0) { t = 0; }
        if (inter === void 0) { inter = 0; }
        if (c === void 0) { c = 0; }
        if (city === void 0) { city = 0; }
        var params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/reportsFile?token=' + params + '&type=' + type + '&major=' + m
            + '&term=' + t + '&company=' + c + '&city=' + city + '&coop=' + coop + '&summerTraining=' + summer + '&international=' + inter)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    ReportService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, authentication_service_1.AuthenticationService])
    ], ReportService);
    return ReportService;
}());
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map