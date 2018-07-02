import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './common/components/notFound.component';
// // Guards 
// import { AuthGuard } from './shared/security/auth.guard';
var appRoutes = [
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
export var routing = RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map