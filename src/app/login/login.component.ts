import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean;
  loading: boolean;
  logged: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(username: string, password: string, event: Event): void {
    event.preventDefault();
    this.submitted = true;

    // stop here if form is invalid
    if (username === '' || password === '') {
      return;
    }

    this.authService.login(username, password).subscribe(
      res => {
        this.loading = false;
        console.log(res);
        if (res.hasOwnProperty('token')) {
          this.authService.setToken((res as any).token);
          this.authService.changeLoggedStatus(true);
          this.logged = 'funsiona';
        } else {
          this.authService.changeLoggedStatus(false);
        }
      },
      error => {
        this.authService.changeLoggedStatus(false);
        this.loading = false;
      });
  }
}
