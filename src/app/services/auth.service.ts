import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { User } from '../models/interfaces';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
interface Auth {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth: boolean = false;
  AuthListner = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  public AuthState() {
    return this.isAuth;
  }

  public login(email: string, password: string): Observable<Auth> {
    return this.http
      .post<Auth>(environment.apiUrl + 'auth/login', { email, password })
      .pipe(
        tap(() => this.AuthListner.next(true)),
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
      tap(() => this.AuthListner.next(false)),
      catchError(this.hundleErrors)
    );
  }

  public getCurrentUser(): Observable<User> {
    return this.http
      .get<User>(environment.apiUrl + 'auth/me')
      .pipe(catchError(this.hundleErrors));
  }

  private hundleErrors(error: HttpErrorResponse) {
    if (error) {
      return throwError(
        error.error.message ? error.error.message : 'someting bad happned'
      );
    }
  }
}
