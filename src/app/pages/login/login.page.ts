import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form!: FormGroup;
  emailInUse!: Boolean;
  incorrectPassword!: Boolean;

  constructor(private route: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.form = new LoginPageForm(this.formBuilder).createForm();
    this.emailInUse = true;
    this.incorrectPassword = false;

  }

  onTextClick() {

    this.emailInUse = true;
    this.incorrectPassword = false;

  }
  
  async onSubmit() {
    
    this.emailInUse = true;
    this.incorrectPassword = false;

    var inputEmail = this.form.value.email;
    var inputPassword = this.form.value.password;

    var jsonResponse = await fetch('./assets/accounts/accounts.json/').then(function(response) {

        return response.json();

    }).catch(e => console.error(e));

    let accountIndex = -1;

    for (let i = 0; i < jsonResponse.accounts.length; i++) {

      let email = jsonResponse.accounts[i].email;

      if (email === inputEmail) {

        accountIndex = i;
        break;

      }

    }

    if (accountIndex != -1) {

      var accountPassword = jsonResponse.accounts[accountIndex].password;

    } else {

      this.emailInUse = false;

      return;

    }

    // Check password

    if (inputPassword != accountPassword) {

      this.incorrectPassword = true;

      return;

    }

    let fileName = inputEmail.replace(/@/g,".");

    let fileDir = './assets/accounts/user_data/' + fileName + '.json/';

    var jsonResponse2 = await fetch(fileDir).then(function(response) {

      return response.json();

    }).catch(e => console.error(e));

    
    // Send data to main menu

    this.route.navigate(['/mainmenu', jsonResponse2]);
    
   
  }

  

  startupPage() {
  
    this.route.navigate(['/startup']);
  
  }

}
