import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from "./dashboard.service";
import {debounceTime, distinctUntilChanged, map} from "rxjs/internal/operators";
import {AlphaVantageAmChartDataStrategy} from "./charts/AlphaVantageAmChartDataStrategy";
import {merge, Observable, Subject} from "rxjs/index";
import {ChartDataStrategy} from "./charts/ChartDataStrategy";
import {Chart} from "../share/chart/chart";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data$: Observable<Chart>;
  data:any;
  maxPointNumber: number;
  pointNumber: number;
  pointNumberInput$ = new Subject<number>();
  threshold: number;
  thresholdInput$ = new Subject<number>();
  selectedIndexStrategy: number = 0;
  strategies: ChartDataStrategy[] = [];
  cardHeader: string;
  cardTitle: string;
  cardDescription: string;
  constructor(private service:DashboardService) {
    this.strategies.push(new AlphaVantageAmChartDataStrategy('stocks'));
    this.updateStrategy();
  }
  ngOnInit() {
    this.data$ = merge(merge(
      this.service.get(this.strategies[this.selectedIndexStrategy].getConnectionConfig(
        {
          function: 'TIME_SERIES_INTRADAY',
          symbol:   'MSFT',
          interval: '5min',
        }
      )).pipe(
        map( (rawData) => {
          this.data = rawData;
          return this.getTransformedData();
        })),
      this.pointNumberInput$.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map( (pointNumberData: number) => {
          this.pointNumber = pointNumberData;
          return this.getTransformedData();
        }))),
      this.thresholdInput$.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map( (thresholdData: number) => {
          this.threshold = thresholdData;
          return this.getTransformedData();
        }))
    );
  }
  getTransformedData() {
    return this.strategies[this.selectedIndexStrategy].transformData(this.data, this.pointNumber, this.threshold);
  }
  updateStrategy(){
    const selectedStrategy = this.strategies[this.selectedIndexStrategy];
    this.maxPointNumber = selectedStrategy.getMaxPointNumber();
    this.pointNumber = this.maxPointNumber;
    const info = selectedStrategy.getInfo();
    this.cardHeader = info.header;
    this.cardTitle = info.title;
    this.cardDescription = info.description;
  }
  onPointNumberChange($event) {
    this.pointNumberInput$.next($event);
  }
  onThresholdChange($event) {
    this.thresholdInput$.next($event);
  }
}
