import { Injector, Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {HttpHandler, HttpEvent, HttpRequest, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {catchError} from "rxjs/internal/operators";
import {ErrorsService} from "../services/errors.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorsHandlerInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) { }
  intercept(request: HttpRequest<any>, next: HttpHandler):     Observable<HttpEvent<any>> {
    // If the call fails, retry until 5 times before throwing an error
    return next.handle(request)
      .pipe(catchError( (error: HttpErrorResponse) => {
        const message = (error.error instanceof ErrorEvent) ? error.error.message : `${error.status} - ${error.message} \n Please contact your system administrator!`;
        const errorsService = this.injector.get(ErrorsService);
        errorsService.log(error,
          `${error.status} - ${error.message} \n Please contact your system administrator!`,
          'Http Error');
        return throwError(error);
      }));
  }
}
