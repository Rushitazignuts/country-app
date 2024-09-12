import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountryDataResolver } from './resolver/country-data.resolver';

export const routes: Routes = [
  { path: '', redirectTo: '/country', pathMatch: 'full' }, //default route
  {
    path: 'country',
    component: HomeComponent,
    resolve: { countries: CountryDataResolver },
  },
  {
    path: 'country/:name',
    component: HomeComponent,
    resolve: { countries: CountryDataResolver },
  }, 
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
