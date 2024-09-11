// interface for country data
export interface Country {
  name: any;
  continents: string[];
  capital: string | any;
  region: string;
  population: number;
  timezones: string[];
}

export interface CountryDetail extends Country {
  area: number;
  currencies: string[];
}

export type SearchByType = 'name' | 'capital' | 'region' | 'alpha';
