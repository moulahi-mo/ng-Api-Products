import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @Input() sidebar: MatSidenav;
  @Input() isAuth: boolean;
  constructor(
    private auth: AuthService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  public onLogout() {
    this.auth.logout().subscribe((data) => {
      this.route.navigate(['/']);
      console.log(data);
      this.snackBar.open(` login out ...`, 'undo', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });
  }
}
