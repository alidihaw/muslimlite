import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { PWAModule } from '@core/pwa';
import { CoreModule } from '@core/core.module';
import { NgxScrollToTopComponent } from '@components/ngx-scroll-to-top';
import { NavbarComponent } from '@layouts/navbar/navbar.component';
import { CopyrightComponent } from '@layouts/copyright/copyright.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'muslimlite.id' }),
        BrowserAnimationsModule,
        AppRoutingModule,
        NavbarComponent,
        CopyrightComponent,

        PWAModule.forRoot(),
        CoreModule.forRoot(),

        NgxScrollToTopComponent,
        RouterModule,
    ],
    providers: [
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
