import { tap } from 'rxjs/operators';
import { Login, Token } from './../interfaces/user.type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from "../interfaces/user.type";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _authenticatedUser: User = {
    active: true,
    lastName: "Apellido",
    secondLastName: "Apellido 2",
    createDate: new Date(),
    id: 1,
    secondName: "Nombre 2",
    firstName: "Nombre",
  };

  private api = "https://fakestoreapi.com/auth/login";

  private user: Login = {
    username: "mor_2314",
    password: "83r5^_",
  };

  constructor(private http: HttpClient) {}

  public getNames(names: {
    firstName?: boolean;
    secondName?: boolean;
    lastName?: boolean;
    secondLastName?: boolean;
  }) {
    // tslint:disable-next-line:prefer-const
    let output = [];
    if (names.firstName) {
      output.push(AuthService.validateName(this._authenticatedUser.firstName));
    }
    if (names.secondName) {
      output.push(AuthService.validateName(this._authenticatedUser.secondName));
    }
    if (names.lastName) {
      output.push(AuthService.validateName(this._authenticatedUser.lastName));
    }
    if (names.secondLastName) {
      output.push(
        AuthService.validateName(this._authenticatedUser.secondLastName)
      );
    }
    return output.join(" ");
  }

  private static validateName(name: string) {
    if (!name || name === "null" || name === "undefined") {
      return "";
    }
    return name;
  }

  public login() {
    return this.http.post<Token>(this.api, this.user)
    .pipe(tap((response) => this.savejwt(response.token)));
  }

  public savejwt(jwt: string) {
    localStorage.setItem("jwt", jwt);
  }
  public getjwt() {
    return localStorage.getItem("jwt");
  }
  public deletejwt() {
    localStorage.removeItem("jwt");
  }
}
