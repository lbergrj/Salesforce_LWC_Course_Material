import { LightningElement } from 'lwc';

export default class PromisseComponent extends LightningElement {

    
    connectedCallback(){
         //Chamada do método
        chekIsSuccess("success").then(function(result){
            console.log(result)   
        }).catch(function(error){
            console.error(error)
        });

    }

     chekIsSuccess(data) {
        new Promise(function(resolve, reject){
            if(data === "sucess"){
                return resolve("sucessfully executed");
            }
            else{
                return reject("unsucessfully executed");
            }
        });
        
    }

    getApiData(){
        fetch("https://api.github.com/users/karkranikhil").then(function(result){
            return result.json();
        }).then(function(response){
            console.log(response);
        });
    }

   
    
}