import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { InlineSVGModule } from 'ng-inline-svg';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { BeerGalleryComponent } from './components/beer-gallery/beer-gallery.component';
import { BeerDetailsComponent } from './components/beer-gallery/beer-details/beer-details.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';

import { PunkService } from './services/punk.service';

import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FavoritesComponent } from './components/favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    BeerGalleryComponent,
    BeerDetailsComponent,
    SideNavComponent,
    FavoritesComponent
  ],
  entryComponents: [BeerDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    InlineSVGModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    MatDialogModule
  ],
  providers: [PunkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
