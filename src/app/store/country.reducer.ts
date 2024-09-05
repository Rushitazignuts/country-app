import { createReducer, on } from '@ngrx/store';
import { loadCountriesSuccess, selectCountry } from './country.action';
import { Country } from '../models/country.model';

export interface CountryState {
  countries: Country[];
  selectedCountry: Country | null;
}

export const initialState: CountryState = {
  countries: [],
  selectedCountry: null,
};

export const countryReducer = createReducer(
  initialState,
  on(loadCountriesSuccess, (state, { countries }) => ({
    ...state,
    countries,
  })),
  on(selectCountry, (state, { countryName }) => ({
    ...state,
    selectedCountry:
      state.countries.find((country) => country.name === countryName) || null,
  }))
);
