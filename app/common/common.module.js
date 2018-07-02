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
var common_1 = require('@angular/common');
// Components 
var controlMessages_component_1 = require('./components/controlMessages.component');
// Pipes
var boolean_pipe_1 = require('../functions/boolean.pipe');
var AppCommonModule = (function () {
    function AppCommonModule() {
    }
    AppCommonModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [
                controlMessages_component_1.ControlMessages,
                boolean_pipe_1.ReadableBoolean
            ],
            exports: [
                controlMessages_component_1.ControlMessages,
                boolean_pipe_1.ReadableBoolean
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppCommonModule);
    return AppCommonModule;
}());
exports.AppCommonModule = AppCommonModule;
//# sourceMappingURL=common.module.js.map