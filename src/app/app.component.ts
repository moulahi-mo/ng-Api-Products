import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { slideInAnimation } from './shared/slideInAnimation.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private auth: AuthService) {}
  isAuth: boolean = false;
  unsb: Subscription;
  ngOnInit() {
    this.auth.autoAUth();
    //! invok perssiste auth
    this.unsb = this.auth.AuthListner.subscribe((state) => {
      this.isAuth = state;
      console.log(this.isAuth, state, 'user state');
    });
  }
  ngAfterViewInit() {}
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
  ngOnDestroy() {
    this.unsb.unsubscribe();
  }
}
