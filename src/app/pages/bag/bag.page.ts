import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.page.html',
  styleUrls: ['./bag.page.scss'],
})
export class BagPage implements OnInit {

  accountDetails: any;
  accountItems: any;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {

    this.accountDetails = this.dataService.getData(1);
    this.accountItems = this.accountDetails.items;

  }

  ngOnInit() {

    setInterval(() => { this.dataTimer(); }, 1000);

  }

  dataTimer() {

    this.accountDetails = this.dataService.getData(1);
    this.accountItems = this.accountDetails.items;
    
  }

  
  goHome() {

    this.dataService.setData(1,this.accountDetails);
    this.router.navigate(['/mainmenu']);

  }

  goFlights() {

    this.dataService.setData(1,this.accountDetails);
    this.router.navigate(['/flights']);

  }

  goShop() {

    this.dataService.setData(1,this.accountDetails);
    this.router.navigate(['/shop']);

  }

  goBag() {

    this.dataService.setData(1,this.accountDetails);
    this.router.navigate(['/bag']);

  }

  goLuckyDip() {

    this.dataService.setData(1,this.accountDetails);
    this.router.navigate(['/luckydip']);

  }

}
