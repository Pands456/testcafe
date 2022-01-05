import { Role } from 'testcafe';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import Verification_Utility from '../Functional_Utilities/Verification_Utility';
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import Maintenance_Functionality_Utility from '../Functional_Utilities/Maintenance_Functionality_Utility';
import Input_Utility from '../Functional_Utilities/Input_Utility';
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';
import POM_Search from '../Functional_POM/POM_Search';
import POM_FinancialReserves from '../Functional_POM/POM_FinancialReserves';
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import POM_GeneralSystemParameter from '../Functional_POM/POM_GeneralSystemParameter';
import POM_CommentSummary from '../Functional_POM/POM_CommentSummary';
import POM_WorkersComp_Claims from '../Functional_POM/POM_WorkersComp_Claims';
import POM_Home from '../Functional_POM/POM_Home';

const DataIUT = require('../DataFiles/DataIUT.json');
const Verify_Utility = new Verification_Utility();
const Function_Utility = new Functionality_Utility();
const Nav_Utility = new Navigation_Utility();
const Generic_Utility = new GenericUsages_Utility();
const Maint_Utility = new Maintenance_Functionality_Utility();
const In_Utility = new Input_Utility();
const Reserve_Utility = new POM_FinancialReserves();
const Payment_POM = new POM_PaymentsCollections();
const Search_POM = new POM_Search();
const Verification_Msg = new POM_VerificationMessage();
const GenSysPara_POM=new POM_GeneralSystemParameter();
const Claim_Comment_Summary=new POM_CommentSummary();
const WorkersComp_Claims=new POM_WorkersComp_Claims();
const Home_POM=new POM_Home();

//Global Variable Declaration
var StrWCClaimNumber;
var CaseMgnt;

DataIUT.forEach(data => {
const LoggedInUser = Role(data.URL , async t => {
    await t.wait(3000)
    await t.maximizeWindow()
    console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
    await t.wait(5000)
    console.log("Login Into Application!!".green)
},{ preserveUrl: true }
);

fixture `WorkerCompensationClaim_Exhaustive_Smoke`.beforeEach(async t => {
    await t.wait(3000)
  await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
});



test('AssureClaims_UtilitySetting_Test_01', async t => {

    await t.wait(3000)
    await Generic_Utility.AssureClaims_Generic_ZoneSwitching("Utilities")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_UtilitiesIframe);
    await Nav_Utility.AssureClaims_ElementClick_Utility(GenSysPara_POM.AssureClaimsApp_Lnk_GenSysParaSetup.withText('General System Parameter Setup'),"General System ParameterSetup Link")
    await t.wait(5000)
    await t.switchToMainWindow();
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GeneralSystemParameterSetupIframe);
    await t.wait(5000)
    await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(GenSysPara_POM.AssureClaimsApp_GenSysParaSetup_Chk_ActivityLog,'Check',"Activity Check Box")    
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Click on save button")
});



test('AssureClaims_WorkerCompensationClaim_Test_02', async t => {

    await t.wait(3000)
    var d=await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    /*=========================================================== Worker Compensation Claim Creation Started Here========================================================================================================================================================================================================================================================================================================*/
    console.log("AssureClaims_WorkersCompClaimCreation Function is Called To Create Worker Compensation Claim".yellow); 
    StrWCClaimNumber = await Function_Utility.AssureClaims_WorkersCompClaimCreation(d,d,data.WCClaimStatus,data.WCClaimType,data.Department,data.WCPolicyLOB,data.WCJurisdiction)
    console.log("New Worker Compensation Claim is Created with Claim Number: ".green+StrWCClaimNumber);
    //Worker Compensation Claim Creation
    /*===========================================================Worker Compensation Claim Creation Completed Heree========================================================================================================================================================================================================================================================================================================*/
});

test('AssureClaims_CaseManagement_Test_03', async t => {

    await t.wait(3000)
    await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
    /*==========================================================Case Management Creation Started Here========================================================================================================================================================================================================================================================================================================*/
    console.log("AssureClaims_CaseManagementCreateEditDelete_Utility Function is Called To Create Case Management On Worker Compensation Claim".yellow); 
    var d=await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY"); 
    CaseMgnt = await Function_Utility.AssureClaims_CaseManagementCreateEditDelete_Utility("Injuries","Contusion",d,d);
    console.log("Case Management is Created with Type: ".green+CaseMgnt);
    //Case Managemnet On Worker Compensation Claim Creation
    /*===========================================================Case Management Creation Completed Here========================================================================================================================================================================================================================================================================================================*/
});

test('AssureClaims_PersonInvolved_Test_04', async t => {

    await t.wait(5000)
    await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
    /*==========================================================Adding Med Staff As PI On Created WC Claim Started Here========================================================================================================================================================================================================================================================================================================*/
    console.log("AssureClaims_PersonInvolvedAddNewEntity_Utility Function is Called To Create  Med Staff As PI On Created WC Claim".yellow); 
    await Maint_Utility.AssureClaims_PersonInvolvedAddNewEntity_Utility("Medical Staff", "NA", "NA","NA");
    console.log("Med Sfaff is added as Person Involved on Created Claim ".green);
    //Med Staff as PI On Worker Compensation Claim
   /*==========================================================Adding Med Staff As PI On Created WC Claim Completed Here========================================================================================================================================================================================================================================================================================================*/
});

test('AssureClaims_ReserveCreation_Test_05', async t => {

    await t.wait(3000)
    await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
    /*===========================================================Reserve Creation On Worker Compensation Claim Started Here========================================================================================================================================================================================================================================================================================================*/
    await Function_Utility.AssureClaims_Reserve_Utility(data.ReserveType,data.Amount,data.ReserveStatus)
    //Reserve created
   /*===========================================================Reserve Creation On Worker Compensation Claim Completed Here========================================================================================================================================================================================================================================================================================================*/
       
});

test('AssureClaims_AddCollection_Test_06', async t => {

    await t.wait(3000)
    await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
    /*===========================================================Collection Creation On Worker Compensation Claim Started Here========================================================================================================================================================================================================================================================================================================*/

    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window")
    await Function_Utility.AssureClaims_CollectionCorpAddition_Utility(data.BankAccount,data.PayeeType,data.LastName,data.ReserveType,data.TransactionType,data.Amount)
   // Collection is Created
   /*===========================================================Collection Creation On Worker Compensation Claim Completed Here========================================================================================================================================================================================================================================================================================================*/
});

test('AssureClaims_AddPayment_Test_07', async t => {

    await t.wait(3000)
    await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
   /*===========================================================Payment Creation On Worker Compensation Claim Started Here========================================================================================================================================================================================================================================================================================================*/
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
    await Function_Utility.AssureClaims_PaymentCorpAddition_Utility(data.BankAccount,data.PayeeType,data.LastName,data.ReserveType,data.TransactionType,data.Amount)
    //Payment created
   /*===========================================================Payment Creation On Worker Compensation Claim Completed Here========================================================================================================================================================================================================================================================================================================*/
});


test('AssureClaims_SchduleCheck_Test_08', async t => {

    await t.wait(3000)
    await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
    /*===========================================================New Schedule Check Creation On Worker Compensation Claim Started Here========================================================================================================================================================================================================================================================================================================*/
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window") 
    await Function_Utility.AssureClaims_ScheduleCheck_Creation(data.NumberOfPayments,data.PayInterval,data.BankAccount,data.DistributionType,data.AutoCheckPayeeType,data.LastName,data.AutoCheckTransactionType,data.Amount)
    // Schedule Check is Created 
   /*===========================================================New Schedule Check Creation On Worker Compensation Claim Completed Here========================================================================================================================================================================================================================================================================================================*/
});


test('AssureClaims_ActivityLog_Test_09', async t => {

    await t.wait(3000)
    await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
     /*===========================================================Activity Log on Worker Compensation Claim started Here========================================================================================================================================================================================================================================================================================================*/
    await Nav_Utility.AssureClaims_ElementClick_Utility(Claim_Comment_Summary.AssureClaims_CommentSummary_Lst_CommentSummary, "Comment Summary Button On Claim Screen");
    await t.wait(2000);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Claim_Comment_Summary.AssureClaims_CommentSummary_ClaimActivityLog.withText('Claim Activity Log'),"Comment Summary Option From The List")
    await t.wait(2000);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.Assureclaims_Generic_CommentFrame);
    await In_Utility.AssureClaims_SetValue_Utility(WorkersComp_Claims.AssureClaims_WorkersComp_Claims_Txt_ClaimActivity,"Collection","Activity Text Box")
    const ColHeader1=["Activity"]
    const ColValue1=["Financial(Collection)"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Financial(Collection)","Claim Activity Log Grid",ColHeader1,ColValue1)
    await In_Utility.AssureClaims_SetValue_Utility(WorkersComp_Claims.AssureClaims_WorkersComp_Claims_Txt_ClaimActivity,"Payment","Activity Text Box")
    const ColHeader2=["Activity"]
    const ColValue2=["Financial(Payment)"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Financial(Payment)","Claim Activity Log Grid",ColHeader2,ColValue2)
    //Verification of Payment and Schdule check on Activity Log Screen
});

test('AssureClaims_QuickSummary_Test_10', async t => {

    await t.wait(3000)
    await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
    await t.switchToMainWindow();
    /*===========================================================Quick Summary On Worker Compensation Claim Started Here========================================================================================================================================================================================================================================================================================================*/
    await Nav_Utility.AssureClaims_ElementClick_Utility(WorkersComp_Claims.AssureClaims_WorkersComp_Btn_QuickSummary,"Expand Button")
    await t.wait(4000)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_QuickSummaryIframe)
    await t.wait(4000)
    await Verify_Utility.AssureClaims_ElementExist_Utility(WorkersComp_Claims.AssureClaims_WorkersComp_Txt_VerifyDetail.withText(StrWCClaimNumber),"Claim Number")
    await Verify_Utility.AssureClaims_ElementExist_Utility(WorkersComp_Claims.AssureClaims_WorkersComp_Txt_VerifyDetail.withText(data.WCClaimStatus),"Claim Status")
    //Verification of Claim Status and Claim Number
});


test('AssureClaims_LogOut_Test_11', async t => {

    await t.wait(3000)
    await Function_Utility.AssureClaims_LogoutFromApplication_Utility();
    console.log("Logout from Application!!")
    //Logout from Application
});



});
