import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

// Services
import { AuthenticationService } from '../../shared/services/authentication.service';
import { RegisterCompanyService } from './../services/registerCompany.service';
import { ValidationService } from '../../common/services/validation.service';
import { AlertService } from '../../shared/services/alert.service';

// Imports Objects
import { Company } from '../../objects/company';
import { CompanyCoordinator } from '../../objects/companyCoordinator';
import { UserInfo } from '../../objects/userInfo';

import { config } from '../../shared/config/path';

@Component({
    moduleId: module.id,
    selector: 'app-company-profile',
    templateUrl: 'profile.template.html',
    providers: [RegisterCompanyService, ValidationService]
})

export class ProfileComponent {
    private _base_url = config.api_url;
    private _base_url_img = config.image_url;
    logoRequired: boolean = false;
    isUpdatingP: boolean = false;
    isUpdatingU: boolean = false;
    allNotValid: boolean;
    user: UserInfo;
    company: Company;
    coordinator: CompanyCoordinator;
    companycoordinator: CompanyCoordinator;
    logo: string;
    companyRegister: FormGroup;
    userRegister: FormGroup;
    companyCoordinator: FormGroup;
    registerConditions: FormGroup;
    constructor(
        private _fb: FormBuilder,
        private _authService: AuthenticationService,
        private _alertService: AlertService,
        private _registerService: RegisterCompanyService
    ) {

    }

    ngOnInit() {
        this.companyRegister = this._fb.group({
            companyName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100), ValidationService.string])],
            companyAddress: ['', Validators.compose([Validators.required, ValidationService.string])],
            companyCountry: ['', Validators.compose([Validators.required, ValidationService.string])],
            companyCity: ['', Validators.compose([Validators.required, ValidationService.string])],
            companyBox: ['', Validators.compose([Validators.required, ValidationService.numeric])],
            companyZipCode: ['', Validators.compose([Validators.required, ValidationService.numeric])],
            companyWebsite: ['', Validators.compose([Validators.required, ValidationService.url])],
            companyAbout: ['', Validators.compose([Validators.required, Validators.maxLength(2024)])],
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
        let profile = this._authService.getProfile();
        if(profile) {
            this.companycoordinator = <CompanyCoordinator>profile;
        }else{
            return;
        }
        
        this.companyRegister.reset({
            companyName: this.companycoordinator.company.englishName,
            companyAddress: this.companycoordinator.company.address,
            companyCountry: this.companycoordinator.company.country,
            companyCity: this.companycoordinator.company.city,
            companyBox: this.companycoordinator.company.poBox,
            companyZipCode: this.companycoordinator.company.zipCode,
            companyWebsite: this.companycoordinator.company.website,
            companyAbout: this.companycoordinator.company.englishAbout,
        });

        this.userRegister.reset({
            userName: this.companycoordinator.userInfo.firstName,
            userPostion: this.companycoordinator.position,
            userEmail: this.companycoordinator.userInfo.email,
            userMobile: this.companycoordinator.mobile,
            userPhone: this.companycoordinator.userInfo.phone,
            userFax: this.companycoordinator.fax
        });

        this.companyCoordinator.reset({
            login: this.companycoordinator.userInfo.login,
            password: ''
        });
        if (this.companycoordinator.company.logo) {
            this.logo = this.companycoordinator.company.logo;
            var image = document.createElement('img');
            image.src = this._base_url_img + this.companycoordinator.company.logo + '/resized?width=150&height=150';
            var div = document.getElementById('logo_container');
            div.innerHTML = "";
            div.appendChild(image);
        }
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
            this._registerService.uploadLogo(file).subscribe(
                result => {
                    if (result.status) {
                        this.logo = result.data;
                        var image = document.createElement('img');
                        image.src = this._base_url_img + this.logo + '/resized?width=150&height=150';
                        var div = document.getElementById('logo_container');
                        div.innerHTML = "";
                        div.appendChild(image);
                        this.logoRequired = false;
                    } else {
                        this._alertService.error(result.message);
                    }
                },
                error => {
                    this._authService.handelError(error);
                    this.isUpdatingP = false;
                },
                () => {
                    this.isUpdatingP = false;
                    return;
                });
        }
    }

    companyUpdateProfile() {
        if (!(this.logo)) {
            this._alertService.error("You Must Upload Company Logo");
            this.logoRequired = true;
            return;
        }
        if (!this.companyRegister.valid) return;
        this.isUpdatingP = true;
        this.company = {
            id: this.companycoordinator.company.id,
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

        this._registerService.updateCompany(this.company).subscribe(
            result => {
                if (result.status) {
                    this._alertService.success(result.message);
                    this._authService.updateProfile(result.profile);
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
                this.isUpdatingP = false;
            },
            () => {
                this.isUpdatingP = false;
                return;
            }
        )
    }

    userUpdateProfile() {
        if (!this.userRegister.valid) return;
        this.isUpdatingU = true;
        this.user = {
            id: this.companycoordinator.userInfo.id,
            firstName: this.userRegister.controls['userName'].value,
            lastName: '',
            phone: this.userRegister.controls['userPhone'].value,
            email: this.userRegister.controls['userEmail'].value
        }
        
        this.coordinator = {
            id: this.companycoordinator.id,
            mobile: this.userRegister.controls['userMobile'].value,
            position: this.userRegister.controls['userPostion'].value,
            fax: this.userRegister.controls['userFax'].value,
            userInfo: this.user
        }
        this._registerService.updateCompanyCoordinator(this.coordinator).subscribe(
            result => {
                if (result.status) {
                    this._alertService.success(result.message);
                    this._authService.updateProfile(result.profile);
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
                this.isUpdatingU = false;
            },
            () => {
                this.isUpdatingU = false;
                return;
            }
        )
    }

}