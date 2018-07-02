import {Routes, RouterModule} from '@angular/router';
import { StudentProfile }  from './components/studentProfile.component';
import { StudentViewOpp }  from './components/studentViewOpp.component';

import { AuthGuard } from './security/auth.guard';
const mainRoutes: Routes = [
    {
        path: '',
        component: StudentProfile,
        canActivate: [AuthGuard],
        data: {
            header: 'student',
            footer: 'main',
            title: 'Strudent Profile'
        }
    },
    {
        path: 'oppertunity/:id',
        component: StudentViewOpp,
        canActivate: [AuthGuard],
        data: {
            header: 'student',
            footer: 'main',
            title: 'Strudent View Oppertunity'
        }
    }
];

export const studentRoute = RouterModule.forChild(mainRoutes);