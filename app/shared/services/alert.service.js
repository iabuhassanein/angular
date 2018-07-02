var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var AlertService = (function () {
    function AlertService() {
    }
    AlertService.prototype.ngAfterViewInit = function () {
        throw new Error('Method not implemented.');
    };
    AlertService.prototype.notification = function (message, hide, duration, cmode) {
        if (hide === void 0) { hide = true; }
        if (duration === void 0) { duration = 5000; }
        if (cmode === void 0) { cmode = 'light'; }
        $.iaoAlert({ msg: message, type: "notification", mode: cmode, autoHide: hide, alertTime: duration, fadeOnHover: false, position: "center", closeButton: true, closeOnClick: false });
    };
    AlertService.prototype.success = function (message, duration, cmode) {
        if (duration === void 0) { duration = 5000; }
        if (cmode === void 0) { cmode = 'light'; }
        $.iaoAlert({ msg: message, type: "success", mode: cmode, alertTime: duration, closeButton: false, closeOnClick: true });
    };
    AlertService.prototype.error = function (message, duration, cmode) {
        if (duration === void 0) { duration = 5000; }
        if (cmode === void 0) { cmode = 'light'; }
        $.iaoAlert({ msg: message, type: "error", mode: cmode, alertTime: duration, closeButton: false, closeOnClick: true });
    };
    AlertService.prototype.warning = function (message, duration, cmode) {
        if (duration === void 0) { duration = 5000; }
        if (cmode === void 0) { cmode = 'light'; }
        $.iaoAlert({ msg: message, type: "warning", mode: cmode, alertTime: duration, closeButton: false, closeOnClick: true });
    };
    return AlertService;
}());
AlertService = __decorate([
    Injectable()
], AlertService);
export { AlertService };
//# sourceMappingURL=alert.service.js.map