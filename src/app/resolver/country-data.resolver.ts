import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Country } from '../models/country.model';
import { CountryService } from '../services/country.service';
import { loadCountries } from '../store/country.action';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountryDataResolver implements Resolve<Country[]> {
  constructor(private countryService: CountryService, private store: Store) {}

  resolve(): any {
    this.store.dispatch(loadCountries());
  }
}
