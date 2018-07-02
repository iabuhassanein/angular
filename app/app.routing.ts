import {Routes, RouterModule} from '@angular/router';

import { NotFoundComponent } from './common/components/notFound.component';
import { HeaderComponent } from './common/components/header.component';
import { AppComponent } from './app.component';

// // Guards 
// import { AuthGuard } from './shared/security/auth.guard';

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: 'app/main/main.module#MainModule',
        data: {
            header: 'main',
            footer: 'main',
            title: 'ismail'
        }
    },
    {
        path: 'company',
        loadChildren: 'app/company/company.module#CompanyModule'
    },
    {
        path: 'student',
        loadChildren: 'app/student/student.module#StudentModule'
    },
    {
        path: 'login',
        loadChildren: 'app/login/login.module#LoginModule'
    },
    {
        path: 'training-department',
        loadChildren: 'app/trainingDepartment/trainingDepartment.module#TrainingDepartmentModule'
    },
    {
        path: 'academic-department',
        loadChildren: 'app/academicDepartment/academicDepartment.module#AcademicModule'
    },
    {
        path: '**',
        component: NotFoundComponent,
        data: {
            header: 'default',
            footer: 'main',
            title: 'ismail'
        }
    }
];

export const routing = RouterModule.forRoot(appRoutes);