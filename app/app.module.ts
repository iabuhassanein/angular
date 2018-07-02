import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';

import { AuthGuard } from './shared/security/auth.guard';
import { AuthenticationService } from './shared/services/authentication.service';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './common/components/notFound.component';
// import { HeaderComponent } from './common/components/header.component';
import { FooterComponent } from './common/components/footer.component';


// Services 
// import { AlertService } from './shared/services/alert.service';

import { routing } from './app.routing';

@NgModule({
  imports: [BrowserModule, routing, SharedModule],
  declarations: [AppComponent, NotFoundComponent, FooterComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
