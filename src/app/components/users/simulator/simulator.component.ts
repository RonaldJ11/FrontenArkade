import { Component, EventEmitter, Input, OnInit, Output, ɵLocaleDataIndex } from '@angular/core';
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
  values: Payments[];


  // lista de tipos de credito 
  typesCreditsList: TypesCredit[] = [
    { id: 1, name: "Credito Ordinario De Nomina" },
    { id: 2, name: "Credito Extraordinario" },
    { id: 3, name: "Credito Ordinario de ventanilla" },
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
        break;
      case "Credito Extraordinario":
        if (this.numberInstallments <= 10 && this.creditValue <= 1000000)
          this.interestRate = 1.4;
        else {
          alert("No se puede hacer un credito mayor de 10 cuotas o de valores mayores a 1.000.000")
          this.interestRate = -1;
        }
        break;


      case "Credito Ordinario de ventanilla":
        if (this.numberInstallments <= 30 && this.creditValue <= 30000000)
          this.interestRate = 1.4;
        else {
          alert("No se puede hacer un credito mayor de 30 cuotas o de valores mayores a 30.000.000")
          this.interestRate = -1;
        }
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
      break;
      case "Credito Extraordinario":
        this.varColumns = ['Cuota', 'Fecha de Pago', 'Seguro de Credito', 'Interes', 'Capital', 'Cuota', 'Saldo Capital']
        break;
      case "Credito Ordinario de ventanilla":
        this.varColumns = ['Cuota', 'Fecha de Pago', 'FDO Solidaridad', 'Seguro Fin', 'Interes', 'Capital', 'Cuota', 'Saldo Capital']
        break;
      default:
        break;
    }
  }


  calcule(type: number, debt: Debt) {
    var data: [];
    var day= new Date(); 
    var tempBalance=debt.creditValue;
    
    switch (type) {
      case 1:
        for (let index = 0; index < debt.numberInstallments; index++) {
          var cEquity= -(-debt.fdo+debt.sEndn+debt.interestRate);
          var cFeee = (debt.fdo+debt.sEndn+debt.interestRate);
          var cbalance=debt.creditValue-cFeee;
          day.setMonth(day.getMonth()+1);
          this.values.push(
            { id: index, 
              date:""+day.setFullYear, 
              fdo: debt.fdo,
              sEnd: debt.sEndn,
              interests:(tempBalance*debt.numberInstallments)/100, 
              equity:cEquity , fee: cFeee, balance: cbalance },
          )
          tempBalance = cbalance;
        }
        break;
      case 2:

        break;
      case 3:

        break;
      default:
        break;
    }

  }

  updatePage() {
    this.createTable();
    this.getCreditValue();
  }

}
