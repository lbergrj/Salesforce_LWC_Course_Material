import { LightningElement } from 'lwc';

export default class ShareDynamicCss extends LightningElement {
    percentValue = 10;
    
    changeHandler(event){
        this.percentValue=event.target.value;
    }

    get percentage(){
        var color;
        if(this.percentValue < 40){
            color = "red";
        }
        else  if(this.percentValue < 80){
            color = "orange"
        }
        else{
            color = "green"
        }
        return `width:${this.percentValue}% ; background-color:${color}`;
    }

}