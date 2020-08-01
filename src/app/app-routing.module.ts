import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemDescriptionComponent } from './item-description/item-description.component';
import { CartComponent } from './cart/cart.component';
import { ItemListComponent } from './item-list/item-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'item-list/:group',
    component: ItemListComponent
  },
  {
    path: 'item-description/:id',
    component: ItemDescriptionComponent
  },
  {
    path: 'checkout',
    component: CartComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
