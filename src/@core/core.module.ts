import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SplashScreenModule } from './splash-screen/splash-screen.module';

@NgModule({
    imports: [
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,

        SplashScreenModule,
    ],
    exports: [ReactiveFormsModule, FormsModule],
})
export class CoreModule {
    constructor() {
        this.initData();
    }

    async initData() {}

    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [
                {
                    provide: LOCALE_ID,
                    useValue: 'en',
                },
            ],
        };
    }
}
