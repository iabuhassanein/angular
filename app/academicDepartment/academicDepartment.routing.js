"use strict";
var router_1 = require('@angular/router');
var dashboard_component_1 = require('./components/dashboard.component');
var ADOpportunity_component_1 = require('./components/ADOpportunity.component');
var viewStudent_component_1 = require('./components/viewStudent.component');
var reports_component_1 = require('./components/reports.component');
var auth_guard_1 = require('./security/auth.guard');
var mainRoutes = [
    {
        path: '',
        component: dashboard_component_1.AcademicDashboard,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Academic Department'
        }
    },
    {
        path: 'reports',
        component: reports_component_1.Reports,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Academic Department - Reports'
        }
    },
    {
        path: 'opportunity/:id',
        component: ADOpportunity_component_1.ADOpportunity,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Academic Department View Opportunity'
        }
    },
    {
        path: 'student/:id',
        component: viewStudent_component_1.ViewStudent,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'default',
            footer: 'main',
            title: 'Academic Department View Student'
        }
    },
];
exports.AcademicRoute = router_1.RouterModule.forChild(mainRoutes);
//# sourceMappingURL=academicDepartment.routing.js.map