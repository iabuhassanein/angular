import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
declare var Chart: any;
// Objects
// import { CompanyOpportunity } from '../../objects/companyOpportunity';
// import { OpportunityComment } from '../../objects/opportunityComment';

import { AlertService } from '../../shared/services/alert.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { ReportService } from './../services/report.service';
import { ValidationService } from '../../common/services/validation.service';

@Component({
    moduleId: module.id,
    selector: 'ad-reports',
    templateUrl: 'reports.template.html',
    providers: [ReportService, ValidationService]
})

export class Reports {
    private _base_url = "http://kfupmf.mmed.email/backend/public/api/";
    private _base_url_img = "http://kfupmf.mmed.email/backend/public/";
    opp_labels: string[] = [];
    opp_dataNum: number[] = [];
    std_labels: string[] = [];
    std_dataNum: number[] = [];
    com_labels: string[] = [];
    com_dataNum: number[] = [];
    myLineChart: any;
    loadingStatistics: boolean = true;
    statistics: any;
    oppCount: number = 0;
    openTerms: number = 0;
    staffCount: number = 0;
    filterForm: FormGroup;
    isGenerating: boolean = false;
    reportsType: string = 'student';
    ReportsTable: any[] = [];
    FilterData: any[] = [];
    gettingExcel: boolean = false;
    gettingTxt: boolean = false;
    gettingPrint: boolean = false;
    constructor(
        private _reportService: ReportService,
        private _alertService: AlertService,
        private _authService: AuthenticationService,
        private _router: ActivatedRoute,
        private _fb: FormBuilder
    ) { }

    ngOnInit() {
        this.filterForm = this._fb.group({
            major: [0, Validators.compose([ValidationService.numeric])],
            coop: [0, Validators.compose([ValidationService.numeric])],
            summer: [0, Validators.compose([ValidationService.numeric])],
            term: [0, Validators.compose([ValidationService.numeric])],
            international: [0, Validators.compose([ValidationService.numeric])],
            company: [0, Validators.compose([ValidationService.numeric])],
            city: [0, Validators.compose([ValidationService.numeric])],
        });
        this.generateReport();
        this._reportService.getFilterData().subscribe(
            result => {
                if (result.status) {
                    this.FilterData = result.data;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            });

    }

    ngAfterViewInit() {
        this._reportService.getADStatistics().subscribe(
            result => {
                if (result.status) {
                    // this.statistics = result.data;
                    this.opp_labels = result.data.opp_terms;
                    this.opp_dataNum = result.data.opp_data;
                    this.std_labels = result.data.std_terms;
                    this.std_dataNum = result.data.std_data;
                    this.com_labels = result.data.com_terms;
                    this.com_dataNum = result.data.com_data;
                    this.oppCount = result.data.oppCount;
                    this.openTerms = result.data.openTerms;
                    this.staffCount = result.data.staffCount;
                    this.drowGraph(this.opp_labels, this.opp_dataNum);
                    this.loadingStatistics = false;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            });

        // this.drowGraph(["TERM 153", "TERM 152-153", "TERM 153", "TERM 152-153", "TERM 153", "TERM 152-153", "TERM 153"], [65, 59, 80, 60, 56, 55, 40]);

    }

    changeStatistics(type: string) {
        switch (type) {
            case 'oppPosted':
                this.drowGraph(this.opp_labels, this.opp_dataNum, false);
                break;
            case 'studentsEnrolled':
                this.drowGraph(this.std_labels, this.std_dataNum, false);
                break;
            case 'companiesRegisterd':
                this.drowGraph(this.com_labels, this.com_dataNum, false);
                break;
            default:
                this.drowGraph(this.opp_labels, this.opp_dataNum, false);
        }
    }

    changeReport(type: string = 'std') {
        switch (type) {
            case 'opp':
                this.reportsType = 'opportunity';
                break;
            case 'std':
                this.reportsType = 'student';
                break;
            case 'com':
                this.reportsType = 'company';
                break;
            default:
                this.reportsType = 'student';
        }
        this.generateReport(this.reportsType);
    }
    generateReport(type: string = this.reportsType) {
        this.isGenerating = true;
        this._reportService.getReports(type,
            this.filterForm.controls['major'].value,
            this.filterForm.controls['coop'].value,
            this.filterForm.controls['summer'].value,
            this.filterForm.controls['term'].value,
            this.filterForm.controls['international'].value,
            this.filterForm.controls['company'].value,
            this.filterForm.controls['city'].value,
        ).subscribe(
            result => {
                if (result.status) {
                    this.ReportsTable = result.data;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
                this.isGenerating = false;
            }, () => {
                this.isGenerating = false;
            });
    }

    GenerateReports(type: string) {
        switch (type) {
            case 'excel':
                this.gettingExcel = true;
                break;
            case 'txt':
                this.gettingTxt = true;
                break;
            default:
                this.gettingPrint = true;
        }

        this._reportService.getReportsFile(type,
            this.filterForm.controls['major'].value,
            this.filterForm.controls['coop'].value,
            this.filterForm.controls['summer'].value,
            this.filterForm.controls['term'].value,
            this.filterForm.controls['international'].value,
            this.filterForm.controls['company'].value,
            this.filterForm.controls['city'].value,
        ).subscribe(
            result => {
                if (result.status) {
                    this.downloadFile(result.data.fileURL);
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
                switch (type) {
                    case 'excel':
                        this.gettingExcel = false;
                        break;
                    case 'txt':
                        this.gettingTxt = false;
                        break;
                    default:
                        this.gettingPrint = false;
                }
            }, () => {
                switch (type) {
                    case 'excel':
                        this.gettingExcel = false;
                        break;
                    case 'txt':
                        this.gettingTxt = false;
                        break;
                    default:
                        this.gettingPrint = false;
                }
            });
    }

    downloadFile(url: string) {
        // var blob = new Blob([data], { type: resType });
        // var url = window.URL.createObjectURL(blob);
        // window.open(url);
        // var file_path = 'host/path/file.ext';
        var a = document.createElement('a');
        a.href = url;
        a.download = url.substr(url.lastIndexOf('/') + 1);
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    drowGraph(labelss: string[], datas: number[], time: boolean = true) {
        if (!(labelss && datas)) return;
        var canvas = document.getElementById('myChart');
        var data = {
            labels: labelss,
            datasets: [
                {
                    label: "Statistics",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "#00d968",
                    borderCapStyle: 'butt',
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 5,
                    pointHitRadius: 10,
                    data: datas,
                }
            ]
        };

        var option = {
            legend: {
                display: false
            },
            showLines: true
        };
        var myLineChart = Chart.Line(canvas, {
            data: data,
            options: option
        });
    }
}