import { createReducer, on } from '@ngrx/store';
import {
  loadCountriesSuccess,
  searchCountriesByNameSuccess,
  searchCountriesByCapitalSuccess,
  searchCountriesByRegionSuccess,
  searchCountriesByCodeSuccess,
} from './country.action';
import { Country } from '../models/country.model';

export interface CountryState {
  countries: Country[];
  error: any;
}

export const initialState: CountryState = {
  countries: [],
  error: null,
};

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
