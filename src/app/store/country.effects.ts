import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
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
  searchCountriesByRegion,
  searchCountriesByRegionSuccess,
  searchCountriesByRegionFailure,
  searchCountriesByCode,
  searchCountriesByCodeSuccess,
  searchCountriesByCodeFailure,
  setLoadingSpinner,
} from './country.action';
import { Store } from '@ngrx/store';

@Injectable()
export class CountryEffects {
  // Effect to load all countries
  loadCountries$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadCountries),
    mergeMap(() =>
      this.countryService.getAllCountries().pipe(
        tap(() => this.store.dispatch(setLoadingSpinner({ status: false }))), 
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
      switchMap(({ searchTerm }) => {
        if (!searchTerm.trim()) {
          // If search term is empty, return all countries
          return this.countryService.getAllCountries().pipe(
            map((countries) => searchCountriesByNameSuccess({ countries })),
            catchError((error) => of(searchCountriesByNameFailure({ error })))
          );
        } else {
          // If search term is not empty, search by name
          return this.countryService.searchCountries(searchTerm, 'name').pipe(
            map((countries) => searchCountriesByNameSuccess({ countries })),
            catchError((error) => of(searchCountriesByNameFailure({ error })))
          );
        }
      })
    )
  );

  // Effect to search countries by capital
  searchCountriesByCapital$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchCountriesByCapital),
      switchMap(({ searchTerm }) => {
        if (!searchTerm.trim()) {
          return this.countryService.getAllCountries().pipe(
            map((countries) => searchCountriesByCapitalSuccess({ countries })),
            catchError((error) =>
              of(searchCountriesByCapitalFailure({ error }))
            )
          );
        } else {
          return this.countryService
            .searchCountries(searchTerm, 'capital')
            .pipe(
              map((countries) =>
                searchCountriesByCapitalSuccess({ countries })
              ),
              catchError((error) =>
                of(searchCountriesByCapitalFailure({ error }))
              )
            );
        }
      })
    )
  );

  searchCountriesByRegion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchCountriesByRegion),
      switchMap(({ searchTerm }) => {
        if (!searchTerm.trim()) {
          return this.countryService.getAllCountries().pipe(
            map((countries) => searchCountriesByRegionSuccess({ countries })),
            catchError((error) => of(searchCountriesByRegionFailure({ error })))
          );
        } else {
          return this.countryService.searchCountries(searchTerm, 'region').pipe(
            map((countries) => searchCountriesByRegionSuccess({ countries })),
            catchError((error) => of(searchCountriesByRegionFailure({ error })))
          );
        }
      })
    )
  );

  searchCountriesByCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchCountriesByCode),
      switchMap(({ searchTerm }) => {
        if (!searchTerm.trim()) {
          return this.countryService.getAllCountries().pipe(
            map((countries) => searchCountriesByCodeSuccess({ countries })),
            catchError((error) => of(searchCountriesByCodeFailure({ error })))
          );
        } else {
          return this.countryService.searchCountries(searchTerm, 'alpha').pipe(
            map((countries) => searchCountriesByCodeSuccess({ countries })),
            catchError((error) => of(searchCountriesByCodeFailure({ error })))
          );
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private countryService: CountryService,
    private store: Store
  ) {}
}
