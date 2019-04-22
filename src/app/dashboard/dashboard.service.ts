import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/internal/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  get(connectionConfig) {
    return this.http.get<any>(connectionConfig.url)
      .pipe(catchError(() => of([])));
  }
}
