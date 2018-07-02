var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
var NotFoundComponent = (function () {
    function NotFoundComponent() {
    }
    return NotFoundComponent;
}());
NotFoundComponent = __decorate([
    Component({
        selector: 'not-found',
        template: "\n  <section class=\"header-section\">\n    <div class=\"container\">\n        <div class=\"header-1\">\n            <div class=\"col-md-5 col-xs-8\">\n                <div class=\"logo\">\n                    <a routerLink=\"/\"><img src=\"/assets/images/logo.png\" alt=\"logo\"></a>\n                </div>\n            </div>\n            <div class=\"col-md-5 hidden-sm hidden-xs\">\n                <div class=\"container-fluid\">\n                    <ul class=\"head-menu2 nav navbar-nav\">\n                        <li><a routerLink=\"/\">home</a></li>\n                        <li><a href=\"#\">events</a></li>\n                        <li><a href=\"#\">contact us</a></li>\n                    </ul>\n                </div>\n            </div>\n            <div class=\"col-md-2 col-xs-4\">\n                <div class=\"btn-reg pull-right\">\n                    <a href=\"#\">logout</a>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>\n<section class=\"s_6\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <div class=\"error404\">\n                        <div class=\"error\">\n                            <p>404</p>\n                            <h3>Page Not Found</h3>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n  "
    })
], NotFoundComponent);
export { NotFoundComponent };
//# sourceMappingURL=notFound.component.js.map