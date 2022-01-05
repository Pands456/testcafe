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
import POM_FinancialReserves from '../Functional_POM/POM_FinancialReserves';
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';
import POM_Search from '../Functional_POM/POM_Search'
import POM_BankAccount from '../Functional_POM/POM_BankAccount';
import POM_GeneralSystemParameter from '../Functional_POM/POM_GeneralSystemParameter';
const GenSysPar_POM=new POM_GeneralSystemParameter();
const BankAccount_POM = new POM_BankAccount();
const Payment_POM = new POM_PaymentsCollections();
const Reserve_Utility = new POM_FinancialReserves();
//const GenSysPar_POM = new POM_GeneralSystemParameter();
const Search_POM = new POM_Search();
const DataIUT = require('../DataFiles/DataBurp.json');
const Home_POM = new POM_Home();
const In_Utility = new Input_Utility();
const Nav_Utility = new Navigation_Utility();
const Verify_Utility = new Verification_Utility();
const Verification_Msg = new POM_VerificationMessage();
const Generic_Utility = new GenericUsages_Utility();
const Function_Utility = new Functionality_Utility();

var faker = require('faker');


DataIUT.forEach(data => {
  fixture `Smoke_BANKACCOUNTRECONCILIATION`.beforeEach(async t => {
          await t.wait(4000)
          await t.navigateTo(data.URL)
          await t.maximizeWindow()    
});

var StrBankAccountName1
var StrSubBankAccountName
var StrSubBankAccountName1
var StrSubBankAccountNameTo5Deposit
var StrControlNumberDeposit
var StrControlNumberMoney_Market_Deposit
var StrControlNumberAdjustment
var StrControlNumberMoney_Market_Adjustment
var StrControlNumberMoney_Market_Transfer
var StrControlNumberDeposit1
var StrControlNumberDeposit2

test('Bank With CheckStock_SubBankAccount_Deposit Creation_Test_02', async t => {
    //=================================================BankAccount+CheckStock Creation Start Here================================
    var AccountNo=Generic_Utility.AssureClaims_RandomNumberGeneration_Utility(5);   
    var BankLastName = "Bank_"+faker.name.lastName();
        var Address1= faker.address.streetName();
        var Address2= faker.address.streetAddress();
        var City = faker.address.city();
        var ZipCode = faker.random.number({min:10000, max:99999});
        var AccountName= "Bank_"+faker.name.lastName();
        var NextCheck=faker.random.number({min:1, max:99999});
        var SubBankAccountName = "SubBank_"+faker.name.lastName();
        var SubBankAccountName1 = "SubBank_"+faker.name.lastName();
        // Local Variable Declaration

        console.log("Bank With CheckStock_SubBankAccount_Deposit Creation_Test_01 Started\n".rainbow);
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
        console.log("Bank Account With Check Stock Has Been Created: ".yellow+StrBankAccountName1);
        //Bank Account With Check Stock Has Been Created
        await t.switchToMainWindow()
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.dvbreadcrumbscroll,"Breadcrumbs ")
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_BankAccountIframe);
        //====================================================BankAccount+CheckStock Creation End Here=====================================
 //Sub Bank Account Start here
console.log("AssureClaims_BankAccount_SubBankAccount2_Utility Function is Called To Create BankAccount_SubBankAccount".yellow); 
await Function_Utility.AssureClaims_BankAccount_SubBankAccount_Utility(SubBankAccountName1,(await AccountNo).toString(),CheckStockCreation_Txt_StockName)
StrSubBankAccountNameTo5Deposit = await Verify_Utility.AssureClaims_AttributeFetch_Utility(BankAccount_POM.AssureClaims_BankAccount_SubBankAccount_Txt_SubAccountName,"value");
console.log("Bank Account With SubBankAccount 2 Has Been Created :".yellow+StrSubBankAccountName1); 
//Bank Account With Check Stock Has Been Created
await t.switchToMainWindow()
await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.dvbreadcrumbscroll,"Breadcrumbs ")
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_BankAccountIframe)
//Sub Bank Account End Here
//Deposit Start Here

var TransactionDateLess =await Generic_Utility.AssureClaims_FuturePastDateInfo_Utility(0,-1,-1, "MM/DD/YYYY")
console.log("AssureClaims_BankAccount_Deposit_Utility Function is Called To Create BankAccount_Deposit".yellow); 
await Function_Utility.AssureClaims_BankAccount_Deposit_Utility(TransactionDateLess,"NA",StrSubBankAccountNameTo5Deposit,"50")
console.log(" Deposit Has Been Created on the SubBankAccount".yellow)
  await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Creation OF BankAccount Screen");
await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " BankAccount Creation Screen");
StrControlNumberDeposit = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ControlNumber,"value");
//Fetched Control Number
console.log("ControlNumber Of Deposit : ".green+StrControlNumberDeposit);

await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Btn_LookUP,"Look Up Clicked on Deposit Screen")
await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Btn_AddNew,"Add New Clicked on Deposit Screen")
//Adjustment
await In_Utility.AssureClaims_SetValue_Utility(BankAccount_POM.AssureClaims_BankAccount_Deposit_Txt_DateOfTransaction,TransactionDateLess,"Date Of Transaction")
await In_Utility.AssureClaims_ElementWebListSelect_Utility(BankAccount_POM.AssureClaims_BankAccount_Lst_DepositTransactionType,'Adjustment',"Adjustment is Selected From the Transaction Type DropDown")
await In_Utility.AssureClaims_ElementWebListSelect_Utility(BankAccount_POM.AssureClaims_BankAccount_Deposit_Txt_BankORSubBankAccount,StrSubBankAccountNameTo5Deposit,"Check stock is Selected From the Checkstock DropDown")
await In_Utility.AssureClaims_SetValue_Utility(BankAccount_POM.AssureClaims_BankAccount_Deposit_Txt_Amount,"70","Amount TextBox On Deposit screen")
await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Creation OF BankAccount Screen");
await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " BankAccount Creation Screen");
StrControlNumberAdjustment = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ControlNumber,"value");
 //Fetched Control Number
 console.log("ControlNumber Of Adjustment : ".green+StrControlNumberAdjustment);

await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Btn_LookUP,"Look Up Clicked on Deposit Screen")
await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Btn_AddNew,"Add New Clicked on Deposit Screen")
await In_Utility.AssureClaims_SetValue_Utility(BankAccount_POM.AssureClaims_BankAccount_Deposit_Txt_DateOfTransaction,TransactionDateLess,"Date Of Transaction")
await In_Utility.AssureClaims_ElementWebListSelect_Utility(BankAccount_POM.AssureClaims_BankAccount_Lst_DepositTransactionType,'Money Market Deposit',"Money Market Deposit is Selected From the Transaction Type DropDown")
await In_Utility.AssureClaims_ElementWebListSelect_Utility(BankAccount_POM.AssureClaims_BankAccount_Deposit_Txt_BankORSubBankAccount,StrSubBankAccountNameTo5Deposit,"Check stock is Selected From the Checkstock DropDown")
await In_Utility.AssureClaims_SetValue_Utility(BankAccount_POM.AssureClaims_BankAccount_Deposit_Txt_Amount,"80","Amount TextBox On Deposit screen")
await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Creation OF BankAccount Screen");
await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " BankAccount Creation Screen");
StrControlNumberMoney_Market_Deposit = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ControlNumber,"value");
 //Fetched Control Number
 console.log("ControlNumber Of Money_Market_Deposit : ".green+StrControlNumberMoney_Market_Deposit);

await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Btn_LookUP,"Look Up Clicked on Deposit Screen")
await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Btn_AddNew,"Add New Clicked on Deposit Screen")
await In_Utility.AssureClaims_SetValue_Utility(BankAccount_POM.AssureClaims_BankAccount_Deposit_Txt_DateOfTransaction,TransactionDateLess,"Date Of Transaction")
await In_Utility.AssureClaims_ElementWebListSelect_Utility(BankAccount_POM.AssureClaims_BankAccount_Lst_DepositTransactionType,'Money Market Transfer',"Money Market Transfer is Selected From the Transaction Type DropDown")
await In_Utility.AssureClaims_ElementWebListSelect_Utility(BankAccount_POM.AssureClaims_BankAccount_Deposit_Txt_BankORSubBankAccount,StrSubBankAccountNameTo5Deposit,"Check stock is Selected From the Checkstock DropDown")
await In_Utility.AssureClaims_SetValue_Utility(BankAccount_POM.AssureClaims_BankAccount_Deposit_Txt_Amount,"90","Amount TextBox On Deposit screen")
await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Creation OF BankAccount Screen");
await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " BankAccount Creation Screen");
StrControlNumberMoney_Market_Transfer = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ControlNumber,"value");
 //Fetched Control Number
 console.log("ControlNumber Of  Money_Market_Transfer : ".green+StrControlNumberMoney_Market_Transfer);

await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Btn_LookUP,"Look Up Clicked on Deposit Screen")
await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Btn_AddNew,"Add New Clicked on Deposit Screen")
await In_Utility.AssureClaims_SetValue_Utility(BankAccount_POM.AssureClaims_BankAccount_Deposit_Txt_DateOfTransaction,TransactionDateLess,"Date Of Transaction")
await In_Utility.AssureClaims_ElementWebListSelect_Utility(BankAccount_POM.AssureClaims_BankAccount_Lst_DepositTransactionType,'Money Market Adjustment',"Money Market Adjustment is Selected From the Transaction Type DropDown")
await In_Utility.AssureClaims_ElementWebListSelect_Utility(BankAccount_POM.AssureClaims_BankAccount_Deposit_Txt_BankORSubBankAccount,StrSubBankAccountNameTo5Deposit,"Check stock is Selected From the Checkstock DropDown")
await In_Utility.AssureClaims_SetValue_Utility(BankAccount_POM.AssureClaims_BankAccount_Deposit_Txt_Amount,"100","Amount TextBox On Deposit screen")
await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Creation OF BankAccount Screen");
await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " BankAccount Creation Screen");
StrControlNumberMoney_Market_Adjustment = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ControlNumber,"value");
 //Fetched Control Number
 console.log("ControlNumber Of Control Number Money_Market_Adjustment : ".green+StrControlNumberMoney_Market_Adjustment);

await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Btn_ClearMultipleDeposits,"Clicked on ClearMultipleDeposits on Deposit")

await In_Utility.AssureClaims_SetValue_Utility(BankAccount_POM.AssureClaims_BankAccount_Txt_EnterToSearch,StrControlNumberDeposit," Typed Text  On Enter To Search On Deposit screen")
//================================Deposit=====================================
const VerifyDepositControlNumber = BankAccount_POM.AssureClaims_BankAccount_Txt_VerifyControlNumberInClearMultipleDeposit.withText(StrControlNumberDeposit).with({ visibilityCheck: true })
await t.expect(VerifyDepositControlNumber.exists).ok('', { timeout: 20000 })
console.log("Verification Of Control Number Of Deposit Is Successful".green)
await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Txt_EnterToSearch," Clicked On Enter To Search On Deposit Screen")
await t.pressKey('ctrl+a delete')
//===================================Adjustment==================================
await In_Utility.AssureClaims_SetValue_Utility(BankAccount_POM.AssureClaims_BankAccount_Txt_EnterToSearch,StrControlNumberAdjustment," Typed Text  On Enter To Search On Deposit screen")
const VerifyAdjustmentControlNumber = BankAccount_POM.AssureClaims_BankAccount_Txt_VerifyControlNumberInClearMultipleDeposit.withText(StrControlNumberAdjustment).with({ visibilityCheck: true })
await t.expect(VerifyAdjustmentControlNumber.exists).ok('', { timeout: 20000 })
console.log("Verification Of Control Number Of Adjustment Is Successful".green)
await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Txt_EnterToSearch," Clicked On Enter To Search On Deposit Screen")
await t.pressKey('ctrl+a delete')
//====================================Money_Market_Deposit=====================================
await In_Utility.AssureClaims_SetValue_Utility(BankAccount_POM.AssureClaims_BankAccount_Txt_EnterToSearch,StrControlNumberMoney_Market_Deposit," Typed Text  On Enter To Search On Deposit screen")
const VerifyMoney_Market_DepositControlNumber = BankAccount_POM.AssureClaims_BankAccount_Txt_VerifyControlNumberInClearMultipleDeposit.withText(StrControlNumberMoney_Market_Deposit).with({ visibilityCheck: true })
await t.expect(VerifyMoney_Market_DepositControlNumber.exists).ok('', { timeout: 20000 })
console.log("Verification Of Control Number Of Money Market Deposit Is Successful".green)
await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Txt_EnterToSearch," Clicked On Enter To Search On Deposit Screen")
await t.pressKey('ctrl+a delete')
//==================================== Money Market Transfer=====================================
await In_Utility.AssureClaims_SetValue_Utility(BankAccount_POM.AssureClaims_BankAccount_Txt_EnterToSearch,StrControlNumberMoney_Market_Transfer," Typed Text  On Enter To Search On Deposit screen")
const VerifyMoney_Market_TransferControlNumber = BankAccount_POM.AssureClaims_BankAccount_Txt_VerifyControlNumberInClearMultipleDeposit.withText(StrControlNumberMoney_Market_Transfer).with({ visibilityCheck: true })
await t.expect(VerifyMoney_Market_TransferControlNumber.exists).ok('', { timeout: 20000 })
console.log("Verification Of Control Number Of Money Market Transfer Is Successful".green)
await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Txt_EnterToSearch," Clicked On Enter To Search On Deposit Screen")
await t.pressKey('ctrl+a delete')
//====================================Money_Market_Adjustment=====================================
await In_Utility.AssureClaims_SetValue_Utility(BankAccount_POM.AssureClaims_BankAccount_Txt_EnterToSearch,StrControlNumberMoney_Market_Adjustment," Typed Text  On Enter To Search On Deposit screen")
const VerifyMoney_Market_AdjustmentControlNumber = BankAccount_POM.AssureClaims_BankAccount_Txt_VerifyControlNumberInClearMultipleDeposit.withText(StrControlNumberMoney_Market_Adjustment).with({ visibilityCheck: true })
await t.expect(VerifyMoney_Market_AdjustmentControlNumber.exists).ok('', { timeout: 20000 })
console.log("Verification Of Control Number Of Money Market Adjustment Is Successful".green)
await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Txt_EnterToSearch," Clicked On Enter To Search On Deposit Screen")
await t.pressKey('ctrl+a delete') 
await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Btn_Clear,"Clicked on Clear on Deposit")
await Verify_Utility.AssureClaims_VerifyUXErrorMessage_Utility(Verification_Msg.AssureClaims_Generic_OrangeToasterOFClearingMultipleDeposit, true, " Clear multiple Deposit  Screen");

await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_Funds_Select_gridwindow,"Clicked on Parent Grid on Deposit")
await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Btn_Clear,"Clicked on Clear on Deposit")
await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Btn_Cancle,"Clicked on Cancle on Deposit")

await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Btn_LookUP,"Look Up Clicked on Deposit Screen")

       const headerDeposit = ["Ctl Number","Cleared"]
       const valDeposit = [StrControlNumberDeposit,"true"]
       await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrControlNumberDeposit,'Bank Account Deposit grid view',headerDeposit,valDeposit);

       const headerAdjustment = ["Ctl Number","Cleared"]
       const valAdjustment = [StrControlNumberAdjustment,"true"]
       await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrControlNumberAdjustment,'Bank Account Deposit grid view',headerAdjustment,valAdjustment);

       const headerMoney_Market_Deposit = ["Ctl Number","Cleared"]
       const valMoney_Market_Deposit = [StrControlNumberMoney_Market_Deposit,"true"]
       await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrControlNumberMoney_Market_Deposit,'Bank Account Deposit grid view',headerMoney_Market_Deposit,valMoney_Market_Deposit);

       const headerMoney_Market_Transfer = ["Ctl Number","Cleared"]
       const valMoney_Market_Transfer = [StrControlNumberMoney_Market_Transfer,"true"]
       await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrControlNumberMoney_Market_Transfer,'Bank Account Deposit grid view',headerMoney_Market_Transfer,valMoney_Market_Transfer);

       const headerMoney_Market_Adjustment = ["Ctl Number","Cleared"]
       const valMoney_Market_Adjustment = [StrControlNumberMoney_Market_Adjustment,"true"]
       await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(StrControlNumberMoney_Market_Adjustment,'Bank Account Deposit grid view',headerMoney_Market_Adjustment,valMoney_Market_Adjustment);
})

//########################==============Scenario 4==================================##########################################
test('Bank With CheckStock_SubBankAccount_Deposit Creation_Test_02', async t => {
  //=================================================BankAccount+CheckStock Creation Start Here================================
  var AccountNo=Generic_Utility.AssureClaims_RandomNumberGeneration_Utility(5);   
  var BankLastName = "Bank_"+faker.name.lastName();
      var Address1= faker.address.streetName();
      var Address2= faker.address.streetAddress();
      var City = faker.address.city();
      var ZipCode = faker.random.number({min:10000, max:99999});
      var AccountName= "Bank_"+faker.name.lastName();
      var NextCheck=faker.random.number({min:1, max:99999});
      var SubBankAccountName = "SubBank_"+faker.name.lastName();
      var SubBankAccountNameVoid = "SubBank_"+faker.name.lastName();
      // Local Variable Declaration


      console.log("Bank With CheckStock_SubBankAccount_Deposit Creation_Test_01 Started\n".rainbow);
      await t.wait(10000)
      await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
      console.log(`Login Into Application->Claims`)
      //Login Into Application with User
      //------------------------------------------BankAccount Creation------------------------------------------------------------
      console.log("AssureClaims_BankAccount_AddEdit_Utility Function is Called To Create BankAccount".yellow); 
      var StrBankAccountNameForVoid=await Function_Utility.AssureClaims_BankAccount_AddEdit_Utility('Create',BankLastName,Address1,Address2,data.Country,data.State,
      City,ZipCode,(await AccountNo).toString(),AccountName,data.AccountType,NextCheck)
      //------------------------------Check Stocks Creation -----------------------------------------------------------------------
      var CheckStockCreation_Txt_StockName = "Stock_"+faker.name.lastName();
      console.log("AssureClaims_BankAccount_CheckStocks_Utility Function is Called To Create BankAccount_CheckStocks".yellow); 
      await Function_Utility.AssureClaims_BankAccount_CheckStocks_Utility(CheckStockCreation_Txt_StockName,"Arial","6")
      console.log("Bank Account With Check Stock Has Been Created: ".yellow+StrBankAccountNameForVoid);
      //Bank Account With Check Stock Has Been Created
      await t.switchToMainWindow()
      await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.dvbreadcrumbscroll,"Breadcrumbs ")
      await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_BankAccountIframe);
      //====================================================BankAccount+CheckStock Creation End Here=====================================
//SubBankAccount
console.log("AssureClaims_BankAccount_SubBankAccount2_Utility Function is Called To Create BankAccount_SubBankAccount".yellow); 
await Function_Utility.AssureClaims_BankAccount_SubBankAccount_Utility(StrBankAccountNameForVoid,(await AccountNo).toString(),CheckStockCreation_Txt_StockName)
var StrSubBankAccountNameVoid = await Verify_Utility.AssureClaims_AttributeFetch_Utility(BankAccount_POM.AssureClaims_BankAccount_SubBankAccount_Txt_SubAccountName,"value");
console.log("Bank Account With SubBankAccount  Has Been Created :".yellow+StrSubBankAccountNameVoid); 
//Bank Account With Check Stock Has Been Created
await t.switchToMainWindow()
await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.dvbreadcrumbscroll,"Breadcrumbs ")
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_BankAccountIframe)
//Sub Bank Account End Here
//Deposit Start Here
var TransactionDateLess =await Generic_Utility.AssureClaims_FuturePastDateInfo_Utility(0,-1,-1, "MM/DD/YYYY")
console.log("AssureClaims_BankAccount_Deposit_Utility Function is Called To Create BankAccount_Deposit".yellow); 
await Function_Utility.AssureClaims_BankAccount_Deposit_Utility(TransactionDateLess,"NA",StrSubBankAccountNameVoid,"50")
console.log(" Deposit Has Been Created on the SubBankAccount".yellow)
  await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Creation OF BankAccount Screen");
await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " BankAccount Creation Screen");
StrControlNumberDeposit1 = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ControlNumber,"value");
//Fetched Control Number
console.log("ControlNumber Of Deposit : ".green+StrControlNumberDeposit);
await t.switchToMainWindow()
await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.dvbreadcrumbscroll,"Breadcrumbs ")
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_BankAccountIframe)


//Deposit 2 Start Here
var TransactionDateLess =await Generic_Utility.AssureClaims_FuturePastDateInfo_Utility(0,-1,-1, "MM/DD/YYYY")
console.log("AssureClaims_BankAccount_Deposit_Utility Function is Called To Create BankAccount_Deposit".yellow); 
await Function_Utility.AssureClaims_BankAccount_Deposit_Utility(TransactionDateLess,"NA",StrSubBankAccountNameVoid,"25")
console.log(" Deposit Has Been Created on the SubBankAccount".yellow)
  
  await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Creation OF BankAccount Screen");
await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " BankAccount Creation Screen");
StrControlNumberDeposit2 = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Payment_POM.AssureClaims_PaymentCollection_Txt_ControlNumber,"value");
//Fetched Control Number
console.log("ControlNumber Of Deposit : ".green+StrControlNumberDeposit);
await t.switchToMainWindow()
await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.dvbreadcrumbscroll,"Breadcrumbs ")
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_BankAccountIframe)
console.log("Verification On The Account Balance Screen".rainbow); 

    await t.wait(4000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Btn_AccountBalance,"Account Balance On BankAccount is Clicked")
    await t.wait(5000);

    var DepositTransit = "$75.00"
    var FetchDepositTransit  = await Verify_Utility.AssureClaims_AttributeFetch_Utility(BankAccount_POM.AssureClaims_BankAccount_Txt_DepositTransit,"value");
    console.log("Deposits in Transit On Account Balance Screen is is : ".green+FetchDepositTransit);
    await Verify_Utility.AssureClaims_VerifyElementValue_Utility(BankAccount_POM.AssureClaims_BankAccount_Txt_DepositTransit, DepositTransit, "Prior Balance");
    console.log("Verification Of DepositTransit Is Successful".green)

    await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Btn_CloseINAccountBalance,"Close Button Account Balance On BankAccount is Clicked")

    await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Btn_ViewAll,"View All On BankAccount is Clicked")

    await In_Utility.AssureClaims_SetValue_Utility(BankAccount_POM.AssureClaimsApp_BankAccount_Txt_ControlNumber,StrControlNumberDeposit2,"PolicyName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Lnk_AccountName.withText(StrSubBankAccountNameVoid),"Policy Name")

    await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(BankAccount_POM.AssureClaims_BankAccount_Chk_VoidCheckBox,'Check',"check UseSubBankAccounts Check Box")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_PaymentCollection_Btn_Ok,"Click Ok Deposit Creation Screen")
        console.log("New voided Check Payment  is Created ".green);    
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Creation OF BankAccount Screen");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " BankAccount Creation Screen");
        await t.switchToMainWindow()
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.dvbreadcrumbscroll,"Breadcrumbs ")
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_BankAccountIframe)
        console.log("Verification On The Account Balance Screen".rainbow); 
        
            await t.wait(4000)
            await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Btn_AccountBalance,"Account Balance On BankAccount is Clicked")
            await t.wait(5000);
        
            var DepositTransit = "$50.00"
            var FetchDepositTransit  = await Verify_Utility.AssureClaims_AttributeFetch_Utility(BankAccount_POM.AssureClaims_BankAccount_Txt_DepositTransit,"value");
            console.log("Deposits in Transit On Account Balance Screen is is : ".green+FetchDepositTransit);
            await Verify_Utility.AssureClaims_VerifyElementValue_Utility(BankAccount_POM.AssureClaims_BankAccount_Txt_DepositTransit, DepositTransit, "Prior Balance");
            console.log("Verification Of DepositTransit Is Successful".green)
        
            await Nav_Utility.AssureClaims_ElementClick_Utility(BankAccount_POM.AssureClaims_BankAccount_Btn_CloseINAccountBalance,"Close Button Account Balance On BankAccount is Clicked")
        

})
})