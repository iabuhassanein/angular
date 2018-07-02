import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Objects
import { CompanyOpportunity } from '../../objects/companyOpportunity';
import { AcademicDepartment } from '../../objects/academicDepartment';
import { TrainingProgram } from '../../objects/trainingProgram';
import { DocFile } from '../../objects/DocFile';

// Services
import { AlertService } from '../../shared/services/alert.service';
import { StudentService } from '../services/student.service';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'student-viewopp',
    templateUrl: 'studentViewOpp.template.html'
})

export class StudentViewOpp {
    private _base_url = "http://kfupmf.mmed.email/backend/public/api/";
    private _base_url_img = "http://kfupmf.mmed.email/backend/public/";
    oppertunity: CompanyOpportunity = null;
    subscribtion: any;
    oppID: number;
    appling: boolean = false;
    is_applied: boolean = false;
    constructor (
        private _alertService: AlertService,
        private _authService: AuthenticationService,
        private _router: ActivatedRoute,
        private _studentService: StudentService
    ){}
    ngOnInit() {
        this.subscribtion = this._router.params.subscribe(params => {
            this.oppID = +params['id'];
        });
        this._studentService.getOppertunity(this.oppID).subscribe(
            result => {
                if (result.status) {
                    this.oppertunity = result.data;
                    this.is_applied = result.is_applied;
                    // console.log(this.is_applied);
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

    applyOpp(){
        this.appling = true;
        this._studentService.applyOppertunity(this.oppID).subscribe(
            result => {
                if (result.status) {
                    this._alertService.success(result.message);
                    this.is_applied = true;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
                this.appling = false;
            },
            ()=>{
                this.appling = false;
            });
            
    }
}