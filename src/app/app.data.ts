import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '@models/toast.interface';
import { ColorState } from '@models/color.interface';

@Injectable({
    providedIn: 'root',
})
export class AppData {
    onUserChanges: BehaviorSubject<any>;
    onToastChanges: BehaviorSubject<any>;

    width = 480;
    constructor() {
        this.onToastChanges = new BehaviorSubject(false);
        this.onUserChanges = new BehaviorSubject(false);
    }

    private toastValue: Toast.Entity = {
        title: '',
        desc: '',
        severity: ColorState.primary,
    };
    get toast(): Toast.Entity {
        return this.toastValue;
    }
    set toast(value: Toast.Entity) {
        if (this.toastValue !== value) {
            this.toastValue = value;
        }
    }

    private projectValue = 'MuslimLite.id';
    get project(): string {
        return this.projectValue;
    }
    set project(value: string) {
        if (this.projectValue !== value) {
            this.projectValue = value;
        }
    }

    isFullPageValue = false;
    get isFullPage(): boolean {
        return this.isFullPageValue;
    }
    set isFullPage(value: boolean) {
        if (this.isFullPageValue !== value) {
            this.isFullPageValue = value;
        }
    }

    onIsMobileChanges: BehaviorSubject<any> = new BehaviorSubject(false);

    isMobileValue = false;
    get isMobile(): boolean {
        return this.isMobileValue;
    }
    set isMobile(value: boolean) {
        if (this.isMobileValue !== value) {
            this.isMobileValue = value;
        }
    }
}
