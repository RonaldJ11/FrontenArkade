import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changue-password',
  templateUrl: './changue-password.component.html',
  styleUrls: ['./changue-password.component.css']
})
export class ChanguePasswordComponent implements OnInit {

  password:string='';
  passwordRepeat:string='';

  constructor(public dialogRef: MatDialogRef<ChanguePasswordComponent>, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  cancel(){
    
  }

  create(){
    if (this.password==this.passwordRepeat&& 3<this.password.length ) {
      let httpsHeaders: HttpHeaders = new HttpHeaders();
      const token = sessionStorage.getItem('auth_token');
      const nickName = sessionStorage.getItem('user_info');
      console.log();
      
      httpsHeaders = httpsHeaders.append('Authorization', 'Bearer ' + token)
  
     this.http.put('https://localhost:44332/api/Users/login/' +nickName,{
        nickName:nickName,
        password:this.password
      }).subscribe(res => {
        location.reload();
        alert('El Usuario se ha Cambiado la contraseña correctamente');
      }, err => {
        console.log("Error Editar  Usuario", err);
      }
      );
    }else{
      alert('Datos mal escritos por favor Corrije')
    }
  }
}
