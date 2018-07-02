import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { studentRoute } from './student.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '../common/common.module';
import { SharedModule } from '../shared/shared.module';
import { OwlModule } from '../common/modules/owlCarousel/owlCarousel';

// Components 
import { StudentProfile } from './components/studentProfile.component';
import { StudentViewOpp } from './components/studentViewOpp.component';

// Services 
import { StudentService } from './services/student.service';

// Guards
import { AuthGuard } from './security/auth.guard';
import { AuthenticationService } from '../shared/services/authentication.service';

@NgModule({
    imports: [CommonModule,
        AppCommonModule,
        HttpModule,
        SharedModule,
        OwlModule,
        FormsModule,
        ReactiveFormsModule,
        studentRoute
        ],
    declarations: [
        StudentProfile,
        StudentViewOpp
    ],
    providers: [AuthGuard, StudentService, AuthenticationService],
    bootstrap: [StudentProfile]
})
export class StudentModule { }
