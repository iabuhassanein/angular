import { Component } from '@angular/core';

// Services
import { AlertService } from '../../shared/services/alert.service';
import { TrainingDepartmentService } from '../services/trainingDepartment.service';
import { AuthenticationService } from '../../shared/services/authentication.service';


// Objects
import { CompanyOpportunity } from '../../objects/companyOpportunity';
import { AppliedOpportunity } from '../../objects/appliedOpportunity';
import { Session } from '../../objects/session';


@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'dashboard.template.html',
    providers: [TrainingDepartmentService]
})

export class TrainingDepartmentDashboard {
    private _base_url_img = "http://kfupmf.mmed.email/backend/public/";
    fullName: string;
    limit: number = 5;
    offset: number = 0;
    noMore: boolean = false;
    opp_pages: number[] = [];
    oppCount: number = 0;
    currentPage: number = 1;
    oppData: CompanyOpportunity[] = [];
    oppAllData: CompanyOpportunity[] = [];
    limitS: number = 5;
    offsetS: number = 0;
    currentPageS: number = 1;
    stdCount: number = 0;
    noMoreS: boolean = false;
    std_pages: number[] = [];
    stdData: AppliedOpportunity[] = [];
    stdAllData: AppliedOpportunity[] = [];
 constructor(
        private _TDService: TrainingDepartmentService,
        private _alertService: AlertService,
        private _authService: AuthenticationService
    ) {
        let session: Session = this._authService.getSession();
        this.fullName = session.userInfo.firstName + ' ' + session.userInfo.lastName;
    }

    ngOnInit() {

        this._TDService.getOppertunities(this.offset, this.limit).subscribe(
            result => {
                if (result.status) {
                    this.oppAllData = result.data;
                    this.oppCount = result.count;
                    this.opp_pages = Array(Math.ceil(this.oppCount / this.limit)).fill(1);
                    this.oppData = this.oppAllData.slice(0, this.limit);
                } else {
                    this._alertService.error(result.message);
                }
                if (result.data.length < this.limit) {
                    this.noMore = true;
                }
            },
            error => {
                this._authService.handelError(error);
            });
        this._TDService.getStudents(this.offsetS, this.limitS).subscribe(
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

    getFirstChar(str: string) {
        return str.charAt(0);
    }
    approveOpportunity(idx: number, id: number) {
        let obj = this.oppData[idx];
        if (obj.approvedByTrainingDepartment) return;
        obj.approvedByTrainingDepartment = true;
        this._TDService.approveOppertunity(id).subscribe(
            result => {
                if (result.status) {
                    this._alertService.success(result.message);
                } else {
                    this._alertService.error(result.message);
                    obj.approvedByTrainingDepartment = false;
                }
            },
            error => {
                this._authService.handelError(error);
                obj.approvedByTrainingDepartment = false;
            });
    }

    loadMoreOpp() {
        if (this.noMore) return;
        this.offset += this.limit;
        this._TDService.getOppertunities(this.offset, this.limit).subscribe(
            result => {
                if (result.status) {
                    let arradata = result.data;
                    this.oppCount = result.count;
                    this.opp_pages = Array(Math.ceil(this.oppCount / this.limit)).fill(1);
                    if (arradata) {
                        arradata.forEach((obj: CompanyOpportunity, index: number) => {
                            this.oppAllData.push(obj);
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
            },
            () => {
                this.goToPage(this.currentPage);
            });
    }

    goToPage(index: number = 1) {
        if ((index < 1) || (index > this.opp_pages.length)) return;
        let offset = this.limit * (index - 1);
        let limit = offset + this.limit;
        this.currentPage = index;
        if (this.oppAllData.length <= offset) {
            this.loadMoreOpp();
        }
        this.oppData = this.oppAllData.slice(offset, limit);
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
        this._TDService.getStudents(this.offsetS, this.limitS).subscribe(
            result => {
                if (result.status) {
                    let arradata = result.data;
                    this.stdCount = result.count;
                    this.std_pages = Array(Math.ceil(this.stdCount / this.limitS)).fill(1);
                    if (arradata) {
                        arradata.forEach((obj: AppliedOpportunity, index: number) => {
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
}