import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';


@NgModule({
  declarations: [ProductsComponent, DialogComponent, DialogContentComponent],
  imports: [CommonModule, ProductsRoutingModule, MatTableModule,MatPaginatorModule, ReactiveFormsModule],
})
export class ProductsModule {}
