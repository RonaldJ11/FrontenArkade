import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ILogin } from '../app/models/ilogin';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  api = 'https://localhost:44332/api';
  token: any;

  constructor(private http: HttpClient, private router: Router) {



  }

  login(nickName: string, password: string) {
    console.log(nickName+".."+ password);
    
    this.http.post(this.api + '/login', { nickName: nickName, password: password })
      .subscribe((resp: any) => {
        console.log(resp.token)
        sessionStorage.setItem('auth_token', resp.token);
        sessionStorage.setItem('user_info',nickName);
        this.router.navigate(['admin-manager']);
      });

    alert('Usuario o Contraseña Incorrecta **Error al conectar***')      
    }

  logout() {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user_info');
  }

  public get logIn(): boolean {
    return (sessionStorage.getItem('auth_token') !== null);
  }
}
