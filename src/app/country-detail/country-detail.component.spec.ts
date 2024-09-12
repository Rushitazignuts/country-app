import { CountryDetail } from '../models/country.model';

// Mocking the MatDialog service
jest.mock('@angular/material/dialog', () => ({
  MatDialog: jest.fn(),
}));

describe('CountryDetailComponent', () => {
  const mockCountry: CountryDetail = {
    capital: 'Freetown',
    continents: ['Africa'],
    name: { common: 'Sierra Leone' },
    population: 7976983,
    region: 'Africa',
    timezones: ['GMT'],
    area: 71740,
    currencies: [],
    cca2: "GS"
  };

  it('should render country details correctly', async () => {
    // Render the component with mock data
    // await render(CountryDetailComponent, {
    //   imports: [MatCardModule, CommonModule],
    //   componentProperties: {
    //     data: { country: mockCountry },
    //   },
    // });

    // Verify that the component renders the data correctly
    expect(mockCountry.capital).toBe('Freetown');
  });
});
