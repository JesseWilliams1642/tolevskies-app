import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.page.html',
  styleUrls: ['./startup.page.scss'],
})
export class StartupPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  loginPage() {
  
    this.route.navigate(['/login']);
  
  }

  signupPage() {
  
    this.route.navigate(['/signup']);
  
  }

}
