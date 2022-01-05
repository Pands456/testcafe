import { Selector, Role } from 'testcafe';
import Input_Utility from '../Functional_Utilities/Input_Utility'
import Verification_Utility from '../Functional_Utilities/Verification_Utility'
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility'
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';

import POM_FinancialReserves from '../Functional_POM/POM_FinancialReserves';
import POM_Search from '../Functional_POM/POM_Search';
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';
import POM_Life_Claims from '../Functional_POM/POM_Life_Claims';
const Search_POM = new POM_Search();
const In_Utility = new Input_Utility();
const Nav_Utility = new Navigation_Utility();
const Verify_Utility = new Verification_Utility();
const Generic_Utility = new GenericUsages_Utility();
const Verification_Msg = new POM_VerificationMessage();
const Payment_POM = new POM_PaymentsCollections();
const Function_Utility = new Functionality_Utility();
const Reserve_Utility = new POM_FinancialReserves();
const Life_Claims = new POM_Life_Claims();

const DataIUT = require('../DataFiles/DataIUT.json');

//Global Variables
var StrClaimNumber;
var StrControlNumber;
var StrClaimNumber2;
var StrControlNumber2;
var StrLifeClaimNumber;
DataIUT.forEach(data => {
    const LoggedInUser = Role(data.URL, async t => {
      await t.maximizeWindow()
      console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
      await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username, data.Password, data.DSN, 'Claims')
      await t.wait(5000)
      console.log("Login Into Application!!".green)
    }, { preserveUrl: true }
    );
  
fixture`Funds_OrphanTransaction_Smoke`.beforeEach(async t => {
        await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
});
    
test('AssureClaims_CorpGC_Test_01', async t => {
     //-------------------------------General Claim Creation----------------------------------------------------
     console.log("AssureClaims_GeneralClaimCreation Function is Called To Create GeneralClaim".yellow);
     var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
     StrClaimNumber = await Function_Utility.AssureClaims_GeneralClaimCreation(d,d,data.ClaimStatus,data.GCClaimType,data.Department,data.GCPolicyLOB);
     console.log("New ClaimNumber is Created with ID: ".green+StrClaimNumber);
     //New GeneralClaim Is Created
});

test('AssureClaims_FundTransaction_Test_02', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    //---------------------------Funds Orphan Transaction Creation ------------------------------------
    console.log("AssureClaims_Funds_Transaction_Creation Function is Called To Create Reserve ".yellow);
    await t.switchToMainWindow();
    StrControlNumber =  await Function_Utility.AssureClaims_Funds_Transaction_Creation("NA","NA","NA",StrClaimNumber,'NA',data.BankAccount,data.PayeeType,data.LastName,data.ReserveType,data.TransactionType,data.ReserveAmount)
    console.log("Funds Transaction is Created");
    //New Transaction Is Created from Funds-Transaction which has a claim number
});

test('AssureClaims_FundTransactionVerification_Test_03', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve,"Click on Financial Reserve Button")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Reserve_History, "Reserve History")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_TransactionHistory_ClaimGCIframe);
    const header1 = ["Control #"]
    const val1 = [StrControlNumber]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrControlNumber,'Transaction grid view',header1,val1);
    
});

test('AssureClaims_FundTransactionVerification_Test_03', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve,"Click on Financial Reserve Button")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Reserve_Detailed_History, "Reserve History")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_TransactionHistory_ClaimGCIframe);
    const header1 = ["Control #"]
    const val1 = [StrControlNumber]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrControlNumber,'Transaction grid view',header1,val1);
    
});


test('AssureClaims_CarrierGC_Test_04', async t => {
    var date = new Date();
    var d = (date.getMonth()+1)+'/'+(date.getDate())+'/'+date.getFullYear();
    console.log("AssureClaims_CarrierGCClaimCreation Function is Called To Create Carrier Claim".yellow); 
    StrClaimNumber2=await Function_Utility.AssureClaims_CarrierGCClaimCreation(d,d,data.GCCarrierClaimType,data.ClaimStatus,data.Department,data.GCCarrierPolicyLOB,data.PolicySystem,data.PolicyName)
    console.log("New Carrier General Claim is Created with Claim Number: ".green+StrClaimNumber2);
});

test('AssureClaim_CarrierFundTransaction_Test_05', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber2);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    console.log("AssureClaims_CarrierReserveAddition_Utility Function is Called To Create Carrier Reserve".yellow); 
    await Function_Utility.AssureClaims_CarrierReserveAddition_Utility(data.ReserveAmount,data.PolicyLossCode,data.PolicyUnit,data.PolicyCoverage,data.ReserveStatus,data.ReserveType)
    console.log("New Carrier Reserve is Created".green);
    await  t.wait(3000);
    await t.switchToMainWindow();
    await t.wait(1000);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.dvbreadcrumbscroll,"Back Button");
    await t.wait(1000);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    await t.wait(1000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Check Button")
    console.log("AssureClaims_CarrierPaymentAddition_Utility Function is Called To Create Carrier Payment".yellow); 
    await Function_Utility.AssureClaims_CarrierPaymentAddition_Utility(data.BankAccount,data.PayeeTypeClaimant,data.TransactionType,data.Amount,data.PolicyUnit,data.PolicyCoverage,data.PolicyLossCode)
    console.log("New Carrier Payment is Created".green);
    console.log("AssureClaims_Funds_Transaction_Creation Function is Called To Create Reserve ".yellow);
    await t.switchToMainWindow();
    StrControlNumber2=  await Function_Utility.AssureClaims_Funds_Transaction_Creation("NA","NA","NA",StrClaimNumber2,'Khan 2, Soha Khan',data.BankAccount,data.PayeeType,data.LastName,data.ReserveType,data.TransactionType,data.ReserveAmount)
    console.log("Funds Transaction is Created");
    console.log(StrControlNumber2)

});

test('AssureClaim_CarrierFundTransactionVerification_Test_06', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber2);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
    await t.wait(4000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Reserve_History, "Reserve History")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_TransactionHistory_ClaimGCIframe);
    const header1 = ["Control #"]
    const val1 = [StrControlNumber2]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrControlNumber2,'Transaction grid view',header1,val1);
});

test('AssureClaim_CarrierFundTransactionVerification_Test_07_New', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber2);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
    await t.wait(4000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Reserve_Detailed_History, "Reserve History")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_TransactionHistory_ClaimGCIframe);
    const header1 = ["Control #"]
    const val1 = [StrControlNumber2]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrControlNumber2,'Transaction grid view',header1,val1);
});

test('AssureClaims_LCCreation_Test_08', async t => {
    var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    //======LifeClaim Creation Started Here=====================
    console.log("AssureClaims_LifeClaimCreation Function is Called To Create Claim".yellow);
    StrLifeClaimNumber = await Function_Utility.AssureClaims_LifeClaimCreation(d, d, data.ClaimStatus, data.LCClaimType, data.Department, data.LCPolicyLOB , data.LCMannerOfDeath ,data.LCCauseOfDeath , data.EstateProbated , data.DeceasedMaritalStatus , data.SpouseLiving ,data.PolicySystem,data.LifePolicyName)
    console.log("New Life Claim is Created with Claim Number: ".green + StrLifeClaimNumber);
    //======LifeClaim Creation Completed Here=====================
        
  });

test('AssureClaim_AddLifeClaimToastVerification_Test_09', async t => {
    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Funds:Transaction");
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_FundsTransactionIframe);
    await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_ClaimNumber_Lookup,StrLifeClaimNumber,"Claim number look up field")
    await t.wait(3000)
    await t.pressKey('tab')
    const errormsg = Selector('[class="toast toast-error"]');
    await t.expect(errormsg.exists).ok();
    await Verify_Utility.AssureClaims_VerifyUXErrorMessage_Utility(Verification_Msg.AssureClaims_TransactionLifeClaim_ValidationMessage, true, "Life Claim Number entered in Claim Number field")	
	// Validation when Life Claim is entered while creating payment from FUNDS - Transaction
});


});
        
    
