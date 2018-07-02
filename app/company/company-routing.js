"use strict";
var router_1 = require('@angular/router');
var companyDashBoard_component_1 = require('./components/companyDashBoard.component');
var companyRegister_component_1 = require('./components/companyRegister.component');
var newOppertunity_component_1 = require('./components/newOppertunity.component');
var newSupervisor_component_1 = require('./components/newSupervisor.component');
var viewOppertunity_component_1 = require('./components/viewOppertunity.component');
var profile_component_1 = require('./components/profile.component');
var student_component_1 = require('./components/student.component');
var auth_guard_1 = require('./security/auth.guard');
var mainRoutes = [
    {
        path: '',
        component: companyDashBoard_component_1.CompanyDashBoardComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'company',
            footer: 'main',
            title: 'Company'
        }
    },
    {
        path: 'dashboard',
        component: companyDashBoard_component_1.CompanyDashBoardComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'company',
            footer: 'main',
            title: 'Company'
        }
    },
    {
        path: 'register',
        component: companyRegister_component_1.CompanyRegisterComponent,
        data: {
            header: 'company',
            footer: 'main',
            title: 'Company'
        }
    },
    {
        path: 'profile',
        component: profile_component_1.ProfileComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'company',
            footer: 'main',
            title: 'Company'
        }
    },
    {
        path: 'new-oppertunity',
        component: newOppertunity_component_1.NewOppertunityComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'company',
            footer: 'main',
            title: 'Company'
        }
    },
    {
        path: 'oppertunity/:id',
        component: viewOppertunity_component_1.ViewOppertunityComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'company',
            footer: 'main',
            title: 'Oppertunity'
        }
    },
    {
        path: 'student/:id',
        component: student_component_1.ViewStudentC,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'company',
            footer: 'main',
            title: 'Student'
        }
    },
    {
        path: 'new-supervisor',
        component: newSupervisor_component_1.NewSupervisorComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'company',
            footer: 'main',
            title: 'Company'
        }
    },
];
exports.companyRoute = router_1.RouterModule.forChild(mainRoutes);
//# sourceMappingURL=company-routing.js.map