import { ApplicationConfig, importProvidersFrom, Provider, provideZoneChangeDetection } from '@angular/core';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, NoPreloading, PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PWAModule } from '@core/pwa';
import { CoreModule } from '@core/core.module';
import { IMAGE_CONFIG, IMAGE_LOADER, ImageLoaderConfig, PRECONNECT_CHECK_BLOCKLIST } from '@angular/common';

import { routes } from './app.routes';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};
const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);


export const appConfig: ApplicationConfig = {
  providers: 
  [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withPreloading(NoPreloading), inMemoryScrollingFeature), 
    provideClientHydration(),
    importProvidersFrom(
      PWAModule.forRoot(),
      CoreModule.forRoot(),
    ),
    provideImageConfig(),
    provideImageLoaded(),
    providePreconnect(),
  ]
};

export function provideImageConfig(): Provider {
  return {
      provide: IMAGE_CONFIG,
      useValue: {
          breakpoints: [380, 600, 1200],
          placeholderResolution: 50
      }
  };
}

export function provideImageLoaded(): Provider {
  return {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
          let url = config.src;
          if (!url?.includes("assets/")) {
              url = !config?.width ? `${config.src}` : `${config.src}&w=${config.width}`;
          }
          return url;
      },
  };
}

export function providePreconnect(): Provider {
  return {provide: PRECONNECT_CHECK_BLOCKLIST, useValue: ['https://cdn.alidihaw.com', 'https://firestore.googleapis.com']};
}