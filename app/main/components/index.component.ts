import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { AlertService } from '../../shared/services/alert.service';
import { MainService } from '../services/main.service';

// Object
import { Session } from '../../objects/session';
import { Announcement } from '../../objects/announcement';


declare var $: any;
@Component({
    moduleId: module.id,
    selector: 'index',
    templateUrl: './index.template.html',
    providers: [MainService]
})
export class IndexPage {
    isLoggindInb: boolean = false;
    isLoggindIn: string = 'no';
    loggindInURL: string = '/login';
    hloggindInURL: string = '/login';
    announcements: Announcement[] = [];
    constructor(
        private _authService: AuthenticationService,
        private _mainService: MainService,
        private _alertService: AlertService,
        private _router: Router,
    ) { }

    ngOnInit() {
        if(this._router.url == '/logout'){
            this._authService.logout();
        }else if (this._authService.check('currentUser')) {
            this.isLoggindInb = true;
            let session: Session = this._authService.getSession();
            this.isLoggindIn = session.role;
            this.loggindInURL = this.getProfileURL(session.role);
            this.hloggindInURL = '/logout';
        }
        
        this._mainService.getAnnouncements(0, 5).subscribe(
            result => {
                if (result.status) {
                    this.announcements = result.data;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            });
    }

    getProfileURL(type: string): string {
        switch (type) {
            case "ROLE_ADMIN":
                return '/training-department';
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
