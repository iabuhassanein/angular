import { Component } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../../objects/event';

@Component({
    selector: 'event-calendar',
    template: `
    <div class="col-md-12" *ngIf="noMore">
        <img src="/assets/images/logoloader-txt.gif">
        <img src="/assets/images/logoloader-txt.gif">
        <img src="/assets/images/logoloader-txt.gif">
        <img src="/assets/images/logoloader-txt.gif">
        <img src="/assets/images/logoloader-txt.gif">
    </div>
    <li class="li-wedgit" *ngFor="let event of events">
        <h2 class="date-il"><span>{{ event.dateTime | date: 'dd' }}</span>{{ event.dateTime | date: 'MMM' }} {{ event.dateTime | date: 'yyyy' }}</h2>
        <p class="line-d"></p>
        <h3 class="txt-wed">{{ event.title }}
            <a routerLink="/event/{{event.id}}">Read More<span class="icon-right-arrow"></span></a>
        </h3>
    </li>
  `,
    providers: [EventService]
})
export class EventComponent {
    events: Event[] = null;
    noMore: boolean = true;
    constructor(private eventService: EventService) {
        this.eventService.getEvents().subscribe(result => {
            if(result.status) this.events = result.data;
            if (result.data.length > 0) this.noMore = false;
        });
    }
}

