import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReplaySubject, Observable } from 'rxjs';
import { take, map, catchError } from 'rxjs/operators';

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

const API_URL = 'http://localhost:3000/items';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private productList: Array<ListItem> = [];
  private inventoryUpdated$ = new ReplaySubject();

  constructor(private http: HttpClient, private router: Router) {

    this.http.get(API_URL, this.getHttpOptions()).pipe(take(1)).subscribe(data => {
      console.log('data', data);
      this.productList = data as ListItem[];
      this.inventoryUpdated$.next();
    }, err => {
      throw new Error(err);
    });
  }

  public getDataList(): Array<ListItem> {
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

  public replenishInventory(): void {
    this.http.get(`${API_URL}?replenish=true`, this.getHttpOptions()).pipe(take(1)).subscribe(data => {
      console.log('data', data);
      this.productList = data as ListItem[];
      this.inventoryUpdated$.next(true);
      this.router.navigate(['']);
    }, err => {
      throw new Error(err);
    });
  }

  public updateInventory(cartData: ListItem[]): void {
    const updateData = [...new Set(cartData)];
    updateData.forEach(async item => {
      this.http.put(`${API_URL}/${item.id}`, item, this.getHttpOptions()).pipe(take(1)).subscribe(data => {
        console.log('data', data);
      }, err => {
        throw new Error(err);
      });
    });
    this.inventoryUpdated$.next();
  }

  private getHttpOptions(): object {
    const httpOptions = {
      headers: {
        Authorization: `Bearer 1234567890`,
        contentType: 'application/json'
      }
    };
    return httpOptions;
  }
}
