import { Selector,Role } from 'testcafe';
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
import POM_Vehicle from '../Functional_POM/POM_Vehicle'
import POM_unit from '../Functional_POM/POM_unit';

const Vehicle_POM = new POM_Vehicle();
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
var VehicleID;
var VehicleMake;
//Global Variable Declaration

DataIUT.forEach(data => {
const LoggedInUser = Role(data.URL , async t => {
    await t.maximizeWindow()
    console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
    await t.wait(5000)
    console.log("Login Into Application!!".green)
},{ preserveUrl: true }
);

fixture `VehicleClaim_Exhaustive_Smoke`.beforeEach(async t => {
  await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
});

test('AssureClaims_VehicleClaim_Test_01', async t => {
    var date = new Date();
    var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");   
    //=====================================================Vehicle Claim Creation Started Here====================================================================
    console.log("AssureClaims_VehicleAccidentClaimCreation Function is Called To Create Vehicle Claim".yellow); 
    StrClaimNumber = await Function_Utility.AssureClaims_VehicleAccidentClaimCreation(d,d,data.ClaimStatus,data.GCClaimType,data.Department,data.VAPolicyLOB)
    console.log("New Vehicle Claim is Created with Claim Number: ".green+StrClaimNumber);
    //Vehicle Claim Creation
    //=====================================================Vehicle Claim Creation Completed Here====================================================================
});


test('ReserveCreation_Test_02', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    //===========================================================Reserve Creation On Vehicle Claim Started Here========================================================================================================================================================================================================================================================================================================
    await t.switchToMainWindow()
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_VehicleAccident_ClaimVCIframe);
    await t.wait(3000) 
    console.log("AssureClaims_Reserve_Utility Function is Called To Create Reserve On Vehicle Claim".yellow); 
    await Function_Utility.AssureClaims_Reserve_Utility(data.ReserveTypeVC,data.ReserveAmount,data.ReserveStatus)
    //Reserve created
    //===========================================================Reserve Creation On Vehicle Claim Completed Here========================================================================================================================================================================================================================================================================================================
    });

test('ScheduleCheckCreation_Test_03', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await t.switchToMainWindow();
    await t.wait(3000)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_VehicleAccident_ClaimVCIframe);
    //===========================================================New Schedule Check Creation On Vehicle Claim Started Here========================================================================================================================================================================================================================================================================================================
    await t.wait(3000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
    console.log("AssureClaims_ScheduleCheck_Creation Function is Called To Create Auto Check On Vehicle Claim".yellow);  
    await Function_Utility.AssureClaims_ScheduleCheck_Creation(data.NumberOfPayments,data.PayInterval,data.BankAccount,data.DistributionType,data.AutoCheckPayeeTypeVC,data.LastName,data.AutoCheckTransactionTypeVC,data.PaymentAmount)
    // Schedule Check is Created 
    //===========================================================New Schedule Check Creation On Vehicle Claim Completed Here========================================================================================================================================================================================================================================================================================================
    });

test('CollectionCreation_Test_04', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await t.switchToMainWindow();
    await t.wait(3000)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_VehicleAccident_ClaimVCIframe);
    //===========================================================Collection Creation On Vehicle Claim Started Here========================================================================================================================================================================================================================================================================================================
    await t.wait(3000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
    console.log("AssureClaims_CollectionCorpAddition_Utility Function is Called To Create Collection On Vehicle Claim".yellow);  
    await Function_Utility.AssureClaims_CollectionCorpAddition_Utility(data.BankAccount,data.PayeeType,data.LastName,data.ReserveType,data.TransactionTypeVC,data.PaymentAmount)
   // Collection is Created
   //===========================================================Collection Creation On Vehicle Claim Completed Here========================================================================================================================================================================================================================================================================================================
    });

   test('PaymentCreation_Test_05', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await t.switchToMainWindow();
    await t.wait(3000)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_VehicleAccident_ClaimVCIframe);
   //===========================================================Payment Creation On Vehicle Claim Started Here========================================================================================================================================================================================================================================================================================================
   
    await t.wait(3000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow,"Grid Window")
    console.log("AssureClaims_PaymentCorpAddition_Utility Function is Called To Create Payment On Vehicle Claim".yellow);  
    await Function_Utility.AssureClaims_PaymentCorpAddition_Utility(data.BankAccount,data.PayeeType,data.LastName,data.ReserveType,data.TransactionTypeVC,data.PaymentAmount)
    //Payment created
    //===========================================================Payment Creation On Vehicle Claim Started Here========================================================================================================================================================================================================================================================================================================
    
});

test('AssureClaims_Maintenance_Vehicle_Test_06', async t => {
    await Generic_Utility.AssureClaims_Generic_ZoneSwitching("Maintenance");
    await t.setNativeDialogHandler(() => true);
    await t.eval(() => location.reload(true));
    await t.wait(10000);
    //Zone Switched to Maintenance

    console.log("AssureClaims_MaintenanceAddNewEntity_Utility Function is Called To Create Vehicle".yellow);
    VehicleID = await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Utility("Vehicle","NA","NA","NA");
    
    VehicleMake = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Vehicle_POM.AssureClaims_Vehicle_Txt_Vehicle_Make,"value");
    console.log("New Vehicle is Created with ID: ".green+VehicleID);
    console.log("New vehicle is Created with Make: ".green+VehicleMake);
    //New Vehicle Is Created
});


test('Vehicle_AttachUnit_Test_07', async t => {
    await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber);
    await t.switchToMainWindow();
    await t.wait(3000);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_VehicleAccident_ClaimVCIframe);
    await Nav_Utility.AssureClaims_ElementClick_Utility(unit_POM.AssureClaims_Unit_Btn_AddUnit,"Add Unit Button")
    await Nav_Utility.AssureClaims_ElementClick_Utility(unit_POM.AssureClaims_Unit_Btn_UnitID_Lookup,"Vehicle ID Lookup Button")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_VehicleAccidentClaimIframe);
    await t.wait(3000)
	await In_Utility.AssureClaims_SetValue_Utility(unit_POM.AssureClaims_Unit_Txt_UnitID,VehicleID.toString(),"Type Vehicle ID")
	await Nav_Utility.AssureClaims_ElementClick_Utility(unit_POM.AssureClaims_Unit_Btn_SubmitQuery,"SubmitQuery")
    //Vehicle Created in Test_06 is Searched 
    await Nav_Utility.AssureClaims_ElementClick_Utility(unit_POM.AssureClaims_Unit_Lnk_UnitID.withText(VehicleID.toString()),"click link")
    await t.wait(2000);
    await t.switchToMainWindow();
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_VehicleAccident_ClaimVCIframe);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Property Claim creation Screen");
    await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " Property Claim Creation Screen");
    //Unit Attached to the Vehicle Claim
});

test('Verification_Of_Unit_Test_08', async t => {
    await Generic_Utility.AssureClaims_Generic_ZoneSwitching("Maintenance");
    await t.setNativeDialogHandler(() => true);
    await t.eval(() => location.reload(true));
    await t.wait(10000);    
    //Zone Switched to Maintenance
    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Search");
    await Nav_Utility.AssureClaims_ElementClick_Utility(unit_POM.AssureClaims_Search_Vehicle_Label_MenuOption, "Funds Menu");
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Generic_VehicleSearchFrame);
	await In_Utility.AssureClaims_SetValue_Utility(unit_POM.AssureClaims_Search_Txt_VehicleID,VehicleID.toString(),"Type Vehicle ID")
    await Nav_Utility.AssureClaims_ElementClick_Utility(unit_POM.AssureClaims_Search_Btn_SubmitQuery,"SubmitQuery")
    await t.switchToMainWindow();
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Generic_VehicleSearchLinkFrame);
    await Nav_Utility.AssureClaims_ElementClick_Utility(unit_POM.AssureClaims_Search_Lnk_VehicleID.withText(VehicleID.toString()),"click link")
    await t.wait(10000);
    await t.switchToMainWindow();
    //Created Vehicle is Searched From Maintenance
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Generic_VehicleFrame);
    await Nav_Utility.AssureClaims_ElementClick_Utility(unit_POM.AssureClaims_Search_Child_On_Vehicle.withText(StrClaimNumber),"click link")
    //Vehicle Claim Number Child Link is Clicked
    await t.wait(5000);
    await t.switchToMainWindow();
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_VehicleAccident_ClaimVCIframe);
    await t.wait(5000);
    await Nav_Utility.AssureClaims_ElementClick_Utility(unit_POM.AssureClaims_Lnk_Child_UnIt.withText(VehicleMake.toString()),"click link")
    //Unit Link is Clicked on Vehicle Claim
    var StrVehicleIDVerification = await Verify_Utility.AssureClaims_AttributeFetch_Utility(unit_POM.AssureClaims_Vehicle_Txt_Vehicle_Id_Verification,"value");
    //Verification of Vehicle ID
    console.log("Verification of Vehicle : ".green+StrVehicleIDVerification);
});

test.after(async t =>{
    await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
    console.log("AssureClaims_LogoutFromApplication_Utility Function Is Called To LogOut From Application!!".yellow);
    await Function_Utility.AssureClaims_LogoutFromApplication_Utility()
});
});
