var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var StringLimit = (function () {
    function StringLimit() {
    }
    StringLimit.prototype.transform = function (value, args) {
        var limit = args > 0 ? args : 10;
        var trail = false ? args : '...';
        return value.length > limit ? value.substring(0, limit) + trail : value;
    };
    return StringLimit;
}());
StringLimit = __decorate([
    Pipe({ name: 'str_limit' })
], StringLimit);
export { StringLimit };
//# sourceMappingURL=StringLimit.pipe.js.map