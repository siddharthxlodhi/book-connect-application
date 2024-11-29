import { HttpInterceptorFn} from '@angular/common/http';
import {TokenService} from "../services/token/token.service";
import {inject} from "@angular/core";

export const myInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
 const authService = inject(TokenService);
  const jwtToken = authService.token;
 if(jwtToken){
   const clonedRequest = req.clone({ headers: req.headers.set('Authorization', `Bearer ${jwtToken}`) });
   return next(clonedRequest);
 }
  return next(req);
};
