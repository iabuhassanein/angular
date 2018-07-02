import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '../common/common.module';
import { mainRoute } from './main-routing.module';
// import { OwlModule } from '../common/modules/owlCarousel/owlCarousel';
import { OwlModule } from 'ngx-owl-carousel';
import { SharedModule } from '../shared/shared.module';

// Components 
import { NewsComponent } from './components/news.component';
import { EventComponent } from './components/event.component';
import { IndexPage } from './components/index.component';
import { ContactComponent }  from './components/contact.component';
import { ContentComponent }  from './components/content.component';
import { EventsComponent }  from './components/events.component';
import { EventSingleComponent }  from './components/eventSingle.component';

@NgModule({
    imports: [
        CommonModule,
        AppCommonModule,
        SharedModule,
        HttpModule,
        OwlModule,
        FormsModule,
        ReactiveFormsModule,
        mainRoute
    ],
    declarations: [IndexPage, NewsComponent, EventComponent, ContactComponent, ContentComponent, EventsComponent, EventSingleComponent],
    bootstrap: [IndexPage]
})
export class MainModule { }
