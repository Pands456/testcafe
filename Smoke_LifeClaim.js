import { Selector, Role } from 'testcafe';
import { createTestCafe } from 'testcafe';
import Colors from 'colors'

import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import Verification_Utility from '../Functional_Utilities/Verification_Utility';
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Input_Utility from '../Functional_Utilities/Input_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import Maintenance_Functionality_Utility from '../Functional_Utilities/Maintenance_Functionality_Utility';

import POM_Home from '../Functional_POM/POM_Home';
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import POM_FinancialReserves from '../Functional_POM/POM_FinancialReserves';
import POM_Document_Event from '../Functional_POM/POM_Document_Event';
import POM_Life_Claims from '../Functional_POM/POM_Life_Claims';
import POM_Claimant from '../Functional_POM/POM_Claimant';
import POM_Defendant from '../Functional_POM/POM_Defendant';
import POM_Adjuster from '../Functional_POM/POM_Adjuster';
import POM_Subrogation from '../Functional_POM/POM_Subrogation';
import POM_Litigation from '../Functional_POM/POM_Litigation';
import POM_Arbitration from '../Functional_POM/POM_Arbitration';
import POM_AttachCreateDiary from "../Functional_POM/POM_AttachCreateDiary";
import POM_MedicalStaff from '../Functional_POM/POM_MedicalStaff'

const Verify_Utility = new Verification_Utility();
const Nav_Utility = new Navigation_Utility();
const In_Utility = new Input_Utility();
const Generic_Utility = new GenericUsages_Utility();
const Function_Utility = new Functionality_Utility();
const Verification_Msg = new POM_VerificationMessage();

const Home_POM = new POM_Home();
const Life_Claims = new POM_Life_Claims();
const AttachCreateDiary_POM = new POM_AttachCreateDiary();

var faker = require('faker');
const DataIUT = require('../DataFiles/DataAutoReg.json');

var StrLifeClaimNumber;
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

  test('AssureClaim_LCEdit_Test_02', async t =>{
    await Function_Utility.AssureClaims_SearchClaim(StrLifeClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_LifeClaim_ClaimLCIframe)
    console.log("Life Claim Edit Started Here".yellow);
    //await Nav_Utility.AssureClaims_ElementClick_Utility(Life_Claims.AssureClaims_LifeClaim_Tab_ClaimInfo,"Claim Info Tab Is Clicked");
    await Nav_Utility.AssureClaims_ElementClick_Utility(Life_Claims.AssureClaims_LifeClaim_Txt_FileNumber,"File Number Is Clicked");
    await In_Utility.AssureClaims_SetValueAndTabOut_Utility(Life_Claims.AssureClaims_LifeClaim_Txt_FileNumber,"1234","File Number is Entered")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Life Claim creation Screen");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " Life Claim Creation Screen");
    console.log("Life Claim Edit Completed Here".yellow);
    //Claim Edit Is Done Here
   });
  
  test('AssureClaims_DiaryCreation_Test_03', async t => {
    var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    await Function_Utility.AssureClaims_SearchClaim(StrLifeClaimNumber);
   await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_LifeClaim_ClaimLCIframe)
    console.log("AssureClaims_Diary_Creation_Utility is Called To Create Diary".yellow);
    await Nav_Utility.AssureClaims_ElementClick_Utility(AttachCreateDiary_POM.AssureClaims_AttachCreate_Diary_Tab_Diary, "Diary click");
    await Function_Utility.AssureClaims_AttachCreateEdit_Diary_Utility("Create", "Diary note test", "WrkAct_Test", d, "8");
    await t.wait(4000);
    await t.switchToMainWindow();
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_LifeClaim_ClaimLCIframe)
    await Nav_Utility.AssureClaims_ElementClick_Utility(AttachCreateDiary_POM.AssureClaims_AttachCreate_ViewDiary_Btn, "View Record Diary btn click");
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_DairyIframe);
    await t.wait(2000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(AttachCreateDiary_POM.AssureClaims_AttachCreate_Btn_SelectGrid, "Select the Grid");
    await Nav_Utility.AssureClaims_ElementClick_Utility(AttachCreateDiary_POM.AssureClaims_AttachCreate_Btn_Complete, "Click on complete btn");
    await Nav_Utility.AssureClaims_ElementClick_Utility(AttachCreateDiary_POM.AssureClaims_AttachCreate_Btn_DairyDone, "Dairy complete done");
    await t.wait(4000)
    await Verify_Utility.AssureClaims_ElementExist_Utility(AttachCreateDiary_POM.AssureClaims_AttachCreate_Txt_NoRecordAvailable,"No Records Available.");
  });

  test('EnhancedNotesCreateEditDelete_Test_04', async t => {
    //Search the created Life claim
    await Function_Utility.AssureClaims_SearchClaim(StrLifeClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_LifeClaim_ClaimLCIframe)
    //EnhancedNotes Created and edited
    //============================================================Life Claim => EnhancedNotes start=======================================================================
   var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    var NoteText = 'CreateNote_' + faker.name.lastName();
    var EditNoteText = 'editNote_' + faker.name.firstName();
    await Function_Utility.AssureClaims_EnhancedNotesCreateEditDelete_Utility("Create/Edit", NoteText, data.ExNoteType2, EditNoteText);
  });
  //============================================================Life Claim => EnhancedNotes end=======================================================================

  test('DeleteClaim_Test_05', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrLifeClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_LifeClaim_ClaimLCIframe)
    /*===========================================================Claim Delete Is Started Here========================================================================================================================================================================================================================================================================================================*/
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_DeleteRecord, "Delete claim")
    /*===========================================================Claim Delete Is Completed Here========================================================================================================================================================================================================================================================================================================*/
  });
});






