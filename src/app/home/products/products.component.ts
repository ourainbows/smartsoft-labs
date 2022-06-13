import { Product } from './../../interfaces/product.type';
import { ProductService } from './../../services/product.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  constructor(private productService: ProductService) {}

  public dataSource : MatTableDataSource<Product>;
  displayedColumns: string[] = ["id", "title", "price", "category"];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  clickedRows = new Set<Product>();

  openProduct(id: number) {
    console.log(id);
  }
}
