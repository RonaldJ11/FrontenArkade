import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ILogin } from '../../../models/ilogin';
import { AuthService } from '../../../../app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formNickName: string = '';
  formPassword: string = '';

  constructor(private authService: AuthService) {
  }
  onLogin() {
      console.log("you are logging in")
      this.authService.login(this.formNickName,this.formPassword)
    }
    
    ngOnInit(): void {
    }
  }
  