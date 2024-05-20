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

  chosenBaggage: any;
  weightCost: any;

  chosenClass: any;
  classCost: any;

  itemQuantityRanges: any;
  itemSelectionQuantity: any;


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

    this.itemQuantityRanges = [];
    for (let i = 0; i < this.accountDetails.items.length; i++) {

      this.itemQuantityRanges.push(Array.from(Array(this.accountDetails.items[i].quantity + 1).keys()))
      
    }

  }

  back() { this.overlayOn = false; }



  addItemsButton() {

    let newItems = [];
    let toBeSpliced = [];

    for (let i = 0; i < this.accountDetails.items.length; i++) {

      // Remove quantity from accountDetails

      this.accountDetails.items[i].quantity -= this.itemSelectionQuantity[i];
      this.dataService.setData(1,this.accountDetails);

      // Add quantity to accountFlights.usedItems if item is already in usedItems

      let inUsedItems = false;

      for (let j = 0; j < this.accountFlights[this.flightIndex].usedItems.length; j++) {

        if (this.accountFlights[this.flightIndex].usedItems[j].itemName === this.accountDetails.items[i].itemName) {

          this.accountDetails.flights[this.flightIndex].usedItems[j].quantity += this.itemSelectionQuantity[i];
          this.dataService.setData(1,this.accountDetails);

          inUsedItems = true;

          break;

        } 
       
      }
        
      if ((!inUsedItems) && (this.itemSelectionQuantity[i] != 0)) {

          // Get objects that need to be added to usedItems

          newItems.push({"itemName": this.accountDetails.items[i].itemName, "quantity": this.itemSelectionQuantity[i]});

      }
      
      


      // Get index positions that need to be removed

      if (this.accountDetails.items[i].quantity === 0) {

        toBeSpliced.push(i);

      }

    }

    // Add objects to usedItems

    for (let i = 0; i < newItems.length; i++) {

      this.accountDetails.flights[this.flightIndex].usedItems.push(newItems[i]);
      this.dataService.setData(1,this.accountDetails);

    }


    // Remove objects from items

    for (let i = 0; i < toBeSpliced.length; i++) {

      let j = (toBeSpliced.length - 1) - i;

      this.accountDetails.items.splice(toBeSpliced[j],1);

      this.dataService.setData(1,this.accountDetails);

    }



    




    this.itemSelectionQuantity = [];
    for (let i = 0; i < this.accountDetails.items.length; i++) {

      this.itemSelectionQuantity.push(0);
      
    }

    this.back2();

  }


  selectionMade(event: any, index: any) {

    this.itemSelectionQuantity[index] = Number(event.detail.value);

  }





  pickBaggage(weight: any) {

    this.chosenBaggage = weight;

    this.weightCost = weight * 80;

  }

  pickClass(className: any) {

    this.chosenClass = className;
    
    if (className === "Economy Plus") { this.classCost = 5000; }
    if (className === "Business") { this.classCost = 10000; }
    if (className === "First") { this.classCost = 30000; }

  }

  purchaseClass() {

    this.accountDetails.points -= this.classCost;
    this.accountDetails.flights[this.flightIndex].class = this.chosenClass;
    this.accountFlights[this.flightIndex].class = this.chosenClass;

    this.dataService.setData(1,this.accountDetails);

  }

  purchaseBaggage() {

    this.accountDetails.points -= this.weightCost;
    this.accountDetails.flights[this.flightIndex].baggageAllowance = this.chosenBaggage;
    this.accountFlights[this.flightIndex].baggageAllowance = this.chosenBaggage;

    this.dataService.setData(1,this.accountDetails);

  }


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


    
    this.itemSelectionQuantity = [];
    for (let i = 0; i < this.accountDetails.items.length; i++) {

      this.itemSelectionQuantity.push(0);
      
    }




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

    this.itemQuantityRanges = [];
    for (let i = 0; i < this.accountDetails.items.length; i++) {

      this.itemQuantityRanges.push(Array.from(Array(this.accountDetails.items[i].quantity + 1).keys()))

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
