import { createReducer, on } from '@ngrx/store';
import {
  loadCountriesSuccess,
  searchCountriesByNameSuccess,
  searchCountriesByCapitalSuccess,
  searchCountriesByRegionSuccess,
  searchCountriesByCodeSuccess,
} from './country.action';
import { initialState } from './country.state';


export const countryReducer = createReducer(
  initialState,
  // Load all countries
  on(loadCountriesSuccess, (state, { countries }) => ({
    ...state,
    countries: [...countries],
    error: null,
  })),
  // Search countries by name
  on(searchCountriesByNameSuccess, (state, { countries }) => ({
    ...state,
    countries: [...countries],
    error: null,
  })),
  // Search countries by capital
  on(searchCountriesByCapitalSuccess, (state, { countries }) => ({
    ...state,
    countries: [...countries],
    error: null,
  })),
  // Search countries by region
  on(searchCountriesByRegionSuccess, (state, { countries }) => ({
    ...state,
    countries: [...countries],
    error: null,
  })),
  // Search countries by code
  on(searchCountriesByCodeSuccess, (state, { countries }) => ({
    ...state,
    countries: [...countries],
    error: null,
  }))
);
