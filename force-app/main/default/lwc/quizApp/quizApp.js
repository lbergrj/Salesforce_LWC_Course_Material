import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {
    selected ={};
    correctAnswers;
    myQuestion = {
        id : "Question3",
        question : "Which one of the following does not came from Atlantis ?",
        answers : {
            a : "Superman",
            b : "Batman",
            c : "Green Arrow",
            d : "Aquaman"
        },
        correctAnswer : "d"
    }

    myQuestions = [
        {
            id : "Question1",
            question : "Which one of the following does not have super powers ?",
            answers : {
                a : "Clark Kent",
                b : "Bruce Wayne",
                c : "Barry Allen",
                d : "Diana Prince"
            },
            correctAnswer : "b"
        },
        {
            id : "Question2",
            question : "What is the real name from Iron Man ?",
            answers : {
                a : "Tony Stark",
                b : "Peter Park",
                c : "Steve Rogers",
                d : "Bruce Banner"
            },
            correctAnswer : "a"
        },
        {
            id : "Question3",
            question : "Which one of the following does not came from Atlantis ?",
            answers : {
                a : "Superman",
                b : "Batman",
                c : "Green Arrow",
                d : "Aquaman"
            },
            correctAnswer : "d"
        }
        
    ]

    connectedCallback(){
        this.inputHandler(this.myQuestion,'question');
        this.inputHandler(this.myQuestions,'question');
    }

    changeHandler(event){
        console.log("Name: " + event.target.name);
        console.log("Value: " + event.target.value);
        const{name, value} = event.target;
        this.selected = {
            ...this.selected,
            [name]:value
        }
    }

    inputHandler(input,parameter){
        if(Array.isArray(input)){
            return input;
        }
        else{
            if(typeof input == 'object'){
                var array = new Array();
               if(input[parameter] != null && input[parameter] != undefined){
                   array.push(input);
               }
            }
            return array;
        }
    }

    submitHandler(event){

       // event.preventDefault();
        let correct = this.myQuestions.filter(item => this.selected[item.id] === item.correctAnswer);
        this.correctAnswers = correct.length;
        console.log("Numbers of correct Answers: " + this.correctAnswers);


    }

    resetHandler(){
        this.selected = {};
        this.correctAnswers = undefined;
    }
    get isDisable(){
        return !(Object.keys(this.selected).length === this.myQuestions.length);
    }
    
    get score(){
        if(this.correctAnswers == null || this.correctAnswers == undefined){
            return "";
        }
        else{
            var scorePercent = 100 * this.correctAnswers / this.myQuestions.length;
            return "You score is " + scorePercent + "%";
        }
    }

    get scoreClass(){
        let scoreLeval;
        var score = 100 * this.correctAnswers / this.myQuestions.length;
        console.log("Scoore " + this.score);
        if(score == 100) scoreLeval = "slds-text-color_success";
        else if(score > 60) scoreLeval = "slds-text-color_weak";
        else scoreLeval = "slds-text-color_error";

        return `slds-text-heading_large ${scoreLeval}`;
    }

}