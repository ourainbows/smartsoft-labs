import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class ProductService {
  api = "https://fakestoreapi.com/products";

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.api);
  }
}
