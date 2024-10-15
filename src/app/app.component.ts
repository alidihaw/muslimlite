import { Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AppData } from '@appData';
import { HelperUtils } from '@utils/helper.utils';

@Component({
    selector: 'app-muslimlite',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [],
})
export class AppComponent implements OnInit, OnDestroy {
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        console.log('ON RESIZE');
        if (event.target.innerWidth <= 640) {
            this.appData.isMobile = true;
        } else {
            this.appData.isMobile = false;
        }
        this.appData.onIsMobileChanges.next(this.appData.isMobile);
    }

    constructor(
        public appData: AppData,
        private helperUtils: HelperUtils,
    ) {
        if (window.innerWidth <= 480) {
            this.appData.width = window.innerWidth;
        }
        if (window.innerWidth <= 640) {
            this.appData.isMobile = true;
        } else {
            this.appData.isMobile = false;
        }
        this.appData.onIsMobileChanges.next(this.appData.isMobile);
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
}
