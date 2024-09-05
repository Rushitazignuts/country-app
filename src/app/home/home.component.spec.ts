import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Store, StoreModule } from '@ngrx/store';
import { CountryService } from '../services/country.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { loadCountries, selectCountry } from '../store/country.action';
// import { RouterTestingModule } from '@angular/router/testing';
import { Country } from '../models/country.model';
import { CountryDetailComponent } from '../country-detail/country-detail.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: Store;
  let router: Router;
  let dialog: MatDialog;
  let countryService: CountryService;

  const mockCountries: Country[] = [
    {
      name: { common: 'Sierra Leone' },
      region: 'Africa',
      capital: 'Freetown',
      continents: ['Africa'],
      population: 7976983,
      timezones: ['GMT'],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        StoreModule.forRoot({}),
        // RouterTestingModule.withRoutes([]),
        MatDialogModule,
      ],
      providers: [
        {
          provide: CountryService,
          useValue: {
            getAllCountries: jest.fn().mockReturnValue(of(mockCountries)),
            searchCountries: jest.fn().mockReturnValue(of(mockCountries)),
          },
        },
        {
          provide: MatDialog,
          useValue: {
            open: jest.fn().mockReturnValue({
              afterClosed: () => of(true),
            }),
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    countryService = TestBed.inject(CountryService);

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadCountries action on init', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(loadCountries());
  });

  it('should filter countries based on search term', () => {
    const searchSpy = jest.spyOn(countryService, 'searchCountries');
    component.searchTerm = 'Sierra';
    component.onSearch();
    expect(searchSpy).toHaveBeenCalledWith('Sierra');
    component.filteredCountries$.subscribe((countries) => {
      expect(countries).toEqual(mockCountries);
    });
  });

  it('should open country detail dialog and navigate with hyphenated country name', () => {
    const routerSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);
    const dialogSpy = jest.spyOn(dialog, 'open');
    const mockCountry = mockCountries[0];

    component.openCountryDetail(mockCountry);

    expect(routerSpy).toHaveBeenCalledWith(['/country', 'Sierra-Leone']);
    // expect(dialogSpy).toHaveBeenCalledWith(CountryDetailComponent, {
    //   width: '400px',
    //   data: { country: mockCountry }
    // });
  });

  it('should navigate back and clear query params when dialog is closed', () => {
    const routerSpy = jest.spyOn(router, 'navigate');
    const mockCountry = mockCountries[0];

    component.openCountryDetail(mockCountry);

    const dialogRef = dialog.open(CountryDetailComponent, {
      width: '400px',
      data: { country: mockCountry },
    });
    dialogRef.afterClosed().subscribe(() => {
      expect(routerSpy).toHaveBeenCalledWith([''], {
        queryParams: {},
        queryParamsHandling: 'merge',
      });
    });
  });
});
