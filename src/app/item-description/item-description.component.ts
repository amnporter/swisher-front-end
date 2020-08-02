import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription } from 'rxjs';

import { DataService, ListItem } from '../services/data/data.service';
import { CartService } from '../services/cart/cart.service';


@Component({
  selector: 'app-item-description',
  templateUrl: './item-description.component.html',
  styleUrls: ['./item-description.component.scss']
})
export class ItemDescriptionComponent implements OnInit, OnDestroy {
  public quantity = 1;
  public inventory: number;
  public item: ListItem;
  private subscriptions = new Subscription();
  private routeParam: number;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {

    this.subscriptions.add(this.activatedRoute.params.subscribe(params => {
      console.log('param', params);
      this.routeParam = +params.id;
      this.item = this.dataService.getListItem(this.routeParam);
      console.log('this.item', this.item);
      this.inventory = this.item.inventory;
    }));

    this.subscriptions.add(this.dataService.getInventorySubject().subscribe(() => { this.updateInventory(); }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public addToCart(): void {
    this.cartService.addToCart(this.quantity, this.item.id);

    const message = `${this.quantity} ${this.item.brandTitle} has been added to the cart.`;
    const action = 'Checkout';
    this.snackBar.open(message, action, {
      duration: 5000,
    });
    this.snackBar._openedSnackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/checkout']);
    });

    this.quantity = 1;
  }

  private updateInventory(): void {
    console.log('updateInventory');
    if (!this.item) {
      this.item = this.dataService.getListItem(this.routeParam);
    }

    this.inventory = this.item.inventory;
  }
}
