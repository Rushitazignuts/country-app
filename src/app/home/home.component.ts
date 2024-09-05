import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Country } from '../models/country.model';
import { loadCountries, selectCountry } from '../store/country.action';
import { CountryDetailComponent } from '../country-detail/country-detail.component';
import { CountryService } from '../services/country.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { selectAllCountries } from '../store/country.selector';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  countries$: Observable<Country[]> = this.countryService.getAllCountries();
  filteredCountries$: Observable<Country[]> = this.countries$;
  searchTerm: string = '';

  constructor(
    private store: Store,
    private countryService: CountryService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Load countries from store dispatch
    this.store.dispatch(loadCountries());
    // this.countries$ = this.store.select(selectAllCountries);

    //  filtered countries
    this.filteredCountries$ = this.countries$;

    // Handle search
    this.filteredCountries$ = this.countryService.searchCountries(
      this.searchTerm
      );
  }

  // open details dialog
  openCountryDetail(country: Country): void {
    // Replace spaces with hyphens in the country name
    const countryNameWithHyphen = country.name.common.replace(/ /g, '-');

    this.store.dispatch(selectCountry({ countryName: country.name.common }));

    // Navigate to the route
    this.router.navigate(['/country', countryNameWithHyphen]).then(() => {
      const dialogRef = this.dialog.open(CountryDetailComponent, {
        width: '400px',
        data: { country },
      });

      // After the dialog is closed, navigate to /
      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate([''], {
          queryParams: {},
          queryParamsHandling: 'merge', // Merge to prevent overriding existing params
        });
      });
    });
  }
  //  search function
  onSearch(): void {
    // Filter countries based on search term
    this.filteredCountries$ = this.countryService.searchCountries(
      this.searchTerm
    );
  }
}
