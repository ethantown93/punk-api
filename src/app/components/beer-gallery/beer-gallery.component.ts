import { Component, OnInit } from '@angular/core';
import { formatDate, DatePipe } from "@angular/common";

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import AOS from 'aos';
import { MatDialog } from '@angular/material/dialog';
import { PunkService } from '../../services/punk.service';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { resolve } from 'url';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';
import { NgFormSelectorWarning } from '@angular/forms';

@Component({
  selector: 'app-beer-gallery',
  templateUrl: './beer-gallery.component.html',
  styleUrls: ['./beer-gallery.component.scss']
})
export class BeerGalleryComponent implements OnInit {

  brews;
  datePickerConfig: Partial<BsDatepickerConfig>

  constructor(private punk: PunkService, public dialog: MatDialog) {
    this.datePickerConfig = Object.assign({},
      {containerClass:'theme-orange'})
   }

  ngOnInit() {

    AOS.init();
    
    this.punk.getAllBrews().subscribe(res => {

      let ls = JSON.parse(localStorage.getItem('brews'));

      if(ls) {
       this.brews = ls
      } else {
        this.getData(res);

      }
    });

    this.punk.brewDetails$.subscribe( res => {
      if(res) {
        this.brews = res;
      }
    })

  }

  over5Percent(percent){
    this.punk.getBrewsOver5(5).subscribe( res => {
      this.getData(res);
    })
  }

  under5Percent(percent){
    this.punk.getBrewsunder5(percent).subscribe( res => {
      this.getData(res);
    })
  }

  dateSubmit(val){

    let alchohol = val.alcContent.split(',')

    let firstAlcInput = alchohol[0];
    let secondAlcInput = alchohol[1];

    const format = 'MM-yyyy';
    const locale = 'en-US'

    const firstDate = formatDate(val.firstDate, format, locale)
    const secondDate = formatDate(val.secondDate, format, locale)

    console.log(firstDate, secondDate, firstAlcInput, secondAlcInput)

    this.punk.filteredBrews(firstDate, secondDate, firstAlcInput, secondAlcInput).subscribe( res => {
      this.getData(res)
    })
  }

  brandSearch(brand){
    this.punk.getBrewBrand(brand.brandName).subscribe( res => {
      this.getData(res);
    })
  }

  getData(res){
    if(res.length > 0){
      this.brews = res;
      for( let i = 0; i < this.brews.length; i++){
        this.brews[i].isFavorite = false;
      }

      localStorage.setItem('brews', JSON.stringify(this.brews));

    } else {
      this.brews = undefined;
    }
  }

  onSelectBrew(brew){
    this.punk.sendBrewDetails(brew);
  }

  addFavorite(brew, name){
    console.log(brew.isFavorite)
    this.punk.onAddFavorite(brew, name)

    setTimeout(()=> {
      this.punk.spliceFavorites(brew)
    }, 200)

  }

  openDialog(brew) {
    const dialogRef = this.dialog.open(BeerDetailsComponent, { data: brew });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
