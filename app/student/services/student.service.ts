import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

// Objects
// import { Student } from '../../objects/student';

// Services
import { AuthenticationService } from "../../shared/services/authentication.service";

@Injectable()
export class StudentService {
    private _base_url = "http://kfupmf.mmed.email/backend/public/api/";
    private _base_url2 = "http://kfupm.mmed.email:8080/";
    constructor(private _http: Http, private _authService: AuthenticationService) { }

    readNotification(id: number) {
        let params = this._authService.getToken("ROLE_STUDENT");
        let headers = new Headers();
        let body = JSON.stringify({ "noteID": id });
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.put(this._base_url + 'readNotification?token=' + params, body, options)
            .map(res => res.json())
            .retry(2).subscribe(
            result => { },
            error => {
                this._authService.handelError(error);
            });
    }

    acceptOpp(oppID: number) {
        let params = this._authService.getToken("ROLE_STUDENT");
        let body = JSON.stringify({"oppID": oppID});
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'acceptOpportunity?token=' + params, body, options)
            .map(res => res.json())
            .retry(2);
    }

    getAnnouncements(offset: number, limit: number) {
        let params = this._authService.getToken("ROLE_STUDENT");
        return this._http.get(this._base_url + 'news?type=announcements&offset=' + offset + '&limit=' + limit)
            .map(res => res.json())
            .retry(2);
    }

    getNotification(offset: number, limit: number) {
        let params = this._authService.getToken("ROLE_STUDENT");
        return this._http.get(this._base_url + 'notification?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(res => res.json())
            .retry(2);
    }

    getOppertunities(offset: number, limit: number) {
        let params = this._authService.getToken("ROLE_STUDENT");
        return this._http.get(this._base_url + 'opportunity?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(res => res.json())
            .retry(2);
    }

    getOppertunity(oppID: number) {
        let params = this._authService.getToken("ROLE_STUDENT");
        return this._http.get(this._base_url + 'opportunity/' + oppID + '?token=' + params)
            .map(res => res.json())
            .retry(2);
    }

    getappliedOppertunities(offset: number, limit: number) {
        let params = this._authService.getToken("ROLE_STUDENT");
        return this._http.get(this._base_url + 'appliedOpportunity?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(res => res.json())
            .retry(2);
    }

    applyOppertunity(oppID: number) {
        let params = this._authService.getToken("ROLE_STUDENT");
        let body = JSON.stringify({"oppID": oppID});
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'appliedOpportunity?token=' + params, body, options)
            .map(res => res.json())
            .retry(2);
    }

    uploadCV(file: File) {
        let params = this._authService.getToken("ROLE_STUDENT");
        let formData: FormData = new FormData();
        formData.append('file', file, file.name);

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'uploadCV?token='+params, formData, options)
            .map(res => res.json())
            .retry(2)
    }
}
