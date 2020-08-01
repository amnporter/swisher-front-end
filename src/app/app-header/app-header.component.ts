import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemGroup } from '../services/data/data.service';
import { DataService } from '../services/data/data.service';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  public itemGroup = ItemGroup;
  public cartLength = 0;
  private subscriptions = new Subscription();

  constructor(
    public dataService: DataService,
    public cartService: CartService
  ) {

  }

  ngOnInit(): void {
    this.subscriptions.add(this.dataService.getInventorySubject().subscribe(() => {
      this.cartLength = this.cartService.getCart().length;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
