import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountryState } from './country.reducer';

export const selectCountryState =
  createFeatureSelector<CountryState>('countries');

export const selectAllCountries = createSelector(
  selectCountryState,
  (state: CountryState) => state.countries
);

// Selector to get a selected country by name
export const selectCountryByName = (countryName: string) =>
  createSelector(selectAllCountries, (countries) =>
    countries.find((country) => country.name.common === countryName)
  );

// Selector to filter countries based on a search term
export const selectFilteredCountries = (
  searchTerm: string,
  searchBy: 'name' | 'capital'
) =>
  createSelector(selectAllCountries, (countries: any) => {
    if (!searchTerm) {
      return countries;
    }
  });
