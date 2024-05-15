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
  rollEntrees: any;
  timerText: any;
  timer: any;

  itemWon: any;
  itemRolled: any;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) 
  {

    this.accountDetails = this.dataService.getData(1);
    this.lastRoll = new Date(this.accountDetails.lastRoll);
    this.rollEntrees = this.accountDetails.rollEntrees;

    this.itemRolled = false;

  }


  ngOnInit() {

    if (this.rollEntrees === 0) {

      let waitTime = 1209600000; // A fortnight
      
      let currentDate: any;
      currentDate = new Date();

      if (Math.abs(currentDate.getTime() - this.lastRoll.getTime()) > waitTime) {

        this.rollEntrees += 1;
        this.accountDetails.rollEntrees += 1;

        this.timerText = "00:00:00";
  
      } else {

        setInterval(() => { this.rollTimer(); }, 1000);

      }

    } else {

      this.timerText = "00:00:00";

    }

    setInterval(() => { this.dataTimer(); }, 1000);

  }

  dataTimer() {

    this.accountDetails = this.dataService.getData(1);
    this.lastRoll = new Date(this.accountDetails.lastRoll);
    this.rollEntrees = this.accountDetails.rollEntrees;

  }

  rollTimer() {

    let waitTime = 1209600000; // A fortnight

    let currentDate = new Date();

    let timeDiff = currentDate.getTime()-this.lastRoll.getTime()

    let timeLeft = waitTime - timeDiff;

    if (timeLeft <= 0) {

      this.timer.clearInterval()
      this.timerText = "00:00:00";
      this.rollEntrees += 1;
      this.accountDetails.rollEntrees += 1;

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

  roll() {

    let randomNum = Math.random() * 1000;

    if ((randomNum >= 0) && (randomNum < 300)) {

      this.itemWon = "200 Points";

    } else if ((randomNum >= 300) && (randomNum < 400)) {

      this.itemWon = "Bag of Nuts";

    } else if ((randomNum >= 400) && (randomNum < 500)) {

      this.itemWon = "Cookie";

    } else if ((randomNum >= 500) && (randomNum < 600)) {

      this.itemWon = "Coffee";

    } else if ((randomNum >= 600) && (randomNum < 700)) {

      this.itemWon = "53g Can of Pringles";

    } else if ((randomNum >= 700) && (randomNum < 800)) {

      this.itemWon = "300 Points";

    } else if ((randomNum >= 800) && (randomNum < 950)) {

      this.itemWon = "1000 Points";

    } else if ((randomNum >= 950) && (randomNum < 1000)) {

      this.itemWon = "Seat Upgrade to Business Class";

    }

    this.itemRolled = true; 

    this.rollEntrees -=1;
    this.accountDetails.rollEntrees -= 1;
    this.dataService.setData(1,this.accountDetails);


    // Handle adding it to account
    // If its something already in it, add to its quantity instead

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

