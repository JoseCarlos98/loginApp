import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-services.service';
import {  tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidatetokenGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate() : Observable<boolean> | boolean {
    return this.authService.validateToken()
        .pipe(
            tap(resp =>{
              if (!resp) {
                this.router.navigateByUrl('/auth/login')
              }
            })
            )
          }
}