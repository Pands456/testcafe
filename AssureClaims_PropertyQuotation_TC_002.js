import { Selector,Role } from 'testcafe';
import { createTestCafe } from 'testcafe';
import Colors from 'colors'
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import Verification_Utility from '../Functional_Utilities/Verification_Utility';
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';

const AssureClaims_DataIUT = require('../DataFiles/DataIUT.json');
const Function_Utility = new Functionality_Utility();
const Verify_Utility = new Verification_Utility();
const Verification_Msg = new POM_VerificationMessage();
AssureClaims_DataIUT.forEach(data => {
const LoggedInUser = Role(data.URL , async t => {
    await t.maximizeWindow()
    console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
    await t.wait(5000)
    console.log("Login Into Application!!".green)
},{ preserveUrl: true }
);

fixture `PropertyQuotation`.beforeEach(async t => {
  await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
});

test('AssureClaims_PropertyQuotation_TC_002', async t => {
            
        var date = new Date();
        var d = (date.getMonth()+1)+'/'+(date.getDate()-1)+'/'+date.getFullYear();
        var StrClaimNumber;
        var QuotationNumber;

        StrClaimNumber = await Function_Utility.AssureClaims_GeneralClaimCreation(d,d,data.ClaimStatus,data.GCClaimType,data.Department,data.GCPolicyLOB)
        
        await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility("PropertyLoss",data.PropertyId,"","")
        console.log("Property Loss is Added On Claim with Property ID: ".green+data.PropertyId);

        QuotationNumber = await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility("PropertyQuotation","Open","15","10")
        console.log("New Quotation is Created with Quotation Number: ".green+QuotationNumber);
       
        await Function_Utility.AssureClaims_GenericDelete_Utility("False", "Property Quotation Creation Screen", "", "");
        await Function_Utility.AssureClaims_GenericDelete_Utility("True", "Property Quotation Creation Screen", "", "");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "Property Quotation Creation Screen");
        //Created Quotation Is Deleted Here
     });

test.after(async t =>{
        await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
        console.log("AssureClaims_LogoutFromApplication_Utility Function Is Called To LogOut From Application!!".yellow);
        await Function_Utility.AssureClaims_LogoutFromApplication_Utility();
        
});
});