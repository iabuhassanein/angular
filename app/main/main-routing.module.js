"use strict";
var router_1 = require('@angular/router');
var index_component_1 = require('./components/index.component');
var contact_component_1 = require('./components/contact.component');
var content_component_1 = require('./components/content.component');
var events_component_1 = require('./components/events.component');
var eventSingle_component_1 = require('./components/eventSingle.component');
var mainRoutes = [
    {
        path: '',
        component: index_component_1.IndexPage
    },
    {
        path: 'logout',
        component: index_component_1.IndexPage
    },
    {
        path: 'events',
        component: events_component_1.EventsComponent
    },
    {
        path: 'event/:id',
        component: eventSingle_component_1.EventSingleComponent
    },
    {
        path: 'contact-us',
        component: contact_component_1.ContactComponent
    },
    {
        path: 'news/:id',
        component: content_component_1.ContentComponent
    }
];
exports.mainRoute = router_1.RouterModule.forChild(mainRoutes);
//# sourceMappingURL=main-routing.module.js.map