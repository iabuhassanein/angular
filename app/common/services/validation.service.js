"use strict";
var ValidationService = (function () {
    function ValidationService() {
    }
    ValidationService.getValidatorErrorMessage = function (validatorName, validatorValue) {
        var config = {
            'required': 'This Field is Required',
            'invalidCreditCard': 'Is invalid credit card number',
            'invalidEmail': 'Invalid email address',
            'invalidNoSpace': 'This Field cannot contain space',
            'invalidAlpha': 'This Field must be just alphabet',
            'invalidAalphaNum': 'This Field must be alphabet and/or numbers',
            'invalidAlphaNumSpace': 'The value entered with wrong format',
            'invalidAlphaNumUnder': 'The value entered with wrong format',
            'invalidURL': 'This Field must be valid URL',
            'invalidNumeric': 'This Field must be numbers',
            'invalidAccepted': 'You must agree this field',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': "Minimum length " + validatorValue.requiredLength,
            'maxlength': "Maximum length " + validatorValue.requiredLength
        };
        return config[validatorName];
    };
    ValidationService.noSpace = function (control) {
        if (control.value.indexOf(' ') >= 0)
            return { invalidNoSpace: true };
        return null;
    };
    // static unique(control: FormControl) {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(function () {
    //             if (control.value == "ismail")
    //                 resolve({ shouldBeUnique: true });
    //             else
    //                 resolve(null);
    //         }, 1000);
    //     });
    // }
    ValidationService.alpha = function (control) {
        var letters = /^[A-Za-z]+$/;
        if (control.value.match(letters))
            return null;
        return { invalidAlpha: true };
    };
    ValidationService.string = function (control) {
        var letters = /^[0-9a-zA-Z\s']+$/;
        if (control.value.match(letters))
            return null;
        return { invalidAlpha: true };
    };
    ValidationService.alphaNum = function (control) {
        var letterNumber = /^[0-9a-zA-Z]+$/;
        if (control.value.match(letterNumber))
            return null;
        return { invalidAalphaNum: true };
    };
    ValidationService.alphaNumUnder = function (control) {
        var letterNumber = /^[0-9a-zA-Z_]+$/;
        if (control.value.match(letterNumber))
            return null;
        return { invalidAlphaNumUnder: true };
    };
    ValidationService.alphaNumSpace = function (control) {
        var letterNumbers = /^[A-Za-z\s'-]$/;
        if (control.value.match(letterNumbers))
            return null;
        return { invalidAlphaNumSpace: true };
    };
    ValidationService.url = function (control) {
        var letterNumber = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
        if (control.value.match(letterNumber))
            return null;
        return { invalidURL: true };
    };
    ValidationService.numeric = function (control) {
        if (isNaN(control.value))
            return { invalidNumeric: true };
        return null;
    };
    ValidationService.accepted = function (control) {
        if ((control.value == 1) || (control.value == true) || (control.value == '1'))
            return null;
        return { invalidAccepted: true };
    };
    ValidationService.creditCard = function (control) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/))
            return null;
        return { invalidCreditCard: true };
    };
    ValidationService.email = function (control) {
        // RFC 2822 compliant regex
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (control.value.match(re))
            return null;
        return { invalidEmail: true };
    };
    ValidationService.password = function (control) {
        // {6,16}           - Assert password is between 6 and 16 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/))
            return null;
        return { invalidPassword: true };
    };
    return ValidationService;
}());
exports.ValidationService = ValidationService;
//# sourceMappingURL=validation.service.js.map