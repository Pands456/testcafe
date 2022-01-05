//This Testcase will work on the Dsn which has Financial key Setup on PolicyLOB
import { Selector,Role } from 'testcafe';
import { createTestCafe } from 'testcafe';
import Colors from 'colors'
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import Input_Utility from '../Functional_Utilities/Input_Utility'
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import POM_Home from '../Functional_POM/POM_Home'; 
import Verification_Utility from '../Functional_Utilities/Verification_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import POM_FinancialReserves from '../Functional_POM/POM_FinancialReserves';
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';
import POM_PolicyTracking from '../Functional_POM/POM_PolicyTracking';
import POM_Search from '../Functional_POM/POM_Search';
import POM_Generic_Claims from '../Functional_POM/POM_Generic_Claims';
const Generic_Claims = new POM_Generic_Claims();
const Search_POM = new POM_Search();
const PolicyTracking = new POM_PolicyTracking();
const Payment_POM = new POM_PaymentsCollections();
const Reserve_Utility = new POM_FinancialReserves();
const DataIUT = require('../DataFiles/DataAutoReg.json');
const Home_POM = new POM_Home();
const In_Utility = new Input_Utility();
const Nav_Utility = new Navigation_Utility();
const Verify_Utility = new Verification_Utility();
const Verification_Msg = new POM_VerificationMessage();
const Generic_Utility = new GenericUsages_Utility();
const Function_Utility = new Functionality_Utility();

var faker = require('faker');

var StrClaimNumber;
var StrInsuredName;
DataIUT.forEach(data => {
    const LoggedInUser = Role(data.URL , async t => {
        await t.maximizeWindow()
        console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
        await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
        //Login into Claims zone
        await t.wait(5000)
        console.log("Login Into Application!!".green)
    },{ preserveUrl: true }
    );
    
    fixture `Policy System Download_ClaimCreation_Reserve_Payment_Collection `.beforeEach(async t => {
      await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
    });
    
test('Policy System Download Test_01', async t => { 
    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Document:Policy System Download");
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Generic_policysysdownload);
    await t.wait(5000)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_SubPolicyDownloadIframe)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_SubmitQuery,"Clicked on Submit Query Button")
    await t.wait(5000);
    await In_Utility.AssureClaims_SetValue_Utility(Generic_Claims.AssureClaimsApp_GenericClaim_ClkTxt_PolicyName,data.PolicyName,"PolicyName TextBox")
   
    await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Lnk_InternalPolicyName.withText(data.PolicyName),"Policy Name")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_PolicyPreview,"Right Click On Policy Preview")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_List.withText('Interest List'),"Open Interest List tab")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Chk_InterestListClaimant,"Check Claimant")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_List.withText('Unit List'),"Open Unit List tab")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Chk_UnitList,"Check Unit List")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Chk_PolicyProperty,"Check Policy Property List")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_InternalPolicySave,"Save Policy")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_PolicyDownload,"Download Policy")
    await t.wait(7000)
    //The Selected Policy Downloaded on New Claim
    await t.switchToMainWindow();
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    await In_Utility.AssureClaims_SetValue_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_DateOfEvent,d,"Date Of Event")
    await In_Utility.AssureClaims_SetValue_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_DateOfClaim,d,"Date Of Claim")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_TimeOfEvent,"Time Of Event")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_TimeOfClaim,"Time Of Claim")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_ClaimType,"Claim Type Lookup")
    const ele_CarrierClaimType=Generic_Claims.AssureClaims_GenericClaim_Lnk_SelectClaimType.withText(data.GCClaimType).with({visibilityCheck:true})
     await t.expect(ele_CarrierClaimType.exists).ok('',{timeout: 20000})
     await Nav_Utility.AssureClaims_ElementClick_Utility(ele_CarrierClaimType,"Claim Type Option")
     await In_Utility.AssureClaims_SetValue_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_ClaimInfo_Dept,data.Department,"Department")
     await t.pressKey('tab')
    // All the manadatroy fields of General Claim are Filled
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On General Claim creation Screen");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " General Claim Creation Screen");
    // Claim got Created with this  Policy Attached

    const ele2 = Generic_Claims.AssureClaims_Generic_Claim_Lnk_Claimant.withText(data.ClaimantName).with({ visibilityCheck: true })
    await t.expect(ele2.exists).ok('', { timeout: 20000 })
    console.log("Verification Of Existence For ".green+data.ClaimantName.yellow+"Is Successful".green)
  
    StrClaimNumber = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_ClaimNumber,"value");
    console.log("General Claim is Created with ClaimNumber:".green+StrClaimNumber);
     //==================================================Reserve Creation Started Here=====================================================
  await t.wait(3000)
    console.log("AssureClaims_ReserveAddition_Utility Function is Called To Create Carrier Reserve".yellow); 
    await Function_Utility.AssureClaims_CarrierReserveAddition_Utility(data.AmountType,data.PolicyLossCode,data.PolicyUnit,data.PolicyCoverage,data.ReserveStatus,data.ReserveType)
    console.log("New Carrier Reserve is Created".green);
     //==================================================Reserve Creation End Here=====================================================
   //-----------------------------------Payment Creation-----------------------------------------------------   
     await t.switchToMainWindow()
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.dvbreadcrumbscroll,"Breadcrumbs Clicked")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
    console.log("AssureClaims_PaymentAddition_Utility Function is Called To Create Carrier Payment".yellow); 
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_MakePayment,"Make Payment Button On Payment Creation Screen")
    await Function_Utility.AssureClaims_CarrierCollectionPaymentAddition_Utility(data.BankAccount,data.PayeeTypeClaimant,data.TransactionType,data.Amount,data.PolicyUnit,data.PolicyCoverage,data.PolicyLossCode)
    console.log("New Carrier Payment is Created".green);
//-----------------------------------Collection Creation-----------------------------------------------------   
    await t.switchToMainWindow()
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.dvbreadcrumbscroll,"Breadcrumbs Clicked")
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
   
    console.log("AssureClaims_CollectionPaymentAddition_Utility Function is Called To Create Carrier Payment".yellow); 
    // Carrier Collection starts
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_AddCollection, "Add collection Button On Payment Creation Screen")
    await Function_Utility.AssureClaims_CarrierCollectionPaymentAddition_Utility(data.BankAccount,data.PayeeTypeClaimant,data.TransactionType,data.Amount,data.PolicyUnit,data.PolicyCoverage,data.PolicyLossCode)
    console.log("New Carrier Collection is Created".green);
});

})