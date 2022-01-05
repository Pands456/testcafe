import { Selector, Role } from 'testcafe';
import { createTestCafe } from 'testcafe';
import Colors from 'colors';

import Verification_Utility from '../Functional_Utilities/Verification_Utility';
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import Maintenance_Functionality_Utility from '../Functional_Utilities/Maintenance_Functionality_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import Input_Utility from '../Functional_Utilities/Input_Utility';
import POM_WorkLossRestriction from '../Functional_POM/POM_WorkLossRestriction';
import POM_Enhanced_Notes from '../Functional_POM/POM_Enhanced_Notes';
import POM_Employee from '../Functional_POM/POM_Employee'
import POM_Patient from '../Functional_POM/POM_Patient'
import POM_Driver from '../Functional_POM/POM_Driver'
import POM_Entity from '../Functional_POM/POM_Entity'
import POM_Home from '../Functional_POM/POM_Home';
import POM_FinancialReserves from '../Functional_POM/POM_FinancialReserves';
import POM_ClaimComment from '../Functional_POM/POM_ClaimComment';
import POM_CommentSummary from '../Functional_POM/POM_CommentSummary';
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import POM_MedicalStaff from '../Functional_POM/POM_MedicalStaff';
import POM_Claimant from '../Functional_POM/POM_Claimant';
import POM_Search from '../Functional_POM/POM_Search'
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';
import POM_AttachCreateDiary from "../Functional_POM/POM_AttachCreateDiary";

const DataIUT = require('../DataFiles/DataIUT.json');

const Function_Utility = new Functionality_Utility();
const Generic_Utility = new GenericUsages_Utility();
const Nav_Utility = new Navigation_Utility();
const In_Utility = new Input_Utility();
const Verify_Utility = new Verification_Utility();

const AttachCreateDiary_POM = new POM_AttachCreateDiary();
const WorkLoss_POM = new POM_WorkLossRestriction();
const Home_POM = new POM_Home();
const Verification_Msg = new POM_VerificationMessage();
const Payment_POM = new POM_PaymentsCollections();
const Reserve_Utility = new POM_FinancialReserves();
const Claimant_POM = new POM_Claimant();
const Search_POM = new POM_Search();

var faker = require('faker');

//global variables
var Worklossdate;
var RestrictedDate;
var NoOverLappingDate;
var NoOverLappingDate1;
var StrWCClaimNumber;
var StrControlNumberWorkloss;
var StrControlNumberRestriction;

DataIUT.forEach(data => {
    const LoggedInUser = Role(data.URL, async t => {
        await t.maximizeWindow()
        console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
        await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username, data.Password, data.DSN, 'Claims')
        //Login into Claims zone
        await t.wait(5000)
        console.log("Login Into Application!!".green)
    }, { preserveUrl: true }
    );

    fixture`WC_ExhaustiveSmoke`.beforeEach(async t => {
        await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
    });

    test('AssureClaims_WorkLoss/RestrictionFromTodate_TC_001', async t => {
        /*=========================================================== Worker Compensation Claim Creation Started Here========================================================================================================================================================================================================================================================================================================*/
        await t.wait(3000)
        var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
        console.log("AssureClaims_UpdateWorkersCompClaimCreation Function is Called To Create Worker Compensation Claim".yellow);
        StrWCClaimNumber = await Function_Utility.AssureClaims_UpdateWorkersCompClaimCreation(d, d, data.Department, data.WCClaimStatus, data.WCPolicyLOB,data.WCClaimType,data.EmployeeNo1,  data.WCJurisdiction)
        console.log("New Worker Compensation Claim is Created with Claim Number: ".green + StrWCClaimNumber);
        //Worker Compensation Claim Creation
        /*===========================================================Worker Compensation Claim Creation Completed Here========================================================================================================================================================================================================================================================================================================*/
        /*=========================================================== Worker Compensation reserve creation started =================================================================================================================================================================================================================================================================================================================== */
        await Function_Utility.AssureClaims_Reserve_Utility(data.ReserveType, data.Amount, data.ReserveStatus);
        /*=========================================================== Worker Compensation reserve creation end =================================================================================================================================================================================================================================================================================================================== */
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
        await t.wait(2000);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window")
        /*=========================================================== Worker Compensation Payment without insert From To Date functionality started ================================================================================================================================================================================================================================================================================== */

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_MakePayment, "Make Payment Button On Payment Creation Screen")
        await t.wait(2000)
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(Payment_POM.AssureClaims_Payment_Lst_BankAccount, data.BankAccount, "Bank Account On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType, "Payee Payor Type List On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType.find('option').withText(data.PayeeType), "Payee Payor Type Value On Payment Creation Screen")
        await t.wait(3000)
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_LastName, data.LastName, "Last Name Text Box On Payment Creation Screen")
        await t.wait(3000)
        await t.pressKey('tab')
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_TransactionDetail, "Transaction Detail Tab On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_AddNewFunds, "Add New Funds Button On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType, "Transaction Type List On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType.find('option').withText(data.WorkTransactionType), "Transaction Type Value On Funds Split Detail Screen")
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Txt_Amount, data.PaymentAmount, "Transaction Amount On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_FundsSplitDetails_Btn_Save, "Save Button On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_done.withText("done"), "Done with ok from date without inserted from-to date")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Payment Creation Screen");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Payment Creation Screen");
        /*=========================================================== Worker Compensation Payment without insert From To Date functionality end ================================================================================================================================================================================================================================================================================== */
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame);
        /*=========================================================== Verify workloss transaction after normal transaction without enter from To date start ================================================================================================================================================================================================================================================================================== */
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_MedicalInfo_Tab, "Medical tab open");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_WorkLoss, "Click on workloss btn");
        await Verify_Utility.AssureClaims_ElementExist_Utility(AttachCreateDiary_POM.AssureClaims_AttachCreate_Txt_NoRecordAvailable, "No Records Available.");
        /*=========================================================== Verify workloss transaction after normal transaction without enter from To date end ================================================================================================================================================================================================================================================================================== */
        // Work loss without enter from to date payment save scenario completed

        //Restriction without enter from to date payment save scenario Started
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload, "reload btn pressed");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
        //await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_FinancialReserveGridFrame);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window")
        /*=========================================================== Worker Compensation Payment without insert From To Date functionality started ================================================================================================================================================================================================================================================================================== */

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_MakePayment, "Make Payment Button On Payment Creation Screen")
        await t.wait(2000)
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(Payment_POM.AssureClaims_Payment_Lst_BankAccount, data.BankAccount, "Bank Account On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType, "Payee Payor Type List On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType.find('option').withText(data.PayeeType), "Payee Payor Type Value On Payment Creation Screen")
        await t.wait(3000)
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_LastName, data.LastName, "Last Name Text Box On Payment Creation Screen")
        await t.wait(3000)
        await t.pressKey('tab')
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_TransactionDetail, "Transaction Detail Tab On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_AddNewFunds, "Add New Funds Button On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType, "Transaction Type List On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType.find('option').withText(data.RestrictionTransType), "Transaction Type Value On Funds Split Detail Screen")
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Txt_Amount, data.PaymentAmount, "Transaction Amount On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_FundsSplitDetails_Btn_Save, "Save Button On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_done.withText("done"), "Done with ok from date without inserted from-to date")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Payment Creation Screen");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Payment Creation Screen");
        /*=========================================================== Worker Compensation Payment without insert From To Date functionality end ================================================================================================================================================================================================================================================================================== */
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame);
        /*=========================================================== Verify Restriction transaction after normal transaction without enter from To date start ================================================================================================================================================================================================================================================================================== */
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_MedicalInfo_Tab, "Medical tab open");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Restrictions, "Click on Restriction btn");
        await Verify_Utility.AssureClaims_ElementExist_Utility(AttachCreateDiary_POM.AssureClaims_AttachCreate_Txt_NoRecordAvailable, "No Records Available.");
        /*=========================================================== Verify Restriction transaction after normal transaction without enter from To date end ================================================================================================================================================================================================================================================================================== */
        // Restriction without enter from to date payment save scenario completed
    });

    test('AssureClaims_WorkLoss/RestrictionFromTodate_TC_002_Workloss', async t => {
        Worklossdate = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
        await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
        await t.wait(5000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
        // await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_FinancialReserveGridFrame);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window")
        /*=========================================================== Worker Compensation Payment with From & To Date Workloss started ================================================================================================================================================================================================================================================================================== */

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_MakePayment, "Make Payment Button On Payment Creation Screen")
        await t.wait(2000)
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(Payment_POM.AssureClaims_Payment_Lst_BankAccount, data.BankAccount, "Bank Account On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType, "Payee Payor Type List On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType.find('option').withText(data.PayeeType), "Payee Payor Type Value On Payment Creation Screen")
        await t.wait(3000)
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_LastName, data.LastName, "Last Name Text Box On Payment Creation Screen")
        await t.wait(3000)
        await t.pressKey('tab')
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_TransactionDetail, "Transaction Detail Tab On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_AddNewFunds, "Add New Funds Button On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType, "Transaction Type List On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType.find('option').withText(data.WorkTransactionType), "Transaction Type Value On Funds Split Detail Screen")
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Txt_Amount, data.PaymentAmount, "Transaction Amount On Funds Split Detail Screen")
        await t.pressKey('tab');
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_FromDate, Worklossdate, "insert From date");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_FundsSplitDetails_Btn_Save, "Save Button On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_done.withText("done"), "Done with ok from date")
        await Verify_Utility.AssureClaims_ElementExist_Utility(WorkLoss_POM.AssureClaims_FromToDate_Toast_verify.withText("Please enter To Date"), "Verify to date");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Close, "Close the toast");
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_ToDate, Worklossdate, "insert to date");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_FromDate, "From Date input box");
        await t.pressKey('ctrl+a delete')
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_FundsSplitDetails_Btn_Save, "Save Button On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_done.withText("done"), "Done with ok from date")
        await Verify_Utility.AssureClaims_ElementExist_Utility(WorkLoss_POM.AssureClaims_FromToDate_Toast_verify.withText("Please enter From Date"), "Verify from date");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Close, "Close the toast");
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_FromDate, Worklossdate, "insert From date");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_FundsSplitDetails_Btn_Save, "Save Button On Funds Split Detail Screen");
        //local variable for workloss date
        var NewDate = new Date(Worklossdate);
        NewDate.setDate(NewDate.getDate() - 1);
        var LastWorkDay = await Generic_Utility.AssureClaims_formatDatetoMMDDYYYY(NewDate);
        console.log("LastWorkDay:  ".green + LastWorkDay.toString());

        var ReturnWork = new Date(Worklossdate);
        ReturnWork.setDate(ReturnWork.getDate() + 1);
        var ReturnToWork = await Generic_Utility.AssureClaims_formatDatetoMMDDYYYY(ReturnWork);
        console.log("ReturnToWork: ".green + ReturnToWork.toString());
        // loacal variable for workloss date 
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Payment Creation Screen");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Payment Creation Screen");
        StrControlNumberWorkloss = await Verify_Utility.AssureClaims_AttributeFetch_Utility(WorkLoss_POM.AssureClaims_FromToDate_ControlNumber, "value");
        console.log("strcontrolnumberworkloss :" + StrControlNumberWorkloss);
        /*=========================================================== Worker Compensation Payment with From & To Date of Workloss end ================================================================================================================================================================================================================================================================================== */
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame);
        /*=========================================================== Verify Workloss transaction after enter from To date start ================================================================================================================================================================================================================================================================================== */
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_MedicalInfo_Tab, "Medical tab open");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_WorkLoss, "Click on Workloss btn");
        const ColHeader = ["Last Work Day", "Return To Work"]
        const ColValue = [LastWorkDay, ReturnToWork]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(LastWorkDay, "Work loss Grid", ColHeader, ColValue)
        /*=========================================================== Verify Workloss transaction after enter from To date end ================================================================================================================================================================================================================================================================================== */
        await t.switchToMainWindow()
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload, "Reload Button On Top Of The Screen")
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
        //From To date functionality for workloss end
    });


    test('AssureClaims_WorkLoss/RestrictionFromTodate_TC_002_Restriction', async t => {
        /*===========================================================From To date functionality for restriction start  ================================================================================================================================================================================================================================================================================== */
        RestrictedDate = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
        await t.switchToMainWindow();
        await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
        await t.wait(5000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
        //await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_FinancialReserveGridFrame);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window")
        /*=========================================================== Worker Compensation Payment with From & To Date restriction started ================================================================================================================================================================================================================================================================================== */

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_MakePayment, "Make Payment Button On Payment Creation Screen")
        await t.wait(2000)
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(Payment_POM.AssureClaims_Payment_Lst_BankAccount, data.BankAccount, "Bank Account On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType, "Payee Payor Type List On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType.find('option').withText(data.PayeeType), "Payee Payor Type Value On Payment Creation Screen")
        await t.wait(3000)
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_LastName, data.LastName, "Last Name Text Box On Payment Creation Screen")
        await t.wait(3000)
        await t.pressKey('tab')
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_TransactionDetail, "Transaction Detail Tab On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_AddNewFunds, "Add New Funds Button On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType, "Transaction Type List On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType.find('option').withText(data.RestrictionTransType), "Transaction Type Value On Funds Split Detail Screen")
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Txt_Amount, data.PaymentAmount, "Transaction Amount On Funds Split Detail Screen")
        await t.pressKey('tab');
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_ToDate, RestrictedDate, "insert To date");

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_FundsSplitDetails_Btn_Save, "Save Button On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_done.withText("done"), "Done with ok from date")
        await Verify_Utility.AssureClaims_ElementExist_Utility(WorkLoss_POM.AssureClaims_FromToDate_Toast_verify.withText("Please enter From Date"), "Verify from date");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Close, "Close the toast");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_ToDate, "To Date input box");
        await t.pressKey('ctrl+a delete');
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_FromDate, RestrictedDate, "insert from date");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_FundsSplitDetails_Btn_Save, "Save Button On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_done.withText("done"), "Done with ok from date")
        await Verify_Utility.AssureClaims_ElementExist_Utility(WorkLoss_POM.AssureClaims_FromToDate_Toast_verify.withText("Please enter To Date"), "Verify to date");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Close, "Close the toast");
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_ToDate, RestrictedDate, "insert To date");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_FundsSplitDetails_Btn_Save, "Save Button On Funds Split Detail Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Payment Creation Screen");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Payment Creation Screen");
        StrControlNumberRestriction = await Verify_Utility.AssureClaims_AttributeFetch_Utility(WorkLoss_POM.AssureClaims_FromToDate_ControlNumber, "value");
        console.log("strcontrolnumberRestriction:" + StrControlNumberRestriction);
        /*=========================================================== Worker Compensation Payment with From & To Date of restriction end ================================================================================================================================================================================================================================================================================== */
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame);
        /*=========================================================== Verify Restriction transaction after enter from To date start ================================================================================================================================================================================================================================================================================== */
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_MedicalInfo_Tab, "Medical tab open");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Restrictions, "Click on restriction btn");
        const ColHeader2 = ["First Day Restricted", "Last Day Restricted"]
        const ColValue2 = [RestrictedDate, RestrictedDate]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(RestrictedDate, "restriction Grid", ColHeader2, ColValue2)
        /*=========================================================== Verify Restriction transaction after enter from To date end ================================================================================================================================================================================================================================================================================== */
        await t.switchToMainWindow()
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload, "Reload Button On Top Of The Screen")
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
        //From To date functionality for restriction end
    });

    test('AssureClaims_WorkLoss/RestrictionFromTodate_TC_003_Workloss', async t => {
        var NewDate1 = new Date(Worklossdate);
        NewDate1.setDate(NewDate1.getDate() - 4);
        NoOverLappingDate = await Generic_Utility.AssureClaims_formatDatetoMMDDYYYY(NewDate1);
        console.log("NoOverLappingDate:  ".green + NoOverLappingDate.toString());


        await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
        await t.wait(5000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
        //await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_FinancialReserveGridFrame);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window")
        /*=========================================================== Worker Compensation Payment with From & To overlapping dates Workloss started ================================================================================================================================================================================================================================================================================== */

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_MakePayment, "Make Payment Button On Payment Creation Screen")
        await t.wait(2000)
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(Payment_POM.AssureClaims_Payment_Lst_BankAccount, data.BankAccount, "Bank Account On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType, "Payee Payor Type List On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType.find('option').withText(data.PayeeType), "Payee Payor Type Value On Payment Creation Screen")
        await t.wait(3000)
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_LastName, data.LastName, "Last Name Text Box On Payment Creation Screen")
        await t.wait(3000)
        await t.pressKey('tab')
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_TransactionDetail, "Transaction Detail Tab On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_AddNewFunds, "Add New Funds Button On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType, "Transaction Type List On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType.find('option').withText(data.WorkTransactionType), "Transaction Type Value On Funds Split Detail Screen")
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Txt_Amount, data.PaymentAmount, "Transaction Amount On Funds Split Detail Screen")
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_FromDate, Worklossdate, "insert from date");
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_ToDate, Worklossdate, "insert To date");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_FundsSplitDetails_Btn_Save, "Save Button On Funds Split Detail Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Payment Creation Screen");
        //Verify the toast msg for overlapping dates for workloss
        await Verify_Utility.AssureClaims_ElementExist_Utility(WorkLoss_POM.AssureClaims_FromToDate_Toast_verify.withText("A Work Loss record already exists with in this time frame."), "Verify overlapping workloss");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Close, "Close the toast");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Icon_Split, "Delete the exsistence split");
        /*=========================================================== Worker Compensation Payment with From & To overlapping dates Workloss ends ================================================================================================================================================================================================================================================================================== */
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_AddNewFunds, "Add New Funds Button On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType, "Transaction Type List On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType.find('option').withText(data.WorkTransactionType), "Transaction Type Value On Funds Split Detail Screen")
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Txt_Amount, data.PaymentAmount, "Transaction Amount On Funds Split Detail Screen")
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_FromDate, NoOverLappingDate, "insert from date");
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_ToDate, NoOverLappingDate, "insert To date");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_FundsSplitDetails_Btn_Save, "Save Button On Funds Split Detail Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Payment Creation Screen");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Payment Creation Screen");
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame);
        /*=========================================================== Verify New Workloss with New transaction after enter new from To date start ================================================================================================================================================================================================================================================================================== */
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_MedicalInfo_Tab, "Medical tab open");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_WorkLoss, "Click on workloss btn");

        //local varaible for new overlapping date
        var NewDate3 = new Date(NoOverLappingDate);
        NewDate3.setDate(NewDate3.getDate() - 1);
        var LastWorkDay1 = await Generic_Utility.AssureClaims_formatDatetoMMDDYYYY(NewDate3);
        console.log("LastWorkDay1:  ".green + LastWorkDay1.toString());

        var ReturnWork1 = new Date(NoOverLappingDate);
        ReturnWork1.setDate(ReturnWork1.getDate() + 1);
        var ReturnToWork1 = await Generic_Utility.AssureClaims_formatDatetoMMDDYYYY(ReturnWork1);
        console.log("ReturnToWork1: ".green + ReturnToWork1.toString());
        //local varaible for new overlapping date ends 

        const ColHeader4 = ["Last Work Day", "Return To Work"]
        const ColValue4 = [LastWorkDay1, ReturnToWork1]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(LastWorkDay1, "Work loss Grid", ColHeader4, ColValue4)


        /*=========================================================== Verify New Workloss with New transaction after enter new from To date end ================================================================================================================================================================================================================================================================================== */
        //Toast verification and new overlapping dates for work loss date is done
    });


    test('AssureClaims_WorkLoss/RestrictionFromTodate_TC_003_Restriction', async t => {

        var NewDate2 = new Date(RestrictedDate);
        NewDate2.setDate(NewDate2.getDate() - 12);
        NoOverLappingDate1 = await Generic_Utility.AssureClaims_formatDatetoMMDDYYYY(NewDate2);
        console.log("NoOverLappingDate1:  ".green + NoOverLappingDate1.toString());


        // overlapping for restriction start
        await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
        await t.wait(5000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window");

        /*=========================================================== Worker Compensation Payment with From & To overlapping dates restriction started ================================================================================================================================================================================================================================================================================== */

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_MakePayment, "Make Payment Button On Payment Creation Screen")
        await t.wait(2000)
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(Payment_POM.AssureClaims_Payment_Lst_BankAccount, data.BankAccount, "Bank Account On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType, "Payee Payor Type List On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType.find('option').withText(data.PayeeType), "Payee Payor Type Value On Payment Creation Screen")
        await t.wait(3000)
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_LastName, data.LastName, "Last Name Text Box On Payment Creation Screen")
        await t.wait(3000)
        await t.pressKey('tab')
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_TransactionDetail, "Transaction Detail Tab On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_AddNewFunds, "Add New Funds Button On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType, "Transaction Type List On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType.find('option').withText(data.RestrictionTransType), "Transaction Type Value On Funds Split Detail Screen")
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Txt_Amount, data.PaymentAmount, "Transaction Amount On Funds Split Detail Screen")
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_FromDate, RestrictedDate, "insert from date");
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_ToDate, RestrictedDate, "insert To date");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_FundsSplitDetails_Btn_Save, "Save Button On Funds Split Detail Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Payment Creation Screen");
        //verify the toast msg for overlapping restriction
        await Verify_Utility.AssureClaims_ElementExist_Utility(WorkLoss_POM.AssureClaims_FromToDate_Toast_verify.withText(`You have entered overlapping Restricted dates, a Restricted days record will not be created/updated for the transaction with amount ${data.PaymentAmount}`), "Verify overlapping restriction");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Close, "Close the toast");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Icon_Split, "Delete the exsistence split");
        /*=========================================================== Worker Compensation Payment with From & To overlapping dates restriction ends ================================================================================================================================================================================================================================================================================== */
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_AddNewFunds, "Add New Funds Button On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType, "Transaction Type List On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType.find('option').withText(data.RestrictionTransType), "Transaction Type Value On Funds Split Detail Screen")
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Txt_Amount, data.PaymentAmount, "Transaction Amount On Funds Split Detail Screen")
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_FromDate, NoOverLappingDate1, "insert from date");
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_ToDate, NoOverLappingDate1, "insert To date");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_FundsSplitDetails_Btn_Save, "Save Button On Funds Split Detail Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Payment Creation Screen");
        await Verify_Utility.AssureClaims_ElementExist_Utility(WorkLoss_POM.AssureClaims_FromToDate_Toast_verify.withText(`You have entered overlapping Restricted dates, a Restricted days record will not be created/updated for the transaction with amount ${data.PaymentAmount}`), "Verify overlapping restriction");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Close, "Close the toast");

    });


    test('AssureClaims_WorkLoss/RestrictionFromTodate_TC_004', async t => {
        await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
        await t.wait(5000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_ReserveCreation_Btn_Reserve_History, "Clicked on Transaction history");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Externalapp_frame)
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_ControlNumer, StrControlNumberRestriction, "Put restriction control number")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Search, "Search the control number")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Lnk_Transaction, "Click on transaction link");
        await t.wait(6000)
        await t.switchToMainWindow();
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame);
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_VoidFlag, "Check the void checkbox");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_done.withText("done"), "Done with ok")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Payment Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Close, "Close the toast");
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_done.withText("done"), "Done with ok")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame);
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_MedicalInfo_Tab, "Medical tab open");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Restrictions, "Click on restriction btn");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_DeleteIcon, "Delete the Workloss")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_done.withText("done"), "Done with ok")
        await t.switchToMainWindow();
        await t.wait(2000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload, "reload btn pressed");
        await t.wait(2000)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
        await t.wait(5000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_ReserveCreation_Btn_Reserve_History, "Clicked on Transaction history");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Externalapp_frame)
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_ControlNumer, StrControlNumberWorkloss, "Put workloss control number")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Search, "Search the control number")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Lnk_Transaction, "Click on transaction link");
        await t.wait(6000)
        await t.switchToMainWindow();
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame);
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_VoidFlag, "Check the void checkbox");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Payment Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_done.withText("done"), "Done with ok")

        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Close, "Close the toast");
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_done.withText("done"), "Done with ok")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame);
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_MedicalInfo_Tab, "Medical tab open");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_WorkLoss, "Click on workloss btn");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_DeleteIcon, "Delete the Workloss")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_done.withText("done"), "Done with ok")
    });

});
