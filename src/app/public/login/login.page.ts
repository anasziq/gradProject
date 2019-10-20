import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = ""
  password: string = ""

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    const {email,password}=this;
    console.log("the email is ", email,"the password is ", password);
    this.authService.login();
  }

  GoToRegister(){

    this.router.navigateByUrl('register');
  }
}
