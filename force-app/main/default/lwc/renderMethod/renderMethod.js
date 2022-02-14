import { LightningElement } from 'lwc';
import signUpTemplate from './signUpTemplate.html';
import signInTemplate from './signInTemplate.html';
import renderTemplate from './renderMethod.html';


export default class RenderMethod extends LightningElement {
    selectedBtn="";
    render (){
        return this.selectedBtn === "Signup" ? signUpTemplate:
                this.selectedBtn === "Signin" ? signInTemplate:
                renderTemplate;
    }

    handlerClick(event){
        this.selectedBtn = event.target.label;

    }
    submitHandler(event){
        console.log(`${event.target.label} Successfully` );

    }

}