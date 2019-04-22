import {ChangeDetectionStrategy, Component, Input, NgZone, OnInit, SimpleChanges} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {Chart} from "./chart";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-mychart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit {
  private amChart: am4charts.XYChart;
  @Input() data:Chart;
  @Input() chartIndex;
  id: string;
  constructor( private zone: NgZone ) { }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'data') {
        this.init();
      }
    }
  }
  ngAfterContentInit() {
    this.init();
  }
  init() {
    if (this.amChart) {
     this.amChart.dispose();
     }
    let isEmpty = !(this.data && this.data.dataProvider && (this.data.dataProvider.length > 0 ) );
    if ( isEmpty ) {
      return;
    }
    setTimeout(() => {
      this.zone.runOutsideAngular(() => {
        this.initChartSeries();
      });
    }, 0);
  }
  initChartSeries() {
    this.id = 'chartdiv-' + this.chartIndex;
    this.amChart = am4core.create(this.id, am4charts.XYChart);
    this.amChart.width = am4core.percent(100);
    this.amChart.height = am4core.percent(100);

    this.amChart.paddingRight = 20;

    this.amChart.data = this.data.dataProvider;

    var dateAxis = this.amChart.xAxes.push(new am4charts.DateAxis());
    dateAxis.baseInterval = this.data.config[0].baseInterval;
    var valueAxis = this.amChart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    let series = this.createSeries(this.data.config[0].name, this.data.config[0].color, false);
    series = this.createSeries(this.data.config[0].threshold, this.data.config[0].thresholdColor, true);
    this.amChart.cursor = new am4charts.XYCursor();
    this.amChart.cursor.snapToSeries = series;
    this.amChart.cursor.xAxis = dateAxis;
    var scrollbarX = new am4core.Scrollbar();
    this.amChart.scrollbarX = scrollbarX;
  }

  createSeries(field, colorField, disabledTooltip) {
    var series = this.amChart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "dateTime";
    series.dataFields.valueY = field;
    if(disabledTooltip) {
      series.tooltip.disabled = true;
    }
    else {
      series.tooltipText = "{valueY}";
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.background.fillOpacity = 0.5;
    }
    series.strokeWidth = 2;
    series.propertyFields.stroke = colorField;
    return series;
  }
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.amChart) {
        this.amChart.dispose();
      }
    });
  }
}
