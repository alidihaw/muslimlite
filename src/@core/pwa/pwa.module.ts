import { ApplicationRef, isDevMode, ModuleWithProviders, NgModule } from '@angular/core';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { concat, first, interval } from 'rxjs';

@NgModule({
    imports: [
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerImmediately',
        }),
    ],
    exports: [],
})
export class PWAModule {
    constructor(private swUpdate: SwUpdate, appRef: ApplicationRef) {
        if (this.swUpdate.isEnabled) {
            const appIsStable$ = appRef.isStable.pipe(first((isStable) => isStable === true));
            const everySixHours$ = interval(6 * 60 * 60 * 1000);
            const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

            everySixHoursOnceAppIsStable$.subscribe(async () => {
                try {
                    const updateFound = await swUpdate.checkForUpdate();
                    console.log(updateFound ? 'A new version is available.' : 'Already on the latest version.');
                    if (updateFound) {
                        await this.swUpdate.activateUpdate();
                        document.location.reload();
                    }
                } catch (err) {
                    console.error('Failed to check for updates:', err);
                }
            });
            this.checkVersion();
        }
    }

    static forRoot(): ModuleWithProviders<PWAModule> {
        return {
            ngModule: PWAModule,
            providers: [],
        };
    }

    checkVersion() {
        this.swUpdate.versionUpdates.subscribe(async (evt) => {
            switch (evt.type) {
                case 'VERSION_DETECTED':
                    console.log(`Downloading new app version: ${evt.version.hash}`);
                    break;
                case 'VERSION_READY':
                    console.log(`Current app version: ${evt.currentVersion.hash}`);
                    console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
                    await this.swUpdate.activateUpdate();
                    document.location.reload();
                    break;
                case 'VERSION_INSTALLATION_FAILED':
                    console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
                    break;
            }
        });
    }
}
