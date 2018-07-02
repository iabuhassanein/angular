import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { AlertService } from "../../shared/services/alert.service";
import { Session } from "../../objects/session";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _alertService: AlertService, private _authService: AuthenticationService, private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this._authService.check('currentUser')) {
            try {
                // var obj = JSON.parse(this._authService.get('currentUser'));
                // if (obj.role == "ROLE_TRAINING_DEPARTMENT") return true;
                
                let session: Session = this._authService.getSession();
                if (session.role == "ROLE_TRAINING_DEPARTMENT") return true;
                let url = this.getProfileURL(session.role);
                this._alertService.success('You Are Already Logged in');
                this._router.navigate([url]);
                return false;
            } catch (ex) {
                return false;
            }
        }

        // not logged in so redirect to login page with the return url
        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    getProfileURL(type: string): string {
        switch (type) {
            case "ROLE_ADMIN":
                return '/admin';
            case "ROLE_TRAINING_DEPARTMENT":
                return '/training-department';
            case "ROLE_COMPANY_COORDINATOR":
                return '/company';
            case "ROLE_SUPERVISOR":
                return '/supervisor';
            case "ROLE_ACADEMIC_DEPARTMENT":
                return '/academic-department';
            case "ROLE_TRAINING_ADVISOR":
                return '/training-advisor';
            case "ROLE_STUDENT":
                return '/student';
            default:
                return '/';
        }
    }

}