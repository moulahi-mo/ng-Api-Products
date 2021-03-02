import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ChildauthGuard } from './childauth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductsAddComponent } from './components/products-add/products-add.component';
import { ProductsComponent } from './components/products/products.component';
import { ReviewsAddComponent } from './components/reviews-add/reviews-add.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'add', component: ProductsAddComponent }],
  },
  {
    path: 'reviews',
    component: ReviewsComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'add', component: ReviewsAddComponent }],
  },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
