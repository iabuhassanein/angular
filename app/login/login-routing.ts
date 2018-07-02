import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './components/login.component';

const mainRoutes: Routes = [
    {
        path: '',
        component: LoginComponent,
        data: {
            header: 'default',
            footer: 'main',
            title: 'Login'
        }
    },
];

export const loginRoute = RouterModule.forChild(mainRoutes);