"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var event_service_1 = require('../services/event.service');
var EventComponent = (function () {
    function EventComponent(eventService) {
        var _this = this;
        this.eventService = eventService;
        this.baseURL = 'http://kfupm.mmed.email:8080';
        this.eventService.getEvents().subscribe(function (events) {
            // console.log(news);
            _this.events = events;
        });
    }
    EventComponent.prototype.getEventDay = function (date) {
        var date_str = date.toString();
        if (date_str.length == 14) {
            var day = date_str.substring(6, 8);
            return day;
        }
        else {
            return '';
        }
    };
    EventComponent.prototype.getEventMonth = function (date) {
        var date_str = date.toString();
        if (date_str.length == 14) {
            var month = getMonthString(parseInt(date_str.substring(4, 6)));
            return month;
        }
        else {
            return '';
        }
    };
    EventComponent.prototype.getEventYear = function (date) {
        var date_str = date.toString();
        if (date_str.length == 14) {
            var year = date_str.substring(0, 4);
            return year;
        }
        else {
            return '';
        }
    };
    EventComponent = __decorate([
        core_1.Component({
            selector: 'event-calendar',
            template: "\n    <li class=\"li-wedgit\" *ngFor=\"let event of events\">\n        <h2 class=\"date-il\"><span>{{ getEventDay(event.dateTime) }}</span>{{ getEventMonth(event.dateTime) }} {{ getEventYear(event.dateTime) }}</h2>\n        <p class=\"line-d\"></p>\n        <h3 class=\"txt-wed\">{{ event.title }}\n            <a routerLink=\"/event/{{event.id}}\">Read More<span class=\"icon-right-arrow\"></span></a>\n        </h3>\n    </li>\n  ",
            providers: [event_service_1.EventService]
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService])
    ], EventComponent);
    return EventComponent;
}());
exports.EventComponent = EventComponent;
function getMonthString(month) {
    switch (month) {
        case 1:
            return 'January';
        case 2:
            return 'February';
        case 3:
            return 'March';
        case 4:
            return 'April';
        case 5:
            return 'May';
        case 6:
            return 'June';
        case 7:
            return 'July';
        case 8:
            return 'August';
        case 9:
            return 'September';
        case 10:
            return 'October';
        case 11:
            return 'November';
        case 12:
            return 'December';
        default:
            return '';
    }
}
//# sourceMappingURL=event.component.js.map