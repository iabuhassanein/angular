import { Component } from '@angular/core';

// Services
import { AlertService } from '../../shared/services/alert.service';
import { CompaniesService } from '../services/companies.service';
import { AuthenticationService } from '../../shared/services/authentication.service';


// Objects
import { Company } from '../../objects/company';

@Component({
    moduleId: module.id,
    selector: 'td-companies',
    templateUrl: 'companies.template.html',
    providers: [CompaniesService]
})

export class CompaniesComponent {
    private _base_url_img = "http://kfupmf.mmed.email/backend/public/";
    limit: number = 10;
    offset: number = 0;
    noMore: boolean = false;
    coms_pages: number[] = [];
    comsCount: number = 0;
    currentPage: number = 1;
    comsData: Company[] = [];
    comsAllData: Company[] = [];
    limitA: number = 5;
    offsetA: number = 0;
    noMoreA: boolean = false;
    coms_pagesA: number[] = [];
    comsCountA: number = 0;
    currentPageA: number = 1;
    comsDataA: Company[] = [];
    comsAllDataA: Company[] = [];
    currentApproved: number = 0;
    approving: boolean = false;
    constructor(
        private _comService: CompaniesService,
        private _alertService: AlertService,
        private _authService: AuthenticationService
    ) { }

    ngOnInit() {
        this._comService.getCompanies(this.offset, this.limit).subscribe(
            result => {
                if (result.status) {
                    this.comsAllData = result.data;
                    this.comsCount = result.count;
                    this.coms_pages = Array(Math.ceil(this.comsCount / this.limit)).fill(1);
                    this.comsData = this.comsAllData.slice(0, this.limit);
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
        this._comService.getCompaniesApproved(this.offsetA, this.limitA).subscribe(
            result => {
                if (result.status) {
                    this.comsAllDataA = result.data;
                    this.comsCountA = result.count;
                    this.coms_pagesA = Array(Math.ceil(this.comsCountA / this.limitA)).fill(1);
                    this.comsDataA = this.comsAllDataA.slice(0, this.limitA);
                } else {
                    this._alertService.error(result.message);
                }
                if (result.data.length < this.limitA) {
                    this.noMoreA = true;
                }
            },
            error => {
                this._authService.handelError(error);
            });

    }

    loadMoreComs() {
        if (this.noMore) return;
        this.offset += this.limit;
        this._comService.getCompanies(this.offset, this.limit).subscribe(
            result => {
                if (result.status) {
                    let arradata = result.data;
                    this.comsCount = result.count;
                    this.coms_pages = Array(Math.ceil(this.comsCount / this.limit)).fill(1);
                    if (arradata) {
                        arradata.forEach((obj: Company, index: number) => {
                            this.comsAllData.push(obj);
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
        if ((index < 1) || (index > this.coms_pages.length)) return;
        let offset = this.limit * (index - 1);
        let limit = offset + this.limit;
        this.currentPage = index;
        if (this.comsAllData.length <= offset) {
            this.loadMoreComs();
        }
        this.comsData = this.comsAllData.slice(offset, limit);
    }

    loadMoreComsA() {
        if (this.noMoreA) return;
        this.offsetA += this.limitA;
        this._comService.getCompaniesApproved(this.offsetA, this.limitA).subscribe(
            result => {
                if (result.status) {
                    let arradata = result.data;
                    this.comsCountA = result.count;
                    this.coms_pagesA = Array(Math.ceil(this.comsCountA / this.limitA)).fill(1);
                    if (arradata) {
                        arradata.forEach((obj: Company, index: number) => {
                            this.comsAllDataA.push(obj);
                        });
                    }
                    if (arradata.length < this.limitA) {
                        this.noMoreA = true;
                    }
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            },
            () => {
                this.goToPageA(this.currentPageA);
            });
    }
    approveCompany(idx: number, id: number) {
        let obj = this.comsData[idx];
        if (obj.approved) return;
        obj.approved = true;
        this._comService.approveCompany(id, idx).subscribe(
            result => {
                if (result.status) {
                    this._alertService.success(result.message);
                } else {
                    this._alertService.error(result.message);
                    obj.approved = false;
                }
            },
            error => {
                this._authService.handelError(error);
                obj.approved = false;
            },
            () => {
                this.goToPage(this.currentPage);
            });
    }
    goToPageA(index: number = 1) {
        if ((index < 1) || (index > this.coms_pagesA.length)) return;
        let offset = this.limitA * (index - 1);
        let limit = offset + this.limitA;
        this.currentPageA = index;
        if (this.comsAllDataA.length <= offset) {
            this.loadMoreComsA();
        }
        this.comsDataA = this.comsAllDataA.slice(offset, limit);
    }
}