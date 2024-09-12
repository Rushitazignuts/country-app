import { createReducer, on } from '@ngrx/store';
import {
  loadCountriesSuccess,
  searchCountriesByNameSuccess,
  searchCountriesByCapitalSuccess,
  searchCountriesByRegionSuccess,
  searchCountriesByCodeSuccess,
  loadCountries,
  loadCountriesFailure,
  searchCountriesByName,
  searchCountriesByNameFailure,
  searchCountriesByCapital,
  searchCountriesByCapitalFailure,
  searchCountriesByRegion,
  searchCountriesByRegionFailure,
  searchCountriesByCode,
  searchCountriesByCodeFailure,
} from './country.action';
import { initialState } from './country.state';


export const countryReducer = createReducer(
  initialState,
  // Load all countries
  on(loadCountries, (state) => ({
    ...state,
    showLoader: true,
    error: null,
  })),
  on(loadCountriesSuccess, (state, { countries }) => ({
    ...state,
    countries: [...countries],
    showLoader: false,
    error: null,
  })),

  // Failure state for showLoader countries
  on(loadCountriesFailure, (state, { error }) => ({
    ...state,
    showLoader: true,
    error,
  })),

  // Search countries by name
  on(searchCountriesByName, (state) => ({
    ...state,
    showLoader: true,
    error: null,
  })),

  // Success state for searching countries by name
  on(searchCountriesByNameSuccess, (state, { countries }) => ({
    ...state,
    countries: [...countries],
    showLoader: false,
    error: null,
  })),

  // Failure state for searching countries by name
  on(searchCountriesByNameFailure, (state, { error }) => ({
    ...state,
    showLoader: true,
    error,
  })),
  
  on(searchCountriesByCapital, (state) => ({
    ...state,
    showLoader: true,
    error: null,
  })),

  // Success state for searching countries by capital
  on(searchCountriesByCapitalSuccess, (state, { countries }) => ({
    ...state,
    countries: [...countries],
    showLoader: false,
    error: null,
  })),

  // Failure state for searching countries by capital
  on(searchCountriesByCapitalFailure, (state, { error }) => ({
    ...state,
    showLoader: true,
    error,
  })),

  // Search countries by region
  on(searchCountriesByRegion, (state) => ({
    ...state,
    showLoader: true,
    error: null,
  })),

  // Success state for searching countries by region
  on(searchCountriesByRegionSuccess, (state, { countries }) => ({
    ...state,
    countries: [...countries],
    showLoader: false,
    error: null,
  })),

  // Failure state for searching countries by region
  on(searchCountriesByRegionFailure, (state, { error }) => ({
    ...state,
    showLoader: true,
    error,
  })),
  
  // Search countries by code
  on(searchCountriesByCode, (state) => ({
    ...state,
    showLoader: true,
    error: null,
  })),

  // Success state for searching countries by code
  on(searchCountriesByCodeSuccess, (state, { countries }) => ({
    ...state,
    countries: [...countries],
    showLoader: false,
    error: null,
  })),

  // Failure state for searching countries by code
  on(searchCountriesByCodeFailure, (state, { error }) => ({
    ...state,
    showLoader: true,
    error,
  }))
);
