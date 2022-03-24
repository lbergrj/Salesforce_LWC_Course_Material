import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub2';

export default class PubSubscribeCmp extends LightningElement {
    
    
    dataReceived = {
        firstName:"",
        lastName:""
    }

    @wire(CurrentPageReference) pageRef;
    strCapturedText = '';

    // This method will run once the component is rendered on DOM and will add the listener.
    connectedCallback(){
        this.conectListener();
    }

    conectListener() {
        registerListener('sendNameEvent2', this.setCaptureText, this);
    }

    // This method will run once the component is removed from DOM.
    disconnectedCallback(){
        unregisterListener('sendNameEvent2', this.setCaptureText, this);
        this.strCapturedText = "";
    }

    // This method will update the value once event is captured.
    setCaptureText(objPayload) {
        this.dataReceived = { ...objPayload };
        this.strCapturedText = objPayload.firstName;
    }
}