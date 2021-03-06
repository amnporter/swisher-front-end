
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DataService, ListItem } from '../services/data/data.service';
import { CartService } from '../services/cart/cart.service';
import { CartCompletedComponent } from '../cart-completed/cart-completed.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  public cartData: Array<ListItem> = [];
  public total: number;
  private subscriptions = new Subscription();


  constructor(
    public cartService: CartService,
    private dataService: DataService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.dataService.getInventorySubject().subscribe(() => { this.updateCartData(); }));
    this.subscriptions.add(this.cartService.getCartDataUpdatedSubject().subscribe(() => { this.updateCartData(); }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onSubmit(data): void {
    this.dialog.open(CartCompletedComponent, { disableClose: true });
    this.cartService.resetCart();
  }

  private updateCartData(): void {
    this.cartData = this.cartService.getCart();
    this.total = 0;
    this.cartData.forEach(item => {
      this.total += item.price;
    });
  }
}
