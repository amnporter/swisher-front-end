import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService, ItemGroup } from '../services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public slides = [
    { image: 'https://media.licdn.com/dms/image/C561BAQEdYDq31Ui2Ow/company-background_10000/0?e=2159024400&v=beta&t=boLs4viL58p5EkEeTXE1cB5CqkixGaP3KlR8_cvz3qU' },
    { image: 'https://swisher.com/wp-content/uploads/2019/05/Swisher_CC_Optimo_1440x400-2.png' },
    { image: 'https://swisher.com/wp-content/uploads/2019/05/Swisher_CC_Classics_1440x400.png' },
    { image: 'https://swisher.com/wp-content/uploads/2019/05/SS_Products_CigarsCigarillos_1140x340-1024x305.png' }
  ];

  public itemGroup = ItemGroup;

  public productList = [];

  private subscriptions = new Subscription();


  constructor(
    private dataService: DataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.dataService.getInventorySubject().subscribe(() => {
      this.productList = this.dataService.getDataList();
      console.log('this.productList', this.productList);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public gotoGroup(group: ItemGroup): void {
    this.router.navigate(['/item-list', group]);
  }
}
