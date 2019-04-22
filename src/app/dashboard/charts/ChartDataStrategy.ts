import {Chart} from "../../share/chart/chart";
export interface ChartDataStrategy {
  displayName: string;
  getConnectionConfig(òptions:{function:string, symbol:string, interval:string}): {url:string};
  getMaxPointNumber(): number;
  getInfo(): {header: string, title: string, description: string};
  transformData(rawData:any, maxSize:number, threshold:number): Chart;
}
