import { Routes, RouterModule } from '@angular/router';
import { TrainingDepartmentDashboard } from './components/dashboard.component';
import { AccountComponent } from './components/accounts.component';
import { CompaniesComponent } from './components/companies.component';
import { ContentComponent } from './components/content.component';
import { RegistrationComponent } from './components/registration.component';
import { ReportStatisticsComponent } from './components/reports.component';
import { StudentComponent } from './components/student.compoment';
import { OpportunityComponent } from './components/opportunity.compoment';

import { AuthGuard } from './security/auth.guard';

const mainRoutes: Routes = [
    {
        path: '',
        component: TrainingDepartmentDashboard,
        canActivate: [AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Academic Department'
        }
    },
    {
        path: 'reports-statistics',
        component: ReportStatisticsComponent,
        canActivate: [AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Academic Department'
        }
    },
    {
        path: 'registration',
        component: RegistrationComponent,
        canActivate: [AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Academic Department'
        }
    },
    {
        path: 'companies-managment',
        component: CompaniesComponent,
        canActivate: [AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Academic Department'
        }
    },
    {
        path: 'accounts-managment',
        component: AccountComponent,
        canActivate: [AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Academic Department'
        }
    },
    {
        path: 'content-announcement',
        component: ContentComponent,
        canActivate: [AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Academic Department'
        }
    },
    {
        path: 'student/:id',
        component: StudentComponent,
        canActivate: [AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Student'
        }
    },
    {
        path: 'oppertunity/:id',
        component: OpportunityComponent,
        canActivate: [AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Oppertunity'
        }
    },
];

export const TrainingDepartmentRoute = RouterModule.forChild(mainRoutes);