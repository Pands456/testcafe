import { Selector,Role } from 'testcafe';
import { createTestCafe } from 'testcafe';
import Colors from 'colors'
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import Input_Utility from '../Functional_Utilities/Input_Utility'
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import POM_Home from '../Functional_POM/POM_Home'; 
import Verification_Utility from '../Functional_Utilities/Verification_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import POM_ClearCheck from '../Functional_POM/POM_ClearCheck';
import POM_FinancialReserves from '../Functional_POM/POM_FinancialReserves';
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';
import POM_UnClearCheck from '../Functional_POM/POM_UnClearCheck';
import POM_ResetPrintedCheck from '../Functional_POM/POM_ResetPrintedCheck';
import POM_Void from '../Functional_POM/POM_Void';
import Maintenance_Functionality_Utility from '../Functional_Utilities/Maintenance_Functionality_Utility';
import POM_GeneralSystemParameter from '../Functional_POM/POM_GeneralSystemParameter';
import POM_Search from '../Functional_POM/POM_Search'
const Maint_Utility = new Maintenance_Functionality_Utility();
const VoidCheck_POM = new POM_Void();
const ResetPrintedCheck_POM = new POM_ResetPrintedCheck();
const UnClearCheck_POM = new POM_UnClearCheck();
const Payment_POM = new POM_PaymentsCollections();
const Reserve_Utility = new POM_FinancialReserves();
const GenSysPar_POM = new POM_GeneralSystemParameter();
const Search_POM = new POM_Search();
const DataIUT = require('../DataFiles/DataIUT.json');
const Home_POM = new POM_Home();
const In_Utility = new Input_Utility();
const Nav_Utility = new Navigation_Utility();
const Verify_Utility = new Verification_Utility();
const Verification_Msg = new POM_VerificationMessage();
const Generic_Utility = new GenericUsages_Utility();
const Function_Utility = new Functionality_Utility();
const ClearCheck_POM = new POM_ClearCheck();

var faker = require('faker');


DataIUT.forEach(data => {
  fixture `Smoke_Funds`.beforeEach(async t => {
          await t.wait(4000)
          await t.navigateTo(data.URL)
          await t.maximizeWindow()    
});
    
    //=======================================Global Variables Start Here====================================================
    var StrClaimNumber
    var StrControlNumberReset
    var StrControlNumberPaymentVoid
    var StrControlNumberFundsVoid
    var StrControlNumberClearOrphan
    var StrControlNumberClearPayment
    var StrControlNumberCollection
    var LastName
    var StrBankAccountName1
    var StrControlNumberUnClearCollection
    var StrControlNumberUnClearPayment
    var StrControlNumberFinalPayment
    var StrControlNumberCombinedPayment
    var StrControlNumberFundsUnclear
 
    //=======================================Global Variables End Here======================================================

  test('Entity Creation From Maintenance_Test_01', async t => { 
      console.log("Entity Creation From Maintenance_Test_01 Started".rainbow);
      await t.wait(10000)
      console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
      await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Maintenance')
      await t.wait(5000)
      console.log("Login Into Application->Maintenance!!".green)

   //===============================================Entity Maintenance Start Here=================================================
     console.log("AssureClaims_MaintenanceAddNewEntity_Utility Function is Called To Create Entity".yellow);
     LastName = await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Utility("Entity", data.EntityType, "SSN","");
     console.log("New Entity is Created with Last Name: ".green+LastName);
    //New Entity Is Created
  //=================================================Entity Maintenance End Here===============================================
   
});
  
  test('Bank With CheckStock Creation_Test_02', async t => {
    //=================================================BankAccount+CheckStock Creation Start Here================================
    var AccountNo=Generic_Utility.AssureClaims_RandomNumberGeneration_Utility(5);   
    var BankLastName = faker.name.lastName();
        var Address1= faker.address.streetName();
        var Address2= faker.address.streetAddress();
        var City = faker.address.city();
        var ZipCode = faker.random.number({min:10000, max:99999});
        var AccountName=faker.name.lastName();
        var NextCheck=faker.random.number({min:1, max:9999});
        // Local Variables

        console.log("Bank With CheckStock Creation_Test_02 Started\n".rainbow);
        await t.wait(10000)
        await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
        console.log(`Login Into Application->Claims`)
        //Login Into Application with User
        //------------------------------------------BankAccount Creation------------------------------------------------------------
        console.log("AssureClaims_BankAccount_AddEdit_Utility Function is Called To Create BankAccount".yellow); 
        StrBankAccountName1=await Function_Utility.AssureClaims_BankAccount_AddEdit_Utility('Create',BankLastName,Address1,Address2,data.Country,data.State,
        City,ZipCode,(await AccountNo).toString(),AccountName,data.AccountType,NextCheck)
        
        //------------------------------Check Stocks Creation -----------------------------------------------------------------------
        var CheckStockCreation_Txt_StockName = "Stock_"+faker.name.lastName();
        console.log("AssureClaims_BankAccount_CheckStocks_Utility Function is Called To Create BankAccount_CheckStocks".yellow); 
        await Function_Utility.AssureClaims_BankAccount_CheckStocks_Utility(CheckStockCreation_Txt_StockName,"Arial","6")
        console.log("Bank Account With Check Stock Has Been Created".yellow); 
        //Bank Account With Check Stock Has Been Created
        //====================================================BankAccount+CheckStock Creation End Here=====================================
  });
  test('GeneralClaim And Reserve Creation Test_03', async t => {
    console.log("GeneralClaim And Reserve Creation_Test_03 Started".rainbow);
    await t.wait(10000)
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
    console.log(`Login Into Application->Claims`)
    //Login Into Application with User    
    //====================================================General Claim Creation Start Here============================================
        var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
        console.log("AssureClaims_GeneralClaimCreation Function is Called To Create GeneralClaim".yellow);
        StrClaimNumber = await Function_Utility.AssureClaims_GeneralClaimCreation(d,d,data.ClaimStatus,data.GCClaimType,data.Department,data.GCPolicyLOB);
        console.log("New ClaimNumber is Created with ID: ".green+StrClaimNumber);
        //New GeneralClaim Is Created
        //=================================================General Claim Creation End Here================================================
        //==================================================Reserve Creation Started Here=====================================================
        await t.switchToMainWindow();
        await t.wait(3000)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
        await t.wait(3000)
        console.log("AssureClaims_Reserve_Utility Function is Called To Create Reserve ".yellow);
        await Function_Utility.AssureClaims_Reserve_Utility(data.ReserveType,data.ReserveAmount,data.ReserveStatus)
        console.log("New Reserve is Created");
        //New Reserve Is Created
        //==================================================Reserve Creation End Here=====================================================
   
});
  
   
test('Void Payment And Orphan Transaction Test_04', async t => {
      console.log("Void Payment And Orphan Transaction Test_04 Started".rainbow);   
      await t.wait(10000)
      await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
      console.log(`Login Into Application->Claims`)
      //Login Into Application with User
  //==========================================VoidCheck Start Here======================================================================
   var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
   var checknumberForVoid = faker.random.number({min: 10000, max: 99999});
   var checknumberVoidOrphan = faker.random.number({min: 10000, max: 99999});
  //-------------------------------------------Search For Claim---------------------------------------------------------
  await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber)
   //Search Is Done
    await t.switchToMainWindow();
    await t.wait(3000)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
    await t.wait(3000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
     //-----------------------------------Payment Creation-----------------------------------------------------   
    console.log("AssureClaims_PaymentCorpAddition_Utility Function is Called To Create Reserve ".yellow);
    await Function_Utility.AssureClaims_PaymentCorpAddition_Utility(StrBankAccountName1,data.PayeeType,LastName,data.ReserveType,data.TransactionType,data.PaymentAmount)
    console.log("New Payment is Createdr");
    //New New Payment Is Created
    await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_CheckStatus,data.CheckStatusRReleased, "CheckStatus TextBox");
    //Check Status Released Verified
    await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_CheckNumber,checknumberForVoid.toString(),"Text CheckNumber")
    await t.wait(3000)
    await t.pressKey('tab')
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Ok,"Click Ok Payment Creation Screen")
    await t.wait(2000)
    await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_CheckStatus,data.CheckStatusPPrinted, "CheckStatus TextBox");
    //Check Status Printed Verified
    StrControlNumberPaymentVoid = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ControlNumber,"value");
    //Fetched Control Number
    await t.switchToMainWindow();
    //-----------------------------------Payment Creation-----------------------------------------------------   
    
    //----------------------------------------Orphan Transaction Creation--------------------------------------
       console.log("AssureClaims_Funds_Transaction_Creation Function is Called To Create Reserve ".yellow);
       await Function_Utility.AssureClaims_Funds_Transaction_Creation("NA","NA","NA","NA","NA",StrBankAccountName1,data.PayeeType,LastName,data.ReserveType,data.TransactionType,data.PaymentAmount)
      console.log("Funds Transaction is Createdr");
      //New Collection Is Created
      await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_CheckStatus,data.CheckStatusRReleased, "CheckStatus TextBox");
      //Orphan Transaction Status Released Verified
      await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_CheckNumber,checknumberVoidOrphan.toString(),"Text CheckNumberA")
      await t.wait(3000)
      await t.pressKey('tab')
   
      await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Ok,"Click Ok Payment Creation Screen")
      await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_CheckStatus,data.CheckStatusPPrinted, "CheckStatus TextBox");
      //Orphan Transaction Status Printed Verified
      StrControlNumberFundsVoid = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ControlNumber,"value");
      //Fetched Control Number
      await t.switchToMainWindow();
    //----------------------------------------Orphan Transaction Creation--------------------------------------
    //-------------------------------------- void Payment & Orphan Transaction -------------------------------------------------
    var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Funds:Void Checks");
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_VoidCheck_FundsIframe);
    await In_Utility.AssureClaims_SetValue_Utility(VoidCheck_POM.AssureClaims_Funds_Txt_Check_From_Date,d,"Text Check From Date")
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(VoidCheck_POM.AssureClaims_Funds_Lst_Check_Filter_By_Bank_Account,StrBankAccountName1,"PaymentCollection_Lst_Filter_By_Bank_Account On Payment Creation Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(VoidCheck_POM.AssureClaims_Funds_Chk_IncludeCollections,"Check Box ClearCheck Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(VoidCheck_POM.AssureClaims_Funds_Btn_Refresh,"Refersh Button on Funds Reset Printed Check Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(VoidCheck_POM.AssureClaims_Funds_gridwindows,"Selected Grid Window On Funds Reset Printed Check Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(VoidCheck_POM.AssureClaims_Funds_Btn_VoidCleared,"Mark As Released Button On Funds Reset Printed Check Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Ok,"Click Ok Conform Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(VoidCheck_POM.AssureClaims_Funds_Chk_Checks_Not_Attached_to_Claims,"Check Box ClearCheck Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(VoidCheck_POM.AssureClaims_Funds_Btn_Refresh,"Refersh Button")
    await Nav_Utility.AssureClaims_ElementClick_Utility(VoidCheck_POM.AssureClaims_Funds_gridwindows,"Grid Window Selected")
    await Nav_Utility.AssureClaims_ElementClick_Utility(VoidCheck_POM.AssureClaims_Funds_Btn_VoidCleared,"Clicked On Void Checks Button")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Ok,"Click Ok Conform Screen")
});

test('Verification Of Void Date On Transaction History Test_05', async t => {
  console.log("Verification Of Void Date On Transaction History Test_05 Started".rainbow); 
  //Verification of void date On payment On transaction History Screen
  await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
  console.log(`Login Into Application->Claims`)
  //Login Into Application with User
  var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
//-------------------------------------------Search For Claim---------------------------------------------------------
await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber)
//Search Is Done
await t.switchToMainWindow();
await t.wait(3000)
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
await t.wait(3000)
//Search Is Completed

await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Reserve_History, "Reserve History")
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_TransactionHistory_ClaimGCIframe);
const header6 = ["Control #","Void?"]
const val6 = [StrControlNumberPaymentVoid,d]
await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrControlNumberPaymentVoid,'Transaction grid view',header6,val6);
await Nav_Utility.AssureClaims_Generic_WebLinkClick_Utility(StrControlNumberPaymentVoid, "Clicked On Control Number")
await t.switchToMainWindow();
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe0);
await Verify_Utility.AssureClaims_CheckedUncheckedStateVerification_Utility(Payment_POM.AssureClaims_PaymentCollection_Chk_voidCheck,'Checked',"Void CheckBox");
});

test('Verification Of Void Date On Orphan Transaction _Test_06', async t => {
console.log("Verification Of Void Date On orphan Transaction".rainbow); 
//Verification of void date On Orphan Transaction On transaction History Screen
await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
console.log(`Login Into Application->Claims`)
//Login Into Application with User
await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Search");
await Nav_Utility.AssureClaims_ElementClick_Utility(Search_POM.AssureClaims_Search_Funds_Label_MenuOption, "Funds Menu");
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Search_FundsIframe);
await t.wait(3000)
await In_Utility.AssureClaims_SetValue_Utility(Search_POM.AssureClaims_Search_Funds_Txt_CheckControlnumber,StrControlNumberFundsVoid,"Typing Claim Number")
console.log("AssureClaims_Search Function is Called To Create Reserve ".yellow);
await Function_Utility.AssureClaims_Search()
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Search_Funds_PaymentIframe);
await Nav_Utility.AssureClaims_ElementClick_Utility(Search_POM.AssureClaims_Search_Lnk_ClaimNumber.withText(StrControlNumberFundsVoid),"click link ControlNumber")
console.log("Search is Completed");
await t.switchToMainWindow();
await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload,"Reload Button On Top Of The Screen")
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Funds_Transaction_ClaimGCIframe);
await t.wait(4000)
await Verify_Utility.AssureClaims_CheckedUncheckedStateVerification_Utility(Payment_POM.AssureClaims_PaymentCollection_Chk_voidCheck,'Checked',"Void CheckBox");
});

test('Reset Printed Check Test_07', async t => {
  console.log("Reset Printed Check Test_07 Started".rainbow); 
  await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
  console.log(`Login Into Application->Claims`)
  //Login Into Application with User
  //===========================================Reset Printed Check Start Here===============================================
  var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
 var checknumberForReset = faker.random.number({min: 10000, max: 99999});
  //-------------------------------------------Search For Claim-------------------------------------------------------------
  await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber)
//Search Is Done
await t.switchToMainWindow();
await t.wait(3000)
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
await t.wait(3000)
//Search Is Completed
await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
//---------------------------------------------Payment creation--------------------------------------------------------------
await Function_Utility.AssureClaims_PaymentCorpAddition_Utility(StrBankAccountName1,data.PayeeType,LastName,data.ReserveType,data.TransactionType,data.PaymentAmount)
console.log("New Payment is Createdr");
//New New Payment Is Created
await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_CheckStatus,data.CheckStatusRReleased, "CheckStatus TextBox");
//Check Status Released Verified
await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_CheckNumber,checknumberForReset.toString(),"Text CheckNumber")
await t.wait(3000)
await t.pressKey('tab')
await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Ok,"Click Ok Payment Creation Screen")
await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_CheckStatus,data.CheckStatusPPrinted, "CheckStatus TextBox");
//Check Status Printed Verified
StrControlNumberReset = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ControlNumber,"value");
//Fetched Control Number
await t.switchToMainWindow();
//-------------------------------------ResetPrintedCheck-------------------------------------------------
   await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Funds:Reset Printed Check");
   await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_ResetPrintedCheck_FundsIframe);
   await In_Utility.AssureClaims_SetValue_Utility(ResetPrintedCheck_POM.AssureClaims_Funds_Txt_Check_From_Date,d,"Text Check From Date")
   await t.wait(3000)
   await In_Utility.AssureClaims_ElementWebListSelect_Utility(ResetPrintedCheck_POM.AssureClaims_Funds_Lst_Check_Filter_By_Bank_Account,StrBankAccountName1,"PaymentCollection_Lst_Filter_By_Bank_Account On Payment Creation Screen")
await Nav_Utility.AssureClaims_ElementClick_Utility(ResetPrintedCheck_POM.AssureClaims_Funds_Btn_Refresh,"Refersh Button on Funds Reset Printed Check Screen")
await Nav_Utility.AssureClaims_ElementClick_Utility(ResetPrintedCheck_POM.AssureClaims_Funds_gridwindows,"Selected Grid Window On Funds Reset Printed Check Screen")
await Nav_Utility.AssureClaims_ElementClick_Utility(ResetPrintedCheck_POM.AssureClaims_Funds_Btn_Mark_As_Released,"Mark As Released Button On Funds Reset Printed Check Screen")
});
//------------------------------------Search Claim For verification Of Reset Printed Check------------------------------------------------------

test('Verification Of ResetPrintedCheck Test_08', async t => {
  console.log("Verification Of Reset Printed Check Test_8 Started".rainbow); 
  await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
  console.log(`Login Into Application->Claims`)
  //Login Into Application with User
  await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber)
  //Searcht Is Created
  await t.switchToMainWindow();
  await t.wait(3000)
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
  await t.wait(3000)
  //Search Is Completed
 
  await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
  await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Reserve_History, "Reserve History")
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_TransactionHistory_ClaimGCIframe);
  const header5 = ["Control #","Cleared?"]
  const val5 = [StrControlNumberReset,"No"]
  await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrControlNumberReset,'Transaction grid view',header5,val5);
await Nav_Utility.AssureClaims_Generic_WebLinkClick_Utility(StrControlNumberReset, "Clicked On Control Number")
await t.switchToMainWindow();
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe0);
await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_CheckStatus,data.CheckStatusRReleased, "CheckStatus TextBox");
});

test('ClearCheck Test_09', async t => {
  //==========================================ClearCheck Start Here===========================================================================
  console.log("Clear Check Started Test_09".rainbow); 
  await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
  console.log(`Login Into Application->Claims`)
  //Login Into Application with User
  var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
  var checknumberForClearCheck = faker.random.number({min: 10000, max: 99999});
  var checknumberForClearCheckCollection = faker.random.number({min: 10000, max: 99999});
  var checknumberForClearCheckOrphan = faker.random.number({min: 10000, max: 99999});
  //--------------------------------------Search For Claim---------------------------------------------------------------------------------------------
  await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber)
  //Searcht Is Created
  await t.switchToMainWindow();
  await t.wait(3000)
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
  await t.wait(3000)
  //Search Is Completed
 
await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
     console.log("AssureClaims_PaymentCorpAddition_Utility Function is Called To Create Reserve ".yellow);
     await Function_Utility.AssureClaims_PaymentCorpAddition_Utility(StrBankAccountName1,data.PayeeType,LastName,data.ReserveType,data.TransactionType,data.PaymentAmount)
     console.log("New Payment is Createdr");
     //New New Payment Is Created
     await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_CheckStatus,data.CheckStatusRReleased, "CheckStatus TextBox");
     //Check Status Released Verified
     await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_CheckNumber,checknumberForClearCheck.toString(),"Text CheckNumber")
     await t.wait(3000)
     await t.pressKey('tab')
     await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Ok,"Click Ok Payment Creation Screen")
     await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_CheckStatus,data.CheckStatusPPrinted, "CheckStatus TextBox");
     //Check Status Printed Verified
     
     StrControlNumberClearPayment = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ControlNumber,"value");
     console.log(StrControlNumberClearPayment.yellow);
      //Fetched Control Number
     await t.switchToMainWindow()
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.dvbreadcrumbscroll,"Breadcrumbs Clicked")
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
     //====================================Collection===============================================================
      console.log("AssureClaims_CollectionCorpAddition_Utility Function is Called To Create Reserve ".yellow);
      await Function_Utility.AssureClaims_CollectionCorpAddition_Utility(StrBankAccountName1,data.PayeeType,LastName,data.ReserveType,data.TransactionType,data.PaymentAmount)
      console.log("New Payment is Createdr");
      await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_CheckNumber,checknumberForClearCheckCollection.toString(),"Text CheckNumberD")
      // deposit Number Entered 
      await t.wait(3000)
      await t.pressKey('tab')
      await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Ok,"Click Ok Payment Creation Screen")
       StrControlNumberCollection = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ControlNumber,"value");
      console.log(StrControlNumberCollection.yellow);
       //Fetched Control Number
     await t.switchToMainWindow();
//----------------------------------------Orphan Transaction Creation--------------------------------------
     console.log("AssureClaims_Funds_Transaction_Creation Function is Called To Create Reserve ".yellow);
     await Function_Utility.AssureClaims_Funds_Transaction_Creation("NA","NA","NA","NA","NA",StrBankAccountName1,data.PayeeType,LastName,data.ReserveType,data.TransactionType,data.PaymentAmount)
    console.log("Funds Transaction is Createdr");
    //New Collection Is Created

    await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_CheckStatus,data.CheckStatusRReleased, "CheckStatus TextBox");
    //Orphan Transaction Status Released Verified
    await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_CheckNumber,checknumberForClearCheckOrphan.toString(),"Text CheckNumberA")
     await t.wait(3000)
     await t.pressKey('tab')
 
     await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Ok,"Click Ok Payment Creation Screen")
     await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_CheckStatus,data.CheckStatusPPrinted, "CheckStatus TextBox");
      //Orphan Transaction Status Printed Verified
     StrControlNumberClearOrphan = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ControlNumber,"value");
      console.log(StrControlNumberClearOrphan.yellow);
       //Fetched Control Number
      await t.switchToMainWindow();
        //----------------------------Funds clear Checks-------------------------------------------------------
        var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Funds:Mark Checks as Cleared");
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_ClearChecks_FundsIframe);
    await In_Utility.AssureClaims_SetValue_Utility(ClearCheck_POM.AssureClaims_Funds_Txt_Check_From_Date,d,"Text Check From Date")
    await t.wait(3000)
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(ClearCheck_POM.AssureClaims_Funds_Lst_Check_Filter_By_Bank_Account,StrBankAccountName1,"PaymentCollection_Lst_Filter_By_Bank_Account On Payment Creation Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(ClearCheck_POM.AssureClaims_Funds_CheckBox_IncludeCollections,"Check Box ClearCheck Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(ClearCheck_POM.AssureClaims_Funds_Btn_Refresh,"Refersh Button")
    await Nav_Utility.AssureClaims_ElementClick_Utility(ClearCheck_POM.AssureClaims_Funds_gridwindows,"Grid Window")
    await Nav_Utility.AssureClaims_ElementClick_Utility(ClearCheck_POM.AssureClaims_Funds_Btn_MarkCleared,"Mark Clear")
    await Nav_Utility.AssureClaims_ElementClick_Utility(ClearCheck_POM.AssureClaims_Funds_CheckBox_Checks_Not_Attached_to_Claims,"Check Box ClearCheck Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(ClearCheck_POM.AssureClaims_Funds_Btn_Refresh,"Refersh Button")
    await Nav_Utility.AssureClaims_ElementClick_Utility(ClearCheck_POM.AssureClaims_Funds_gridwindows,"Grid Window Selected")
    await Nav_Utility.AssureClaims_ElementClick_Utility(ClearCheck_POM.AssureClaims_Funds_Btn_MarkCleared,"Mark Clear")
});

    test('Verification For Clear Check Test_10', async t => {
  console.log("Verification For Clear Check Test_10 Started".rainbow); 
  var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");              
  await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
  console.log(`Login Into Application->Claims`)
  //Login Into Application with User 
  await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber)
  //Searcht Is Created
  await t.switchToMainWindow();
  await t.wait(3000)
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
  await t.wait(3000)
  await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")


    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Reserve_History, "Reserve History")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_TransactionHistory_ClaimGCIframe);
    const header1 = ["Control #","Cleared?"]
    const val1 = [StrControlNumberClearPayment,d]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrControlNumberClearPayment,'Transaction grid view',header1,val1);
    
    const header2 = ["Control #","Cleared?"]
    const val2 = [StrControlNumberCollection,d]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrControlNumberCollection,'Transaction grid view',header2,val2);

    await t.switchToMainWindow();
    await t.wait(3000)
    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Search");
    await Nav_Utility.AssureClaims_ElementClick_Utility(Search_POM.AssureClaims_Search_Funds_Label_MenuOption, "Funds Menu");
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Search_FundsIframe);
    await t.wait(3000)
    
      await In_Utility.AssureClaims_SetValue_Utility(Search_POM.AssureClaims_Search_Funds_Txt_CheckControlnumber,StrControlNumberClearOrphan,"Typing Claim Number")
    console.log("AssureClaims_Search Function is Called To Search Orphan Transaction ".yellow);
    await Function_Utility.AssureClaims_Search()
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Search_Funds_PaymentIframe);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Search_POM.AssureClaims_Search_Lnk_ClaimNumber.withText(StrControlNumberClearOrphan),"click link ControlNumber")
   console.log("Search is Createdr");
   await t.switchToMainWindow();
   await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload,"Reload Button On Top Of The Screen")
   await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Funds_Transaction_ClaimGCIframe);
   await t.wait(4000)

   await Verify_Utility.AssureClaims_CheckedUncheckedStateVerification_Utility(Payment_POM.AssureClaims_PaymentCollection_Chk_Cleared,'Checked',"CheckedCheckBox");
});


test('Un-Clear Check Test_11', async t => {
  //==========================================UnClearCheck Start Here===========================================================================
  console.log("Un-Clear Check Test_11 Started".rainbow); 
  await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
  console.log(`Login Into Application->Claims`)
  //Login Into Application with User 
  await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber)
  //Searcht Is Created
  //--------------------------------------Search For Claim---------------------------------------------------------------------------------------------
    var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    var checknumberForUnClearCheck = faker.random.number({min: 10000, max: 99999});
  var checknumberForUnClearCheckCollection = faker.random.number({min: 10000, max: 99999});
  var checknumberForUnClearCheckOrphan = faker.random.number({min: 10000, max: 99999});
  var checknumberForUnClearCheckFinal = faker.random.number({min: 10000, max: 99999});
  
  await t.switchToMainWindow();
  await t.wait(3000)
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
  await t.wait(3000)
await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
//---------------------------------Payment Creation------------------------------------------------------------
     console.log("AssureClaims_PaymentCorpAddition_Utility Function is Called To Create Reserve ".yellow);
     await Function_Utility.AssureClaims_PaymentCorpAddition_Utility(StrBankAccountName1,data.PayeeType,LastName,data.ReserveType,data.TransactionType,data.PaymentAmount)
     console.log("New Payment is Createdr");
     //New New Payment Is Created
     await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_CheckStatus,data.CheckStatusRReleased, "CheckStatus TextBox");
     //Check Status Released Verified
     await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_CheckNumber,checknumberForUnClearCheck.toString(),"Text CheckNumber")
     await t.wait(3000)
     await t.pressKey('tab')
     await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Ok,"Click Ok Payment Creation Screen")
     //await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_CheckStatus,data.CheckStatusPPrinted, "CheckStatus TextBox");
     //Check Status Printed Verified
     await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Payment_POM.AssureClaims_PaymentCollection_Chk_Cleared,'Check',"Click Cleared Cheack Box On Payment Creation Screen")
       //Check Cleared using Cleared Check Box
       await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Ok,"Click Ok Payment Creation Screen")
     StrControlNumberUnClearPayment = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ControlNumber,"value")
     console.log(StrControlNumberUnClearPayment.yellow);
      //Fetched Control Number
     await t.switchToMainWindow()
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.dvbreadcrumbscroll,"Breadcrumbs Clicked")
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
     //====================================Collection===============================================================
      console.log("AssureClaims_CollectionCorpAddition_Utility Function is Called To Create Collection ".yellow);
      await Function_Utility.AssureClaims_CollectionCorpAddition_Utility(StrBankAccountName1,data.PayeeType,LastName,data.ReserveType,data.TransactionType,data.PaymentAmount)
      console.log("New Payment is Createdr");
      await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_CheckNumber,checknumberForUnClearCheckCollection.toString(),"Text CheckNumberD")
      // deposit Number Entered 
      await t.wait(3000)
      await t.pressKey('tab')
      await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Ok,"Click Ok Payment Creation Screen")
     // await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Payment_POM.AssureClaims_PaymentCollection_Chk_Cleared,'Check',"Click Cleared Cheack Box On Payment Creation Screen")
      //Check Cleared using Cleared Check Box
     // await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Ok,"Click Ok Payment Creation Screen")
       StrControlNumberUnClearCollection = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ControlNumber,"value");
      console.log(StrControlNumberUnClearCollection.yellow);
       //Fetched Control Number
     await t.switchToMainWindow();
//---------------------------------------Payment For Final And Supplemental----------------------------------------------
await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.dvbreadcrumbscroll,"Breadcrumbs Clicked")
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
     console.log("AssureClaims_PaymentCorpAddition_Utility Function is Called To Create Payment ".yellow);
     await Function_Utility.AssureClaims_PaymentCorpAddition_Utility(StrBankAccountName1,data.PayeeType,LastName,data.ReserveType,data.TransactionType,data.PaymentAmount)
     console.log("New Payment is Created");
     //New New Payment Is Created
     await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_CheckStatus,data.CheckStatusRReleased, "CheckStatus TextBox");
     //Check Status Released Verified
     await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Payment_POM.AssureClaims_PaymentCollection_Chk_FinalPayment,'Check',"FinalPayment CheckBox Clicked")
     //FinalPayment CheckBox Clicked
     await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_CheckNumber,checknumberForUnClearCheckFinal.toString(),"Text CheckNumber")
     await t.wait(3000)
     await t.pressKey('tab')
     await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Ok,"Click Ok Payment Creation Screen")
     await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_CheckStatus,data.CheckStatusPPrinted, "CheckStatus TextBox");
     //Check Status Printed Verified
     
     //await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Payment_POM.AssureClaims_PaymentCollection_Chk_Cleared,'Check',"Click Cleared Cheack Box On Payment Creation Screen")
     //Check Cleared using Cleared Check Box
     //await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Ok,"Click Ok Payment Creation Screen")
     StrControlNumberFinalPayment = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ControlNumber,"value");
     console.log(StrControlNumberFinalPayment.yellow);
      //Fetched Control Number
     await t.switchToMainWindow()
       await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.dvbreadcrumbscroll,"Breadcrumbs Clicked")
       await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
       const headerFinal = ["Reserve Type","Status"]
       const valFinal = ["E Expense","C - Closed"]
       await Verify_Utility.AssureClaims_VerifyUXGrid_Utility("E Expense",'Transaction grid view',headerFinal,valFinal);
       //Verification For Reserve is Closed After Making Final Payment

       await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
       //-----------------------------Supplemental Payment Creation -----------------------------------------------
       console.log("AssureClaims_PaymentCorpAddition_Utility Function is Called To Create Supplemental ".yellow);
       await Function_Utility.AssureClaims_PaymentCorpAddition_Utility(StrBankAccountName1,data.PayeeType,LastName,data.ReserveType,data.TransactionType,data.PaymentAmount)
       console.log("New Payment is Createdr");
       //New Supplemental Payment Is Created

      await Verify_Utility.AssureClaims_CheckedUncheckedStateVerification_Utility(Payment_POM.AssureClaims_PaymentCollection_Chk_SupplementalTransaction,'Checked',"Clearc CheckBox");
     //Verification Of Supplemental Transaction Check Box
      await t.switchToMainWindow()
      //----------------------------------------Orphan Transaction Creation--------------------------------------
      console.log("AssureClaims_Funds_Transaction_Creation Function is Called To Create Reserve ".yellow);
      await Function_Utility.AssureClaims_Funds_Transaction_Creation("NA","NA","NA","NA","NA",StrBankAccountName1,data.PayeeType,LastName,data.ReserveType,data.TransactionType,data.PaymentAmount)
      console.log("Funds Transaction is Createdr");
     //New Collection Is Created
     await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_CheckStatus,data.CheckStatusRReleased, "CheckStatus TextBox");
     //Orphan Transaction Status Released Verified
     await In_Utility.AssureClaims_SetValue_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_CheckNumber,checknumberForUnClearCheckOrphan.toString(),"Text CheckNumberA")
      await t.wait(3000)
      await t.pressKey('tab')
  
      await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Ok,"Click Ok Payment Creation Screen")
      await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Payment_POM.AssureClaims_PaymentCollection_CheckStatus,data.CheckStatusPPrinted, "CheckStatus TextBox");
       //Orphan Transaction Status Printed Verified
       await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Payment_POM.AssureClaims_PaymentCollection_Chk_Cleared,'Check',"Click Cleared Cheack Box On Payment Creation Screen")
       //Check Cleared using Cleared Check Box
       await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Ok,"Click Ok Payment Creation Screen")
        StrControlNumberFundsUnclear = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ControlNumber,"value");
        //Fetched Control Number
        await t.switchToMainWindow();
         //----------------------------Clearing Final & Supplemental Payment From Funds-> Mark Check As Clear-------------------------------------------------------
   await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Funds:Mark Checks as Cleared");
   await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_ClearChecks_FundsIframe);
   await In_Utility.AssureClaims_SetValue_Utility(ResetPrintedCheck_POM.AssureClaims_Funds_Txt_Check_From_Date,d,"Text Check From Date")
   await t.wait(3000)
   await In_Utility.AssureClaims_ElementWebListSelect_Utility(ClearCheck_POM.AssureClaims_Funds_Lst_Check_Filter_By_Bank_Account,StrBankAccountName1,"PaymentCollection_Lst_Filter_By_Bank_Account On Payment Creation Screen")
   await Nav_Utility.AssureClaims_ElementClick_Utility(ClearCheck_POM.AssureClaims_Funds_CheckBox_IncludeCollections,"Check Box ClearCheck Screen")
   await Nav_Utility.AssureClaims_ElementClick_Utility(ClearCheck_POM.AssureClaims_Funds_Btn_Refresh,"Refersh Button")
   await Nav_Utility.AssureClaims_ElementClick_Utility(ClearCheck_POM.AssureClaims_Funds_gridwindows,"Grid Window")
   await Nav_Utility.AssureClaims_ElementClick_Utility(ClearCheck_POM.AssureClaims_Funds_Btn_MarkCleared,"Mark Clear")
    await t.switchToMainWindow();

//----------------------------------------Un-Clear Final & Supplemental Payment From Funds-> Un-Clear Checks--------------------------------------------------------------------
        await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Funds:Un-Clear Checks");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_UnClearChecks_FundsIframe);
        await In_Utility.AssureClaims_SetValue_Utility(UnClearCheck_POM.AssureClaims_Funds_Txt_Check_From_Date,d,"Text Check From Date")
        await t.wait(3000)
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(UnClearCheck_POM.AssureClaims_Funds_Lst_Check_Filter_By_Bank_Account,StrBankAccountName1,"PaymentCollection_Lst_Filter_By_Bank_Account On Payment Creation Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(UnClearCheck_POM.AssureClaims_Funds_Chk_IncludeCollections,"Click On Check Box ClearCheck Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(UnClearCheck_POM.AssureClaims_Funds_Btn_Refresh,"Click On Refersh Button")
        await Nav_Utility.AssureClaims_ElementClick_Utility(UnClearCheck_POM.AssureClaims_Funds_gridwindows,"Click On Grid Window")
        await Nav_Utility.AssureClaims_ElementClick_Utility(UnClearCheck_POM.AssureClaims_Funds_Btn_MarkUnClear,"Click On Button Mark UnClear")
        await Nav_Utility.AssureClaims_ElementClick_Utility(UnClearCheck_POM.AssureClaims_Funds_Chk_Checks_Not_Attached_to_Claims,"Click On Check Box ClearCheck Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(UnClearCheck_POM.AssureClaims_Funds_Btn_Refresh,"Refersh Button")
        await Nav_Utility.AssureClaims_ElementClick_Utility(UnClearCheck_POM.AssureClaims_Funds_gridwindows,"Grid Window Selected")
        await Nav_Utility.AssureClaims_ElementClick_Utility(UnClearCheck_POM.AssureClaims_Funds_Btn_MarkUnClear,"Click On Button Mark UnClear")
        await t.switchToMainWindow();

});
test('Verification Of UnClearCheck On Transaction History Test_12', async t => {
  console.log("Verification Of UnClearCheck On Transaction History Test_12 Started".rainbow); 
  await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
  console.log(`Login Into Application->Claims`)
  //Login Into Application with User 
  await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber)
  //Searcht Is Created 
 
await t.switchToMainWindow();
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
await t.wait(3000)
await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")

await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Reserve_History, "Reserve History")
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_TransactionHistory_ClaimGCIframe);
const headerUnClear = ["Control #","Cleared?"]
const valUnclear = [StrControlNumberUnClearPayment,"No"]
await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrControlNumberUnClearPayment,'Transaction grid view',headerUnClear,valUnclear);
//Un-Clear Verification Done On Transaction History
const headerUnClearCollection = ["Control #","Cleared?"]
  const valUnclearCollection = [StrControlNumberUnClearCollection,"No"]
  await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrControlNumberUnClearCollection,'Transaction grid view',headerUnClearCollection,valUnclearCollection); 
  const headerFinalUnClear = ["Control #","Cleared?"]
  const valFinalUnclear = [StrControlNumberFinalPayment,"No"]
  await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrControlNumberFinalPayment,'Transaction grid view',headerFinalUnClear,valFinalUnclear); 

  await t.switchToMainWindow();
  await t.wait(3000)
  await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Search");
  await Nav_Utility.AssureClaims_ElementClick_Utility(Search_POM.AssureClaims_Search_Funds_Label_MenuOption, "Funds Menu");
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Search_FundsIframe);
  await t.wait(3000)
    await In_Utility.AssureClaims_SetValue_Utility(Search_POM.AssureClaims_Search_Funds_Txt_CheckControlnumber,StrControlNumberFundsUnclear,"Typing Claim Number")
  console.log("AssureClaims_Search Function is Called To Create Reserve ".yellow);
  await Function_Utility.AssureClaims_Search()
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Search_Funds_PaymentIframe);
  await Nav_Utility.AssureClaims_ElementClick_Utility(Search_POM.AssureClaims_Search_Lnk_ClaimNumber.withText(StrControlNumberFundsUnclear),"click link ControlNumber")
 console.log("Search is Createdr");
 await t.switchToMainWindow();
 await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload,"Reload Button On Top Of The Screen")
 await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Funds_Transaction_ClaimGCIframe);
 await t.wait(4000)
 await Verify_Utility.AssureClaims_CheckedUncheckedStateVerification_Utility(Payment_POM.AssureClaims_PaymentCollection_Chk_Cleared,'Unchecked',"CheckedCheckBox");
});

test('Verification For Combined Payment Test_13', async t => {
  console.log("Verification For Combined Payment Test_13 Started".rainbow); 
  await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
  console.log(`Login Into Application->Claims`)
  //Login Into Application with User 
  
//--------------------------------------------Combined Payments Setting-----------------------------------------
await t.switchToMainWindow();
console.log("AssureClaims_CombinedPayee_Add_Utility Function is Called To Create CombinedPayment".yellow); 
await Function_Utility.AssureClaims_CombinedPayee_Add_Utility(StrBankAccountName1,LastName,data.CombinedPayInterval)
//Combined Payments Settings Completed
await t.switchToMainWindow();
  await t.wait(3000)

  //--------------------------------------Search For Claim---------------------------------------------------------------------------------------------
  await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber)
  //Searcht Is Created
  await t.switchToMainWindow();
  await t.wait(3000)
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
  await t.wait(3000)
await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
     console.log("AssureClaims_PaymentCorpAddition_Utility Function is Called To Create Reserve ".yellow);
     await Function_Utility.AssureClaims_PaymentCorpAddition_Utility(StrBankAccountName1,data.PayeeType,LastName,data.ReserveType,data.TransactionType,data.PaymentAmount)
     console.log("New Payment is Createdr");
     //New New Payment Is Created
     
     StrControlNumberCombinedPayment = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ControlNumber,"value");
     console.log(StrControlNumberCombinedPayment.yellow);
     await Verify_Utility.AssureClaims_CheckedUncheckedStateVerification_Utility(Payment_POM.AssureClaims_PaymentCollection_Chk_CombinedPayment,'Checked',"Combined Payment CheckBox");
    //Verification Of Combined Payment Check BOX

     await t.switchToMainWindow()
     await t.wait(3000)
     await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.dvbreadcrumbscroll,"Breadcrumbs Clicked")
     await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe);
     await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Reserve_History, "Reserve History")
     await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_TransactionHistory_ClaimGCIframe);
     const headerCombinedPayment = ["Control #","Combined Pay"]
     const valCombinedPayment = [StrControlNumberCombinedPayment,"Yes"]
     await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrControlNumberCombinedPayment,'Transaction grid view',headerCombinedPayment,valCombinedPayment);
     
});
});
