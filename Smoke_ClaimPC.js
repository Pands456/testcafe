import { Selector,Role } from 'testcafe';
//import {Selector,t} from 'testcafe';
import { createTestCafe } from 'testcafe';
import Colors from 'colors'
import POM_Login from '../Functional_POM/POM_Login';
import POM_Home from '../Functional_POM/POM_Home';
import POM_Generic_Claims from '../Functional_POM/POM_Generic_Claims';
import POM_FinancialReserves from '../Functional_POM/POM_FinancialReserves';
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';
import Input_Utility from '../Functional_Utilities/Input_Utility'
import Verification_Utility from '../Functional_Utilities/Verification_Utility'
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility'
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import Maintenance_Functionality_Utility from '../Functional_Utilities/Maintenance_Functionality_Utility';
import POM_unit from '../Functional_POM/POM_unit';
import POM_Claimant from '../Functional_POM/POM_Claimant';
import POM_Subrogation from '../Functional_POM/POM_Subrogation';
import POM_MedicalStaff from '../Functional_POM/POM_MedicalStaff'
const Claimant_POM = new POM_Claimant();
const Medstaff_POM = new POM_MedicalStaff();
const Subrogation_POM = new POM_Subrogation();
const Maint_Utility = new Maintenance_Functionality_Utility();
const DataIUT = require('../DataFiles/DataIUT.json');
const POM_LoginPOM = new POM_Login();
const unit_POM = new POM_unit();
const Function_Utility = new Functionality_Utility();
const Home_POM = new POM_Home();
const In_Utility = new Input_Utility();
const Nav_Utility = new Navigation_Utility();
const Verify_Utility = new Verification_Utility();

const Generic_Claims = new POM_Generic_Claims();
const Generic_Utility = new GenericUsages_Utility();
const Reserve_Utility = new POM_FinancialReserves();
const Verification_Msg = new POM_VerificationMessage();
const Payment_POM = new POM_PaymentsCollections();

var faker = require('faker');
var StrClaimNumber;


DataIUT.forEach(data => {
    const LoggedInUser = Role(data.URL , async t => {
        await t.maximizeWindow()
        console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
        await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
        await t.wait(5000)
        console.log("Login Into Application!!".green)
    },{ preserveUrl: true }
    );
    
    fixture `PropertyClaim_Exhaustive_Smoke`.beforeEach(async t => {
      await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
    });
    
    test('AssureClaims_PropertyClaim_Test_01', async t => {
        var date = new Date();
        var d = (date.getMonth()+1)+'/'+(date.getDate())+'/'+date.getFullYear();
     
    
        //=====================================================Property Claim Creation Started Here====================================================================
        console.log("AssureClaims_PropertyClaimCreation Function is Called To Create Property Claim".yellow); 
        StrClaimNumber= await Function_Utility.AssureClaims_PropertyClaimCreation(d,d,data.ClaimStatus,data.PCClaimType,data.Department,data.PCPolicyLOB,data.PropertyId )
        console.log("New Property Claim is Created with Claim Number: ".green+StrClaimNumber);
        //Property Claim Creation
        //=====================================================Property Claim Creation Completed Here====================================================================
    });

    test('ClaimantCreateEditDelete_Test_02', async t => {
        await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PropertyClaim_ClaimPCIframe);
        //=====================================================Claimant Creation On Created Claim Started Here=====================================================
        console.log("AssureClaims_ClaimEventEntityAddition_Utility Function is Called To Create Claimant".yellow);
        await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility("Claimant", "Australia", "Victoria", "NA")
        console.log("Claimant is Created on Carrier Claims");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Claimant_POM.AssureClaims_Claimant_Tab_ClaimantAttorney, "Claimant Attorney Tab On Claimant Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Claimant_POM.AssureClaims_Claimant_Tab_Supplementals, "Supplementals Tab On Claimant Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Claimant_POM.AssureClaims_Claimant_Tab_ClaimantInfo, "Claimant Info Tab On Claimant Screen")
        //Verification That All Tabs Are Present For Claimant Screen
        console.log("AssureClaims_ClaimEventEntityEdit_Utility Function is Called To Edit The Created Claimant Tracking".yellow);
        var ClaimantLastName = await Function_Utility.AssureClaims_ClaimEventEntityEdit_Utility("Claimant", "NA", "NA", "NA");
        console.log("Created Claimant is Edited with New Last Name: ".green + ClaimantLastName);
        //Created Claimant Entity Is Edited Here
        await Function_Utility.AssureClaims_GenericDelete_Utility("False", "Claimant Creation Screen", "", "");
        await Function_Utility.AssureClaims_GenericDelete_Utility("True", "Claimant Creation Screen", "", "");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "Claimant Creation Screen");
        //Created Claimant Entity Is Deleted Here
        //=======================================================Claimant Creation On Created Claim Completed Here ===========================================================   
      });

      test('SubrogationCreateEditDelete_Test_03', async t => {
        await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PropertyClaim_ClaimPCIframe);
        //=======================================================Subrogation Creation On Created Claim Started Here====================================================  
        await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility("Subrogation", "Collision", "Open", "Adverse Insured")
        //Subrogation created
    
        await Nav_Utility.AssureClaims_ElementClick_Utility(Subrogation_POM.AssureClaims_Subrogation_Tab_SubrogationInfo, "Subrogation Info Tab On Subrogation Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Subrogation_POM.AssureClaims_Subrogation_Tab_SubrogationFinancial, "Subrogation Financial Tab On Subrogation Creation Screen")
        await In_Utility.AssureClaims_SetValue_Utility(Subrogation_POM.AssureClaims_Subrogation_Txt_NumberOfYears, "3", "Number Of Years Text Box On Subrogation Financial Tab")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Subrogation_POM.AssureClaims_Subrogation_Tab_Supplementals, "Supplementals Tab On Subrogation Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Subrogation Screen");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Subrogation Creation Screen");
        //Subrogation Screen is Edited here
    
        await Function_Utility.AssureClaims_GenericDelete_Utility("False", "Subrogation Creation Screen", "", "");
        await Function_Utility.AssureClaims_GenericDelete_Utility("True", "Subrogation Creation Screen", "", "");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "Subrogation Creation Screen");
        //Created Subrogation Entity Is Deleted Here
        //=======================================================Subrogation Creation On Created Claim Completed Here===============================================================
      });

      test('AssureClaims_PersonInvolved_Test_04', async t => {

        await t.wait(5000)
        await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PropertyClaim_ClaimPCIframe);
        /*==========================================================Adding Med Staff As PI On Created WC Claim Started Here========================================================================================================================================================================================================================================================================================================*/
        console.log("AssureClaims_PersonInvolvedAddNewEntity_Utility Function is Called To Create  Med Staff As PI On Created WC Claim".yellow); 
        await Maint_Utility.AssureClaims_PersonInvolvedAddNewEntity_Utility("Medical Staff", "NA", "NA","NA");
        console.log("Med Sfaff is added as Person Involved on Created Claim ".green);
        //Med Staff as PI On Worker Compensation Claim
       /*==========================================================Adding Med Staff As PI On Created WC Claim Completed Here========================================================================================================================================================================================================================================================================================================*/
    });
    

        test('ReserveCreation_Test_05', async t => {
            await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
        /*===========================================================Reserve Creation On Property Claim Started Here========================================================================================================================================================================================================================================================================================================*/
        await t.switchToMainWindow();
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PropertyClaim_ClaimPCIframe);
        await t.wait(3000) 
        await Function_Utility.AssureClaims_Reserve_Utility(data.ReserveType,data.ReserveAmount,data.ReserveStatus)
        //Reserve created
        /*===========================================================Reserve Creation On Property Claim Completed Here========================================================================================================================================================================================================================================================================================================*/
        });
        test('ScheduleCheckCreation_Test_06', async t => {
            await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
            await t.switchToMainWindow();
            await t.wait(3000)
            await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PropertyClaim_ClaimPCIframe);
        //===========================================================New Schedule Check Creation On Vehicle Claim Started Here========================================================================================================================================================================================================================================================================================================
        await t.wait(3000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
         
        await Function_Utility.AssureClaims_ScheduleCheck_Creation(data.NumberOfPayments,data.PayInterval,data.BankAccount,data.DistributionType,data.AutoCheckPayeeType,data.LastName,data.AutoCheckTransactionType,data.AutoCheckAmount)
        // Schedule Check is Created 
        //===========================================================New Schedule Check Creation On Vehicle Claim Completed Here========================================================================================================================================================================================================================================================================================================
        });
    
        test('CollectionCreation_Test_07', async t => {
            await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
            await t.switchToMainWindow();
            await t.wait(3000)
            await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PropertyClaim_ClaimPCIframe);
        //===========================================================Collection Creation On Vehicle Claim Started Here========================================================================================================================================================================================================================================================================================================
        await t.wait(3000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
       
       await Function_Utility.AssureClaims_CollectionCorpAddition_Utility(data.BankAccount,data.PayeeType,data.LastName,data.ReserveType,data.TransactionType,data.ReserveAmount)
       // Collection is Created
       //===========================================================Collection Creation On Vehicle Claim Completed Here========================================================================================================================================================================================================================================================================================================
        });
       test('PaymentCreation_Test_08', async t => {
        await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
        await t.switchToMainWindow();
        await t.wait(3000)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PropertyClaim_ClaimPCIframe);
       //===========================================================Payment Creation On Vehicle Claim Started Here========================================================================================================================================================================================================================================================================================================
       
       await t.wait(3000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
        await Function_Utility.AssureClaims_PaymentCorpAddition_Utility(data.BankAccount,data.PayeeType,data.LastName,data.ReserveType,data.TransactionType,data.ReserveAmount)
        //Payment created
        //===========================================================Payment Creation On Vehicle Claim Started Here========================================================================================================================================================================================================================================================================================================
        
    });test.after(async t =>{
        await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
        console.log("AssureClaims_LogoutFromApplication_Utility Function Is Called To LogOut From Application!!".yellow);
        await Function_Utility.AssureClaims_LogoutFromApplication_Utility()
    })
    });
    
