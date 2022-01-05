import { Selector,Role } from 'testcafe';
import { createTestCafe } from 'testcafe';
import Colors from 'colors'
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';
import POM_PaymentParameterSetUp from '../Functional_POM/POM_PaymentParameterSetUp';
import Input_Utility from '../Functional_Utilities/Input_Utility';
import POM_UserPrivilegesSetUp from '../Functional_POM/POM_UserPrivilegesSetUp';
import POM_Home from '../Functional_POM/POM_Home';
import Verification_Utility from '../Functional_Utilities/Verification_Utility'
import POM_SupervisoryApproval from '../Functional_POM/POM_SupervisoryApproval';
import POM_DiaryList from '../Functional_POM/POM_DiaryList';
import POM_FinancialReserves from '../Functional_POM/POM_FinancialReserves';
import POM_Search from '../Functional_POM/POM_Search';
import POM_DiaryUtilities from '../Functional_POM/POM_DiaryUtilities';


//const DataIUT = require('../DataFiles/DataIUT.json');
// const DataIUT = require('../DataFiles/DataIUT.json');
//const DataAutoReg = require('../DataFiles/DataAutoReg.json');
const DataSTG = require('../DataFiles/DataSTG.json');
const Function_Utility = new Functionality_Utility();
const Nav_Utility = new Navigation_Utility();
const Generic_Utility = new GenericUsages_Utility();
const Verification_Msg = new POM_VerificationMessage();
const Payment_POM = new POM_PaymentsCollections();
const PayParaSetUp_POM=new POM_PaymentParameterSetUp();
const In_Utility = new Input_Utility();
const UserPrevSetUp_POM=new POM_UserPrivilegesSetUp();
const Home_POM = new POM_Home();
const Verify_Utility = new Verification_Utility();
const SupervisoryApproval_POM=new POM_SupervisoryApproval();
const Diary_Creation = new POM_DiaryList();
const Reserve_Utility = new POM_FinancialReserves();
const Search_POM = new POM_Search();
const Diary_Utilities = new POM_DiaryUtilities();

var faker=require('faker');

var SrLastName="Sr_"+""+faker.name.lastName();
var SrFirstName="Sr_"+""+faker.name.firstName();
var MidLastName="Mid_"+""+faker.name.lastName();
var MidFirstName="Mid_"+""+faker.name.firstName();
var UserLastName="Usr_"+""+faker.name.lastName();
var UserFirstName="Usr_"+""+faker.name.firstName();

var StrClaimNumber;
var ReserveTypeApprovedByMidManager;
var ReserveTypeRejectedByMidManager;
var ReserveTypeApprovedBySeniorManager;
var ReserveTypeRejectedBySeniorManager;
var ReserveTypeApprovedByMidManager1;
var ReserveTypeRejectedByMidManager1;
var ReserveTypeApprovedBySeniorManager1;
var ReserveTypeRejectedBySeniorManager1;

DataSTG.forEach(data => {
    fixture `Smoke_ReserveLimit`.beforeEach(async t => {
            await t.wait(4000)
            await t.navigateTo(data.URL)
            await t.maximizeWindow()    
});


test('UserCreation_Test_01', async t => {
        
    await t.wait(10000)
    console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Security')
    await t.wait(5000)
    console.log("Login Into Application!!".green)

    await Function_Utility.AssureClaims_SMSSuperUserAddEditDelete_Utility("Add",SrLastName,SrFirstName,"NA","NA",data.DSN,data.ModuleName)
    await Function_Utility.AssureClaims_SMSSuperUserAddEditDelete_Utility("Add",MidLastName,MidFirstName,SrFirstName+" "+SrLastName,"NA",data.DSN,data.ModuleName)   
    await Function_Utility.AssureClaims_SMSSuperUserAddEditDelete_Utility("Add",UserLastName,UserFirstName,MidFirstName+" "+MidLastName,"NA",data.DSN,data.ModuleName)       

    
          await Function_Utility.AssureClaims_LogoutFromApplication_Utility();
          console.log("Logout from Application!!")
          //Logout from Application
});


test('LoginWithUser_UtilitySettingUserPrivilegeSetting_Test_02', async t => {

    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(UserFirstName,'abkabk1',data.DSN,'Utilities')
    console.log(`Login Into Application with ${UserFirstName}`)
    //Login Into Application with User

      //Utilities Setting on Payment Parameter SetUp
      await t.wait(10000)
      await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_UtilitiesIframe);
      await t.wait(2000)
      await Nav_Utility.AssureClaims_ElementClick_Utility(PayParaSetUp_POM.AssureClaims_Lnk_PaymentParameterSetUp.withText('Payment Parameter Setup'),"Payment Parameter Setup")
      await t.wait(4000);
      await t.switchToMainWindow();
      await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PaymentParameterSetupIframe)
      await t.wait(4000);
      await Nav_Utility.AssureClaims_ElementClick_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Tab_SupervisorApproval,"tab Supervisor Approval Configuration")
      await t.wait(1000)
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_RsvLimitExceed,"Check","Checked Reseve Limit Exceeded")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_UseSupAppRsv,"Check","Checked Supervisory Approval")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_AllowGrpSupervisorToApproveReserve,"Check","Checked Allow the group of supervisor to approve")
      await Nav_Utility.AssureClaims_ElementClick_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_TimeFrameRsv,"time frame")
      await Nav_Utility.AssureClaims_ElementClick_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_TimeFrameRsv.find('option').withText('Days'),"Select days in time frame")
      await In_Utility.AssureClaims_SetValue_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_DaysApprovalRsv,"0","Days/Hours For Approval Of Reserves")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_ZeroEscalationRsv,"UnCheck","Checked Consider 0 as Valid value for Escalation")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_NotifySupRsv,"Check","UnChecked Notify The Immediate Supervisor")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_UseCurrAdjRsv,"UnCheck","Checked Use Current Adjuster Supervisory Chain")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_DisbEmailSprVsrRes,"Check","Checked Disable Email Notification To Supervisor")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_DisbDiarySprVsrRes,"UnCheck","Checked Disable Diary Notification To Supervisor")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_IncLmtExceed,"UnCheck","Checked Incurred Limits are exceeded")
      await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"save button")
});

test("SecuritySetting_Test_03", async t=>{

       //Zone Switched to security for User Privileges setting
       await t.wait(10000)
       await Function_Utility.AssureClaims_LoginIntoApplication_Utility(UserFirstName,'abkabk1',data.DSN,'Security')
       console.log(`Login Into Application with ${UserFirstName}`)
        //Login Into Application with User

       await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Security:User Privileges Setup")
       await t.wait(10000)
       await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_UserPrivilegesIframe)
       await t.wait(5000)
       await Nav_Utility.AssureClaims_ElementClick_Utility(UserPrevSetUp_POM.AssureClaims_UserPrev_Lst_LOB,"Policy LOB")
       await Nav_Utility.AssureClaims_ElementClick_Utility(UserPrevSetUp_POM.AssureClaims_UserPrev_Lst_LOB.find('option').withText('GC - General Claims'),"Select LOB")
       await Nav_Utility.AssureClaims_ElementClick_Utility(UserPrevSetUp_POM.AssureClaims_UserPrev_Lst_LimitType,"LimitType")
       await Nav_Utility.AssureClaims_ElementClick_Utility(UserPrevSetUp_POM.AssureClaims_UserPrev_Lst_LimitType.find('option').withText('Reserve Limits'),"Select Limit Type")
       await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Chk_EnbLmt,"Check","Checked Enable Reserve Limits")
    
       //Reserve Limit for User 100$
       await In_Utility.AssureClaims_SetValue_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Txt_User,UserFirstName,"User TextBox")
       await t.pressKey('tab');
       await t.wait(1000)
       await In_Utility.AssureClaims_SetValue_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Txt_MaxAmount,"100","Max Amount TextBox")
       await t.wait(1000)
       await Nav_Utility.AssureClaims_ElementClick_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Btn_Add,"Add Button")

       //Reserve Limit for Mid_User 200$
       await In_Utility.AssureClaims_SetValue_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Txt_User,MidFirstName,"User TextBox")
       await t.pressKey('tab');
       await t.wait(1000)
       await In_Utility.AssureClaims_SetValue_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Txt_MaxAmount,"200","Max Amount TextBox")
       await t.wait(1000)
       await Nav_Utility.AssureClaims_ElementClick_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Btn_Add,"Add Button")

        //Reserve Limit for Sr_User 300$
       await In_Utility.AssureClaims_SetValue_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Txt_User,SrFirstName,"User TextBox")
       await t.pressKey('tab');
       await t.wait(1000)
       await In_Utility.AssureClaims_SetValue_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Txt_MaxAmount,"300","Max Amount TextBox")
       await t.wait(1000)
       await Nav_Utility.AssureClaims_ElementClick_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Btn_Add,"Add Button")

          await Function_Utility.AssureClaims_LogoutFromApplication_Utility();
          console.log("Logout from Application!!")
          //Logout from Application
});


test("ClaimReserveCreation_Test_04", async t=>{

    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(UserFirstName,'abkabk1',data.DSN,'Claims')
    console.log(`Login Into Application with ${UserFirstName}`)

    await t.wait(10000)
    var d=await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
   // StrClaimNumber = await Function_Utility.AssureClaims_GeneralClaimCreation(d,d,data.ClaimStatus,data.GCClaimType,data.Department,data.GCPolicyLOB)
    StrClaimNumber = await Function_Utility.AssureClaims_GeneralClaimCreation(d,d,data.ClaimStatus,data.GCClaimType1,data.Department,data.GCPolicyLOB1)
    console.log("AssureClaims_GeneralClaimCreation is called to create a claim with Claim Number:"+StrClaimNumber)   
    //Claim Creation

    //Created 1st Reserve 
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Financial Reserve")
    ReserveTypeApprovedByMidManager= await Function_Utility.AssureClaims_ReserveCorpAdditionWithWithoutSaveMessageVerification_Utility(1,"105",data.ReserveStatus,Verification_Msg.ExceedReserveLimitsOnHold,StrClaimNumber,"NA")      
    console.log("AssureClaims_ReserveCorpAdditionWithWithoutSaveMessageVerification_Utility is called to create a reserve")
    //1st Created Reserve Goes on Hold
    ReserveTypeApprovedByMidManager1=ReserveTypeApprovedByMidManager.replace(' ',' - ')

    //Created 2nd Reserve 
    ReserveTypeRejectedByMidManager= await Function_Utility.AssureClaims_ReserveCorpAdditionWithWithoutSaveMessageVerification_Utility(2,"105",data.ReserveStatus,Verification_Msg.ExceedReserveLimitsOnHold,StrClaimNumber,"NA")      
    console.log("AssureClaims_ReserveCorpAdditionWithWithoutSaveMessageVerification_Utility is called to create a reserve")
    //2nd Created Reserve Goes on Hold
    ReserveTypeRejectedByMidManager1=ReserveTypeRejectedByMidManager.replace(' ',' - ')

    //Created 3rd Reserve 
    ReserveTypeApprovedBySeniorManager= await Function_Utility.AssureClaims_ReserveCorpAdditionWithWithoutSaveMessageVerification_Utility(3,"210",data.ReserveStatus,Verification_Msg.ExceedReserveLimitsOnHold,StrClaimNumber,"NA")      
    console.log("AssureClaims_ReserveCorpAdditionWithWithoutSaveMessageVerification_Utility is called to create a reserve")
    //3rd Created Reserve Goes on Hold
    ReserveTypeApprovedBySeniorManager1=ReserveTypeApprovedBySeniorManager.replace(' ',' - ')

    //Created 4th Reserve 
    ReserveTypeRejectedBySeniorManager= await Function_Utility.AssureClaims_ReserveCorpAdditionWithWithoutSaveMessageVerification_Utility(4,"210",data.ReserveStatus,Verification_Msg.ExceedReserveLimitsOnHold,StrClaimNumber,"NA")      
    console.log("AssureClaims_ReserveCorpAdditionWithWithoutSaveMessageVerification_Utility is called to create a reserve")
    //3rd Created Reserve Goes on Hold
    ReserveTypeRejectedBySeniorManager1=ReserveTypeRejectedBySeniorManager.replace(' ',' - ')

    const ColHeader1=["Hold Reason","Reserve Type"]
    const ColValue1=["Exceeded Reserve Limit",ReserveTypeApprovedByMidManager]
    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("My Work:My Pending Transactions")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PendingTransIframe)
    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchReserve,ReserveTypeApprovedByMidManager,"Enter Reserve Type")
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Exceeded Reserve Limit","Pending Transaction Grid",ColHeader1,ColValue1)
    //Verification of 1st record on my pending transaction screen

    const ColHeader2=["Hold Reason","Reserve Type"]
    const ColValue2=["Exceeded Reserve Limit",ReserveTypeRejectedByMidManager]
    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchReserve,ReserveTypeRejectedByMidManager,"Enter Reserve Type")
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Exceeded Reserve Limit","Pending Transaction Grid",ColHeader2,ColValue2)
    //Verification of 2nd record on my pending transaction screen

    const ColHeader3=["Hold Reason","Reserve Type"]
    const ColValue3=["Exceeded Reserve Limit",ReserveTypeApprovedBySeniorManager]
    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchReserve,ReserveTypeApprovedBySeniorManager,"Enter Reserve Type")
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Exceeded Reserve Limit","Pending Transaction Grid",ColHeader3,ColValue3)
    //Verification of 3rd record on my pending transaction screen

    const ColHeader4=["Hold Reason","Reserve Type"]
    const ColValue4=["Exceeded Reserve Limit",ReserveTypeRejectedBySeniorManager]
    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchReserve,ReserveTypeRejectedBySeniorManager,"Enter Reserve Type")
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Exceeded Reserve Limit","Pending Transaction Grid",ColHeader4,ColValue4)
    //Verification of 4th record on my pending transaction screen

    await Function_Utility.AssureClaims_LogoutFromApplication_Utility();
    console.log("Logout from Application!!")
    //Logout from Application

});

test('MidMgrApproveRejectReserve_Test_05', async t => {

    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(MidFirstName,'abkabk1',data.DSN,'Claims')
    console.log("Login Into Application with Middle Manager!!")
    //Login Into Application with Middle Manager
    await t.wait(15000)

    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Diaries:Diary List");
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.Assureclaims_Generic_DiaryFrame)
    await t.wait(5000)
    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification, ReserveTypeApprovedByMidManager1, "TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")
    await t.wait(2000)
    var DiaryText1="Reserve Approval Request of"
    var DiaryText2="Reserve for Claim "+StrClaimNumber
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(DiaryText1),"Approval of Diary")
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(DiaryText2),"Approval of Diary")
    const UserApprovalHead1= ["Assigned User's FullName","Assigning User's FullName"]
    const UserApprovalVal1= [MidLastName+" "+MidFirstName,UserLastName+" "+UserFirstName]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(MidLastName+" "+MidFirstName,"Diary grid view",UserApprovalHead1,UserApprovalVal1)
    //Verification of 1st reserve approval diary for MidManager


    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification, ReserveTypeRejectedByMidManager1, "TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")
    await t.wait(2000)
    var DiaryText3="Reserve Approval Request of"
    var DiaryText4= "Reserve for Claim "+StrClaimNumber
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(DiaryText3),"Approval of Diary")
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(DiaryText4),"Approval of Diary")
    const UserApprovalHead2=  ["Assigned User's FullName","Assigning User's FullName"]
    const UserApprovalVal2=  [MidLastName+" "+MidFirstName,UserLastName+" "+UserFirstName]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(MidLastName+" "+MidFirstName,"Diary grid view",UserApprovalHead2,UserApprovalVal2)
    //Verification of 2nd reserve approval diary for MidManager


    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification, ReserveTypeApprovedBySeniorManager1, "TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")
    await t.wait(2000)
    var DiaryText5="Reserve Approval Request of"
    var DiaryText6="Reserve for Claim "+StrClaimNumber
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(DiaryText5),"Approval of Diary")
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(DiaryText6),"Approval of Diary")
    const UserApprovalHead3= ["Assigned User's FullName","Assigning User's FullName"]
    const UserApprovalVal3= [MidLastName+" "+MidFirstName,UserLastName+" "+UserFirstName]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(MidLastName+" "+MidFirstName,"Diary grid view",UserApprovalHead3,UserApprovalVal3)
    //Verification of 3rd reserve approval diary for MidManager


    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification, ReserveTypeRejectedBySeniorManager1, "TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")
    await t.wait(2000)
    var DiaryText7="Reserve Approval Request of"
    var DiaryText8="Reserve for Claim "+StrClaimNumber
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(DiaryText7),"Approval of Diary")
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(DiaryText8),"Approval of Diary")
    const UserApprovalHead4= ["Assigned User's FullName","Assigning User's FullName"]
    const UserApprovalVal4= [MidLastName+" "+MidFirstName,UserLastName+" "+UserFirstName]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(MidLastName+" "+MidFirstName,"Diary grid view",UserApprovalHead4,UserApprovalVal4)
    //Verification of 4th reserve approval diary for MidManager

    //MidManager Reserve Approval
    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Funds:Supervisory Approval");
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_SupervisoryApprovalIframe)
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Tab_Reserve,"Reserve Tab")
    const Header1=["Claim Number","Hold Reason"]
    const Value1=[StrClaimNumber,"Exceeded Reserve Limit"]
    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchReserve,ReserveTypeApprovedByMidManager,"Enter Reserve Type")
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrClaimNumber,"Reserve Supervisory Approval",Header1,Value1)
    //verification of Reserve getting Displayed on supervisory approval screen of MidManager
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Chk_FirstRowSelection,"Select First Row")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Btn_Approve,"Aprrove Button")
    await In_Utility.AssureClaims_SetValue_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Txt_ResApproveReason,"Reserve Approve","Approve Reason TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Btn_ApproveSaveComment,"Aprrove Comment save")
    //MidManager approved the reserve as it is within his limit


    const Header2=["Claim Number","Hold Reason"]
    const Value2=[StrClaimNumber,"Exceeded Reserve Limit"]
    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchReserve,ReserveTypeRejectedByMidManager,"Enter Reserve Type")
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrClaimNumber,"Reserve Supervisory Approval",Header2,Value2)
    //verification of Reserve getting Displayed on supervisory approval screen of MidManager
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Chk_FirstRowSelection,"Select First Row")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Btn_Reject,"Reject Button")
    await In_Utility.AssureClaims_SetValue_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Txt_ResRejectReason,"Reserve Reject","Reject Reason TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Btn_ApproveSaveComment,"Reject Comment save")
    //MidManager Reject the reserve as it is within his limit

    await t.wait(2000)
    const Header3=["Claim Number","Hold Reason"]
    const Value3=[StrClaimNumber,"Exceeded Reserve Limit"]
    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchReserve,ReserveTypeApprovedBySeniorManager,"Enter Reserve Type")
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrClaimNumber,"Reserve Supervisory Approval",Header3,Value3)
    //verification of Reserve getting Displayed on supervisory approval screen of MidManager
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Chk_FirstRowSelection,"Select First Row")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Btn_Approve,"Aprrove Button")
    await In_Utility.AssureClaims_SetValue_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Txt_ResApproveReason,"Trying To Approve The Reserve","Approve Reason TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Btn_ApproveSaveComment,"Aprrove Comment save")
     var  LimitMessageVerification = "Claim Number: "+StrClaimNumber+" Reserve Type: "
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(LimitMessageVerification,true,"Hold status as reserve limit exceed")
    //MidManager can not approved the reserve as it is not within his limit 

    await t.wait(2000)
    const Header4=["Claim Number","Hold Reason"]
    const Value4=[StrClaimNumber,"Exceeded Reserve Limit"]
    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchReserve,ReserveTypeRejectedBySeniorManager,"Enter Reserve Type")
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrClaimNumber,"Reserve Supervisory Approval",Header4,Value4)
    //verification of Reserve getting Displayed on supervisory approval screen of MidManager
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Chk_FirstRowSelection,"Select First Row")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Btn_Approve,"Approve Button")
    await In_Utility.AssureClaims_SetValue_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Txt_ResApproveReason,"Trying to approve the Reserve","Approve Reason TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Btn_ApproveSaveComment,"Approve Comment save")
    var  LimitMessageVerification1 = "Claim Number: "+StrClaimNumber+" Reserve Type: "
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(LimitMessageVerification1,true,"Hold status as reserve limit exceed")
    //MidManager Trying to Approve the reserve as it is not within his limit 

    await t.wait(2000)
    await Verify_Utility.AssureClaims_ElementExist_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Txt_NoRecordAvailable.withText("No Records Available."),"No records Available text ")

    await Function_Utility.AssureClaims_LogoutFromApplication_Utility();
    console.log("Logout from Application!!")
    //Logout from Application
});

test('SeniorManagerApproveRejectReserve_Test_6', async t => {

    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(SrFirstName,'abkabk1',data.DSN,'Claims')
    console.log("Login Into Application with Senior Manager!!")
    //Login Into Application with Senior Manager
    await t.wait(15000)

    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Diaries:Diary List");
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.Assureclaims_Generic_DiaryFrame)
    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification, ReserveTypeApprovedBySeniorManager1, "TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")
    await t.wait(2000)
    var UserDiaryText1="Reserve Approval Request of"
    var UserDiaryText2="Reserve for Claim "+StrClaimNumber
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(UserDiaryText1),"Approval of Reserve By SeniorManager")
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(UserDiaryText2),"Approval of Reserve By SeniorManager")
    const SrManagerApprovalHead1= ["Assigned User's FullName","Assigning User's FullName"]
    const SrManagerApprovalVal1= [SrLastName+" "+SrFirstName,MidLastName+" "+MidFirstName]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(SrLastName+" "+SrFirstName,"Diary grid view",SrManagerApprovalHead1,SrManagerApprovalVal1)
    //Verification of reserve approve by SeniorManager

    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification, ReserveTypeRejectedBySeniorManager1, "TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")
    await t.wait(2000)
    var UserDiaryText3="Reserve Approval Request of"
    var UserDiaryText4="Reserve for Claim "+StrClaimNumber
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(UserDiaryText3),"Approval of Reserve By MidManager")
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(UserDiaryText4),"Approval of Reserve By MidManager")
    const SrManagerApprovalHead2= ["Assigned User's FullName","Assigning User's FullName"]
    const SrManagerApprovalVal2= [SrLastName+" "+SrFirstName,MidLastName+" "+MidFirstName]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(SrLastName+" "+SrFirstName,"Diary grid view",SrManagerApprovalHead2,SrManagerApprovalVal2)
    //Verification of reserve approval by SeniorManager
  
    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Funds:Supervisory Approval");
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_SupervisoryApprovalIframe)
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Tab_Reserve,"Reserve Tab")
    const ColHeader1=["Claim Number","Hold Reason"]
    const ColValue1=[StrClaimNumber,"Exceeded Reserve Limit"]
    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchReserve,ReserveTypeApprovedBySeniorManager,"Enter Reserve Type")
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrClaimNumber,"Reserve Supervisory Approval",ColHeader1,ColValue1)
    //verification of Reserve getting Displayed on supervisory approval screen of SeniorManager
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Chk_FirstRowSelection,"Select First Row")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Btn_Approve,"Aprrove Button")
    await In_Utility.AssureClaims_SetValue_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Txt_ResApproveReason,"Reserve Approve","Approve Reason TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Btn_ApproveSaveComment,"Aprrove Comment save")
    //SeniorManager approved the reserve as it is within his limit

    const ColHeader2=["Claim Number","Hold Reason"]
    const ColValue2=[StrClaimNumber,"Exceeded Reserve Limit"]
    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchReserve,ReserveTypeRejectedBySeniorManager,"Enter Reserve Type")
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrClaimNumber,"Reserve Supervisory Approval",ColHeader2,ColValue2)
    //verification of Reserve getting Displayed on supervisory approval screen of SeniorManager
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Chk_FirstRowSelection,"Select First Row")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Btn_Reject,"Reject Button")
    await In_Utility.AssureClaims_SetValue_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Txt_ResRejectReason,"Reserve Reject","Reject Reason TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Btn_ApproveSaveComment,"Reject Comment save")
    //SeniorManager Reject the reserve as it is within his limit

    await Verify_Utility.AssureClaims_ElementExist_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Txt_NoRecordAvailable.withText("No Records Available."),"No records Available text ")

    await Function_Utility.AssureClaims_LogoutFromApplication_Utility();
    console.log("Logout from Application!!")
    //Logout from Application

});

test('UserVerification_Test_7', async t => {

    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(UserFirstName,'abkabk1',data.DSN,'Claims')
    console.log("Login Into Application with User!!")
    //Login Into Application with User
    await t.wait(25000)

    //Verfication of the reserve approved diary for the user
    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Diaries:Diary List");
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.Assureclaims_Generic_DiaryFrame)
    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification, ReserveTypeApprovedByMidManager1, "TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")
    await t.wait(2000)
    var UserDiaryText1="Reserve Approve Request of"
    var UserDiaryText2="Reserve for Claim "+StrClaimNumber
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(UserDiaryText1),"Approve of Reserve By MidManager")
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(UserDiaryText2),"Approve of Reserve By MidManager")
    const UserApproveHead= ["Assigned User's FullName","Assigning User's FullName"]
    const UserApproveVal= [UserLastName+" "+UserFirstName,MidLastName+" "+MidFirstName]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(UserLastName+" "+UserFirstName,"Diary grid view",UserApproveHead,UserApproveVal)
    //Verification of reserve approve by MidManager

    //Verfication of the reserve Rejected diary for the user
    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification, ReserveTypeRejectedByMidManager1, "TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")
    await t.wait(2000)
    var UserDiaryTextRej1="Reserve Reject Request of"
    var UserDiaryTextRej2="Reserve for Claim "+StrClaimNumber
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(UserDiaryTextRej1),"Reject of Reserve By MidManager")
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(UserDiaryTextRej2),"Reject of Reserve By MidManager")
    const UserRejectHead= ["Assigned User's FullName","Assigning User's FullName"]
    const UserRejectVal= [UserLastName+" "+UserFirstName,MidLastName+" "+MidFirstName]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(UserLastName+" "+UserFirstName,"Diary grid view",UserRejectHead,UserRejectVal)
    //Verification of reserve Reject by MidManager

    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification, ReserveTypeApprovedBySeniorManager1, "TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")
    await t.wait(2000)
    var UserDiaryText3="Reserve Approve Request of"
    var UserDiaryText4="Reserve for Claim "+StrClaimNumber
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(UserDiaryText3),"Approve of Reserve By MidManager")
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(UserDiaryText4),"Approve of Reserve By MidManager")
    const SrManagerApproveHead= ["Assigned User's FullName","Assigning User's FullName"]
    const SrManagerApproveVal= [UserLastName+" "+UserFirstName,SrLastName+" "+SrFirstName]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(UserLastName+" "+UserFirstName,"Diary grid view",SrManagerApproveHead,SrManagerApproveVal)
    //Verification of reserve approve by SeniorManager

    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification, ReserveTypeRejectedBySeniorManager1, "TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")
    await t.wait(2000)
    var UserDiaryTextRej3="Reserve Reject Request of"
    var UserDiaryTextRej4="Reserve for Claim "+StrClaimNumber
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(UserDiaryTextRej3),"Reject of Reserve By SeniorManager")
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(UserDiaryTextRej4),"Reject of Reserve By SeniorManager")
    const SrManagerRejectHead= ["Assigned User's FullName","Assigning User's FullName"]
    const SrManagerRejectVal= [UserLastName+" "+UserFirstName,SrLastName+" "+SrFirstName]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(UserLastName+" "+UserFirstName,"Diary grid view",SrManagerRejectHead,SrManagerRejectVal)
    //Verification of reserve Reject by SeniorManager
   
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaimsApp_Diary_Lnk_AttachRecord.withText("Claim: "+StrClaimNumber),"Claim Number Link")
    await t.wait(2000)
    await t.switchToMainWindow();
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)  
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Btn_MiniFinancialGraph,"Minimize Financial graph")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve,"Finance Reserve Button")

    const ColHeader1=["Status","Balance"]
    const ColValue1=["O - Open","$105.00"]
    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchReserve,ReserveTypeApprovedByMidManager,"Enter Reserve Type")
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("O - Open","Financial grid view",ColHeader1,ColValue1)

    const ColHeader2=["Status","Balance"]
    const ColValue2=["O - Open","$0.00"]
    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchReserve,ReserveTypeRejectedByMidManager,"Enter Reserve Type")
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("O - Open","Financial grid view",ColHeader2,ColValue2)

    const ColHeader3=["Status","Balance"]
    const ColValue3=["O - Open","$210.00"]
    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchReserve,ReserveTypeApprovedBySeniorManager,"Enter Reserve Type")
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("O - Open","Financial grid view",ColHeader3,ColValue3)

    const ColHeader4=["Status","Balance"]
    const ColValue4=["O - Open","$0.00"]
    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchReserve,ReserveTypeRejectedBySeniorManager,"Enter Reserve Type")
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("O - Open","Financial grid view",ColHeader4,ColValue4)
});



});
    
