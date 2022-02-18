import MailingPostalCode from '@salesforce/schema/Contact.MailingPostalCode';
import { LightningElement,track } from 'lwc';


const columns = [
    { label: 'Name', fieldName: 'name' },
    { label: 'Website', fieldName: 'website', type: 'url' },
    { label: 'Phone', fieldName: 'phone', type: 'phone' },
    { label: 'Balance', fieldName: 'amount', type: 'currency' },
    { label: 'CloseAt', fieldName: 'closeAt', type: 'date' },
];

export default class TestMapComponenet extends LightningElement {
    data = [];
    mapIdsSelectedOld = new Map ();
    mapIdsSelectedNew = new Map();
    columns = columns;
    @track preSelectedRows=[];
    @track selectedRows = [];
    dataSize = 0;

   
    connectedCallback() {
        console.log("LWC Data Table");
        this.data = this.setMockData();
        this.dataSize = Object.keys(this.data).length;
        console.log("Data Size : " + this.dataSize);
        this.preSelectedRows.push("002");
    }

    handleSelected(event){
        this.selectedRows = event.detail.selectedRows;
        console.log(" Lista Selecionada: " + JSON.stringify(this.selectedRows));
        this.mapIdsSelectedNew = this.createMap(this.selectedRows),
        //this.showMapData();
        this.getItemChanged();
        //Parateste
        
    }

    getItemChanged(){
        var sizeMapNew = this.mapIdsSelectedNew.size;
        var sizeMapOld = this.mapIdsSelectedOld.size;
        var functionSelected = "";
        var itemChanged;

        if(sizeMapNew> 0 && sizeMapNew < this.dataSize ){
            if(sizeMapNew > sizeMapOld){
               itemChanged =  this.compareMaps(this.mapIdsSelectedNew, this.mapIdsSelectedOld);
                functionSelected = "add";
            }
            else if(sizeMapOld > sizeMapNew){
                itemChanged = this.compareMaps( this.mapIdsSelectedOld, this.mapIdsSelectedNew);
                functionSelected = "remove";

            }
            itemChanged["function"] = functionSelected;
            console.log("Item Changed: " + JSON.stringify(itemChanged));
        }
        
        this.mapIdsSelectedOld = new Map([...this.mapIdsSelectedNew]);
    }

    compareMaps(map1, map2){
        const keys = Array.from(map1.values());
        var output = {};
        keys.forEach(item => {
            if(map2.get(item.id) == undefined || map2.get(item.id) == null ){
                //console.log("Compare Map " + JSON.stringify(item));
                output = item;
                return;
                
            }
        });
        return output;
    }

    createMap(arrayInput){
        var map = new Map();
        arrayInput.forEach(item => {
            var itemMap = {};
            itemMap['id'] = item.id;
            itemMap["idGrp"] = item.idGrp;
            //console.log("Create Map Item: " + JSON.stringify(itemMap));
            map.set(item.id, itemMap);
        });
        return map;
    }

    showMapData(){
        Array.from(this.mapIdsSelectedNew.values()).forEach(element =>{
            console.log("Show Map Data: " + JSON.stringify(element));
        });
    }


    setMockData(){
        return [
            {   
                id :"001",
                idGrp : "A",
                name : "Carla Marques",
                website : "http://www.oglobo.com",
                phone : "21998129876",
                amount : 1200,
                closeAt : "2022-02-01"
            },
            {
                id :"002",
                idGrp : "B",
                name : "Pedro da Silva",
                website : "http://www.google.com",
                phone : "21998126090",
                amount : 1800,
                closeAt : "2022-01-05"
            },
            {
                id :"003",
                idGrp : "A",
                name : "Marina Mendes",
                website : "http://www.gmail.com",
                phone : "21999981010",
                amount : 2800,
                closeAt : "2021-12-05"
            },
            {
                id :"004",
                name : "Fabiana Oliveira",
                website : "http://www.hotmail.com",
                phone : "21999989090",
                amount : 2600,
                closeAt : "2021-08-05"
            }

        ]
    }

}