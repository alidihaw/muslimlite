import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { environment } from '@environments/environment';
import { HelperUtils } from '@utils/helper.utils';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-copyright',
    templateUrl: './copyright.component.html',
    styleUrls: ['./copyright.component.scss'],
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopyrightComponent {
    projectName = environment.appName;
    constructor(public helperUtils: HelperUtils) {}
}
