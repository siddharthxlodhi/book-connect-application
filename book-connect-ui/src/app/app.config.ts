import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from "@angular/router";
import {provideClientHydration} from "@angular/platform-browser";
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {routes} from "./app.routes";
import {myInterceptorInterceptor} from "./interceptor/my-interceptor.interceptor";
import {provideToastr} from 'ngx-toastr';
import {provideAnimations} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    {provide: HTTP_INTERCEPTORS, useValue: myInterceptorInterceptor, multi: true},
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([myInterceptorInterceptor])),
    provideAnimations(), // Required for ngx-toastr
    provideToastr({ // Toastr configuration
      progressBar: true,
      closeButton: true,
      newestOnTop: true,
      tapToDismiss: true,
      positionClass: 'toast-bottom-right',
      timeOut: 8000
    }),
  ],
};
