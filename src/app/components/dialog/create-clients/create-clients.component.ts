import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IClients } from '../../../models/iclients';

@Component({
  selector: 'app-create-clients',
  templateUrl: './create-clients.component.html',
  styleUrls: ['./create-clients.component.css']
})
export class CreateClientsComponent implements OnInit,OnDestroy {

  subRef$: Subscription | undefined;

  clientInfo: IClients = {
    address: 'Ninguno',
    assosiade_id: 12,
    birthday: new Date('5/09/1993'),
    email: 'Ninguno',
    gender: 'Ninguno',
    id: 1,
    names: 'Ninguno',
    phone_number: 'Ninguno'

  }

  constructor(public dialogRef: MatDialogRef<CreateClientsComponent>, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

  create() {
    console.log(this.clientInfo);

    let httpsHeaders: HttpHeaders = new HttpHeaders();

    const token = sessionStorage.getItem('auth_token');
    console.log(token);
    
    httpsHeaders = httpsHeaders.append('Authorization', 'Bearer ' + token)
    this.subRef$ = this.http.post('https://localhost:44332/api/Clients', {
      names: this.clientInfo.names,
      phone_number: this.clientInfo.phone_number,
      address: this.clientInfo.address,
      gender: this.clientInfo.gender,
      email: this.clientInfo.email,
      birthday: "1999-11-11T00:00:00",
      associate_id:12
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
