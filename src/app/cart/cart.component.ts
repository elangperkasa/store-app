import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router  } from '@angular/router';

interface CartProduct {
  productId: number;
  quantity: number;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private http: HttpClient, 
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }


  loadCartItems(): void {
    this.http.get<any[]>('https://fakestoreapi.com/carts').subscribe({
      next: (carts) => {
        const allCartItems: any[] = [];
        carts.forEach(cart => {
          cart.products.forEach((productInCart: CartProduct) => {
            this.authService.getProductDetail(productInCart.productId).subscribe({
              next: (product: Product) => {
                allCartItems.push({
                  ...product,
                  quantity: productInCart.quantity,
                  cartId: cart.id,  
                });

                if (allCartItems.length === carts.reduce((acc, cart) => acc + cart.products.length, 0)) {
                  this.cartItems = allCartItems;
                }
              },
              error: () => {
                alert('Failed to load product details.');
              }
            });
          });
        });
      },
      error: () => {
        alert('Failed to load cart items.');
      }
    });
  }

  deleteProductFromCart(cartId: number, productId: number): void {
    this.http.delete(`https://fakestoreapi.com/carts/${cartId}`).subscribe({
      next: () => {
        alert('Item deleted successfully.');
        this.loadCartItems();  
      },
      error: () => {
        alert('Failed to delete item.');
      }
    });
  }

  goToProductsPage(): void {
    this.router.navigate(['/products']); 
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);  // Navigate to checkout page
  }
}
