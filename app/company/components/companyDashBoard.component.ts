import { Component } from '@angular/core';

// Services
import { CompanyService } from './../services/company.service';
import { ValidationService } from '../../common/services/validation.service';
import { AlertService } from '../../shared/services/alert.service';
import { AuthenticationService } from '../../shared/services/authentication.service';

// Objects
import { CompanyOpportunity } from '../../objects/companyOpportunity';
import { AcademicDepartment } from '../../objects/academicDepartment';
import { TrainingProgram } from '../../objects/trainingProgram';
import { DocFile } from '../../objects/DocFile';
import { Session } from '../../objects/session';
import { Notification } from '../../objects/notification';
import { AppliedOpportunity } from '../../objects/appliedOpportunity';
import { Supervisor } from '../../objects/supervisor';
import { Student } from '../../objects/student';

@Component({
    moduleId: module.id,
    selector: 'app-company-dashboard',
    templateUrl: 'companyDashBoard.template.html',
    providers: [CompanyService, ValidationService]
})

export class CompanyDashBoardComponent {
    limit: number = 10;
    offset: number = 0;
    limitN: number = 10;
    offsetN: number = 0;
    noMoreNote: boolean = false;
    isGettingNote: boolean = false;
    currentPage: number = 1;
    oppCount: number = 0;
    noMore: boolean = false;
    opp_pages: number[] = [];
    fullName: string = '';
    companyName: string = '';
    companyAbout: string = '';
    oppData: CompanyOpportunity[] = [];
    oppAllData: CompanyOpportunity[] = [];
    notifications: Notification[] = [];
    limitS: number = 10;
    offsetS: number = 0;
    currentPageS: number = 1;
    stdCount: number = 0;
    noMoreS: boolean = false;
    std_pages: number[] = [];
    stdData: AppliedOpportunity[] = [];
    stdAllData: AppliedOpportunity[] = [];
    supervisorsData: Supervisor[] = [];
    changingSupvs: boolean = false;

    constructor(
        private _companyService: CompanyService,
        private _alertService: AlertService,
        private _authService: AuthenticationService
    ) {
        let session: Session = this._authService.getSession();
        this.fullName = session.userInfo.firstName + ' ' + session.userInfo.lastName;
        let profile: any = this._authService.getProfile();
        this.companyName = profile.company.englishName;
        this.companyAbout = profile.company.englishAbout;
        // this.companyName = 'AraPeak';
        // this.companyAbout = 'this is arapeak company fo it and software services.';
    }

    ngOnInit() {
        this._companyService.getCompanyOppertunities(this.offset, this.limit).subscribe(
            result => {
                if (result.status) {
                    this.oppAllData = result.data;
                    this.oppCount = result.count;
                    this.opp_pages = Array(Math.ceil(this.oppCount / this.limit)).fill(1);
                    this.oppData = this.oppAllData.slice(0, this.limit);
                    // console.log(this.oppData);
                } else {
                    this._alertService.error(result.message);
                }
                if (result.data.length < this.limit) {
                    this.noMore = true;
                }
            },
            error => {
                this._authService.handelError(error);
            });
        this._companyService.getNotification(this.offsetN, this.limitN).subscribe(
            result => {
                if (result.status) {
                    this.notifications = result.data;
                    if (result.data.length < this.limitN)
                        this.noMoreNote = true;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            });
        this._companyService.getSupervisors(0, 0).subscribe(
            result => {
                if (result.status) {
                    this.supervisorsData = result.data;
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            });
        this._companyService.getAppliedStudents(this.offsetS, 0).subscribe(
            result => {
                if (result.status) {
                    this.stdAllData = result.data;
                    this.stdCount = result.count;
                    this.std_pages = Array(Math.ceil(this.stdCount / this.limitS)).fill(1);
                    this.stdData = this.stdAllData.slice(0, this.limitS);
                } else {
                    this._alertService.error(result.message);
                }
                if (result.data.length < this.limitS) {
                    this.noMoreS = true;
                }
            },
            error => {
                this._authService.handelError(error);
            });

    }
    onScroll($event: any) {
        let notcont = $event.target;
        if (notcont.scrollTop === (notcont.scrollHeight - notcont.offsetHeight)) {
            // console.log('scrolled');
            this.loadMoreNotification();
        }
    }
    Logout() {
        this._authService.logout();
    }

    getFirstChar(str: string) {
        if(str) return str.charAt(0);
        return '';
    }
    changeSupervisore(SID: number, appliedID: number) {
        if(SID==0) return;
        this.changingSupvs = true;
        this._companyService.changeSupervisor(SID, appliedID).subscribe(
            result => {
                if (result.status) {
                    this._alertService.success(result.message);
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
                this.changingSupvs = false;
            },
            () => {
                this.changingSupvs = false;
            });
    }

    loadMoreOpp() {
        if (this.noMore) return;
        this.offset += this.limit;
        this._companyService.getCompanyOppertunities(this.offset, this.limit).subscribe(
            result => {
                if (result.status) {
                    let arradata = result.data;
                    this.oppCount = result.count;
                    this.opp_pages = Array(Math.ceil(this.oppCount / this.limit)).fill(1);
                    if (arradata) {
                        arradata.forEach((obj: CompanyOpportunity, index: number) => {
                            this.oppAllData.push(obj);
                        });
                    }
                    if (arradata.length < this.limit) {
                        this.noMore = true;
                    }
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            },
            () => {
                this.goToPage(this.currentPage);
            });
    }

    viewNotification(index: number) {
        let note = this.notifications[index];
        switch (note.type) {
            case 'link':
                break;
            default:
                // this._alertService.notification(note.title + "\n\n" + note.content, false);
                this._companyService.readNotification(note.id);
                note.read = true;
                this.notifications[index] = note;
                break;
        }
    }

    loadMoreNotification() {
        if (this.noMoreNote) return;
        this.isGettingNote = true;
        this.offsetN += this.limitN;
        this._companyService.getNotification(this.offsetN, this.limitN).subscribe(
            result => {
                if (result.status) {
                    let arradata = result.data;
                    if (arradata) {
                        arradata.forEach((obj: Notification, index: number) => {
                            this.notifications.push(obj);
                        });
                    }
                    if (arradata.length < this.limitN) {
                        this.noMoreNote = true;
                    }
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            },
            () => {
                this.isGettingNote = false;
            });
    }

    goToPage(index: number = 1) {
        if ((index < 1) || (index > this.opp_pages.length)) return;
        let offset = this.limit * (index - 1);
        let limit = offset + this.limit;
        this.currentPage = index;
        if (this.oppAllData.length <= offset) {
            this.loadMoreOpp();
        }
        this.oppData = this.oppAllData.slice(offset, limit);
    }

    goToPageS(index: number = 1) {
        if ((index < 1) || (index > this.std_pages.length)) return;
        let offset = this.limitS * (index - 1);
        let limit = offset + this.limitS;
        this.currentPageS = index;
        if (this.stdAllData.length <= offset) {
            this.loadMorestd();
        }
        this.stdData = this.stdAllData.slice(offset, limit);
    }

    loadMorestd() {
        if (this.noMoreS) return;
        this.offsetS += this.limitS;
        this._companyService.getAppliedStudents(this.offsetS, this.limitS).subscribe(
            result => {
                if (result.status) {
                    let arradata = result.data;
                    this.stdCount = result.count;
                    this.std_pages = Array(Math.ceil(this.stdCount / this.limitS)).fill(1);
                    if (arradata) {
                        arradata.forEach((obj: AppliedOpportunity, index: number) => {
                            this.stdAllData.push(obj);
                        });
                    }
                    if (arradata.length < this.limitS) {
                        this.noMoreS = true;
                    }
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            },
            () => {
                this.goToPageS(this.currentPageS);
            });
    }
}
