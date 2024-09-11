import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { countryReducer } from './store/country.reducer';
import { CountryEffects } from './store/country.effects';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { sharedReducer } from './store/shared/shared.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({
       countries: countryReducer, 
      shared: sharedReducer}),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([CountryEffects]),
    provideHttpClient(),
    importProvidersFrom(
      MatCardModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
    ),
  ],
};
