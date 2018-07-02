import { Component } from '@angular/core';
// import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

// Services
import { AlertService } from '../../shared/services/alert.service';
import { AccountService } from '../services/account.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
// import { ValidationService } from '../../common/services/validation.service';


// Objects
import { AcademicDepartmentCoordinator } from '../../objects/academicDepartmentCoordinator';
import { Student } from '../../objects/student';
import { TraininDepartment } from '../../objects/traininDepartment';

@Component({
    moduleId: module.id,
    selector: 'td-accounts',
    templateUrl: 'accounts.template.html',
    providers: [AccountService]
})

export class AccountComponent {
    adcLimit: number = 10;
    adcOffset: number = 0;
    adcNoMore: boolean = false;
    adc_pages: number[] = [];
    adcCount: number = 0;
    adcCurrentPage: number = 1;
    adcData: AcademicDepartmentCoordinator[] = [];
    adcAllData: AcademicDepartmentCoordinator[] = [];
    tdLimit: number = 10;
    tdOffset: number = 0;
    tdCurrentPage: number = 1;
    tdCount: number = 0;
    tdNoMore: boolean = false;
    td_pages: number[] = [];
    tdData: TraininDepartment[] = [];
    tdAllData: TraininDepartment[] = [];
    limitS: number = 10;
    offsetS: number = 0;
    currentPageS: number = 1;
    stdCount: number = 0;
    noMoreS: boolean = false;
    std_pages: number[] = [];
    stdData: Student[] = [];
    stdAllData: Student[] = [];
    // FilterData: any[] = [];
    // filterForm: FormGroup;
    constructor(
        private _accountService: AccountService,
        private _alertService: AlertService,
        private _authService: AuthenticationService,
        // private _fb: FormBuilder
    ) { }

    ngOnInit() {

        // this.filterForm = this._fb.group({
        //     search: [0, Validators.compose([ValidationService.string, Validators.maxLength(80)])],
        //     major: [0, Validators.compose([ValidationService.numeric])],
        //     collage: [0, Validators.compose([ValidationService.numeric])],
        //     role: [0, Validators.compose([ValidationService.alphaNumUnder])],
        // });
        // this._accountService.getFilterData().subscribe(
        //     result => {
        //         if (result.status) {
        //             this.FilterData = result.data;
        //         } else {
        //             this._alertService.error(result.message);
        //         }
        //     },
        //     error => {
        //         this._authService.handelError(error);
        //     });
        this._accountService.getTrainingDepartmentAccounts(this.tdOffset, this.tdLimit).subscribe(
            result => {
                if (result.status) {
                    this.tdAllData = result.data;
                    this.tdCount = result.count;
                    this.td_pages = Array(Math.ceil(this.tdCount / this.tdLimit)).fill(1);
                    this.tdData = this.tdAllData.slice(0, this.tdLimit);
                } else {
                    this._alertService.error(result.message);
                }
                if (result.data.length < this.tdLimit) {
                    this.tdNoMore = true;
                }
            },
            error => {
                this._authService.handelError(error);
            });
        this._accountService.getAcademicDepartmentAccounts(this.adcOffset, this.adcLimit).subscribe(
            result => {
                if (result.status) {
                    this.adcAllData = result.data;
                    this.adcCount = result.count;
                    this.adc_pages = Array(Math.ceil(this.adcCount / this.adcLimit)).fill(1);
                    this.adcData = this.adcAllData.slice(0, this.adcLimit);
                } else {
                    this._alertService.error(result.message);
                }
                if (result.data.length < this.adcLimit) {
                    this.adcNoMore = true;
                }
            },
            error => {
                this._authService.handelError(error);
            });
        this._accountService.getStudentAccounts(this.offsetS, this.limitS).subscribe(
            result => {
                if (result.status) {
                    this.stdAllData = result.data;
                    this.stdCount = result.count;
                    this.std_pages = Array(Math.ceil(this.stdCount / this.limitS)).fill(1);
                    this.stdData = this.stdAllData.slice(0, this.limitS);
                } else {
                    this._alertService.error(result.message);
                }
                if (result.data.length < this.limitS) {
                    this.noMoreS = true;
                }
            },
            error => {
                this._authService.handelError(error);
            });

    }
    goToPageS(index: number = 1) {
        if ((index < 1) || (index > this.std_pages.length)) return;
        let offset = this.limitS * (index - 1);
        let limit = offset + this.limitS;
        this.currentPageS = index;
        if (this.stdAllData.length <= offset) {
            this.loadMorestd();
        }
        this.stdData = this.stdAllData.slice(offset, limit);
    }

    loadMorestd() {
        if (this.noMoreS) return;
        this.offsetS += this.limitS;
        this._accountService.getStudentAccounts(this.offsetS, this.limitS).subscribe(
            result => {
                if (result.status) {
                    let arradata = result.data;
                    this.stdCount = result.count;
                    this.std_pages = Array(Math.ceil(this.stdCount / this.limitS)).fill(1);
                    if (arradata) {
                        arradata.forEach((obj: Student, index: number) => {
                            this.stdAllData.push(obj);
                        });
                    }
                    if (arradata.length < this.limitS) {
                        this.noMoreS = true;
                    }
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            },
            () => {
                this.goToPageS(this.currentPageS);
            });
    }

    tdGoToPage(index: number = 1) {
        if ((index < 1) || (index > this.td_pages.length)) return;
        let offset = this.tdLimit * (index - 1);
        let limit = offset + this.tdLimit;
        this.tdCurrentPage = index;
        if (this.tdAllData.length <= offset) {
            this.tdLoadMore();
        }
        this.tdData = this.tdAllData.slice(offset, limit);
    }

    tdLoadMore() {
        if (this.tdNoMore) return;
        this.tdOffset += this.tdLimit;
        this._accountService.getTrainingDepartmentAccounts(this.tdOffset, this.tdLimit).subscribe(
            result => {
                if (result.status) {
                    let arradata = result.data;
                    this.tdCount = result.count;
                    this.td_pages = Array(Math.ceil(this.tdCount / this.tdLimit)).fill(1);
                    if (arradata) {
                        arradata.forEach((obj: TraininDepartment, index: number) => {
                            this.tdAllData.push(obj);
                        });
                    }
                    if (arradata.length < this.tdLimit) {
                        this.tdNoMore = true;
                    }
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            },
            () => {
                this.tdGoToPage(this.tdCurrentPage);
            });
    }

    adcGoToPage(index: number = 1) {
        if ((index < 1) || (index > this.adc_pages.length)) return;
        let offset = this.adcLimit * (index - 1);
        let limit = offset + this.adcLimit;
        this.adcCurrentPage = index;
        if (this.adcAllData.length <= offset) {
            this.adcLoadMore();
        }
        this.adcData = this.adcAllData.slice(offset, limit);
    }

    adcLoadMore() {
        if (this.adcNoMore) return;
        this.adcOffset += this.adcLimit;
        this._accountService.getAcademicDepartmentAccounts(this.adcOffset, this.adcLimit).subscribe(
            result => {
                if (result.status) {
                    let arradata = result.data;
                    this.adcCount = result.count;
                    this.adc_pages = Array(Math.ceil(this.adcCount / this.adcLimit)).fill(1);
                    if (arradata) {
                        arradata.forEach((obj: AcademicDepartmentCoordinator, index: number) => {
                            this.adcAllData.push(obj);
                        });
                    }
                    if (arradata.length < this.adcLimit) {
                        this.adcNoMore = true;
                    }
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            },
            () => {
                this.adcGoToPage(this.adcCurrentPage);
            });
    }
}