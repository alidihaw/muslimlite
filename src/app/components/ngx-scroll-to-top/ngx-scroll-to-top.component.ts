import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

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
        const me = this;
        if (window.pageYOffset > 100) {
            me.isShow = true;
        } else {
            me.isShow = false;
        }
    }
    constructor() {}

    ngOnInit(): void {}

    scrollToTop() {
        window?.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }
}
