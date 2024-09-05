import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, shareReplay } from 'rxjs';
import { Country, CountryDetail } from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/all';
  private countries$: Observable<Country[]>;

  constructor(private http: HttpClient) {
    this.countries$ = this.http
      .get<Country[]>(this.apiUrl)
      .pipe(shareReplay(1));
  }

  // get country data
  getAllCountries(): Observable<Country[]> {
    return this.countries$;
  } 

  // get perticular data when open dialog
  getCountryByName(name: string): Observable<CountryDetail | any> {
    return this.countries$.pipe(
      map(
        (countries) =>
          countries.find((country) => country.name.common === name) || null
      )
    );
  }

  // get search data
  searchCountries(searchTerm: string): Observable<Country[]> {
    return this.countries$.pipe(
      map((countries) =>
        countries.filter((country) =>
          this.matchesSearchTerm(country, searchTerm)
        )
      )
    );
  }

  // function for search by name
  private matchesSearchTerm(country: Country, searchTerm: string): boolean {
    const term = searchTerm.toLowerCase();
    return (
      country.name.common && country.name.common.toLowerCase().includes(term) ||
      (country.capital && country.capital.some((capital: any) => capital.toLowerCase().includes(term)))

    );
  }
}
