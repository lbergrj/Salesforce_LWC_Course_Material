import { LightningElement } from 'lwc';

export default class C2pModalComponent extends LightningElement {
    
    closeHandler(){
        const closeEvent = new CustomEvent("close");
        this.dispatchEvent(closeEvent);
    }
}