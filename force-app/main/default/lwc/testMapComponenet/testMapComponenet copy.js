import CustomerSignedTitle from '@salesforce/schema/Contract.CustomerSignedTitle';
import { LightningElement } from 'lwc';

export default class TestMapComponenet extends LightningElement {
    mapData = new Map();
    allSelected = false;
    
    //Dados Mockados
    inputData = [
        {
            id : "0001",
            name: "Podruto 1"
        },
        {
            id : "0002",
            name: "Podruto 2",
            idGrupoControle: "gc1"
        },
        {
            id : "0003",
            name: "Podruto 3"
        },
        {
            id : "0004",
            name: "Podruto 4",
            idGrupoControle: "gc1"
        },
        {
            id : "0005",
            name: "Podruto 5",
            idGrupoControle: "gc2"
        },
        {
            id : "0006",
            name: "Podruto 6",
            idGrupoControle: "gc2"
        },
        {
            id : "0007",
            name: "Podruto 7",
            idGrupoControle: "gc1"
        },
        {
            id : "0008",
            name: "Podruto 8"
        }
    ];

    connectedCallback(){
        this.completeMapData(this.inputData);
        
        this.setItemSelected("gc1");
        this.setItemSelected("0008");
       console.log("Itens Selecionados: " + JSON.stringify(this.getItensFromMap(true)));
       console.log("Itens Não Selecionados: " + JSON.stringify(this.getItensFromMap(false)));
       this.selectAll(true);
       this.setItemUnselected("gc1");
       

       console.log("Itens Selecionados: " + JSON.stringify(this.getItensFromMap(true)));
       console.log("Itens Não Selecionados: " + JSON.stringify(this.getItensFromMap(false)));
       console.log("All Selected Itens : " + this.allSelected);

      // this.showMapData();
       
        
    }


    completeMapData(input){
        if(input != null && input != undefined){
            input.forEach(element => {
                var item ={};
                var array = new Array();
                
                //Adiciona no Map itens sem Grupo Controle
                if(element.idGrupoControle == null ||element.idGrupoControle == undefined){
                    element['isItemSelected'] = false;
                    array.push(element);
                    item['isGrpSelected'] = false;
                    item['data'] = array;
                    this.mapData.set(element.id,item);
                }

                else{
                    var idGrControle = element.idGrupoControle;
                    if(this.mapData.get(idGrControle) == undefined || this.mapData.get(idGrControle) == null){
                        //console.log("Criar Grupos de Controle: " + idGrControle);
                        element['isItemSelected'] = false;
                        array.push(element);
                        item['isGrpSelected'] = false;
                        item['data'] = array;
                        this.mapData.set(idGrControle,item);
                    }

                    else{
                        item = this.mapData.get(idGrControle);
                        element['isSelected'] = false;
                        item.data.push(element);
                       //console.log("Item Salvo no Mapa" + JSON.stringify(item));
                    }
                }
            });
        }
    }

    setItemSelected(mapId){
        this.setItemSelection(mapId, true);
    }

    setItemUnselected(mapId){
        this.setItemSelection(mapId, false);
    }
    
    selectAll(isSelected){
        Array.from(this.mapData.keys()).forEach(mapId =>{
            this.setItemSelection(mapId, isSelected);
        })
    }


    setItemSelection(mapId, isSelected){
        this.mapData.get(mapId).isGrpSelected = isSelected;
        this.mapData.get(mapId).data.forEach (item => {
            item.isItemSelected = isSelected;
        });

    }

    get selectedList(){
        return this. getItensFromMap(true);
    }

    get unselectedList(){
       
        var list = this.getItensFromMap(false);
        this.allSelected = list.length == 0 ? true:false;
        console.log()
        return list;
       
    }

    getItensFromMap(isSelected){
        
        var listItens = new Array();
        Array.from(this.mapData.values()).forEach(item =>{
            if(item.isGrpSelected == isSelected){
                //listItens.push(element)
                item.data.forEach(element => {
                    listItens.push(element);
                });
            }
        })
        //indica se todos os itens estão selecionados
        if(isSelected == false){
            this.allSelected = listItens.length == 0 ? true:false;
        }
        return listItens;
    }

    showMapData(){
      
      //var item = this.mapData.get("gc1");
     // console.log(" Grupo Controle 1" + JSON.stringify(item));
      Array.from(this.mapData.values()).forEach(element =>{
          console.log(JSON.stringify(element));
      })

    }
}