import { Injectable, AfterViewInit } from '@angular/core';
declare var $: any;

@Injectable()
export class AlertService implements AfterViewInit {
    ngAfterViewInit(): void {
        throw new Error('Method not implemented.');
    }

    notification(message: string, hide:boolean = true, duration: number = 5000, cmode: string = 'light') {
        $.iaoAlert({ msg: message, type: "notification", mode: cmode, autoHide: hide, alertTime: duration, fadeOnHover: false, position: "center", closeButton: true, closeOnClick: false });
    }

    success(message: string, duration = 5000, cmode: string = 'light') {
        $.iaoAlert({ msg: message, type: "success", mode: cmode, alertTime: duration, closeButton: false, closeOnClick: true });
    }

    error(message: string, duration = 5000, cmode: string = 'light') {
        $.iaoAlert({ msg: message, type: "error", mode: cmode, alertTime: duration, closeButton: false, closeOnClick: true });
    }

    warning(message: string, duration = 5000, cmode: string = 'light') {
        $.iaoAlert({ msg: message, type: "warning", mode: cmode, alertTime: duration, closeButton: false, closeOnClick: true });
    }

}