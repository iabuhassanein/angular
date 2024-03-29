import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule); 

// TODO
import { platformBrowser }    from '@angular/platform-browser';
// import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';

// console.log('Running AOT compiled');
// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);