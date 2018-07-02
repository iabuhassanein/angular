var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
var HeaderComponent = (function () {
    function HeaderComponent() {
        this.isLoggingIn = false;
    }
    return HeaderComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], HeaderComponent.prototype, "isLoggingIn", void 0);
HeaderComponent = __decorate([
    Component({
        selector: 'ng-header',
        template: "\n        <div class=\"header-1\">\n            <div class=\"col-md-5 col-xs-8\">\n                <div class=\"logo\">\n                    <a routerLink=\"/\"><img src=\"/assets/images/logo.png\" alt=\"logo\"></a>\n                </div>\n            </div>\n            <div class=\"col-md-5 hidden-sm hidden-xs\">\n                <div class=\"container-fluid\">\n                    <ul class=\"head-menu2 nav navbar-nav\">\n                        <li><a routerLink=\"/\">home</a></li>\n                        <li><a routerLink=\"/events\">events</a></li>\n                        <li><a routerLink=\"/contact-us\">contact us</a></li>\n                    </ul>\n                </div>\n            </div>\n            <div class=\"col-md-2 col-xs-4\">\n                <div class=\"btn-reg pull-right\">\n                    <a routerLink=\"{{ (isLoggingIn)?'/logout':'/login' }}\">{{ (isLoggingIn)?'logout':'login' }}</a>\n                </div>\n            </div>\n        </div>\n    "
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map