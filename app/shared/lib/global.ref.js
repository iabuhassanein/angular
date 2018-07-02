"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GlobalRef = (function () {
    function GlobalRef() {
    }
    Object.defineProperty(GlobalRef.prototype, "nativeGlobal", {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    return GlobalRef;
}());
exports.GlobalRef = GlobalRef;
var BrowserGlobalRef = (function (_super) {
    __extends(BrowserGlobalRef, _super);
    function BrowserGlobalRef() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(BrowserGlobalRef.prototype, "nativeGlobal", {
        get: function () { return window; },
        enumerable: true,
        configurable: true
    });
    return BrowserGlobalRef;
}(GlobalRef));
exports.BrowserGlobalRef = BrowserGlobalRef;
var NodeGlobalRef = (function (_super) {
    __extends(NodeGlobalRef, _super);
    function NodeGlobalRef() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(NodeGlobalRef.prototype, "nativeGlobal", {
        get: function () { return global; },
        enumerable: true,
        configurable: true
    });
    return NodeGlobalRef;
}(GlobalRef));
exports.NodeGlobalRef = NodeGlobalRef;
//# sourceMappingURL=global.ref.js.map