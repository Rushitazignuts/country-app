import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CountryService } from '../services/country.service';
import {
  loadCountries,
  loadCountriesSuccess,
  loadCountriesFailure,
  searchCountriesByName,
  searchCountriesByNameSuccess,
  searchCountriesByNameFailure,
  searchCountriesByCapital,
  searchCountriesByCapitalSuccess,
  searchCountriesByCapitalFailure,
} from './country.action';

@Injectable()
export class CountryEffects {
  // Effect to load all countries
  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCountries),
      mergeMap(() =>
        this.countryService.getAllCountries().pipe(
          map((countries) => loadCountriesSuccess({ countries })),
          catchError((error) => of(loadCountriesFailure({ error })))
        )
      )
    )
  );

  // Effect to search countries by name
  searchCountriesByName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchCountriesByName),
      mergeMap(({ searchTerm }) =>
        this.countryService.searchCountries(searchTerm, 'name').pipe(
          map((countries) => searchCountriesByNameSuccess({ countries })),
          catchError((error) => of(searchCountriesByNameFailure({ error })))
        )
      )
    )
  );

  // Effect to search countries by capital
  searchCountriesByCapital$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchCountriesByCapital),
      mergeMap(({ searchTerm }) =>
        this.countryService.searchCountries(searchTerm, 'capital').pipe(
          map((countries) => searchCountriesByCapitalSuccess({ countries })),
          catchError((error) => of(searchCountriesByCapitalFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private countryService: CountryService
  ) {}
}
