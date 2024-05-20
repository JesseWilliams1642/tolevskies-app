import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';


@Component({
  selector: 'app-luckydip',
  templateUrl: './luckydip.page.html',
  styleUrls: ['./luckydip.page.scss'],
})
export class LuckydipPage implements OnInit {

  accountDetails: any;
  lastRoll: any;
  rollEntries: any;
  timerText: any;
  timer: any;
  canRoll: any;

  itemWon: any;
  itemRolled: any;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) 
  {

    this.accountDetails = this.dataService.getData(1);
    this.lastRoll = new Date(this.accountDetails.lastRoll);
    this.rollEntries = this.accountDetails.rollEntries;

    this.itemRolled = false;
    this.canRoll = true;

  }


  ngOnInit() {

    if (this.rollEntries === 0) {

      this.canRoll = false;

      let waitTime = 1209600000; // A fortnight
      
      let currentDate: any;
      currentDate = new Date();

      if (Math.abs(currentDate.getTime() - this.lastRoll.getTime()) > waitTime) {

        this.rollEntries += 1;
        this.accountDetails.rollEntries += 1;

        this.timerText = "00:00:00";

  
      } else {

        this.timer = setInterval(() => { this.rollTimer(); }, 1000);

      }

    } else {

      this.timerText = "00:00:00";

    }

    setInterval(() => { this.dataTimer(); }, 1000);

  }

  dataTimer() {

    this.accountDetails = this.dataService.getData(1);
    this.lastRoll = new Date(this.accountDetails.lastRoll);
    this.rollEntries = this.accountDetails.rollEntries;

    if ((this.rollEntries === 0) && (this.timer === undefined)) {

      this.timer = setInterval(() => { this.rollTimer(); }, 1000);

    }



  }

  rollTimer() {

    let waitTime = 1209600000; // A fortnight

    let currentDate = new Date();

    let timeDiff = currentDate.getTime()-this.lastRoll.getTime();

    let timeLeft = waitTime - timeDiff;

    if (timeLeft <= 0) {

      clearInterval(this.timer);
      this.timerText = "00:00:00";
      this.rollEntries += 1;
      this.accountDetails.rollEntries += 1;

      this.canRoll = true;

    } else {

      let daysLeft = timeLeft / (1000 * 60 * 60 * 24);
      let hoursLeft = (daysLeft % 1) * 60;
      let minutesLeft = (hoursLeft % 1) * 60;

      let dayZero = "";
      let hourZero = "";
      let minuteZero = "";

      if (daysLeft < 10) { dayZero = '0';}
      if (hoursLeft < 10) { hourZero = '0';}
      if (minutesLeft < 10) { minuteZero = '0';}

      this.timerText = dayZero + Math.floor(daysLeft).toString() + ':' + hourZero + Math.floor(hoursLeft).toString() + ':' + 
                          minuteZero + Math.floor(minutesLeft).toString();

      

    }

  }

  cantRoll() {

    this.itemRolled = false;
    this.canRoll = false;

  }

  roll() {

    

    this.canRoll = true;

    let randomNum = Math.random() * 1000;

    let hasItem = false;

    if ((randomNum >= 0) && (randomNum < 200)) {

      this.itemWon = "200 Points";
      
      this.accountDetails.points += 200;
      this.dataService.setData(1,this.accountDetails);

    } else if ((randomNum >= 200) && (randomNum < 400)) {

      this.itemWon = "a Bag of Nuts";

      for (let item of this.accountDetails.items) {

        if (item.itemName === "Bag of Nuts") {

          hasItem = true;
          item.quantity += 1;
          this.dataService.setData(1,this.accountDetails);

        }

      }

      if (!hasItem) {

        this.accountDetails.items.push({"itemName": "Bag of Nuts", "quantity": 1});
        this.dataService.setData(1,this.accountDetails);

      }


    } else if ((randomNum >= 400) && (randomNum < 500)) {

      this.itemWon = "a Cookie";

      for (let item of this.accountDetails.items) {

        if (item.itemName === "Cookie") {

          hasItem = true;
          item.quantity += 1;
          this.dataService.setData(1,this.accountDetails);

        }

      }

      if (!hasItem) {

        this.accountDetails.items.push({"itemName": "Cookie", "quantity": 1});
        this.dataService.setData(1,this.accountDetails);

      }

    } else if ((randomNum >= 500) && (randomNum < 600)) {

      this.itemWon = "a Coffee";

      for (let item of this.accountDetails.items) {

        if (item.itemName === "Coffee") {

          hasItem = true;
          item.quantity += 1;
          this.dataService.setData(1,this.accountDetails);

        }

      }

      if (!hasItem) {

        this.accountDetails.items.push({"itemName": "Coffee", "quantity": 1});
        this.dataService.setData(1,this.accountDetails);

      }

    } else if ((randomNum >= 600) && (randomNum < 700)) {

      this.itemWon = "a Can of Pringles";

      for (let item of this.accountDetails.items) {

        if (item.itemName === "Can of Pringles") {

          hasItem = true;
          item.quantity += 1;
          this.dataService.setData(1,this.accountDetails);

        }

      }

      if (!hasItem) {

        this.accountDetails.items.push({"itemName": "Can of Pringles", "quantity": 1});
        this.dataService.setData(1,this.accountDetails);

      }

    } else if ((randomNum >= 700) && (randomNum < 800)) {

      this.itemWon = "300 Points";

      this.accountDetails.points += 300;
      this.dataService.setData(1,this.accountDetails);

    } else if ((randomNum >= 800) && (randomNum < 950)) {

      this.itemWon = "1000 Points";

      this.accountDetails.points += 1000;
      this.dataService.setData(1,this.accountDetails);

    }  else if ((randomNum >= 950) && (randomNum < 1000)) {

      //this.itemWon = "a Seat Upgrade to Business Class";
      this.itemWon = "2000 Points";

      this.accountDetails.points += 2000;
      this.dataService.setData(1,this.accountDetails);

    }

    this.accountDetails.lastRoll = new Date();

    this.itemRolled = true; 
    this.rollEntries -= 1;
    this.accountDetails.rollEntries -= 1;
    this.dataService.setData(1,this.accountDetails);


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

