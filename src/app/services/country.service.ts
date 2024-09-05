import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, shareReplay, catchError } from 'rxjs';
import { Country, CountryDetail } from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/all';
  private searchByNameApiUrl = 'https://restcountries.com/v3.1/name'; // API for search by name
  private searchByCapitalApiUrl = 'https://restcountries.com/v3.1/capital'; // API for search by capital

  constructor(private http: HttpClient) {}
  // Get all countries from cached API call
  getAllCountries() {
    return this.http.get<any>(this.apiUrl);
  }

  // Get specific country by name from the cached data
  getCountryByName(name: string): Observable<CountryDetail | any> {
    return this.http
      .get<any>(this.apiUrl)
      .pipe(
        map(
          (countries) =>
            countries.find((country: any) => country.name.common === name) ||
            null
        )
      );
  }

  // Search countries using different APIs (by name or capital)
  searchCountries(
    searchTerm: string,
    searchBy: 'name' | 'capital'
  ): Observable<Country[]> {
    if (!searchTerm.trim()) {
      return this.getAllCountries();
    }
    let searchUrl = '';

    if (searchBy === 'name') {
      searchUrl = `${this.searchByNameApiUrl}/${searchTerm}`;
    } else if (searchBy === 'capital') {
      searchUrl = `${this.searchByCapitalApiUrl}/${searchTerm}`;
    }

    return this.http.get<Country[]>(searchUrl).pipe(
      catchError((error) => {
        console.error('Search API failed', error);
        return of([]);
      })
    );
  }
}
