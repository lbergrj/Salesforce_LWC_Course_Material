import { LightningElement, wire } from 'lwc';
import { fireEvent } from 'c/pubsub2';
import { CurrentPageReference } from 'lightning/navigation';

export default class PubPublishCmp extends LightningElement {
    
    dataCmp = {
        firstName: "",
        lastName: ""
    }

    strText = '';
    @wire(CurrentPageReference) objpageReference;
   

    changeFirstName(event){
       // this.strText = event.target.value;
       this.dataCmp.firstName = event.target.value;
    }

    changeLastName(event){
        // this.strText = event.target.value;
        this.dataCmp.lastName = event.target.value;
     }
     
    
    // This method will fire the event and pass strText as a payload.
    publishEvent(){
        fireEvent(this.objpageReference, 'sendNameEvent', this.dataCmp);
        console.log("Data Published: " + this.dataCmp.firstName);
    }
}