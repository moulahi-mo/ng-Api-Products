import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/interfaces';
import { ProductsService } from 'src/app/services/products.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  constructor(
    private serviceProducts: ProductsService,
    private snackBar: MatSnackBar
  ) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  isError: string = null;
  isLoading: boolean = false;
  products: Product[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'action'];

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public fetchAllProducts() {
    this.isLoading = true;
    this.serviceProducts.GetAllProducts().subscribe(
      (data: any) => {
        console.log(data.data);
        this.dataSource.data = data.data;
        this.products = data.data;
        this.isLoading = false;
      },
      (err) => (this.isError = err)
    );
  }

  public onFilter(term: string) {
    console.log(term);
    this.dataSource.filter = term;
  }

  public onRemove(product: Product) {
    if (confirm(`Are you sure to want to delete ${product.name}  ?`)) {
      this.serviceProducts.deleteProductById(product._id).subscribe((res) => {
        console.log(res);
        this.snackBar.open(`${product.name} is successfully deleted`, 'undo', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
    }
  }
}
