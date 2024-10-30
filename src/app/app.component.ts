import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppData } from '@appData';
import { NgxScrollToTopComponent } from '@components/ngx-scroll-to-top';
import { CopyrightComponent } from '@layouts/copyright/copyright.component';
import { NavbarComponent } from '@layouts/navbar/navbar.component';
import { HelperUtils } from '@utils/helper.utils';

@Component({
    selector: 'app-muslimlite',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        NavbarComponent,
        CopyrightComponent,
        NgxScrollToTopComponent,
        RouterModule,
    ],
    providers: [],
})
export class AppComponent implements OnInit, OnDestroy {
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
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
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(DOCUMENT) private document: Document
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.loadScript("G-PFPKWDB975");
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
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    isLoad = false;
    loadScript(id: string): void {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.isLoad && id) {
                const script = this.document.createElement('script');
                script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
                this.document.head.appendChild(script);

                const configScript = this.document.createElement('script');
                configScript.innerHTML = `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${id}');
                `;
                this.document.head.appendChild(configScript);
                this.isLoad = true;
            }
        }
    }
}
