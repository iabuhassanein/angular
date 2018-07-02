import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

// Objects
// import { OpportunityComment } from '../../objects/opportunityComment';

// Services
import { AuthenticationService } from "../../shared/services/authentication.service";

@Injectable()
export class TrainingDepartmentService {
    private _base_url = "http://kfupmf.mmed.email/backend/public/api/";
    private _base_url2 = "http://kfupm.mmed.email:8080/";
    constructor(private _http: Http, private _authService: AuthenticationService) { }


    getOppertunities(offset: number, limit: number) {
        let params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/opportunity?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(res => res.json())
            .retry(2);
    }

    getStudents(offset: number, limit: number) {
        let params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/student?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(res => res.json())
            .retry(2);
    }

    approveOppertunity(oppID: number) {
        let params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        let body = JSON.stringify({"oppID": oppID});
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'trainingDepartment/approveOpportunity?token=' + params, body, options)
            .map(res => res.json())
            .retry(2);
    }
}
