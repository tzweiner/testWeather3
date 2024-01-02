import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Forecast, ForecastRange} from "./forecast.model";
import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";


export const forecastResolver: ResolveFn<Forecast> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(ForecastService).getDailyByZip(parseInt(<string>route.paramMap.get('zip')));
  };

@Injectable({
  providedIn: 'root',
})
export class ForecastService {

  private iconMap: Map<string, string> = new Map<string, string>([
    ["02d", "clouds"],
    ["04d", "clouds"],
    ["03d", "clouds"],
    ["04n", "clouds"],
    ["01d", "sun"],
    ["01n", "sun"],
    ["10n", "rain"],
    ["10d", "rain"],
    ["09n", "rain"],
    ["10s", "sun"],
    ["13s", "snow"],
    ["13n", "snow"],
    ["13d", "snow"]
  ]);

  private WEATHER_ICON_URL = 'https://www.angulartraining.com/images/weather/';
  private WEATHER_DAILY_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=5a4b2d457ecbef9eb2a71e480b947604&units=imperial&zip=';
  private WEATHER_RANGE_URL = 'https://api.openweathermap.org/data/2.5/forecast/daily?appid=5a4b2d457ecbef9eb2a71e480b947604&units=imperial&cnt=5'

  constructor(private $http: HttpClient) { }

  public getDailyByZip(zipcode: number): Observable<Forecast> {
    const url = this.WEATHER_DAILY_URL + zipcode;
    return this.$http.get<Forecast>(url);
  }

  public getIconUrl(iconName: string): string {
    return this.WEATHER_ICON_URL + this.iconMap.get(iconName);
  }

  public getRangeForecast(forecast: Forecast): Observable<ForecastRange> {
    const url = this.WEATHER_RANGE_URL + `&lat=${forecast.coord.lat}&lon=${forecast.coord.lon}`;
    return this.$http.get<ForecastRange>(url);
  }
}
