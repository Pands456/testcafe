import { Selector,Role } from 'testcafe';
import { createTestCafe } from 'testcafe';
import Colors from 'colors';

import Verification_Utility from '../Functional_Utilities/Verification_Utility';
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import Maintenance_Functionality_Utility from '../Functional_Utilities/Maintenance_Functionality_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import Input_Utility from '../Functional_Utilities/Input_Utility';

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

const DataIUT = require('../DataFiles/DataIUT.json');

const Function_Utility = new Functionality_Utility();
const Generic_Utility = new GenericUsages_Utility();
const Nav_Utility = new Navigation_Utility();
const In_Utility = new Input_Utility();
const Verify_Utility = new Verification_Utility();

const Verification_Msg = new POM_VerificationMessage();
const Payment_POM = new POM_PaymentsCollections();
const Reserve_Utility = new POM_FinancialReserves();
const Claimant_POM = new POM_Claimant();
const Search_POM = new POM_Search();

var faker = require('faker');

//global variables
var NoteText = 'CreateNote_'+faker.name.lastname;
var EditNoteText ='ditNote_'+faker.name.lastname;
var StrClaimNumber;

DataIUT.forEach(data => {
const LoggedInUser = Role(data.URL , async t => {
    await t.maximizeWindow()
    console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
    //Login into Claims zone
    await t.wait(5000)
    console.log("Login Into Application!!".green)
},{ preserveUrl: true }
);

fixture `CarrierGC_ExhaustiveSmoke`.beforeEach(async t => {
  await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
});

test('CarrierGCClaimCreation_Test_01', async t => {
     
        var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
        console.log("AssureClaims_CarrierGCClaimCreation Function is Called To Create Carrier Claim".yellow); 
        StrClaimNumber=await Function_Utility.AssureClaims_CarrierGCClaimCreation(d,d,data.GCCarrierClaimType1,data.ClaimStatus,data.Department,data.GCCarrierPolicyLOB,data.PolicySystem,data.PolicyName)
        console.log("New Carrier General Claim is Created with Claim Number: ".green+StrClaimNumber);
});

test('ClaimantCreateEditDelete_Test_02', async t => {
        //Search the created carrier claims
        await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
     
        //=====================================================Claimant Creation On Created Claim Started Here=====================================================
        console.log("AssureClaims_ClaimEventEntityAddition_Utility Function is Called To Create Claimant".yellow); 
        await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility("Claimant","Australia","Victoria","NA")
        console.log("Claimant is Created on Carrier Claims");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Claimant_POM.AssureClaims_Claimant_Tab_ClaimantAttorney,"Claimant Attorney Tab On Claimant Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Claimant_POM.AssureClaims_Claimant_Tab_Supplementals,"Supplementals Tab On Claimant Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Claimant_POM.AssureClaims_Claimant_Tab_ClaimantInfo, "Claimant Info Tab On Claimant Screen")
        //Verification That All Tabs Are Present For Claimant Screen
        console.log("AssureClaims_ClaimEventEntityEdit_Utility Function is Called To Edit The Created Claimant Tracking".yellow);
        var ClaimantLastName = await Function_Utility.AssureClaims_ClaimEventEntityEdit_Utility("Claimant","NA","NA","NA");
        console.log("Created Claimant is Edited with New Last Name: ".green+ClaimantLastName);
        //Created Claimant Entity Is Edited Here
        await Function_Utility.AssureClaims_GenericDelete_Utility("False", "Claimant Creation Screen", "", "");
        await Function_Utility.AssureClaims_GenericDelete_Utility("True", "Claimant Creation Screen", "", "");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "Claimant Creation Screen");
        //Created Claimant Entity Is Deleted Here
        //=======================================================Claimant Creation On Created Claim Completed Here ===========================================================   
});

test('CarrierReserveAddition_Test_03', async t => {
        //Search the created carrier claims
        await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
        await  t.wait(3000);
        await t.switchToMainWindow();
        await t.wait(1000);
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
        console.log("AssureClaims_CarrierReserveAddition_Utility Function is Called To Create Carrier Reserve".yellow); 
        await Function_Utility.AssureClaims_CarrierReserveAddition_Utility(data.AmountType,data.PolicyLossCode,data.PolicyUnit,data.PolicyCoverage,data.ReserveStatus,data.ReserveType)
        console.log("New Carrier Reserve is Created".green);
});

test('CarrierPaymentAddition_Test_04', async t => {
        //Search the created carrier claims
        await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Check Button")
        console.log("AssureClaims_CarrierPaymentAddition_Utility Function is Called To Create Carrier Payment".yellow); 
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_MakePayment,"Make Payment Button On Payment Creation Screen")
        await Function_Utility.AssureClaims_CarrierCollectionPaymentAddition_Utility(data.BankAccount,data.PayeeTypeClaimant,data.TransactionType,data.Amount,data.PolicyUnit,data.PolicyCoverage,data.PolicyLossCode)
        console.log("New Carrier Payment is Created".green);
});
test('CarrierScheduleCheck_Test_05', async t => {
        //Search the created carrier claims
        await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Check Button")
        console.log("AssureClaims_ScheduleCheck_Creation Function is Called To Create Carrier Payment".yellow); 
        await Function_Utility.AssureClaims_ScheduleCheck_Creation(data.NumberOfPayments,data.PayInterval,data.BankAccount,data.DistributionType,data.AutoCheckPayeeType,data.LastName,data.AutoCheckTransactionType,data.AmountType)
        console.log("New Carrier ScheduleCheck is Created".green);
});
test('CarrierCollectionAddition_Test_06', async t => {
        //Search the created carrier claims
        await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Check Button")
        console.log("AssureClaims_CarrierCollectionPaymentAddition_Utility Function is Called To Create Carrier Payment".yellow); 
        // Carrier Collection starts
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_AddCollection, "Add collection Button On Payment Creation Screen")
        await Function_Utility.AssureClaims_CarrierCollectionPaymentAddition_Utility(data.PayeeTypeClaimant,data.TransactionType,data.Amount,data.PolicyUnit,data.PolicyCoverage,data.PolicyLossCode)
        console.log("New Carrier Payment is Created".green);
});
test('CommentAddition_Test_07', async t => {
        //Search the created carrier claims
        await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
        //Comment created on carrierGC
        await Function_Utility.AssureClaims_CommentAddition_Utility()
        //Comment Verification on carrierGC
        await Function_Utility.AssureClaims_ClaimCommentSummary_Utility()
        await t.switchToMainWindow();
 });
test('EnhancedNotesCreateEditDelete_Test_08', async t => {
        //Search the created carrier claims
        await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
        //EnhancedNotes Created and edited
        await Function_Utility.AssureClaims_EnhancedNotesCreateEditDelete_Utility( "Create/Edit", NoteText, data.EnhNotesType, data.ExNoteType, EditNoteText );
        //EnhancedNotes Created and deleted
        await Function_Utility.AssureClaims_EnhancedNotesCreateEditDelete_Utility( "Delete", "NA", "NA", "NA" );
        await t.wait(8000);
        await t.switchToMainWindow();
});
test('GCFirstFinal_Test_09', async t => {
        var FinalAmount = faker.random.number({ 'min': 10,'max': 50  });
        //Search the created carrier claims
        await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve,"Click On Financial Reserve");
        console.log("AssureClaims_FirstFinalPaymentCorpAddition_Utility Function is Called To Create First & Final Payment".yellow);
        var StrControlNumber=  await Function_Utility.AssureClaims_FirstFinalPaymentCorpAddition_Utility(data.BankAccount,data.DetailedTrackingClaimant,data.PayeeTypeClaimant,data.PolicyName,data.PolicyUnit,data.PolicyCoverage,data.PolicyLossCode,data.ReserveType_FnF,data.TransType_FnF,FinalAmount.toString())
        console.log("First & Final Payment is Created with Control Number: ".green+StrControlNumber);
});

});



