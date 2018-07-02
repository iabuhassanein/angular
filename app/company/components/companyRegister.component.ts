import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { RegisterCompanyService } from './../services/registerCompany.service';
import { ValidationService } from '../../common/services/validation.service';
import { AlertService } from '../../shared/services/alert.service';
import { AuthenticationService } from "../../shared/services/authentication.service";

// Imports Objects
import { Company } from '../../objects/company';
import { CompanyCoordinator } from '../../objects/companyCoordinator';
import { UserInfo } from '../../objects/userInfo';
import { Session } from '../../objects/session';

import { config } from '../../shared/config/path';

@Component({
    moduleId: module.id,
    selector: 'companyReg',
    templateUrl: 'companyRegister.template.html',
    providers: [RegisterCompanyService, ValidationService]
})

export class CompanyRegisterComponent {
    private _base_url = config.api_url;
    private _base_url_img = config.image_url;
    logoRequired: boolean = false;
    allNotValid: boolean;
    isRegistering: boolean = false;
    user: UserInfo;
    company: Company;
    coordinator: CompanyCoordinator;
    logo: string;
    companyRegister: FormGroup;
    userRegister: FormGroup;
    companyCoordinator: FormGroup;
    registerConditions: FormGroup;
    constructor(
        private _fb: FormBuilder,
        private _router: Router,
        private _authService: AuthenticationService,
        private _registerService: RegisterCompanyService,
        private _alertService: AlertService,
        private _route: ActivatedRoute,
    ) {

    }

    ngOnInit() {
        let returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        this.companyRegister = this._fb.group({
            companyName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100), ValidationService.string])],
            companyAddress: ['', Validators.compose([Validators.required, ValidationService.string])],
            companyCountry: ['', Validators.compose([Validators.required, ValidationService.string])],
            companyCity: ['', Validators.compose([Validators.required, ValidationService.string])],
            companyBox: ['', Validators.compose([Validators.required, ValidationService.numeric])],
            companyZipCode: ['', Validators.compose([Validators.required, ValidationService.numeric])],
            companyWebsite: ['', Validators.compose([Validators.required, ValidationService.url])],
            companyAbout: ['', Validators.compose([Validators.required, Validators.maxLength(160)])],
        });
        this.userRegister = this._fb.group({
            userName: ['', Validators.compose([Validators.required, ValidationService.string])],
            userPostion: ['', Validators.compose([Validators.required, ValidationService.string])],
            userEmail: ['', Validators.compose([Validators.required, ValidationService.email])],
            userMobile: ['', Validators.compose([Validators.required, ValidationService.numeric])],
            userPhone: ['', Validators.compose([Validators.required, ValidationService.numeric])],
            userFax: ['', Validators.compose([Validators.required, ValidationService.numeric])]
        });
        this.companyCoordinator = this._fb.group({
            login: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(16), ValidationService.noSpace, ValidationService.alphaNumUnder])],
            password: ['', Validators.compose([Validators.required, ValidationService.password])],
        });
        this.registerConditions = this._fb.group({
            term: ['', Validators.compose([Validators.required, ValidationService.accepted])]
        });
        if (this._authService.check('currentUser') && this._authService.check('profile')) {
            this._alertService.success('You Are Already Logged in');
            if (returnUrl != '/') this._router.navigate([returnUrl]);
            let session: Session = this._authService.getSession();
            let url = this.getProfileURL(session.role);
            this._router.navigate([url]);
            return;
        }
        // if (this.companyRegister.valid && this.userRegister.valid && this.companyCoordinator.valid) {
        //     this.allNotValid = false;
        // } else {
        //     this.allNotValid = true;
        // }
    }
    OpenCompanyIconUpload() {
        var elem = document.getElementById('companyLogoInput');
        if (elem && document.createEvent) {
            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", true, false);
            elem.dispatchEvent(evt);
        }
    }


    // appendHtml(document.body, html);
    UploadCompanyLogo(event: any) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let file: File = fileList[0];
            let subscribe = this._registerService.uploadLogo(file).subscribe(logoName => {
                this.logo = logoName.fileName;
                var image = document.createElement('img');
                image.src = this._base_url_img + 'image/150x150/' + this.logo;
                var div = document.getElementById('logo_container');
                div.innerHTML = "";
                div.appendChild(image);
            });
        }
    }

    companyRegisterSubmit() {
        if (!(this.logo)) {
            this._alertService.error("You Must Upload Company Logo");
            this.logoRequired = true;
            return;
        }
        if (!this.companyRegister.valid) return;
        this.company = {
            englishName: this.companyRegister.controls['companyName'].value,
            arabicName: this.companyRegister.controls['companyName'].value,
            address: this.companyRegister.controls['companyAddress'].value,
            city: this.companyRegister.controls['companyCity'].value,
            poBox: this.companyRegister.controls['companyBox'].value,
            country: this.companyRegister.controls['companyCountry'].value,
            zipCode: this.companyRegister.controls['companyZipCode'].value,
            website: this.companyRegister.controls['companyWebsite'].value,
            englishAbout: this.companyRegister.controls['companyAbout'].value,
            arabicAbout: this.companyRegister.controls['companyAbout'].value,
            logo: this.logo
        }
        this.user = {
            firstName: this.userRegister.controls['userName'].value,
            lastName: '',
            login: this.companyCoordinator.controls['login'].value,
            password: this.companyCoordinator.controls['password'].value,
            phone: this.userRegister.controls['userPhone'].value,
            email: this.userRegister.controls['userEmail'].value,
            userRole: 'ROLE_COMPANY_COORDINATOR'
        }
        this.coordinator = {
            mobile: this.userRegister.controls['userMobile'].value,
            position: this.userRegister.controls['userPostion'].value,
            fax: this.userRegister.controls['userFax'].value,
            company: this.company,
            userInfo: this.user
        }
        this.isRegistering = true;
        this._registerService.createCompanyAccount(this.coordinator).subscribe(
            result => {
                if (result.status) {
                    this._alertService.success(result.message, 6000, 'dark');
                    setTimeout(() => {
                        this._router.navigate(['/login'], { queryParams: { returnUrl: '/company' } });
                    }, 3000)
                } else {
                    this._alertService.error(result.message, 15000);
                }
            },
            error => {
                this._authService.handelError(error);
                this.isRegistering = false;
            },
            () => {
                this.isRegistering = false;
                return;
            });
    }

    getProfileURL(type: string): string {
        switch (type) {
            case "ROLE_ADMIN":
                return '/admin';
            case "ROLE_TRAINING_DEPARTMENT":
                return '/training-department';
            case "ROLE_COMPANY_COORDINATOR":
                return '/company';
            case "ROLE_SUPERVISOR":
                return '/supervisor';
            case "ROLE_ACADEMIC_DEPARTMENT":
                return '/academic-department';
            case "ROLE_TRAINING_ADVISOR":
                return '/training-advisor';
            case "ROLE_STUDENT":
                return '/student';
            default:
                return '/';
        }
    }
}