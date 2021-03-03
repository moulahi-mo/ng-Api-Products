import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/interfaces';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  isError: string = null;
  isLoading: boolean = false;
  constructor(
    private ProductsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchProduct(id);
  }

  public fetchProduct(id: string) {
    this.isLoading = true;
    this.ProductsService.getProductById(id).subscribe(
      (data) => {
        console.log(data);
        this.product = data;
        this.isLoading = false;
      },
      (err) => (this.isError = err)
    );
  }
}
