import { LightningElement, track } from 'lwc';

export default class TrackNotation extends LightningElement {
    fullName = "Ronaldo  da Silva";
    @track address = {
        city : "Rio de Janeiro",
        postCode: 22220000,
        country : "Brazil"
    }

    //Need @track decoration
    changeCityHandler(event){
        this.address.city = event.target.value;
    }

    //Need @track decoration
    changeCityHandler2(event){
        this.address = {... this.address, "city" : event.target.value};
    }

}