import {Routes, RouterModule} from '@angular/router';
import { AcademicDashboard } from './components/dashboard.component';
import { ADOpportunity } from './components/ADOpportunity.component';
import { ViewStudent } from './components/viewStudent.component';
import { Reports } from './components/reports.component';

import { AuthGuard } from './security/auth.guard';

const mainRoutes: Routes = [
    {
        path: '',
        component: AcademicDashboard,
        canActivate: [AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Academic Department'
        }
    },
    {
        path: 'reports',
        component: Reports,
        canActivate: [AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Academic Department - Reports'
        }
    },
    {
        path: 'opportunity/:id',
        component: ADOpportunity,
        canActivate: [AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Academic Department View Opportunity'
        }
    },
    {
        path: 'student/:id',
        component: ViewStudent,
        canActivate: [AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Academic Department View Student'
        }
    },
];

export const AcademicRoute = RouterModule.forChild(mainRoutes);