var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
// Services
import { AlertService } from './alert.service';
var AuthenticationService = AuthenticationService_1 = (function () {
    function AuthenticationService(http, _router, _alertService) {
        this.http = http;
        this._router = _router;
        this._alertService = _alertService;
        this.limit = 4;
        this.offset = 0;
    }
    AuthenticationService.prototype.logout = function () {
        this.deleteAll('/');
        this._router.navigate(['/']);
    };
    AuthenticationService.prototype.catch401 = function () {
        try {
            this.deleteAll();
            this._router.navigate(['/login'], { queryParams: { returnUrl: this._router.url } });
            return true;
        }
        catch (ex) {
            console.error(ex);
            return false;
        }
    };
    AuthenticationService.prototype.handelError = function (error) {
        if (error.status === 401) {
            this.catch401();
            var error_body = JSON.parse(error._body);
            this._alertService.error(error_body.message, 3000, 'dark');
        }
        else if (error.status === 403) {
            var error_body = JSON.parse(error._body);
            this._alertService.error(error_body.message, 3000, 'dark');
        }
        else {
            this._alertService.error('Internal Error, Please Refrish the page then try again', 3000, 'dark');
        }
    };
    AuthenticationService.prototype.updateProfile = function (opj) {
        this.delete('profile', '/');
        this.set('profile', JSON.stringify(opj), null, '/');
    };
    AuthenticationService.prototype.getToken = function (reqRole) {
        if (this.check('currentUser')) {
            try {
                var obj = JSON.parse(this.get('currentUser'));
                if (obj.role == reqRole)
                    return obj.token;
                return false;
            }
            catch (ex) {
                console.error(ex);
                return false;
            }
        }
    };
    AuthenticationService.prototype.getSession = function () {
        if (this.check('currentUser')) {
            try {
                var obj = JSON.parse(this.get('currentUser'));
                var session = {
                    id: obj.id,
                    role: obj.role,
                    userInfo: obj.userInfo,
                    user_info: obj.user_info
                };
                return session;
            }
            catch (ex) {
                console.error(ex);
                return false;
            }
        }
    };
    AuthenticationService.prototype.getProfile = function () {
        if (this.check('profile')) {
            try {
                var obj = JSON.parse(this.get('profile'));
                return obj;
            }
            catch (ex) {
                console.error(ex);
                return false;
            }
        }
        else {
            this.catch401();
            return false;
        }
    };
    /**
     * Checks the existence of a single cookie by it's name
     *
     * @param  {string} name Identification of the cookie
     * @returns existence of the cookie
     */
    AuthenticationService.prototype.check = function (name) {
        if (typeof document === "undefined")
            return false; // Check if document exist avoiding issues on server side prerendering	
        name = encodeURIComponent(name);
        var regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
        var exists = regexp.test(document.cookie);
        return exists;
    };
    /**
     * Retrieves a single cookie by it's name
     *
     * @param  {string} name Identification of the Cookie
     * @returns The Cookie's value
     */
    AuthenticationService.prototype.get = function (name) {
        if (this.check(name)) {
            name = encodeURIComponent(name);
            var regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
            var result = regexp.exec(document.cookie);
            return decodeURIComponent(result[1]);
        }
        else {
            return '';
        }
    };
    /**
     * Retrieves a a list of all cookie avaiable
     *
     * @returns Object with all Cookies
     */
    AuthenticationService.getAll = function () {
        var cookies = {};
        if (document.cookie && document.cookie != '') {
            var split = document.cookie.split(';');
            for (var i = 0; i < split.length; i++) {
                var currCookie = split[i].split('=');
                currCookie[0] = currCookie[0].replace(/^ /, '');
                cookies[decodeURIComponent(currCookie[0])] = decodeURIComponent(currCookie[1]);
            }
        }
        return cookies;
    };
    /**
     * Save the Cookie
     *
     * @param  {string} name Cookie's identification
     * @param  {string} value Cookie's value
     * @param  {number} expires Cookie's expiration date in days from now or at a specific date from a Date object. If it's undefined the cookie is a session Cookie
     * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
     * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
     * @param  {boolean} secure If true, the cookie will only be available through a secured connection
     */
    AuthenticationService.prototype.set = function (name, value, expires, path, domain, secure) {
        var cookieStr = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';
        if (expires) {
            if (typeof expires === 'number') {
                var dtExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
                cookieStr += 'expires=' + dtExpires.toUTCString() + ';';
            }
            else {
                cookieStr += 'expires=' + expires.toUTCString() + ';';
            }
        }
        if (path) {
            cookieStr += 'path=' + path + ';';
        }
        if (domain) {
            cookieStr += 'domain=' + domain + ';';
        }
        if (secure) {
            cookieStr += 'secure;';
        }
        // console.log(cookieStr);
        document.cookie = cookieStr;
    };
    /**
     * Removes specified Cookie
     *
     * @param  {string} name Cookie's identification
     * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
     * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
     */
    AuthenticationService.prototype.delete = function (name, path, domain) {
        this.set(name, '', -1, path, domain);
    };
    /**
     * Delete all cookie avaiable
     */
    AuthenticationService.prototype.deleteAll = function (path, domain) {
        var cookies = AuthenticationService_1.getAll();
        for (var cookieName in cookies) {
            this.delete(cookieName, path, domain);
        }
    };
    return AuthenticationService;
}());
AuthenticationService = AuthenticationService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        Router,
        AlertService])
], AuthenticationService);
export { AuthenticationService };
var AuthenticationService_1;
//# sourceMappingURL=authentication.service.js.map