import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ChildauthGuard } from './childauth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { SignupComponent } from './components/auth/signup/signup.component';

import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsAddComponent } from './components/products-add/products-add.component';
import { ProductsComponent } from './components/products/products.component';
import { ReviewDetailsComponent } from './components/review-details/review-details.component';
import { ReviewsAddComponent } from './components/reviews-add/reviews-add.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, data: { animation: 'HomePage' } },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'products/add',
    component: ProductsAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products/edit/:id',
    component: ProductsAddComponent,
    canActivate: [AuthGuard],
  },
  { path: 'products/:id', component: ProductDetailsComponent },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reviews',
    component: ReviewsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reviews/add',
    component: ReviewsAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reviews/edit/:id',
    component: ReviewsAddComponent,
    canActivate: [AuthGuard],
  },
  { path: 'reviews/:id', component: ReviewDetailsComponent },
  { path: 'users', component: UsersComponent },
  {
    path: 'users/edit/:id',
    component: UserEditComponent,
    canActivate: [AuthGuard],
  },
  { path: 'users/:id', component: UserDetailsComponent },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
