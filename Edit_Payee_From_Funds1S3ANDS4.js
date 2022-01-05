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
var FetchStrAddress1FromTransaction;
var FetchStrCityFromTransaction;
var FetchStrZipCodeFromTransaction;
var FetchStrSSNFromTransaction;
var FetchStrFirstNameFromTransaction;
var FetchStrLastNameFromTransaction;
var FetchStrLastNameFromTransactionPayee;
var FetchStrPayToTheOrderOf;
var FetchStrSSNForTESTCASE7;

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

  
test('PaymentCreation_For_Scenario3_Test_4', async t => {
    var SSN = faker.random.number({min: 100000000, max: 999999999});
    console.log("PaymentCreation On GeneralClaim Started".rainbow);
    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
    console.log(`Login Into Application->Claims`)
    //Login Into Application with User  
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    //GCDIA2021009702
    //GCDIA2021009729
    //StrClaimNumber
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
   //===========================================================Payment Creation Is Started Here========================================================================================================================================================================================================================================================================================================
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window")
    await Function_Utility.AssureClaims_PaymentCorpAddition_Utility(data.BankAccount, data.PayeeType, LastName, data.ReserveType, data.TransactionType, "10");
    // Payment is Created
    //===========================================================Payment Creation Is Completed Here========================================================================================================================================================================================================================================================================================================
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Load_Entity, "Load entity is clicked Payment Creation Screen")
    await t.switchToMainWindow();
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Generic_EntityFROMPaymentFrame);
    await Verify_Utility.AssureClaims_VerifyElementValue_Utility(People_POM.AssureClaims_People_Txt_Name, LastName, "Last Name In PeopleCreation Screen");
    await Nav_Utility.AssureClaims_ElementClick_Utility(People_POM.AssureClaims_People_Tab_Addresses,"Addresses Tab On People Creation Screen");
    await Nav_Utility.AssureClaims_ElementClick_Utility(People_POM.AssureClaims_People_Btn_EditAddress,"Edit New Address Button On People Creation Screen")
    await Verify_Utility.AssureClaims_VerifyElementValue_Utility(People_POM.AssureClaims_People_Txt_Addr1, FetchStrAddress1, "Address1 In People Creation Screen");
    await Verify_Utility.AssureClaims_VerifyElementValue_Utility(People_POM.AssureClaims_People_Txt_City, FetchStrCity, "City In People Creation Screen");
    await Verify_Utility.AssureClaims_VerifyElementValue_Utility(People_POM.AssureClaims_MaintPeople_Txt_ZipCode, FetchStrZipCode, "ZipCode In People Creation Screen");
    await Nav_Utility.AssureClaims_ElementClick_Utility(People_POM.AssureClaims_People_Btn_Close,"Click Cancle  In People Creation Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(People_POM.AssureClaims_Entity_Tab_Entity,"People Tab On Entity Creation Screen");
    await In_Utility.AssureClaims_SetValue_Utility(People_POM.AssureClaims_Entity_Txt_Abbreviation,"SK","Abbreviation on people maintenance Screen")
    await In_Utility.AssureClaims_SetValue_Utility(People_POM.AssureClaims_People_Txt_SSN, SSN.toString(),"SSN Number on people maintenance Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Payment Creation Screen");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Payment Creation Screen");
    FetchStrSSNForTESTCASE7 = await Verify_Utility.AssureClaims_AttributeFetch_Utility(People_POM.AssureClaims_People_Txt_SSN,"value");
      console.log(FetchStrSSNForTESTCASE7.yellow+"Is Feteched From Address1 From People In Transaction Screen");
})

test('AssureClaims_Maintenance_Search_Test_05', async t => {
  console.log("GeneralClaim Creation_Test_03 Started".rainbow);
  await t.wait(10000)
  await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Maintenance')
  console.log(`Login Into Application->Claims`)
    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Search");
      await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Search_Entity_Label_MenuOption, "Entity Menu");
      await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Generic_EntitySearchFrame);
      await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_Search_Txt_EntityLastName,LastName,"Last Name is Entered in LastName Field In Entity Search")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Search_Btn_SubmitQuery,"Clicked SubmitQuery On Entity Search ")
        await t.switchToMainWindow();
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Generic_EntitySearchLinkFrame);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Search_Lnk_LastName.withText('Broker'),"Type link")
        await t.wait(10000);
        await t.switchToMainWindow();
        //Created Vehicle is Searched From Maintenance
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Generic_PeopleAfterSearchFrame);
        await Verify_Utility.AssureClaims_VerifyElementValue_Utility(People_POM.AssureClaims_People_Txt_SSN, FetchStrSSNForTESTCASE7, "SSN Number Entered On People  Creation Screen");
        await Verify_Utility.AssureClaims_VerifyElementValue_Utility(People_POM.AssureClaims_Entity_Txt_Abbreviation, "SK", "Abbreviation Entered on People  Creation Screen");
  
  })
  
  test('PaymentCreation_For_Scenario4_Test_6', async t => {
  
    var EntityName = faker.name.lastName();
    var FirstName =  faker.name.firstName();
    var Address1 = faker.address.streetName();
    var Address2 = faker.address.streetAddress();
    var Address3 = faker.address.cityPrefix();
    var SSN = faker.random.number({min: 100000000, max: 999999999});
    var City = faker.address.city();
    var Zip = faker.random.number({min:10000, max:99999});
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
  
   await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_LastName, 'paye',"Last Name Text Box On Payment Creation Screen")
   await t.wait(3000)

      await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Add_LastName,"Add New Button Of Last Name On Payment Creation Screen")
  
      await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_EntitySelection,"Entity Selection is clicked On Payment Creation Screen")
      //await t.switchToMainWindow();
      await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_VehicleAccidentClaimIframe)
      await In_Utility.AssureClaims_SetValue_Utility(People_POM.AssureClaims_People_Txt_Name, EntityName, "Last Name Textbox On People Creation Screen");
      await In_Utility.AssureClaims_ElementWebListSelect_Utility(People_POM.AssureClaims_People_Lst_TypeOfPerson, "Broker", "Type Of People Drop Down On Entity Creation Screen");
      await In_Utility.AssureClaims_SetValue_Utility(People_POM.AssureClaims_People_Txt_FirstName, FirstName, "First Name Textbox On People Creation Screen");
      await In_Utility.AssureClaims_SetValue_Utility(People_POM.AssureClaims_People_Txt_SSN, SSN.toString(), "First Name Textbox On People Creation Screen");
      await Nav_Utility.AssureClaims_ElementClick_Utility(People_POM.AssureClaims_People_Tab_Addresses,"Addresses Tab On People Creation Screen");
      await Nav_Utility.AssureClaims_ElementClick_Utility(People_POM.AssureClaims_People_Btn_AddNewAddress,"Add New Address Button On People Creation Screen");
      await In_Utility.AssureClaims_SetValue_Utility(People_POM.AssureClaims_People_Txt_AddrType,"HADDR","Address type Textbox on People Creation Screen ");
      await t.pressKey('tab');
      await In_Utility.AssureClaims_SetValue_Utility(People_POM.AssureClaims_People_Txt_Addr1,Address1,"Address 1 Textbox On People Creation Screen");
      await In_Utility.AssureClaims_SetValue_Utility(People_POM.AssureClaims_People_Txt_Addr2,Address2,"Address 2 Textbox On People Creation Screen");
      await In_Utility.AssureClaims_SetValue_Utility(People_POM.AssureClaims_People_Txt_Addr3,Address3,"Address 3 Textbox On People Creation Screen");
      await In_Utility.AssureClaims_SetValue_Utility(People_POM.AssureClaims_People_Txt_City,City,"City Textbox On People Creation Screen");
       await In_Utility.AssureClaims_SetValue_Utility(People_POM.AssureClaims_MaintPeople_Txt_ZipCode,Zip.toString(),"Zip Code Textbox On People Creation Screen");
      await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Button On Address PopUp");
     // await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Entity Creation Screen");
      await Nav_Utility.AssureClaims_ElementClick_Utility(People_POM.AssureClaims_People_Btn_EditAddress,"Edit New Address Button On People Creation Screen");
      FetchStrAddress1FromTransaction = await Verify_Utility.AssureClaims_AttributeFetch_Utility(People_POM.AssureClaims_People_Txt_Addr1,"value");
      console.log(FetchStrAddress1FromTransaction.yellow+"Is Feteched From Address1 From People In Transaction Screen");
      FetchStrCityFromTransaction = await Verify_Utility.AssureClaims_AttributeFetch_Utility(People_POM.AssureClaims_People_Txt_City,"value");
      console.log(FetchStrCityFromTransaction.yellow+"Is Feteched From city From People In Transaction Screen");
      FetchStrZipCodeFromTransaction = await Verify_Utility.AssureClaims_AttributeFetch_Utility(People_POM.AssureClaims_MaintPeople_Txt_ZipCode,"value");
      console.log(FetchStrZipCodeFromTransaction.yellow+"Is Feteched From Zip Code From People In Transaction Screen");
      await Nav_Utility.AssureClaims_ElementClick_Utility(People_POM.AssureClaims_People_Btn_Close,"Close Button On Address Tab Creation Screen");
      await Nav_Utility.AssureClaims_ElementClick_Utility(People_POM.AssureClaims_People_Tab_Entity,"Addresses Tab On People Creation Screen");
      FetchStrSSNFromTransaction = await Verify_Utility.AssureClaims_AttributeFetch_Utility(People_POM.AssureClaims_People_Txt_SSN,"value");
      console.log(FetchStrSSNFromTransaction.yellow+"Is Feteched From SSN Number From People In Transaction Screen");
      FetchStrFirstNameFromTransaction = await Verify_Utility.AssureClaims_AttributeFetch_Utility(People_POM.AssureClaims_People_Txt_FirstName,"value");
      console.log(FetchStrFirstNameFromTransaction.yellow+"Is Feteched From Last Name From People In Transaction Screen");
      FetchStrLastNameFromTransaction = await Verify_Utility.AssureClaims_AttributeFetch_Utility(People_POM.AssureClaims_People_Txt_Name,"value");
      console.log(FetchStrLastNameFromTransaction.yellow +"Is Feteched From Last Name From People In Transaction Screen")
      await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Entity Creation Screen");
    
   await t.switchToMainWindow();
   await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
          await t.wait(4000)   
      await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_TransactionDetail,"Transaction Detail Tab On Payment Creation Screen")
      await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_AddNewFunds,"Add New Funds Button On Payment Creation Screen")
      await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType,"Transaction Type List On Funds Split Detail Screen")
      await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Lst_TransactionType.find('option').withText('EXF Expert Witness Fees'),"Transaction Type Value On Funds Split Detail Screen")
      
      await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_FundsSplitDetails_Txt_Amount,"10","Transaction Amount On Funds Split Detail Screen")
      await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_FundsSplitDetails_Btn_Save,"Save Button On Funds Split Detail Screen")
      await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_Transaction,"Transaction Tab On Payment Creation Screen")
      
     // await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Payment_FinalTransaction_Save,"save transaction")
      await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Payment Creation Screen");
      await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Payment Creation Screen");
     
      await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Tab_Transaction,"Transaction Tab On Payment Creation Screen")
      
      await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_FirstNameInTransactionScreen, FetchStrFirstNameFromTransaction, " Fetch FirstName From Transaction Creation Screen");
  
      await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_Address1InTransactionScreen, FetchStrAddress1FromTransaction, " Fetch Address1 From Transaction Creation Screen");
  
      await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_CityInTransactionScreen, FetchStrCityFromTransaction, " Fetch City From Transaction Creation Screen");
  
      await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ZipCodeInTransactionScreen, FetchStrZipCodeFromTransaction, " Fetch ZipCode From Transaction Creation Screen");
      await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_LastName, FetchStrLastNameFromTransaction, " Fetch LastName From Transaction Screen");
      FetchStrLastNameFromTransactionPayee = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_LastName,"value");
      console.log(FetchStrLastNameFromTransactionPayee.yellow+"Is Fetched From Last Name From Transaction Screen ")
  
      await Generic_Utility.AssureClaims_Generic_ZoneSwitching("Maintenance");
      await t.setNativeDialogHandler(() => true);
      await t.eval(() => location.reload(true));
      await t.wait(10000);
      //Zone Switched to Maintenance
  
      await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Search");
      await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Search_Entity_Label_MenuOption, "Entity Menu");
      await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Generic_EntitySearchFrame);
      await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_Search_Txt_EntityLastName,FetchStrLastNameFromTransactionPayee,"Last Name In Entity Search Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Search_Btn_SubmitQuery,"SubmitQuery")
        await t.switchToMainWindow();
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Generic_EntitySearchLinkFrame);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_Search_Lnk_LastName.withText('Broker'),"Type link")
        await t.wait(10000);
        await t.switchToMainWindow();
        //Created Vehicle is Searched From Maintenance
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Generic_PeopleAfterSearchFrame);
        await Verify_Utility.AssureClaims_VerifyElementValue_Utility(People_POM.AssureClaims_People_Txt_FirstName, FetchStrFirstNameFromTransaction, "First Name In People Creation Screen");
        await Verify_Utility.AssureClaims_VerifyElementValue_Utility(People_POM.AssureClaims_People_Txt_Name, FetchStrLastNameFromTransactionPayee, "Last Name In People Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(People_POM.AssureClaims_People_Tab_Addresses,"Addresses Tab On People Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(People_POM.AssureClaims_People_Btn_EditAddress,"Edit New Address Button On People Creation Screen");
        await Verify_Utility.AssureClaims_VerifyElementValue_Utility(People_POM.AssureClaims_People_Txt_Addr1, FetchStrAddress1FromTransaction,"Address1 In People Creation Screen");
        await Verify_Utility.AssureClaims_VerifyElementValue_Utility(People_POM.AssureClaims_People_Txt_City, FetchStrCityFromTransaction,"City In People Creation Screen");
        await Verify_Utility.AssureClaims_VerifyElementValue_Utility(People_POM.AssureClaims_MaintPeople_Txt_ZipCode, FetchStrZipCodeFromTransaction,"Zip Code In People Creation Screen");
    
  })
  })
