import { Component, OnInit } from '@angular/core';
import { PunkService } from '../../services/punk.service';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites = [];

  constructor(private punk: PunkService) { }

  ngOnInit() {

    this.getFavoritesFromLs();

    // subject listener to update the cart when items are added
    this.punk.addFavorite$.subscribe(res => {
      if (res) {
        this.getFavoritesFromLs();
      }
    })
  }

  // function to get items from LS and store them in a local variable
  getFavoritesFromLs() {
    if (!localStorage.getItem('favorites')) {
      this.favorites = [];
    } else {
      this.favorites = []
      setTimeout(() => {
        this.favorites = JSON.parse(localStorage.getItem('favorites'));
        }, 20)
    }
  }

  //function to remove item from favorites
  removeFromFavorites(brew, name){
    this.punk.onAddFavorite(brew, name);
    this.punk.spliceFavorites(brew)
    
  }

}


