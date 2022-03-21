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

   
     connectedCallback() {
        console.log("LWC Data Table ");
        this.data = this.setMockData();
        this.completeMapGrp(this.data);
        this.dataSize = Object.keys(this.data).length;
         this.tableLoadingState = false;
        
         this.showMapData(this.mapGrp);


    }

    handleSelected(event){
        this.selectedRows = event.detail.selectedRows;
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
        //Inclusão de Linha
        if(sizeMapNew > sizeMapOld){
            itemChanged =  this.compareMaps(this.mapIdsSelectedNew, this.mapIdsSelectedOld);
            itemChanged["isSelected"] = true;
        }
        //Exclusão de Linha
        else if(sizeMapOld > sizeMapNew){
            itemChanged = this.compareMaps( this.mapIdsSelectedOld, this.mapIdsSelectedNew);
            itemChanged["isSelected"] = false;
        }

        //Alteração  do estatus isSelected no Mapa de Grupo
        console.log("Item Changed: " + JSON.stringify(itemChanged));
        this.setMapSelection(itemChanged);

        //Recupera lista de ID e Itens Seleccionados no Mapa de grupo
       var selectedLists = this.getSelectedListsFromMap();
       
       //Marca na tabela todos os itens do mapa de  grupo marcados com isSeleceted = true
       this.preSelectedRows = [...selectedLists.listIds];

       //Atualiza o mapa antigo para comparação para próvima seleção
       this.mapIdsSelectedOld = this.createMap(selectedLists.listItens);
    }


    compareMaps(map1, map2){
        const keys = Array.from(map1.values());
        var output = {};
        keys.forEach(item => {
            if(map2.get(item.id) == undefined || map2.get(item.id) == null ){
                output = item;
                return;
            }
        });
        return output;
    }


    createMap(arrayInput){
        let map = new Map();
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


    getSelectedListsFromMap(){
        var listIds = new Array();
        var listItens = new Array();
        Array.from(this.mapGrp.values()).forEach(item =>{
            if(item.isSelected == true){
                item.data.forEach(element => {
                    listIds.push(element.id);
                    //Test
                    var obj = {
                        id: element.id,
                        idGrp : element.idGrp
                    }
                    listItens.push(obj);
                });
            }
        });
         var obj = {};
         obj["listIds"] =  listIds;
         obj["listItens"] = listItens;
        return obj;
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
                
                //Adiciona no Map itens sem Grupo Controle  key = id
                if(element.idGrp == null ||element.idGrp == undefined){
                    array.push(element);
                    item['data'] = array;
                    this.mapGrp.set(element.id,item);
                }

                else{
                    //Adiciona item no map com key = idGrp
                    var idGrControle = element.idGrp;
                    if(this.mapGrp.get(idGrControle) == undefined || this.mapGrp.get(idGrControle) == null){
                        array.push(element);
                        item['data'] = array;
                        this.mapGrp.set(idGrControle,item);
                    }
                    else{
                        //Adiciona elemento ao grupo já criado
                        item = this.mapGrp.get(idGrControle);
                        item.data.push(element);
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
            },
            {
                id :"005",
                name : "Pablo Oliveira",
                website : "http://www.hotmail.com",
                phone : "21999989077",
                amount : 2600,
                closeAt : "2021-08-05"
            },
            {
                id :"008",
                idGrp : "B",
                name : "Julia Mendes",
                website : "http://www.gmail.com",
                phone : "21999981456",
                amount : 2800,
                closeAt : "2021-12-05"
            }
        ]
    }

}