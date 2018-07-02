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
var MainService = (function () {
    function MainService(_http) {
        this._http = _http;
        this._base_url = 'http://kfupmf.mmed.email/backend/public/api/';
        this.limit = 4;
        this.offset = 0;
    }
    MainService.prototype.sendMessage = function (msg) {
        var headers = new http_1.Headers();
        var body = JSON.stringify(msg);
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'message', body, options)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    MainService.prototype.getAnnouncements = function (offset, limit) {
        return this._http.get(this._base_url + 'news?type=announcements&offset=' + offset + '&limit=' + limit)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    MainService.prototype.getEvents = function (offset, limit) {
        return this._http.get(this._base_url + 'event?offset=' + offset + '&limit=' + limit)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    MainService.prototype.getPost = function (getPost) {
        return this._http.get(this._base_url + 'news/' + getPost)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    MainService.prototype.getEvent = function (getPost) {
        return this._http.get(this._base_url + 'event/' + getPost)
            .map(function (res) { return res.json(); })
            .retry(2);
    };
    MainService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MainService);
    return MainService;
}());
exports.MainService = MainService;
//# sourceMappingURL=main.service.js.map