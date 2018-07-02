import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';

// Objects
import { CompanyOpportunity } from '../../objects/companyOpportunity';

// Services
import { AuthenticationService } from "../../shared/services/authentication.service";

import { config } from '../../shared/config/path';

@Injectable()

export class CompanyService {
    constructor(private _http: Http, private _authService: AuthenticationService) { }

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

    getStudentOpp(sid: number){
        let token = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Authorization", "Basic " + token);
        let options = new RequestOptions({ headers: headers });
        return this._http.get(config.api_url + 'student/'+sid+'?filter=accepted', options)
            .map(res => res.json())
            .retry(2);
    }

    getAppliedStudents(offset: number, limit: number) {
        let token = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Authorization", "Basic " + token);
        let options = new RequestOptions({ headers: headers });
        return this._http.get(config.api_url + 'student?offset=' + offset + '&limit=' + limit+'&filter=applied', options)
            .map(res => res.json())
            .retry(2);
    }

    getsendOffer(body: string, oppID: number){
        let token = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Authorization", "Basic " + token);
        let options = new RequestOptions({ headers: headers });
        return this._http.post(config.api_url + 'sendOfferToSTD/'+oppID, body, options)
            .map(res => res.json())
            .retry(2);
    }

    getOppAppliedStudents(oppID: number) {
        let token = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Authorization", "Basic " + token);
        let options = new RequestOptions({ headers: headers });
        return this._http.get(config.api_url + 'companyOpportunity/'+oppID+'/students', options)
            .map(res => res.json())
            .retry(2);
    }

    readNotification(id: number) {
        let token = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let headers = new Headers();
        let body = JSON.stringify({ "noteID": id });
        headers.append('Accept', 'application/json');
        headers.append("Authorization", "Basic " + token);
        let options = new RequestOptions({ headers: headers });
        return this._http.put(config.api_url + 'readNotification', body, options)
            .map(res => res.json())
            .retry(2).subscribe(
            result => { },
            error => {
                this._authService.handelError(error);
            });
    }

    getNotification(offset: number, limit: number) {
        let token = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Authorization", "Basic " + token);
        let options = new RequestOptions({ headers: headers });
        return this._http.get(config.api_url + 'notification?offset=' + offset + '&limit=' + limit, options)
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
        return this._http.post(config.api_url + 'file', formData, options)
            .map(res => res.json())
            .retry(2)
    }

    getSupervisors(offset: number, limit: number) {
        let token = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Authorization", "Basic " + token);
        let options = new RequestOptions({ headers: headers });
        return this._http.get(config.api_url + 'supervisor?offset=' + offset + '&limit=' + limit, options)
            .map(res => res.json())
            .retry(2);
    }

    changeSupervisor(SupervisorID: number, sturedntID: number) {
        let token = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let body = JSON.stringify({ "supervisor": SupervisorID});
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Authorization", "Basic " + token);
        let options = new RequestOptions({ headers: headers });
        return this._http.put(config.api_url + 'student/'+sturedntID+'/supervisor', body, options)
            .map(res => res.json())
            .retry(2);
    }

    getCompanyOppertunity(oppID: number) {
        let token = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Authorization", "Basic " + token);
        let options = new RequestOptions({ headers: headers });
        return this._http.get(config.api_url + 'companyOpportunity/' + oppID, options)
            .map(res => res.json())
            .retry(2);
    }
}
