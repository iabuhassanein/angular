import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AcademicRoute } from './academicDepartment.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '../common/common.module';

// Components 
import { AcademicDashboard } from './components/dashboard.component';
import { Reports } from './components/reports.component';
import { ViewStudent } from './components/viewStudent.component';
import { ADOpportunity } from './components/ADOpportunity.component';
import { SharedModule } from '../shared/shared.module';

// Services
import { AcademicDepartmentService } from './Services/academicDepartment.service';

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
        AcademicRoute],
    declarations: [
        AcademicDashboard,
        ADOpportunity,
        Reports,
        ViewStudent
    ],
    bootstrap: [AcademicDashboard],
    providers: [AuthGuard,AcademicDepartmentService]
})
export class AcademicModule { }
