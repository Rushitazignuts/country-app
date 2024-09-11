import { Component } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLoading } from '../../store/shared/shared.selector';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css'
})
export class LoadingSpinnerComponent {
  showLoading$:  Observable<boolean>|any;
  constructor(private store: Store){}
  ngOnInit() {
    this.showLoading$ = this.store.select(getLoading)
  }
}
