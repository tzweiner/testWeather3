import {Component, OnInit} from '@angular/core';
import {ForecastService} from "./forecast.service";
import {combineLatest, map, Observable, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Forecast, ForecastRange} from "./forecast.model";
import moment from "moment";

@Component({
  selector: 'app-range-forecast',
  templateUrl: './range-forecast.component.html',
  styleUrl: './range-forecast.component.less'
})
export class RangeForecastComponent implements OnInit {

  public $data: Observable<ForecastRange> = new Observable<ForecastRange>();

  constructor(private forecastService: ForecastService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.$data = this.forecastService.getRangeForecast((data.forecast));
    })
  }

  public showDate (epochTime: number): string {
    return moment.unix(epochTime).format('dddd, MMM Do');
  }

  public getForecastIcon (iconName: string): string {
    return this.forecastService.getIconUrl(iconName) + '.png';
  }

}
