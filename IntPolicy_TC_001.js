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
import Maintenance_Functionality_Utility from '../Functional_Utilities/Maintenance_Functionality_Utility';
import POM_PolicyTracking from '../Functional_POM/POM_PolicyTracking';
import POM_Search from '../Functional_POM/POM_Search';
import POM_Life_Claims from '../Functional_POM/POM_Life_Claims';
const Maint_Utility = new Maintenance_Functionality_Utility();
const Search_POM = new POM_Search();
const PolicyTracking = new POM_PolicyTracking();
const Payment_POM = new POM_PaymentsCollections();
const Reserve_Utility = new POM_FinancialReserves();
const DataIUT = require('../DataFiles/DataIUT.json');
const Home_POM = new POM_Home();
const In_Utility = new Input_Utility();
const Nav_Utility = new Navigation_Utility();
const Verify_Utility = new Verification_Utility();
const Verification_Msg = new POM_VerificationMessage();
const Generic_Utility = new GenericUsages_Utility();
const Function_Utility = new Functionality_Utility();

var faker = require('faker');

var PolicyName;
var StrClaimNumber;
var LastName1
var LastName2
DataIUT.forEach(data => {
    fixture `Smoke_Funds`.beforeEach(async t => {
            await t.wait(4000)
            await t.navigateTo(data.URL)
            await t.maximizeWindow()    
  });
  test('Entity Creation From Maintenance_Test_01', async t => { 
    console.log("Entity Creation From Maintenance_Test_01 Started".rainbow);
    await t.wait(10000)
    console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Maintenance')
    await t.wait(5000)
    console.log("Login Into Application->Maintenance!!".green)

 //===============================================Entity Maintenance Start Here=================================================
   console.log("AssureClaims_MaintenanceAddNewEntity_Utility Function is Called To Create Entity".yellow);
   LastName1 = await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Utility("Entity", data.EntityTypePolicyMCO, "SSN","");
   console.log("First Entity is Created with Last Name: ".green+LastName1);
  //New Entity Is Created
//=================================================Entity Maintenance End Here===============================================

  });
test('Entity Creation From Maintenance_Test_02', async t => { 
    console.log("Entity Creation From Maintenance_Test_02 Started".rainbow);
    await t.wait(10000)
    console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Maintenance')
    await t.wait(5000)
    console.log("Login Into Application->Maintenance!!".green)

//===============================================Entity Maintenance Start Here=================================================
console.log("AssureClaims_MaintenanceAddNewEntity_Utility Function is Called To Create Entity".yellow);
LastName2 = await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Utility("Entity", data.EntityTypePolicyMCO, "SSN","");
console.log("Second Entity is Created with Last Name: ".green+LastName2);
//New Entity Is Created
//=================================================Entity Maintenance End Here===============================================

});
    
test('PolicyTracking Creation From Maintenance_Test_03', async t => { 
    console.log("PolicyTracking Creation From Maintenance_Test_03 Started".rainbow);
    await t.wait(10000)
    console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Maintenance')
    await t.wait(5000)
    console.log("Login Into Application->Maintenance!!".green)

    PolicyName = await Maint_Utility.AssureClaims_PolicyTrackingCreation(data.Premium,data.InternalPolicyStatus,data.InternalPolicyLOB,data.InternalInsurer,data.InternalInsured,data.InternalInsured1,data.InternalCoverageType,data.InternalPolicyLimit,data.InternalPolicyMco);
    console.log("New Internal Policy is Created with Policy Name: ".green+PolicyName);
   
});

test('GeneralClaim with Internal Policy Attach Creation Test_04', async t => {
    console.log("GeneralClaim Creation_Test_04 Started".rainbow);
    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
    console.log(`Login Into Application->Claims`)
    //Login Into Application with User  
    console.log("AssureClaims_GeneralClaimCreation Function is Called To Create GeneralClaim".yellow);
    var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    StrClaimNumber = await Function_Utility.AssureClaims_GeneralClaimCreation(d,d,data.ClaimStatus,data.InternalGCClaimType,data.Department,data.GCPolicyLOB);
    console.log("New ClaimNumber is Created with ID: ".green+StrClaimNumber);
    //New GeneralClaim Is Created
     //Attaching Policy To the Claim
     await t.wait(4000);
    await Nav_Utility.AssureClaims_ElementClick_Utility(PolicyTracking.AssureClaims_GenericClaim_Btn_PolicyNameLookup,"Policy Name Lookup clicked")
    await t.wait(6000);
    await Nav_Utility.AssureClaims_ElementClick_Utility(PolicyTracking.AssureClaims_GenericClaim_Lnk_PolicyName.withText(PolicyName),"PolicyName link clicked")
    await t.wait(2000);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On PolicyTracking creation Screen");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " PolicyTracking Creation Screen");
});

test('Reserve  Creation On Attached Internal Policy Test_05', async t => {
    console.log("Reserve Creation_Test_05 Started".rainbow);
    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
    console.log(`Login Into Application->Claims`)
//Login Into Application with User 
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber)
//Claim with Attached internal Policy is Searched
    await t.switchToMainWindow();
    await t.wait(3000)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await t.wait(3000)
//--------------------------------Reserve Creation------------------------------------------------
    console.log("AssureClaims_Reserve_Utility Function is Called To Create Reserve ".yellow);
    await Function_Utility.AssureClaims_Reserve_Utility(data.ReserveType,data.ReserveAmount,data.ReserveStatus)
    console.log("New Reserve is Created");
//New Reserve Is Created
});

test('Payment  Creation On Attached Internal Policy Test_06', async t => {
    console.log("Payment Creation_Test_06 Started".rainbow);
    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
    console.log(`Login Into Application->Claims`)
//Login Into Application with User 
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber)
//Claim with Attached internal Policy is Searched
    await t.switchToMainWindow();
    await t.wait(3000)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await t.wait(3000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
//---------------------------------------------Payment Creation------------------------------------------------------
    console.log("AssureClaims_PaymentCorpAddition_Utility Function is Called To Create Payment ".yellow);
    await Function_Utility.AssureClaims_PaymentCorpAddition_Utility(data.BankAccount,data.PayeeType,data.LastName,data.ReserveType,data.TransactionType,data.PaymentAmount)
    console.log("New Combined Payment is Created");
});

test('Collection Creation Attached Internal Policy Test_07', async t => {
    console.log("Collection Creation_Test_07 Started".rainbow);
    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
    console.log(`Login Into Application->Claims`)
    //Login Into Application with User 
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber)
//Claim with Attached internal Policy is Searched
    await t.switchToMainWindow();
    await t.wait(3000)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await t.wait(3000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
//---------------------------------------------Collection Creation------------------------------------------------------
    console.log("AssureClaims_CollectionCorpAddition_Utility Function is Called To Create Reserve ".yellow);
    await Function_Utility.AssureClaims_CollectionCorpAddition_Utility(data.BankAccount,data.PayeeType,data.LastName,data.ReserveType,data.TransactionType,data.PaymentAmount)
    console.log("New Payment is Createdr");
//New Collection Is Created
});


test('Search Policy From Maintenance Test_07', async t => {
    console.log("Search Policy From Maintenance Test_07 Started".rainbow);
    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Maintenance')
    console.log(`Login Into Application->Claims`)
//Login Into Application with User 

    await Maint_Utility.AssureClaims_SearchClaim(PolicyName)
//Search Is Complete
    await t.switchToMainWindow();
    await t.switchToIframe(Selector('[id^="policy_"]').nth(1));// POM to be USEd
    // await Generic_Utility.AssureClaims_DynamicFrameSwitching1(Verification_Msg.AssureClaims_Generic_PolicyTrackingIFrame);
    await t.wait(5000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(PolicyTracking.AssureClaims_Policy_AddBtn_PolicyMCO,"Add Policy MCO Button on PolicyTracking Page")

    await In_Utility.AssureClaims_SetValue_Utility(PolicyTracking.AssureClaims_Policy_Txt_PolicyMCO,LastName1,"Text is Typing On PolicyMCO")
    await t.pressKey('tab');
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On PolicyTracking creation Screen");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " PolicyTracking Creation Screen");
    await t.switchToMainWindow();
    await t.wait(2000);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back,"Back btn pressed");
   
    await t.wait(3000)
       await t.switchToIframe(Selector('[id^="policy_"]').nth(1));// POM to be USED

    await Nav_Utility.AssureClaims_ElementClick_Utility(PolicyTracking.AssureClaims_Policy_AddBtn_PolicyMCO,"Add Policy MCO Button on PolicyTracking Page")
    await In_Utility.AssureClaims_SetValue_Utility(PolicyTracking.AssureClaims_Policy_Txt_PolicyMCO,LastName2,"PolicyMCO")
    await t.pressKey('tab');
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On PolicyTracking creation Screen");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " PolicyTracking Creation Screen");
    //--------------------Editing Second Policy MCO---------------------------------------------------------------------------------
    await In_Utility.AssureClaims_SetValue_Utility(PolicyTracking.AssureClaims_Policy_Txt_PolicyMCO,LastName1,"PolicyMCO")
    await t.pressKey('tab');
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On PolicyTracking creation Screen");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " PolicyTracking Creation Screen");
//--------------------------------------------Delete of Second Policy Mco------------------------------------------------------
    await Function_Utility.AssureClaims_GenericDelete_Utility("False", "PolicyMCO Creation Screen", "", "");
    await Function_Utility.AssureClaims_GenericDelete_Utility("True", "PolicyMCO Creation Screen", "", "");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "PolicyMCO Creation Screen");
    //Created Policy MCO Entity Is Deleted Here
   
    await t.switchToMainWindow();
    await t.wait(3000)
           await t.switchToIframe(Selector('[id^="policy_"]').nth(1));//POM to be used
           await t.wait(3000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(PolicyTracking.AssureClaims_Policy_Lnk_PolicyCoverage.withText(data.InternalCoverageType)," Policy Coverage Link on PolicyTracking Page")
    //--------------------------------------------Delete of Policy Coverage------------------------------------------------------
    await Function_Utility.AssureClaims_GenericDelete_Utility("False", "PolicyCoverage Creation Screen", "", "");
    await Function_Utility.AssureClaims_GenericDelete_Utility("True", "PolicyCoverage Creation Screen", "", "");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "PolicyCoverage Creation Screen");
    //Created Policy Coverage Entity Is Deleted Here
    await t.switchToMainWindow();
  
    await t.wait(3000)
    await t.switchToIframe(Selector('[id^="policy_"]').nth(1));//POM to be used
     //--------------------------------------------Delete of Internal Policy------------------------------------------------------
     await Function_Utility.AssureClaims_GenericDelete_Utility("False", "Policy Creation Screen", "", "");
    // await Generic_Utility.AssureClaims_DynamicFrameSwitching1(Verification_Msg.AssureClaims_Generic_PolicyTrackingIFrame);

       await Function_Utility.AssureClaims_GenericDelete_Utility("True", "Policy Creation Screen", "", "");
     await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "Policy Creation Screen");
     //Created Policy Entity Is Deleted Here


  
});
})
