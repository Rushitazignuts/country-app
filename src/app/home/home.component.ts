import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Country, SearchByType } from '../models/country.model';
import {
  selectCountry,
  searchCountriesByName,
  searchCountriesByCapital,
  searchCountriesByRegion,
  searchCountriesByCode,
  loadCountries,
} from '../store/country.action';
import {
  selectAllCountries,
  selectCountryByName,
} from '../store/country.selector';
import { CountryDetailComponent } from '../country-detail/country-detail.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTableModule,
    MatRadioModule,
    MatSelectModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  disabled: boolean = false;
  checked: boolean = false;
  isTableView: boolean = false;
  countries$: Observable<Country[]> = this.store.select(selectAllCountries);
  filteredCountries$: Observable<Country[] | any> = this.countries$;
  searchTerm: string = '';
  displayedColumns: string[] = [
    'name',
    'region',
    'capital',
    'continents',
    'population',
  ];
  searchBy: SearchByType = 'name';
  routeSub: any;
  isDialogOpen: boolean = false;
  private dialogRef: MatDialogRef<CountryDetailComponent> | null = null;
  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.data.subscribe((data) => {
    //   // this.countries$ = data['countries'];
    // });

    this.routeSub = this.route.paramMap
      .pipe(
        switchMap((params: Params) => {
          const countryNameWithHyphen = params['get']('name');
          if (countryNameWithHyphen) {
            const countryName = countryNameWithHyphen.replace(/-/g, ' ');
            return this.store.select(selectCountryByName(countryName));
          }
          return [];
        })
      )
      .subscribe((country) => {
        if (country) {
          this.openDialog(country);
        }
      });
  }
  openDialog(country: Country): void {
    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(CountryDetailComponent, {
        width: '400px',
        data: { country },
      });
      // Handle dialog close event
      this.dialogRef.afterClosed().subscribe(() => {
        this.dialogRef = null;
        this.router.navigate(['']);
      });
    }
  }
  // Open country detail dialog when clicking on a card
  openCountryDetailDialog(country: Country): void {
    const countryNameWithHyphen = country.name.common.replace(/ /g, '-');
    this.store.dispatch(selectCountry({ countryName: country.name.common }));
    this.router.navigate(['/country', countryNameWithHyphen]);
  }
  // Trigger search
  onSearch(): any {
    
    switch (this.searchBy) {
      case 'name':
        this.store.dispatch(
          searchCountriesByName({ searchTerm: this.searchTerm })
        );
        break;
      case 'capital':
        this.store.dispatch(
          searchCountriesByCapital({ searchTerm: this.searchTerm })
        );
        break;
      case 'region':
        this.store.dispatch(
          searchCountriesByRegion({ searchTerm: this.searchTerm })
        );
        break;
      case 'alpha':
        this.store.dispatch(
          searchCountriesByCode({ searchTerm: this.searchTerm })
        );
        break;
      default:
        break;
    }
  }
  ngOnDestroy(): void {
    // Clean up the subscription to avoid memory leaks
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
