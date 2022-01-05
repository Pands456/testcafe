import { Selector, Role } from 'testcafe';
import { createTestCafe } from 'testcafe';
import Colors from 'colors'

import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import Verification_Utility from '../Functional_Utilities/Verification_Utility';
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Input_Utility from '../Functional_Utilities/Input_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';

import POM_Home from '../Functional_POM/POM_Home';
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import POM_Life_Claims from '../Functional_POM/POM_Life_Claims';


const Verify_Utility = new Verification_Utility();
const Nav_Utility = new Navigation_Utility();
const In_Utility = new Input_Utility();
const Generic_Utility = new GenericUsages_Utility();
const Function_Utility = new Functionality_Utility();
const Verification_Msg = new POM_VerificationMessage();

const Home_POM = new POM_Home();
const Life_Claims = new POM_Life_Claims();

var faker = require('faker');
const DataIUT = require('../DataFiles/DataSTG.json');

var StrLifeClaimNumber;
var firstname;
var lastname;
//Global Variable Declaration

DataIUT.forEach(data => {
  const LoggedInUser = Role(data.URL, async t => {
    await t.maximizeWindow()
    console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username, data.Password, data.DSN, 'Claims')
    await t.wait(5000)
    console.log("Login Into Application!!".green)
  }, { preserveUrl: true }
  );

  fixture`LifeClaim_Exhaustive_Smoke`.beforeEach(async t => {
    await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
  });

  
  test('AssureClaims_LCCreation_Test_01', async t => {
    var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    //======LifeClaim Creation Started Here=====================
    console.log("AssureClaims_LifeClaimCreation Function is Called To Create Claim".yellow);
    StrLifeClaimNumber = await Function_Utility.AssureClaims_LifeClaimCreation(d, d, data.ClaimStatus, data.LCClaimType, data.Department, data.LCPolicyLOB , data.LCMannerOfDeath ,data.LCCauseOfDeath , data.EstateProbated , data.DeceasedMaritalStatus , data.SpouseLiving ,data.PolicySystem,data.LifePolicyName)
    console.log("New Life Claim is Created with Claim Number: ".green + StrLifeClaimNumber);
    //======LifeClaim Creation Completed Here=====================
        
  });

  test('PayeeCreateEditDelete_Test_02', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrLifeClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_LifeClaim_ClaimLCIframe);
   //await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_ErrorToastMsgClose,"Close button On Error Toaster Is Clicked")
    //=====================================================Payee Creation On Created Claim Started Here=====================================================
    console.log("AssureClaims_ClaimEventEntityAddition_Utility Function is Called To Create Claimant".yellow);
    await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility("Payee",data.Country,data.State,"NA")
    console.log("Payee is Created on Life Claims");
    await Nav_Utility.AssureClaims_ElementClick_Utility(Life_Claims.AssureClaims_Claimant_Tab_ClaimantAttorney, "Claimant Attorney Tab On Claimant Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Life_Claims.AssureClaims_Claimant_Tab_Supplementals, "Supplementals Tab On Claimant Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Life_Claims.AssureClaims_Claimant_Tab_ClaimantInfo, "Claimant Info Tab On Claimant Screen")
    //Verification That All Tabs Are Present For Payee Screen
    console.log("AssureClaims_ClaimEventEntityEdit_Utility Function is Called To Edit The Created Payee".yellow);
    var ClaimantLastName = await Function_Utility.AssureClaims_ClaimEventEntityEdit_Utility("Payee", "NA", "NA", "NA");
    console.log("Created Payee is Edited with New Last Name: ".green + ClaimantLastName);
    //Created Payee Entity Is Edited Here
    await Function_Utility.AssureClaims_GenericDelete_Utility("False", "Payee Creation Screen", "", "");
    await Function_Utility.AssureClaims_GenericDelete_Utility("True", "Payee Creation Screen", "", "");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "Payee Creation Screen");
    //Created Payee Entity Is Deleted Here
    //=======================================================Payee Creation On Created Claim Completed Here ===========================================================   
  });
  test('AssureClaims_PersonInvolved_Test_03', async t => {

    await t.wait(5000)
    await Function_Utility.AssureClaims_SearchClaim(StrLifeClaimNumber)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_LifeClaim_ClaimLCIframe)
    //await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_ErrorToastMsgClose,"Close button On Error Toaster Is Clicked")
    /*==========================================================Adding Party As PI On Created LC Claim Started Here========================================================================================================================================================================================================================================================================================================*/
    console.log("AssureClaims_PersonInvolvedAddNewEntity_Utility Function is Called To Create Party As PI On Created LC Claim".yellow); 
    await Function_Utility.AssureClaims_PersonInvolvedAddNewEntity_Utility("Party", "NA", "NA","NA");
    console.log("Party is added as Person Involved on Created Claim ".green);
    firstname= await Verify_Utility.AssureClaims_AttributeFetch_Utility(Life_Claims.AssureClaims_PIParty_Txt_FirstName,"FirstName Value")
    lastname=await Verify_Utility.AssureClaims_AttributeFetch_Utility(Life_Claims.AssureClaims_PIParty_Txt_LastName,"LastName Value")
    console.log("FirstName Is fetched".firstname+lastname)
    
    //Party as PI On Life Claim
   /*==========================================================Adding Party As PI On Created LC Claim Completed Here========================================================================================================================================================================================================================================================================================================*/
});
  test('AssureClaims_IncludeCoverage_test_04', async t => {
    await t.wait(5000)
    await Function_Utility.AssureClaims_SearchClaim(StrLifeClaimNumber)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_LifeClaim_ClaimLCIframe)
    /*==========================================================Including Coverage On Created LC Claim Started Here========================================================================================================================================================================================================================================================================================================*/
    console.log("Including Coverage On Created LC Claim Started".yellow); 
    await Nav_Utility.AssureClaims_ElementClick_Utility(Life_Claims.AssureClaim_Btn_PolicyOpen,"Policy Open Button Is Clicked")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Life_Claims.AssureClaims_Btn_CoveragesDetails,"Coverages Details Button Is Clicked")
    console.log("Covergaes Details Screen Is Opened")
    await t.wait(5000)
    await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Life_Claims.AssureClaims_Chk_Coverage,"Check","Coverage Checkbox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Life_Claims.AssureClaims_Btn_Ok,"Ok Button On Confirm Popup")
    await t.wait(5000)
    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back,"Back Button On Coverages Details Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back,"Back Button On Policy Tracking Screen")
    console.log("Including Coverage On Created LC Claim Completed".yellow); 
    //Coverages Added
   /*==========================================================Including Coverage On Created LC Claim Completed Here========================================================================================================================================================================================================================================================================================================*/

  });
  test('AssureClaims_AddDesignation_test_05', async t => {
    await t.wait(5000)
    await Function_Utility.AssureClaims_SearchClaim(StrLifeClaimNumber)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_LifeClaim_ClaimLCIframe)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Life_Claims.AssureClaims_Btn_Designations,"Designations Button Is Clicked")
    await Verify_Utility.AssureClaims_ElementExist_Utility(Life_Claims.AssureClaims_Btn_AddDesignee,"Add Designee Button Is Present")
    await Verify_Utility.AssureClaims_ElementExist_Utility(Life_Claims.AssureClaims_Btn_DeleteDesignee,"Delete Designee Button Is Present")
    //await Nav_Utility.AssureClaims_ElementClick_Utility(Life_Claims.AssureClaims_Lst_PartiesInvolved,"Parties Involved Dropdown")
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(Life_Claims.AssureClaims_Lst_PartiesInvolved,firstname+" "+lastname+" - Beneficiary","Party Involved On Designee Screen")
    //await Nav_Utility.AssureClaims_ElementClick_Utility(Life_Claims.AssureClaims_Lst_Policy,"Policies Dropdown")
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(Life_Claims.AssureClaims_Lst_Policy,data.LifePolicyName,"Policies On Designee Screen")
    //await Nav_Utility.AssureClaims_ElementClick_Utility(Life_Claims.AssureClaims_Lst_Coverage,"CoveragesDropdown")
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(Life_Claims.AssureClaims_Lst_Coverage,data.LifeCoverage,"Coverages Involved On Designee Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Life_Claims.AssureClaims_Btn_AddDesignee,"Designee Added Successfully")
    
  });
});






