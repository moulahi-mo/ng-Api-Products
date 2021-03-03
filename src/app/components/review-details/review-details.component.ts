import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Review, User } from 'src/app/models/interfaces';
import { ProductsService } from 'src/app/services/products.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.css'],
})
export class ReviewDetailsComponent implements OnInit {
  review: Review;
  isError: string = null;
  isLoading: boolean = false;
  product: Product;
  user: User;

  constructor(
    private reviewsService: ReviewsService,
    private route: ActivatedRoute,
    private ProductService: ProductsService,
    private UsersService: UsersService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchProduct(id);
  }

  public fetchProduct(id: string) {
    this.isLoading = true;
    this.reviewsService.getReviewById(id).subscribe(
      (data: Review) => {
        console.log(data);

        this.ProductService.getProductById(data.product).subscribe(
          (product: Product) => {
            console.log(product);
            this.product = product;
          }
        );
        this.UsersService.getUserById(data.user).subscribe((user: User) => {
          console.log(user);
          this.user = user;
        });

        this.review = data;
        this.isLoading = false;
      },
      (err) => (this.isError = err)
    );
  }
}
