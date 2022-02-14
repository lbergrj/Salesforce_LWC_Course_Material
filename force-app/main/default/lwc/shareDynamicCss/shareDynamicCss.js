import { LightningElement } from 'lwc';

export default class ShareDynamicCss extends LightningElement {
    percentValue = 0;
    
    changeHandler(event){
        this.percentValue = this.setLimits(event);
        
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
        return `width:${this.percentValue}% ;  background-color:${color}`;
    }

    setLimits( event){
        var value = event.target.value;
        if(value<0 ) {
            value = 0;
        }
        if(value > 100 ) {
            value = 100;
        }
        event.target.value = value;
        return value;

    }

}