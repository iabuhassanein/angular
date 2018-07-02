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
var router_1 = require('@angular/router');
// import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
var authentication_service_1 = require('../../shared/services/authentication.service');
// Services
var validation_service_1 = require('../../common/services/validation.service');
var alert_service_1 = require('../../shared/services/alert.service');
var main_service_1 = require('../services/main.service');
var ContentComponent = (function () {
    function ContentComponent(_authService, _alertService, _mainService, _router) {
        this._authService = _authService;
        this._alertService = _alertService;
        this._mainService = _mainService;
        this._router = _router;
        this.isLoggindInb = false;
    }
    ContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this._authService.check('currentUser')) {
            this.isLoggindInb = true;
        }
        this.subscribtion = this._router.params.subscribe(function (params) {
            _this.postID = +params['id'];
        });
        this._mainService.getPost(this.postID).subscribe(function (result) {
            if (result.status) {
                _this.post = result.data;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
    };
    ContentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'content-single',
            templateUrl: './content.template.html',
            providers: [main_service_1.MainService, validation_service_1.ValidationService]
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, alert_service_1.AlertService, main_service_1.MainService, router_1.ActivatedRoute])
    ], ContentComponent);
    return ContentComponent;
}());
exports.ContentComponent = ContentComponent;
//# sourceMappingURL=content.component.js.map