import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Country } from '../models/country.model';
import { CountryService } from '../services/country.service';
import { loadCountries } from '../store/country.action';

@Injectable({
  providedIn: 'root',
})
export class CountryDataResolver implements Resolve<Country[]> {
  constructor(private store: Store) {}

  resolve(): any {
    this.store.dispatch(loadCountries());
  }
}
