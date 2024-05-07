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

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {

   
    this.accountDetails = this.dataService.getData(1);

    this.firstName = this.accountDetails.firstName;
    this.points = this.accountDetails.points;

  }

  ngOnInit() {
  }


  signOut() {
  
    this.router.navigate(['/startup']);
  
  }

}
