import { Selector,Role, t } from 'testcafe';
import { createTestCafe } from 'testcafe';
import Colors from 'colors'
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import Input_Utility from '../Functional_Utilities/Input_Utility';
import Verification_Utility from '../Functional_Utilities/Verification_Utility'
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';
import POM_PaymentParameterSetUp from '../Functional_POM/POM_PaymentParameterSetUp';
import POM_Home from '../Functional_POM/POM_Home';
import POM_FinancialReserves from '../Functional_POM/POM_FinancialReserves';
import POM_Search from '../Functional_POM/POM_Search';
import POM_SMS from '../Functional_POM/POM_SMS';
import Maintenance_Functionality_Utility from '../Functional_Utilities/Maintenance_Functionality_Utility';
import POM_People from '../Functional_POM/POM_People';
const People_POM = new POM_People();

//const DataIUT = require('../DataFiles/DataIUT.json');
 const DataIUT = require('../DataFiles/DataBurp.json');
//const DataIUT = require('../DataFiles/DataAutoReg.json');
const SMS_POM=new POM_SMS();
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
const Home_POM = new POM_Home();
const Search_POM = new POM_Search();

var faker=require('faker');

DataIUT.forEach(data => {
    fixture `Edit_Payee_From_Funds`.beforeEach(async t => {
            await t.wait(4000)
            await t.navigateTo(data.URL)
            await t.maximizeWindow()    
});
var StrClaimNumber;
var FetchStrSSN;
var LastName;
var FetchStrFirstName;

var FetchStrAddress1;
var FetchStrCity;
var FetchStrZipCode;

var FetchStrPayToTheOrderOf;


test('Security_Permissions_For_Edit_Payee_From_Funds_Test_01', async t => {
        
    await t.wait(10000)
    console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Security')
    await t.wait(5000)
    console.log("Login Into Application!!".green)

    const elementWithId1 = Selector(id => { return document.getElementById(id); });
    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Security:Security Management System");
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_SMSIframe);
    await Nav_Utility.AssureClaims_ElementClick_Utility(SMS_POM.AssureClaims_SMSUser_Btn_Refresh,"Refresh Button on Security Management System Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SMS_POM.AssureClaims_SMS_Expand_DataSources,"Expand Data Source")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SMS_POM.AssureClaims_SMS_Expand_DSN_RMATest_2,"Expand DSN")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SMS_POM.AssureClaims_SMS_Expand_ModuleSecGroups,"Expand Module Security Group")
    await t.click(elementWithId1('Training'));   
    await Nav_Utility.AssureClaims_ElementClick_Utility(SMS_POM.AssureClaims_SMS_Expand_RiskMaster,"Expand RiskMaster")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SMS_POM.AssureClaims_SMS_Expand_RiskMaster_FundsManagement,"Expand FundsManagement")
    await Nav_Utility.AssureClaims_ElementClick_Utility(SMS_POM.AssureClaims_SMS_Expand_RiskMaster_FundsManagement_Transaction,"Expand FundsManagement Transaction")
    await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(SMS_POM.AssureClaims_SMS_Chk_Allow_Edit_of_Entity_Tax_ID,'Check',"Click Allow_Edit_of_Entity_Tax_ID  FundsManagement RiskMaster branch on Module Access Permissions On SMS Screen")
    await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(SMS_POM.AssureClaims_SMS_Chk_Allow_Edit_of_Mail_To_Address,'Check',"Click Allow_Edit_of_Mail_To_Address FundsManagement RiskMaster branch on Module Access Permissions On SMS Screen")
    await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(SMS_POM.AssureClaims_SMS_Chk_Allow_Edit_Of_Pay_To_The_Order_Of,'Check',"Click Allow_Edit_Of_Pay_To_The_Order_Of FundsManagement RiskMaster branch on Module Access Permissions On SMS Screen")
    await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(SMS_POM.AssureClaims_SMS_Chk_Allow_Edit_Of_Generate_Pay_To_The_Order_Of,'Check',"Click Allow_Edit_Of_Generate_Pay_To_The_Order_Of FundsManagement RiskMaster branch on Module Access Permissions On SMS Screen")
})

test("AssureClaims_Maintenance_People_Test_02", async t=>{

  await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Maintenance')
  await t.wait(5000)
  console.log("AssureClaims_MaintenanceAddNewEntity_Utility Function is Called To Create People".yellow);
   LastName = await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Utility("People", "Broker",data.Country,data.State);
  console.log("New Entity is Created with Last Name: ".green+LastName);
  //New Entity Is Created
  FetchStrSSN = await Verify_Utility.AssureClaims_AttributeFetch_Utility(People_POM.AssureClaims_People_Txt_SSN,"value");
  console.log(FetchStrSSN.yellow);
  FetchStrFirstName = await Verify_Utility.AssureClaims_AttributeFetch_Utility(People_POM.AssureClaims_People_Txt_FirstName,"value");
  console.log(FetchStrFirstName.yellow);
 //await Nav_Utility.AssureClaims_ElementClick_Utility(People_POM.AssureClaims_People_Tab_Addresses,"Addresses Tab On Employee Creation Screen");
  await Nav_Utility.AssureClaims_ElementClick_Utility(People_POM.AssureClaims_People_Btn_EditAddress,"Edit New Address Button On Employee Creation Screen");
  FetchStrAddress1 = await Verify_Utility.AssureClaims_AttributeFetch_Utility(People_POM.AssureClaims_People_Txt_Addr1,"value");
  console.log(FetchStrAddress1.yellow);
  FetchStrCity = await Verify_Utility.AssureClaims_AttributeFetch_Utility(People_POM.AssureClaims_People_Txt_City,"value");
  console.log(FetchStrCity.yellow);
  FetchStrZipCode = await Verify_Utility.AssureClaims_AttributeFetch_Utility(People_POM.AssureClaims_MaintPeople_Txt_ZipCode,"value");
  console.log(FetchStrZipCode.yellow);
})


test('AssureClaims_GCCreation_Test_03', async t => {
    console.log("GeneralClaim Creation_Test_03 Started".rainbow);
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

  test('PaymentCreation_For_Scenario1_Test_4', async t => {
    console.log("PaymentCreation On GeneralClaim Started".rainbow);
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
    await Function_Utility.AssureClaims_PaymentCorpAddition_Utility(data.BankAccount, data.PayeeType, data.LastName, data.ReserveType, data.TransactionType, "10");
    // Payment is Created
    //===========================================================Payment Creation Is Completed Here========================================================================================================================================================================================================================================================================================================
    await t.wait(3000);
    await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_LastName, 'Puma',"Last Name Text Box On Payment Creation Screen")
    await t.wait(3000);
    await t.pressKey('tab')
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Payment Creation Screen");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Payment Creation Screen");
    await t.wait(3000);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_TaxId, "Tax ID Button is Clicked")
     await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Cancle,"Click Cancle on EDIT TaxID Payment Creation Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Pay_To_The_Order_Of_LookUP,"Clicked on Pay_To_The_Order_Of_LookUP on EDIT TaxID Payment Creation Screen")
 await In_Utility.AssureClaims_ElementWebListSelect_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_Payee_Phrase_Location_First,'Before',"Payee_Phrase_Location_First On Payment Creation Screen")
 await In_Utility.AssureClaims_ElementWebListSelect_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_Payee_Phrase_Location_Second,'Before',"Payee_Phrase_Location_Second On Payment Creation Screen")
 await In_Utility.AssureClaims_ElementWebListSelect_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_payee_Phrase_First,'and',"payee_Phrase_First On Payment Creation Screen")
 await In_Utility.AssureClaims_ElementWebListSelect_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_payee_Phrase_Second,'and',"payee_Phrase_Second On Payment Creation Screen")
 await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Preview,"Clicked on Pay_To_The_Order_Of_LookUP on EDIT TaxID Payment Creation Screen")
 
await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Payment Creation Screen");
//Fetching & Verification Of Pay To The Order Of
FetchStrPayToTheOrderOf = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_Pay_To_The_Order_Of,"Fetching value of Pay To The Order Of In Transaction Screen");
console.log(FetchStrPayToTheOrderOf.yellow);
await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_Pay_To_The_Order_Of, FetchStrPayToTheOrderOf,"Pay To The Order Of In Transaction Screen");

await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Pay_To_The_Order_Of_Edit,"Clicked on Pay_To_The_Order_Of_Edit on EDIT TaxID Payment Creation Screen")
await t
.click(Payment_POM.AssureClaims_PaymentCollection_Txt_Pay_To_The_Order_Of_Content)
.typeText(Payment_POM.AssureClaims_PaymentCollection_Txt_Pay_To_The_Order_Of_Content,"Modified").setTestSpeed(0.7);

//await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_Pay_To_The_Order_Of_Content, 'Modified',"Pay_To_The_Order_Of_Content Text Box On Payment Creation Screen")
 //await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Preview,"Clicked on Pay_To_The_Order_Of_LookUP on EDIT TaxID Payment Creation Screen")
 await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Ok_For_Pay_To_The_Order_Of,"Click Ok Payment Creation Screen")
 await t.wait(3000);
    await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_Mail_To_LastName, 'krishm',"Last Name Text Box On Payment Creation Screen")
    await t.wait(3000);
    await t.pressKey('tab')
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Payment Creation Screen");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Payment Creation Screen");
    await t.wait(3000);

});

test('PaymentCreation_For_Scenario2_Test_5', async t => {
  console.log("PaymentCreation On GeneralClaim Started".rainbow);
  await t.wait(10000)
  await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
  console.log(`Login Into Application->Claims`)
  //Login Into Application with User  
  await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
  //GCDIA2021009712
  //StrClaimNumber
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
 //===========================================================Payment Creation Is Started Here========================================================================================================================================================================================================================================================================================================
  await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
  await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window")
 
  await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_Btn_MakePayment,"Make Payment Button On Payment Creation Screen")
  await t.wait(2000)
  await In_Utility.AssureClaims_ElementWebListSelect_Utility(Payment_POM.AssureClaims_Payment_Lst_BankAccount,"Claim Payment","Bank Account On Payment Creation Screen")
  await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType,"Payee Payor Type List On Payment Creation Screen")
 await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Lst_PayeePayorType.find('option').withText('O-Other Payees (People & Entities)'),"Payee Payor Type Value On Payment Creation Screen")
 await t.wait(3000)
///////

await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_TaxID,FetchStrSSN,"Transaction Amount On Funds Split Detail Screen")
await t.pressKey('tab')

await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_LastName, LastName, "Payee NameCreation Screen");

 await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_TransactionDetail,"Transaction Detail Tab On Payment Creation Screen")
 await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_AddNewFunds,"Add New Funds Button On Payment Creation Screen")
 await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType,"Transaction Type List On Funds Split Detail Screen")
 await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType.find('option').withText('EXF Expert Witness Fees'),"Transaction Type Value On Funds Split Detail Screen")
 
 await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Txt_Amount,"10","Transaction Amount On Funds Split Detail Screen")
 await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_FundsSplitDetails_Btn_Save,"Save Button On Funds Split Detail Screen")
 await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_Transaction,"Transaction Tab On Payment Creation Screen")
 await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Payment Creation Screen");
 await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Payment Creation Screen")
 //await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Pay_To_The_Order_Of_Edit,"Clicked on Pay_To_The_Order_Of_Edit on EDIT TaxID Payment Creation Screen")
  await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_TaxId, "Tax ID Button is Clicked")

  await t
        .click(Payment_POM.AssureClaims_PaymentCollection_Btn_Edit_TaxId)
        .pressKey('ctrl+b backspace')
        .typeText(Payment_POM.AssureClaims_PaymentCollection_Btn_Edit_TaxId,"5").setTestSpeed(0.7);

  await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button EDIT TaxID On Payment Creation Screen");
  await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Ok,"Click Ok Payment Creation Screen")
 
})
})
