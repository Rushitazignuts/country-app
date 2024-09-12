// interface for country data
export interface Country {
  name: Name;
  continents: string[];
  capital: string;
  region: string;
  population: number;
  timezones: string[];
  cca2: string
}
export interface Name {
  common: string
}
export interface CountryDetail extends Country {
  area: number;
  currencies: string[];
}

export type SearchByType = 'name' | 'capital' | 'region' | 'alpha';
