import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, ReplaySubject, Observable } from 'rxjs';
import { DataService, ListItem } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {

  private cart: Array<ListItem> = [];
  private cartDataUpdated$ = new ReplaySubject();
  private subscriptions = new Subscription();


  constructor(private dataService: DataService) {
    this.subscriptions.add(this.dataService.getInventorySubject().subscribe(reset => {
      if (reset) {
        this.resetCart();
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public addToCart(quantity: number, item: ListItem): void {
    this.dataService.updateItemInventory(-quantity, item);

    for (let index = 0; index < quantity; index++) {
      this.cart.push(item);
    }
    window.localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  public removeFromCart(index: number, itemId: number): void {
    this.dataService.getListItem(itemId).subscribe(data => {
      this.dataService.updateItemInventory(1, data);
    });
    this.cart.splice(index, 1);
    window.localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  public getCart(): Array<ListItem> {
    return this.cart;
  }

  public addStorageData(item: ListItem): void {
    this.cart.push(item);
    this.cartDataUpdated$.next();
  }

  public resetCart(): void {
    this.cart = [];
    window.localStorage.removeItem('cart');
    this.cartDataUpdated$.next();
  }

  public getCartDataUpdatedSubject(): Observable<any> {
    return this.cartDataUpdated$.asObservable();
  }
}
