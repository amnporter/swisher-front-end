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
      this.routeParam = +params.id;
      this.updateItem();
    }));

    this.subscriptions.add(this.dataService.getInventorySubject().subscribe(() => { this.updateItem(); }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public addToCart(): void {
    this.cartService.addToCart(this.quantity, this.item);

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

  private updateItem(): void {
    this.dataService.getListItem(this.routeParam).subscribe((data: ListItem) => {
      this.item = data;
    });
  }
}
