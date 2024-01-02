import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app.routes";
import { DailyForecastComponent } from './daily-forecast.component';
import {MatCommonModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import { RangeForecastComponent } from './range-forecast.component';
import {ForecastService} from "./forecast.service";
import {HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, DailyForecastComponent, DailyForecastComponent, RangeForecastComponent],
  imports: [
    CommonModule, BrowserModule, RouterModule, ReactiveFormsModule, FormsModule,
    AppRoutingModule, MatCommonModule, MatFormFieldModule, MatInputModule, HttpClientModule, NgbModule,
  ],
  bootstrap: [AppComponent],
  providers: [ForecastService]
})
export class AppModule { }
