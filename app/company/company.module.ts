import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { companyRoute } from './company-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '../common/common.module';
import { SharedModule } from '../shared/shared.module';

// Components 
import { CompanyRegisterComponent } from './components/companyRegister.component';
import { CompanyDashBoardComponent } from './components/companyDashBoard.component';
import { NewOppertunityComponent } from './components/newOppertunity.component';
import { NewSupervisorComponent } from './components/newSupervisor.component';
import { ViewOppertunityComponent } from './components/viewOppertunity.component';
import { ProfileComponent } from './components/profile.component';
import { ViewStudentC } from './components/student.component';

// Guards
import { AuthGuard } from './security/auth.guard';

// import { requestOptionsProvider } from '../shared/lib/customBrowserXhr';

@NgModule({
    imports: [CommonModule,
        SharedModule,
        AppCommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        companyRoute
    ],
    declarations: [
        CompanyDashBoardComponent,
        CompanyRegisterComponent,
        NewOppertunityComponent,
        NewSupervisorComponent,
        ProfileComponent,
        ViewOppertunityComponent,
        ViewStudentC
    ],
    providers: [AuthGuard],
    bootstrap: [CompanyDashBoardComponent]
})
export class CompanyModule { }
