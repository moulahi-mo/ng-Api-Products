import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/interfaces';
import { ProductsService } from 'src/app/services/products.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css'],
})
export class ProductsAddComponent implements OnInit {
  isEdit: boolean = false;
  isError: string = null;
  isLoading: boolean = false;
  product: Product;
  uid: string = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private serviceProduct: ProductsService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  formAdd: any;

  ngOnInit(): void {
    const query = this.route.snapshot.queryParams;
    const id = this.route.snapshot.paramMap.get('id');
    this.uid = id;
    this.isEdit = query.type === 'edit' ? true : false;
    this.isEdit ? this.fetchProdToEdit(id) : '';
    console.log(query, id);
    this.formAdd = this.fb.group({
      brand: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required],
      discount: [null, Validators.required],
      id: [null, Validators.required],
      name: [null, Validators.required],
      newPro: [null],
      price: [null, Validators.required],
      sale: [null],
      salePrice: [null, Validators.required],
      shortDetails: [null, Validators.required],
      stock: [null, Validators.required],
      tags: [null],
      isFav: [false],
      isCart: [false],
      quantity: [0],
    });
  }
  //! get pproduct by id param
  public fetchProdToEdit(id: string) {
    this.serviceProduct.getProductById(id).subscribe((pro) => {
      this.product = pro;
      this.formAdd.patchValue(this.product);
    });
  }
  //! on submit
  public onSubmit() {
    this.isLoading = true;
    this.isError = null;
    console.log(this.formAdd.value);
    //! ADD MODE
    if (!this.isEdit) {
      this.serviceProduct.addProduct(this.formAdd.value).subscribe(
        (pro: Product) => {
          console.log(pro);
          this.isLoading = false;
          this.snackBar.open(
            `${this.formAdd.value.name} is successfullty added to database`,
            'undo',
            {
              duration: 4000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            }
          );

          this.formAdd.reset();
        },
        (err) => {
          this.isError = err;
          this.isLoading = false;
        }
      );
    }
    //! EDIT MODE
    else if (this.isEdit) {
      this.serviceProduct
        .updateProductById(this.uid, this.formAdd.value)
        .subscribe(
          (data) => {
            console.log(data);
            this.isLoading = false;
            this.snackBar.open(
              `${this.formAdd.value.name} is successfullty Updated in database`,
              'undo',
              {
                duration: 4000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              }
            );
            this.router.navigate(['/']);
            this.formAdd.reset();
          },
          (err) => {
            this.isError = err;
            this.isLoading = false;
          }
        );
    }
  }
}
