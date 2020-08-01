import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {
  public groupList = [];
  private subscriptions = new Subscription();

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.subscriptions.add(this.activatedRoute.params.subscribe(params => {
      console.log('param', params);
      this.groupList = this.dataService.getGroupList(params.group);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
