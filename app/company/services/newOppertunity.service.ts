import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';

// Objects
import { CompanyOpportunity } from '../../objects/companyOpportunity';

// Services
import { AuthenticationService } from '../../shared/services/authentication.service';

import { config } from '../../shared/config/path';
@Injectable()

export class NewOppertunityService {
    private _base_url = "http://kfupmf.mmed.email/backend/public/api/";
    private _base_url2 = "http://kfupm.mmed.email:8080/";
    constructor(private _http: Http, private _authService: AuthenticationService) { }

    getTrainingPrograms(offset: number, limit: number) {
        let token = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Authorization", "Basic " + token);
        let options = new RequestOptions({ headers: headers });
        return this._http.get(config.api_url + 'trainingProgram?offset=' + offset + '&limit=' + limit, options)
            .map(res => res.json())
            .retry(2);
    }

    confirmOppertunities() {
        let token = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let headers = new Headers();
        let data: any = {
            status: 1
        }
        let body = JSON.stringify(data);
        headers.append('Accept', 'application/json');
        headers.append("Authorization", "Basic " + token);
        let options = new RequestOptions({ headers: headers });
        return this._http.put(config.api_url + 'companyOpportunity', body, options)
            .map(res => res.json())
            .retry(2);
    }

    getCompanyOppertunities(offset: number, limit: number) {
        let token = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Authorization", "Basic " + token);
        let options = new RequestOptions({ headers: headers });
        return this._http.get(config.api_url + 'companyOpportunity?offset=' + offset + '&limit=' + limit, options)
            .map(res => res.json())
            .retry(2);
    }

    academicDepartments(offset: number, limit: number) {
        let token = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Authorization", "Basic " + token);
        let options = new RequestOptions({ headers: headers });

        return this._http.get(config.api_url + 'academicDepartment?offset=' + offset + '&limit=' + limit, options)
            .map(res => res.json())
            .retry(2);
    }

    uploadFile(file: File, user_id: number, opp_id: number) {
        let token = this._authService.getToken("ROLE_COMPANY_COORDINATOR");

        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('user_id', user_id.toString());
        formData.append('opp_id', opp_id.toString());

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Authorization", "Basic " + token);
        let options = new RequestOptions({ headers: headers });
        return this._http.post(config.api_url + 'fileToOpp', formData, options)
            .map(res => res.json())
            .retry(2)
    }

    createCompanyOppertunity(oppertunity: CompanyOpportunity) {
        let token = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let headers = new Headers();
        let body = JSON.stringify(oppertunity);
        headers.append('Accept', 'application/json');
        headers.append("Authorization", "Basic " + token);
        let options = new RequestOptions({ headers: headers });
        return this._http.post(config.api_url + 'companyOpportunity', body, options)
            .map(res => res.json())
            .retry(2);
    }

    updateCompanyOppertunity(oppertunity: CompanyOpportunity) {
        let token = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Authorization", "Basic " + token);
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(oppertunity);
        return this._http.put(config.api_url + 'companyOpportunity/' + oppertunity.id, body, options)
            .map(res => res.json())
            .retry(2);
    }

    deleteCompanyOppertunity(opp_id: number) {
        let token = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Authorization", "Basic " + token);
        let options = new RequestOptions({ headers: headers });
        return this._http.delete(config.api_url + 'CompanyOpportunity/' + opp_id, options)
            .map(res => res.json())
            .retry(2);
    }
}
