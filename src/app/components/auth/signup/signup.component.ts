import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isError: string = null;
  isLoading: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private AuthService: AuthService,
    private snackBar: MatSnackBar,
    private route: Router
  ) {}

  ngOnInit(): void {}

  public onSubmit(form: NgForm) {
    this.isError = null;
    this.isLoading = true;
    console.log(form.value);
    //! signup service
    this.AuthService.signup(form.value).subscribe(
      (data: any) => {
        console.log('signup success', data);
        //! redirect to home page
        this.route.navigate(['/login']);
        //* toast if user logged in
        this.snackBar.open(`Hi ${data.userInfos.name}, please login `, 'Ok', {
          duration: 6000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.isLoading = false;
        form.reset();
      },
      (err) => {
        this.isError = err;
        this.isLoading = false;
      }
    );
  }
}
