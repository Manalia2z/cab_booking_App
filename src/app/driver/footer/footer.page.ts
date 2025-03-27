import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
  standalone:false
})
export class FooterPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  getActiveTab(tab: any)
  {
    if(window.location.href.includes(tab))
    {      
      return true;
    }
    else
    {
      return false;
    }
  }
}
