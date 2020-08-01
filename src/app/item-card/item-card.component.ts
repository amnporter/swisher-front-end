import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ListItem } from '../services/data/data.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() itemData: ListItem;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public getInfo(id: number): void {
    console.log('getInfo', id);
    this.router.navigate(['/item-description', id]);
  }

}
