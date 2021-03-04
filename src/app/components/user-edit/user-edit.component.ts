import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Review, User } from 'src/app/models/interfaces';
import { ReviewsService } from 'src/app/services/reviews.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  isEdit: boolean = false;
  isError: string = null;
  isLoading: boolean = false;
  user: User;
  uid: string = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private serviceReview: UsersService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  formAdd: any;

  ngOnInit(): void {
    const query = this.route.snapshot.queryParams;
    const id = this.route.snapshot.paramMap.get('id');
    this.uid = id;
    this.isEdit = query.type === 'edit' ? true : false;
    this.isEdit ? this.fetchProdToEdit(id) : '';
    console.log(query, id);
    this.formAdd = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      role: [null, Validators.required],
    });
  }
  //! get pReview by id param
  public fetchProdToEdit(id: string) {
    this.serviceReview.getUserById(id).subscribe((pro) => {
      this.user = pro;

      this.formAdd.patchValue(this.user);
    });
  }
  //! on submit
  public onSubmit() {
    this.isLoading = true;
    this.isError = null;
    console.log(this.formAdd.value);

    //! EDIT MODE

    this.serviceReview.EditUserById(this.uid, this.formAdd.value).subscribe(
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
