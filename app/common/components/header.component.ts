import { Component, Input } from '@angular/core';
@Component({
    selector: 'ng-header',
    template: `
        <div class="header-1">
            <div class="col-md-5 col-xs-8">
                <div class="logo">
                    <a routerLink="/"><img src="/assets/images/logo.png" alt="logo"></a>
                </div>
            </div>
            <div class="col-md-5 hidden-sm hidden-xs">
                <div class="container-fluid">
                    <ul class="head-menu2 nav navbar-nav">
                        <li><a routerLink="/">home</a></li>
                        <li><a routerLink="/events">events</a></li>
                        <li><a routerLink="/contact-us">contact us</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-2 col-xs-4">
                <div class="btn-reg pull-right">
                    <a routerLink="{{ (isLoggingIn)?'/logout':'/login' }}">{{ (isLoggingIn)?'logout':'login' }}</a>
                </div>
            </div>
        </div>
    `
})

export class HeaderComponent {
    @Input() isLoggingIn: boolean = false;
}