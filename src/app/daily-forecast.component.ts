import {Component, OnDestroy, OnInit} from '@angular/core';
import {ForecastService} from "./forecast.service";
import {FormControl} from "@angular/forms";
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  EMPTY,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  tap, throwError
} from "rxjs";
import {Forecast} from "./forecast.model";
import {T} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrl: './daily-forecast.component.less'
})
export class DailyForecastComponent implements OnInit {
  private init = true;
  private zipcodeList: number[] = new Array();
  private readonly subject = new Subject<number>();

  public currentZipcode: number = 95742;
  public showDetail = true;
  public zipcodeInput: FormControl = new FormControl();
  public $data: Observable<Forecast> = new Observable<Forecast>();

  constructor(private forecastService: ForecastService) {
    this.$data = this.subject.asObservable().pipe(
      startWith(95742),
      tap((zipcode: number) => this.currentZipcode = zipcode),
      switchMap(() => this.forecastService.getDailyByZip(this.currentZipcode)
        .pipe(
          map((x:Forecast) => {
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
            return x;
          })
        )),
      catchError((error) => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  ngOnInit(): void { }

  ngOnDestroy(){
    this.subject.complete();
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
      this.subject.next(parseInt(this.zipcodeInput.value));
    }
  }
}
