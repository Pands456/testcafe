//
import { Selector,Role } from 'testcafe';
import { createTestCafe } from 'testcafe';
import Colors from 'colors';
import Verification_Utility from '../Functional_Utilities/Verification_Utility';
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import Input_Utility from '../Functional_Utilities/Input_Utility';
import POM_Home from '../Functional_POM/POM_Home';
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import POM_Generic_Claims from '../Functional_POM/POM_Generic_Claims';
const Generic_Claims = new POM_Generic_Claims();
const DataIUT = require('../DataFiles/DataAutoReg.json');
const Payment_POM = new POM_PaymentsCollections();
const Function_Utility = new Functionality_Utility();
const Generic_Utility = new GenericUsages_Utility();
const Nav_Utility = new Navigation_Utility();
const In_Utility = new Input_Utility();
const Verify_Utility = new Verification_Utility();
const Verification_Msg = new POM_VerificationMessage();
const Home_POM = new POM_Home();
var faker = require('faker');

//global variables
var StrPolicySymbol;
var StrClaimNumber;
var StrPolicyNumber;
var StrPolicyName;
var FetchUnitNumber;
var FetchPropertyID;
var FetchCoverageType;
var FetchSIRDeductible;
var FetchClassCode;
var StrPolicySystemName;
var StrMasterCompany;

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
  
  fixture `Multiple Policy Download And Verification of Policy Data `.beforeEach(async t => {
    await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
  });
  
test('Multiple Policy Download And Verification of Policy Data', async t => {
  var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
  console.log("AssureClaims_CarrierGCClaimCreation Function is Called To Create Carrier Claim".yellow); 
  StrClaimNumber=await Function_Utility.AssureClaims_CarrierGCClaimCreation(d,d,data.GCCarrierClaimType,data.ClaimStatus,data.Department,data.GCCarrierPolicyLOB,data.PolicySystem,data.IntPolicy1)
  StrPolicyNumber = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Generic_Claims.AssureClaims_Generic_Claim_Txt_PolicyNumber,"value");
  console.log("New Carrier General Claim is Created with One Policy Download And Claim Number & Policy Number: ".green+StrClaimNumber+"  "+data.IntPolicy1);
  //-----------------------------------------First Claimant verification---------------------------------------------------------------
  const ClaimantName = Generic_Claims.AssureClaims_Generic_Claim_Lnk_Claimant.withText(data.ClaimentName).with({ visibilityCheck: true })
  await t.expect(ClaimantName.exists).ok('', { timeout: 20000 })
  console.log("Verification Of Claimant Added After first policy Download Is Successful".green)
  //------------------------------------------Adding Another Policy-----------------------------------------------------
  //Attaching Another Policy To the Claim
  await t.wait(4000);
  await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_PolicyNameLookup,"Policy Name Lookup")
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_SubPolicyDownloadIframe)
  //Remove the Values Of Policy Number ,Symbol, Name On the Policy Search Screen
  await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_Generic_Claim_Txt_PolicyNumberEdit,"Policy Number EditText")
  await t.pressKey('ctrl+a delete')
  await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_Generic_Claim_Txt_PolicySymbolEdit,"Policy Symbol EditText")
  await t.pressKey('ctrl+a delete')
  await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_Generic_Claim_Txt_PolicyNameEdit,"Policy Name EditText")
  await t.pressKey('ctrl+a delete')
  await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_SubmitQuery,"Submit Query Button")
  await t.wait(3000);
  //Searching for Second Policy
  await In_Utility.AssureClaims_SetValue_Utility(Generic_Claims.AssureClaimsApp_GenericClaim_ClkTxt_PolicyName,data.PolicyName1,"PolicyName TextBox")
  await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Lnk_InternalPolicyName.withText(data.PolicyName1),"Policy Name")
  await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_PolicyPreview,"Right Click On Policy Preview")
  await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_List.withText('Interest List'),"Open Interest List tab")
  await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Chk_InterestListClaimant,"Check Claimant")
  await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_List.withText('Unit List'),"Open Unit List tab")
  await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Chk_UnitList,"Check Unit List")
  await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Chk_PolicyProperty,"Check Policy Property List")
  await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_InternalPolicySave,"Save Internal Policy")
  await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_PolicyDownload,"Download Policy")
  await t.wait(8000)
  await t.switchToMainWindow();
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
  await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On General Claim creation Screen");
  await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " General Claim Creation Screen");
  //----------------------------------------- Second Policy Claimant verification-------------------------------------------
  const DetailedTrackingClaimantName1 = Generic_Claims.AssureClaims_Generic_Claim_Lnk_Claimant.withText(data.SecondPolicyClaimentName).with({ visibilityCheck: true })
  await t.expect(DetailedTrackingClaimantName1.exists).ok('', { timeout: 20000 })
  console.log("Verification Of Claimant Added After Second policy Download Is Successful".green)
  //----------------------------------------------Policy verification-----------------------------------------------
  await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_Generic_Claim_Lnk_Policy.withText(data.IntPolicy1)," Policy Link on GeneralClaim Page")
  //------------------------------------------- Fetch & Verify Readonly Only On Policy Tracking Page Field Start Here-------------------------------
  StrPolicySymbol = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Generic_Claims.AssureClaims_Generic_Claim_Verify_Policy_PolicySymbol,"value");
  console.log("PolicySymbol is : ".green+StrPolicySymbol)
  const Policysymbol = Generic_Claims.AssureClaims_Generic_Claim_Verify_Policy_PolicySymbol
  await t.expect(Policysymbol.hasAttribute('readonly')).ok('', { timeout: 20000 })
  console.log("Verification Of Read OnlyMode of PolicySymbo Is Successful".green)
  StrPolicyName = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Generic_Claims.AssureClaims_Generic_Claim_Verify_Policy_PolicyName,"value");
  console.log("PolicyNumber is : ".green+StrPolicyName)
  const VerifyPolicyName = Generic_Claims.AssureClaims_Generic_Claim_Verify_Policy_PolicyName
  await t.expect(VerifyPolicyName.hasAttribute('readonly')).ok('', { timeout: 20000 })
  console.log("Verification Of ReadOnly Mode of PolicyNumber Is Successful".green)
  StrPolicySystemName = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Generic_Claims.AssureClaims_Generic_Claim_Verify_Policy_PolicySystemName,"value");
  console.log("PolicyNumber is : ".green+StrPolicySystemName)
  const VerifyPolicySystemName = Generic_Claims.AssureClaims_Generic_Claim_Verify_Policy_PolicySystemName
  await t.expect(VerifyPolicySystemName.hasAttribute('readonly')).ok('', { timeout: 20000 })
  console.log("Verification Of ReadOnly Mode of Policy System Name Is Successful".green)
  StrMasterCompany = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Generic_Claims.AssureClaims_Generic_Claim_Verify_Policy_MasterCompany,"value");
  console.log("PolicyNumber is : ".green+StrMasterCompany)
  const VerifyMasterCompany = Generic_Claims.AssureClaims_Generic_Claim_Verify_Policy_MasterCompany
  await t.expect(VerifyMasterCompany.hasAttribute('readonly')).ok('', { timeout: 20000 })
  console.log("Verification Of ReadOnly Mode of MasterCompany Is Successful".green)
  //------------------------------------------- Verifying Field is in Readonly Mode End Here----------------------------------------------------
  //-----------------------------------------PIOtherPolicy verification-------------------------------------------------------------------------
  const PIOtherPolicy = Generic_Claims.AssureClaims_Generic_Claim_Lnk_Persons_Involved_Node_Available.withText(data.PIOtherPolicy).with({ visibilityCheck: true })
  await t.expect(PIOtherPolicy.exists).ok('', { timeout: 20000 })
  console.log("Verification Of PIOtherPolicy of ".green+data.PIOtherPolicy+"Is Successful".green)
  //------------------------------------Policy Property Verification-------------------------------------------------------------------------------------
  await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_Generic_Claim_Lnk_PolicyUnits.withText(data.PolicyTrackingUnit)," Policy Link on GeneralClaim Page")
  //-------------------------------------------Fetch & Verify Readonly Only Field  On Policy Property Start Here---------------------------------------------------------
  FetchUnitNumber = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Generic_Claims.AssureClaims_Generic_Claim_Verify_Policy_UnitNumber,"value");
  console.log("FetchUnitNumber is : ".green+FetchUnitNumber)
  const VerifyUnitNumber = Generic_Claims.AssureClaims_Generic_Claim_Verify_Policy_UnitNumber
  await t.expect(VerifyUnitNumber.hasAttribute('readonly')).ok('', { timeout: 20000 })
  console.log("Verification Of Read OnlyMode of UnitNumber Is Successful".green)
  FetchPropertyID = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Generic_Claims.AssureClaims_Generic_Claim_Verify_Policy_PropertyID,"value");
  console.log("FetchUnitNumber is : ".green+FetchPropertyID)
  const VerifyPropertyID = Generic_Claims.AssureClaims_Generic_Claim_Verify_Policy_PropertyID
  await t.expect(VerifyPropertyID.hasAttribute('readonly')).ok('', { timeout: 20000 })
  console.log("Verification Of Read OnlyMode of UnitNumber Is Successful".green)
  //-------------------------------------------Fetch & Verify Readonly Only Field End Here---------------------------------------------------------
  //------------------------------------------- Verification Of Policy Coverage-------------------------------------------------------------------------
  await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_Generic_Claim_Lnk_ClaimPolicyCoverage.withText(data.GCPolicyCoverage)," GCPolicyCoverage Link on GeneralClaim Page")
  //--------------------------------------------Fetch & Verify Read Only Fields On Policy Coverage Start Here-------------------------------------------------------------------
  FetchCoverageType = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Generic_Claims.AssureClaims_Generic_Claim_Verify_Policy_CoverageType,"value");
  console.log("FetchUnitNumber is : ".green+FetchCoverageType)
  const VerifyCoverageType = Generic_Claims.AssureClaims_Generic_Claim_Verify_Policy_CoverageType
  await t.expect(VerifyCoverageType.hasAttribute('disabled')).ok('', { timeout: 20000 })
  console.log("Verification Of Read OnlyMode of CoverageType Is Successful".green)
  FetchClassCode = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Generic_Claims.AssureClaims_Generic_Claim_Verify_Policy_ClassCode,"value");
  console.log("FetchUnitNumber is : ".green+FetchClassCode)
  const VerifyClassCode = Generic_Claims.AssureClaims_Generic_Claim_Verify_Policy_ClassCode
  await t.expect(VerifyClassCode.hasAttribute('readonly')).ok('', { timeout: 20000 })
  console.log("Verification Of Read OnlyMode of ClassCode Is Successful".green)
      });

      test('Policy System Download Test_01', async t => { 
        await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Document:Policy System Download");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Generic_policysysdownload);
        await t.wait(5000)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_SubPolicyDownloadIframe)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_SubmitQuery,"Clicked on Submit Query Button")
        await t.wait(5000);
        await In_Utility.AssureClaims_SetValue_Utility(Generic_Claims.AssureClaimsApp_GenericClaim_ClkTxt_PolicyName,data.PolicyDownloadPolicyName,"PolicyName TextBox")
       
        await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Lnk_InternalPolicyName.withText(data.PolicyDownloadPolicyName),"Policy Name")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_PolicyPreview,"Right Click On Policy Preview")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_List.withText('Interest List'),"Open Interest List tab")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Chk_InterestListClaimant,"Check Claimant")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_List.withText('Unit List'),"Open Unit List tab")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Chk_UnitList,"Check Unit List")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Chk_PolicyProperty,"Check Policy Property List")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_InternalPolicySave,"Save Policy")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_PolicyDownload,"Download Policy")
        await t.wait(7000)
        //The Selected Policy Downloaded on New Claim
        await t.switchToMainWindow();
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
        var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
        await In_Utility.AssureClaims_SetValue_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_DateOfEvent,d,"Date Of Event")
        await In_Utility.AssureClaims_SetValue_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_DateOfClaim,d,"Date Of Claim")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_TimeOfEvent,"Time Of Event")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_TimeOfClaim,"Time Of Claim")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_ClaimType,"Claim Type Lookup")
        const ele_CarrierClaimType=Generic_Claims.AssureClaims_GenericClaim_Lnk_SelectClaimType.withText(data.GCClaimType).with({visibilityCheck:true})
         await t.expect(ele_CarrierClaimType.exists).ok('',{timeout: 20000})
         await Nav_Utility.AssureClaims_ElementClick_Utility(ele_CarrierClaimType,"Claim Type Option")
         await In_Utility.AssureClaims_SetValue_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_ClaimInfo_Dept,data.Department,"Department")
         await t.pressKey('tab')
        // All the manadatroy fields of General Claim are Filled
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On General Claim creation Screen");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " General Claim Creation Screen");
        // Claim got Created with this  Policy Attached
        StrClaimNumber = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_ClaimNumber,"value");
        console.log("General Claim is Created with ClaimNumber:".green+StrClaimNumber);
         //==================================================Reserve Creation Started Here=====================================================
      await t.wait(3000)
        console.log("AssureClaims_ReserveAddition_Utility Function is Called To Create Carrier Reserve".yellow); 
        await Function_Utility.AssureClaims_CarrierReserveAddition_Utility(data.AmountType,data.PolicyLossCode,data.PolicyUnit,data.PolicyCoverage,data.ReserveStatus,data.ReserveType)
        console.log("New Carrier Reserve is Created".green);
         //==================================================Reserve Creation End Here=====================================================
       //-----------------------------------Payment Creation-----------------------------------------------------   
         await t.switchToMainWindow()
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.dvbreadcrumbscroll,"Breadcrumbs Clicked")
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
        console.log("AssureClaims_PaymentAddition_Utility Function is Called To Create Carrier Payment".yellow); 
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_MakePayment,"Make Payment Button On Payment Creation Screen")
        await Function_Utility.AssureClaims_CarrierCollectionPaymentAddition_Utility(data.BankAccount,data.PayeeTypeClaimant,data.TransactionType,data.Amount,data.PolicyUnit,data.PolicyCoverage,data.PolicyLossCode)
        console.log("New Carrier Payment is Created".green);
    //-----------------------------------Collection Creation-----------------------------------------------------   
        await t.switchToMainWindow()
            await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.dvbreadcrumbscroll,"Breadcrumbs Clicked")
            await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
            await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
       
        console.log("AssureClaims_CollectionPaymentAddition_Utility Function is Called To Create Carrier Payment".yellow); 
        // Carrier Collection starts
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_AddCollection, "Add collection Button On Payment Creation Screen")
        await Function_Utility.AssureClaims_CarrierCollectionPaymentAddition_Utility(data.BankAccount,data.PayeeTypeClaimant,data.TransactionType,data.Amount,data.PolicyUnit,data.PolicyCoverage,data.PolicyLossCode)
        console.log("New Carrier Collection is Created".green);
    });
    

});