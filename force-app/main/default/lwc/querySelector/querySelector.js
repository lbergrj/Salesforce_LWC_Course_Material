import { LightningElement } from 'lwc';


export default class QuerySelector extends LightningElement {
    
    //usar o método renderedCallback
    renderedCallback(){
        this.setAllElements();
        this.setfisrtElement();
        this.setCLassElement();
    }

    setfisrtElement(){
        //retorna o primeiro elemento
        let element = this.template.querySelector("div");
        console.log("Elemento: " + element);
        element.style.color = "orange";
    }

    setCLassElement(){
       
        let element = this.template.querySelector(".second-class");
        console.log("Second Class: " + element);
        element.style.color = "red";
    }
    

    setAllElements(){
        //retorna o primeiro elemento
        let elements = this.template.querySelectorAll("div");
        console.log("Elementos: " + elements);
        Array.from(elements).map(function(item){
            item.style.color = "green";

        });
    }


}