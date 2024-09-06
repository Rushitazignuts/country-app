import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { Country, CountryDetail } from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}
  // Get all countries from cached API call
  getAllCountries() {
    const url = `${this.apiUrl}/all`;

    return this.http.get<any>(url);
  }

  // Get specific country by name from the cached data
  getCountryByName(name: string): any {
  }
  // Search countries using different APIs (by name or capital)
  searchCountries(
    searchTerm: string,
    searchBy: 'name' | 'capital' | 'region' | 'alpha'
  ): Observable<Country[]> {
    if (!searchTerm.trim()) {
      return this.getAllCountries(); // Return all countries if the search term is empty
    }

    let searchUrl = '';

    // Use switch to handle different searchBy options
    switch (searchBy) {
      case 'name':
        searchUrl = `${this.apiUrl}/name/${searchTerm}`;
        break;
      case 'capital':
        searchUrl = `${this.apiUrl}/capital/${searchTerm}`;
        break;
      case 'region':
        searchUrl = `${this.apiUrl}/region/${searchTerm}`;
        break;
      case 'alpha':
        searchUrl = `${this.apiUrl}/alpha/${searchTerm}`;
        break;
      default:
        console.error('Invalid searchBy option');
        return of([]);
    }

    return this.http.get<Country[]>(searchUrl).pipe(
      catchError((error) => {
        console.error('Search API failed', error);
        return of([]);
      })
    );
  }
}
