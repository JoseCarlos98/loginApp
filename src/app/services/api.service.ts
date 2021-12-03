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

  getAll(model: string, filters?: any) {
    const filter = `filter=${JSON.stringify(filters)}`
    
    const url = `${this.apiBase}${model}?${filters ? filter : ''}&access_token=${this.infoUser.id}`;

    return this.http.get(url)
  }

  getQuery(termino: string, properties?: string[]) {
    let where: any = {}

    properties!.forEach(element => {
      where[element] = { like: termino, options: 'i' }
    });

    return where
  }

  getSuggestion(model: string, query: Query): Observable<Origin[]> {
    const filter = {
      include: ["branch"],
      where: query,
      sort: "createdAt ASC"
    }

    const url = `${this.apiBase}${model}?filter=${JSON.stringify(filter)}&access_token=${this.infoUser.id}`
    return this.http.get<Origin[]>(url)
  }

  registerOrUpdate(model: string, body?: object, idOrigin?: any) {
    const url = `${this.apiBase}${model}/${idOrigin}?access_token=${this.infoUser.id}`;
    return this.http.put(url, body);
  }

  delete(model: string, id: string) {
    const url = `${this.apiBase}${model}/${id}?access_token=${this.infoUser.id}`;

    return this.http.delete(url)
      .pipe(catchError(err => of(err.error.error.message)))
  }

}