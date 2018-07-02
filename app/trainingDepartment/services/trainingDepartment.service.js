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
var TrainingDepartmentService = (function () {
    function TrainingDepartmentService(_http, _authService) {
        this._http = _http;
        this._authService = _authService;
        this._base_url = "http://kfupmf.mmed.email/backend/public/api/";
        this._base_url2 = "http://kfupm.mmed.email:8080/";
    }
    TrainingDepartmentService.prototype.getOppertunities = function (offset, limit) {
        var params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/opportunity?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    TrainingDepartmentService.prototype.getStudents = function (offset, limit) {
        var params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/student?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    TrainingDepartmentService.prototype.approveOppertunity = function (oppID) {
        var params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        var body = JSON.stringify({ "oppID": oppID });
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'trainingDepartment/approveOpportunity?token=' + params, body, options)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    TrainingDepartmentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, authentication_service_1.AuthenticationService])
    ], TrainingDepartmentService);
    return TrainingDepartmentService;
}());
exports.TrainingDepartmentService = TrainingDepartmentService;
//# sourceMappingURL=trainingDepartment.service.js.map