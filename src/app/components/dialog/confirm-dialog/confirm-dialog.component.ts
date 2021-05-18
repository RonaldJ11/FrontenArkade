import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserInfo } from '../../../models/iuser-info';


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit, OnDestroy{

  subRef$: Subscription | undefined;


  userInfo: IUserInfo = {
    active: false,
    fullNames: '',
    id: 0,
    nickName: '',
    typeAccount: true,
    userIdentification: '1233123123132'
  };


  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, private router: Router, private http: HttpClient) {
  }





  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }

  create() {
    console.log(this.userInfo);

    let httpsHeaders: HttpHeaders = new HttpHeaders();

    const token = sessionStorage.getItem('auth_token');
    httpsHeaders = httpsHeaders.append('Authorization', 'Bearer ' + token)
    this.subRef$ = this.http.post('https://localhost:44332/api/Users/', {
      nickName: this.userInfo.nickName,
      userIdentification: this.userInfo.userIdentification,
      fullNames: this.userInfo.fullNames,
      typeAcount: this.userInfo.typeAccount,
      active: true
    }).subscribe(res => {
      location.reload();
      alert('El Usuario se ha Creado correctamente');
    }, err => {
      console.log("Error Editar  Usuario", err);
    }
    );
  }


  ngOnDestroy() {
    if (this.subRef$) {
      this.subRef$.unsubscribe();
    }
  }
}
