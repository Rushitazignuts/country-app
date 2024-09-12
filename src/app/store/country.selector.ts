import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountryState } from './country.state';

export const selectCountryState =
  createFeatureSelector<CountryState>('countries');

export const selectAllCountries = createSelector(
  selectCountryState,
  (state: CountryState) => state.countries
);

export const selectCountryByName = (countryName: string) =>
  createSelector(selectAllCountries, (countries) =>
    countries.find((country) => country.name.common === countryName)
  );

export const selectFilteredCountries = (
  searchTerm: string,
  searchBy: 'name' | 'capital'
) =>
  createSelector(selectAllCountries, (countries: any) => {
    if (!searchTerm) {
      return countries;
    }
  });
