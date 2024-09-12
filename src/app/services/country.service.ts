import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, throwError } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}
  // Get all countries from cached API call
  getAllCountries() {
    const url = `${this.apiUrl}/all`;

    return this.http.get<any>(url).pipe(
      catchError((error) => {
        return throwError(() => console.log("error", error));
      })); 
   }

  // Search countries using different APIs (by name or capital)
  searchCountries(
    searchTerm: string,
    searchBy: 'name' | 'capital' | 'region' | 'alpha'
  ): Observable<Country[]> {
  
    let searchUrl = '';
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
        return throwError(() => console.log("error", error));
      })
    );
  }
}
