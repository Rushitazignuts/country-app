import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountryResolver } from './resolver/country.resolver';

export const routes: Routes = [
  { path: '', redirectTo: '/country', pathMatch: 'full' }, //default route

  { path: 'country', component: HomeComponent }, // Country listing route
  {
    path: 'country/:name',
    component: HomeComponent,
    resolve: { country: CountryResolver },
  }, // Country name route when open details dialog
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
