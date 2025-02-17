import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://fakestoreapi.com/auth/login';
  private productsUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.loginUrl, { username, password });
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productsUrl);
  }

  getProductDetail(id: number): Observable<any> {
    return this.http.get<any>(`https://fakestoreapi.com/products/${id}`);
  }
  
  getCategories(): Observable<string[]> {
    const categoriesUrl = 'https://fakestoreapi.com/products/categories';
    return this.http.get<string[]>(categoriesUrl);
  }
  
  getProductsByCategory(category: string): Observable<any[]> {
    const categoryUrl = `https://fakestoreapi.com/products/category/${category}`;
    return this.http.get<any[]>(categoryUrl);
  }
  
  getCart(): Observable<any> {
    const cartUrl = 'https://fakestoreapi.com/carts';
    return this.http.get<any>(cartUrl);
  }
  
}

