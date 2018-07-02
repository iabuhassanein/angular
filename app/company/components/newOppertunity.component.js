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
// Services
var authentication_service_1 = require("../../shared/services/authentication.service");
var newOppertunity_service_1 = require('./../services/newOppertunity.service');
var validation_service_1 = require('../../common/services/validation.service');
var alert_service_1 = require('../../shared/services/alert.service');
var NewOppertunityComponent = (function () {
    function NewOppertunityComponent(_fb, _authService, _alertService, _newOppService) {
        this._fb = _fb;
        this._authService = _authService;
        this._alertService = _alertService;
        this._newOppService = _newOppService;
        this.cities = [
            { "id": 'dammam', "name": "Dammam" },
            { "id": 'jedah', "name": "Jedah" },
            { "id": 'manof', "name": "Manof" },
            { "id": 'reaad', "name": "Reaad" }
        ];
        this.cfiles = [];
        this.lastUploaded = [];
        this.limit = 5;
        this.offset = 0;
        this.edited_id = 0;
        this.loadingMore = false;
        this.loading = true;
        this.noMore = false;
        this.isConfirm = false;
        this.isAdding = false;
        this.isEditing = false;
        this.oppData = [];
        this.trainingProgram = [];
        this.academicDepartments = [];
    }
    NewOppertunityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._newOppService.academicDepartments(0, -1).subscribe(function (result) {
            if (result.status) {
                _this.academicDepartments = result.data;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
        this._newOppService.getTrainingPrograms(0, -1).subscribe(function (result) {
            if (result.status) {
                _this.trainingProgram = result.data;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
        });
        this._newOppService.getCompanyOppertunities(this.offset, this.limit).subscribe(function (result) {
            if (result.status) {
                _this.oppData = result.data;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.loading = false;
        }, function () {
            _this.loading = false;
            return;
        });
        this.newOpp = this._fb.group({
            major: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            city: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.alphaNum])],
            numberofstd: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.numeric])],
            duration: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            transportation: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            housing: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            salary: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.numeric])],
        });
        this.editOppform = this._fb.group({
            englishTitle: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            trainingPlan: '',
            englishDescription: '',
            major: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            city: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.alphaNum])],
            numberofstd: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.numeric])],
            duration: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            transportation: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            housing: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            salary: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.numeric])],
        });
        this.confirm = this._fb.group({
            term: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.accepted])]
        });
        this.newOpp.reset({ major: '0', city: '0', numberofstd: '', duration: '0', transportation: '0', housing: '0', salary: '' });
    };
    NewOppertunityComponent.prototype.loadMoreOpp = function () {
        var _this = this;
        this.loadingMore = true;
        this.offset += this.limit;
        this._newOppService.getCompanyOppertunities(this.offset, this.limit).subscribe(function (result) {
            if (result.status) {
                var arradata = result.data;
                if (arradata) {
                    arradata.forEach(function (obj, index) {
                        _this.oppData.push(obj);
                    });
                }
                if (arradata.length < _this.limit) {
                    _this.noMore = true;
                }
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.loadingMore = false;
        }, function () {
            _this.loadingMore = false;
            return;
        });
    };
    NewOppertunityComponent.prototype.addNewOpp = function () {
        var _this = this;
        this.isAdding = true;
        if (!this.newOpp.valid)
            return;
        var tp = {
            id: this.newOpp.controls['duration'].value
        };
        var ad = {
            id: this.newOpp.controls['major'].value
        };
        this.oppertunity = {
            englishTitle: '',
            englishDescription: '',
            numberOfOpportunities: this.newOpp.controls['numberofstd'].value,
            leastAcceptableGPA: 0,
            city: this.newOpp.controls['city'].value,
            salary: this.newOpp.controls['salary'].value,
            housingExpenses: this.newOpp.controls['housing'].value,
            transportationExpenses: this.newOpp.controls['transportation'].value,
            academicDepartment: ad,
            trainingProgram: tp
        };
        this._newOppService.createCompanyOppertunity(this.oppertunity).subscribe(function (result) {
            if (result.status) {
                _this._alertService.success(result.message);
                _this.oppData.push(result.data);
                _this.newOpp.reset({ major: '0', city: '0', numberofstd: '', duration: '0', transportation: '0', housing: '0', salary: '' });
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.isAdding = false;
        }, function () {
            _this.isAdding = false;
            return;
        });
    };
    NewOppertunityComponent.prototype.callConfirmFun = function () {
        var _this = this;
        this.isConfirm = true;
        this._newOppService.confirmOppertunities().subscribe(function (result) {
            if (result.status) {
                _this._alertService.success(result.message, 7000, 'dark');
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.isConfirm = false;
        }, function () {
            _this.isConfirm = false;
            return;
        });
    };
    NewOppertunityComponent.prototype.editOpp = function (oppid) {
        if (this.isEditing)
            return;
        var eopp = this.oppData[oppid];
        this.lastUploaded = [];
        this.edited_id = oppid;
        this.editOppertunity = eopp;
        this.editOppform.reset({
            englishTitle: eopp.englishTitle,
            trainingPlan: eopp.trainingPlan,
            englishDescription: eopp.englishDescription,
            major: eopp.academic_department.id,
            city: eopp.city,
            numberofstd: eopp.numberOfOpportunities,
            duration: eopp.training_program.id,
            transportation: eopp.transportationExpenses,
            housing: eopp.housingExpenses,
            salary: eopp.salary
        });
        this.cfiles = eopp.files;
    };
    NewOppertunityComponent.prototype.saveEditOpp = function () {
        var _this = this;
        this.isEditing = true;
        if (!this.editOppform.valid)
            return;
        var tp = {
            id: this.editOppform.controls['duration'].value
        };
        var ad = {
            id: this.editOppform.controls['major'].value
        };
        this.oppertunityForEdit = {
            id: this.editOppertunity.id,
            englishTitle: this.editOppform.controls['englishTitle'].value,
            englishDescription: this.editOppform.controls['englishDescription'].value,
            numberOfOpportunities: this.editOppform.controls['numberofstd'].value,
            leastAcceptableGPA: 0,
            trainingPlan: this.editOppform.controls['trainingPlan'].value,
            city: this.editOppform.controls['city'].value,
            salary: this.editOppform.controls['salary'].value,
            housingExpenses: this.editOppform.controls['housing'].value,
            transportationExpenses: this.editOppform.controls['transportation'].value,
            academicDepartment: ad,
            trainingProgram: tp
        };
        this._newOppService.updateCompanyOppertunity(this.oppertunityForEdit).subscribe(function (result) {
            if (result.status) {
                _this._alertService.success(result.message);
                _this.oppData[_this.edited_id] = result.data;
            }
            else {
                _this._alertService.error(result.message);
            }
        }, function (error) {
            _this._authService.handelError(error);
            _this.isEditing = false;
        }, function () {
            _this.isEditing = false;
            return;
        });
    };
    NewOppertunityComponent.prototype.UploadOpperFile = function (event) {
        var _this = this;
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file = fileList[0];
            var subscribe = this._newOppService.uploadFile(file, 1, 1).subscribe(function (res) {
                // this.logo = logoName.fileName;
                var ffile = {
                    filename: res.filename,
                    original_name: res.original_name
                };
                _this.cfiles.push(ffile);
                _this.lastUploaded.push(ffile);
            });
        }
    };
    NewOppertunityComponent.prototype.getEventDay = function (date) {
        var date_str = date.toString();
        if (date_str.length == 14) {
            var day = date_str.substring(6, 8);
            return day;
        }
        else {
            return '';
        }
    };
    NewOppertunityComponent.prototype.getEventMonth = function (date) {
        var date_str = date.toString();
        if (date_str.length == 14) {
            var month = getMonthString(parseInt(date_str.substring(4, 6)));
            return month;
        }
        else {
            return '';
        }
    };
    NewOppertunityComponent.prototype.getEventYear = function (date) {
        var date_str = date.toString();
        if (date_str.length == 14) {
            var year = date_str.substring(0, 4);
            return year;
        }
        else {
            return '';
        }
    };
    NewOppertunityComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'new-oppertunity',
            templateUrl: 'newOppertunity.template.html',
            providers: [newOppertunity_service_1.NewOppertunityService, validation_service_1.ValidationService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, authentication_service_1.AuthenticationService, alert_service_1.AlertService, newOppertunity_service_1.NewOppertunityService])
    ], NewOppertunityComponent);
    return NewOppertunityComponent;
}());
exports.NewOppertunityComponent = NewOppertunityComponent;
function getMonthString(month) {
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
//# sourceMappingURL=newOppertunity.component.js.map