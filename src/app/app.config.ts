import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    providePrimeNG({
      theme: {
          preset: Aura,
          options: {
            darkModeSelector: '.my-app-dark',
            cssLayer: {
              name: 'primeng',
              order: 'tailwind-base, primeng, tailwind-utilities'
            }
        }
      }
  })
  ]
};
