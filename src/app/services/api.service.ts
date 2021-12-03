import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, debounceTime, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth-services.service';
import { UserAuthenticate } from '../interfaces/user.interface';
import { Origin } from '../interfaces/origin.interface';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Query } from '../interfaces/branch.interface';

@Injectable({
  providedIn: 'root'
})
export class apiService {
  apiBase: string = environment.apiBase;
  infoUser: UserAuthenticate

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.infoUser = this.authService.infoUser;
  }

  getBranches() {
    const url = `${this.apiBase}Branches?access_token=${this.infoUser.id}`;

    return this.http.get(url)
      .pipe(catchError(err => of(err.error.error.message)))
  }

  registerOrigin(body?: object, idOrigin?: any) {
    if (idOrigin) {
      const url = `${this.apiBase}Origins/${idOrigin}?access_token=${this.infoUser.id}`;
      return this.http.put(url, body);
    } else {
      const url = `${this.apiBase}Origins?access_token=${this.infoUser.id}`;
      return this.http.post(url, body);
    }
  }

  getOrigins() {
    const url = `${this.apiBase}Origins?filter[include]=branch&access_token=${this.infoUser.id}`;
    return this.http.get(url)
      .pipe(catchError(err => of(err.error.error.message)))
  }


  deleteOrigins(id: string) {
    const url = `${this.apiBase}Origins/${id}?access_token=${this.infoUser.id}`;
    return this.http.delete(url)
      .pipe(catchError(err => of(err.error.error.message)))
  }

  updateOrigins(body: object, id: string) {
    const url = `${this.apiBase}Origins/${id}?access_token=${this.infoUser.id}`;
    return this.http.put(url, body);
  }

  getQuery(termino: string, properties?: string[]) {
    let where: any = {}

    properties!.forEach(element => {
      where[element] = { like: termino, options: 'i' }
    });
    console.log(where);


    return where
  }

  getSuggestion(query: Query): Observable<Origin[]> {
    const filter = {
      include: ["branch"],
      where: query,
      sort: "createdAt ASC"
    }
    const url = `${this.apiBase}Origins?filter=${JSON.stringify(filter)}&access_token=${this.infoUser.id}`

    return this.http.get<Origin[]>(url)
  }









}