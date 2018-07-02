import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { AuthenticationService } from "../services/authentication.service";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _authService: AuthenticationService, private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log('canActivate');
        if (this._authService.check('currentUser')) {
            // logged in so return true
            console.log(this._authService.get('currentUser'));
            return true;
        }
        // if (this._authService.authenticate()) {
        //     // logged in so return true
        //     console.log('currentUser');
        //     return true;
        // }

        // not logged in so redirect to login page with the return url
        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }


}