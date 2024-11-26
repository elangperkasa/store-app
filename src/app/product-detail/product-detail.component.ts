import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.authService.getProductDetail(+productId).subscribe({
        next: (data) => {
          this.product = data;
        },
        error: () => {
          alert('Failed to load product details.');
        },
      });
    }
  }

  addToCart(): void {
    
    const cartItem = {
      productId: this.product.id,
      quantity: 1, 
    };

    this.http.post('https://fakestoreapi.com/carts', cartItem).subscribe({
      next: (response) => {
        alert('Product added to the cart!');
        this.router.navigate(['/cart']);
      },
      error: () => {
        alert('Failed to add product to cart.');
      },
    });
  }

  goToProductsPage(): void {
    this.router.navigate(['/products']);
  }
}
