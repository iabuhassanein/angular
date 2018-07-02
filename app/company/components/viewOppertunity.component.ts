import { Component } from '@angular/core';
import { CompanyService } from './../services/company.service';
import { ActivatedRoute } from '@angular/router';

// Objects
import { CompanyOpportunity } from '../../objects/companyOpportunity';
import { AcademicDepartment } from '../../objects/academicDepartment';
import { TrainingProgram } from '../../objects/trainingProgram';
import { DocFile } from '../../objects/DocFile';
import { Student } from '../../objects/student';

import { AlertService } from '../../shared/services/alert.service';
import { AuthenticationService } from '../../shared/services/authentication.service';

import { config } from '../../shared/config/path';

@Component({
    moduleId: module.id,
    selector: 'app-view-oppertunity',
    templateUrl: 'viewOppertunity.template.html',
    providers: [CompanyService, AlertService]
})

export class ViewOppertunityComponent {
    private _base_url = config.api_url;
    private _base_url_img = config.image_url;
    oppertunity: CompanyOpportunity = null;
    oppID: number;
    subscribtion: any;
    // limitS: number = 5;
    // offsetS: number = 0;
    // currentPageS: number = 1;
    // stdCount: number = 0;
    // noMoreS: boolean = false;
    // std_pages: number[] = [];
    stdData: Student[] = [];
    stdDataAD: Student[] = [];
    stdDataAC: Student[] = [];
    stdAllIDS: string = '';
    filterType: number = 1;
    isSendingOffer: boolean = false;

    constructor(
        private _newCompanyService: CompanyService,
        private _alertService: AlertService,
        private _authService: AuthenticationService,
        private _router: ActivatedRoute
    ) { }

    ngOnInit() {
        this.subscribtion = this._router.params.subscribe(params => {
            this.oppID = +params['id'];
        });
        this._newCompanyService.getCompanyOppertunity(this.oppID).subscribe(

            result => {
                if (result.status) {
                    this.oppertunity = result.data;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            });

        this._newCompanyService.getOppAppliedStudents(this.oppID).subscribe(
            result => {
                if (result.status) {
                    this.stdDataAD = result.data.appliedStudents;
                    this.stdDataAC = result.data.acceptedStudents;
                    this.stdData = this.stdDataAD;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            });

    }

    ngOnDestroy() {
        this.subscribtion.unsubscribe();
    }
    // updateCheckedOptions(e: any) {
    //     // let sid = e.target.getAttribute('value');
    //     // if (e.target.checked) {
    //     //     this.stdAllIDS[sid] = sid;
    //     // } else {
    //     //     delete this.stdAllIDS[sid];
    //     // }
    //     let dsalkjd = this.getCheckedBoxes('selectSTD');
    //     console.log(dsalkjd);
    // }
    changeFilter(e: any) {
        let vid = e.target.value;
        if (vid === 1) {
            this.stdData = this.stdDataAD;
        } else if (vid === 2) {
            this.stdData = this.stdDataAC;
        }
    }
    sendOffer() {
        this.isSendingOffer = true;
        this._newCompanyService.getsendOffer(this.stdAllIDS, this.oppID).subscribe(
            result => {
                if (result.status) {
                    this._alertService.success(result.message);
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
                this.isSendingOffer = false;
            },
            () => {
                this.isSendingOffer = false;
            });
        // console.log(this.stdAllIDS);
    }
    updateCheckedStudents() {
        var checkboxes = document.getElementsByName('selectSTD');
        var checkboxesChecked: string[] = [];
        // loop over them all
        for (var i = 0; i < checkboxes.length; i++) {
            // And stick the checked ones onto an array...
            let data = <HTMLInputElement>checkboxes[i];
            if (data.checked) {
                checkboxesChecked.push(data.getAttribute('value'));
            }
        }
        // // Return the array if it is non-empty, or null
        let newchebox = checkboxesChecked.length > 0 ? checkboxesChecked : null;
        this.stdAllIDS = JSON.stringify(newchebox);
    }
    getDay(date: number) {
        var date_str = date.toString();
        if (date_str.length == 14) {
            var day = date_str.substring(6, 8);
            return day;
        } else {
            return '';
        }
    }
    getMonth(date: number) {
        var date_str = date.toString();
        if (date_str.length == 14) {
            var month = getMonthString(parseInt(date_str.substring(4, 6)));
            return month;
        } else {
            return '';
        }
    }
    getYear(date: number) {
        var date_str = date.toString();
        if (date_str.length == 14) {
            var year = date_str.substring(0, 4);
            return year;
        } else {
            return '';
        }
    }
}
function getMonthString(month: number) {
    switch (month) {
        case 1:
            return 'January';
        case 2:
            return 'February';
        case 3:
            return 'March';
        case 4:
            return 'April';
        case 5:
            return 'May';
        case 6:
            return 'June';
        case 7:
            return 'July';
        case 8:
            return 'August';
        case 9:
            return 'September';
        case 10:
            return 'October';
        case 11:
            return 'November';
        case 12:
            return 'December';
        default:
            return '';
    }
}