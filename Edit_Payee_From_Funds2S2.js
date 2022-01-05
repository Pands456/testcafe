import { Selector,Role, t } from 'testcafe';
import { createTestCafe } from 'testcafe';
import Colors from 'colors'
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import Input_Utility from '../Functional_Utilities/Input_Utility';
import Maintenance_Functionality_Utility from '../Functional_Utilities/Maintenance_Functionality_Utility';
import Verification_Utility from '../Functional_Utilities/Verification_Utility'
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';
import POM_PaymentParameterSetUp from '../Functional_POM/POM_PaymentParameterSetUp';
import POM_FinancialReserves from '../Functional_POM/POM_FinancialReserves';
import POM_People from '../Functional_POM/POM_People';

const DataIUT = require('../DataFiles/DataAutoReg.json');
const Maint_Utility = new Maintenance_Functionality_Utility();
const Function_Utility = new Functionality_Utility();
const Nav_Utility = new Navigation_Utility();
const Generic_Utility = new GenericUsages_Utility();
const In_Utility = new Input_Utility();
const Verify_Utility = new Verification_Utility();
const Reserve_Utility = new POM_FinancialReserves();
const Verification_Msg = new POM_VerificationMessage();
const Payment_POM = new POM_PaymentsCollections();
const PayParaSetUp_POM=new POM_PaymentParameterSetUp();
const People_POM = new POM_People();

DataIUT.forEach(data => {
    fixture `Edit_Payee_From_Funds`.beforeEach(async t => {
            await t.wait(4000)
            await t.navigateTo(data.URL)
            await t.maximizeWindow()    
});

var StrClaimNumber;
var FetchStrSSN1;
var LastName1;
var FetchStrSSN2;
var LastName2;
var FetchStrSSN3;
var LastName3;

test("AssureClaims_Maintenance_People_Test_01", async t=>{
   console.log("Maintenance_People_Creation_Test_01_Started".rainbow);
   await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Maintenance')
   await t.wait(5000)
   console.log("AssureClaims_MaintenanceAddNewEntity_Utility Function is Called To Create People".yellow);
   LastName1 = await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Utility("People", "Broker",data.Country,data.State);
   console.log("New People Entity is Created with Last Name: ".green+LastName1);
   //New Entity Is Created
   //Fetching SSN 
   FetchStrSSN1 = await Verify_Utility.AssureClaims_AttributeFetch_Utility(People_POM.AssureClaims_People_Txt_SSN,"value");
   console.log(FetchStrSSN1.yellow);
   })

test("AssureClaims_Maintenance_People_Test_02", async t=>{
    console.log("Maintenance_People_Creation_Test_02_Started".rainbow);
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Maintenance')
    await t.wait(5000)
    console.log("AssureClaims_MaintenanceAddNewEntity_Utility Function is Called To Create People".yellow);
    LastName2 = await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Utility("People", "Broker",data.Country,data.State);
    console.log("New Entity is Created with Last Name: ".green+LastName2);
    //New Entity Is Created
     //Fetching SSN 
    FetchStrSSN2 = await Verify_Utility.AssureClaims_AttributeFetch_Utility(People_POM.AssureClaims_People_Txt_SSN,"value");
    console.log(FetchStrSSN2.yellow);
    })
test("AssureClaims_Maintenance_People_Test_03", async t=>{
    console.log("Maintenance_People_Creation_Test_03_Started".rainbow);
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Maintenance')
    await t.wait(5000)
    console.log("AssureClaims_MaintenanceAddNewEntity_Utility Function is Called To Create People".yellow);
    LastName3 = await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Utility("People", "Broker",data.Country,data.State);
    console.log("New Entity is Created with Last Name: ".green+LastName3);
    //New Entity Is Created
    //Fetching SSN 
    FetchStrSSN3 = await Verify_Utility.AssureClaims_AttributeFetch_Utility(People_POM.AssureClaims_People_Txt_SSN,"value");
    console.log(FetchStrSSN3.yellow);
    })  
test('AssureClaims_GCCreation_Test_04', async t => {
    console.log("GeneralClaim Creation_Test_04 Started".rainbow);
    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
    console.log(`Login Into Application->Claims`)
    //Login Into Application with User  
    var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    //======Claim Creation Started Here=====================
    console.log("AssureClaims_GeneralClaimCreation Function is Called To Create Claim".yellow);
    StrClaimNumber = await Function_Utility.AssureClaims_GeneralClaimCreation(d, d, data.ClaimStatus, data.GCClaimType, data.Department, data.GCPolicyLOB)
    console.log("New General Claim is Created with Claim Number: ".green + StrClaimNumber);
    //Claim Creation  completed  
    await Function_Utility.AssureClaims_Reserve_Utility(data.ReserveType, "1000", data.ReserveStatus)
    //Reserve created   
    });
test('PaymentCreation_Scenario1_Test_5', async t => {
    console.log("PaymentCreation For Scenario1 Started".rainbow);
    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
    console.log(`Login Into Application->Claims`)
    //Login Into Application with User  
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    //GCDIA2021009702
    //StrClaimNumber
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
    //===========================================================Payment Creation Is Started Here========================================================================================================================================================================================================================================================================================================
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window")
    await Function_Utility.AssureClaims_PaymentCorpAddition_Utility(data.BankAccount, data.PayeeType, LastName1, data.ReserveType, data.TransactionType, "10");
    // Payment is Created
     //===========================================================Payment Creation Is Completed Here========================================================================================================================================================================================================================================================================================================
    await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_TaxID, FetchStrSSN1,"Verify Tax ID1 In Transaction Screen");
    await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_LastName, LastName1,"Verify  LastName1 In Transaction Screen");
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_TaxId, "Tax ID1 Button is Clicked")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Cancle,"Click Cancle on EDIT TaxID Payment Creation Screen") 
    await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_LastName, LastName2,"Last Name 2 Text Box On Payment Creation Screen")
    await t.wait(3000);
    await t.pressKey('tab')
    await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_TaxID, FetchStrSSN2,"Verify Tax ID2 In Transaction Screen");
    await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_LastName, LastName2,"Verify  LastName2 In Transaction Screen");
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_TaxId, "Tax ID2 Button is Clicked")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Cancle,"Click Cancle on EDIT TaxID Payment Creation Screen")
    await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_LastName, LastName3,"Last Name 3 Text Box On Payment Creation Screen")
    await t.wait(3000);
    await t.pressKey('tab')
    await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_TaxID, FetchStrSSN3,"Verify Tax ID3 In Transaction Screen");
    await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_LastName, LastName3,"Verify  LastName3 In Transaction Screen");
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_TaxId, "Tax ID3 Button is Clicked")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Cancle,"Click Cancle on EDIT TaxID Payment Creation Screen")
    })          
  })