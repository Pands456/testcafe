import { Selector, Role } from 'testcafe';
import GenericUsages_Utility from "../Functional_Utilities/GenericUsages_Utility";
import Verification_Utility from "../Functional_Utilities/Verification_Utility";
import Functionality_Utility from "../Functional_Utilities/Functionality_Utility";
import Navigation_Utility from "../Functional_Utilities/Navigation_Utility";
import Input_Utility from '../Functional_Utilities/Input_Utility'

import POM_VerificationMessage from "../Functional_POM/POM_VerificationMessage";
import POM_Home from "../Functional_POM/POM_Home";
import POM_Enhanced_Notes from '../Functional_POM/POM_Enhanced_Notes';
import POM_Document_Event from '../Functional_POM/POM_Document_Event';
import POM_Generic_Claims from '../Functional_POM/POM_Generic_Claims';
import { enable } from 'colors';

const Function_Utility = new Functionality_Utility();
const In_Utility = new Input_Utility();
const Verify_Utility = new Verification_Utility();
const Generic_Utility = new GenericUsages_Utility();
const Nav_Utility = new Navigation_Utility();
const Verification_Msg = new POM_VerificationMessage();
const Home_POM = new POM_Home();
const Generic_Claims = new POM_Generic_Claims();
const Enhanced_Note = new POM_Enhanced_Notes();
const Event_POM = new POM_Document_Event();

const DataIUT = require("../DataFiles/DataIUT.json");

//Global variables
var StrClaimNumber;
var StrClaimNo2;
var StrEventNo;
var faker = require("faker");
var TempName = 'TempName_' + faker.name.firstName();

DataIUT.forEach(data => {
  const LoggedInUser = Role(data.URL, async t => {
    await t.maximizeWindow()
    console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username, data.Password, data.DSN, 'Claims')
    await t.wait(5000)
    console.log("Login Into Application!!".green)
  }, { preserveUrl: true }
  );


  fixture`EnhancedNotes_Exhaustive_Smoke`.beforeEach(async t => {
    await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
  });

  //============================================================General Claim => EnhancedNotes start=======================================================================
  test('AssureClaims_GC_EnhancedNotes_Test_01', async t => {
    var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    var NoteText = 'CreateNote_' + faker.name.lastName();
    var EditNoteText = 'editNote_' + faker.name.firstName();
    StrClaimNumber = await Function_Utility.AssureClaims_GeneralClaimCreation(d, d, data.ClaimStatus, data.GCClaimType, data.Department, data.GCPolicyLOB,);
    console.log(StrClaimNumber)
    await Function_Utility.AssureClaims_EnhancedNotesCreateEditDelete_Utility("Create/Edit", NoteText, data.ExNoteType1, EditNoteText);
  });
  //============================================================General Claim => EnhancedNotes end=======================================================================

  //============================================================Event => EnhancedNotes Start=======================================================================
  test('AssureClaims_Event_EnhancedNotes_Test_02', async t => {
    var NoteText = 'CreateNote_' + faker.name.lastName();
    var EditNoteText = 'editNote_' + faker.name.firstName();  
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back to Event Screen window")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_EventFrame);
    StrEventNo = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Event_POM.AssureClaims_EventCreation_Txt_EventNumber, "value");
    await t.wait(4000)
    await Function_Utility.AssureClaims_EnhancedNotesCreateEditDelete_Utility("Create/Edit", NoteText, data.ExNoteType3, EditNoteText);
    console.log(StrEventNo)
  });
  //============================================================Event => EnhancedNotes end=======================================================================

  //============================================================Event > General Claims => EnhancedNotes Start=======================================================================
  test('AssureClaims_EventGCEnhancedNotes_Test_03', async t => {
    var NoteText = 'CreateNote_' + faker.name.lastName();
    var EditNoteText = 'editNote_' + faker.name.firstName();
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back to Event Screen window")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_EventFrame);
    await t.wait(5000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Event_POM.AssureClaims_AddNewbtn, "Click on add new btn from child node")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Event_POM.AssureClaims_AddNewClaimbtn, "Click on add new  Claims btn from child node")
    await t.switchToMainWindow();
    await Generic_Utility.AssureClaims_DynamicFrameSwitching("claimgc_-")
    await t.wait(2000)
    var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    await In_Utility.AssureClaims_SetValue_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_DateOfEvent, d, "Date Of Event")
    await In_Utility.AssureClaims_SetValue_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_DateOfClaim, d, "Date Of Claim")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_TimeOfEvent, "Time Of Event")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_TimeOfClaim, "Time Of Claim")
    await In_Utility.AssureClaims_SetValue_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_ClaimInfo_Dept, data.Department, "Department")
    await t.pressKey('tab')

    await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_ClaimStatus, "Claim Status Lookup")
    const ele1 = Generic_Claims.AssureClaims_GenericClaim_Lnk_SelectClaimStatus.withText(data.ClaimStatus).with({ visibilityCheck: true })
    await t.expect(ele1.exists).ok('', { timeout: 20000 })
    await Nav_Utility.AssureClaims_ElementClick_Utility(ele1, "Claim Status Option")

    await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_ClaimType, "Claim Type Lookup")
    const ele2 = Generic_Claims.AssureClaims_GenericClaim_Lnk_SelectClaimType.withText(data.GCClaimType).with({ visibilityCheck: true })
    await t.expect(ele2.exists).ok('', { timeout: 20000 })
    await Nav_Utility.AssureClaims_ElementClick_Utility(ele2, "Claim Type Option")

    await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_PolicyLOBLookup, "Policy LOB Lookup")
    const ele3 = Generic_Claims.AssureClaims_GenericClaim_Lnk_SelectPolicyLOB.withText(data.GCPolicyLOB).with({ visibilityCheck: true })
    await t.expect(ele3.exists).ok('', { timeout: 20000 })
    await Nav_Utility.AssureClaims_ElementClick_Utility(ele3, "Policy LOB Option")

    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On General Claim creation Screen");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " General Claim Creation Screen");
    StrClaimNo2 = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_ClaimNumber, "value");
    await Function_Utility.AssureClaims_EnhancedNotesCreateEditDelete_Utility("Create/Edit", NoteText, data.ExNoteType2, EditNoteText);
    console.log(StrClaimNo2)
  });
  //============================================================Event > General Claims => EnhancedNotes end=======================================================================

  //============================================================ Medstaff => EnhancedNotes Start=======================================================================
  test('AssureClaims_MedstaffEnhancedNotes_Test_04', async t => {
    var NoteText = 'CreateNote_' + faker.name.lastName();
    var EditNoteText = 'editNote_' + faker.name.firstName();
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await Function_Utility.AssureClaims_PersonInvolvedAddNewEntity_Utility("Medical Staff", "NA", "NA", "NA");
    //PI-MedStuff created
    await Function_Utility.AssureClaims_EnhancedNotesCreateEditDelete_Utility("Create/Edit", NoteText, data.ExNoteType1, EditNoteText);
    //Medstaff EnhancedNotes created and edited
    await Function_Utility.AssureClaims_EnhancedNotesCreateEditDelete_Utility("Delete", "NA", "NA", "NA");
    //Adjuster deleted
  });
  //============================================================ Medstaff => EnhancedNotes end=======================================================================

  //============================================================ Claimant => EnhancedNotes Start=======================================================================
  test('AssureClaims_ClaimantEnhancedNotes_Test_05', async t => {
    var NoteText = 'CreateNote_' + faker.name.lastName();
    var EditNoteText = 'editNote_' + faker.name.firstName();
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility("Claimant", data.Country, data.State, "NA");
    //Claimant created 
    await Function_Utility.AssureClaims_EnhancedNotesCreateEditDelete_Utility("Create/Edit", NoteText, data.ExNoteType1, EditNoteText);
    //Claimant  EnhancedNotes created and edited
    await Function_Utility.AssureClaims_EnhancedNotesCreateEditDelete_Utility("Delete", "NA", "NA", "NA");
    //Claimant deleted
  });
  //============================================================ Claimant => EnhancedNotes end=======================================================================

  //============================================================ Adjuster => EnhancedNotes Starts=======================================================================
  test('AssureClaims_AdjusterEnhancedNotes_Test_06', async t => {
    var NoteText = 'CreateNote_' + faker.name.lastName();
    var EditNoteText = 'editNote_' + faker.name.firstName();
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility("Adjuster", data.Country, data.State, "NA");
    //Adjuster created
    await Function_Utility.AssureClaims_EnhancedNotesCreateEditDelete_Utility("Create/Edit", NoteText, data.ExNoteType1, EditNoteText);
    //Adjuster  EnhancedNotes created and edited
    await Function_Utility.AssureClaims_EnhancedNotesCreateEditDelete_Utility("Delete", "NA", "NA", "NA");
    //Adjuster deleted
  });
  //============================================================ Adjuster => EnhancedNotes end=======================================================================

  //============================================================ ViewAllNotes > NotesLevel => EnhancedNotes Start=======================================================================
  test('AssureClaims_ViewAllNotes_NotesLevelEnhancedNotes_Test_07', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    //Claim Enhanced Verification start
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Select_Enhanced_Notes, "Select EnhancedNote Button")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_EnhanceNotesIframe)
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Level, StrClaimNumber, "Select Notes level")
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_SearchNoteType, data.ExNoteType1, "Note type search")
    const ColHeader = ["Note Type ", "Attached To"]
    const ColValue = [data.ExNoteType1, "CLAIM:" + " " + StrClaimNumber]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ExNoteType1, "EnhanceNotes grid view", ColHeader, ColValue)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_ViewNote, "Click on view notes all btn")
    await Verify_Utility.AssureClaims_ElementExist_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_ViewNotetxt, "Note type verification")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_CloseViewAll, "Close the View all btn")

    //Event Enhanced Verification start
    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload, "Click on reload btn")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back to Event Screen window")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_EventFrame);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Select_Enhanced_Notes, "Select EnhancedNote Button")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_EnhanceNotesIframe)
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Level, StrEventNo, "Select Notes level")
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_SearchNoteType, data.ExNoteType3, "Note type search")
    const ColHeader1 = ["Note Type ", "Attached To"]
    const ColValue1 = [data.ExNoteType3, "EVENT:" + " " + StrEventNo]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ExNoteType3, "EnhanceNotes grid view", ColHeader1, ColValue1)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_ViewNote, "Click on view notes all btn")
    await Verify_Utility.AssureClaims_ElementExist_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_ViewNotetxt, "Note type verification")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_CloseViewAll, "Close the View all btn")

    //Claim 2 Enhanced Verification start
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Level, StrClaimNo2, "Select Notes level")
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_SearchNoteType, data.ExNoteType2, "Note type search")
    const ColHeader2 = ["Note Type ", "Attached To"]
    const ColValue2 = [data.ExNoteType2, "CLAIM:" + " " + StrClaimNo2]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ExNoteType2, "EnhanceNotes grid view", ColHeader2, ColValue2)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_ViewNote, "Click on view notes all btn")
    await Verify_Utility.AssureClaims_ElementExist_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_ViewNotetxt, "Note type verification")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_CloseViewAll, "Close the View all btn")

    //ALL Claims and event verification at notes level
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Level, " ALL", "Select Notes level")
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_SearchNoteType, data.ExNoteType1, "Note type search")
    const ColHeader4 = ["Note Type "]
    const ColValue4 = [data.ExNoteType1]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ExNoteType1, "EnhanceNotes grid view", ColHeader4, ColValue4)
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_SearchNoteType, data.ExNoteType3, "Note type search")
    const ColHeader5 = ["Note Type "]
    const ColValue5 = [data.ExNoteType3]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ExNoteType3, "EnhanceNotes grid view", ColHeader5, ColValue5)
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_SearchNoteType, data.ExNoteType2, "Note type search")
    const ColHeader6 = ["Note Type "]
    const ColValue6 = [data.ExNoteType2]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ExNoteType2, "EnhanceNotes grid view", ColHeader6, ColValue6)
  });
  //============================================================ ViewAllNotes > NotesLevel => EnhancedNotes end=======================================================================

  //============================================================ AdvanceSearch => EnhancedNotes Starts=======================================================================
  test('AssureClaims_AdvanceSearch_VerificationEnhancedNotes_Test_08', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Select_Enhanced_Notes, "Select EnhancedNote Button")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_EnhanceNotesIframe)
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Level, StrEventNo, "Select Notes level")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_AdvanceSearch, "Click on advance search btn")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_SearchResult, "Search event result")
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_SearchNoteType, data.ExNoteType3, "Note type search")
    const ColHeader1 = ["Note Type ", "Attached To"]
    const ColValue1 = [data.ExNoteType3, "EVENT:" + " " + StrEventNo]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ExNoteType3, "EnhanceNotes grid view", ColHeader1, ColValue1)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_backToAdv, "back to advance search")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_SelectClaim, "Select claim dropdown btn")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_CheckAll, "Select check all option")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_SearchResult, "Search event result")
    await t.wait(2000)
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_SearchNoteType, data.ExNoteType1, "Note type search")
    const ColHeader2 = ["Note Type ", "Attached To"]
    const ColValue2 = [data.ExNoteType1, "CLAIM:" + " " + StrClaimNumber]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ExNoteType1, "EnhanceNotes grid view", ColHeader2, ColValue2)
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_SearchNoteType, data.ExNoteType2, "Note type search")
    const ColHeader3 = ["Note Type ", "Attached To"]
    const ColValue3 = [data.ExNoteType2, "CLAIM:" + " " + StrClaimNo2]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ExNoteType2, "EnhanceNotes grid view", ColHeader3, ColValue3)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_backToAdv, "back to advance search")
    //Verify Advance search (Check & Uncheck)

    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_SelectClaim, "Select claim dropdown btn")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_UnCheckAll, "Select Uncheck all option")
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_SearchBox, StrClaimNumber, "search first claim")
    await t.wait(4000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Lnk_ClaimGrid.withText(StrClaimNumber), "Click on first grid")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_SearchResult, "Search event result")
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_SearchNoteType, data.ExNoteType1, "Note type search")
    const ColHeader4 = ["Note Type ", "Attached To"]
    const ColValue4 = [data.ExNoteType1, "CLAIM:" + " " + StrClaimNumber]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ExNoteType1, "EnhanceNotes grid view", ColHeader4, ColValue4)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_backToAdv, "back to advance search")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_SelectClaim, "Select claim dropdown btn")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_UnCheckAll, "Select Uncheck all option")
    await t.wait(4000)
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_SearchBox, StrClaimNo2, "search second claim")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Lnk_ClaimGrid.withText(StrClaimNo2), "Click on second grid")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_SearchResult, "Search event result")
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_SearchNoteType, data.ExNoteType2, "Note type search")
    const ColHeader5 = ["Note Type ", "Attached To"]
    const ColValue5 = [data.ExNoteType2, "CLAIM:" + " " + StrClaimNo2]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ExNoteType2, "EnhanceNotes grid view", ColHeader5, ColValue5)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_backToAdv, "back to advance search")
    //Verify Advance search on Claims
  });
  //============================================================ AdvanceSearch => EnhancedNotes end=======================================================================

  //============================================================ AdvanceSearch2 => EnhancedNotes Start=======================================================================
  test('AssureClaims_AdvanceSearch2_VerificationEnhancedNotes_Test_9', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Select_Enhanced_Notes, "Select EnhancedNote Button")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_EnhanceNotesIframe)
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Level, " ALL", "Select Notes level")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_AdvanceSearch, "Click on advance search btn")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_EnhancedNotes_Btn_AdvanceNotesLookUp, "Note Type Lookup")
    const NoteText1 = Enhanced_Note.AssureClaims_EnhancedNotes_Lnk_SelectNoteType.withText("Claimant").with({ visibilityCheck: true })
    await t.expect(NoteText1.exists).ok('', { timeout: 20000 })
    await Nav_Utility.AssureClaims_ElementClick_Utility(NoteText1, "Note Type Option")

    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_EnhancedNotes_Btn_AdvanceNotesLookUp, "Note Type Lookup")
    const NoteText2 = Enhanced_Note.AssureClaims_EnhancedNotes_Lnk_SelectNoteType.withText("Confidential").with({ visibilityCheck: true })
    await t.expect(NoteText2.exists).ok('', { timeout: 20000 })
    await Nav_Utility.AssureClaims_ElementClick_Utility(NoteText2, "Note Type Option")

    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_EnhancedNotes_Btn_AdvanceNotesLookUp, "Note Type Lookup")
    const NoteText3 = Enhanced_Note.AssureClaims_EnhancedNotes_Lnk_SelectNoteType.withText("damages").with({ visibilityCheck: true })
    await t.expect(NoteText3.exists).ok('', { timeout: 20000 })
    await Nav_Utility.AssureClaims_ElementClick_Utility(NoteText3, "Note Type Option")

    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_SearchResult, "Search event result")
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_SearchNoteType, data.ExNoteType2, "Note type search")
    const ColHeader1 = ["Note Type ", "Attached To"]
    const ColValue1 = [data.ExNoteType2, "CLAIM:" + " " + StrClaimNo2]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ExNoteType2, "EnhanceNotes grid view", ColHeader1, ColValue1)
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_SearchNoteType, data.ExNoteType3, "Note type search")
    const ColHeader3 = ["Note Type ", "Attached To"]
    const ColValue3 = [data.ExNoteType3, "EVENT:" + " " + StrEventNo]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ExNoteType3, "EnhanceNotes grid view", ColHeader3, ColValue3)
    //Notes type verification 

    await t.switchToMainWindow()
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload, "Click on reload btn")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Select_Enhanced_Notes, "Select EnhancedNote Button")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_EnhanceNotesIframe)
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Level, " ALL", "Select Notes level")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_AdvanceSearch, "Click on advance search btn")
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_Sortbydropdown, "Note Type", "Select the note type option")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_SearchResult, "Search event result")
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_SearchNoteType, data.ExNoteType1, "Note type search")
    const ColHeader4 = ["Note Type ", "Attached To"]
    const ColValue4 = [data.ExNoteType1, "CLAIM:" + " " + StrClaimNumber]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ExNoteType1, "EnhanceNotes grid view", ColHeader4, ColValue4)
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_SearchNoteType, data.ExNoteType2, "Note type search")
    const ColHeader5 = ["Note Type ", "Attached To"]
    const ColValue5 = [data.ExNoteType2, "CLAIM:" + " " + StrClaimNo2]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ExNoteType2, "EnhanceNotes grid view", ColHeader5, ColValue5)
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_SearchNoteType, data.ExNoteType3, "Note type search")
    const ColHeader6 = ["Note Type ", "Attached To"]
    const ColValue6 = [data.ExNoteType3, "EVENT:" + " " + StrEventNo]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ExNoteType3, "EnhanceNotes grid view", ColHeader6, ColValue6)
    //Sort as Note type Verification
  });
  //============================================================ AdvanceSearch2 => EnhancedNotes end=======================================================================

  //============================================================ NoteTemplate => EnhancedNotes Start=======================================================================
  test('AssureClaims_NoteTemplateEnhancedNotes_Test_10', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await t.wait(4000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Select_Enhanced_Notes, "Select EnhancedNote Button")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_EnhanceNotesIframe)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_NoteTemplate, "template btn")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_CreateTemplate, "Create note template")
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_TemplateName, TempName, "Input template name")
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_TemplateSummary, "desc temp summary", "Input desc template")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_SaveCreateTemplate, "save create template")
    // Notes Template created

    await t.switchToMainWindow()
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload, "Click on reload btn")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Select_Enhanced_Notes, "Select EnhancedNote Button")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_EnhanceNotesIframe)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_EnhancedNotes_Btn_CreateNotes, "Select Create Note Button")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_EnhancedNotes_Btn_NotesLookUp, "Note Type Lookup")
    const NoteText2 = Enhanced_Note.AssureClaims_EnhancedNotes_Lnk_SelectNoteType.withText("Claimant").with({ visibilityCheck: true })
    await t.expect(NoteText2.exists).ok('', { timeout: 20000 })
    await Nav_Utility.AssureClaims_ElementClick_Utility(NoteText2, "Note Type Option")
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_SelectTemplate, TempName, "select created template")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_SaveButton, "Save Image Button");
    await Nav_Utility.AssureClaims_ElementClick_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Btn_Backbtn, "click on backbtn")
    await In_Utility.AssureClaims_SetValue_Utility(Enhanced_Note.AssureClaims_Enhance_Note_Txt_SearchNoteType, data.ExNoteType1, "Note type search")
    const ColHeader1 = ["Note Type ", "Attached To"]
    const ColValue1 = [data.ExNoteType1, "CLAIM:" + " " + StrClaimNumber]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ExNoteType1, "EnhanceNotes grid view", ColHeader1, ColValue1)
  });
  //============================================================ NoteTemplate => EnhancedNotes end=======================================================================

});
