import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {DailyForecastComponent} from "./daily-forecast.component";
import {RangeForecastComponent} from "./range-forecast.component";
import {forecastResolver} from "./forecast.service";

export const routes: Routes = [
  { path: 'forecast', component: DailyForecastComponent},
  { path: 'forecast/:zip/count/:count', component: RangeForecastComponent, resolve: { forecast: forecastResolver }},
  { path: '**', redirectTo: 'forecast'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
