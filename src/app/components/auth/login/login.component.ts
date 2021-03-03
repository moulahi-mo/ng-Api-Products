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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isError: string = null;
  isLoading: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
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
    this.AuthService.login(form.value.email, form.value.password).subscribe(
      (user: any) => {
        //* toast if user logged in
        this.snackBar.open(`Welcome Back ${user.userInfos.name}`, 'Undo', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        //! redirect to home page
        this.route.navigate(['/']);
        console.log('logged in', user);

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
