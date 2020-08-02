import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemDescriptionComponent } from './item-description/item-description.component';
import { CartComponent } from './cart/cart.component';
import { ItemListComponent } from './item-list/item-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'item-list/:group',
    component: ItemListComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'item-description/:id',
    component: ItemDescriptionComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'checkout',
    component: CartComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
