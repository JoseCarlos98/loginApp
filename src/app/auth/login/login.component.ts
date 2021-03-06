import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  body: object = {};

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  form: FormGroup = this.fb.group({
    username: ['lopez', Validators.required],
    password: ['123456', Validators.required]
  });

  get username() {
    return this.form.controls.username.value;
  }

  logIn() {
    this.body = this.form.value;

    if (this.username.includes('@') && this.username) {
      const { username, password } = this.form.value;
      this.body = {
        email: username,
        password: password,
      }
    }

    this.authService.login(this.body)
      .subscribe(resp => {
        if (resp.userId) {
          this.router.navigateByUrl('/dashboard');
        } 
      });
  }
}
