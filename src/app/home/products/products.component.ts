import { Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Product } from "./../../interfaces/product.type";
import { ProductService } from "./../../services/product.service";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {}

  public formProduct: FormGroup;
  public productId = 0;

  public dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = ["id", "title", "price", "category"];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.formProduct = this.formBuilder.group({
      title: ["", [Validators.required]],
      price: ["", [Validators.required]],
      category: ["", [Validators.required]],
      description: ["", [Validators.required]],
      image: ["", [Validators.required]],
    });

    this.productService.getProducts().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  clickedRows = new Set<Product>();

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe((data) => {
      this.formProduct.patchValue(data);
      console.log("product loaded");
    });
    this.productId = id;
  }

  send() {
    console.log(this.formProduct.value);
  }
}
