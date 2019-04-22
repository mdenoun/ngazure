import {ChartDataStrategy} from "./ChartDataStrategy";
import * as moment from 'moment';
import {Chart} from "../../share/chart/chart";
export class AlphaVantageAmChartDataStrategy implements ChartDataStrategy {
  constructor(public displayName: string, ) {
  }
  getConnectionConfig(options:{function:string, symbol:string, interval:string}): {url:string} {
    const url = `https://www.alphavantage.co/query?function=${options.function}&symbol=${options.symbol}&interval=${options.interval}&apikey=demo`;
    return {
      url,
    }
  }
  getMaxPointNumber(): number {
    return 24 * 60 / 5;
  }
  getInfo():{header: string, title: string, description: string} {
    return{
      header: 'Stock provided by Alpha Vantage',
      title: 'Microsoft',
      description: `stocks for every 5 min interval`,
    }
  }
  transformData(rawData, maxSize, threshold):Chart {
    let chartData: {}[] = [];
    let dataSize = maxSize || rawData.length;
    for (const prop in rawData['Time Series (5min)']) {
      let dataItem = {};
      dataItem['open'] = rawData['Time Series (5min)'][prop]['1. open'];
      if(dataItem['open'] > threshold) {
        dataItem['lineColor']='#E25545';
      }
      else {
        dataItem['lineColor']='#a5c562';
      }
      dataItem['dateTime'] = moment(prop).toDate();
      dataItem['dateTimeStr'] = prop;
      dataItem['threshold'] = threshold;
      dataItem['thresholdColor'] = '#ccccc';
      chartData.push(dataItem);
      dataSize--;
      if(dataSize === 0){
        break;
      }
    }
    return {
      config: [
        {
          name: 'open',
          color: 'lineColor',
          threshold: 'threshold',
          thresholdColor: 'thresholdColor',
          baseInterval: {
            "timeUnit": "minute",
            "count": 5
          }
        }
      ],
      dataProvider: chartData
    } as Chart;
  }
}
