import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components 
import { ControlMessages } from './components/controlMessages.component';

// Pipes
import { ReadableBoolean } from '../functions/boolean.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [
        ControlMessages,
        ReadableBoolean
    ],
    exports: [
        ControlMessages,
        ReadableBoolean
    ]
})
export class AppCommonModule { }
