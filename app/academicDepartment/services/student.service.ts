import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

// Objects
import { StudentComment } from '../../objects/StudentComment';

// Services
import { AuthenticationService } from "../../shared/services/authentication.service";

@Injectable()
export class StudentService {
    private _base_url = "http://kfupmf.mmed.email/backend/public/api/";
    private _base_url2 = "http://kfupm.mmed.email:8080/";
    constructor(private _http: Http, private _authService: AuthenticationService) { }

    getStudent(stdID: number) {
        let params = this._authService.getToken("ROLE_ACADEMIC_DEPARTMENT");
        return this._http.get(this._base_url + 'academicDepartment/student/'+stdID+'?token=' + params)
            .map(res => res.json())
            .retry(2);
    }

    getStudentOpportunities(stdID: number) {
        let params = this._authService.getToken("ROLE_ACADEMIC_DEPARTMENT");
        return this._http.get(this._base_url + 'academicDepartment/studentOpportunities/'+stdID+'?token=' + params)
            .map(res => res.json())
            .retry(2);
    }
    
    createStudentComment(comment: StudentComment) {
        let params = this._authService.getToken("ROLE_ACADEMIC_DEPARTMENT");
        let headers = new Headers();
        let body = JSON.stringify(comment);
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'academicDepartment/studentComment?token=' + params, body, options)
            .map(res => res.json());
    }

    getStudentComments(stdID: number) {
        let params = this._authService.getToken("ROLE_ACADEMIC_DEPARTMENT");
        return this._http.get(this._base_url + 'academicDepartment/studentComment/'+stdID+'?token=' + params)
            .map(res => res.json())
            .retry(2);
    }
}
