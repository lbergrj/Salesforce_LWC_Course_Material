import { LightningElement } from 'lwc';
import {UtilFormatData}  from 'c/utilLWC';

export default class ArrowFunction extends LightningElement {
    connectedCallback(){
        console.log("Soma :" + this.sum(10,20));
        //console.log("Datas: " + UtilFormatData.formatBRData("2021-01-01"));
       // console.log("Data: ");

        var array = [1,2,3,4];
        console.log(this.mult2(array));
        //result = [2, 4, 6, 8]

        let obj = {
                    firstName : "Antonio",
                    lastName : "Alves",
                    getName : function() {
                        console.log(obj.firstName);
                        const fullName = () => {
                        console.log(obj.firstName);
                        console.log("My full name is " + obj.firstName  + " " + obj.lastName);
                    }
                fullName();
            }
        }

        obj.getName();
    }

    sum = (n1,n2) => {
        return n1 + n2;
    }

    mult2 = arr => arr.map((item)=> item *2);
}