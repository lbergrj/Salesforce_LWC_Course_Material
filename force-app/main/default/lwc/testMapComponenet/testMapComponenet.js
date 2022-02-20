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
    @track mapGrp = new Map();
    @track columns = columns;
    @track preSelectedRows=[];
    @track selectedRows = [];
    dataSize = 0;
    tableLoadingState = true;

   
    async connectedCallback() {
        console.log("LWC Data Table@ ");
        this.data = this.setMockData();
        this.completeMapGrp(this.data);
        this.dataSize = Object.keys(this.data).length;
        this.tableLoadingState = false;

        this.showMapData(this.mapGrp);
        
        
    }

    handleSelected(event){
        this.selectedRows = event.detail.selectedRows;
        console.log(" Lista Selecionada: " + JSON.stringify(this.selectedRows));
        this.mapIdsSelectedNew = this.createMap(this.selectedRows);
        this.itemChangedHandler();
    }

    handlerClick(event){
        console.log("Click");
        this.resetList();
      
        
    }

    resetList(){
        let array = [];
        this.preSelectedRows = [...array];
        this.selectedRows = [...array];
        console.log(" Lista Selecionada: " + JSON.stringify(this.selectedRows));

    } 

    itemChangedHandler(){
        var sizeMapNew = this.mapIdsSelectedNew.size;
        var sizeMapOld = this.mapIdsSelectedOld.size;
        
        var itemChanged;
        if(sizeMapNew > sizeMapOld){
            itemChanged =  this.compareMaps(this.mapIdsSelectedNew, this.mapIdsSelectedOld);
            itemChanged["isSelected"] = true;
        }
        else if(sizeMapOld > sizeMapNew){
            itemChanged = this.compareMaps( this.mapIdsSelectedOld, this.mapIdsSelectedNew);
            itemChanged["isSelected"] = false;
        }
        console.log("Item Changed: " + JSON.stringify(itemChanged));
        this.setMapSelection(itemChanged);
        this.showMapData(this.mapGrp);

        //var list = this.mapSelectedItens();
        //this.preSelectedRows = [...this.mapSelectedItens() ];

            
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

    showMapData(map){
        console.log("Show Map Data: ");
        var data = Array.from(map.values());
        data.forEach(element =>{
            console.log( JSON.stringify(element));
        });
    }

    mapSelectedItens(){
        var listItens = new Array();
        Array.from(this.mapGrp.values()).forEach(item =>{
            if(item.isSelected == true){
                item.data.forEach(element => {
                    listItens.push(element.id);
                });
            }
        });
        console.log("List ID Selected: " + JSON.stringify(listItens));
        return listItens;
    }

    setMapSelection(item){
        let id;
        if(item.idGrp == undefined || item.idGrp == null){
            id = item.id
        }
        else{
            id = item.idGrp;
        }
        this.mapGrp.get(id).isSelected = item.isSelected;
    }

    completeMapGrp(input){
        if(input != null && input != undefined){
            input.forEach(element => {
                var item ={};
                item["isSelected"] = false;
                var array = new Array();
                
                //Adiciona no Map itens sem Grupo Controle
                if(element.idGrp == null ||element.idGrp == undefined){
                    
                    array.push(element);
                    item['data'] = array;
                    this.mapGrp.set(element.id,item);
                }

                else{
                    var idGrControle = element.idGrp;
                    if(this.mapGrp.get(idGrControle) == undefined || this.mapGrp.get(idGrControle) == null){
                        //console.log("Criar Grupos de Controle: " + idGrControle);
                        array.push(element);
                        item['data'] = array;
                        this.mapGrp.set(idGrControle,item);
                    }
                    else{
                        item = this.mapGrp.get(idGrControle);
                        item.data.push(element);
                       //console.log("Item Salvo no Mapa" + JSON.stringify(item));
                    }
                }
            });
        }
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