import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.page.html',
  styleUrls: ['./mainmenu.page.scss'],
})
export class MainmenuPage implements OnInit {

  constructor(private route: ActivatedRoute) {

    var accountDetails;

  }

  ngOnInit() {
  }

  accountDetails = this.route.params.subscribe(params => {

    return params["jsonResponse2"];
    
  });

}
