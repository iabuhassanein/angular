"use strict";
var router_1 = require('@angular/router');
var studentProfile_component_1 = require('./components/studentProfile.component');
var studentViewOpp_component_1 = require('./components/studentViewOpp.component');
var auth_guard_1 = require('./security/auth.guard');
var mainRoutes = [
    {
        path: '',
        component: studentProfile_component_1.StudentProfile,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'student',
            footer: 'main',
            title: 'Strudent Profile'
        }
    },
    {
        path: 'oppertunity/:id',
        component: studentViewOpp_component_1.StudentViewOpp,
        canActivate: [auth_guard_1.AuthGuard],
        data: {
            header: 'student',
            footer: 'main',
            title: 'Strudent View Oppertunity'
        }
    }
];
exports.studentRoute = router_1.RouterModule.forChild(mainRoutes);
//# sourceMappingURL=student.routing.js.map