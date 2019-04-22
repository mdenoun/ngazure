import { Injector, Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {
  constructor(private injector: Injector) { }
  log(error:any, message: string, title: string, params?:{onActivateTick: boolean}) {
    if(!environment.production) {
      console.log(error);
    }
    const toastrService = this.injector.get(ToastrService);
    if(params) {
      toastrService.error(message, title, params);
    } else {
      toastrService.error(message, title);
    }
  }
}
