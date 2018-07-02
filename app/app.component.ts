import { Component } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
@Component({
  selector: 'kfump-app',
  template: `
    <div class="fakeloader" [class.hide_loader]="!loading"><div class="fl spinner1"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>
    
    <router-outlet></router-outlet>
    <footer></footer>
  `,
})
export class AppComponent {
  loading: boolean = true;

  constructor(private router: Router) {

    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }
}
