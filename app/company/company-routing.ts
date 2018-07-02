import {Routes, RouterModule} from '@angular/router';
import { CompanyDashBoardComponent }  from './components/companyDashBoard.component'; 
import { CompanyRegisterComponent }  from './components/companyRegister.component';
import { NewOppertunityComponent } from './components/newOppertunity.component';
import { NewSupervisorComponent } from './components/newSupervisor.component';
import { ViewOppertunityComponent } from './components/viewOppertunity.component';
import { ProfileComponent } from './components/profile.component';
import { ViewStudentC } from './components/student.component';

import { AuthGuard } from './security/auth.guard';
const mainRoutes: Routes = [
    {
        path: '',
        component: CompanyDashBoardComponent,
        canActivate: [AuthGuard],
        data: {
            header: 'company',
            footer: 'main',
            title: 'Company'
        }
    },
    {
        path: 'dashboard',
        component: CompanyDashBoardComponent,
        canActivate: [AuthGuard],
        data: {
            header: 'company',
            footer: 'main',
            title: 'Company'
        }
    },
    {
        path: 'register',
        component: CompanyRegisterComponent,
        data: {
            header: 'company',
            footer: 'main',
            title: 'Company'
        }
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: {
            header: 'company',
            footer: 'main',
            title: 'Company'
        }
    },
    {
        path: 'new-oppertunity',
        component: NewOppertunityComponent,
        canActivate: [AuthGuard],
        data: {
            header: 'company',
            footer: 'main',
            title: 'Company'
        }
    },
    {
        path: 'oppertunity/:id',
        component: ViewOppertunityComponent,
        canActivate: [AuthGuard],
        data: {
            header: 'company',
            footer: 'main',
            title: 'Oppertunity'
        }
    },
    {
        path: 'student/:id',
        component: ViewStudentC,
        canActivate: [AuthGuard],
        data: {
            header: 'company',
            footer: 'main',
            title: 'Student'
        }
    },
    {
        path: 'new-supervisor',
        component: NewSupervisorComponent,
        canActivate: [AuthGuard],
        data: {
            header: 'company',
            footer: 'main',
            title: 'Company'
        }
    },
];

export const companyRoute = RouterModule.forChild(mainRoutes);