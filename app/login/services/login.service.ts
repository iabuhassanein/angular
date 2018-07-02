import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

// Componets
import { UserInfo } from '../../objects/userInfo';

// Services
import { AuthenticationService } from "../../shared/services/authentication.service";
import { AlertService } from '../../shared/services/alert.service';

// Objects 
import { Session } from '../../objects/session';

import { config } from '../../shared/config/path';

@Injectable()

export class LoginService {
    constructor(
        private _http: Http,
        private _authService: AuthenticationService,
        private _alertService: AlertService,
    ) { }

    loginProccess(user: UserInfo) {
        let headers = new Headers();
        var body = 'username='+user.login+'&password='+user.password+'&submit=login';
        headers.append('Accept', 'application/json');
        var token_n = btoa(user.login + ":" + user.password);
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        let options = new RequestOptions({ headers: headers });
        return this._http.post(config.api_url + 'login', body, options)
            .map((response: Response) => {
                console.log('ismail');
                // login successful if there's a jwt token in the response
                let res = response.json();
                if (res.status) {
                    let session: Session = null;
                    let profile = res.data;
                    if(res.data.userInfo) {
                        session = {
                            id: res.data.id,
                            role: res.data.userInfo.role,
                            userInfo: res.data.userInfo,
                            token: token_n
                        }
                    }else{
                        session = {
                            id: res.data.id,
                            role: res.data.role,
                            userInfo: res.data,
                            token: token_n
                        }
                    }
                    this._authService.delete('currentUser');
                    this._authService.set('currentUser', JSON.stringify(session), null, '/');
                    this._authService.set('profile', JSON.stringify(profile), null, '/');
                    // this.getProfile(sessdata.userInfo, sessdata.role);
                    return true;
                } else {
                    this._alertService.error(res.message);
                    return false;
                }
            });
    }

    // loginProccess(user: UserInfo) {
    //     let headers = new Headers();
    //     headers.append('Accept', 'application/json');
    //     headers.append("Authorization", "Basic " + btoa(user.login + ":" + user.password));
    //     let options = new RequestOptions({ headers: headers });
    //     var token_n = btoa(user.login + ":" + user.password);
    //     return this._http.get(config.api_url + 'userInfo/current', options)
    //         .map((response: Response) => {
    //             // login successful if there's a jwt token in the response
    //             var res = response.json();
    //                 if (res.status) {
    //                 let session: Session = null;
    //                 let profile = res.data;
    //                 session = {
    //                     id: res.data.id,
    //                     role: res.data.role,
    //                     userInfo: res.data,
    //                     token: token_n
    //                 }
    //                 this._authService.delete('currentUser');
    //                 this._authService.set('currentUser', JSON.stringify(session), null, '/');
    //                 this._authService.set('profile', JSON.stringify(profile), null, '/');
    //                 return true;
    //             } else {
    //                 this._alertService.error(res.message);
    //                 return false;
    //             }
    //         });
    // }

    logout() {
        this._authService.delete('currentUser');
    }
}