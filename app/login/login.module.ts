import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { loginRoute } from './login-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '../common/common.module';

// Components 
import { LoginComponent } from './components/login.component';
import { SharedModule } from '../shared/shared.module';

// Guards
// import { AuthGuard } from '../shared/security/auth.guard';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AppCommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        loginRoute],
    declarations: [
        LoginComponent,
    ],
    bootstrap: [LoginComponent]
})
export class LoginModule { }
