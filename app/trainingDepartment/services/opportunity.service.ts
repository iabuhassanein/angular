import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

// Objects
import { OpportunityComment } from '../../objects/opportunityComment';

// Services
import { AuthenticationService } from "../../shared/services/authentication.service";

@Injectable()
export class OpportunityService {
    private _base_url = "http://kfupmf.mmed.email/backend/public/api/";
    private _base_url2 = "http://kfupm.mmed.email:8080/";
    constructor(private _http: Http, private _authService: AuthenticationService) { }

    getOpportunity(oppID: number) {
        let params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/opportunity/' + oppID + '?token=' + params)
            .map(res => res.json())
            .retry(2);
    }

    createOpportunityComment(comment: OpportunityComment) {
        let params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        let headers = new Headers();
        let body = JSON.stringify(comment);
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'trainingDepartment/opportunityComment?token=' + params, body, options)
            .map(res => res.json());
    }

    getOpportunityComments(oppID: number) {
        let params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/opportunityComment/'+oppID+'?token=' + params)
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
