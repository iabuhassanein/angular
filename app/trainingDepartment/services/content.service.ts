import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

// Objects
import { Content } from '../../objects/content';

// Services
import { AuthenticationService } from "../../shared/services/authentication.service";

@Injectable()
export class ContentService {
    private _base_url = "http://kfupmf.mmed.email/backend/public/api/";
    private _base_url2 = "http://kfupm.mmed.email:8080/";
    constructor(private _http: Http, private _authService: AuthenticationService) { }


    createContent(content: Content) {
        let params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        let headers = new Headers();
        let body = JSON.stringify(content);
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'trainingDepartment/content?token=' + params, body, options)
            .map(res => res.json())
            .retry(2);
    }

    updateContent(id:number, content: Content) {
        let params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        let headers = new Headers();
        let body = JSON.stringify(content);
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.put(this._base_url + 'trainingDepartment/content/'+id+'?token=' + params, body, options)
            .map(res => res.json())
            .retry(2);
    }

    getAnnouncements(offset: number, limit: number) {
        let params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/announcements?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(res => res.json())
            .retry(2);
    }

    getNews(offset: number, limit: number) {
        let params = this._authService.getToken("ROLE_TRAINING_DEPARTMENT");
        return this._http.get(this._base_url + 'trainingDepartment/news?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(res => res.json())
            .retry(2);
    }
}
