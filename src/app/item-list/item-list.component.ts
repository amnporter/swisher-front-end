import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DataService, ItemGroup, ListItem } from '../services/data/data.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {
  public groupList = [];
  private subscriptions = new Subscription();
  private routeParam: ItemGroup;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.subscriptions.add(this.activatedRoute.params.subscribe(params => {
      this.routeParam = params.group;
      this.subscriptions.add(this.dataService.getList().subscribe((data: Array<ListItem>) => {
        this.groupList = data.filter(item => {
          return item.group === this.routeParam;
        });
      }));
    }));

    this.subscriptions.add(this.dataService.getInventorySubject().subscribe(() => {
      if (this.groupList.length <= 0) {
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
