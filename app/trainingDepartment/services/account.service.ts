import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

// Objects
// import { OpportunityComment } from '../../objects/opportunityComment';

// Services
import { AuthenticationService } from "../../shared/services/authentication.service";

@Injectable()
export class AccountService {
    private _base_url = "http://kfupmf.mmed.email/backend/public/api/";
    private _base_url2 = "http://kfupm.mmed.email:8080/";
    constructor(private _http: Http, private _authService: AuthenticationService) { }

    getTrainingDepartmentAccounts(offset: number, limit: number) {
        let params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/trainingDepartmentAccount?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(res => res.json())
            .retry(2);
    }

    getAcademicDepartmentAccounts(offset: number, limit: number) {
        let params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/academicDepartmentAccount?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(res => res.json())
            .retry(2);
    }

    getStudentAccounts(offset: number, limit: number) {
        let params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/studentAccount?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(res => res.json())
            .retry(2);
    }


    getFilterData() {
        let params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/filterData?token=' + params)
            .map(res => res.json())
            .retry(2);
    }


}
