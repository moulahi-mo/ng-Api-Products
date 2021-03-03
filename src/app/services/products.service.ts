import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Product } from '../models/interfaces';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  public GetAllProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(environment.apiUrl + 'products')
      .pipe(catchError(this.hundleErrors));
  }

  public getProductById(id: string): Observable<Product> {
    return this.http
      .get<Product>(environment.apiUrl + `products/${id}`)
      .pipe(catchError(this.hundleErrors));
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(environment.apiUrl + `products`, product)
      .pipe(catchError(this.hundleErrors));
  }

  public deleteProductById(id: string): Observable<Product> {
    return this.http
      .delete<Product>(environment.apiUrl + `products/${id}`)
      .pipe(catchError(this.hundleErrors));
  }

  public EditProductById(product: Product): Observable<Product> {
    return this.http
      .put<Product>(environment.apiUrl + `products/${product._id}`, product)
      .pipe(catchError(this.hundleErrors));
  }

  public updateProductById(id: string, update: object): Observable<Product> {
    return this.http
      .patch<Product>(environment.apiUrl + `products/${id}`, update)
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
