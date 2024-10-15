import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
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
    imports: [CommonModule, MatButtonModule],
    standalone: true,
})
export class NavbarComponent implements OnInit, AfterViewInit {
    deferredPrompt: any;

    constructor(public router: Router, public helperUtils: HelperUtils, public appData: AppData, private swUpdate: SwUpdate) {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
        });

        if (window.matchMedia('(display-mode: standalone)').matches) {
            this.isInstalled = true;
        }
    }
    
    isInstalled = false;
    install() {
        if (this.swUpdate.isEnabled) {
            console.log("this.deferredPrompt?", this.deferredPrompt);
            this.deferredPrompt?.prompt();
        }
    }

    async ngOnInit() {
        console.log("ngOnInit");
    }

    ngAfterViewInit(): void {
    }
}
