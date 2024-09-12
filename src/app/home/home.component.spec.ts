import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Store, StoreModule } from '@ngrx/store';
import { CountryService } from '../services/country.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { loadCountries } from '../store/country.action';
import { Country } from '../models/country.model';
import { CountryDetailComponent } from '../country-detail/country-detail.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: Store;
  let router: Router;
  let dialog: MatDialog;
  let countryService: CountryService;
  let activatedRoute: ActivatedRoute;

  const mockCountries: Country[] = [
    {
      name: { common: 'Sierra Leone' },
      region: 'Africa',
      capital: 'Freetown',
      continents: ['Africa'],
      population: 7976983,
      timezones: ['GMT'],
      cca2: 'GS'
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        StoreModule.forRoot({}),
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
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: () => 'Sierra-Leone',
            }),
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    countryService = TestBed.inject(CountryService);
    activatedRoute = TestBed.inject(ActivatedRoute);

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

  it('should open country detail dialog and navigate with hyphenated country name', () => {
    const routerSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);
    const mockCountry = mockCountries[0];

    component.openCountryDetailDialog(mockCountry);

    expect(routerSpy).toHaveBeenCalledWith(['/country', 'Sierra-Leone']);
  });

  it('should navigate back and clear query params when dialog is closed', () => {
    const routerSpy = jest.spyOn(router, 'navigate');
    const mockCountry = mockCountries[0];

    component.openCountryDetailDialog(mockCountry);

    const dialogRef = dialog.open(CountryDetailComponent, {
      width: '400px',
      data: { country: mockCountry },
    });
    dialogRef.afterClosed().subscribe(() => {
      expect(routerSpy).toHaveBeenCalledWith([''], {
        queryParams: {},
      });
    });
  });
});
