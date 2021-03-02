import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product, Review } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  constructor(private http: HttpClient) {}

  public GetAllProducts(): Observable<Review[]> {
    return this.http
      .get<Review[]>(environment.apiUrl + 'products')
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
