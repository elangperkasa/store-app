import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  checkoutData = {
    name: '',
    email: '',
    address: '',
    paymentMethod: '',
  };

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.authService.getCart().subscribe({
      next: (data) => {
        if (data.length > 0) {
          const firstCart = data[0];
          this.cartItems = firstCart.products.map((product: any) => ({
            id: product.productId,
            quantity: product.quantity,
          }));
        } else {
          this.cartItems = [];
        }
      },
      error: (err) => console.error('Error loading cart:', err),
    });
  }

  onSubmit(): void {
    console.log('Checkout Data:', this.checkoutData);
    alert('Order placed successfully!');
  }

  onPlaceOrder(checkoutForm: any): void {
    if (checkoutForm.invalid) {
      
      alert('Please fill in all required fields before placing the order.');
      return;
    }

    
    alert('Order placed successfully!');
    
    this.router.navigate(['/order-success']); 
  }

  goToCartPage(): void {
    this.router.navigate(['/cart']); 
  }

}
