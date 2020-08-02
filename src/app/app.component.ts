import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgeVerificationComponent } from './age-verification/age-verification.component';
import { CartService } from './services/cart/cart.service';
import { ListItem } from './services/data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private cartService: CartService) { }

  ngOnInit(): void {
    if (!window.sessionStorage.getItem('ageVerification')) {
      window.sessionStorage.setItem('ageVerification', 'true');

      this.dialog.open(AgeVerificationComponent);
    }

    const cartData: Array<ListItem> = JSON.parse(window.localStorage.getItem('cart'));
    if (cartData && (cartData[0] !== null || cartData[0] !== undefined)) {
      cartData.forEach(item => {
        this.cartService.addStorageData(item);
      });
    }
  }
}
