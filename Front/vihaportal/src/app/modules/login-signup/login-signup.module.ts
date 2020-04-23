import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginSignupRoutingModule } from './login-signup-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';


@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    LoginSignupRoutingModule
  ]
})
export class LoginSignupModule { }
