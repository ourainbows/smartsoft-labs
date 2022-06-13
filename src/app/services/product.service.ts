import { Product } from './../interfaces/product.type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class ProductService {
  api = "https://fakestoreapi.com/products";

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this.api);
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post<Product>(this.api, product);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`${this.api}/${product.id}`, product);
  }
  
  deleteProduct(id: number) {
    return this.http.delete<Product>(`${this.api}/${id}`);
  }
}
