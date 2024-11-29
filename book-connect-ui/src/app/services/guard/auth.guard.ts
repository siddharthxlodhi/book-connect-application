import {CanActivateFn, Router} from '@angular/router';
import {TokenService} from "../token/token.service";
import {inject} from "@angular/core";
import {identity} from "rxjs";


export const authGuard: CanActivateFn = (route, state) => {
  const tokenService:TokenService=inject(TokenService);
  const router=inject(Router);
  if (tokenService.isTokenNotValid()){
    router.navigate(['login']);
    return false;
  }
  return true;

};
