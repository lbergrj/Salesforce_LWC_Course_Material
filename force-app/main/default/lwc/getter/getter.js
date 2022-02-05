import { LightningElement } from 'lwc';

export default class Getter extends LightningElement {
    
    users = ["João", "José", "Maria"];
    userNumber = 0;

    get selectedtUser(){
        return this.users[this.userNumber];
    }
    
    get userId(){
        return this. userNumber + 1;
    }
    
    setUserNumber(){
        this.userNumber ++;
        if(this.userNumber >= this.users.length ){
            this.userNumber = 0
        }
    }

}