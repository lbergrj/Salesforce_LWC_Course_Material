import { LightningElement } from 'lwc';

export default class TemplateLooping extends LightningElement {

    listUsers = [
        {
            id : 1,
            firstName : "João",
            lastName : "Teixeira",
            function: "Manager"
        },
        {
            id : 2,
            firstName : "Marina",
            lastName : "Alves",
            function: "Developer"
        },
        {
            id : 3,
            firstName : "Aline",
            lastName : "Rocha",
            function: "Designer"
        }
    ]

}