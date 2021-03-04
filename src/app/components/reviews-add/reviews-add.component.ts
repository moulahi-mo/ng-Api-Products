import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from 'src/app/models/interfaces';
import { ReviewsService } from 'src/app/services/reviews.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-reviews-add',
  templateUrl: './reviews-add.component.html',
  styleUrls: ['./reviews-add.component.css'],
})
export class ReviewsAddComponent implements OnInit {
  isEdit: boolean = false;
  isError: string = null;
  isLoading: boolean = false;
  review: Review;
  uid: string = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private serviceReview: ReviewsService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  formAdd: any;

  ngOnInit(): void {
    const query = this.route.snapshot.queryParams;
    const id = this.route.snapshot.paramMap.get('id');

    this.isEdit = query.type === 'edit' ? true : false;
    this.isEdit ? this.fetchProdToEdit(id) : '';
    console.log(query, id);
    this.formAdd = this.fb.group({
      title: [null, Validators.required],
      text: [null, Validators.required],
      product: ['603a6037cc2d0434e82122d7', Validators.required],
      user: ['603cbdac36387a3a843ee483', Validators.required],
    });
  }
  //! get pReview by id param
  public fetchProdToEdit(id: string) {
    this.serviceReview.getReviewById(id).subscribe((pro) => {
      this.review = pro;
      this.uid = this.review.product;
      this.formAdd.patchValue(this.review);
    });
  }
  //! on submit
  public onSubmit() {
    this.isLoading = true;
    this.isError = null;
    console.log(this.formAdd.value);
    //! ADD MODE
    if (!this.isEdit) {
      this.serviceReview.addReview(this.formAdd.value).subscribe(
        (pro: Review) => {
          console.log(pro);
          this.isLoading = false;
          this.snackBar.open(
            `${this.formAdd.value.title} is successfullty added to database`,
            'undo',
            {
              duration: 4000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            }
          );

          this.formAdd.reset();
        },
        (err) => {
          this.isError = err;
          this.isLoading = false;
        }
      );
    }
    //! EDIT MODE
    else if (this.isEdit) {
      this.serviceReview
        .updateReviewById(this.uid, this.formAdd.value)
        .subscribe(
          (data) => {
            console.log(data);
            this.isLoading = false;
            this.snackBar.open(
              `${this.formAdd.value.title} is successfullty Updated in database`,
              'undo',
              {
                duration: 4000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              }
            );
            this.router.navigate(['/']);
            this.formAdd.reset();
          },
          (err) => {
            this.isError = err;
            this.isLoading = false;
          }
        );
    }
  }
}
