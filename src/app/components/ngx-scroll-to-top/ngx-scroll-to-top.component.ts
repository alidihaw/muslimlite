import { ChangeDetectionStrategy, Component, HostListener, Inject, Input, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'ngx-scroll-to-top',
    templateUrl: './ngx-scroll-to-top.component.html',
    styleUrls: ['./ngx-scroll-to-top.component.scss'],
    standalone: true,
    imports: [CommonModule],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxScrollToTopComponent implements OnInit {
    @Input() rightPosition = '26px';
    @Input() bottomPosition = '100px';

    isShow: boolean = false;

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        if (isPlatformBrowser(this.platformId)) {
            const me = this;
            if (window.pageYOffset > 100) {
                me.isShow = true;
            } else {
                me.isShow = false;
            }
        }
    }
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(DOCUMENT) private document: Document
    ) {}

    ngOnInit(): void {}

    scrollToTop() {
        window?.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }
}
