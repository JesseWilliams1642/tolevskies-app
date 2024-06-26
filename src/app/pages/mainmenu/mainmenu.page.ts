import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.page.html',
  styleUrls: ['./mainmenu.page.scss'],
})
export class MainmenuPage implements OnInit {

  accountDetails: any;
  firstName: any;
  points: any;
  membership: any;
  lastName: any;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {

    this.accountDetails = this.dataService.getData(1);
    this.firstName = this.accountDetails.firstName;
    this.points = this.accountDetails.points;
    this.membership = this.accountDetails.membership;
    this.lastName = this.accountDetails.lastName;

  }

  ngOnInit() {

    setInterval(() => { this.dataTimer(); }, 1000);

  }

  dataTimer() {

    this.accountDetails = this.dataService.getData(1);
    this.firstName = this.accountDetails.firstName;
    this.points = this.accountDetails.points;
    this.membership = this.accountDetails.membership;

  }


  signOut() {
  
    this.router.navigate(['/startup']);
  
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
