import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

// Objects
import { OpportunityComment } from '../../objects/opportunityComment';

// Services
import { AuthenticationService } from "../../shared/services/authentication.service";

@Injectable()
export class ReportService {
    private _base_url = "http://kfupmf.mmed.email/backend/public/api/";
    private _base_url2 = "http://kfupm.mmed.email:8080/";
    constructor(private _http: Http, private _authService: AuthenticationService) { }

    getADStatistics() {
        let params = this._authService.getToken("ROLE_ACADEMIC_DEPARTMENT");
        return this._http.get(this._base_url + 'academicDepartmentStatistics?token=' + params)
            .map(res => res.json())
            .retry(2);
    }


    getFilterData() {
        let params = this._authService.getToken("ROLE_ACADEMIC_DEPARTMENT");
        return this._http.get(this._base_url + 'academicDepartmentfilterData?token=' + params)
            .map(res => res.json())
            .retry(2);
    }

    getReports(type:any = 'student',m: any = 0, coop: any = 0, summer: any = 0, t: any = 0, inter: any = 0, c: any = 0, city: any = 0) {
        let params = this._authService.getToken("ROLE_ACADEMIC_DEPARTMENT");
        return this._http.get(this._base_url + 'reports?token=' + params + '&type='+type+'&major=' + m
        + '&term=' + t + '&company=' + c + '&city=' + city + '&coop=' + coop + '&summerTraining=' + summer + '&international=' + inter
        )
            .map(res => res.json())
            .retry(2);
    }

    getReportsFile(type:any = 'student',m: any = 0, coop: any = 0, summer: any = 0, t: any = 0, inter: any = 0, c: any = 0, city: any = 0) {
        let params = this._authService.getToken("ROLE_ACADEMIC_DEPARTMENT");
        return this._http.get(this._base_url + 'reportsFile?token=' + params + '&type='+type+'&major=' + m
        + '&term=' + t + '&company=' + c + '&city=' + city + '&coop=' + coop + '&summerTraining=' + summer + '&international=' + inter
        )
            .map(res => res.json())
            .retry(2);
    }
}
