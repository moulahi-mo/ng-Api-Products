import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @Input() isAuthNew: boolean;
  @Output() onMenu: EventEmitter<any> = new EventEmitter();

  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private route: Router
  ) {}

  ngOnInit(): void {}

  public onMenuClicked() {
    this.onMenu.emit();
  }
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
