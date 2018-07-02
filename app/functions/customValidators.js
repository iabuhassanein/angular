"use strict";
var CustomValidators = (function () {
    function CustomValidators() {
    }
    CustomValidators.noSpace = function (control) {
        if (control.value.indexOf(' ') >= 0)
            return { noSpace: true };
        return null;
    };
    CustomValidators.email = function (control) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(control.value))
            return { email: true };
        return null;
    };
    CustomValidators.unique = function (control) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (control.value == "ismail")
                    resolve({ shouldBeUnique: true });
                else
                    resolve(null);
            }, 1000);
        });
    };
    CustomValidators.accepted = function (control) {
        if ((control.value == 1) || (control.value == true) || (control.value == '1'))
            return null;
        return { accepted: true };
    };
    CustomValidators.alpha = function (control) {
        var letters = /^[A-Za-z]+$/;
        if (control.value.match(letters))
            return null;
        return { alpha: true };
    };
    CustomValidators.alphaNum = function (control) {
        var letterNumber = /^[0-9a-zA-Z]+$/;
        if (control.value.match(letterNumber))
            return null;
        return { alpha: true };
    };
    CustomValidators.between = function (control, min, max) {
        if ((control.value.length >= min) && (control.value.length <= max))
            return null;
        return { between: true };
    };
    CustomValidators.different = function (control, value) {
        if (control.value == value)
            return { different: true };
        return null;
    };
    CustomValidators.numeric = function (control) {
        if (isNaN(control.value))
            return { numeric: true };
        return null;
    };
    CustomValidators.required_if = function (control, check) {
        if (!check)
            return null;
        if (check && (control.value))
            return null;
        return { required_if: true };
    };
    return CustomValidators;
}());
exports.CustomValidators = CustomValidators;
//# sourceMappingURL=customValidators.js.map