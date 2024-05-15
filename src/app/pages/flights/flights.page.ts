import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.page.html',
  styleUrls: ['./flights.page.scss'],
})
export class FlightsPage implements OnInit {
  
  accountDetails: any;
  accountFlights: any;
  overlayOn: any;
  pointsOwed: any;
  flightIndex: any;
  optionChosen: any;

  flightChosen: any;
  wifiChosen: any;
  luggageChosen: any;
  itemsChosen: any;
  wifiCost: any;
  canPayWifi: any;


  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {

    this.accountDetails = this.dataService.getData(1);
    this.accountFlights = this.accountDetails.flights;

    this.overlayOn = false;
    this.optionChosen = false;

    this.flightChosen = false;
    this.wifiChosen = false;
    this.luggageChosen = false;
    this.itemsChosen = false;

    this.canPayWifi = true;

    this.pointsOwed = [];

    for (let i = 0; i < this.accountFlights.length; i++) {

      let points = Math.round(this.accountFlights[i].duration * 150);

      this.pointsOwed.push(points);

    }

  }

  back() { this.overlayOn = false; }

  addWifi() {

    let wifiCost = 100 * this.accountFlights[this.flightIndex].duration;

    if (this.accountDetails.points > wifiCost) {

      this.accountDetails.points -= wifiCost;
      this.accountDetails.flights[this.flightIndex].usedItems.push({"itemName": "Wi-Fi", "quantity": 1})

      this.dataService.setData(1,this.accountDetails);

      this.optionChosen = false;
      this.wifiChosen = false;

    }
      
    this.canPayWifi = false;

  }




  upgradeFlight() {

    this.optionChosen = true;
    this.flightChosen = true;

  }

  getWifi() {

    let hasWifi = false;

    for (let i = 0; i < this.accountFlights[this.flightIndex].usedItems.length; i++) {

      if (this.accountFlights[this.flightIndex].usedItems[i].itemName == "Wi-Fi") {

        hasWifi = true;

      }

    }

    if (!hasWifi) {

      this.optionChosen = true;
      this.wifiChosen = true;

    } 

    

    

  }

  luggageAllowance() {

    this.optionChosen = true;
    this.luggageChosen = true;

  }

  addItems() {

    this.optionChosen = true;
    this.itemsChosen = true;

  }

  back2() {

    this.optionChosen = false;
    this.flightChosen = false;
    this.wifiChosen = false;
    this.luggageChosen = false;
    this.itemsChosen = false;

  }






  ngOnInit() {

    setInterval(() => { this.dataTimer(); }, 1000);

  }

  openTicket(i: any) {

    if (this.accountFlights[i].status === "complete") {

      this.accountDetails.points += Math.round(this.accountFlights[i].duration * 150);
      this.accountDetails.flights.splice(i,1);

      this.dataService.setData(1,this.accountDetails);

    } else {

      this.overlayOn = true;

      this.flightIndex = i;

    }

  }

  dataTimer() {

    this.accountDetails = this.dataService.getData(1);
    
    this.pointsOwed = [];

    for (let i = 0; i < this.accountFlights.length; i++) {

      let points = Math.round(this.accountFlights[i].duration * 150);

      this.pointsOwed.push(points);

    }

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
