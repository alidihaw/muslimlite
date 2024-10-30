import { CommonModule, DOCUMENT, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { AppData } from '@appData';
import { HelperUtils } from '@utils/helper.utils';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, MatButtonModule, NgOptimizedImage],
    standalone: true,
})
export class NavbarComponent implements OnInit, AfterViewInit {
    deferredPrompt: any;

    constructor(public router: Router, public helperUtils: HelperUtils, public appData: AppData, private swUpdate: SwUpdate,
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(DOCUMENT) private document: Document) {
        if (isPlatformBrowser(this.platformId)) {
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                this.deferredPrompt = e;
            });

            if (window.matchMedia('(display-mode: standalone)').matches) {
                this.isInstalled = true;
            }
        }
    }
    
    isInstalled = false;
    install() {
        if (this.swUpdate.isEnabled) {
            this.deferredPrompt?.prompt();
        }
    }

    async ngOnInit() {
    }

    ngAfterViewInit(): void {
    }
}
