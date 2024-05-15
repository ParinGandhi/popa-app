import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userName: any = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  getUserInfo() {
    window.sessionStorage.setItem('loggedInUser', this.userName);
    this.router.navigate(['/']);
  }
}
