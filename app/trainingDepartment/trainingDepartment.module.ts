import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { TrainingDepartmentRoute } from './trainingDepartment.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '../common/common.module';

// Components 
import { TrainingDepartmentDashboard } from './components/dashboard.component';
import { AccountComponent } from './components/accounts.component';
import { CompaniesComponent } from './components/companies.component';
import { ContentComponent } from './components/content.component';
import { RegistrationComponent } from './components/registration.component';
import { ReportStatisticsComponent } from './components/reports.component';
import { SharedModule } from '../shared/shared.module';
import { StudentComponent } from './components/student.compoment';
import { OpportunityComponent } from './components/opportunity.compoment';

// Services
import { TrainingDepartmentService } from './services/trainingDepartment.service';

// Guards
import { AuthGuard } from './security/auth.guard';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AppCommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        TrainingDepartmentRoute],
    declarations: [
        TrainingDepartmentDashboard,
        AccountComponent,
        CompaniesComponent,
        ContentComponent,
        RegistrationComponent,
        ReportStatisticsComponent,
        StudentComponent,
        OpportunityComponent
    ],
    bootstrap: [TrainingDepartmentDashboard],
    providers: [AuthGuard, TrainingDepartmentService]
})
export class TrainingDepartmentModule { }
