import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService, ListItem } from '../services/data/data.service';
import { CartService } from '../services/cart/cart.service';

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
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.dataService.getInventorySubject().subscribe(() => {
      this.cartData = this.cartService.getCart();
      this.total = 0;
      this.cartData.forEach(item => {
        this.total += item.price;
      });
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onSubmit(data): void {
    // reset cart and localstorage
    // update quantities in the DB
  }

}
