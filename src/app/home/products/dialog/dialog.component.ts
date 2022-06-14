import { Product } from './../../../interfaces/product.type';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from "@angular/forms";
import { ProductService } from './../../../services/product.service';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}

  public formProduct: FormGroup;
  public productId = 0;

  ngOnInit(): void {
    this.formProduct = this.formBuilder.group({
      title: ["", [Validators.required]],
      price: ["", [Validators.required]],
      category: ["", [Validators.required]],
      description: ["", [Validators.required]],
      image: ["", [Validators.required]],
    });
    if (this.data.id) {
      this.getProduct(this.data.id);
    }
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe((data) => {
      this.formProduct.patchValue(data);
      console.log("product loaded");
    });
    this.productId = id;
  }

  createProduct() {
    this.productService
      .createProduct(this.formProduct.value)
      .subscribe((data) => {
        console.log("product created");
        this.dialogRef.close(data);
      });
    this.formProduct.reset();
  }

    updateProduct() {
    this.productService
      .updateProduct(this.formProduct.value, this.productId)
      .subscribe((data) => {
        console.log("product updated")
        this.dialogRef.close(data);
      });
    this.formProduct.reset();
  }
}
