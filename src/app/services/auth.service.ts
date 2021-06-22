import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  signupError = '';
  loginError = '';
  success = '';

  constructor(public firebaseAuth: AngularFireAuth) {}
  async signIn(email: string, password: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;
        this.success = '';
      })
      .catch((err) => {
        this.loginError = err.message;
        console.log(err.message);
        this.isLoggedIn = false;
      });
  }

  async signUp(email: string, password: string) {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.success = 'Successfully registered. Please login from the side.';
        localStorage.setItem('user', JSON.stringify(res.user));
        console.log('basarili' + this.isLoggedIn);
      })
      .catch((err) => {
        this.signupError = err.message;
        console.log(err.message);
      });
  }

  logOut() {
    this.firebaseAuth.signOut();
    this.isLoggedIn = false;
    console.log('çıkış yapmak istiyorum' + this.isLoggedIn);
  }
}
