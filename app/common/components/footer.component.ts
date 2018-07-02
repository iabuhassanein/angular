import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { RouteDate } from '../../objects/routeData';
@Component({
    selector: 'footer',
    template: `
    <div [ngSwitch]="footerType"> 
    <section *ngSwitchCase="'main'" class="s_3">
        <div class="footer-bottom-three">
            <div class="container">
                <div class="new-footer-bd">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="logo-footer">
                                <a href="/"><img src="/assets/images/logo.png" alt="logo"></a>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="container-fluid">
                                <ul class="footer-menu">
                                    <li><a href="#">Terms of service</a></li>
                                    <li><a href="#">Privacy policy</a></li>
                                    <li><a href="#">Contacts</a></li>
                                    <li><a href="#">Support</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="social-footer">
                                <ul class="social-menu">
                                    <li class="face-h">
                                        <a href="#">
                                            <span class="new-txt new-txt-y">Facebook</span>
                                            <i class="fa fa-facebook" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li class="twi-h">
                                        <a href="#">
                                            <span class="new-txt">Twitter</span>
                                            <i class="fa fa-twitter" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li class="goo-h">
                                        <a href="#">
                                            <span class="new-txt">Google</span>
                                            <i class="fa fa-google-plus" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li class="inst-h">
                                        <a href="#">
                                            <span class="new-txt new-txt-y">Instagram</span>
                                            <i class="fa fa-instagram" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
    `
})

export class FooterComponent implements OnInit, OnDestroy {
    subscribtion: any;
    footerType: string = 'main';
    routeD: any;
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }
    ngOnInit() {
        this.subscribtion = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(event => {
                let currentRoute = this.route.root;

                while (currentRoute.children[0] !== undefined) {
                    currentRoute = currentRoute.children[0];
                    this.routeD = currentRoute.snapshot.data;
                }
                if (this.routeD.hasOwnProperty('footer')) {
                    // console.log(this.routeD['footer']);
                    this.footerType = this.routeD['footer'];
                }

            });
    }

    ngOnDestroy() {
        this.subscribtion.unsubscribe();
    }
}

