import { Component, OnInit } from '@angular/core';
import { UserapiService } from './../../userapi.service';
@Component({
  selector: 'app-ride-category',
  templateUrl: './ride-category.page.html',
  styleUrls: ['./ride-category.page.scss'],
  standalone:false
})
export class RideCategoryPage implements OnInit {

  constructor(private api:UserapiService) { }
  ride_category : any;
  ngOnInit() {
    this.api.ride_category().subscribe((res:any)=>{
      console.log(res);
      this.ride_category = res.data.category;
    })
  }

}
