import { Country } from "../models/country.model";

export interface CountryState {
    countries: Country[];
    error: any;
  }
  
  export const initialState: CountryState = {
    countries: [],
    error: null,
  };
  