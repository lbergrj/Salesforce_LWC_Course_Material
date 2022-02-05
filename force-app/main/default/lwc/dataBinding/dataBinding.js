import { LightningElement } from 'lwc';

export default class DataBinding extends LightningElement {
    fullname = "Zero to Hero";
     title = "LWC";

    changeHandler(event){
        this.title = event.target.value;
    }
}