import { Selector,Role } from 'testcafe';

import Colors from 'colors';
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Verification_Utility from '../Functional_Utilities/Verification_Utility'
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import Input_Utility from '../Functional_Utilities/Input_Utility';
import POM_DiaryList from '../Functional_POM/POM_DiaryList';
import POM_DiaryUtilities from '../Functional_POM/POM_DiaryUtilities';
import POM_AttachCreateDiary from '../Functional_POM/POM_AttachCreateDiary'
import POM_Search from '../Functional_POM/POM_Search'
import POM_Home from '../Functional_POM/POM_Home';
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';
import POM_Document_Event from '../Functional_POM/POM_Document_Event';


const Home_POM = new POM_Home();
const DataIUT = require('../DataFiles/DataIUT.json');
//const DataSTG = require('../DataFiles/DataSTG.json');
//const DataAutoReg = require('../DataFiles/DataAutoReg.json');
const Function_Utility = new Functionality_Utility();
const Nav_Utility=new Navigation_Utility();
const Generic_Utility = new GenericUsages_Utility();
const Verification_Msg = new POM_VerificationMessage();
const In_Utility = new Input_Utility();
const Verify_Utility = new Verification_Utility();

const Diary_Creation = new POM_DiaryList();
const Diary_Utilities=new POM_DiaryUtilities();
const AttachCreateDiary_POM = new POM_AttachCreateDiary();
const Search_POM = new POM_Search();
const Payment_POM = new POM_PaymentsCollections();
const Event_POM = new POM_Document_Event();

var faker = require('faker');
const menu = Selector('#side-menu');
var StrClaimNumber;
var date = new Date();
var d = (date.getMonth()+1)+'/'+(date.getDate())+'/'+date.getFullYear();  
const ColHeading = ["Task Name"]
const val = [TaskName]
var TaskNameEdited = faker.name.lastName();
var TaskName;
var UserLastName=faker.name.lastName();
var UserFirstName=faker.name.firstName();
//Global Variable Declaration


DataIUT.forEach(data => {
    const LoggedInUser = Role(data.URL , async t => {
        await t.maximizeWindow()
        console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
        await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
        await t.wait(5000)
        console.log("Login Into Application!!".green)
    },{ preserveUrl: true }
    );
    fixture `Diary_Suite_Smoke`.beforeEach(async t => {
        await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
      });

      test('AssureClaims_GeneralClaimCreation_Test_01', async t => {
       
        //=====================================================Claim Creation Started Here====================================================================
        console.log("AssureClaims_GeneralClaimCreation Function is Called To Create Claim".yellow); 
        StrClaimNumber = await Function_Utility.AssureClaims_GeneralClaimCreation(d,d,data.ClaimStatus,data.GCClaimType,data.Department,data.GCPolicyLOB)
        console.log("New General Claim is Created with Claim Number: ".green+StrClaimNumber);
        
         });

      test('AssureClaims_DiaryCreationOnGC_Test_02', async t => {
      await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Search:Claim");
      await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Search_ClaimIframe);
      await t.wait(3000)
      await In_Utility.AssureClaims_SetValue_Utility(Search_POM.AssureClaims_Search_Txt_ClaimNumber,StrClaimNumber,"Claim Number")
      console.log("AssureClaims_Search Function is Called To Search Claim ");
      await Function_Utility.AssureClaims_Search()
      await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Search_ClaimIframe1);
      await Nav_Utility.AssureClaims_ElementClick_Utility(Search_POM.AssureClaims_Search_Lnk_ClaimNumber.withText(StrClaimNumber),"ClaimNumber link")
      console.log("Search is Completed");
      await t.switchToMainWindow()
      await t.wait(8000)
      await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
     //Searched For GC 

     console.log("AssureClaims_DiaryCreation Function is Called To Create Diary".yellow); 
     var TaskName = await Function_Utility.AssureClaims_AttachCreateEdit_Diary_Utility( "Create", "Diary note test", "WrkAct_Test",d, "8" );
     await t.wait(2000);
     await t.switchToMainWindow();
     console.log("Main window switched")
     await t.wait(2000);
     await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    //DiaryCreated On GC

     console.log("AssureClaims_DiaryCreation Function is Called To Edit Diary".yellow); 
     var TaskName = await Function_Utility.AssureClaims_AttachCreateEdit_Diary_Utility("Edit", "Diary note test", "WrkAct_Test",d, "8" );
    //DiaryEdited 

     
     
     
});

test('AssureClaims_AdjusterCreation_Test_03', async t => {
  await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Search:Claim");
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Search_ClaimIframe);
  await t.wait(3000)
  await In_Utility.AssureClaims_SetValue_Utility(Search_POM.AssureClaims_Search_Txt_ClaimNumber,StrClaimNumber,"Claim Number")
  console.log("AssureClaims_Search Function is Called To Search Claim ");
  await Function_Utility.AssureClaims_Search()
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Search_ClaimIframe1);
  await Nav_Utility.AssureClaims_ElementClick_Utility(Search_POM.AssureClaims_Search_Lnk_ClaimNumber.withText(StrClaimNumber),"ClaimNumber link")
  console.log("Search is Completed");
  await t.switchToMainWindow()
  await t.wait(8000)
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
//Claim Searched

  console.log("AssureClaims_AdjusterCreation Is Called".yellow); 
  await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility( "Adjuster", "Australia", "Victoria", "NA" );
//AdjusterCreated

  console.log("AssureClaims_DiaryCreation Function is Called To Create Diary".yellow); 
     var TaskName = await Function_Utility.AssureClaims_AttachCreateEdit_Diary_Utility( "Create", "Diary note test", "WrkAct_Test",d, "8" );
     await t.wait(2000);
     await t.switchToMainWindow();
     console.log("Main window switched")
     await t.wait(2000);
     await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
//DiaryCreated On Adjuster

     console.log("AssureClaims_DiaryCreation Function is Called To Edit Diary".yellow); 
     var TaskName = await Function_Utility.AssureClaims_AttachCreateEdit_Diary_Utility("Edit", "Diary note test", "WrkAct_Test",d, "8" );
//DairyEdited On Adjuster

});
test('AssureClaims_CliamantCreation_Test_04', async t => {
  await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Search:Claim");
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Search_ClaimIframe);
  await t.wait(3000)
  await In_Utility.AssureClaims_SetValue_Utility(Search_POM.AssureClaims_Search_Txt_ClaimNumber,StrClaimNumber,"Claim Number")
  console.log("AssureClaims_Search Function is Called To Search Claim ");
  await Function_Utility.AssureClaims_Search()
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Search_ClaimIframe1);
  await Nav_Utility.AssureClaims_ElementClick_Utility(Search_POM.AssureClaims_Search_Lnk_ClaimNumber.withText(StrClaimNumber),"ClaimNumber link")
  console.log("Search is Completed");
  await t.switchToMainWindow()
  await t.wait(8000)
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
//Claim Searched

  console.log("AssureClaims_ClaimantCreation".yellow); 
  await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility( "Claimant", "Australia", "Victoria", "NA" );
//Claimant Created

  console.log("AssureClaims_DiaryCreation Function is Called To Create Diary".yellow); 
  var TaskName = await Function_Utility.AssureClaims_AttachCreateEdit_Diary_Utility( "Create", "Diary note test", "WrkAct_Test",d, "8" );
  await t.wait(2000);
  await t.switchToMainWindow();
  console.log("Main window switched")
  await t.wait(2000);
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
//Dairy Created On Claimant

  console.log("AssureClaims_DiaryCreation Function is Called To Edit Diary".yellow); 
  var TaskName = await Function_Utility.AssureClaims_AttachCreateEdit_Diary_Utility("Edit", "Diary note test", "WrkAct_Test",d, "8" );
//DiaryEdited On Claimant

});
test('AssureClaims_LitigationCreation_Test_05', async t => {
  await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Search:Claim");
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Search_ClaimIframe);
  await t.wait(3000)
  await In_Utility.AssureClaims_SetValue_Utility(Search_POM.AssureClaims_Search_Txt_ClaimNumber,StrClaimNumber,"Claim Number")
  console.log("AssureClaims_Search Function is Called To Search Claim ");
  await Function_Utility.AssureClaims_Search()
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Search_ClaimIframe1);
  await Nav_Utility.AssureClaims_ElementClick_Utility(Search_POM.AssureClaims_Search_Lnk_ClaimNumber.withText(StrClaimNumber),"ClaimNumber link")
  console.log("Search is Completed");
  await t.switchToMainWindow()
  await t.wait(8000)
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
//Claim Searched

  console.log("AssureClaims_LitigationCreation".yellow); 
  await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility( "Litigation","Alberta",data.LitigationType,data.LitigationStatus);
//Litigation Created

  console.log("AssureClaims_DiaryCreation Function is Called To Create Diary".yellow); 
  var TaskName = await Function_Utility.AssureClaims_AttachCreateEdit_Diary_Utility( "Create", "Diary note test", "WrkAct_Test",d, "8" );
  await t.wait(2000);
  await t.switchToMainWindow();
  console.log("Main window switched")
  await t.wait(2000);
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
//DiaryCreated On Litigation

  console.log("AssureClaims_DiaryCreation Function is Called To Edit Diary".yellow); 
  var TaskName = await Function_Utility.AssureClaims_AttachCreateEdit_Diary_Utility("Edit", "Diary note test", "WrkAct_Test",d, "8" );
//DiaryEdited On Litigation

});
test('AssureClaims_MedicalStaffCreation_Test_06', async t => {
await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Search:Claim");
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Search_ClaimIframe);
await t.wait(3000)
await In_Utility.AssureClaims_SetValue_Utility(Search_POM.AssureClaims_Search_Txt_ClaimNumber,StrClaimNumber,"Claim Number")
console.log("AssureClaims_Search Function is Called To Search Claim ");
await Function_Utility.AssureClaims_Search()
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Search_ClaimIframe1);
await Nav_Utility.AssureClaims_ElementClick_Utility(Search_POM.AssureClaims_Search_Lnk_ClaimNumber.withText(StrClaimNumber),"ClaimNumber link")
console.log("Search is Completed");
await t.switchToMainWindow()
await t.wait(8000)
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
//Claim Searched

console.log("AssureClaims_MedicalStaffCreation".yellow); 
await Function_Utility.AssureClaims_PersonInvolvedAddNewEntity_Utility("Medical Staff", "NA", "NA","NA");
//MedicalStaff Created

console.log("AssureClaims_DiaryCreation Function is Called To Create Diary".yellow); 
var TaskName = await Function_Utility.AssureClaims_AttachCreateEdit_Diary_Utility( "Create", "Diary note test", "WrkAct_Test",d, "8" );
await t.wait(2000);
await t.switchToMainWindow();
console.log("Main window switched")
await t.wait(2000);
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
//Diary Created On MedicalStaff

console.log("AssureClaims_DiaryCreation Function is Called To Edit Diary".yellow); 
var TaskName = await Function_Utility.AssureClaims_AttachCreateEdit_Diary_Utility("Edit", "Diary note test", "WrkAct_Test",d, "8" );
//Diary Edited On Medical Staff

});
test('AssureClaims_DatedTextCreation_Test_07', async t => {
  await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Search:Claim");
      await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Search_ClaimIframe);
      await t.wait(3000)
      await In_Utility.AssureClaims_SetValue_Utility(Search_POM.AssureClaims_Search_Txt_ClaimNumber,StrClaimNumber,"Claim Number")
      console.log("AssureClaims_Search Function is Called To Search Claim ");
      await Function_Utility.AssureClaims_Search()
      await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Search_ClaimIframe1);
      await Nav_Utility.AssureClaims_ElementClick_Utility(Search_POM.AssureClaims_Search_Lnk_ClaimNumber.withText(StrClaimNumber),"ClaimNumber link")
      console.log("Search is Completed");
      await t.switchToMainWindow()
      await t.wait(8000)
      await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
      await t.switchToMainWindow()
      await t.wait(8000)

      //Event Screen is opened from the BreadCrumb
      await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.dvbreadcrumbscroll,"Breadcrumbs Clicked")
      await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_EventFrame);
      await t.wait(8000)

      //EventDatedText Utility Is Called
      await Function_Utility.AssureClaims_Event_DatedText();
      //DiaryCreation On DatedText
      await Function_Utility.AssureClaims_AttachCreateEdit_Diary_Utility( "Create", "Diary note test", "WrkAct_Test", d, "8" );
      await t.switchToMainWindow()
      await t.wait(8000)
});
test('AssureClaims_DiaryCreationFromDiaryList_Test_08', async t => {
  console.log("AssureClaims_Diary_Creation_Utility Function is Called To Create Diary From Diary List"); 
      TaskName = await Function_Utility.AssureClaims_Diary_Creation_Utility('NA')

        await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaimsApp_Diaries_Img_DropDown,"Click on DropDown")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Diary_Creation.AssureClaimsApp_Diaries_Chk_ActiveDiaries,'Checked',"Checked Active Diaries Check Box")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Diary_Creation.AssureClaimsApp_Diaries_Chk_ShowNotes,'Checked',"Checked Show Notes Check Box")
        await t.pressKey('tab');
        await t.wait(1000);
        const ColHead=["Task Name"];
        const ColVal=[TaskName];
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(TaskName,'Diary Grid View',ColHead,ColVal)
});
//Created Diary Is Edited Here
test('AssureClaims_EditDiaryFromDiaryList_Test_09', async t => {
  await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Diaries:Diary List");
        await t.wait(5000)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.Assureclaims_Generic_DiaryFrame, "Diary Frame");
        await t.wait(12000);
        await In_Utility.AssureClaims_SetValue_Utility(Diary_Creation.AssureClaimsApp_Diaries_Txt_TaskName,TaskName,"TaskName TextBox")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_SystemUsers_Btn_FilterSearchTaskName,"Click on Search Button")
        await Nav_Utility.AssureClaims_ElementClick_Utility(AttachCreateDiary_POM.AssureClaims_AttachCreate_Btn_SelectGrid, "Grid Button Selected")
        await t.wait(2000)
        await Nav_Utility.AssureClaims_ElementClick_Utility( AttachCreateDiary_POM.AssureClaims_AttachCreate_Btn_EditDiary, "Edit btn clicked" );
        await In_Utility.AssureClaims_SetValue_Utility( AttachCreateDiary_POM.AssureClaims_AttachCreate_Diary_Txt_TaskName, TaskNameEdited, "Edited Taskname" );
        await Nav_Utility.AssureClaims_ElementClick_Utility( Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Dairy creation Screen" );
});

//Edited Diary Is Rolled Here
test('AssureClaims_RollDiaryFromDiaryList_Test_10', async t => {
  await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Diaries:Diary List");
  await t.wait(5000)
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.Assureclaims_Generic_DiaryFrame, "Diary Frame");
  await t.wait(12000);
  await In_Utility.AssureClaims_SetValue_Utility(Diary_Creation.AssureClaimsApp_Diaries_Txt_TaskName,TaskNameEdited,"TaskName TextBox")
  await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_SystemUsers_Btn_FilterSearchTaskName,"Click on Search Button")


  await Nav_Utility.AssureClaims_ElementClick_Utility(AttachCreateDiary_POM.AssureClaims_AttachCreate_Btn_SelectGrid, "Grid Button Selected")
        await t.wait(2000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaim_DiaryRoll_Btn_Roll,"RollButton On DiaryList")
        var PastRollDateTo = await Generic_Utility.AssureClaims_FuturePastDateInfo_Utility(-1,2,-1,"MM/DD/YYYY")
        
        await In_Utility.AssureClaims_SetValue_Utility(Diary_Creation.AssureClaims_DiaryRoll_Txt_RollDateTo, PastRollDateTo, "RollDiary From Date")
        await t.wait(6000)
        await t.setNativeDialogHandler(() => true);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaim_DiaryRoll_Btn_Roll,"Roll Diary")
        var FutureRollDateTo = await Generic_Utility.AssureClaims_FuturePastDateInfo_Utility(2,10,2,"MM/DD/YYYY")
        
        await In_Utility.AssureClaims_SetValue_Utility(Diary_Creation.AssureClaims_DiaryRoll_Txt_RollDateTo,FutureRollDateTo, "RollDiary From Date")
         
        await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaim_DiaryRoll_Btn_Roll,"Roll Diary")
        await t.wait(6000)
      //Verification Of Rolled Diary Begins--------------------------------------------------------------------------------------------------------------
        const ColHeading = [ "Due","Rollable"]
        const val = [FutureRollDateTo,"Yes"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(FutureRollDateTo,'Yes',ColHeading,val)
});
test('AssureClaims_DiaryVoidFromDiaryList_Test_11', async t => {
  await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Diaries:Diary List");
  await t.wait(5000)
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.Assureclaims_Generic_DiaryFrame, "Diary Frame");
  await t.wait(12000);
  await In_Utility.AssureClaims_SetValue_Utility(Diary_Creation.AssureClaimsApp_Diaries_Txt_TaskName,TaskNameEdited,"TaskName TextBox")
  await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_SystemUsers_Btn_FilterSearchTaskName,"Click on Search Button")


  await Nav_Utility.AssureClaims_ElementClick_Utility(AttachCreateDiary_POM.AssureClaims_AttachCreate_Btn_SelectGrid, "Grid Button Selected")
  await t.wait(2000)
  await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_DiaryVoid_Btn_Void,"Void Diary On DiaryList")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Diary_Creation.AssureClaim_DiaryVoid_Chk_VoidSelectedDiary,"UnCheck","Void Selected Diary")
        await In_Utility.AssureClaims_SetValue_Utility(Diary_Creation.AssureClaim_DiaryVoid_Txt_VoidFromDate, d, "FromDate")
        await In_Utility.AssureClaims_SetValue_Utility(Diary_Creation.AssureClaim_DiaryVoid_Txt_VoidToDate, d, "ToDate")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Diary_Creation.AssureClaim_DiaryVoid_Chk_VoidSelectedDiary,"Check","Void Selected Diary")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_DiaryVoid_Btn_Void,"Void Diary On DiaryList")
        await t.setNativeDialogHandler(() => true);
        await t.wait(10000)
        
        //Void Diary Verification On Diary History Started
        await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_Diaries_Btn_History,"Click on History button")
        await t.wait(10000);
        const ColHead1 = ["Diary Status"]
        const ColVal1 = ["Void"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Void",'Diary Grid View',ColHead1,ColVal1)
       //Verification Ended  ForVoid Diary
});

test('AssureClaims_MarkDiaryCompletedFromDiaryList_Test_12', async t => {
  console.log("AssureClaims_Diary_Creation_Utility Function is Called To Create Diary"); 
         var TaskName1 = await Function_Utility.AssureClaims_Diary_Creation_Utility('NA')
//New Diary Is Created To MarkDiaryCompleted

       await Nav_Utility.AssureClaims_ElementClick_Utility(AttachCreateDiary_POM.AssureClaims_AttachCreate_Btn_SelectGrid, "Grid Button Selected")
        await t.wait(2000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_Diaries_Btn_Complete,"Complete button on DiaryPage ")
        await In_Utility.AssureClaims_SetValue_Utility(Diary_Creation.AssureClaims_Diaries_Txt_CompletionResponse,"Done","CompletionResponse")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_Diaries_btn_DiaryDone,"Done Button on Diary Complete Page")
        await t.wait(2000)
        await In_Utility.AssureClaims_SetValue_Utility(Diary_Creation.AssureClaimsApp_Diaries_Txt_TaskName,TaskName1,"TaskName TextBox")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_SystemUsers_Btn_FilterSearchTaskName,"Click on Search Button")
        await Verify_Utility.AssureClaims_ElementNotExist_Utility(Diary_Creation.AssureClaimsApp_Diaries_Img_RowSelector, "TaskName");

        

        //Verification Of Completed Diary Started in the Diary History Screen--------------------------------------------------------------------------------------------------------------------
       await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_Diaries_Btn_History,"Click on History button")
       await t.wait(10000);
        const ColHeading2 = ["Task Name","Completed Response"]
       const val2 = [TaskName1,"Done"]
       await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(TaskName1,'Done',ColHeading2,val2)
       await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaims_Diary_History_Lbl_TaskName.withText(TaskName1), TaskName1+": Created Taskname of Diary")
       await t.wait(10000);
       //Verification Of Completed Diary Ends Here On the Diary History Screen-------------------------------------------------------------------------------------------------------------------

       await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_DiaryHistory_SelectAllGrid,"Select all Grid")
       await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_DiaryHistory_Btn_Cancel,"Cancel Button On History Page")
       await t.wait(4000)

    
       await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_Diaries_Btn_History,"Click on History button")
       await t.wait(4000)
       await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_DiaryHistory_SelectAllGrid,"Select all Grid")
       await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_DiaryHistory_Btn_Delete,"Delete Button On History Page")
       await t.wait(4000);
       //Diaries are Deleted From The DiaryHstory Page-------------------------------------------------------------------------------------------------------------------------------------------------------------------------



       



});
});
