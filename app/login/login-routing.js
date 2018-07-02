"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./components/login.component');
var mainRoutes = [
    {
        path: '',
        component: login_component_1.LoginComponent,
        data: {
            header: 'default',
            footer: 'main',
            title: 'Login'
        }
    },
];
exports.loginRoute = router_1.RouterModule.forChild(mainRoutes);
//# sourceMappingURL=login-routing.js.map