import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [ChartComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    FormsModule,
    ChartComponent,
  ]
})
export class ShareModule { }
