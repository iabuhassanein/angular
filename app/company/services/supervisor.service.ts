import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';

// Objects
import { Supervisor } from '../../objects/supervisor';
import { UserInfo } from '../../objects/userInfo';

// Services
import { AuthenticationService } from '../../shared/services/authentication.service';

@Injectable()

export class SupervisorService {
    private _base_url = "http://kfupmf.mmed.email/backend/public/api/";
    private _base_url2 = "http://kfupm.mmed.email:8080/";
    constructor(private _http: Http, private _authService: AuthenticationService) { }

    getSupervisors( offset: number, limit: number){
        let params = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        return this._http.get(this._base_url+'supervisor?token='+params+'&offset='+offset+'&limit='+limit)
            .map(res => res.json())
            .retry(2);
    }

    createUser(user: UserInfo) {
        let params = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let headers = new Headers();
        let body = JSON.stringify(user);
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'userInfo?token'+params, body, options)
            .map(res => res.json());
    }

    createSupervisor(user: Supervisor) {
        let params = this._authService.getToken("ROLE_COMPANY_COORDINATOR");
        let headers = new Headers();
        let body = JSON.stringify(user);
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'supervisor?token='+params, body, options)
            .map(res => res.json());
    }
    
    uploadFile(file: File, user_id: number, opp_id: number) {
        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('user_id', user_id.toString() );
        formData.append('opp_id', opp_id.toString() );

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'fileToOpp', formData, options)
            .map(res => res.json())
    }
}
