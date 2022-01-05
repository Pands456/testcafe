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
import POM_Generic_Claims from '../Functional_POM/POM_Generic_Claims';
import POM_Claimant from '../Functional_POM/POM_Claimant';
import POM_Defendant from '../Functional_POM/POM_Defendant';
import POM_Adjuster from '../Functional_POM/POM_Adjuster';
import POM_Subrogation from '../Functional_POM/POM_Subrogation';
import POM_Litigation from '../Functional_POM/POM_Litigation';
import POM_Arbitration from '../Functional_POM/POM_Arbitration';
import POM_AttachCreateDiary from "../Functional_POM/POM_AttachCreateDiary";
import POM_MedicalStaff from '../Functional_POM/POM_MedicalStaff'

const Maint_Utility = new Maintenance_Functionality_Utility();
const Verify_Utility = new Verification_Utility();
const Nav_Utility = new Navigation_Utility();
const In_Utility = new Input_Utility();
const Generic_Utility = new GenericUsages_Utility();
const Function_Utility = new Functionality_Utility();
const Verification_Msg = new POM_VerificationMessage();
const Reserve_Utility = new POM_FinancialReserves();
const Medstaff_POM = new POM_MedicalStaff();

const Home_POM = new POM_Home();
const Payment_POM = new POM_PaymentsCollections();
const Event_POM = new POM_Document_Event();
const Generic_Claims = new POM_Generic_Claims();
const Claimant_POM = new POM_Claimant();
const Adjuster_POM = new POM_Adjuster();
const Defendant_POM = new POM_Defendant();
const Subrogation_POM = new POM_Subrogation();
const Litigation_POM = new POM_Litigation();
const Arbitration_POM = new POM_Arbitration();
const AttachCreateDiary_POM = new POM_AttachCreateDiary();

var faker = require('faker');
const DataIUT = require('../DataFiles/DataIUT.json');

var StrClaimNumber;
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

  fixture`GeneralClaim_Exhaustive_Smoke`.beforeEach(async t => {
    await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
  });

  test('AssureClaims_EventCreation_Test_01', async t => {
    var StrEventNumber;
    var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    console.log("AssureClaims_EventCreation Function is Called To Create Event".yellow);
    StrEventNumber = await Function_Utility.AssureClaims_EventCreation(d, d, data.EventStatus, data.EventType, data.Department)
    console.log("New Event  is Created with Event Number: ".green + StrEventNumber);
    //Event Creation
    await Nav_Utility.AssureClaims_ElementClick_Utility(Event_POM.AssureClaims_EventCreation_Tab_EventInfo, "Event Info Tab On Event Creation Page")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Event_POM.AssureClaims_EventCreation_Tab_EventDetail, "Event Detail Tab On Event Creation Page")
    await In_Utility.AssureClaims_SetValue_Utility(Event_POM.AssureClaims_EventCreation_Txt_CountyOfInjury, "County", "County Text Box On Event Detail Tab Of Event Creation Page")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Event_POM.AssureClaims_EventCreation_Tab_ReportedInfo, "Reported Info Tab On Event Creation Page")
    await In_Utility.AssureClaims_SetValue_Utility(Event_POM.AssureClaims_EventCreation_Txt_ReporterLastName, "LName", "Reported Last Name Text Box On Reported Info Tab Of Event Creation Page")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Event_POM.AssureClaims_EventCreation_Tab_FollowUp, "Follow Up Tab On Event Creation Page")
    await In_Utility.AssureClaims_SetValue_Utility(Event_POM.AssureClaims_EventCreation_Txt_Outcome, "OutCome", "Outcome Text Box On Follow Up Tab Of Event Creation Page")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Event_POM.AssureClaims_EventCreation_Tab_Supplementals, "Supplementals Tab On Event Creation Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Event creation Screen");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Event Save");
    //Verification That All Tabs Are Present For Event Screen
    await Function_Utility.AssureClaims_GenericDelete_Utility("False", "Event Creation Screen", "NA", "NA");
    await Function_Utility.AssureClaims_GenericDelete_Utility("True", "Event Creation Screen", "NA", "NA");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "Event Creation Screen");
    //Created Event Is Deleted Here       
  });

  test('AssureClaims_GCCreation_Test_02', async t => {
    var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    //======Claim Creation Started Here=====================
    console.log("AssureClaims_GeneralClaimCreation Function is Called To Create Claim".yellow);
    StrClaimNumber = await Function_Utility.AssureClaims_GeneralClaimCreation(d, d, data.ClaimStatus, data.GCClaimType, data.Department, data.GCPolicyLOB)
    console.log("New General Claim is Created with Claim Number: ".green + StrClaimNumber);
    //Claim Creation  completed      
  });

  test('AssureClaims_DiaryCreation_Test_03', async t => {
    var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    console.log("AssureClaims_Diary_Creation_Utility is Called To Create Diary".yellow);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    await Nav_Utility.AssureClaims_ElementClick_Utility(AttachCreateDiary_POM.AssureClaims_AttachCreate_Diary_Tab_Diary, "Diary click");
    await Function_Utility.AssureClaims_AttachCreateEdit_Diary_Utility("Create", "Diary note test", "WrkAct_Test", d, "8");
    await t.wait(4000);
    await t.switchToMainWindow();
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    await Nav_Utility.AssureClaims_ElementClick_Utility(AttachCreateDiary_POM.AssureClaims_AttachCreate_ViewDiary_Btn, "View Record Diary btn click");
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_DairyIframe);
    await t.wait(2000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(AttachCreateDiary_POM.AssureClaims_AttachCreate_Btn_SelectGrid, "Select the Grid");
    await Nav_Utility.AssureClaims_ElementClick_Utility(AttachCreateDiary_POM.AssureClaims_AttachCreate_Btn_Complete, "Click on complete btn");
    await Nav_Utility.AssureClaims_ElementClick_Utility(AttachCreateDiary_POM.AssureClaims_AttachCreate_Btn_DairyDone, "Dairy complete done");
    await t.wait(4000)
    await Verify_Utility.AssureClaims_ElementExist_Utility(AttachCreateDiary_POM.AssureClaims_AttachCreate_Txt_NoRecordAvailable,"No Records Available.");
  });

  test('ClaimantCreateEditDelete_Test_04', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    //=====================================================Claimant Creation On Created Claim Started Here=====================================================
    console.log("AssureClaims_ClaimEventEntityAddition_Utility Function is Called To Create Claimant".yellow);
    await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility("Claimant", "Australia", "Victoria", "NA")
    console.log("Claimant is Created on Carrier Claims");
    await Nav_Utility.AssureClaims_ElementClick_Utility(Claimant_POM.AssureClaims_Claimant_Tab_ClaimantAttorney, "Claimant Attorney Tab On Claimant Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Claimant_POM.AssureClaims_Claimant_Tab_Supplementals, "Supplementals Tab On Claimant Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Claimant_POM.AssureClaims_Claimant_Tab_ClaimantInfo, "Claimant Info Tab On Claimant Screen")
    //Verification That All Tabs Are Present For Claimant Screen
    console.log("AssureClaims_ClaimEventEntityEdit_Utility Function is Called To Edit The Created Claimant Tracking".yellow);
    var ClaimantLastName = await Function_Utility.AssureClaims_ClaimEventEntityEdit_Utility("Claimant", "NA", "NA", "NA");
    console.log("Created Claimant is Edited with New Last Name: ".green + ClaimantLastName);
    //Created Claimant Entity Is Edited Here
    await Function_Utility.AssureClaims_GenericDelete_Utility("False", "Claimant Creation Screen", "", "");
    await Function_Utility.AssureClaims_GenericDelete_Utility("True", "Claimant Creation Screen", "", "");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "Claimant Creation Screen");
    //Created Claimant Entity Is Deleted Here
    //=======================================================Claimant Creation On Created Claim Completed Here ===========================================================   
  });

  test('AdjusterCreateEditDelete_Test_05', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    //=======================================================Adjuster Creation On Created Claim Started Here====================================================      
    await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility("Adjuster", "Australia", "Victoria", "NA")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Adjuster_POM.AssureClaims_Adjuster_Tab_Supplementals, "Supplementals Tab On Adjuster Creation Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Adjuster_POM.AssureClaims_Adjuster_Tab_ClaimAdjusterInfo, "Claim Adjuster Information Tab On Adjuster Creation Screen")
    //Verification That All Tabs Are Present For Adjuster Screen
    console.log("AssureClaims_ClaimEventEntityEdit_Utility Function is Called To Edit The Created Adjuster Tracking".yellow);
    var AdjusterLastName = await Function_Utility.AssureClaims_ClaimEventEntityEdit_Utility("Adjuster", "NA", "NA", "NA");
    console.log("Created Adjuster is Edited with New Last Name: ".green + AdjusterLastName);
    //Created Adjuster Entity Is Edited Here
    await Function_Utility.AssureClaims_GenericDelete_Utility("False", "Adjuster Creation Screen", "", "");
    await Function_Utility.AssureClaims_GenericDelete_Utility("True", "Adjuster Creation Screen", "", "");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "Adjuster Creation Screen");
    //Created Adjuster Entity Is Deleted Here
    //======================================================Adjuster Creation On Created Claim Completed Here==================================================
  });

  test('DefendantCreateEditDelete_Test_06', async t => {
     var AttorneyDefendantLasttName = "Attorney_"+faker.name.lastName();
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    //=======================================================Defendant Creation On Created Claim Started Here==================================================== 
    await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility("Defendant", "Australia", "Victoria", "NA")
    //Defendant created

    await Nav_Utility.AssureClaims_ElementClick_Utility(Defendant_POM.AssureClaims_Defendant_Tab_Supplementals, "Supplementals Tab On Defendant Creation Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Defendant_POM.AssureClaims_Defendant_Tab_ClaimDefendantAttorney, "Claim Defendant Attorney Tab On Defendant Creation Screen")
    await In_Utility.AssureClaims_SetValue_Utility(Defendant_POM.AssureClaims_Defendant_Txt_AttorneyMiddleName, "MN", "Attorney Middle Name")
     await In_Utility.AssureClaims_SetValue_Utility(Defendant_POM.AssureClaims_Defendant_Txt_AttorneyLastName,AttorneyDefendantLasttName, "  Attorney Defendant LasttName")

    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On General Claim creation Screen");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " General Claim Creation Screen");
    //Verification That All Tabs Are Present For Defendant Screen

    await Nav_Utility.AssureClaims_ElementClick_Utility(Defendant_POM.AssureClaims_Defendant_Tab_ClaimDefendantInfo, "Claim Defendant Information Tab On Defendant Creation Screen")
    console.log("AssureClaims_ClaimEventEntityEdit_Utility Function is Called To Edit The Created Defendant".yellow);
    var DefendantLastName = await Function_Utility.AssureClaims_ClaimEventEntityEdit_Utility("Defendant", "NA", "NA", "NA");
    console.log("Created Defendant is Edited with New Last Name: ".green + DefendantLastName);
    //Created Defendant Entity Is Edited Here

    await Function_Utility.AssureClaims_GenericDelete_Utility("False", "Defendant Creation Screen", "", "");
    await Function_Utility.AssureClaims_GenericDelete_Utility("True", "Defendant Creation Screen", "", "");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "Defendant Creation Screen");
    //Created Defendant Entity Is Deleted Here
    //=======================================================Defendant Creation On Created Claim Completed Here===============================================================
  });

  test('SubrogationCreateEditDelete_Test_07', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    //=======================================================Subrogation Creation On Created Claim Started Here====================================================  
    await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility("Subrogation", "Collision", "Open", "Adverse Insured")
    //Subrogation created

    await Nav_Utility.AssureClaims_ElementClick_Utility(Subrogation_POM.AssureClaims_Subrogation_Tab_SubrogationInfo, "Subrogation Info Tab On Subrogation Creation Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Subrogation_POM.AssureClaims_Subrogation_Tab_SubrogationFinancial, "Subrogation Financial Tab On Subrogation Creation Screen")
    await In_Utility.AssureClaims_SetValue_Utility(Subrogation_POM.AssureClaims_Subrogation_Txt_NumberOfYears, "3", "Number Of Years Text Box On Subrogation Financial Tab")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Subrogation_POM.AssureClaims_Subrogation_Tab_Supplementals, "Supplementals Tab On Subrogation Creation Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Subrogation Screen");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Subrogation Creation Screen");
    //Subrogation Screen is Edited here

    await Function_Utility.AssureClaims_GenericDelete_Utility("False", "Subrogation Creation Screen", "", "");
    await Function_Utility.AssureClaims_GenericDelete_Utility("True", "Subrogation Creation Screen", "", "");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "Subrogation Creation Screen");
    //Created Subrogation Entity Is Deleted Here
    //=======================================================Subrogation Creation On Created Claim Completed Here===============================================================
  });

  test('ArbitrationCreateEditDelete_Test_08', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    //=======================================================Arbitration Creation On Created Claim Started Here====================================================  
    await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility("Arbitration", "Auto Mobile", "1234", "NA")
    //Arbitration created

    await In_Utility.AssureClaims_SetValue_Utility(Arbitration_POM.AssureClaims_Arbitration_Txt_ArbitrationParty, "A Applicant", "Arbitration party");
    await t.pressKey('tab');
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Arbitration creation Screen");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "ArbitrationCreation Screen");
    //Arbitration edited
    await Nav_Utility.AssureClaims_ElementClick_Utility(Arbitration_POM.AssureClaims_Arbitration_Tab_ArbitrationInfo, "Arbitration Info Tab On Arbitration Creation Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Arbitration_POM.AssureClaims_Arbitration_Tab_Supplementals, "Supplementals Tab On Arbitration Creation Screen")
    //Verification That All Tabs Are Present For Arbitration Screen

    await Function_Utility.AssureClaims_GenericDelete_Utility("False", "Arbitration Creation Screen", "", "");
    await Function_Utility.AssureClaims_GenericDelete_Utility("True", "Arbitration Creation Screen", "", "");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "Arbitration Creation Screen");
    //Created Arbitration Entity Is Deleted Here
    //=======================================================Arbitration Creation On Created Claim Completed Here=====================================================  
  });

  test('LitigationCreateEditDelete_Test_09', async t => {
    var AttorneyLasttName = "Attorney_"+faker.name.lastName();
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    //=======================================================Litigation Creation On Created Claim Started Here====================================================   
    await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility("Litigation", "Alberta", "Complaint", "Appeal")
    //Litigation created
    await Nav_Utility.AssureClaims_ElementClick_Utility(Litigation_POM.AssureClaims_Litigation_Tab_LitigationInfo, "Litigation Info Tab On Litigation Creation Screen")

    await Nav_Utility.AssureClaims_ElementClick_Utility(Litigation_POM.AssureClaims_Litigation_Tab_AttorneyInformation, "Attorney Information Tab On Litigation Creation Screen")
    await In_Utility.AssureClaims_SetValue_Utility(Litigation_POM.AssureClaims_Litigation_Txt_ZipCode, "33333", "Zip Code Text Box On Attorney Information Tab")
    await In_Utility.AssureClaims_SetValue_Utility(Litigation_POM.AssureClaims_Litigation_Txt_AttorneyLasttName,AttorneyLasttName, "Zip Code Text Box On Attorney Information Tab")

    await Nav_Utility.AssureClaims_ElementClick_Utility(Litigation_POM.AssureClaims_Litigation_Tab_MatterInfo, "Matter info Tab On Litigation Creation Screen")
    await In_Utility.AssureClaims_SetValue_Utility(Litigation_POM.AssureClaims_Litigation_Txt_MatterInfoFirstName, "Jerry", "Matter Info FirstName Text Box On Attorney Information Tab")

    await Nav_Utility.AssureClaims_ElementClick_Utility(Litigation_POM.AssureClaims_Litigation_Tab_Supplementals, "Supplementals Tab On Litigation Creation Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Litigation Screen");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Litigation Creation Screen");
    //Verification That All Tabs Are Present For Litigation Screen

    await Function_Utility.AssureClaims_GenericDelete_Utility("False", "Litigation Creation Screen", "", "");
    await Function_Utility.AssureClaims_GenericDelete_Utility("True", "Litigation Creation Screen", "", "");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "Litigation Creation Screen");
    //Created Litigation Entity Is Deleted Here
    //=======================================================Litigation Creation On Created Claim Completed Here====================================================  
  });

  test('CommentCreation_Test_10', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    //=======================================================Comment Creation & Comment Summary Verification On Created Claim Started Here====================================================   
    await Function_Utility.AssureClaims_CommentAddition_Utility()
    //Comment Creation
    await Function_Utility.AssureClaims_ClaimCommentSummary_Utility()
    //Comment Summary Verification

    //=======================================================Comment Creation & Comment Summary Verification On Created Claim Completed Here====================================================  
  });

  test('ReserveCreation_Test_11', async t => {
    await t.wait(5000)
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    /*===========================================================New Reserve Creation Is Started Here========================================================================================================================================================================================================================================================================================================*/
    await Function_Utility.AssureClaims_Reserve_Utility(data.ReserveType, data.ReserveAmount, data.ReserveStatus)
    //Reserve created
    /*===========================================================New Reserve Creation Is Completed Here========================================================================================================================================================================================================================================================================================================*/
  });

  test('ScheduleCheckCreation_Test_12', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    /*===========================================================New Schedule Check Creation Is Started Here========================================================================================================================================================================================================================================================================================================*/
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window")
    await Function_Utility.AssureClaims_ScheduleCheck_Creation(data.NumberOfPayments,data.PayInterval, data.BankAccount, data.DistributionType, data.AutoCheckPayeeType, data.LastName, data.AutoCheckTransactionType, data.AutoCheckAmount)
    // Schedule Check is Created 
    /*===========================================================New Schedule Check Creation Is Completed Here========================================================================================================================================================================================================================================================================================================*/
  });

  test('CollectionCreation_Test_13', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    /*===========================================================Collection Creation Is Started Here========================================================================================================================================================================================================================================================================================================*/
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window")
    await Function_Utility.AssureClaims_CollectionCorpAddition_Utility(data.BankAccount, data.PayeeType, data.LastName, data.ReserveType, data.TransactionType, data.PaymentAmount)
    // Collection is Created 
    /*===========================================================Collection Creation Is Completed Here========================================================================================================================================================================================================================================================================================================*/
  });

  test('PaymentCreation_Test_14', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    /*===========================================================Payment Creation Is Started Here========================================================================================================================================================================================================================================================================================================*/
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window")
    await Function_Utility.AssureClaims_PaymentCorpAddition_Utility(data.BankAccount, data.PayeeType, data.LastName, data.ReserveType, data.TransactionType, data.PaymentAmount);
    // Payment is Created
    /*===========================================================Payment Creation Is Completed Here========================================================================================================================================================================================================================================================================================================*/
  });
 
  test('RecordSummary_Test_15', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    /*===========================================================Record Summary Verification Started Here========================================================================================================================================================================================================================================================================================================*/
    await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_RecordSummary, "Click on record summary btn")
    await Verify_Utility.AssureClaims_ElementExist_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_PrintClaimVerify.withText(StrClaimNumber),"Claim No.")
    await t.wait(3000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_Cross, "Close the print screen")
    /*===========================================================Record Summary Verification Completed Here========================================================================================================================================================================================================================================================================================================*/
  });

  test('AssureClaims_Add Med Staff As PI_Test_16', async t => {

    await t.wait(5000)
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    /*==========================================================Adding Med Staff As PI On Created WC Claim Started Here========================================================================================================================================================================================================================================================================================================*/
    console.log("AssureClaims_PersonInvolvedAddNewEntity_Utility Function is Called To Create  Med Staff As PI On Created WC Claim".yellow); 
    await Maint_Utility.AssureClaims_PersonInvolvedAddNewEntity_Utility("Medical Staff", "NA", "NA","NA");
    console.log("Med Sfaff is added as Person Involved on Created Claim ".green);
    //Med Staff as PI On Worker Compensation Claim
   /*==========================================================Adding Med Staff As PI On Created WC Claim Completed Here========================================================================================================================================================================================================================================================================================================*/
});

test('DeleteClaim_Test_17', async t => {
  await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
  /*===========================================================Claim Delete Is Started Here========================================================================================================================================================================================================================================================================================================*/
  await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_DeleteRecord, "Delete claim")
  /*===========================================================Claim Delete Is Completed Here========================================================================================================================================================================================================================================================================================================*/
});
});






