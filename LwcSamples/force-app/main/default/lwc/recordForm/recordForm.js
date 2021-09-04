import { LightningElement, api } from 'lwc';

//import NAME_FIELD from '@salesforce/schema/Contact.Name';
import SALUTATION_FIELD from '@salesforce/schema/Contact.Salutation';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import TITLE_FIELD from '@salesforce/schema/Contact.Title'
import ACCOUNTNAME_FIELD from '@salesforce/schema/Contact.AccountId';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RecordForm extends LightningElement 
{
    @api recordId;
    @api objectApiName;

    selectedFields = [SALUTATION_FIELD, FIRSTNAME_FIELD,LASTNAME_FIELD, EMAIL_FIELD, PHONE_FIELD, ACCOUNTNAME_FIELD, TITLE_FIELD];

    handleSuccess(event)
    {
        const evt = new ShowToastEvent({
            title   : "Contact Created",
            message : "Record ID:"+event.detail.id,
            variant : "success"
        });
        this.dispatchEvent(evt);
    }
}