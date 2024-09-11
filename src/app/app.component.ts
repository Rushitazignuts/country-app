import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common'; 
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatProgressSpinnerModule, CommonModule, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Country Details';
}
