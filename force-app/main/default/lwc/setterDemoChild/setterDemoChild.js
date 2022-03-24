import { LightningElement, api } from 'lwc';

export default class SetterDemoChild extends LightningElement {
    
    userDetail

    @api
    get detail() {
        return this.userDetail;
    }

    //É necessário usar o spread operator (...) com a nova propriedade a esqueda do objeto:  age:newAge
    set detail(data) {
        let newAge = data.age + 10;
        this.userDetail = {...data, age:newAge, location:"Rio de Janeiro"};
    }


}