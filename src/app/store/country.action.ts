import { createAction, props } from '@ngrx/store';
import { Country } from '../models/country.model';
export const selectCountry = createAction(
  '[Country] Select Country',
  props<{ countryName: string }>()
);
// Load all countries
export const loadCountries = createAction('[Country API] Load Countries');
export const loadCountriesSuccess = createAction(
  '[Country API] Load Countries Success',
  props<{ countries: Country[] }>()
);
export const loadCountriesFailure = createAction(
  '[Country API] Load Countries Failure',
  props<{ error: any }>()
);

// Search countries by name
export const searchCountriesByName = createAction(
  '[Country API] Search Countries By Name',
  props<{ searchTerm: string }>()
);
export const searchCountriesByNameSuccess = createAction(
  '[Country API] Search Countries By Name Success',
  props<{ countries: Country[] }>()
);
export const searchCountriesByNameFailure = createAction(
  '[Country API] Search Countries By Name Failure',
  props<{ error: any }>()
);

// Search countries by capital
export const searchCountriesByCapital = createAction(
  '[Country API] Search Countries By Capital',
  props<{ searchTerm: string }>()
);
export const searchCountriesByCapitalSuccess = createAction(
  '[Country API] Search Countries By Capital Success',
  props<{ countries: Country[] }>()
);
export const searchCountriesByCapitalFailure = createAction(
  '[Country API] Search Countries By Capital Failure',
  props<{ error: any }>()
);
