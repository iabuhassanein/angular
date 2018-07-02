import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';

// Object
// import { Session } from '../../objects/session';

// Services
import { ValidationService } from '../../common/services/validation.service';
import { AlertService } from '../../shared/services/alert.service';
import { MainService } from '../services/main.service';


@Component({
    moduleId: module.id,
    selector: 'contact-us',
    templateUrl: './contact.template.html',
    providers: [MainService, ValidationService]
})

export class ContactComponent {
    isLoggindInb: boolean = false;
    isSending: boolean = false;
    contactForm: FormGroup;
    message: any;
    constructor(
        private _authService: AuthenticationService,
        private _alertService: AlertService,
        private _mainService: MainService,
        private _router: Router,
        private _fb: FormBuilder,
    ) { }
    
    ngOnInit(){
        if (this._authService.check('currentUser')) {
            this.isLoggindInb = true;
        }
        this.contactForm = this._fb.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100), ValidationService.string])],
            email: ['', Validators.compose([Validators.required, ValidationService.email])],
            title: ['', Validators.compose([Validators.required, ValidationService.string])],
            content: ['', Validators.compose([Validators.required, ValidationService.string])],
        });
    }
    sendMessage(){
        this.isSending = true;
        if (!this.contactForm.valid) return;
        this.message = {
            name: this.contactForm.controls['name'].value,
            email: this.contactForm.controls['email'].value,
            title: this.contactForm.controls['title'].value,
            content: this.contactForm.controls['content'].value,
        }
        
        this._mainService.sendMessage(this.message).subscribe(
            result => {
                if (result.status) {
                    this._alertService.success(result.message, 6000, 'dark');
                    this.contactForm.reset({ name: '', email: '', title: '', content: ''});
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
                this.isSending = false;
            },
            () => {
                this.isSending = false;
                return;
            });
    }
}

