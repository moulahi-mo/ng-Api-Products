import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Review } from 'src/app/models/interfaces';
import { ReviewsService } from 'src/app/services/reviews.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit, AfterViewInit {
  constructor(
    private serviceReviews: ReviewsService,
    private snackBar: MatSnackBar
  ) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  isError: string = null;
  isLoading: boolean = false;
  reviews: Review[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Review>();
  displayedColumns: string[] = ['title', 'text', 'createdAt', 'action'];

  ngOnInit(): void {
    this.fetchAllReviews();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public fetchAllReviews() {
    this.isLoading = true;
    this.serviceReviews.GetAllReviews().subscribe(
      (data: any) => {
        console.log(data.data);
        this.dataSource.data = data.data;
        this.reviews = data.data;
        this.isLoading = false;
      },
      (err) => (this.isError = err)
    );
  }

  public onFilter(term: string) {
    console.log(term);
    this.dataSource.filter = term;
  }

  public onRemove(review: Review) {
    if (confirm('Are you sure ?')) {
      this.serviceReviews.deleteReviewById(review.product).subscribe(() => {
        this.snackBar.open(`${review.title} is successfully deleted`, 'undo', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
    }
  }
}
