import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterListener,unregisterAllListeners } from 'c/pubsub2';


export default class PubSubscribeCmp extends LightningElement {
    strCapturedText = '';
    @wire(CurrentPageReference) pageRef;

    // This method will run once the component is rendered on DOM and will add the listener.
    connectedCallback(){
        this.conectListener();
    }

    conectListener() {
        registerListener('sendNameEvent', this.setCaptureText, this);
    }

    // This method will run once the component is removed from DOM.
    disconnectedCallback(){
        //unregisterAllListeners(this);
        unregisterListener('sendNameEvent', this.setCaptureText, this);
        this.strCapturedText = "Deleted";
    }

    // This method will update the value once event is captured.
    setCaptureText(objPayload){
        this.strCapturedText = objPayload.firstName;
        console.log("Received: " + JSON.stringify( objPayload));
    }
}