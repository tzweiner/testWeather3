import {Component, OnInit} from '@angular/core';
import {ForecastService} from "./forecast.service";
import {FormControl} from "@angular/forms";
import {
  map,
  Observable, Subscription,
} from "rxjs";
import {Forecast} from "./forecast.model";

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrl: './daily-forecast.component.less'
})
export class DailyForecastComponent implements OnInit {
  private init = true;
  private zipcodeList: number[] = new Array();

  public currentZipcode: number = 95742;
  public showDetail = true;
  public zipcodeInput: FormControl = new FormControl();
  public $data: Observable<Forecast> | undefined = undefined;
  private subscriptions = new Subscription();

  constructor(private forecastService: ForecastService) {
  }

  ngOnInit(): void {
    this.$data = this.forecastService.getDailyByZip(this.currentZipcode).pipe(
      map((data: Forecast) => {
        if (!this.hasZipCode(this.currentZipcode)) {
          this.zipcodeList.push(this.currentZipcode);
          this.updateLocalStorage(this.zipcodeList);
          if (!this.init) {
            this.displayFeedback(`Zip code ${this.currentZipcode} entered`);
          }
        }
        if (this.init) {
          this.init = false;
        }
        this.showDetail = true;
        return data;
      })
    )
  }

  public closeDetail(): void {
    this.showDetail = false;
  }

  public getForecastIcon (iconName: string): string {
    return this.forecastService.getIconUrl(iconName) + '.png';
  }

  private updateLocalStorage (zipIn: number[]): void {
    localStorage.setItem("zipcodes", JSON.stringify(zipIn));
  }

  private hasZipCode(zipIn: number): boolean {
    return this.zipcodeList.includes(zipIn);
  }

  private displayFeedback(message: string): void {
    window.alert(message);
  }

  public enterZipcode(): void {
    if (!this.zipcodeInput?.value) {
      this.displayFeedback("Nothing was entered");
    } else {
      if (parseInt(this.zipcodeInput?.value)) {
        this.currentZipcode = this.zipcodeInput.value;
        this.$data = this.forecastService.getDailyByZip(this.currentZipcode);
      }
    }
  }
}
