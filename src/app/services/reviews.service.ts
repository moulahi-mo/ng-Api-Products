import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Review } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  constructor(private http: HttpClient) {}

  public GetAllReviews(): Observable<Review[]> {
    return this.http
      .get<Review[]>(environment.apiUrl + 'reviews')
      .pipe(catchError(this.hundleErrors));
  }

  public getReviewById(id: string): Observable<Review> {
    return this.http
      .get<Review>(environment.apiUrl + `reviews/${id}/review`)
      .pipe(catchError(this.hundleErrors));
  }

  public addReview(review: Review): Observable<Review> {
    return this.http
      .post<Review>(environment.apiUrl + `reviews`, review)
      .pipe(catchError(this.hundleErrors));
  }

  public deleteReviewById(id: string): Observable<Review> {
    return this.http
      .delete<Review>(environment.apiUrl + `reviews/${id}`)
      .pipe(catchError(this.hundleErrors));
  }

  public EditReviewById(id: string, review: Review): Observable<Review> {
    return this.http
      .put<Review>(environment.apiUrl + `reviews/${id}`, review)
      .pipe(catchError(this.hundleErrors));
  }

  public updateReviewById(id: string, update: object): Observable<Review> {
    return this.http
      .patch<Review>(environment.apiUrl + `reviews/${id}`, update)
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
