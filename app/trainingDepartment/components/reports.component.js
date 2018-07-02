"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
// Services
var alert_service_1 = require('../../shared/services/alert.service');
var report_service_1 = require('../services/report.service');
var authentication_service_1 = require('../../shared/services/authentication.service');
var validation_service_1 = require('../../common/services/validation.service');
// Objects
var ReportStatisticsComponent = (function () {
    function ReportStatisticsComponent(_reportService, _alertService, _authService, _router, _fb) {
        this._reportService = _reportService;
        this._alertService = _alertService;
        this._authService = _authService;
        this._router = _router;
        this._fb = _fb;
        this._base_url = "http://kfupmf.mmed.email/backend/public/api/";
        this._base_url_img = "http://kfupmf.mmed.email/backend/public/";
        this.opp_labels = [];
        this.opp_dataNum = [];
        this.std_labels = [];
        this.std_dataNum = [];
        this.com_labels = [];
        this.com_dataNum = [];
        this.loadingStatistics = true;
        this.oppCount = 0;
        this.openTerms = 0;
        this.staffCount = 0;
        this.isGenerating = false;
        this.reportsType = 'student';
        this.ReportsTable = [];
        this.FilterData = [];
        this.gettingExcel = false;
        this.gettingTxt = false;
        this.gettingPrint = false;
    }
    ReportStatisticsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filterForm = this._fb.group({
            major: [0, forms_1.Validators.compose([validation_service_1.ValidationService.numeric])],
            coop: [0, forms_1.Validators.compose([validation_service_1.ValidationService.numeric])],
            summer: [0, forms_1.Validators.compose([validation_service_1.ValidationService.numeric])],
            term: [0, forms_1.Validators.compose([validation_service_1.ValidationService.numeric])],
            international: [0, forms_1.Validators.compose([validation_service_1.ValidationService.numeric])],
            company: [0, forms_1.Validators.compose([validation_service_1.ValidationService.numeric])],
            city: [0, forms_1.Validators.compose([validation_service_1.ValidationService.numeric])],
        });
        this.generateReport();
        this._reportService.getFilterData().subscribe(function (result) {
            if (result.status) {
                _this.FilterData = result.data;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
    };
    ReportStatisticsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._reportService.getADStatistics().subscribe(function (result) {
            if (result.status) {
                // this.statistics = result.data;
                _this.opp_labels = result.data.opp_terms;
                _this.opp_dataNum = result.data.opp_data;
                _this.std_labels = result.data.std_terms;
                _this.std_dataNum = result.data.std_data;
                _this.com_labels = result.data.com_terms;
                _this.com_dataNum = result.data.com_data;
                _this.oppCount = result.data.oppCount;
                _this.openTerms = result.data.openTerms;
                _this.staffCount = result.data.staffCount;
                _this.drowGraph(_this.opp_labels, _this.opp_dataNum);
                _this.loadingStatistics = false;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
        // this.drowGraph(["TERM 153", "TERM 152-153", "TERM 153", "TERM 152-153", "TERM 153", "TERM 152-153", "TERM 153"], [65, 59, 80, 60, 56, 55, 40]);
    };
    ReportStatisticsComponent.prototype.changeStatistics = function (type) {
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
    };
    ReportStatisticsComponent.prototype.changeReport = function (type) {
        if (type === void 0) { type = 'std'; }
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
    };
    ReportStatisticsComponent.prototype.generateReport = function (type) {
        var _this = this;
        if (type === void 0) { type = this.reportsType; }
        this.isGenerating = true;
        this._reportService.getReports(type, this.filterForm.controls['major'].value, this.filterForm.controls['coop'].value, this.filterForm.controls['summer'].value, this.filterForm.controls['term'].value, this.filterForm.controls['international'].value, this.filterForm.controls['company'].value, this.filterForm.controls['city'].value).subscribe(function (result) {
            if (result.status) {
                _this.ReportsTable = result.data;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.isGenerating = false;
        }, function () {
            _this.isGenerating = false;
        });
    };
    ReportStatisticsComponent.prototype.GenerateReports = function (type) {
        var _this = this;
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
        this._reportService.getReportsFile(type, this.filterForm.controls['major'].value, this.filterForm.controls['coop'].value, this.filterForm.controls['summer'].value, this.filterForm.controls['term'].value, this.filterForm.controls['international'].value, this.filterForm.controls['company'].value, this.filterForm.controls['city'].value).subscribe(function (result) {
            if (result.status) {
                _this.downloadFile(result.data.fileURL);
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            switch (type) {
                case 'excel':
                    _this.gettingExcel = false;
                    break;
                case 'txt':
                    _this.gettingTxt = false;
                    break;
                default:
                    _this.gettingPrint = false;
            }
        }, function () {
            switch (type) {
                case 'excel':
                    _this.gettingExcel = false;
                    break;
                case 'txt':
                    _this.gettingTxt = false;
                    break;
                default:
                    _this.gettingPrint = false;
            }
        });
    };
    ReportStatisticsComponent.prototype.downloadFile = function (url) {
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
    };
    ReportStatisticsComponent.prototype.drowGraph = function (labelss, datas, time) {
        if (time === void 0) { time = true; }
        if (!(labelss && datas))
            return;
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
    };
    ReportStatisticsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'td-report',
            templateUrl: 'reports.template.html',
            providers: [report_service_1.ReportService, validation_service_1.ValidationService]
        }), 
        __metadata('design:paramtypes', [report_service_1.ReportService, alert_service_1.AlertService, authentication_service_1.AuthenticationService, router_1.ActivatedRoute, forms_1.FormBuilder])
    ], ReportStatisticsComponent);
    return ReportStatisticsComponent;
}());
exports.ReportStatisticsComponent = ReportStatisticsComponent;
//# sourceMappingURL=reports.component.js.map