import { LightningElement } from 'lwc';

export default class C2pParentComponent extends LightningElement {
    
    showModel = false;

    get labelButton(){
        return this.showModel ? "Hide Modal" : "Show Modal"
    }

    clickHandler(){
        this.showModel = !this.showModel;
    }

    closeHandler(){
        this.showModel = false;
    }

}