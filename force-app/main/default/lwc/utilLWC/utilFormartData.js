export default class UtilFormatData extends LightningElement  {
    
     formatBRData(dataInput){
        var data = new Date(dataInput);
        return data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    }

}