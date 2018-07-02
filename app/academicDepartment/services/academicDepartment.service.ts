import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

// Objects
import { OpportunityComment } from '../../objects/opportunityComment';

// Services
import { AuthenticationService } from "../../shared/services/authentication.service";

@Injectable()
export class AcademicDepartmentService {
    private _base_url = "http://kfupmf.mmed.email/backend/public/api/";
    private _base_url2 = "http://kfupm.mmed.email:8080/";
    constructor(private _http: Http, private _authService: AuthenticationService) { }

    changeCoordinator(SID: number, coordID: number) {
        let params = this._authService.getToken("ROLE_ACADEMIC_DEPARTMENT");
        let body = JSON.stringify({ "student": SID, "coordinator": coordID });
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.put(this._base_url + 'academicDepartmentCoordinator?token=' + params, body, options)
            .map(res => res.json())
            .retry(2);
    }

    getADStudents(offset: number, limit: number) {
        let params = this._authService.getToken("ROLE_ACADEMIC_DEPARTMENT");
        return this._http.get(this._base_url + 'student?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(res => res.json())
            .retry(2);
    }

    getADCoordinators(offset: number, limit: number) {
        let params = this._authService.getToken("ROLE_ACADEMIC_DEPARTMENT");
        return this._http.get(this._base_url + 'academicDepartmentCoordinator?token=' + params+ '&offset=' + offset + '&limit=' + limit)
            .map(res => res.json())
            .retry(2);
    }

    createOpportunityComment(comment: OpportunityComment) {
        let params = this._authService.getToken("ROLE_ACADEMIC_DEPARTMENT");
        let headers = new Headers();
        let body = JSON.stringify(comment);
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'opportunityComment?token=' + params, body, options)
            .map(res => res.json());
    }

    getOpportunityComments(oppID: number) {
        let params = this._authService.getToken("ROLE_ACADEMIC_DEPARTMENT");
        return this._http.get(this._base_url + 'opportunityComment/'+oppID+'?token=' + params)
            .map(res => res.json())
            .retry(2);
    }

    getOppertunities(offset: number, limit: number) {
        let params = this._authService.getToken("ROLE_ACADEMIC_DEPARTMENT");
        return this._http.get(this._base_url + 'opportunityInDepartment?token=' + params + '&offset=' + offset + '&limit=' + limit)
            .map(res => res.json())
            .retry(2);
    }

    getOpportunity(oppID: number) {
        let params = this._authService.getToken("ROLE_ACADEMIC_DEPARTMENT");
        return this._http.get(this._base_url + 'opportunityAD/' + oppID + '?token=' + params)
            .map(res => res.json())
            .retry(2);
    }

    approveOppertunity(oppID: number) {
        let params = this._authService.getToken("ROLE_ACADEMIC_DEPARTMENT");
        let body = JSON.stringify({"oppID": oppID});
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._base_url + 'approveOpportunity?token=' + params, body, options)
            .map(res => res.json())
            .retry(2);
    }
}
