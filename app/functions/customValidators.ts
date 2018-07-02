import { FormControl } from '@angular/forms';

export class CustomValidators {
    static noSpace(control: FormControl) {
        if (control.value.indexOf(' ') >= 0)
            return { noSpace: true };

        return null;
    }

    static email(control: FormControl) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(control.value))
            return { email: true };

        return null;
    }
    static unique(control: FormControl) {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                if (control.value == "ismail")
                    resolve({ shouldBeUnique: true });
                else
                    resolve(null);
            }, 1000);
        });
    }

    static accepted(control: FormControl) {
        if ((control.value == 1) || (control.value == true) || (control.value == '1'))
            return null;

        return { accepted: true };
    }

    static alpha(control: FormControl) {
        var letters = /^[A-Za-z]+$/;
        if (control.value.match(letters))
            return null;

        return { alpha: true };
    }

    static alphaNum(control: FormControl) {
        var letterNumber = /^[0-9a-zA-Z]+$/;
        if (control.value.match(letterNumber))
            return null;

        return { alpha: true };
    }

    static between(control: FormControl, min: number, max: number) {
        if ((control.value.length >= min) && (control.value.length <= max))
            return null;

        return { between: true };
    }

    static different(control: FormControl, value: string) {
        if (control.value == value)
            return { different: true };

        return null;
    }

    static numeric(control: FormControl) {
        if (isNaN(control.value))
            return { numeric: true };

        return null;
    }

    static required_if(control: FormControl, check: boolean) {
        if (!check)
            return null;

        if (check && (control.value))
            return null;

        return { required_if: true };

    }

}