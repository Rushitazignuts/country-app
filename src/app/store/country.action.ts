import { createAction, props } from '@ngrx/store';
import { Country } from '../models/country.model';

export const loadCountries = createAction('[Country] Load Countries');
export const loadCountriesSuccess = createAction(
  '[Country] Load Countries Success',
  props<{ countries: Country[] }>()
);
export const selectCountry = createAction(
  '[Country] Select Country',
  props<{ countryName: string }>()
);
