import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CountryService } from './country.service';
import { Country } from '../models/country.model';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;

  const mockCountries = [
    {
      name: {
        common: 'United States',
      },
      capital: ['Washington D.C.'],
      population: 331000000,
    },
    {
      name: {
        common: 'Canada',
      },
      capital: ['Ottawa'],
      population: 38000000,
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllCountries', () => {
    it('should return an Observable of all countries', () => {
      service.getAllCountries().subscribe((countries) => {
        expect(countries.length).toBe(2);
        expect(countries).toEqual(mockCountries);
      });

      const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
      expect(req.request.method).toBe('GET');
      req.flush(mockCountries);
    });
  });

  describe('getCountryByName', () => {
    it('should return the correct country by name', () => {
      const countryName = 'United States';
      service.getCountryByName(countryName).subscribe((country: any) => {
        expect(country.name.common).toBe('United States');
      });

      const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
      expect(req.request.method).toBe('GET');
      req.flush(mockCountries);
    });

    it('should return null if the country is not found', () => {
      const countryName = 'Nonexistent Country';
      service.getCountryByName(countryName).subscribe((country: any) => {
        expect(country).toBeNull();
      });

      const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
      expect(req.request.method).toBe('GET');
      req.flush(mockCountries);
    });
  });

  describe('searchCountries', () => {
    it('should return countries by name if searchBy is "name"', () => {
      const searchTerm = 'United States';
      service.searchCountries(searchTerm, 'name').subscribe((countries) => {
        expect(countries.length).toBe(1);
        expect(countries[0].name.common).toBe('United States');
      });

      const req = httpMock.expectOne(
        `https://restcountries.com/v3.1/name/${searchTerm}`
      );
      expect(req.request.method).toBe('GET');
      req.flush([mockCountries[0]]);
    });

    it('should return countries by capital if searchBy is "capital"', () => {
      const searchTerm = 'Ottawa';
      service.searchCountries(searchTerm, 'capital').subscribe((countries) => {
        expect(countries.length).toBe(1);
        expect(countries[0].name.common).toBe('Canada');
      });

      const req = httpMock.expectOne(
        `https://restcountries.com/v3.1/capital/${searchTerm}`
      );
      expect(req.request.method).toBe('GET');
      req.flush([mockCountries[1]]);
    });

    it('should return all countries if searchTerm is empty', () => {
      service.searchCountries('', 'name').subscribe((countries) => {
        expect(countries.length).toBe(2);
        expect(countries).toEqual(mockCountries);
      });

      const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
      expect(req.request.method).toBe('GET');
      req.flush(mockCountries);
    });
  });
});
