import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  accountDetails: any;
  overlayOn: any;

  buyingPoints: any;
  buyingMerch: any;
  buyingEntries: any;
  buyingItems: any;


  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {

    this.accountDetails = this.dataService.getData(1);

    this.overlayOn = false;

    this.buyingPoints = false;
    this.buyingMerch = false;
    this.buyingEntries = false;
    this.buyingItems = false;


  }

  ngOnInit() {
    
    setInterval(() => { this.dataTimer(); }, 1000);

  }


  getPoints(points: any) {

    this.accountDetails.points += points;
    this.dataService.setData(1,this.accountDetails);

  }

  getEntries(num: any, points: any) {

    if (this.accountDetails.points >= points) {

      this.accountDetails.points -= points;
      this.accountDetails.rollEntries += num;
      this.dataService.setData(1,this.accountDetails);


    } 

  }


  getItem(boughtItem: any, points: any) {

    if (this.accountDetails.points >= points) {

      this.accountDetails.points -= points;
      this.dataService.setData(1,this.accountDetails);


      let hasItem = false;

      for (let item of this.accountDetails.items) {

        if (item.itemName === boughtItem) {

          hasItem = true;
          item.quantity += 1;
          this.dataService.setData(1,this.accountDetails);

        }

      }

      if (!hasItem) {

        this.accountDetails.items.push({"itemName": boughtItem, "quantity": 1});
        this.dataService.setData(1,this.accountDetails);

      }

    }

  }



  back() {

    this.overlayOn = false; 

    this.buyingPoints = false;
    this.buyingMerch = false;
    this.buyingEntries = false;
    this.buyingItems = false;

  }

  buyPoints() {

    this.overlayOn = true;
    this.buyingPoints = true;

  }

  buyMerch() {

    this.overlayOn = true;
    this.buyingMerch = true;

  }

  buyItems() {

    this.overlayOn = true;
    this.buyingItems = true;

  }

  buyEntries() {

    this.overlayOn = true;
    this.buyingEntries = true;

  }








  dataTimer() {

    this.accountDetails = this.dataService.getData(1);

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

