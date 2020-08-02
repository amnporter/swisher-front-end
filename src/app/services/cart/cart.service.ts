import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService, ListItem } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {

  private cart: Array<ListItem> = [];
  private subscriptions = new Subscription();


  constructor(private dataService: DataService) {
    this.subscriptions.add(this.dataService.getInventorySubject().subscribe(reset => {
      if (reset) {
        this.resetCart();
      }
    }));
  }

  ngOnDestroy(): void{
    this.subscriptions.unsubscribe();
  }

  public addToCart(quantity: number, id: number): void {
    for (let index = 0; index < quantity; index++) {
      this.cart.push(this.dataService.getListItem(id));
    }

    window.localStorage.setItem('cart', JSON.stringify(this.cart));

    this.dataService.updateItemQuantity(-quantity, id);
  }

  public removeFromCart(index: number): void {
    const item = this.cart[index];
    this.cart.splice(index, 1);

    window.localStorage.setItem('cart', JSON.stringify(this.cart));

    this.dataService.updateItemQuantity(1, item.id);
  }

  public getCart(): Array<ListItem> {
    return this.cart;
  }

  public resetCart(): void {
    this.cart = [];
    window.localStorage.removeItem('cart');

  }
}
