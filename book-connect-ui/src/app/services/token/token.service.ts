import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  set token(token: string) {
    localStorage.setItem('token', token)
  }

  get token() {
    return localStorage.getItem('token') as string
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  private isTokenValid() {
    const token = this.token;
    if (!token) {
      return false;
    }
    //deocde token
    const jwtHelper = new JwtHelperService()
    //checking expiry
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  get TokenSub() {
    const jwtHelper = new JwtHelperService()
    const decodedToken = jwtHelper.decodeToken(this.token);
    return decodedToken ? decodedToken.sub : null;
    // const decodedToken: any = jwt_decode.jwtDecode(this.token);
    // return decodedToken.sub;
  }


}
