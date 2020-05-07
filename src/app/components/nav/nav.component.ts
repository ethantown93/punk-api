import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { PunkService } from '../../services/punk.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  favorites_counter: number = 0;
  cart_counter: number = 0
  favorites = [];
  response;


  constructor(private punk: PunkService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {

    this.punk.addFavorite$.subscribe( res => {
      if(res === 'add'){
        this.favorites_counter++
      } else if(res === 'minus'){
        this.favorites_counter--
      }
    })

    this.getFavoritesFromLs();

  }

  getBeerBrand(value){
    this.punk.getBrewBrand(value.beer_brand).subscribe( res => {

      this.response = res;
      console.log()

      if(this.response.length >= 1){
        this.punk.sendBrewDetails(this.response)
        this.router.navigate(['/beer-gallery'])
      } 
      else if(this.response.length < 1){
        this.openSnackBar('The brand name you entered was not found. Please try again', 'Dismiss')
      }
    })
  }

  getFavoritesFromLs(){
    if(!localStorage.getItem('favorites')){
      console.log('no items')
    } else {
      this.favorites = JSON.parse(localStorage.getItem('favorites'));
      this.favorites_counter = this.favorites.length;
    }

  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, { duration: 5000 });
  }

}
