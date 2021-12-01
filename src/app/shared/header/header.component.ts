import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authServices: AuthService,
              private router: Router) { }

  infoUser: any;

  ngOnInit(): void {
    const { user } = this.authServices.infoUser;
    this.infoUser = user
  }

  logOut(){
    this.authServices.logout()
    this.router.navigateByUrl('/auth')
  }

}
