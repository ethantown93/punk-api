import { Component, OnInit, Inject } from '@angular/core';
import { BeerGalleryComponent } from '../beer-gallery.component';
import { MatDialogRef } from "@angular/material";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent implements OnInit {

  brew;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<BroadcastChannel>) { }

  ngOnInit() {

    this.brew = this.data;
    console.log(this.brew)

  }

  close() {
    this.dialogRef.close();
  }

}
