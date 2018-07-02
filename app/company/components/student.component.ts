import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { CompanyService } from './../services/company.service';
// import { ValidationService } from '../../common/services/validation.service';
import { AlertService } from '../../shared/services/alert.service';
import { AuthenticationService } from '../../shared/services/authentication.service';

// Objects
import { Student } from '../../objects/student';
import { Supervisor } from '../../objects/supervisor';
import { CompanyOpportunity } from '../../objects/companyOpportunity';

@Component({
    moduleId: module.id,
    selector: 'company-student',
    templateUrl: 'student.template.html',
    providers: [CompanyService]
})

export class ViewStudentC {
    subscribtion: any;
    sid: number;
    student: Student;
    oppertunity: CompanyOpportunity = null;
    constructor(
        private _authService: AuthenticationService,
        private _alertService: AlertService,
        private _companyService: CompanyService,
        private _router: ActivatedRoute
    ) {

    }

    ngOnInit() { 
        this.subscribtion = this._router.params.subscribe(params => {
            this.sid = +params['id'];
        });
        this._companyService.getStudentOpp(this.sid).subscribe(
            result => {
                if (result.status) {
                    this.student = result.data;
                    this.oppertunity = this.student.applied_opportunities.opportunity;
                    console.log(this.student);
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            });

    }
}
