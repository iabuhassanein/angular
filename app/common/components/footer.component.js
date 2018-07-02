var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
var FooterComponent = (function () {
    function FooterComponent(route, router) {
        this.route = route;
        this.router = router;
        this.footerType = 'main';
    }
    FooterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscribtion = this.router.events
            .filter(function (event) { return event instanceof NavigationEnd; })
            .subscribe(function (event) {
            var currentRoute = _this.route.root;
            while (currentRoute.children[0] !== undefined) {
                currentRoute = currentRoute.children[0];
                _this.routeD = currentRoute.snapshot.data;
            }
            if (_this.routeD.hasOwnProperty('footer')) {
                // console.log(this.routeD['footer']);
                _this.footerType = _this.routeD['footer'];
            }
        });
    };
    FooterComponent.prototype.ngOnDestroy = function () {
        this.subscribtion.unsubscribe();
    };
    return FooterComponent;
}());
FooterComponent = __decorate([
    Component({
        selector: 'footer',
        template: "\n    <div [ngSwitch]=\"footerType\"> \n    <section *ngSwitchCase=\"'main'\" class=\"s_3\">\n        <div class=\"footer-bottom-three\">\n            <div class=\"container\">\n                <div class=\"new-footer-bd\">\n                    <div class=\"row\">\n                        <div class=\"col-md-4\">\n                            <div class=\"logo-footer\">\n                                <a href=\"/\"><img src=\"/assets/images/logo.png\" alt=\"logo\"></a>\n                            </div>\n                        </div>\n                        <div class=\"col-md-5\">\n                            <div class=\"container-fluid\">\n                                <ul class=\"footer-menu\">\n                                    <li><a href=\"#\">Terms of service</a></li>\n                                    <li><a href=\"#\">Privacy policy</a></li>\n                                    <li><a href=\"#\">Contacts</a></li>\n                                    <li><a href=\"#\">Support</a></li>\n                                </ul>\n                            </div>\n                        </div>\n                        <div class=\"col-md-3\">\n                            <div class=\"social-footer\">\n                                <ul class=\"social-menu\">\n                                    <li class=\"face-h\">\n                                        <a href=\"#\">\n                                            <span class=\"new-txt new-txt-y\">Facebook</span>\n                                            <i class=\"fa fa-facebook\" aria-hidden=\"true\"></i>\n                                        </a>\n                                    </li>\n                                    <li class=\"twi-h\">\n                                        <a href=\"#\">\n                                            <span class=\"new-txt\">Twitter</span>\n                                            <i class=\"fa fa-twitter\" aria-hidden=\"true\"></i>\n                                        </a>\n                                    </li>\n                                    <li class=\"goo-h\">\n                                        <a href=\"#\">\n                                            <span class=\"new-txt\">Google</span>\n                                            <i class=\"fa fa-google-plus\" aria-hidden=\"true\"></i>\n                                        </a>\n                                    </li>\n                                    <li class=\"inst-h\">\n                                        <a href=\"#\">\n                                            <span class=\"new-txt new-txt-y\">Instagram</span>\n                                            <i class=\"fa fa-instagram\" aria-hidden=\"true\"></i>\n                                        </a>\n                                    </li>\n                                </ul>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n    </div>\n    "
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        Router])
], FooterComponent);
export { FooterComponent };
//# sourceMappingURL=footer.component.js.map