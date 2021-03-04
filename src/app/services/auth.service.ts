import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { User } from '../models/interfaces';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
interface Auth {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth: boolean = false;
  clearTime: any;
  token: string = null;
  uid: string = null;
  AuthListner = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  public AuthState() {
    return this.isAuth;
  }
  public GetToken() {
    return this.token;
  }

  public login(email: string, password: string): Observable<Auth> {
    return this.http
      .post<Auth>(environment.apiUrl + 'auth/login', { email, password })
      .pipe(
        tap((data: any) => {
          console.log(data.token);
          console.log('user logged in');
          //! get the token and expires time
          this.token = data.token;
          this.uid = data.userInfos._id;
          this.AuthListner.next(true);
          this.isAuth = true;
          //! get expires on date
          const expires =
            parseInt(data.expiresIn) == 24 ? 3600 * 24 * 1000 : null;
          const after = new Date(Date.now() + expires);
          console.log(this.isAuth, this.uid, this.token, after, expires);
          //! set token to local storage
          this.SetLocalToken(this.token, after, this.uid);
          //! call the setimeout
          this.AutoSetTimeOut(expires);
          console.log(expires);
        }),
        catchError(this.hundleErrors)
      );
  }

  public signup(user: User): Observable<User> {
    return this.http
      .post<User>(environment.apiUrl + 'auth/signup', user)
      .pipe(catchError(this.hundleErrors));
  }
  public logout(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + 'auth/logout').pipe(
      tap(() => {
        console.log('user logged out');
        this.token = null;
        this.AuthListner.next(false);
        this.isAuth = false;
        this.uid = null;
        this.ClearLocalToken();
        clearTimeout(this.clearTime);
      }),
      catchError(this.hundleErrors)
    );
  }

  public getCurrentUser(): Observable<User> {
    return this.http
      .get<User>(environment.apiUrl + 'auth/me')
      .pipe(catchError(this.hundleErrors));
  }

  //! auto loggin perssiste auto auth

  public autoAUth() {
    const AuthInfos = this.GetLocalToken();

    if (AuthInfos) {
      const diff = new Date(AuthInfos.expiresIn).getTime() - Date.now();

      if (diff > 0) {
        console.log(diff);
        this.isAuth = true;
        this.token = AuthInfos.token;
        this.AuthListner.next(true);
        this.AutoSetTimeOut(diff);
        console.log('from auto AUht', this.isAuth);
      }
    } else if (!AuthInfos) {
      return;
    }
  }

  // ! local storage
  private SetLocalToken(token: string, expiresIn: Date, uid: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expiresIn.toDateString());
    localStorage.setItem('uid', uid);
  }

  private GetLocalToken() {
    const token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : null;
    const uid = localStorage.getItem('uid')
      ? localStorage.getItem('uid')
      : null;
    const expiresIn = localStorage.getItem('expiresIn')
      ? localStorage.getItem('expiresIn')
      : null;
    if (token && expiresIn) {
      return {
        token,
        uid,
        expiresIn,
      };
    } else {
      return;
    }
  }

  private ClearLocalToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('uid');
  }

  private AutoSetTimeOut(duration: number) {
    this.clearTime = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private hundleErrors(error: HttpErrorResponse) {
    if (error) {
      return throwError(
        error.error.message ? error.error.message : 'someting bad happned'
      );
    }
  }
}
