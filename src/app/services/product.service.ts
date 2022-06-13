import { Product } from './../interfaces/product.type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private api = "https://fakestoreapi.com/products";

  constructor(private http: HttpClient) {}

  public getProducts() {
    return this.http.get<Product[]>(this.api);
  }

  public getProduct(id: number) {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  public createProduct(product: Product) {
    return this.http.post<Product>(this.api, product);
  }

  public updateProduct(product: Product, id: number) {
    return this.http.put<Product>(`${this.api}/${id}`, product);
  }

  public deleteProduct(id: number) {
    return this.http.delete<Product>(`${this.api}/${id}`);
  }
}
