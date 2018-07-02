import { Injectable } from '@angular/core';
// import { Http, Jsonp, Headers, RequestOptions } from '@angular/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

// Imports Objects
import { Company } from '../../objects/company';
import { CompanyCoordinator } from '../../objects/companyCoordinator';
import { UserInfo } from '../../objects/userInfo';
// import { UserType } from '../../objects/userType';
import { KfupmFile } from '../../objects/file';

// Services
import { AuthenticationService } from '../../shared/services/authentication.service';

import { config } from '../../shared/config/path';

@Injectable()
export class RegisterCompanyService {
    constructor(private _http: Http, private _authService: AuthenticationService) { }

    uploadLogo(file: File) {
        let formData: FormData = new FormData();
        formData.append('file', file);
        return this._http.post(config.api_url + 'file', formData)
            .map(res => res.json())
    }

    createCompanyAccount(coordinator: CompanyCoordinator) {
        let headers = new Headers();
        let body = JSON.stringify(coordinator);
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(config.api_url + 'company', body, options)
            .map(res => res.json());
    }

    updateCompany(company: Company) {
        let token = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let headers = new Headers();
        let body = JSON.stringify(company);
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append("Authorization", "Basic " + token);
        let options = new RequestOptions({ headers: headers });
        return this._http.put(config.api_url + 'company/'+company.id, body, options)
            .map(res => res.json());
    }

    createUser(user: UserInfo) {
        let headers = new Headers();
        let body = JSON.stringify(user);
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(config.api_url + 'userInfo', body, options)
            .map(res => res.json());
    }

    updateCompanyCoordinator(coordinator: CompanyCoordinator) {
        let token = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let headers = new Headers();
        let body = JSON.stringify(coordinator);
        headers.append('Accept', 'application/json');
        headers.append("Authorization", "Basic " + token);
        let options = new RequestOptions({ headers: headers });
        return this._http.put(config.api_url + 'companyCoordinator/'+coordinator.id, body, options)
            .map(res => res.json());
    }

    createCompanyCoordinator(coordinator: CompanyCoordinator) {
        let token = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let headers = new Headers();
        let body = JSON.stringify(coordinator);
        headers.append('Accept', 'application/json');
        headers.append("Authorization", "Basic " + token);
        let options = new RequestOptions({ headers: headers });
        return this._http.post(config.api_url + 'companyCoordinator', body, options)
            .map(res => res.json());
    }
}