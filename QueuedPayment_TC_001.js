import { Selector,Role } from 'testcafe';
import { createTestCafe } from 'testcafe';
import Colors from 'colors'
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';
import POM_PaymentParameterSetUp from '../Functional_POM/POM_PaymentParameterSetUp';
import POM_UserPrivilegesSetUp from '../Functional_POM/POM_UserPrivilegesSetUp';
import POM_Home from '../Functional_POM/POM_Home';
import POM_SupervisoryApproval from '../Functional_POM/POM_SupervisoryApproval';
import POM_FinancialReserves from '../Functional_POM/POM_FinancialReserves';
import POM_GeneralSystemParameter from '../Functional_POM/POM_GeneralSystemParameter';
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import Input_Utility from '../Functional_Utilities/Input_Utility';
import Verification_Utility from '../Functional_Utilities/Verification_Utility'
import Maintenance_Functionality_Utility from '../Functional_Utilities/Maintenance_Functionality_Utility';

const DataSTG = require('../DataFiles/DataAutoReg.json');
const Maint_Utility = new Maintenance_Functionality_Utility();
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
const Reserve_Utility = new POM_FinancialReserves();
const GenSysPara_POM=new POM_GeneralSystemParameter();

var faker=require('faker');

var SrLastName="Sr_"+""+faker.name.lastName();
var SrFirstName="Sr_"+""+faker.name.firstName();
var UserLastName="Usr_"+""+faker.name.lastName();
var UserFirstName="Usr_"+""+faker.name.firstName();

var StrClaimNumber;

DataSTG.forEach(data => {
    fixture `Smoke_QueuedPayment`.beforeEach(async t => {
            await t.wait(4000)
            await t.navigateTo(data.URL)
            await t.maximizeWindow()    
 });



test('QueuedPayment_Test_01', async t => {
        
    await t.wait(10000)
    console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
    await t.wait(5000)
    console.log("Login Into Application!!".green)
    //Login Into Application!!

    //===================================================================Claim Creation Started Here==============================================================================================
    var d=await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    StrClaimNumber = await Function_Utility.AssureClaims_GeneralClaimCreation(d,d,data.ClaimStatus,data.GCClaimType,data.Department,data.GCPolicyLOB)
    console.log("AssureClaims_GeneralClaimCreation is called to create a claim with Claim Number:"+StrClaimNumber)   
    //===================================================================Claim Creation Completeed Here==============================================================================================

    //===================================================================Reserve Creation Started Here==============================================================================================
    await Function_Utility.AssureClaims_Reserve_Utility(data.ReserveType, data.ReserveAmount, data.ReserveStatus)
    //===================================================================Reserve Creation Started Here==============================================================================================

    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back,"Back Button");
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Chk_FirstRowSelection,"Select First Row")

    //===================================================================Payment Creation Started Here==============================================================================================
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_MakePayment,"Make Payment Button On Payment Creation Screen")
    await t.wait(2000)
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(Payment_POM.AssureClaims_Payment_Lst_BankAccount,data.BankAccount,"Bank Account On Payment Creation Screen")
    await t.wait(1000)
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType,data.PayeeType,"Payee Type")
    await t.wait(1000)
    await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_LastName,data.LastName,"Last Name Text Box On Payment Creation Screen")
    await t.wait(4000)
    await t.pressKey('tab')
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_TransactionDetail,"Transaction Detail Tab On Payment Creation Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_AddNewFunds,"Add New Funds Button On Payment Creation Screen")
    await t.wait(1000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType, "Transaction Type")
    await t.wait(1000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType.find('option').withText("LG Legal Expense"),"Transaction Type") 
    await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Txt_Amount,data.Amount,"Transaction Amount On Funds Split Detail Screen")
    await t.wait(1000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_FundsSplitDetails_Btn_Save,"Save Button On Funds Split Detail Screen")
    await t.wait(3000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_Transaction,"Transaction Tab On Payment Creation Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_QueuedPayment_statusLookup,"Check Status");
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_QueuedPayment_SelectStatus.withText('Queued Payment'),"Check Status as Queued Payment");
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Payment Creation Screen");
    await t.wait(3000)
    var StrControlNumber =await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_Payment_Txt_ControlNumber,"value");
    console.log("StrControlNumber is :"+StrControlNumber);
    var SaveMessageVerification="Payment has been queued and requires supervisory approval because: The amount of this payment exceeds the user's limit and requires managerial approval.";
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(SaveMessageVerification,true,"Payment has been queued");
    //===================================================================Payment Creation Completed Here==============================================================================================

   //===================================================================Verify-->Void Checkbox,Transaction History Screen,When Check Status is Queued Payment Started Here==============================================================================================
    await Verify_Utility.AssureClaims_CheckedUncheckedStateVerification_Utility(Payment_POM.AssureClaims_QueuedPayment_Checkbox_Void,'Checked',"Void Checkbox is already checked");
    await Verify_Utility.AssureClaims_EnbDisbStateVerify_Utility(Payment_POM.AssureClaims_Payment_Lst_BankAccount,'Disable',"Bank Account is disabled");
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_TransactionDetail,"Transaction Detail Tab On Payment Creation Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_QueuedPayment_Btn_Edit,"Transaction split edit button");
    await Verify_Utility.AssureClaims_EnbDisbStateVerify_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Txt_Amount,'Disable',"Bank Account is disabled");
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_QueuedPayment_Btn_Close,"Close")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_QueuedPayment_Btn_TransactionHistory,"Transaction history")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_TransactionHistory_ClaimGCIframe);
    await t.wait(3000)
    const ColHeader1=["Status"]
    const ColValue1=["Queued Payment"]
    await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_Payment_Txt_CntrlNumber,StrControlNumber,"Control Number 1")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_FilterSerach,"Search button")
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Queued Payment","Transaction History Screen",ColHeader1,ColValue1)
    await t.switchToMainWindow()
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload,"Reload Button On Top Of The Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_QueuedPayment_Btn_done.withText("done"), "Done with ok")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    //===================================================================Verify-->Void Checkbox,Transaction History Screen,When Check Status is Queued Payment Cpmpleted Here==============================================================================================

    //===================================================================Verify-->Void Checkbox,Transaction History Screen,When Check Status is Released Payment Started Here==============================================================================================
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_QueuedPayment_statusLookup,"Check Status");
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_QueuedPayment_SelectStatus.withText('Released'),"Check Status as Released Payment");
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Payment Creation Screen");
    await t.wait(8000)
    await Verify_Utility.AssureClaims_CheckedUncheckedStateVerification_Utility(Payment_POM.AssureClaims_QueuedPayment_Checkbox_Void,'Unchecked',"Void Checkbox is Unchecked");
    await Verify_Utility.AssureClaims_EnbDisbStateVerify_Utility(Payment_POM.AssureClaims_Payment_Lst_BankAccount,'Enable',"Bank Account is Enabled");
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_TransactionDetail,"Transaction Detail Tab On Payment Creation Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_QueuedPayment_Btn_Edit,"Transaction split edit button");
    await Verify_Utility.AssureClaims_EnbDisbStateVerify_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Txt_Amount,'Enable',"Bank Account is Enabled");
    //===================================================================Verify-->Void Checkbox,Transaction History Screen,When Check Status is Released Payment Completed Here==============================================================================================

    await Function_Utility.AssureClaims_LogoutFromApplication_Utility();
    console.log("Logout from Application!!")
    //Logout from Application
});


test('QueuedPayment_Test_02', async t => {
        
            
    await t.wait(10000)
    console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Security')
    await t.wait(10000)
    console.log("Login Into Application!!".green)

    //===================================================================User Creation Started Here==============================================================================================
    await Function_Utility.AssureClaims_SMSSuperUserAddEditDelete_Utility("Add",SrLastName,SrFirstName,"NA","NA",data.DSN,data.ModuleName)
    await Function_Utility.AssureClaims_SMSSuperUserAddEditDelete_Utility("Add",UserLastName,UserFirstName,SrFirstName+" "+SrLastName,"NA",data.DSN,data.ModuleName)   
    //===================================================================User Creation Completed Here==============================================================================================

    //===================================================================Security->User Privilege Setup -->Setting Limit Started Here==============================================================================================
    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Security:User Privileges Setup")
    await t.wait(10000)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_UserPrivilegesIframe)
    await t.wait(5000);
    await Nav_Utility.AssureClaims_ElementClick_Utility(UserPrevSetUp_POM.AssureClaims_UserPrev_Lst_LOB,"Policy LOB")
    await Nav_Utility.AssureClaims_ElementClick_Utility(UserPrevSetUp_POM.AssureClaims_UserPrev_Lst_LOB.find('option').withText('GC - General Claims'),"Select LOB")
    await Nav_Utility.AssureClaims_ElementClick_Utility(UserPrevSetUp_POM.AssureClaims_UserPrev_Lst_LimitType,"LimitType")
    await Nav_Utility.AssureClaims_ElementClick_Utility(UserPrevSetUp_POM.AssureClaims_UserPrev_Lst_LimitType.find('option').withText('Payment Limits'),"Select Limit Type")
    await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Chk_EnbPayLmt,"Check","Checked Enable Payment Limits")
    await In_Utility.AssureClaims_SetValue_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Txt_User,UserFirstName,"User TextBox")
    await t.pressKey('tab');
    await t.wait(1000)
    await In_Utility.AssureClaims_SetValue_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Txt_MaxAmount,"100","Max Amount TextBox")
    await t.wait(1000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(UserPrevSetUp_POM.AssureClaims_UserPrevLimit_Btn_Add,"Add Button");
    //===================================================================Security->User Privilege Setup -->Setting Limit Completed Here==============================================================================================

    //===================================================================Utility Setting for Queued Payment Started here==============================================================================================
    await Generic_Utility.AssureClaims_Generic_ZoneSwitching("Utilities");
    await t.wait(15000)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_UtilitiesIframe);
    await t.wait(2000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(PayParaSetUp_POM.AssureClaims_Lnk_PaymentParameterSetUp.withText('Payment Parameter Setup'),"Payment Parameter Setup")
    await t.wait(4000);
    await t.switchToMainWindow();
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PaymentParameterSetupIframe)
    await t.wait(4000);
    await Nav_Utility.AssureClaims_ElementClick_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Tab_SupervisorApproval,"tab Supervisor Approval Configuration")
    await t.wait(1000)
    await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_PayLimitExceed,"Check","Payment Limits Are Exceeded")
    await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_QueuedPayment,"Check","Queue Payments Instead Of Placing On Hold:")
    await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(PayParaSetUp_POM.AssureClaims_PmntSetUpSprVsr_Chk_SupervisoryApproval,"Check","Supervisory Approval")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"save button")
    await t.wait(2000)
    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_ElementClick_Utility(GenSysPara_POM.AssureClaimsApp_GenSysParaSetup_Btn_BackToUtility,"Back to Utility Screen")
    await t.switchToMainWindow();
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_UtilitiesIframe);
    await t.wait(2000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(GenSysPara_POM.AssureClaimsApp_Lnk_GenSysParaSetup.withText('General System Parameter Setup'),"General System ParameterSetup Link")
    await t.wait(5000)
    await t.switchToMainWindow();
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GeneralSystemParameterSetupIframe);
    await t.wait(5000)
    await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(GenSysPara_POM.AssureClaimsApp_GenSysParaSetup_Chk_UseEntityPaymentApproval,'Check',"Use Entity Payment Approval Check Box")    
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Click on save button") 
    //===================================================================Utility Setting for Queued Payment Completed here==============================================================================================

    await Function_Utility.AssureClaims_LogoutFromApplication_Utility();
    console.log("Logout from Application!!")
    //Logout from Application

});


test('QueuedPayment_Test_03', async t => {
        
    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(UserFirstName,'abkabk1',data.DSN,'Maintenance')
    console.log(`Login Into Application with ${UserFirstName}`)
    //Login Into Application with User

    //===================================================================Entity Creation from Maintenance Started here==============================================================================================
    console.log("AssureClaims_MaintenanceAddNewEntity_Utility Function is Called To Create Entity".yellow);
    var EntityName = await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Utility("Entity", data.EntityType, "SSN","");
    console.log("New Entity is Created with Last Name: ".green+EntityName);
    //New Entity Is Created
    //===================================================================Entity Creation from Maintenance Completed here==============================================================================================

    
    await t.wait(10000)
    await Generic_Utility.AssureClaims_Generic_ZoneSwitching("Claims");
    await t.setNativeDialogHandler(() => true);
    await t.eval(() => location.reload(true));
    await t.wait(30000);
    //Zone Switched to Claim

    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await t.switchToMainWindow();
    await t.wait(3000)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Btn_MiniFinancialGraph,"Minimize Financial graph")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Chk_FirstRowSelection,"Select First Row")
    var StrControlNumber1= await Function_Utility.AssureClaims_PaymentCorpAddition_Utility(data.BankAccount,data.PayeeType,EntityName,data.TransactionType,data.PaymentAmount)
    console.log("New Payment is Created "+StrControlNumber1);
    var SaveMessageVerification1=`Payment has been queued and requires supervisory approval because: The payee ${EntityName} of this payment has not been approved and requires managerial approval.`;
    console.log(SaveMessageVerification1);
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(SaveMessageVerification1,true,"Payment has been queued")

    //===================================================================Verifiation on Transaction History Screen, Status as Queued Payment Started Here=============================================================================================
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_QueuedPayment_Btn_TransactionHistory,"Transaction history")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_TransactionHistory_ClaimGCIframe);
    await t.wait(3000)
    const ColHeader2=["Status"]
    const ColValue2=["Queued Payment"]
    await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_Payment_Txt_CntrlNumber,StrControlNumber1,"Control Number 1")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_FilterSerach,"Search button")
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Queued Payment","Transaction History Screen",ColHeader2,ColValue2)
    //===================================================================Verifiation on Transaction History Screen, Status as Queued Payment Completed Here=============================================================================================

    await Function_Utility.AssureClaims_LogoutFromApplication_Utility();
    console.log("Logout from Application!!")
    //Logout from Application

});


test('QueuedPayment_Test_04', async t => {
        
    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(UserFirstName,'abkabk1',data.DSN,'Claims')
    console.log(`Login Into Application with ${UserFirstName}`)
    //Login Into Application with User

    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await t.switchToMainWindow();
    await t.wait(3000)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);

    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Btn_MiniFinancialGraph,"Minimize Financial graph")
    
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Chk_FirstRowSelection,"Select First Row")
     var StrControlNumber2= await Function_Utility.AssureClaims_PaymentCorpAddition_Utility(data.BankAccount,data.PayeeType,data.LastName,data.TransactionType,data.QueuedPayment)
    console.log("New Payment is Created "+StrControlNumber2);

    
    var SaveMessageVerification2=`Payment has been queued and requires supervisory approval because: The amount of this payment exceeds the user's limit and requires managerial approval.`;
    console.log(SaveMessageVerification2);
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(SaveMessageVerification2,true,"Payment has been queued")

    var ActualStatus =await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_CheckStatus,"value");
    var ExpectedStatus="Q Queued Payment";
    if(ActualStatus===ExpectedStatus)
    console.log("Check Status is Q Queued Payment hence Verification is successful");
    else
    console.log("verification can not be done");

    //===================================================================Verifiation on Transaction History Screen, Status as Queued Payment Started Here=============================================================================================
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_QueuedPayment_Btn_TransactionHistory,"Transaction history")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_TransactionHistory_ClaimGCIframe);
    await t.wait(3000)
    const ColHeader3=["Status"]
    const ColValue3=["Queued Payment"]
    await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_Payment_Txt_CntrlNumber,StrControlNumber2,"Control Number 2")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_FilterSerach,"Search button")
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Queued Payment","Transaction History Screen",ColHeader3,ColValue3)
    //===================================================================Verifiation on Transaction History Screen, Status as Queued Payment Completed Here=============================================================================================

    //===================================================================Verifiation on  Screen,My Pending Transactions Exceeded Payment Limit Started Here=============================================================================================
    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("My Work:My Pending Transactions")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PendingTransIframe)
    await Nav_Utility.AssureClaims_ElementClick_Utility(SupervisoryApproval_POM.AssureClaims_SupervisoryApproval_Tab_Payment,"Payment Tab")
    await In_Utility.AssureClaims_SetValue_Utility(Reserve_Utility.AssureClaims_ReserveCreation_Txt_SearchCntrlNo,StrControlNumber2,"Enter Control Number")
    const ColHeader4=["Hold Reason"]
    const ColValue4=["Exceeded Payment Limit"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Exceeded Payment Limit","Pending Transaction Grid",ColHeader4,ColValue4)
    //Verification of 1st record on my pending transaction screen
    //===================================================================Verifiation on  Screen,My Pending Transactions Exceeded Payment Limit Completed Here=============================================================================================


});

});
    

