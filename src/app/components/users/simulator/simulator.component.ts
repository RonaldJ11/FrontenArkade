import { Component, EventEmitter, Input, OnInit, Output, ɵLocaleDataIndex } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Debt } from '../../../models/debt';
import { TypesCredit } from '../../../models/types-credit';


export interface Payments {
  id: number;
  date: string;
  fdo: number;
  sEnd: number;
  interests: number;
  equity: number;
  fee: number;
  balance: number;

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}




const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }



  //Tipo de credito
  typeCredit: string;
  //Numero de Cuotas
  numberInstallments: number = 0;
  //Tasa de interes
  interestRate: number = 0;

  //valor del Credito
  creditValue: number = 0;

  //Cuota mensual
  valueInstallments: number = 0;

  //filas de la tabla
  values: Payments[] = [];


  // lista de tipos de credito 
  typesCreditsList: TypesCredit[] = [
    { titulo: "Credito Ordinario De Nomina", name: "Credito Ordinario De Nomina" },
    { titulo: "Credito Extraordinario", name: "Credito Extraordinario" },
    { titulo: "Credito Ordinario de ventanilla", name: "Credito Ordinario de ventanilla" },
  ];

  varColumns: string[];
  varData: string[];

  getCreditValue() {
    switch (this.typeCredit) {
      case "Credito Ordinario De Nomina":
        if (this.numberInstallments <= 12 && this.creditValue <= 100000000)
          this.interestRate = 0.8;
        else if (this.numberInstallments <= 72 && this.creditValue <= 100000000)
          this.interestRate = 0.9;
        else {
          alert("No se puede hacer un credito mayor de 72 cuotas o de valores mayores a 100.000.000")
          this.interestRate = -1;
        }
        var debt = new Debt(this.creditValue, this.interestRate, this.numberInstallments, true);
        this.valueInstallments = debt.fee;
        this.calcule(1, debt);
        break;
      case "Credito Extraordinario":
        if (this.numberInstallments <= 10 && this.creditValue <= 1000000)
          this.interestRate = 1.4;
        else {
          alert("No se puede hacer un credito mayor de 10 cuotas o de valores mayores a 1.000.000")
          this.interestRate = -1;
        }
        var debt = new Debt(this.creditValue, this.interestRate, this.numberInstallments, false);
        this.valueInstallments = debt.fee;
        this.calcule(2, debt);

        break;
      case "Credito Ordinario de ventanilla":

        if (this.numberInstallments <= 36 && this.creditValue <= 30000000)
          this.interestRate = 1.1;
        else {
          alert("No se puede hacer un credito mayor de 36 cuotas o de valores mayores a 30.000.000")
          this.interestRate = -1;
        }
        var debt = new Debt(this.creditValue, this.interestRate, this.numberInstallments, true);
        this.valueInstallments = debt.fee;
        this.calcule(3, debt);
        break;

      default:
        this.interestRate = 0;
        break;
    }

  }

  createTable() {
    switch (this.typeCredit) {
      case "Credito Ordinario De Nomina":
        this.varColumns = ['Cuota', 'Fecha de Pago', 'FDO Solidaridad', 'Seguro Fin', 'Interes', 'Capital', 'Cuota', 'Saldo Capital']
        this.reset();
        break;
      case "Credito Extraordinario":
        this.varColumns = ['Cuota', 'Fecha de Pago', 'Seguro de Credito', 'Interes', 'Capital', 'Cuota', 'Saldo Capital']
        this.reset();
        break;
      case "Credito Ordinario de ventanilla":
        this.varColumns = ['Cuota', 'Fecha de Pago', 'FDO Solidaridad', 'Seguro Fin', 'Interes', 'Capital', 'Cuota', 'Saldo Capital']
        this.reset();
        break;
      default:
        break;
    }
  }


  calcule(type: number, debt: Debt) {
    var data: [];
    var day = new Date();
    var tempBalance = debt.creditValue;
    if (debt.interestRate == -1) {
      this.values = [];
    } else {
      switch (type) {
        case 1:
          this.listDatas(debt, new Date(), tempBalance, true);
          break;
        case 2:
          this.listDatas(debt, new Date(), tempBalance, false);
          break;
        case 3:
          this.listDatas(debt, new Date(), tempBalance, true);
          break;
        default:
          break;
      }

    }

  }

  listDatas(debt: Debt, day: Date, tempBalance: number, isExtra: boolean) {
    var  temp=[];
    for (let index = 0; index < debt.numberInstallments; index++) {
      day.setMonth((debt.numberInstallments > 1 && !isExtra) ? day.getMonth() + 1 : day.getMonth() + 10);
      var interests = (tempBalance * debt.interestRate) / 100;
      var cEquity = debt.fee - debt.fdo - debt.sEndn - interests;
      tempBalance = tempBalance - cEquity;
      temp.push(
        {
          id: index,
          date: "" + (day.getDay() + 1) + "/" + (day.getMonth() + 1) + "/" + day.getFullYear(),
          fdo: debt.fdo,
          sEnd: debt.sEndn,
          interests: interests,
          equity: cEquity,
          fee: debt.fdo + debt.sEndn + interests + cEquity,
          balance: tempBalance
        },
      )
    }
    this.values=temp;
  }


  updatePage() {
    this.createTable();
    this.getCreditValue();
  }

  reset(){
    this.numberInstallments=0;
    this.creditValue=0;

  }

}
