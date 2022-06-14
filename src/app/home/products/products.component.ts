import { DialogComponent } from "./dialog/dialog.component";

import { MatDialog } from "@angular/material/dialog";
import { Product } from "./../../interfaces/product.type";
import { ProductService } from "./../../services/product.service";
import { Component, OnInit, ViewChild } from "@angular/core";
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
    public dialog: MatDialog
  ) {}

  public dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = ["id", "title", "price", "category", "delete"];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  openDialog(id: number = 0) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (this.dataSource.data.find((product) => product.id === result.id)) {
        // id is already in the dataSource -> update
        this.dataSource.data.splice(
          this.dataSource.data.findIndex((product) => product.id === result.id),
          1,
          result
        );
        this.paginator._changePageSize(this.paginator.pageSize); // refresh page
      } else {
        // id is not in the dataSource -> create
        this.dataSource.data = [...this.dataSource.data, result];
      }
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteProduct(id: number, event: Event) {
    event.stopPropagation(); // prevent row click event
    this.productService.deleteProduct(id).subscribe((data) => {
      console.log("product deleted");
      this.dataSource.data = [
        ...this.dataSource.data.filter((product) => product.id !== id),
      ];
    });
  }

  clickedRows = new Set<Product>();
}
