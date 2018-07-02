import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

// Services
import { AuthenticationService } from "../../shared/services/authentication.service";
import { NewOppertunityService } from './../services/newOppertunity.service';
import { ValidationService } from '../../common/services/validation.service';
import { AlertService } from '../../shared/services/alert.service';


// Objects
import { CompanyOpportunity } from '../../objects/companyOpportunity';
import { AcademicDepartment } from '../../objects/academicDepartment';
import { TrainingProgram } from '../../objects/trainingProgram';
import { DocFile } from '../../objects/DocFile';

@Component({
    moduleId: module.id,
    selector: 'new-oppertunity',
    templateUrl: 'newOppertunity.template.html',
    providers: [NewOppertunityService, ValidationService]

})

export class NewOppertunityComponent {
    cities = [
        { "id": 'dammam', "name": "Dammam" },
        { "id": 'jedah', "name": "Jedah" },
        { "id": 'manof', "name": "Manof" },
        { "id": 'reaad', "name": "Reaad" }
    ];
    cfiles: DocFile[] = [];
    lastUploaded: DocFile[] = [];
    limit: number = 10;
    offset: number = 0;
    edited_id: number = 0;
    loadingMore: boolean = false;
    loading: boolean = true;
    noMore: boolean = false;
    isConfirm: boolean = false;
    isAdding: boolean = false;
    isEditing: boolean = false;
    isDeleting: boolean = false;
    oppData: CompanyOpportunity[] = [];
    trainingProgram: TrainingProgram[] = [];
    oppertunity: CompanyOpportunity;
    oppertunityForEdit: CompanyOpportunity;
    editOppertunity: CompanyOpportunity;
    academicDepartments: AcademicDepartment[] = [];
    newOpp: FormGroup;
    confirm: FormGroup;
    editOppform: FormGroup;
    constructor(
        private _fb: FormBuilder,
        private _authService: AuthenticationService,
        private _alertService: AlertService,
        private _newOppService: NewOppertunityService
    ) { }

    ngOnInit() {
        this._newOppService.academicDepartments(0, 0).subscribe(
            result => {
                if (result.status) {
                    this.academicDepartments = result.data;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            });
        this._newOppService.getTrainingPrograms(0, 0).subscribe(
            result => {
                if (result.status) {
                    this.trainingProgram = result.data;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            });
        this._newOppService.getCompanyOppertunities(this.offset, this.limit).subscribe(
            result => {
                if (result.status) {
                    this.oppData = result.data;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
                this.loading = false;
            },
            () => {
                this.loading = false;
                return;
            });
        this.newOpp = this._fb.group({
            major: ['', Validators.compose([Validators.required])],
            city: ['', Validators.compose([Validators.required, ValidationService.alphaNum])],
            numberofstd: ['', Validators.compose([Validators.required, ValidationService.numeric])],
            duration: ['', Validators.compose([Validators.required])],
            transportation: ['', Validators.compose([Validators.required])],
            housing: ['', Validators.compose([Validators.required])],
            salary: ['', Validators.compose([Validators.required, ValidationService.numeric])],
        });
        this.editOppform = this._fb.group({
            englishTitle: ['', Validators.compose([Validators.required])],
            trainingPlan: '',
            englishDescription: '',
            major: ['', Validators.compose([Validators.required])],
            city: ['', Validators.compose([Validators.required, ValidationService.alphaNum])],
            numberofstd: ['', Validators.compose([Validators.required, ValidationService.numeric])],
            duration: ['', Validators.compose([Validators.required])],
            transportation: ['', Validators.compose([Validators.required])],
            housing: ['', Validators.compose([Validators.required])],
            salary: ['', Validators.compose([Validators.required, ValidationService.numeric])],
        });
        this.confirm = this._fb.group({
            term: ['', Validators.compose([Validators.required, ValidationService.accepted])]
        });
        this.newOpp.reset({ major: '0', city: '0', numberofstd: '', duration: '0', transportation: '0', housing: '0', salary: '' });
    }

    loadMoreOpp() {
        this.loadingMore = true;
        this.offset += this.limit;
        this._newOppService.getCompanyOppertunities(this.offset, this.limit).subscribe(
            result => {
                if (result.status) {
                    let arradata = result.data;
                    if (arradata) {
                        arradata.forEach((obj: CompanyOpportunity, index: number) => {
                            this.oppData.push(obj);
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

    addNewOpp() {
        this.isAdding = true;
        if (!this.newOpp.valid) return;
        let tp: TrainingProgram = {
            id: this.newOpp.controls['duration'].value
        }
        let ad: AcademicDepartment = {
            id: this.newOpp.controls['major'].value
        }
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
        }
        this._newOppService.createCompanyOppertunity(this.oppertunity).subscribe(
            result => {
                if (result.status) {
                    this._alertService.success(result.message);
                    this.oppData.push(result.data);
                    this.newOpp.reset({ major: '0', city: '0', numberofstd: '', duration: '0', transportation: '0', housing: '0', salary: '' });
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

    callConfirmFun() {
        this.isConfirm = true;
        this._newOppService.confirmOppertunities().subscribe(
            result => {
                if (result.status) {
                    this._alertService.success(result.message, 7000, 'dark');
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
                this.isConfirm = false;
            },
            () => {
                this.isConfirm = false;
                return;
            });
    }

    editOpp(oppid: number) {
        if (this.isEditing) return;
        let eopp: CompanyOpportunity = this.oppData[oppid];
        this.lastUploaded = [];
        this.edited_id = oppid;
        this.editOppertunity = eopp;
        this.editOppform.reset({
            englishTitle: eopp.englishTitle,
            trainingPlan: eopp.trainingPlan,
            englishDescription: eopp.englishDescription,
            major: eopp.academicDepartment.id,
            city: eopp.city,
            numberofstd: eopp.numberOfOpportunities,
            duration: eopp.trainingProgram.id,
            transportation: eopp.transportationExpenses,
            housing: eopp.housingExpenses,
            salary: eopp.salary
        });
        this.cfiles = eopp.files;
    }

    deleteOpp(oppid: number) {
        if (this.isDeleting) return;
        this.isDeleting = true;
        this._newOppService.deleteCompanyOppertunity(oppid).subscribe(
            result => {
                if (result.status) {
                    this._alertService.success(result.message);
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
                this.isDeleting = false;
            },
            () => {
                this.isDeleting = false;
                return;
            });
    }

    saveEditOpp() {
        this.isEditing = true;
        if (!this.editOppform.valid) return;
        let tp: TrainingProgram = {
            id: this.editOppform.controls['duration'].value
        }
        let ad: AcademicDepartment = {
            id: this.editOppform.controls['major'].value
        }
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
        }
        this._newOppService.updateCompanyOppertunity(this.oppertunityForEdit).subscribe(
            result => {
                if (result.status) {
                    this._alertService.success(result.message);
                    this.oppData[this.edited_id] = result.data;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
                this.isEditing = false;
            },
            () => {
                this.isEditing = false;
                return;
            });
    }


    UploadOpperFile(event: any) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let file: File = fileList[0];

            let subscribe = this._newOppService.uploadFile(file, 1, 1).subscribe(res => {
                // this.logo = logoName.fileName;
                let ffile: Cfile = {
                    filename: res.filename,
                    original_name: res.original_name
                }
                this.cfiles.push(ffile);
                this.lastUploaded.push(ffile);
            });
        }
    }
    getEventDay(date: number) {
        var date_str = date.toString();
        if (date_str.length == 14) {
            var day = date_str.substring(6, 8);
            return day;
        } else {
            return '';
        }
    }
    getEventMonth(date: number) {
        var date_str = date.toString();
        if (date_str.length == 14) {
            var month = getMonthString(parseInt(date_str.substring(4, 6)));
            return month;
        } else {
            return '';
        }
    }
    getEventYear(date: number) {
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

interface City {
    id?: string;
    name?: string;
}

interface Cfile {
    filename?: string;
    original_name?: string;
}