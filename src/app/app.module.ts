import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {ErrorsHandlerService} from './core/services/errors-handler.service';
import {httpInterceptorProviders} from './core/http-interceptors';
import {ToastContainerModule, ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      extendedTimeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    }),
    ToastContainerModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorsHandlerService,
    },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
