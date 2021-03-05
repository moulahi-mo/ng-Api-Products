import { Injectable, OnDestroy } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, OnDestroy {
  constructor(private Auth: AuthService, private router: Router) {}
  unsb: Subscription;
  isAuth: boolean;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.unsb = this.Auth.AuthListner.subscribe((auth: boolean) => {
      this.isAuth = auth;
    });
    if (!this.isAuth) {
      this.router.navigate(['/login']);
    }

    return true;
  }
  ngOnDestroy() {
    this.unsb.unsubscribe();
  }
}
