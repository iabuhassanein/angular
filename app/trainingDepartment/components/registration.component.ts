import { Component } from '@angular/core';

// Services
import { AlertService } from '../../shared/services/alert.service';
import { RegistrationService } from '../services/registration.service';
import { AuthenticationService } from '../../shared/services/authentication.service';


// Objects
import { Term } from "../../objects/term";

@Component({
    moduleId: module.id,
    selector: 'td-registration',
    templateUrl: 'registration.template.html',
    providers: [RegistrationService]
})

export class RegistrationComponent {
    terms: Term [] = [];
    constructor(
        private _regService: RegistrationService,
        private _alertService: AlertService,
        private _authService: AuthenticationService
    ) { }

    ngOnInit() {

        this._regService.getTerms(0, -1).subscribe(
            result => {
                if (result.status) {
                    this.terms = result.data;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            });
    }
}