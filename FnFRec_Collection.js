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
import POM_ClearCheack from '../Functional_POM/POM_ClearCheack';

const DataIUT = require('../DataFiles/DataAutoReg.json');

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
const ClearCheack_POM = new POM_ClearCheack();
const Claim_Comment_Summary = new POM_CommentSummary();

var faker = require('faker');

//global variables
var StrClaimNumber;
var StrControlNumber;
var StrCNo;

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

    test('CarrierGCClaimCreation_Test_01', async t => {
        var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
        console.log("AssureClaims_CarrierGCClaimCreation Function is Called To Create Carrier Claim".yellow);
        //======================================================GC claim started here with policy ===============================================================================================================================================================
        StrClaimNumber = await Function_Utility.AssureClaims_CarrierGCClaimCreation(d, d, data.GCCarrierClaimType1, data.ClaimStatus, data.GCCarrierPolicyLOB, data.Department, data.PolicySystem, data.PolicyNametest)
        console.log("New Carrier General Claim is Created with Claim Number: ".green + StrClaimNumber);
        //======================================================GC claim ends here ===============================================================================================================================================================
    });

    test('GCFirstFinal_Test_02', async t => {
        //Search the created carrier claims
        await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve");
        console.log("AssureClaims_FirstFinalPaymentCorpAddition_Utility Function is Called To Create First & Final Payment".yellow);

        //======================================================Collection started here ===============================================================================================================================================================
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_AddCollection, "Add collection Button On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_done.withText("done"), "Done with ok on first and final collection");
        await t.wait(2000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Lst_DetailedTrackingClaimant, "Detailed Tracking Claimant List On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Lst_DetailedTrackingClaimant.find('option').withText(data.DetailedTrackingClaimant), "Detail Tracking Claimant Value On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Lst_BankAccount, "Bank Account")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Lst_BankAccount.find('option').withText(data.BankAccount), "Select bank account")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType, "Payee Payor Type List On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType.find('option').withText(data.PayeeType), "Payee Payor Type On Payment Creation Screen")
        await t.wait(3000)
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_LastName, data.LastName, "Last Name Text Box On Payment Creation Screen")
        await t.wait(3000)
        await t.pressKey('tab')

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_TransactionDetail, "Transaction Detail Tab On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_AddNewFunds, "Add New Funds Button On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_FundPolicy, "Policy List On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_FundPolicy.find('option').withText(data.PolicyNametest), "Policy Value On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_FundUnit, "PaymentUnit")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_FundUnit.find('option').withText(data.PolicyUnit2), "Reserve Type")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_FundCoverageType, "Fund Coverage Type")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_FundCoverageType.find('option').withText(data.PolicyCoverage1), "Fund Coverage Type")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_FundLossType, "Fund Loss Type")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_FundLossType.find('option').withText(data.CarrierPolicyLOSS), "Fund Loss Type")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_ReserveType, "Reserve Type List On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_ReserveType.find('option').withText(data.CarrierReserve), "Reserve Type Value On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType, "Transaction Type List On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType.find('option').withText(data.CarrierTransType), "Transaction Type Value On Funds Split Detail Screen")
        //await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Txt_Amount, Amount, "Transaction Amount On Funds Split Detail Screen")
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Txt_Amount, data.AmountType1, "Transaction Amount On Funds Split Detail Screen")

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_FundsSplitDetails_Btn_Save, "Save Button On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_Transaction, "Transaction Tab On Payment Creation Screen")

        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Payment Creation Screen");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Payment Creation Screen");
        StrControlNumber = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_Payment_Txt_ControlNumber, "value");
        console.log("First & Final Payment is Created with Control Number: " + StrControlNumber);
        //======================================================Collection ends here ===============================================================================================================================================================
        //verification starts here
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
        const ColHeader = ["Status"]
        const ColValue = ["C - Closed"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("C - Closed", "Financial Grid", ColHeader, ColValue)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_ReserveCreation_Btn_Reserve_History, "Transaction History Button")
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_TransactionHistory_ClaimGCIframe)
        const ColHeader2 = ["IsFirstFinal"]
        const ColVal2 = ["Yes"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Yes", "Transaction History grid view", ColHeader2, ColVal2);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lnk_ControlNumber, "Select the link");
        await t.switchToMainWindow();
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
        await In_Utility.AssureClaims_SetValue_Utility(ClearCheack_POM.AssureClaims_PaymentScreen_Txt_CheckNumber, data.depositNumber, "place deposit number");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Payment Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_done.withText("done"), "Done with ok for deposit number");
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_ReserveCreation_Btn_Reserve_History, "Transaction History Button")
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_TransactionHistory_ClaimGCIframe)
        const ColHeader3 = ["Status"]
        const ColVal3 = ["Printed"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Printed", "Transaction History grid view", ColHeader3, ColVal3);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lnk_ControlNumber, "Select the link");
        await t.switchToMainWindow();
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(ClearCheack_POM.AssureClaims_Cleared_CheckBox, 'Check', "check cleared On transaction screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_DeleteCancel, "Cancel Button On Confirm Delete PopUp On ");
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(ClearCheack_POM.AssureClaims_Cleared_CheckBox, 'Check', "check cleared On transaction screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_done.withText("done"), "Done with ok for cleared");
        await t.wait(3000);
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_ReserveCreation_Btn_Reserve_History, "Transaction History Button")
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_TransactionHistory_ClaimGCIframe)
        var today = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
        const ColHeader4 = ["Cleared?"]
        const ColVal4 = [today]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(today, "Transaction History grid view", ColHeader4, ColVal4);
        await t.switchToMainWindow();
        //verification ends here

    });

    test('GCFirstFinal_Test_03', async t => {
        //Search the created carrier claims
        await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve");
        console.log("AssureClaims_FirstFinalPaymentCorpAddition_Utility Function is Called To Create Supplemental Payment".yellow);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window")
        //======================================================Collection started here ===============================================================================================================================================================
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_AddCollection, "Add collection Button On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Lst_BankAccount, "Bank Account")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Lst_BankAccount.find('option').withText(data.BankAccount), "Select bank account")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType, "Payee Payor Type List On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType.find('option').withText(data.PayeeType), "Payee Payor Type On Payment Creation Screen")
        await t.wait(3000)
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_LastName, data.LastName, "Last Name Text Box On Payment Creation Screen")
        await t.wait(3000)
        await t.pressKey('tab');
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_TransactionDetail, "Transaction Detail Tab On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_AddNewFunds, "Add New Funds Button On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType, "Transaction Type List On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType.find('option').withText(data.CarrierTransType), "Transaction Type Value On Funds Split Detail Screen")
        //await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Txt_Amount, Amount, "Transaction Amount On Funds Split Detail Screen")
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Txt_Amount, data.AmountType1, "Transaction Amount On Funds Split Detail Screen")

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_FundsSplitDetails_Btn_Save, "Save Button On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_Transaction, "Transaction Tab On Payment Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Payment Creation Screen");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Payment Creation Screen");
        StrCNo = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_Payment_Txt_ControlNumber, "value");
        console.log("StrCNo is :" + StrCNo);
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Payment_POM.AssureClaims_PaymentCollection_Chk_SupplementalTransaction, 'Check', "check Supplemental payment On transaction screen is checked and disabled");
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_ReserveCreation_Btn_Reserve_History, "Transaction History Button")
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_TransactionHistory_ClaimGCIframe);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lnk_ControlNumber, "Select the link");
        await t.switchToMainWindow();
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Payment_POM.AssureClaims_PaymentCollection_Chk_voidCheck, 'Check', "check void checkbox");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_done.withText("done"), "Done with ok on first and final collection");
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_ReserveCreation_Btn_Reserve_History, "Transaction History Button")
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_TransactionHistory_ClaimGCIframe);
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_Payment_Txt_CntrlNumber, StrCNo, "select the control number");
        var today = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
        const ColHeader5 = ["Void?"]
        const ColVal5 = [today]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(today, "Transaction History grid view", ColHeader5, ColVal5);

    });

});


