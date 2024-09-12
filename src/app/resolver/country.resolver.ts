import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CountryService } from '../services/country.service';
import { CountryDetail } from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryResolver implements Resolve<CountryDetail | null> {
  constructor(private countryService: CountryService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<CountryDetail | null> {
    let countryName = route.paramMap.get('name');

    // Replace hyphens with spaces to match the original country name
    if (countryName) {
      countryName = countryName.replace(/-/g, ' '); // Convert hyphen back to space

      return this.countryService.getAllCountries();
    } else {
      return of(null);
    }
  }
}
