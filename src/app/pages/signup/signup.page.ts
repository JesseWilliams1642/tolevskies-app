import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SignupPageForm } from './signup.page.form';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  form!: FormGroup;
  emailInUse!: Boolean;

  constructor(private route: Router, private formBuilder: FormBuilder, private dataService : DataService) { }

  ngOnInit() {

    this.form = new SignupPageForm(this.formBuilder).createForm();
    this.emailInUse = false;

  }

  async onSubmit() {
    
    this.emailInUse = false;

    var inputFirstName = this.form.value.firstName;
    var inputLastName = this.form.value.lastName;
    var inputPhoneNum = this.form.value.phoneNum;
    var inputEmail = this.form.value.email;
    var inputDOB = this.form.value.dateOfBirth;
    var inputPassword = this.form.value.firstName;

    // Check if email is already in the file

    var jsonResponse = await fetch('./assets/accounts/accounts.json/').then(function(response) {

      return response.json();

    }).catch(e => console.error(e));

    for (let i = 0; i < jsonResponse.accounts.length; i++) {

      if (inputEmail === jsonResponse.accounts[i].email) {

        this.emailInUse = true;
        return;

      }

    }
    

    // Adding to accounts.json

    /* var newAccount = {

      email: inputEmail,
      password: inputPassword

    }

    jsonResponse.accounts.push(newAccount);

    let fileData = JSON.stringify(jsonResponse, null, 2);

    */
    
    ///////////////////////////////////////////////////////////////////////////////////////////
    //
    //    I have learnt that base JS, TS and Angular do not allow for creating or writing
    //    to files. I wish I had chosen Node.js sooner so I could use its fs library. :(
    //
    ///////////////////////////////////////////////////////////////////////////////////////////

    // create new user_data json file

    let newAccount = {

      firstName: inputFirstName,
      lastName: inputLastName,
      dateOfBirth: inputDOB,
      phoneNumber: inputPhoneNum,
      points: 0,
      lastRoll: "01/01/2000",

      tickets: [],
      items: []

    }


    // navigate to main menu with new account

    this.dataService.setData(1,newAccount);
    this.route.navigate(['/mainmenu']);
  
  }

  onTextClick() { this.emailInUse = false; }

  startupPage() {
  
    this.route.navigate(['/startup']);
  
  }

}
