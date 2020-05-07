import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { defaultThrottleConfig } from 'rxjs/internal/operators/throttle';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class PunkService {

  brewItems;
  favorites = []  

  private _brewDetailsSource = new Subject<Object>();
  brewDetails$ = this._brewDetailsSource.asObservable();

  private _addFavorite = new Subject<Object>();
  addFavorite$ = this._addFavorite.asObservable();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  sendBrewDetails(details){
    this._brewDetailsSource.next(details);
  }

  addNewFavorite(favorite){
    this._addFavorite.next(favorite)
  }

  getAllBrews(){
   return this.http.get('https://api.punkapi.com/v2/beers?page=1&per_page=50')
  }

  getBrewsOver5(alchoholPercent){
   return this.http.get(`https://api.punkapi.com/v2/beers?abv_gt=${alchoholPercent}`)
  }

  getBrewsunder5(alchoholPercent){
    return this.http.get(`https://api.punkapi.com/v2/beers?abv_lt=${alchoholPercent}`)
   }

  filteredBrews(startDate, endDate, alcContent1, alcContent2){
    return this.http.get(`https://api.punkapi.com/v2/beers?brewed_after=${startDate}&brewed_before=${endDate}&abv_gt=${alcContent1}&abv_lt=${alcContent2}`)
  }

  getBrewBrand(brand){
    return this.http.get(`https://api.punkapi.com/v2/beers?beer_name=${brand}`)
  }

  onAddFavorite(brew, name){
    this.openSnackBar(`${name} has been added to your favorites`, 'Dismiss')

    // check to see if items exist in LS
    if (!localStorage.getItem('favorites')) {

      this.favorites = [];
      // if no favorites exist, push selected item to favorites array
      this.favorites.push(brew);
      // stringify favorites array and push to LS
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
      this.addNewFavorite('add');

    } else {
      // if favorites exist in LS grab them and parse them back into JSON
      this.favorites = JSON.parse(localStorage.getItem('favorites'))

        // check cart for duplicate itms
        if (this.favorites.length > 0) {
          for (let item of this.favorites) {
            if (item.id === brew.id) {
                this.removeItem(brew);
                this.openSnackBar(`${name} has been removed from your favorites`, 'Dismiss')
                this.addNewFavorite('minus');
                return;
            }
          }
        }

      this.favorites.push(brew);
      this.addNewFavorite('add');
      // reset favorites in LS
      localStorage.setItem('favorites', JSON.stringify(this.favorites))

    }
  }

    // function to get items from LS and remove the selected cart item
    removeItem(product) {
      let items = JSON.parse(localStorage.getItem('favorites'));
      items.forEach((item, index) => {
        if (product.id === item.id) {
          items.splice(index, 1);
          localStorage.setItem('favorites', JSON.stringify(items));
          this.favorites = JSON.parse(localStorage.getItem('items'));
        }
      })
    }
  
    openSnackBar(message, action) {
        this.snackBar.open(message, action, { duration: 3000 });
    }

    spliceFavorites(brew){

      let items = JSON.parse(localStorage.getItem('brews'));
  
        items.forEach((item, index) => {
  
          if(item.id === brew.id) {
            item.isFavorite = !item.isFavorite
            localStorage.setItem('brews', JSON.stringify(items));
          }
        })
    }

}