import { Component, Inject } from '@angular/core';
import { CountryDetail } from '../models/country.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css',
})
export class CountryDetailComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { country: CountryDetail }, private dialogRef: MatDialogRef<CountryDetailComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
