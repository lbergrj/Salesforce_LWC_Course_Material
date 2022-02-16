import { LightningElement } from 'lwc';

export default class P2cParentComponent extends LightningElement {
    message = "Message from the parent";
    cardHeading = "Parent to Child primitive data communication";
    percentage=10;
    carouselData = [
        {
            src : "https://www.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg",
            header : "Fist Card",
            description : "First Card description."
        },
        {
            src : "https://www.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg",
            header : "Second Card",
            description : "Second Card description."
        },
        {
            src : "https://www.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg",
            header : "Third Card",
            description : "Third Card description."
        }
    ];
    

    handlerChange(event){
        let value = event.target.value;
        if(value <0 ){
            event.target.value = 0;
        }
        else if(value >100){
            event.target.value =100;
        }
        this.percentage =  event.target.value;

    }

    handlerClick(){
        this.template.querySelector('c-p2c-slider-component').resetSlider();
    }
}