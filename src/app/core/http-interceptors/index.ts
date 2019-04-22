import {ErrorsHandlerInterceptorService} from "./errors-handler-interceptor.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
export const httpInterceptorProviders =[
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorsHandlerInterceptorService,
    multi: true,
  },
]
