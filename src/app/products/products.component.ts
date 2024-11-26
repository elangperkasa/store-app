import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true, 
  imports: [CommonModule, FormsModule] 
})

export class ProductsComponent implements OnInit {
  products: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // this.authService.getProducts().subscribe({
    //   next: (data) => (this.products = data),
    //   error: () => alert('Failed to load products.')
    // });

    this.authService.getCategories().subscribe({
      next: (data) => {
        console.log('Categories:', data); 
        this.categories = data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err); 
        alert('Failed to load categories.');
      }
    });
  

    this.loadProducts();
  }

  loadProducts(category: string = ''): void {
    if (category) {
      this.authService.getProductsByCategory(category).subscribe({
        next: (data) => (this.products = data),
        error: () => alert('Failed to load products.')
      });
    } else {
      this.authService.getProducts().subscribe({
        next: (data) => (this.products = data),
        error: () => alert('Failed to load products.')
      });
    }
  }

  onCategoryChange(): void {
    this.loadProducts(this.selectedCategory);
  }

  viewProductDetail(productId: number): void {
    this.router.navigate(['/product-detail', productId]);
  }

  toggleDescription(productId: number): void {
    const product = this.products.find((prod) => prod.id === productId);
    if (product) {
      product.showFullDescription = !product.showFullDescription;
    }
  }

  goToCartPage(): void {
    this.router.navigate(['/cart']); 
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);  
  }
}
