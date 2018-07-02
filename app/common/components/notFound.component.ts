import { Component } from '@angular/core';

@Component({
  selector: 'not-found',
  template: `
  <section class="header-section">
    <div class="container">
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
                        <li><a href="#">events</a></li>
                        <li><a href="#">contact us</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-2 col-xs-4">
                <div class="btn-reg pull-right">
                    <a href="#">logout</a>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="s_6">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="error404">
                        <div class="error">
                            <p>404</p>
                            <h3>Page Not Found</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `
})
export class NotFoundComponent  { 

}



