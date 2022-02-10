import { LightningElement } from 'lwc';

export default class HelloQuerySelectorDemo extends LightningElement {

    userNames = ["John", "Smith", "Nik", "Mike"];

    fetchDetailHandler(){
        const elem = this.template.querySelector('h1');
        elem.style.border="2px solid red" ;
        console.log("Element is " + elem.innerText);
        const userElements = this.template.querySelectorAll('.name');
        Array.from(userElements).forEach(item => {
            console.log(item.innerText);
            item.setAttribute("tittle", item.innerText);
        });

        //lwc:dom="manual demo
        const childElement = this.template.querySelector('.child');
        childElement.innerHTML = '<p>I am a child element</p>';

    }
}