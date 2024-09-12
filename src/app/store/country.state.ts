import { Country } from "../models/country.model";

export interface CountryState {
    countries: Country[];
    error: any;
    showLoader: boolean
  }
  
  export const initialState: CountryState = {
    countries: [],
    error: null,
    showLoader: false
  };
  