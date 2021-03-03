import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from './shared/material/material.module';
import { environment } from '../environments/environment';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { LoaderComponent } from './components/shared/loader/loader.component';
import { ErrorComponent } from './components/shared/error/error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ProductsComponent } from './components/products/products.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsAddComponent } from './components/products-add/products-add.component';
import { ReviewsAddComponent } from './components/reviews-add/reviews-add.component';
import { BannerComponent } from './components/banner/banner.component';
import { AuthService } from './services/auth.service';
import { ProductsService } from './services/products.service';
import { UsersService } from './services/users.service';
import { ReviewsService } from './services/reviews.service';
import { FilterComponent } from './components/shared/filter/filter.component';
import { NoDataComponent } from './components/shared/no-data/no-data.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ReviewDetailsComponent } from './components/review-details/review-details.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LoaderComponent,
    ErrorComponent,
    NotFoundComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ProductsComponent,
    ReviewsComponent,
    UsersComponent,
    ProductsAddComponent,
    ReviewsAddComponent,
    BannerComponent,
    FilterComponent,
    NoDataComponent,
    ProductDetailsComponent,
    ReviewDetailsComponent,
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, ProductsService, UsersService, ReviewsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
