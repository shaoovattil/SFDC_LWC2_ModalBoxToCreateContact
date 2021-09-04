public with sharing class UpdateContactController 
{
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> displayContacts()
    {        
        return [
            
            SELECT Id, name, Email FROM Contact WHERE AccountId = null 
            
        ];        
    }   

    @AuraEnabled
    public static boolean updateAccountNameOfContact(List<String> conIds, String accId)
    {
        List<Contact> listOfContacts = new List<Contact>();
        Contact currentContact; 

        for(Integer i=0;i<conIds.size();i++)
        {
            currentContact = new Contact();
            
            String sContactId = conIds[i];            
            currentContact.Id = sContactId;
            System.debug('ContactId'+currentContact.Id);

            currentContact.AccountId = accId;
            System.debug('AccountId'+currentContact.AccountId);

            listOfContacts.add(currentContact);                
        }                              
               
        try
        {
            update(listOfContacts);		
        }
        catch(exception ex)
        {
            return false;
        }
        
        return true;
    }

    @AuraEnabled
    public static Boolean updateAccountNameOfOneContact(String conId, String accId)
    {          
        System.debug('INSIDE Apex');
        System.debug('CONTACT ID' + conId);

        System.debug('ACCOUNT ID ' + accId);
        

        Contact ct = [SELECT Name FROM Contact WHERE Id =: conId];
        ct.AccountId = accId;
        
        try
        {
            update ct;	
        }
        catch(exception ex)
        {
            System.debug('ERROR' + ex.getMessage());
            return false;
        }
        
        return true;


        

        /*Contact singleContact = new Contact();
        singleContact = [SELECT Name FROM Contact WHERE Id =: accId];

        singleContact.AccountId= this.accId ;*/
      


        /*List<Account> accounts = [Select ID, Name,(Select Name From Contacts)  From Account WHERE ID IN :setAccountIDs];
        for(Account a : accounts)
        {
            String accName = '';
            for(Contact c : a.Contacts){
                accName +=c.Name+ ' ';                      
            }
            a.Name=accName;
        }
        update accounts;*/
    }  
    
}
