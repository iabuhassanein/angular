import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SupervisorService } from './../services/supervisor.service';
import { ValidationService } from '../../common/services/validation.service';

// Components 
import { Supervisor } from '../../objects/supervisor';
import { UserInfo } from '../../objects/userInfo';

// Services 
import { AuthenticationService } from "../../shared/services/authentication.service";
import { AlertService } from '../../shared/services/alert.service';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'new-supervisor',
    templateUrl: 'newSupervisor.template.html',
    providers: [SupervisorService, ValidationService]
})

export class NewSupervisorComponent {
    createBtn: boolean = false;
    isAdding: boolean = false;
    loadingMore: boolean = false;
    noMore: boolean = false;
    createBtnStr: string = 'New Account';
    limit: number = 5;
    offset: number = 0;
    supervisors: Supervisor[] = [];
    newUserInfo: UserInfo;
    newsupervisor: Supervisor;
    createSV: FormGroup;
    constructor(
        private _fb: FormBuilder,
        private _authService: AuthenticationService,
        private _alertService: AlertService,
        private _supervisorService: SupervisorService
    ) { }

    ngAfterViewInit() {
        $(document).ready(function () {
            $(".n-clickj").click(function () {
                $(".hide-mk").show("slow");
            });
            $(".n-cli-cancel").click(function () {
                $(".hide-mk").hide("slow");
            });
        });
    }

    ngOnInit() {

        this._supervisorService.getSupervisors(this.offset, -1).subscribe(
            result => {
                if (result.status) {
                    this.supervisors = result.data;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            });
        this.createSV = this._fb.group({
            supName: ['', Validators.compose([Validators.required, ValidationService.string])],
            supPostion: ['', Validators.compose([Validators.required, ValidationService.string])],
            supEmail: ['', Validators.compose([Validators.required, ValidationService.email])],
            supPhone: ['', Validators.compose([Validators.required, ValidationService.numeric])],
            supMobile: ['', Validators.compose([Validators.required, ValidationService.numeric])],
            supLogin: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(16), ValidationService.noSpace, ValidationService.alphaNumUnder])],
            supPass: ['', Validators.compose([Validators.required, ValidationService.password])],
        });

    }
    loadMore() {
        this.loadingMore = true;
        this.offset += this.limit;
        this._supervisorService.getSupervisors(this.offset, this.limit).subscribe(
            result => {
                if (result.status) {
                    let arradata = result.data;
                    if (arradata) {
                        arradata.forEach((obj: Supervisor, index: number) => {
                            this.supervisors.push(obj);
                        });
                    }
                    if (arradata.length < this.limit) {
                        this.noMore = true;
                    }
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
                this.loadingMore = false;
            },
            () => {
                this.loadingMore = false;
                return;
            });
    }
    createSrvBtn() {
        if (!this.createBtn) {
            this.createBtn = true;
            this.createBtnStr = 'Create';
            return;
        }
        if (!this.createSV.valid) {
            this._alertService.error('Please Check All Required fields');
            return;
        }
        if (this.isAdding) {
            return;
        }

        this.isAdding = true;
        this.newUserInfo = {
            firstName: this.createSV.controls['supName'].value,
            lastName: '',
            phone: this.createSV.controls['supPhone'].value,
            login: this.createSV.controls['supLogin'].value,
            email: this.createSV.controls['supEmail'].value,
            password: this.createSV.controls['supPass'].value,
            userRole: 'ROLE_SUPERVISOR',
        }
        this.newsupervisor = {
            mobile: this.createSV.controls['supMobile'].value,
            position: this.createSV.controls['supPostion'].value,
            userInfo: this.newUserInfo,
        }
        this._supervisorService.createSupervisor(this.newsupervisor).subscribe(
            result => {
                if (result.status) {
                    this.supervisors.push(result.data);
                    this.createSV.reset({ supName: '', supPostion: '', supEmail: '', supPhone: '', supMobile: '', supLogin: '', supPass: '' });
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
                this.isAdding = false;
            },
            () => {
                this.isAdding = false;
                return;
            });


    }

    cancelCreateBtn() {
        this.createBtn = false;
        this.createBtnStr = 'New Account';
        this.createSV.reset({ supName: '', supPostion: '', supEmail: '', supPhone: '', supMobile: '', supLogin: '', supPass: '' });
    }
}