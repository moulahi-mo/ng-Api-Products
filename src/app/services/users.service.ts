import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public GetAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(environment.apiUrl + 'users')
      .pipe(catchError(this.hundleErrors));
  }
  public getUserById(id: string): Observable<User> {
    return this.http
      .get<User>(environment.apiUrl + `users/${id}`)
      .pipe(catchError(this.hundleErrors));
  }

  public deleteUserById(id: string): Observable<User> {
    return this.http
      .delete<User>(environment.apiUrl + `users/${id}`)
      .pipe(catchError(this.hundleErrors));
  }

  public EditUserById(user: User): Observable<User> {
    return this.http
      .put<User>(environment.apiUrl + `users/${user._id}`, user)
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
