import {Routes, RouterModule} from '@angular/router';
import { IndexPage }  from './components/index.component';
import { ContactComponent }  from './components/contact.component';
import { ContentComponent }  from './components/content.component';
import { EventsComponent }  from './components/events.component';
import { EventSingleComponent }  from './components/eventSingle.component';

const mainRoutes: Routes = [
    {
        path: '',
        component: IndexPage
    },
    {
        path: 'logout',
        component: IndexPage
    },
    {
        path: 'events',
        component: EventsComponent
    },
    {
        path: 'event/:id',
        component: EventSingleComponent
    },
    {
        path: 'contact-us',
        component: ContactComponent
    },
    {
        path: 'news/:id',
        component: ContentComponent
    }
];

export const mainRoute = RouterModule.forChild(mainRoutes);