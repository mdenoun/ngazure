import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorsService} from "./errors.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorsHandlerService implements ErrorHandler {
  constructor(private injector: Injector) { }
  handleError(error: any) {
    const errorsService = this.injector.get(ErrorsService);
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        errorsService.log(error, 'No Internet Connection', '', {onActivateTick: true});
      } else {
        // Handle Http Error (error.status === 403, 404...)
        errorsService.log(error,
          `${error.status} - ${error.message} \n Please contact your system administrator!`,
          'Http Error',
          {onActivateTick: true});
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
      errorsService.log(error,
        'Oups! An internal error occured! Please contact your system administrator!',
        'InternalError',
        {onActivateTick: true});
    }
  }
}
