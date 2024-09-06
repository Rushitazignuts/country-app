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

// Search countries by region
export const searchCountriesByRegion = createAction(
    '[Country API] Search Countries By Region',
    props<{ searchTerm: string }>()
  );
  export const searchCountriesByRegionSuccess = createAction(
    '[Country API] Search Countries By Region Success',
    props<{ countries: Country[] }>()
  );
  export const searchCountriesByRegionFailure = createAction(
    '[Country API] Search Countries By Region Failure',
    props<{ error: any }>()
  );

  // Search countries by code
export const searchCountriesByCode = createAction(
    '[Country API] Search Countries By Alpha',
    props<{ searchTerm: string }>()
  );
  export const searchCountriesByCodeSuccess = createAction(
    '[Country API] Search Countries By Alpha Success',
    props<{ countries: Country[] }>()
  );
  export const searchCountriesByCodeFailure = createAction(
    '[Country API] Search Countries By Alpha Failure',
    props<{ error: any }>()
  );