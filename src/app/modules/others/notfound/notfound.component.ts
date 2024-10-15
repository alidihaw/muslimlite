import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AppData } from '@appData';
import { HelperUtils } from '@utils/helper.utils';

@Component({
    selector: 'app-pages-notfound',
    templateUrl: './notfound.component.html',
    styleUrls: ['./notfound.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule, MatButtonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotfoundComponent implements OnInit, AfterViewInit, OnDestroy {
    constructor(public helperUtils: HelperUtils, public appData: AppData) {}

    ngOnInit() {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.appData.isFullPageValue = false;
        }, 250);
    }

    ngOnDestroy() {
        this.appData.isFullPageValue = false;
    }
}
