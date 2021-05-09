export class Debt {

    creditValue: number = 0;
    interestRate: number = 0;
    numberInstallments: number = 1;
    fdo: number;
    monthlyFee: number;
    sEndn: number;
    fee: number

    constructor(creditValue: number, interesRate: number, numberInstallments: number, tool: boolean) {
        this.creditValue = creditValue;
        this.interestRate = interesRate;
        this.numberInstallments = numberInstallments;
        if (tool){
            this.sEndn = ((this.creditValue * 0.02) / this.numberInstallments);
        }else{
            this.sEndn = 0;
        }
        this.fdo = ((this.creditValue * 0.01) / this.numberInstallments);
        this.monthlyFee = this.generatedMonthyFee();
        this.fee = this.monthlyFee + this.fdo + this.sEndn;
    }
    generatedMonthyFee() {
        var porcent = this.interestRate / 100;
        var result = this.creditValue * ((porcent * Math.pow((1 + porcent), this.numberInstallments)) / (Math.pow((1 + porcent), this.numberInstallments) - 1));
        return result
    }



}
