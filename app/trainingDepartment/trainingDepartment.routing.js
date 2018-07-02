"use strict";
var router_1 = require('@angular/router');
var dashboard_component_1 = require('./components/dashboard.component');
var accounts_component_1 = require('./components/accounts.component');
var companies_component_1 = require('./components/companies.component');
var content_component_1 = require('./components/content.component');
var registration_component_1 = require('./components/registration.component');
var reports_component_1 = require('./components/reports.component');
var student_compoment_1 = require('./components/student.compoment');
var opportunity_compoment_1 = require('./components/opportunity.compoment');
var auth_guard_1 = require('./security/auth.guard');
var mainRoutes = [
    {
        path: '',
        component: dashboard_component_1.TrainingDepartmentDashboard,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Academic Department'
        }
    },
    {
        path: 'reports-statistics',
        component: reports_component_1.ReportStatisticsComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Academic Department'
        }
    },
    {
        path: 'registration',
        component: registration_component_1.RegistrationComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Academic Department'
        }
    },
    {
        path: 'companies-managment',
        component: companies_component_1.CompaniesComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Academic Department'
        }
    },
    {
        path: 'accounts-managment',
        component: accounts_component_1.AccountComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Academic Department'
        }
    },
    {
        path: 'content-announcement',
        component: content_component_1.ContentComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Academic Department'
        }
    },
    {
        path: 'student/:id',
        component: student_compoment_1.StudentComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Student'
        }
    },
    {
        path: 'oppertunity/:id',
        component: opportunity_compoment_1.OpportunityComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Oppertunity'
        }
    },
];
exports.TrainingDepartmentRoute = router_1.RouterModule.forChild(mainRoutes);
//# sourceMappingURL=trainingDepartment.routing.js.map