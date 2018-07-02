import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

// Objects
// import { OpportunityComment } from '../../objects/opportunityComment';

// Services
import { AuthenticationService } from "../../shared/services/authentication.service";

@Injectable()
export class CompaniesService {
    private _base_url = "http://kfupmf.mmed.email/backend/public/api/";
    private _base_url2 = "http://kfupm.mmed.email:8080/";
    constructor(private _http: Http, private _authService: AuthenticationService) { }

    getCompanies(offset: number, limit: number) {
        let params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/company?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(res => res.json())
            .retry(2);
    }

    getCompaniesApproved(offset: number, limit: number) {
        let params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/company?approved=true&token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(res => res.json())
            .retry(2);
    }

    approveCompany(id: number, index: number) {
        let params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        let headers = new Headers();
        let body = JSON.stringify({ "approved": 1 });
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.put(this._base_url + 'trainingDepartment/company/'+id+'?token=' + params, body, options)
            .map(res => res.json())
    }
}
