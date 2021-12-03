import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { authResponse, UserAuthenticate } from '../interfaces/user.interface';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!: UserAuthenticate;
  apiBase: string = environment.apiBase;

  get infoUser() {
    return { ...this.user }
  }

  constructor(
    private http: HttpClient
  ) { }

  login(body: any) {
    const url = `${this.apiBase}AppUsers/login?include=user`;
    return this.http.post(url, body)
      .pipe(
        tap((resp) => {
          localStorage.setItem('userAdroit', JSON.stringify(resp))
        }),
        catchError(err => of(err.error.error.message))
      )
  }

  validateToken() {
    const userAdroit = localStorage.getItem('userAdroit') || '';
    if (userAdroit) {
      this.user = JSON.parse(userAdroit);
      return of(true);
    } else {
      return of(false);
    }
  }

  logout() {
    localStorage.removeItem('userAdroit');
  }
}

