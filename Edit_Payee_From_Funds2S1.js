import { Selector,Role, t } from 'testcafe';
import { createTestCafe } from 'testcafe';
import Colors from 'colors'
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import Input_Utility from '../Functional_Utilities/Input_Utility';
import Verification_Utility from '../Functional_Utilities/Verification_Utility'
import Maintenance_Functionality_Utility from '../Functional_Utilities/Maintenance_Functionality_Utility';
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';
import POM_Home from '../Functional_POM/POM_Home';
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
const Home_POM = new POM_Home();
const People_POM = new POM_People();
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

var FetchStrFirstNameFromTransactionPayee;
var FetchStrAddress1FromTransactionPayee;
var FetchStrCityFromTransactionPayee;
var FetchStrZipCodeFromTransactionPayee;

test("AssureClaims_Maintenance_People_Test_01", async t=>{
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
    await Nav_Utility.AssureClaims_ElementClick_Utility(People_POM.AssureClaims_People_Btn_EditAddress,"Edit New Address Button On Employee Creation Screen");
    FetchStrAddress1 = await Verify_Utility.AssureClaims_AttributeFetch_Utility(People_POM.AssureClaims_People_Txt_Addr1,"value");
    console.log(FetchStrAddress1.yellow);
    FetchStrCity = await Verify_Utility.AssureClaims_AttributeFetch_Utility(People_POM.AssureClaims_People_Txt_City,"value");
    console.log(FetchStrCity.yellow);
    FetchStrZipCode = await Verify_Utility.AssureClaims_AttributeFetch_Utility(People_POM.AssureClaims_MaintPeople_Txt_ZipCode,"value");
    console.log(FetchStrZipCode.yellow);
  })
test('AssureClaims_GCCreation_Test_02', async t => {
      console.log("GeneralClaim Creation_Test_02 Started".rainbow);
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
test('PaymentCreation_For_Scenario1_Test_3', async t => {
      var FirstName =  faker.name.firstName();
      var Address1 = faker.address.streetName();
      var City = faker.address.city();
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
      await Function_Utility.AssureClaims_PaymentCorpAddition_Utility(data.BankAccount, data.PayeeType, LastName, data.ReserveType, data.TransactionType, "10");
      // Payment is Created
      //===========================================================Payment Creation Is Completed Here========================================================================================================================================================================================================================================================================================================
      await t.wait(3000);      
      await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_FirstNameInTransactionScreen, FirstName, " Fetch FirstName From Transaction Creation Screen")
      await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_Address1InTransactionScreen, Address1, " Fetch Address1 From Transaction Creation Screen");
      await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_CityInTransactionScreen, City, " Fetch City From Transaction Creation Screen");
      await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Payment Creation Screen");
      await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Payment Creation Screen");
      FetchStrFirstNameFromTransactionPayee = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_FirstNameInTransactionScreen,"value");
      console.log(FetchStrFirstNameFromTransactionPayee.yellow+"Is Fetched From First Name From Transaction Screen ")
      FetchStrAddress1FromTransactionPayee = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_Address1InTransactionScreen,"value");
      console.log(FetchStrAddress1FromTransactionPayee.yellow+"Is Fetched From Address1 From Transaction Screen ")
      FetchStrCityFromTransactionPayee = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_CityInTransactionScreen,"value");
      console.log(FetchStrCityFromTransactionPayee.yellow+"Is Fetched From City From Transaction Screen ")
      FetchStrZipCodeFromTransactionPayee = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ZipCodeInTransactionScreen,"value");
      console.log(FetchStrZipCodeFromTransactionPayee.yellow+"Is Fetched From ZipCode  From Transaction Screen ")
    })
    test('AssureClaims_Maintenance_Search_Test_04', async t => {
        console.log("Maintenance_Search Creation_Test_04 Started".rainbow);
        await t.wait(10000)
        await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Maintenance')
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
        //Created Entity is Searched From Maintenance
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Generic_PeopleAfterSearchFrame);
        const VerifyTextOf_FirstName_NotExist = People_POM.AssureClaims_People_Txt_FirstName.textContent;
        await t
              .expect(VerifyTextOf_FirstName_NotExist).notContains('FetchStrFirstNameFromTransactionPayee');
        console.log("Verification Of First Name Not Exist In Entity")
              const VerifyTextOf_Address1_NotExist = People_POM.AssureClaims_People_Txt_Addr1.textContent;
        await t
              .expect(VerifyTextOf_Address1_NotExist).notContains('FetchStrAddress1FromTransactionPayee');
        console.log("Verification Of Address1 Not Exist In Entity")
              const VerifyTextOf_City_NotExist = People_POM.AssureClaims_People_Txt_City.textContent;
        await t
              .expect(VerifyTextOf_City_NotExist).notContains('FetchStrCityFromTransactionPayee');
              console.log("Verification Of City Not Exist In Entity")
        })
})