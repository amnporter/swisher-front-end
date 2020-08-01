import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

export enum ItemGroup {
  CIGARS_CIGARELLOS = 'Cigars & Cigarellos',
  SMOKELESS = 'Smokeless',
  FILTERED_CIGARS = 'Filtered Cigars'
}

export interface ListItem {
  id: number;
  brandTitle: string;
  brandLogo: string;
  group: ItemGroup;
  itemImage: string;
  desc: string;
  inventory: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private productList: Array<ListItem> = [];
  private inventoryUpdated$ = new ReplaySubject();

  constructor() {
    for (let index = 0; index < 6; index++) {
      const element: ListItem = {
        id: index,
        brandTitle: 'Swisher Sweets LTO' + index,
        brandLogo: 'https://swisher.com/wp-content/uploads/2019/05/Swisher_LogoGrid_Logo_SwisherSweets_LTO.png',
        group: ItemGroup.CIGARS_CIGARELLOS,
        itemImage: 'https://swisher.com/wp-content/uploads/2020/03/Swisher_CC_LTO_640x640.png',
        desc: 'Where will Swisher take you next? Limited Edition hybrid blends push innovation to the next level. Our bold and unique cigarillos offer the perfect mix of sweet and satisfying. One thing’s for sure — enjoy ‘em before they’re gone.' + index,
        inventory: 10,
        price: 10.00
      };

      this.productList.push(element);
    }
    this.inventoryUpdated$.next();
  }

  public getDataList(): Array<any> {
    return this.productList;
  }

  public getListItem(id: number): ListItem {
    return this.productList.find(item => {
      return item.id === id;
    });
  }

  public getGroupList(group: ItemGroup): Array<ListItem> {
    console.log('group', group);
    return this.productList.filter(item => {
      return item.group === group;
    });
  }

  public updateItemQuantity(quantity: number, id: number): void {
    console.log('quantity', quantity);
    const idx = this.productList.findIndex((itm => itm.id === id));
    this.productList[idx].inventory = this.productList[idx].inventory + quantity;
    this.inventoryUpdated$.next();
  }

  public getInventorySubject(): Observable<any> {
    return this.inventoryUpdated$.asObservable();
  }
}
