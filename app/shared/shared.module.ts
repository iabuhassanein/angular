import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
// Components 
import { HeaderComponent } from '../common/components/header.component';

// Services 
import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';

// Pipes
import { StringLimit } from './pipes/StringLimit.pipe';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [
        HeaderComponent,
        StringLimit
    ],
    exports: [
        HeaderComponent,
        StringLimit
    ],
    providers: [AlertService, AuthenticationService]
})
export class SharedModule { }
