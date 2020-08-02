import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService, ItemGroup, ListItem } from '../services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public slides = [
    { image: 'https://media.licdn.com/dms/image/C561BAQEdYDq31Ui2Ow/company-background_10000/0?e=2159024400&v=beta&t=boLs4viL58p5EkEeTXE1cB5CqkixGaP3KlR8_cvz3qU' },
    { image: 'https://swisher.com/wp-content/uploads/2019/05/Swisher_CC_Optimo_1440x400-2.png' },
    { image: 'https://swisher.com/wp-content/uploads/2019/05/Swisher_CC_Classics_1440x400.png' },
    { image: 'https://swisher.com/wp-content/uploads/2019/05/SS_Products_CigarsCigarillos_1140x340-1024x305.png' }
  ];

  public itemGroup = ItemGroup;
  public productList: Observable<ListItem[]>;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.productList = this.dataService.getList();
  }
}
