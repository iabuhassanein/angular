import { Component } from '@angular/core';

// Services
import { AlertService } from '../../shared/services/alert.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { StudentService } from '../services/student.service';

// Objects
import { Session } from '../../objects/session';
import { Notification } from '../../objects/notification';
import { Student } from '../../objects/student';
import { CompanyOpportunity } from '../../objects/companyOpportunity';
import { Announcement } from '../../objects/announcement';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'student-profile',
    templateUrl: 'studentProfile.template.html'
})
export class StudentProfile {
    studentProfile: Student;
    limitN: number = 5;
    offsetN: number = 0;
    limit: number = 5;
    offset: number = 0;
    limitA: number = 5;
    offsetA: number = 0;
    currentPage: number = 1;
    oppCount: number = 0;
    noMore: boolean = false;
    opp_pages: number[] = [];
    oppData: CompanyOpportunity[] = [];
    oppAllData: CompanyOpportunity[] = [];
    aopp_pages: number[] = [];
    aoppCount: number = 0;
    aoppData: CompanyOpportunity[] = [];
    aoppAllData: CompanyOpportunity[] = [];
    anoMore: boolean = false;
    acurrentPage: number = 1;
    abroadOppertunities: CompanyOpportunity[] = [];
    obtainedOppertunities: CompanyOpportunity[] = [];
    notifications: Notification[] = [];
    announcements: Announcement[] = [];
    noMoreNote: boolean = false;
    isGettingNote: boolean = false;
    isAccepting: boolean = false;
    private _base_url_img = "http://kfupmf.mmed.email/backend/public/image/";

    constructor(
        private _studentService: StudentService,
        private _alertService: AlertService,
        private _authService: AuthenticationService
    ) { }


    ngOnInit() {
        this.studentProfile = <Student>this._authService.getProfile();
        this._studentService.getNotification(this.offsetN, this.limitN).subscribe(
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
        this._studentService.getOppertunities(this.offset, this.limit).subscribe(
            result => {
                if (result.status) {
                    this.oppAllData = result.data;
                    this.oppCount = result.count;
                    this.opp_pages = Array(Math.ceil(this.oppCount / this.limit)).fill(1);
                    this.oppData = this.oppAllData.slice(0, this.limit);
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

        this._studentService.getAnnouncements(0, 5).subscribe(
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
        this._studentService.getappliedOppertunities(this.offsetA, this.limitA).subscribe(
            result => {
                if (result.status) {
                    this.aoppAllData = result.data;
                    this.aoppCount = result.count;
                    this.abroadOppertunities = result.abroadOppertunities;
                    this.obtainedOppertunities = result.obtainedOppertunities;
                    this.aopp_pages = Array(Math.ceil(this.aoppCount / this.limitA)).fill(1);
                    this.aoppData = this.aoppAllData.slice(0, this.limitA);
                } else {
                    this._alertService.error(result.message);
                }
                if (result.data.length < this.limitA) {
                    this.anoMore = true;
                }
            },
            error => {
                this._authService.handelError(error);
            });
    }

    acceptOpp(id: number){
        this.isAccepting = true;
        this._studentService.acceptOpp(id).subscribe(
            result => {
                if (result.status) {
                    if(result.isInTraining){
                        this._alertService.warning(result.message);
                    }else{
                        this._alertService.success(result.message);
                    }
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
                this.isAccepting = false;
            },
            () => {
                this.isAccepting = false;
            });
    }

    onScroll($event: any) {
        let notcont = $event.target;
        if (notcont.scrollTop === (notcont.scrollHeight - notcont.offsetHeight)) {
            this.loadMoreNotification();
        }
    }

    loadMoreNotification() {
        if (this.noMoreNote) return;
        this.isGettingNote = true;
        this.offsetN += this.limitN;
        this._studentService.getNotification(this.offsetN, this.limitN).subscribe(
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

    OpenStudentCVUpload() {
        var elem = document.getElementById('uploadCVInput');
        if (elem && document.createEvent) {
            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", true, false);
            elem.dispatchEvent(evt);
        }
    }

    UploadCVFile(event: any) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let file: File = fileList[0];

            let subscribe = this._studentService.uploadCV(file).subscribe(
                result => {
                    if (result.status) {
                        this._alertService.success(result.message);
                    } else {
                        this._alertService.error(result.message);
                    }
                },
                error => {
                    this._authService.handelError(error);
                });
        }
    }

    loadMoreOpp() {
        if (this.noMore) return;
        this.offset += this.limit;
        this._studentService.getOppertunities(this.offset, this.limit).subscribe(
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

    loadMoreAOpp() {
        if (this.anoMore) return;
        this.offsetA += this.limitA;
        this._studentService.getappliedOppertunities(this.offsetA, this.limitA).subscribe(
            result => {
                if (result.status) {
                    let arradata = result.data;
                    this.aoppCount = result.count;
                    this.aopp_pages = Array(Math.ceil(this.aoppCount / this.limitA)).fill(1);
                    if (arradata) {
                        arradata.forEach((obj: CompanyOpportunity, index: number) => {
                            this.aoppAllData.push(obj);
                        });
                    }
                    if (arradata.length < this.limitA) {
                        this.anoMore = true;
                    }
                } else {
                    this._alertService.error(result.message);
                }
            },
            error => {
                this._authService.handelError(error);
            },
            () => {
                this.goToPageA(this.acurrentPage);
            });
    }

    goToPageA(index: number = 1) {
        if ((index < 1) || (index > this.aopp_pages.length)) return;
        let offset = this.limitA * (index - 1);
        let limit = offset + this.limitA;
        this.acurrentPage = index;
        if (this.aoppAllData.length <= offset) {
            this.loadMoreAOpp();
        }
        this.aoppData = this.aoppAllData.slice(offset, limit);
    }

}