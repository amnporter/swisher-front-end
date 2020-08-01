import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { HomeComponent } from './home/home.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { ItemDescriptionComponent } from './item-description/item-description.component';
import { FooterComponent } from './footer/footer.component';

import { MatCarouselModule } from '@ngmodule/material-carousel';
import { CartComponent } from './cart/cart.component';
import { ItemListComponent } from './item-list/item-list.component';
import { AgeVerificationComponent } from './age-verification/age-verification.component';


@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    AppHeaderComponent,
    PostListComponent,
    HomeComponent,
    ItemCardComponent,
    ItemDescriptionComponent,
    FooterComponent,
    CartComponent,
    ItemListComponent,
    AgeVerificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MatCarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
