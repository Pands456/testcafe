import { Selector,Role, t } from 'testcafe';
import { createTestCafe } from 'testcafe';
import Colors from 'colors'
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import Input_Utility from '../Functional_Utilities/Input_Utility';
import Verification_Utility from '../Functional_Utilities/Verification_Utility'
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';
import POM_PaymentParameterSetUp from '../Functional_POM/POM_PaymentParameterSetUp';
import POM_UserPrivilegesSetUp from '../Functional_POM/POM_UserPrivilegesSetUp';
import POM_Home from '../Functional_POM/POM_Home';
import POM_SupervisoryApproval from '../Functional_POM/POM_SupervisoryApproval';
import POM_DiaryList from '../Functional_POM/POM_DiaryList';
import POM_FinancialReserves from '../Functional_POM/POM_FinancialReserves';
import POM_Search from '../Functional_POM/POM_Search';
import POM_DiaryUtilities from '../Functional_POM/POM_DiaryUtilities';


//const DataIUT = require('../DataFiles/DataIUT.json');
 const DataIUT = require('../DataFiles/DataSTG.json');
//const DataIUT = require('../DataFiles/DataAutoReg.json');
const Function_Utility = new Functionality_Utility();
const Nav_Utility = new Navigation_Utility();
const Generic_Utility = new GenericUsages_Utility();
const In_Utility = new Input_Utility();
const Verify_Utility = new Verification_Utility();
const Reserve_Utility = new POM_FinancialReserves();
const Diary_Utilities = new POM_DiaryUtilities();
const Verification_Msg = new POM_VerificationMessage();
const Payment_POM = new POM_PaymentsCollections();
const PayParaSetUp_POM=new POM_PaymentParameterSetUp();
const UserPrevSetUp_POM=new POM_UserPrivilegesSetUp();
const Home_POM = new POM_Home();
const SupervisoryApproval_POM=new POM_SupervisoryApproval();
const Diary_Creation = new POM_DiaryList();
const Search_POM = new POM_Search();

var faker=require('faker');

//Global Variable Declaration
var SrLastName="Sr_"+""+faker.name.lastName();
var SrFirstName="Sr_"+""+faker.name.firstName();
var MidLastName="Mid_"+""+faker.name.lastName();
var MidFirstName="Mid_"+""+faker.name.firstName();
var UserLastName="Usr_"+""+faker.name.lastName();
var UserFirstName="Usr_"+""+faker.name.firstName();
var StrClaimNumber;
var StrControlNumber1;
var StrControlNumber2;
var StrControlNumber3;
var StrControlNumber4;


DataIUT.forEach(data => {
    fixture `PaymentLimit_Smoke`.beforeEach(async t => {
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

    console.log("AssureClaims_SMSSuperUserAddEditDelete_Utility Function is Called To Create User".yellow);
    await Function_Utility.AssureClaims_SMSSuperUserAddEditDelete_Utility("Add",SrLastName,SrFirstName,"NA","NA",data.DSN,data.ModuleName)
    await Function_Utility.AssureClaims_SMSSuperUserAddEditDelete_Utility("Add",MidLastName,MidFirstName,SrFirstName+" "+SrLastName,"NA",data.DSN,data.ModuleName)   
    await Function_Utility.AssureClaims_SMSSuperUserAddEditDelete_Utility("Add",UserLastName,UserFirstName,MidFirstName+" "+MidLastName,"NA",data.DSN,data.ModuleName)       
});


test('LoginWithUser_UtilitySettingUserPrivilegeSetting_Test_02', async t => {

      await t.wait(10000)
      await Function_Utility.AssureClaims_LoginIntoApplication_Utility(UserFirstName,'abkabk1',data.DSN,'Utilities')
      console.log(`Login Into Application with ${UserFirstName}`)
      //Login Into Application with User

      //Utilities Setting on Payment Parameter SetUp For Reserve
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
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_RsvLimitExceed,"UnCheck","Checked Reseve Limit Exceeded")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_UseSupAppRsv,"UnCheck","Checked Supervisory Approval")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_AllowGrpSupervisorToApproveReserve,"UnCheck","Checked Allow the group of supervisor to approve")
      await In_Utility.AssureClaims_ElementWebListSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_TimeFrameRsv,'Days',"Select days in time frame")
      await In_Utility.AssureClaims_SetValue_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_DaysApprovalRsv,"0","Days/Hours For Approval Of Reserves")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_ZeroEscalationRsv,"UnCheck","Checked Consider 0 as Valid value for Escalation")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_NotifySupRsv,"UnCheck","UnChecked Notify The Immediate Supervisor")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_UseCurrAdjRsv,"UnCheck","Checked Use Current Adjuster Supervisory Chain")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_DisbEmailSprVsrRes,"UnCheck","Checked Disable Email Notification To Supervisor")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_DisbDiarySprVsrRes,"UnCheck","Checked Disable Diary Notification To Supervisor")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_IncLmtExceed,"UnCheck","Checked Incurred Limits are exceeded")


      //Utilities Setting on Payment Parameter SetUp For Payment
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_PayLimitExceed,"Check","Payment Limits Are Exceeded")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_PayDetailLimitExceed,"UnCheck","Payment Detail Limits Are Exceeded")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_PayeeNotExist,"UnCheck","Payee does Not Exist in System")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_PerClaimPayLimitsExceeded,"UnCheck","Per Claim Pay Limits Exceeded")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_PerClaimPolicyPayLimitsExceeded,"UnCheck","Per Claim Per Policy Pay Limits Exceeded")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_PerClaimCoveragePayLimitsExceeded,"UnCheck","Per Claim Per Coverage Pay Limits Exceeded")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_QueuePayment,"UnCheck","Queue Payments Instead Of Placing On Hold")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_SupervisoryApproval,"Check","Supervisory Approval")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_AllowGrpSupervisorToApprove,"Check","Allow the group of supervisor to approve")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_UseCurrentAdjuster,"UnCheck","Use Current Adjuster Supervisory Chain")
      await In_Utility.AssureClaims_ElementWebListSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Lst_TimeFrame,'Days',"Select days in time frame")
      await In_Utility.AssureClaims_SetValue_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Txt_DaysHrsApproval,"0","Days/Hours For Approval Of Reserves")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_ZeroEscalationValue,"UnCheck","Consider 0 as Valid value for Escalation")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_NotifyImmSupervisor,"Check","Notify The Immediate Supervisor")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_DisbDiaryNotify,"UnCheck","Disable Diary Notification To Supervisor")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_DisbEmailNotify,"UnCheck","Disable Email Notification To Supervisor")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_EnbPmtDiary,"Check","Enable Payment Approval Diary")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_EnbPmtEmail,"UnCheck","Enable Payment Approval Email") 
      //End

      await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"save button")
      await t.wait(2000)
});

test("SecuritySetting_Test_03", async t=>{

       await t.wait(10000)
       await Function_Utility.AssureClaims_LoginIntoApplication_Utility(UserFirstName,'abkabk1',data.DSN,'Security')
       console.log(`Login Into Application with ${UserFirstName}`)
        //Login Into Application with User

       await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Security:User Privileges Setup")
       await t.wait(10000)
       await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_UserPrivilegesIframe)
       await t.wait(5000)

       await In_Utility.AssureClaims_ElementWebListSelect_Utility(UserPrevSetUp_POM.AssureClaims_UserPrev_Lst_LOB,'GC - General Claims',"Select LOB")
       await In_Utility.AssureClaims_ElementWebListSelect_Utility(UserPrevSetUp_POM.AssureClaims_UserPrev_Lst_LimitType,'Payment Limits',"Select Limit Type")
       await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Chk_EnbPayLmt,"Check","UnChecked Enable Payment Limits")

       //Payment Limit for User 100$
       await In_Utility.AssureClaims_SetValue_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Txt_User,UserFirstName,"User TextBox")
       await t.pressKey('tab');
       await t.wait(1000)
       await In_Utility.AssureClaims_SetValue_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Txt_MaxAmount,"100","Max Amount TextBox")
       await t.wait(1000)
       await Nav_Utility.AssureClaims_ElementClick_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Btn_Add,"Add Button")

       //Payment Limit for Mid_User 200$
       await In_Utility.AssureClaims_SetValue_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Txt_User,MidFirstName,"User TextBox")
       await t.pressKey('tab');
       await t.wait(1000)
       await In_Utility.AssureClaims_SetValue_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Txt_MaxAmount,"200","Max Amount TextBox")
       await t.wait(1000)
       await Nav_Utility.AssureClaims_ElementClick_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Btn_Add,"Add Button")

        //Payment Limit for Sr_User 300$
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


test("ClaimPaymentCreation_Test_04", async t=>{

    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(UserFirstName,'abkabk1',data.DSN,'Claims')
    console.log(`Login Into Application with ${UserFirstName}`)

    await t.wait(10000)
    var d=await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    StrClaimNumber = await Function_Utility.AssureClaims_GeneralClaimCreation(d,d,data.ClaimStatus,data.GCClaimType1,data.Department,data.GCPolicyLOB1)
    console.log("AssureClaims_GeneralClaimCreation is called to create a claim with Claim Number:"+StrClaimNumber)   
    //Claim Creation

    //Created 1st Payment
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Financial Reserve")
    StrControlNumber1=await Function_Utility.AssureClaims_PaymentCorpAdditionWithSaveMessageVerification_Utility(data.BankAccount,data.PayeeType,data.LastName,1,1,"105",Verification_Msg.ExceedPaymentLimitsOnHold)
    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back,"Back Button")

    //Created 2nd Payment
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    StrControlNumber2=await Function_Utility.AssureClaims_PaymentCorpAdditionWithSaveMessageVerification_Utility(data.BankAccount,data.PayeeType,data.LastName,2,1,"105",Verification_Msg.ExceedPaymentLimitsOnHold)
    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back,"Back Button")

    //Created 3rd Payment
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    StrControlNumber3=await Function_Utility.AssureClaims_PaymentCorpAdditionWithSaveMessageVerification_Utility(data.BankAccount,data.PayeeType,data.LastName,3,1,"210",Verification_Msg.ExceedPaymentLimitsOnHold)
    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back,"Back Button")

    //Created 4th Payment 
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    StrControlNumber4=await Function_Utility.AssureClaims_PaymentCorpAdditionWithSaveMessageVerification_Utility(data.BankAccount,data.PayeeType,data.LastName,4,1,"210",Verification_Msg.ExceedPaymentLimitsOnHold)
    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back,"Back Button")

    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_ReserveCreation_Btn_Reserve_History,"Transaction History Button")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_TransactionHistory_ClaimGCIframe)
    await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_Payment_Txt_CntrlNumber,StrControlNumber1,"Control Number 1")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_FilterSerach,"Search button")
    const Header1=  ["Status"]
    const Val1=  ["Hold"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Hold","Transaction History grid view",Header1,Val1)

    await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_Payment_Txt_CntrlNumber,StrControlNumber2,"Control Number 2")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_FilterSerach,"Search button")
    const Header2=  ["Status"]
    const Val2=  ["Hold"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Hold","Transaction History grid view",Header2,Val2)

    await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_Payment_Txt_CntrlNumber,StrControlNumber3,"Control Number 3")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_FilterSerach,"Search button")
    const Header3=  ["Status"]
    const Val3=  ["Hold"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Hold","Transaction History grid view",Header3,Val3)

    await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_Payment_Txt_CntrlNumber,StrControlNumber4,"Control Number 4")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_FilterSerach,"Search button")
    const Header4=  ["Status"]
    const Val4=  ["Hold"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Hold","Transaction History grid view",Header4,Val4)

    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("My Work:My Pending Transactions")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PendingTransIframe)
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Tab_Payment,"Payment Tab")
    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchCntrlNo,StrControlNumber1,"Enter Control Number")
    const ColHeader1=["Hold Reason"]
    const ColValue1=["Exceeded Payment Limit"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Exceeded Payment Limit","Pending Transaction Grid",ColHeader1,ColValue1)
    //Verification of 1st record on my pending transaction screen

    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchCntrlNo,StrControlNumber2,"Enter Control Number")
    const ColHeader2=["Hold Reason"]
    const ColValue2=["Exceeded Payment Limit"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Exceeded Payment Limit","Pending Transaction Grid",ColHeader2,ColValue2)
    //Verification of 2nd record on my pending transaction screen

    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchCntrlNo,StrControlNumber3,"Enter Control Number")
    const ColHeader3=["Hold Reason"]
    const ColValue3=["Exceeded Payment Limit"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Exceeded Payment Limit","Pending Transaction Grid",ColHeader3,ColValue3)
    //Verification of 3rd record on my pending transaction screen

    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchCntrlNo,StrControlNumber4,"Enter Control Number")
    const ColHeader4=["Hold Reason"]
    const ColValue4=["Exceeded Payment Limit"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Exceeded Payment Limit","Pending Transaction Grid",ColHeader4,ColValue4)
    //Verification of 4th record on my pending transaction screen

    await Function_Utility.AssureClaims_LogoutFromApplication_Utility();
    console.log("Logout from Application!!")
    //Logout from Application

});

test('MidMgrApproveRejectPayment_Test_05', async t => {

    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(MidFirstName,'abkabk1',data.DSN,'Claims')
    console.log("Login Into Application with Middle Manager!!")
    //Login Into Application with Middle Manager
    await t.wait(15000)

    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Diaries:Diary List");
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.Assureclaims_Generic_DiaryFrame)
    await t.wait(5000)
    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification,StrControlNumber1, "TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")
    await t.wait(2000)
    var DiaryText1="Check On Hold - "+StrControlNumber1
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(DiaryText1),"Approval of Diary")
    const UserApprovalHead1= ["Assigned User's FullName","Assigning User's FullName"]
    const UserApprovalVal1= [MidLastName+" "+MidFirstName,UserLastName+" "+UserFirstName]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(MidLastName+" "+MidFirstName,"Diary grid view",UserApprovalHead1,UserApprovalVal1)
    //Verification of 1st Payment approval diary for MidManager


    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification, StrControlNumber2, "TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")
    await t.wait(2000)
    var DiaryText2="Check On Hold - "+StrControlNumber2
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(DiaryText2),"Approval of Diary")
    const UserApprovalHead2=  ["Assigned User's FullName","Assigning User's FullName"]
    const UserApprovalVal2=  [MidLastName+" "+MidFirstName,UserLastName+" "+UserFirstName]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(MidLastName+" "+MidFirstName,"Diary grid view",UserApprovalHead2,UserApprovalVal2)
    //Verification of 2nd Payment approval diary for MidManager


    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification, StrControlNumber3, "TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")
    await t.wait(2000)
    var DiaryText3="Check On Hold - "+StrControlNumber3
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(DiaryText3),"Approval of Diary")
    const UserApprovalHead3= ["Assigned User's FullName","Assigning User's FullName"]
    const UserApprovalVal3= [MidLastName+" "+MidFirstName,UserLastName+" "+UserFirstName]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(MidLastName+" "+MidFirstName,"Diary grid view",UserApprovalHead3,UserApprovalVal3)
    //Verification of 3rd Payment approval diary for MidManager


    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification, StrControlNumber4, "TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")
    await t.wait(2000)
    var DiaryText4="Check On Hold - "+StrControlNumber4
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(DiaryText4),"Approval of Diary")
    const UserApprovalHead4= ["Assigned User's FullName","Assigning User's FullName"]
    const UserApprovalVal4= [MidLastName+" "+MidFirstName,UserLastName+" "+UserFirstName]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(MidLastName+" "+MidFirstName,"Diary grid view",UserApprovalHead4,UserApprovalVal4)
    //Verification of 4th Payment approval diary for MidManager

    //MidManager Payment Approval
    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Funds:Supervisory Approval");
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_SupervisoryApprovalIframe)
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Tab_Payment,"Payment Tab")
    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchCntrlNo,StrControlNumber1,"Enter Control Number")
    const Header1=["Claim Number","Hold Reason"]
    const Value1=[StrClaimNumber,"Exceeded Payment Limit"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrClaimNumber,"Payment Supervisory Approval",Header1,Value1)
    //verification of Payment getting Displayed on supervisory approval screen of MidManager
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Chk_FirstRowSelection,"Select First Row")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryPaymentApproval_Btn_Approve,"Aprrove Button")
    await In_Utility.AssureClaims_SetValue_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryPaymentApproval_Txt_PayApproveReason,"Payment Approve","Approve Reason TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Btn_ApproveSaveComment,"Aprrove Comment save")
    //MidManager approved the Payment as it is within his limit


    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchCntrlNo,StrControlNumber2,"Enter Control Number")
    const Header2=["Claim Number","Hold Reason"]
    const Value2=[StrClaimNumber,"Exceeded Payment Limit"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrClaimNumber,"Payment Supervisory Approval",Header2,Value2)
    //verification of Payment getting Displayed on supervisory approval screen of MidManager
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Chk_FirstRowSelection,"Select First Row")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryPaymentApproval_Btn_Reject,"Reject Button")
    await In_Utility.AssureClaims_SetValue_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryPaymentApproval_Txt_PayRejectReason,"Payment Reject","Reject Reason TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Btn_ApproveSaveComment,"Reject Comment save")
    //MidManager Reject the Payment as it is within his limit

    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchCntrlNo,StrControlNumber3,"Enter control number")
    await t.wait(2000)
    const Header3=["Claim Number","Hold Reason"]
    const Value3=[StrClaimNumber,"Exceeded Payment Limit"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrClaimNumber,"Payment Supervisory Approval",Header3,Value3)
    //verification of Payment getting Displayed on supervisory approval screen of MidManager
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Chk_FirstRowSelection,"Select First Row")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryPaymentApproval_Btn_Approve,"Aprrove Button")
    await In_Utility.AssureClaims_SetValue_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryPaymentApproval_Txt_PayApproveReason,"Trying To Approve The Payment","Approve Reason TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Btn_ApproveSaveComment,"Aprrove Comment save")
     var  LimitMessageVerification = "Control Number: "+StrControlNumber3+", Amount exceeds user's payment limit. It is submitted to User's manager for approval."
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(LimitMessageVerification,true,"Hold status as Payment limit exceed")
    //MidManager can not approved the Payment as it is not within his limit 

    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchCntrlNo,StrControlNumber4,"Enter Control Number")
    await t.wait(2000)
    const Header4=["Claim Number","Hold Reason"]
    const Value4=[StrClaimNumber,"Exceeded Payment Limit"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrClaimNumber,"Payment Supervisory Approval",Header4,Value4)
    //verification of Payment getting Displayed on supervisory approval screen of MidManager
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Chk_FirstRowSelection,"Select First Row")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryPaymentApproval_Btn_Approve,"Approve Button")
    await In_Utility.AssureClaims_SetValue_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryPaymentApproval_Txt_PayApproveReason,"Trying to approve the Payment","Approve Reason TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Btn_ApproveSaveComment,"Approve Comment save")
    var  LimitMessageVerification1 = "Control Number: "+StrControlNumber4+", Amount exceeds user's payment limit. It is submitted to User's manager for approval."
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(LimitMessageVerification1,true,"Hold status as Payment limit exceed")
    //MidManager Trying to Approve the Payment as it is not within his limit 

    await t.wait(2000)
    await Verify_Utility.AssureClaims_ElementExist_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Txt_NoRecordAvailable.withText("No Records Available."),"No records Available text ")

    await Function_Utility.AssureClaims_LogoutFromApplication_Utility();
    console.log("Logout from Application!!")
    //Logout from Application
});

test('SeniorManagerApproveRejectPayment_Test_6', async t => {

    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(SrFirstName,'abkabk1',data.DSN,'Claims')
    console.log("Login Into Application with Senior Manager!!")
    //Login Into Application with Senior Manager
    await t.wait(15000)

    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Diaries:Diary List");
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.Assureclaims_Generic_DiaryFrame)
    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification, StrControlNumber3, "TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")
    await t.wait(2000)
    var UserDiaryText1="Check On Hold - "+StrControlNumber3
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(UserDiaryText1),"Approval of Payment By SeniorManager")
    const SrManagerApprovalHead1= ["Assigned User's FullName","Assigning User's FullName"]
    const SrManagerApprovalVal1= [SrLastName+" "+SrFirstName,MidLastName+" "+MidFirstName]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(SrLastName+" "+SrFirstName,"Diary grid view",SrManagerApprovalHead1,SrManagerApprovalVal1)
    //Verification of Payment approve by SeniorManager

    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification, StrControlNumber4, "TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")
    await t.wait(2000)
    var UserDiaryText2="Check On Hold - "+StrControlNumber4
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(UserDiaryText2),"Approval of Payment By MidManager")
    const SrManagerApprovalHead2= ["Assigned User's FullName","Assigning User's FullName"]
    const SrManagerApprovalVal2= [SrLastName+" "+SrFirstName,MidLastName+" "+MidFirstName]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(SrLastName+" "+SrFirstName,"Diary grid view",SrManagerApprovalHead2,SrManagerApprovalVal2)
    //Verification of Payment approval by SeniorManager
  
    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Funds:Supervisory Approval");
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_SupervisoryApprovalIframe)
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Tab_Payment,"Payment Tab")
    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchCntrlNo,StrControlNumber3,"Enter Control Number")
    const ColHeader1=["Claim Number","Hold Reason"]
    const ColValue1=[StrClaimNumber,"Exceeded Payment Limit"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrClaimNumber,"Payment Supervisory Approval",ColHeader1,ColValue1)
    //verification of Payment getting Displayed on supervisory approval screen of SeniorManager
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Chk_FirstRowSelection,"Select First Row")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryPaymentApproval_Btn_Approve,"Aprrove Button")
    await In_Utility.AssureClaims_SetValue_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryPaymentApproval_Txt_PayApproveReason,"Approve The Payment","Approve Reason TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Btn_ApproveSaveComment,"Aprrove Comment save")
    //SeniorManager approved the Payment as it is within his limit

    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchCntrlNo,StrControlNumber4,"Enter Control Number")
    const ColHeader2=["Claim Number","Hold Reason"]
    const ColValue2=[StrClaimNumber,"Exceeded Payment Limit"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrClaimNumber,"Payment Supervisory Approval",ColHeader2,ColValue2)
    //verification of Payment getting Displayed on supervisory approval screen of SeniorManager
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Chk_FirstRowSelection,"Select First Row")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryPaymentApproval_Btn_Reject,"Reject Button")
    await In_Utility.AssureClaims_SetValue_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryPaymentApproval_Txt_PayRejectReason,"Payment Reject","Reject Reason TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Btn_ApproveSaveComment,"Reject Comment save")
    //SeniorManager Reject the Payment as it is within his limit

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
    await t.wait(15000)

    //Verfication of the Payment approved diary for the user
    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Diaries:Diary List");
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.Assureclaims_Generic_DiaryFrame)
    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification, StrControlNumber1, "TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")
    await t.wait(2000)
    var UserDiaryText1="Check Approved - "+StrControlNumber1
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(UserDiaryText1),"Approve of Payment By MidManager")
    const UserApproveHead= ["Assigned User's FullName","Assigning User's FullName"]
    const UserApproveVal= [UserLastName+" "+UserFirstName,MidLastName+" "+MidFirstName]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(UserLastName+" "+UserFirstName,"Diary grid view",UserApproveHead,UserApproveVal)
    //Verification of Payment approve by MidManager

    //Verfication of the Payment Rejected diary for the user
    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification, StrControlNumber2, "TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")
    await t.wait(2000)
    var UserDiaryTextRej1="Check Denied - "+StrControlNumber2
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(UserDiaryTextRej1),"Reject of Payment By MidManager")
    const UserRejectHead= ["Assigned User's FullName","Assigning User's FullName"]
    const UserRejectVal= [UserLastName+" "+UserFirstName,MidLastName+" "+MidFirstName]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(UserLastName+" "+UserFirstName,"Diary grid view",UserRejectHead,UserRejectVal)
    //Verification of Payment Reject by MidManager

    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification, StrControlNumber3, "TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")
    await t.wait(2000)
    var UserDiaryText2="Check Approved - "+StrControlNumber3
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(UserDiaryText2),"Approve of Payment By MidManager")
    const SrManagerApproveHead= ["Assigned User's FullName","Assigning User's FullName"]
    const SrManagerApproveVal= [UserLastName+" "+UserFirstName,SrLastName+" "+SrFirstName]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(UserLastName+" "+UserFirstName,"Diary grid view",SrManagerApproveHead,SrManagerApproveVal)
    //Verification of Payment approve by SeniorManager

    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification, StrControlNumber4, "TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")
    await t.wait(2000)
    var UserDiaryTextRej2="Check Denied - "+StrControlNumber4
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaimsApp_Diary_Lbl_ApprovalTaskname.withText(UserDiaryTextRej2),"Reject of Payment By SeniorManager")
    const SrManagerRejectHead= ["Assigned User's FullName","Assigning User's FullName"]
    const SrManagerRejectVal= [UserLastName+" "+UserFirstName,SrLastName+" "+SrFirstName]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(UserLastName+" "+UserFirstName,"Diary grid view",SrManagerRejectHead,SrManagerRejectVal)
    //Verification of Payment Reject by SeniorManager
   
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaimsApp_Diary_Lnk_AttachRecord.withText("Claim:"+StrClaimNumber),"Claim Number Link")
    await t.wait(4000)
    await t.switchToMainWindow();
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)  
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Btn_MiniFinancialGraph,"Minimize Financial graph")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve,"Finance Reserve Button")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_ReserveCreation_Btn_Reserve_History,"Transaction History Button")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_TransactionHistory_ClaimGCIframe)
    await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_Payment_Txt_CntrlNumber,StrControlNumber1,"Control Number 1")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_FilterSerach,"Search button")
    const ColHeader1=["Status"]
    const ColValue1=["Released"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Released","Transaction History grid view",ColHeader1,ColValue1)

    await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_Payment_Txt_CntrlNumber,StrControlNumber2,"Control Number 2")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_FilterSerach,"Search button")
    const ColHeader2=["Status"]
    const ColValue2=["Reviewed But Denied"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Reviewed But Denied","Transaction History grid view",ColHeader2,ColValue2)

    await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_Payment_Txt_CntrlNumber,StrControlNumber3,"Control Number 3")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_FilterSerach,"Search button")
    const ColHeader3=["Status"]
    const ColValue3=["Released"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Released","Transaction History grid view",ColHeader3,ColValue3)

    await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_Payment_Txt_CntrlNumber,StrControlNumber4,"Control Number 4")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_FilterSerach,"Search button")
    const ColHeader4=["Status"]
    const ColValue4=["Reviewed But Denied"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Reviewed But Denied","Transaction History grid view",ColHeader4,ColValue4)
});

test('LoginWithUser_RevertUtilitySettingUserPrivilegeSetting_Test_08', async t => {

    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(UserFirstName,'abkabk1',data.DSN,'Utilities')
    console.log(`Login Into Application with ${UserFirstName}`)
    //Login Into Application with User
    await t.wait(20000)

        
         await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_UtilitiesIframe);
         await t.wait(2000)
         await Nav_Utility.AssureClaims_ElementClick_Utility(PayParaSetUp_POM.AssureClaims_Lnk_PaymentParameterSetUp.withText('Payment Parameter Setup'),"Payment Parameter Setup")
         await t.wait(4000);
         await t.switchToMainWindow();
         await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PaymentParameterSetupIframe)
         await t.wait(4000);
         await Nav_Utility.AssureClaims_ElementClick_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Tab_SupervisorApproval,"tab Supervisor Approval Configuration")
         await t.wait(1000)
           //Revert the changes
          //Utilities Setting on Payment Parameter SetUp For Payment
          await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_PayLimitExceed,"UnCheck","Payment Limits Are Exceeded")
          await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_PayDetailLimitExceed,"UnCheck","Payment Detail Limits Are Exceeded")
          await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_PayeeNotExist,"UnCheck","Payee does Not Exist in System")
          await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_PerClaimPayLimitsExceeded,"UnCheck","Per Claim Pay Limits Exceeded")
          await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_PerClaimPolicyPayLimitsExceeded,"UnCheck","Per Claim Per Policy Pay Limits Exceeded")
          await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_PerClaimCoveragePayLimitsExceeded,"UnCheck","Per Claim Per Coverage Pay Limits Exceeded")
          await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_QueuePayment,"UnCheck","Queue Payments Instead Of Placing On Hold")
          await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_SupervisoryApproval,"UnCheck","Supervisory Approval")
          await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_AllowGrpSupervisorToApprove,"Check","Allow the group of supervisor to approve")
          await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_UseCurrentAdjuster,"UnCheck","Use Current Adjuster Supervisory Chain")
          await In_Utility.AssureClaims_ElementWebListSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Lst_TimeFrame,'Days',"Select days in time frame")
          await In_Utility.AssureClaims_SetValue_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Txt_DaysHrsApproval,"0","Days/Hours For Approval Of Reserves")
          await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_ZeroEscalationValue,"UnCheck","Consider 0 as Valid value for Escalation")
          await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_NotifyImmSupervisor,"UnCheck","Notify The Immediate Supervisor")
          await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_DisbDiaryNotify,"UnCheck","Disable Diary Notification To Supervisor")
          await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_DisbEmailNotify,"UnCheck","Disable Email Notification To Supervisor")
          await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_EnbPmtDiary,"UnCheck","Enable Payment Approval Diary")
          await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_EnbPmtEmail,"UnCheck","Enable Payment Approval Email") 
});

test("SecuritySetting_Test_09", async t=>{

    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(UserFirstName,'abkabk1',data.DSN,'Security')
    console.log(`Login Into Application with ${UserFirstName}`)
     //Login Into Application with User
     await t.wait(20000)

    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Security:User Privileges Setup")
    await t.wait(10000)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_UserPrivilegesIframe)
    await t.wait(5000)
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(UserPrevSetUp_POM.AssureClaims_UserPrev_Lst_LOB,'GC - General Claims',"Select LOB")
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(UserPrevSetUp_POM.AssureClaims_UserPrev_Lst_LimitType,'Payment Limits',"Select Limit Type")
    await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Chk_EnbPayLmt,"UnCheck","UnChecked Enable Payment Limits")

});


});
    
