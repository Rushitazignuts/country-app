import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CountryService } from '../services/country.service';
import { CountryDetail } from '../models/country.model';
import { Store } from '@ngrx/store';
import { loadCountries } from '../store/country.action';

@Injectable({
  providedIn: 'root',
})
export class CountryResolver implements Resolve<CountryDetail | null> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot): Observable<CountryDetail | null> | any{
    let countryName = route.paramMap.get('name');

    // Replace hyphens with spaces to match the original country name
    if (countryName) {
      countryName = countryName.replace(/-/g, ' '); // Convert hyphen back to space
      this.store.dispatch(loadCountries());
    }
  }
}
