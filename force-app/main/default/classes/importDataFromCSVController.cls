public class importDataFromCSVController {

    public Blob csvFileBody{get;set;}
    public String csvAsString{get;set;}
    public String[] csvFileLines{get;set;}
    public List<account> accountlist{get;set;}
    
    public importDataFromCSVController(){
    csvFileLines = new String[]{
        
    };
    accountlist= New List<Account>();
    }
    
    public void importCSVFile(){
    try{
    // Read CSV file body and store it in variable
    csvAsString = csvFileBody.toString();
    
    // Split CSV String to lines
    csvFileLines = csvAsString.split(‘\n’);
    
    // Iterate CSV file lines and retrieve one column at a time.
    for(Integer i=1; i < csvFileLines.size(); i++){
    Account accObj = new Account() ;
    String[] csvRecordData = csvFileLines[i].split(‘,’);
    accObj.name = csvRecordData[0] ;
    accObj.accountnumber = csvRecordData[1];
    accObj.Type = csvRecordData[2];
    accObj.AccountSource = csvRecordData[3];
    accObj.Industry = csvRecordData[4];
    accountlist.add(accObj);
    }
    // if all correct then insert Account into Org
    if(accountlist.size()>0)
    
    insert accountlist;
    }
    catch (Exception e)
    {
    ApexPages.Message errorMessage = new ApexPages.Message(ApexPages.severity.ERROR,’An error has occured while importing data into Salesforce. Please make sure input csv file is correct’);
    ApexPages.addMessage(errorMessage);
    }
    }
    }
