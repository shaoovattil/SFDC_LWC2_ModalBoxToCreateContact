import { LightningElement, api } from 'lwc';
import SALUTATION_FIELD from '@salesforce/schema/Contact.Salutation';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import ACCOUNTNAME_FIELD from '@salesforce/schema/Contact.AccountId';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import updateAccountNameOfOneContact from '@salesforce/apex/UpdateContactController.updateAccountNameOfOneContact';
import ContactId from '@salesforce/schema/Case.ContactId';

export default class ModalPopup extends LightningElement 
{   
    @api recordId;
    showModal = false;    
    @api accoId; 
    @api ContId;
    
    selectedFields = [SALUTATION_FIELD, FIRSTNAME_FIELD,LASTNAME_FIELD, EMAIL_FIELD, PHONE_FIELD, ACCOUNTNAME_FIELD, TITLE_FIELD];
   
    @api show(acId)
    {             
        this.accoId = acId;
        console.log('Account ID',this.accoId); 
        this.showModal = true;        
    }

    handleDialogClose()
    {
        this.showModal = false;
    }    

    handleSuccess(event)
    {  
        console.log('FIRST CURRENT RECORD ID' +event.detail.id );
        this.ContId = event.detail.id;
        console.log('MIDDLE CURRENT RECORD ID' +this.ContId );

        updateAccountNameOfOneContact( {conId:this.ContId, accId:this.accoId})        
        .then(result =>
        {
            //alert("Successfully Updated");
            //this.showSuccessToast();
            console.log('Success: Updated'); 
            this.error = undefined;            
            //return refreshApex(this.contacts);
        })
        .catch(error =>
        {
            //this.showErrorToast();
            console.log('Error: Failed to Update'); 
            this.error = error;
        })        

        const evt = new ShowToastEvent({
            title: "Contact created",
            message: "Record ID: " + event.detail.id,            
            variant: "success"
        });
        
        this.dispatchEvent(evt);   
        this.showModal = false;       
        console.log('LAST CURRENT RECORD ID' +event.detail.id );
    }    
}

