import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CountryService } from '../services/country.service';
import { loadCountries, loadCountriesSuccess } from './country.action';

@Injectable()
export class CountryEffects {
  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCountries),
      mergeMap(() =>
        this.countryService.getAllCountries().pipe(
          map((countries) => loadCountriesSuccess({ countries })),
          catchError(() => of({ type: '[Country API] Countries Loaded Error' }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private countryService: CountryService
  ) {}
}
