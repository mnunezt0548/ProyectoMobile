import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  showPassword: boolean = false;

  constructor(private router: Router) {}

  ionViewWillEnter() {
    this.username = '';
    this.password = '';
    this.isLoggedIn = false;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.username === 'mati' && this.password === '123') {
      this.isLoggedIn = true;
      this.router.navigate(['/bienvenida']);
    } else {
      alert('Credenciales incorrectas. Intenta nuevamente.');
    }
  }
}