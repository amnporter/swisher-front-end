import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReplaySubject, Observable, of } from 'rxjs';
import { take, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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

const API_URL = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private productList: Array<ListItem> = [];
  private inventoryUpdated$ = new ReplaySubject();

  constructor(private http: HttpClient, private router: Router) { }

  public getList(): Observable<ListItem[]> {
    return this.http.get<ListItem[]>(`${API_URL}/items`, this.getHttpOptions());
  }

  public getListItem(id: number): Observable<ListItem> {
    return this.http.get<ListItem>(`${API_URL}/items/${id}`, this.getHttpOptions());
  }

  public updateItemInventory(quantity: number, item: ListItem): void {
    const updatedInventory = item.inventory + quantity;
    item.inventory = updatedInventory;
    this.http.put(`${API_URL}/items/${item.id}`, item, this.getHttpOptions()).pipe(take(1)).subscribe(data => {
      this.inventoryUpdated$.next();
    }, err => {
      throw new Error(err);
    });
  }

  public getInventorySubject(): Observable<any> {
    return this.inventoryUpdated$.asObservable();
  }

  public replenishInventory(): void {
    this.http.get(`${API_URL}/items?replenish=true`, this.getHttpOptions()).pipe(take(1)).subscribe(data => {
      this.productList = data as ListItem[];
      this.inventoryUpdated$.next(true);
      this.router.navigate(['']);
    }, err => {
      throw new Error(err);
    });
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
