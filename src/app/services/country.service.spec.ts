import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CountryService } from './country.service';
import { Country, CountryDetail } from '../models/country.model';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;

  // Sample data
  const mockCountry: Country | any = [
    {
      capital: 'Freetown',
      continents: ['Africa'],
      name: { common: 'Sierra Leone' },
      officialLanguage: 'English',
      population: 7976983,
      region: 'Africa',
      timeZones: ['GMT'],
      timezone: 'GMT',
      timezones: ['GMT'],
      area: 71740,
      currencies: [],
    },
    {
      capital: 'Freetown',
      continents: ['Africa'],
      name: { common: 'Sierra Leone' },
      officialLanguage: 'English',
      population: 7976983,
      region: 'Africa',
      timeZones: ['GMT'],
      timezone: 'GMT',
      timezones: ['GMT'],
      area: 71740,
      currencies: [],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryService],
    });

    service = TestBed.inject(CountryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all countries', () => {
    service.getAllCountries().subscribe((countries) => {
      expect(countries.length).toBe(2);
      expect(countries).toEqual(mockCountry);
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
    expect(req.request.method).toBe('GET');
    req.flush(mockCountry);
  });

  it('should find a country by name', () => {
    service.getCountryByName('Sierra Leone').subscribe((country) => {
      expect(country).toEqual(mockCountry[0]);
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
    req.flush(mockCountry);
  });

  it('should return null if country not found', () => {
    service.getCountryByName('Nonexistent Country').subscribe((country) => {
      expect(country).toBeNull();
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
    req.flush(mockCountry);
  });

  it('should filter countries based on search term', () => {
    service.searchCountries('Sierra').subscribe((countries) => {
      expect(countries.length).toBe(1);
      expect(countries[0].name.common).toBe('Sierra Leone');
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
    req.flush(mockCountry);
  });

  it('should return empty array if no countries match the search term', () => {
    service.searchCountries('Nonexistent').subscribe((countries) => {
      expect(countries.length).toBe(0);
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
    req.flush(mockCountry);
  });
});
