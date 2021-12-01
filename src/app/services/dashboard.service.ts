import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth-services.service';
import { UserAuthenticate } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiBase: string = environment.apiBase;
  infoUser:UserAuthenticate

  constructor(private http: HttpClient,
              private authService: AuthService) {
                this.infoUser = this.authService.infoUser;
               }

  getBranches(){
    const url = `${this.apiBase}Branches?access_token=${this.infoUser.id}`;

    return this.http.get(url)
          .pipe(
            catchError(err =>  of(err.error.error.message))
          )
  }

  registerOrigin(body: object){
    const url = `${this.apiBase}Origins?access_token=${this.infoUser.id}`;
    return this.http.post(url, body);
  }

  getOrigins(){
    const url = `${this.apiBase}Origins?filter[include]=branch&access_token=${this.infoUser.id}`;
    console.log(url);
    return this.http.get(url)
    .pipe(
      catchError(err =>  of(err.error.error.message))
      )
    }
    
   
    deleteOrigins(id:string){
    const url = `${this.apiBase}Origins/${id}?access_token=${this.infoUser.id}`;
    return this.http.delete(url)
    .pipe(
      catchError(err =>  of(err.error.error.message))
      )
  }

  updateOrigins(body:object, id:string){
    const url = `${this.apiBase}Origins/${id}?access_token=${this.infoUser.id}`;
    return this.http.put(url, body);
  }

}
