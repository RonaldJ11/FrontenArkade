export class Debt {
    creditValue:number=0;
    interestRate:number=0;
    numberInstallments:number=0;
    monthlyFee:number = this.generatedMonthyFee();
    fdo:number = (this.creditValue*0.01)/this.numberInstallments
    sEndn:number = (this.creditValue*0.01)/this.numberInstallments
    

    generatedMonthyFee(){
        var porcent= this.interestRate/100;
        return this.creditValue*((Math.pow((porcent*(1+porcent)),this.numberInstallments))/Math.pow((1+porcent),this.numberInstallments)-1);
    }
}
