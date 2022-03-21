import { LightningElement } from 'lwc';

export default class C2pModalComponent extends LightningElement {
    
    closeHandler(){
        const closeEvent = new CustomEvent(
                "close",
                { 
                    bubbles:true,
                    detail: 
                    {
                        message: "Modal Closed Successfully"
                    }
                }   
            
            );
        this.dispatchEvent(closeEvent);
    }
    
    footerHandler(){
        console.log("fotterHander Caled");
    }
}