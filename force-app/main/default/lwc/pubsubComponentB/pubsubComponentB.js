import { LightningElement } from 'lwc';
import pubsub from 'c/pubsub';

export default class PubsubComponentB extends LightningElement {
    message;
    
    connectedCallback() {
        this.callSubscriber();
    }

    callSubscriber() {
        pubsub.subscribe("componentA",(setMessage) => { 
            this.message = setMessage;
        });
    }

    callUnsubscriber() {
        pubsub.unsubscribe("componentA");

        this.message = "";
       
       
    }

    setMessage(message) {
        this.message = message;
    }

}