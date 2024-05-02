import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  signup() {
    
    // To be replaced with checking if conflicting email, and then
    // adding to .json files
    this.route.navigate(['/mainmenu']);
  
  }

  startupPage() {
  
    this.route.navigate(['/startup']);
  
  }

}
