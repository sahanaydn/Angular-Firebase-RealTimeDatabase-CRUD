import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isSignedIn = false;
  signupError = '';
  loginError = '';
  success = '';

  constructor(public auth: AuthService) {}
  ngOnInit(): void {}

  async onSignup(email: string, password: string) {
    await this.auth.signUp(email, password);
    if (this.auth.success) {
      this.success = this.auth.success;

      console.log('bu component ' + this.success);
    }
    this.signupError = this.auth.signupError;
  }

  async onSignin(email: string, password: string) {
    await this.auth.signIn(email, password);
    if (this.auth.isLoggedIn) {
      this.isSignedIn = this.auth.isLoggedIn;
    }

    this.loginError = this.auth.loginError;
  }

  async handleLogout() {
    await this.auth.logOut;
    if (this.auth.isLoggedIn) {
      this.isSignedIn = false;
    }
    this.signupError = '';
    this.loginError = '';
  }

  title = 'SoftZela Case';
}
