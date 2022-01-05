import { Selector, Role } from 'testcafe';
import { createTestCafe } from 'testcafe';
import Colors from 'colors';

import Verification_Utility from '../Functional_Utilities/Verification_Utility';
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import Input_Utility from '../Functional_Utilities/Input_Utility';
import POM_Home from '../Functional_POM/POM_Home';
import POM_FinancialReserves from '../Functional_POM/POM_FinancialReserves';
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';
import POM_WorkLossRestriction  from '../Functional_POM/POM_WorkLossRestriction';
import POM_CaseManagement from '../Functional_POM/POM_CaseManagement';
import POM_Search from '../Functional_POM/POM_Search'

//const DataIUT = require('../DataFiles/DataIUT.json');
// const DataIUT = require('../DataFiles/DataAutoReg.json');
const DataIUT = require('../DataFiles/DataSTG.json');


const Function_Utility = new Functionality_Utility();
const Generic_Utility = new GenericUsages_Utility();
const Nav_Utility = new Navigation_Utility();
const In_Utility = new Input_Utility();
const Verify_Utility = new Verification_Utility();
const Verification_Msg = new POM_VerificationMessage();
const Home_POM = new POM_Home();
const Payment_POM = new POM_PaymentsCollections();
const Reserve_Utility = new POM_FinancialReserves();
const WorkLoss_POM=new POM_WorkLossRestriction();
const CaseMgt_POM = new POM_CaseManagement();
const Search_POM = new POM_Search();

//global variables
var d;
var StrWCClaimNumber;
var StrControlNumber;
var StrControlNumber1;
var StrControlNumber2;
var StrControlNumber3;
var Restrictiondate;

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
    d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    console.log("AssureClaims_WorkersCompClaimCreation Function is Called To Create Worker Compensation Claim".yellow);
    StrWCClaimNumber = await Function_Utility.AssureClaims_UpdateWorkersCompClaimCreation(d, d,data.Department, data.WCClaimStatus, data.WCPolicyLOB1, data.WCClaimType1,data.EmployeeNo, data.WCJurisdiction)
    console.log("New Worker Compensation Claim is Created with Claim Number: ".green + StrWCClaimNumber);
    /*===========================================================Worker Compensation Claim Creation Completed Here========================================================================================================================================================================================================================================================================================================*/
   
    Restrictiondate=await Generic_Utility.AssureClaims_MinusOneDay_Utility(d);

    //*===========================================================Funds-->Transaction Creation with From & To Datee=====================================================================================================================================================================================================================================================================================================================*/
    StrControlNumber=await Function_Utility.AssureClaims_Funds_WorklossTransaction_Creation(StrWCClaimNumber,data.BankAccount,data.PayeeTypeClaimant,data.ReserveType2,data.RestrictionTransType1,data.Amount,'1',Restrictiondate,Restrictiondate)
    //New Transaction Is Created from Funds-Transaction which has a claim number
    //*===========================================================Funds--> Transaction Creation with From & To Date Completed Here=====================================================================================================================================================================================================================================================================================================================*/

    })

    test('AssureClaims_WorkLoss/RestrictionFromTodate_TC_002', async t => {

        await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
        await t.wait(10000)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame);
        /*=========================================================== Verify Restriction Record Gets Created  ================================================================================================================================================================================================================================================================================== */
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_MedicalInfo_Tab, "Medical tab open");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_EventScreen_Btn_Restriction,"Restriction on Event Screen")
        const ColHeader2=["First Day Restricted","Last Day Restricted"]
        const ColValue2=[Restrictiondate,Restrictiondate]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(Restrictiondate,"Restricted Days List",ColHeader2,ColValue2)
        /*=========================================================== Verify Restriction Record Gets Created  ================================================================================================================================================================================================================================================================================== */
    })

    
    test('AssureClaims_WorkLoss/RestrictionFromTodate_TC_003', async t => {

        /*===========================================================Funds->Transaction Creation with Same From & To Date --> To verify Duplicacy  ================================================================================================================================================================================================================================================================================== */
        StrControlNumber1=await Function_Utility.AssureClaims_Funds_WorklossTransaction_Creation(StrWCClaimNumber,data.BankAccount,data.PayeeTypeClaimant,data.ReserveType2,data.RestrictionTransType1,data.Amount,'NA',Restrictiondate,Restrictiondate)
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.DuplicateRestrictionMsg,true,"A Restriction record already exists with in this time frame.")
        /*=========================================================== Funds->Transaction Creation with Same From & To Date --> To verify Duplicacy  ================================================================================================================================================================================================================================================================================== */
    })

    test('AssureClaims_WorkLoss/RestrictionFromTodate_TC_004', async t => {


        /*=========================================================== Funds->Transaction Creation with  Different Same From & To Date --> To verify new Restriction record gets Created  ================================================================================================================================================================================================================================================================================== */
        StrControlNumber2=await Function_Utility.AssureClaims_Funds_WorklossTransaction_Creation(StrWCClaimNumber,data.BankAccount,data.PayeeTypeClaimant,data.ReserveType2,data.RestrictionTransType1,data.Amount,'NA',d,d)
        /*=========================================================== Funds->Transaction Creation with  Different Same From & To Date --> To verify new Restriction record gets Created  ================================================================================================================================================================================================================================================================================== */
    })

    test('AssureClaims_WorkLoss/RestrictionFromTodate_TC_005', async t => {

        await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
        await t.wait(10000)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame);
       /*=========================================================== Verify 2nd Restriction Record Gets Created  ================================================================================================================================================================================================================================================================================== */
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_MedicalInfo_Tab, "Medical tab open");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_EventScreen_Btn_Restriction,"Restriction on Event Screen")
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_Workloss_Txt_FirstDayRestrict,d,"Last Work Day");
        const ColHeader2=["First Day Restricted","Last Day Restricted"]
        const ColValue2=[d,d]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(d,"Restricted Days List",ColHeader2,ColValue2)
       /*=========================================================== Verify 2nd Restriction Record Gets Created  ================================================================================================================================================================================================================================================================================== */
    })

    test('AssureClaims_WorkLoss/RestrictionFromTodate_TC_006', async t => {

        /*=========================================================== Funds->Transaction Creation Without From & To Date ================================================================================================================================================================================================================================================================================== */
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Funds:Transaction")
        await t.wait(10000)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Funds_Transaction_ClaimGCIframe);
        await t.wait(10000)

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Funds_Btn_ClaimNumber, "Open Claim Number Lookup");
        await t.wait(10000)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_SubBankAccountIframe);
        await In_Utility.AssureClaims_SetValue_Utility(Search_POM.AssureClaims_Search_Txt_ClaimNumber,StrWCClaimNumber,"Claim Number")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Search_POM.AssureClaims_Search_Btn_SubmitQuery,"SubmitQuery")
        await t.wait(5000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Search_POM.AssureClaims_Search_Lnk_ClaimNumber.withText(StrWCClaimNumber),"ClaimNumber link")
        await t.wait(10000)
        await t.switchToMainWindow();
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Funds_Transaction_ClaimGCIframe);

        await In_Utility.AssureClaims_ElementWebListSelect_Utility(Payment_POM.AssureClaims_Payment_Lst_BankAccount,data.BankAccount,"Bank Account On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType, "Payee Payor Type List On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType.find('option').withText(data.PayeeTypeClaimant),"Payee Payor Type On Payment Creation Screen")
        await t.wait(3000)
    
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_TransactionDetail, "Transaction Detail Tab On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_AddNewFunds, "Add New Funds Button On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_ReserveType, "Reserve Type List On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_ReserveType.find('option').withText(data.ReserveType2), "Reserve Type Value On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType, "Transaction Type List On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType.find('option').withText(data.RestrictionTransType1), "Transaction Type Value On Funds Split Detail Screen")
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Txt_Amount, data.Amount, "Transaction Amount On Funds Split Detail Screen")
    
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_FundsSplitDetails_Btn_Save, "Save Button On Funds Split Detail Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_done.withText("done"), "Done with ok ")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_Transaction, "Transaction Tab On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Payment Creation Screen");
        await t.wait(8000);
        StrControlNumber3 =await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ControlNumber,"value");
        await t.wait(8000);
        console.log("StrControlNumber3 :"+StrControlNumber3)
        /*=========================================================== Funds->Transaction Creation Without From & To Date ================================================================================================================================================================================================================================================================================== */

    })


    
    test('AssureClaims_WorkLoss/RestrictionFromTodate_TC_007', async t => {

        await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
        await t.wait(10000)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame);
        /*=========================================================== Verify on Transaction History Record Gets Created ================================================================================================================================================================================================================================================================================== */
        await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Financial Reserve")
        await t.wait(5000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_ReserveCreation_Btn_Reserve_History,"Transaction History Button")
        await t.wait(10000);
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_TransactionHistory_ClaimGCIframe);
        await t.wait(10000);
        await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_Payment_Txt_CntrlNumber,StrControlNumber3,"Control Number 1")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_FilterSerach,"Search button")
        const ColHeader3=["Type"]
        const ColValue3=["Payment"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("Payment","Transaction History",ColHeader3,ColValue3)
         /*=========================================================== Verify on Transaction History Record Gets Created ================================================================================================================================================================================================================================================================================== */
    })

    test('AssureClaims_WorkLoss/RestrictionFromTodate_TC_008', async t => {

        await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
        await t.wait(10000)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame);
        /*=========================================================== Verify Restriction Record is not Created  ================================================================================================================================================================================================================================================================================== */
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_MedicalInfo_Tab, "Medical tab open");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_EventScreen_Btn_Restriction,"Restriction on Event Screen")
        await Verify_Utility.AssureClaims_ElementExist_Utility(WorkLoss_POM.AssureClaims_CaseMgmt_VerifyText.withText('Total Items: 2'),"Only 2 record Exist")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_CaseMgmt_Btn_Close,"Close Button")

        /*=========================================================== Verify Restriction Record is not Created  ================================================================================================================================================================================================================================================================================== */
    })

});

