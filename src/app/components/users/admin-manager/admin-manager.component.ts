import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from '../../../models/ilogin';
import { IUserInfo } from '../../../models/iuser-info';
import { AuthService } from '../../../auth.service';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { IClients } from './../../../models/iclients';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './../../dialog/confirm-dialog/confirm-dialog.component';
import { CreateClientsComponent } from './../../dialog/create-clients/create-clients.component';
import { ChanguePasswordComponent } from './../../dialog/changue-password/changue-password.component';


@Component({
  selector: 'app-admin-manager',
  templateUrl: './admin-manager.component.html',
  styleUrls: ['./admin-manager.component.css']
})
export class AdminManagerComponent implements OnInit, OnDestroy {

  userList: IUserInfo[] = [];
  clientList: IClients[]=[];
  bodyText: string;

  userInfo: IUserInfo = {
    active: true,
    fullNames: '',
    nickName: '',
    id: 0,
    typeAccount: true,
    userIdentification: 'adda'
  };
  subRef$: Subscription | undefined;



  constructor(private authService: AuthService, private router: Router, private http: HttpClient,public dialog: MatDialog) {
    this.isLogIn();
  }

  isLogIn() {
    if (!this.authService.logIn) {
      alert("***** NO PUEDES ACCEDER PORFAVOR INICIA SESSION *****")
      this.router.navigate(['']);
    }
    if (!this.userInfo.active) {
      alert("***** Lo siento, Tu usuario esta inactivo ;-; Comunicate con el gefe pa que te lo active y si no lo hace que se vaya pa la monda *****")
      this.logout();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.bodyText = 'This text can be updated in modal 1';

    let httpsHeaders: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('auth_token');
    httpsHeaders = httpsHeaders.append('Authorization', 'Bearer ' + token)

    this.subRef$ = this.http.get<IUserInfo[]>('https://localhost:44332/api/Users', {
      headers: httpsHeaders,
      observe: 'response'
    }).subscribe(res => {
      this.userList = res.body || [];
      this.valideUser();
    }, err => {
      console.log("Error Usuario", err);
    }
    );

    //--- Clientes lista
    this.subRef$ = this.http.get<IClients[]>('https://localhost:44332/api/Clients', {
      headers: httpsHeaders,
      observe: 'response'
    }).subscribe(res => {
      this.clientList = res.body || [];
      this.valideUser();
    }, err => {
      console.log("Error Usuario", err);
    }
    );
  }


  valideUser() {
    var end: boolean = true;
    var i: number = 0;
    const user = sessionStorage.getItem('user_info');
    var list = this.userList || [];
    while (end || i < list.length) {
      if (list[i].nickName == user) {
        this.userInfo = list[i];
        end = false;
      }
      i++;
    }
  }



  remove(id: string , type:number) {
    let httpsHeaders: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('auth_token');
    httpsHeaders = httpsHeaders.append('Authorization', 'Bearer ' + token)


    if (type==1) {
    this.subRef$ = this.http.delete<IUserInfo[]>('https://localhost:44332/api/Users/' + id, {
      headers: httpsHeaders,
      observe: 'response'
    }).subscribe(res => {
      location.reload();
      alert('El Usuario se ha borrado correctamente');
    }, err => {
      console.log("Error Eliminar  Usuario", err);
    }
    );  
    }else{
      this.subRef$ = this.http.delete<IClients[]>('https://localhost:44332/api/Clients/' + id, {
      headers: httpsHeaders,
      observe: 'response'
    }).subscribe(res => {
      location.reload();
      alert('El CLiente se ha borrado correctamente');
    }, err => {
      console.log("Error Eliminar  CLiente", err);
    }
    );
    }

    
  }

  onSwitch(id: number) {
    let httpsHeaders: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('auth_token');
    httpsHeaders = httpsHeaders.append('Authorization', 'Bearer ' + token)
    var user = this.search(id);
    this.subRef$ = this.http.put('https://localhost:44332/api/Users/' + user?.id,{
        id:user?.id,
        nickName: user?.nickName,
        userIdentification: user?.userIdentification,
        fullNames:user?.fullNames,
        typeAcount: user?.typeAccount,
        active:! user?.active
    }).subscribe(res => {
      location.reload();
      alert('El Usuario se ha borrado correctamente');
    }, err => {
      console.log("Error Editar  Usuario", err);
    }
    );
  }



  passwordUpdate(password : string){

  let httpsHeaders: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('auth_token');
    httpsHeaders = httpsHeaders.append('Authorization', 'Bearer ' + token)

    this.subRef$ = this.http.put('https://localhost:44332/api/Users/login/' +this.userInfo.nickName,{
      nickName:this.userInfo.nickName,
      password:password
    }).subscribe(res => {
      location.reload();
      alert('El Usuario se ha Cambiado la contraseña correctamente');
    }, err => {
      console.log("Error Editar  Usuario", err);
    }
    );
  }

  search(id: number) {
    var i: number = 0;
    var list = this.userList || [];
    while (i < list.length) {
      if (list[i].id == id) {
        return list[i];
      }
      i++;
    }
    return null;
  }


  ngOnDestroy() {
    if (this.subRef$) {
      this.subRef$.unsubscribe();
    }
  }


  openDialogUserInfo() {
    const dialogo1 = this.dialog.open(ConfirmDialogComponent, {});
    dialogo1.afterClosed().subscribe(art => {
    });
  }

  openDialogClient() {
    const dialogo1 = this.dialog.open(CreateClientsComponent, {});
    dialogo1.afterClosed().subscribe(art => {
    });
  }


  openDialogChanguePassword() {
    const dialogo1 = this.dialog.open(ChanguePasswordComponent, {});
    dialogo1.afterClosed().subscribe(art => {
    });
  }

}
