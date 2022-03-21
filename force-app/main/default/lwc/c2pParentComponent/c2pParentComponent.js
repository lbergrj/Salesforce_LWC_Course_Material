import { LightningElement } from 'lwc';

export default class C2pParentComponent extends LightningElement {
    
    showModel = false;
    msg;

    get labelButton(){
        return this.showModel ? "Hide Modal" : "Show Modal"
    }

    clickHandler(){
        this.showModel = !this.showModel;
    }

    closeHandler(event){
        this.showModel = false;
        this.msg = event.detail.message;
    }

}