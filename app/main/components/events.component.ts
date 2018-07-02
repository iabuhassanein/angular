import { Component } from '@angular/core';

// Services
import { AlertService } from '../../shared/services/alert.service';
import { MainService } from '../services/main.service';
import { AuthenticationService } from '../../shared/services/authentication.service';


// Objects
import { Event } from '../../objects/event';


@Component({
    moduleId: module.id,
    selector: 'events',
    templateUrl: 'events.template.html',
    providers: [MainService]
})

export class EventsComponent {
    limit: number = 5;
    offset: number = 0;
    noMore: boolean = false;
    opp_pages: number[] = [];
    oppCount: number = 0;
    currentPage: number = 1;
    oppData: Event[] = [];
    oppAllData: Event[] = [];
 constructor(
        private _mainService: MainService,
        private _alertService: AlertService,
        private _authService: AuthenticationService,
    ) {
    }

    ngOnInit() {
        this._mainService.getEvents(this.offset, this.limit).subscribe(
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

    }

    loadMoreOpp() {
        if (this.noMore) return;
        this.offset += this.limit;
        this._mainService.getEvents(this.offset, this.limit).subscribe(
            result => {
                if (result.status) {
                    let arradata = result.data;
                    this.oppCount = result.count;
                    this.opp_pages = Array(Math.ceil(this.oppCount / this.limit)).fill(1);
                    if (arradata) {
                        arradata.forEach((obj: Event, index: number) => {
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
}