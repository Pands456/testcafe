import { Selector, Role } from 'testcafe';
import { createTestCafe } from 'testcafe';
import Colors from 'colors'
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import Maintenance_Functionality_Utility from '../Functional_Utilities/Maintenance_Functionality_Utility';
import Input_Utility from '../Functional_Utilities/Input_Utility'
import POM_Employee from '../Functional_POM/POM_Employee'
import POM_Patient from '../Functional_POM/POM_Patient'
import POM_Driver from '../Functional_POM/POM_Driver'
import POM_Entity from '../Functional_POM/POM_Entity'
import POM_Home from '../Functional_POM/POM_Home';
import POM_FinancialReserves from '../Functional_POM/POM_FinancialReserves';
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';


import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import Verification_Utility from '../Functional_Utilities/Verification_Utility'
import POM_MedicalStaff from '../Functional_POM/POM_MedicalStaff'
import POM_Vehicle from '../Functional_POM/POM_Vehicle'
import POM_Search from '../Functional_POM/POM_Search';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';

const DataSTG_ORA = require('../DataFiles/DataSTG_ORA.json');
const Function_Utility = new Functionality_Utility();
const Nav_Utility = new Navigation_Utility();
const In_Utility = new Input_Utility();
const Maint_Utility = new Maintenance_Functionality_Utility();
const Entity_POM = new POM_Entity();
const Employee_POM = new POM_Employee();
const Reserve_Utility = new POM_FinancialReserves();
const Payment_POM = new POM_PaymentsCollections();


const Verify_Utility = new Verification_Utility();
const Verification_Msg = new POM_VerificationMessage();
const Home_POM = new POM_Home();
var faker = require('faker');
const Generic_Utility = new GenericUsages_Utility();





DataSTG_ORA.forEach(data => {
    const LoggedInUser = Role(data.URL, async t => {
        await t.maximizeWindow()
        console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
        await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username, data.Password, data.DSN, 'Maintenance')
        await t.wait(5000)
        console.log("Login Into Application!!".green)
    }, { preserveUrl: true }
    );


    fixture`Maintenance_Exhaustive_Smoke`.beforeEach(async t => {
        await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
    });
    var FetchLastName
    var FetchSSN
    var StrClaimNumber
    var StrWCClaimNumber
    var EmployeNumber
    var MedStaffNumber
    var PhysicianNumber
   var  EntityLastName1 



    test('AssureClaims_EnityCreation_Test_01', async t => {
        await Nav_Utility.AssureClaims_ElementClick_Utility(Entity_POM.AsssureClaims_MaintenenceERON, "Maintenence Option")
        await t.wait(2000)
        //Verification for Entity role ON
        await Verify_Utility.AssureClaims_ElementNotExist_Utility(Entity_POM.AsssureClaims_DriverERON, "Physician Not Visible");
        await t.wait(2000)
        await Verify_Utility.AssureClaims_ElementNotExist_Utility(Entity_POM.AsssureClaims_EmployeeERON, "Driver Not Visible");
        await t.wait(2000)
        await Verify_Utility.AssureClaims_ElementNotExist_Utility(Entity_POM.AsssureClaims_PhysicanERON, "Employee Not Visible");
        await t.wait(2000)
        await Verify_Utility.AssureClaims_ElementNotExist_Utility(Entity_POM.AsssureClaims_PatientERON, "Patient Not Visible");
        await t.wait(2000)
        await Verify_Utility.AssureClaims_ElementNotExist_Utility(Entity_POM.AsssureClaims_MedStaffERON, "MedStaff Not Visible");
        await t.wait(2000)


        //Entity Creation Started
        await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Maintenance:Entity");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureCliams_MaintenanceERON_EnityIframe);
        await t.wait(5000)
        var EntityLastName = faker.name.lastName();
        var SSN = faker.random.number({ min: 100000000, max: 999999999 });
        await In_Utility.AssureClaims_SetValue_Utility(Entity_POM.AssureClaims_EntityEron_Txt_LastName, EntityLastName, "Last Name Textbox Entity Screen");

        FetchLastName = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Entity_POM.AssureClaims_EntityEron_Txt_LastName, "value");
        console.log("FetchLastName".green + FetchLastName)
        await In_Utility.AssureClaims_SetValue_Utility(Entity_POM.AssureClaims_EntityEron_Txt_SSN, SSN.toString(), "SSN Textbox On Employee Creation Screen");


        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Employee creation Screen");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Employee Creation Screen");
        FetchSSN = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Entity_POM.AssureClaims_EntityEron_Txt_SSN, "value");
        console.log("FetchSSN".green + FetchSSN)






        // Entity Driver Created  From Toolbar
        await Nav_Utility.AssureClaims_ElementClick_Utility(Entity_POM.AssureClaims_Entity_Driver_Btn, "Driver Button On Toolbar ");
        await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Eron_Utility("Driver", "Commercial", "NA", "NA");
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back Button")
        await t.wait(2000);

        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload, "Reload Button ");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureCliams_MaintenanceERON_EnityIframe);
        await t.wait(5000);

        //Entity Employee is created
        await Nav_Utility.AssureClaims_ElementClick_Utility(Entity_POM.AssureClaims_Enity_Employee_Btn, "Employee Button On Toolbar ");
        EmployeNumber = await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Eron_Utility("Employee", data.Department, "NA", "NA");
        console.log("New Employee is Created with Employee Number: ".green + EmployeNumber);
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back Button")
        await t.wait(2000);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload, "Reload Button ");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureCliams_MaintenanceERON_EnityIframe);
        await t.wait(5000);



        //Entity MED-Staff is created
        await Nav_Utility.AssureClaims_ElementClick_Utility(Entity_POM.AssureClaims_Enity_MedStaff_Btn, "Med-Staff Button On Toolbar ");
        MedStaffNumber = await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Eron_Utility("Medical Staff", "NA", "NA", "NA");
        console.log("New MED-Staff is Created with Number: ".green + MedStaffNumber);
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back Button")
        await t.wait(2000);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload, "Reload Button ");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureCliams_MaintenanceERON_EnityIframe);
        await t.wait(5000);
   

    //Entity Physician is created
     await Nav_Utility.AssureClaims_ElementClick_Utility(Entity_POM.AssureClaims_Lst_Entity, "List Button On Claim Screen");
     await t.wait(2000);
     await Nav_Utility.AssureClaims_ElementClick_Utility(Entity_POM.AssureClaims_Btn_PhysicianInfo, "Physician info from the List")
     await t.wait(4000);
        PhysicianNumber = await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Eron_Utility("Physician", "NA", "NA", "NA");
        console.log("New MED-Staff is Created with Number: ".green + PhysicianNumber);
     await t.switchToMainWindow();
     await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back Button")
     await t.wait(2000);
     await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload, "Reload Button ");
     await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureCliams_MaintenanceERON_EnityIframe);
     await t.wait(5000);

    //Entity search started
    // await t.switchToMainWindow();
    // await t.wait(5000)
    // var EntityLastName = await Maint_Utility.AssureClaims_SearchEntityEron(FetchLastName, FetchSSN);
     //console.log("Entity is searched isr: ".green + EntityLastName);
});

 test('AssureClaims_EnityCreation_Adjuster_Test_02', async t => {
     await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Maintenance:Entity");
     await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureCliams_MaintenanceERON_EnityIframe);
     await t.wait(5000)
     var EntityLastName = faker.name.lastName();
     var SSN = faker.random.number({ min: 100000000, max: 999999999 });
     await In_Utility.AssureClaims_ElementWebListSelect_Utility(Entity_POM.AssureClaims_EntityEron_Txt_EntityType,data.EntityType, "Entity Type Textbox Entity Screen");
     await t.pressKey('tab');
     await In_Utility.AssureClaims_SetValue_Utility(Entity_POM.AssureClaims_EntityEron_Txt_LastName, EntityLastName, "Last Name Textbox Entity Screen");
     await In_Utility.AssureClaims_SetValue_Utility(Entity_POM.AssureClaims_EntityEron_Txt_SSN, SSN.toString(), "SSN Textbox On Employee Creation Screen");
     await Nav_Utility.AssureClaims_ElementClick_Utility(Entity_POM.AssureClaims_EnityCategory_Lkp, "Lookup Button On Category");
    
     await In_Utility.AssureClaims_SetValue_Utility(Home_POM.AssureClaims_Generic_DescriptionTextboxOnLookup,data.EntityCategory, "Description Search Textbox On Bank Account Creation Page");
     await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_DescriptionSearchIconOnLookup, "Description Search Icon On Bank Account Creation Screen");

     const ele_EntityCategory = Entity_POM.AssureClaims_EntityCategory_Lnk_SelectAdjuster.withText(data.EntityCategory).with({ visibilityCheck: true });
     await t.expect(ele_EntityCategory.exists).ok("", { timeout: 30000 });
     await Nav_Utility.AssureClaims_ElementClick_Utility(ele_EntityCategory, "Entity Ctaegory Option");
 
     await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Employee creation Screen");
     await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Employee Creation Screen");
  EntityLastName1 = await Verify_Utility.AssureClaims_AttributeFetch_Utility(Entity_POM.AssureClaims_EntityEron_Txt_LastName, "Value");
     console.log("EntityLastName1".green + EntityLastName1)
     await t.wait(5000)
     

    
 });
 test('AssureClaims_EnityCreation_LKPCategory_Test_03', async t => {
     await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Maintenance:Entity");
     await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureCliams_MaintenanceERON_EnityIframe);
     await t.wait(5000)
     var EntityLastName = faker.name.lastName();
     var SSN = faker.random.number({ min: 100000000, max: 999999999 });
     await In_Utility.AssureClaims_SetValue_Utility(Entity_POM.AssureClaims_EntityEron_Txt_EntityType, data.EntityType, "Entity Type Textbox Entity Screen");
     await t.pressKey('tab');
     await In_Utility.AssureClaims_SetValue_Utility(Entity_POM.AssureClaims_EntityEron_Txt_LastName, EntityLastName, "Last Name Textbox Entity Screen");
     await In_Utility.AssureClaims_SetValue_Utility(Entity_POM.AssureClaims_EntityEron_Txt_SSN, SSN.toString(), "SSN Textbox On Employee Creation Screen");

     await Nav_Utility.AssureClaims_ElementClick_Utility(Entity_POM.AssureClaims_EnityCategory_Lkp, "Lookup Button On Category");
     await In_Utility.AssureClaims_SetValue_Utility(Home_POM.AssureClaims_Generic_DescriptionTextboxOnLookup, data.Insured, "Description Search Textbox On Bank Account Creation Page");
     await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_DescriptionSearchIconOnLookup, "Description Search Icon On Bank Account Creation Screen");
     const ele1_Insured = Entity_POM.AssureClaims_EntityCategory_Lnk_SelectAdjuster.withText(data.Insured).with({ visibilityCheck: true });
     await t.expect(ele1_Insured.exists).ok("", { timeout: 30000 });
     await Nav_Utility.AssureClaims_ElementClick_Utility(ele1_Insured, "Entity Insured Ctaegory Option");

     await Nav_Utility.AssureClaims_ElementClick_Utility(Entity_POM.AssureClaims_EnityCategory_Lkp, "Lookup Button On Category");
     await In_Utility.AssureClaims_SetValue_Utility(Home_POM.AssureClaims_Generic_DescriptionTextboxOnLookup, data.Agents, "Description Search Textbox On Bank Account Creation Page");
     await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_DescriptionSearchIconOnLookup, "Description Search Icon On Bank Account Creation Screen");
     const ele2_Agents = Entity_POM.AssureClaims_EntityCategory_Lnk_SelectAdjuster.withText(data.Agents).with({ visibilityCheck: true });
     await t.expect(ele2_Agents.exists).ok("", { timeout: 30000 });
     await Nav_Utility.AssureClaims_ElementClick_Utility(ele2_Agents, "Entity Agents Ctaegory Option");

     await Nav_Utility.AssureClaims_ElementClick_Utility(Entity_POM.AssureClaims_EnityCategory_Lkp, "Lookup Button On Category");
     await In_Utility.AssureClaims_SetValue_Utility(Home_POM.AssureClaims_Generic_DescriptionTextboxOnLookup, data.Anesthesiologist, "Description Search Textbox On Bank Account Creation Page");
     await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_DescriptionSearchIconOnLookup, "Description Search Icon On Bank Account Creation Screen");
     const ele3_Anesthesiologist = Entity_POM.AssureClaims_EntityCategory_Lnk_SelectAdjuster.withText(data.Anesthesiologist).with({ visibilityCheck: true });
     await t.expect(ele3_Anesthesiologist.exists).ok("", { timeout: 30000 });
     await Nav_Utility.AssureClaims_ElementClick_Utility(ele3_Anesthesiologist, "Entity Anthesiologist Category Option");

     await Nav_Utility.AssureClaims_ElementClick_Utility(Entity_POM.AssureClaims_EnityCategory_Lkp, "Lookup Button On Category");
     await In_Utility.AssureClaims_SetValue_Utility(Home_POM.AssureClaims_Generic_DescriptionTextboxOnLookup, data.Attorney, "Description Search Textbox On Bank Account Creation Page");
     await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_DescriptionSearchIconOnLookup, "Description Search Icon On Bank Account Creation Screen");
     const ele4_Attorney = Entity_POM.AssureClaims_EntityCategory_Lnk_SelectAdjuster.withText(data.Attorney).with({ visibilityCheck: true });
     await t.expect(ele4_Attorney.exists).ok("", { timeout: 30000 });
     await Nav_Utility.AssureClaims_ElementClick_Utility(ele4_Attorney, "Entity Attorney Ctaegory Option");

     await Nav_Utility.AssureClaims_ElementClick_Utility(Entity_POM.AssureClaims_EnityCategory_Lkp, "Lookup Button On Category");
     await In_Utility.AssureClaims_SetValue_Utility(Home_POM.AssureClaims_Generic_DescriptionTextboxOnLookup, data.Banks, "Description Search Textbox On Bank Account Creation Page");
     await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_DescriptionSearchIconOnLookup, "Description Search Icon On Bank Account Creation Screen");
     const ele5_Banks = Entity_POM.AssureClaims_EntityCategory_Lnk_SelectAdjuster.withText(data.Banks).with({ visibilityCheck: true });
     await t.expect(ele5_Banks.exists).ok("", { timeout: 30000 });
     await Nav_Utility.AssureClaims_ElementClick_Utility(ele5_Banks, "Entity bank Ctaegory Option");


     await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Employee creation Screen");
     await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Employee Creation Screen");

 });
 

test('AssureClaims_WcEntity_Test_02', async t => {
    //Zone Switched To Claims
    await Generic_Utility.AssureClaims_Generic_ZoneSwitching("Claims");
    await t.wait(3000);


    await t.wait(10000)
    var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    /*=========================================================== Worker Compensation Claim Creation Started Here========================================================================================================================================================================================================================================================================================================*/
    console.log("AssureClaims_WorkersCompClaimCreation Function is Called To Create Worker Compensation Claim".yellow);
    StrWCClaimNumber = await Function_Utility.AssureClaims_WorkersCompClaimCreation(d, d, data.WCClaimStatus, data.WCClaimType, data.Department, data.WCPolicyLOB, EmployeNumber,data.WCJurisdiction)
    console.log("New Worker Compensation Claim is Created with Claim Number: ".green + StrWCClaimNumber);
    //Worker Compensation Claim Creation
   
       
         await Maint_Utility.AssureClaims_PersonInvolvedAddNewEntity_Utility("Medical Staff", FetchLastName, MedStaffNumber, "NA");
         console.log("Med Sfaff is added as Person Involved on Created Claim ".green);
         await t.wait(3000)
         await t.switchToMainWindow();
         await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back Button")
         await t.wait(2000);
 
         await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload, "Reload Button ");
         await t.switchToMainWindow();
         await t.wait(3000)
 
         await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
         await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
         await Maint_Utility.AssureClaims_PersonInvolvedAddNewEntity_Utility("Driver", data.DriverTyped,FetchLastName, "NA");
         console.log("Driver is added as Person Involved on Created Claim ".green);
         await t.wait(3000)
 
         

   

  
       


    //Adjuster Verification Started
    await t.wait(3000)
    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back Button")
    await t.wait(2000);

    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload, "Reload Button ");
    await t.switchToMainWindow();
    await t.wait(3000)
    //await t.wait(3000)
    await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
    await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility("Adjuster", EntityLastName1, "NA", "NA")

    //physician Verification started

    await t.wait(3000)
    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back Button")
    await t.wait(2000);

    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload, "Reload Button ");
    await t.switchToMainWindow();
    await t.wait(3000)

   
    await t.wait(3000)
    await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
    await Maint_Utility.AssureClaims_PersonInvolvedAddNewEntity_Utility("Physician", FetchLastName, PhysicianNumber, "NA");
    console.log("physician is added as Person Involved on Created Claim ".green);


    //payment
    await t.switchToMainWindow();
    await t.wait(2000);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back Button")
    await t.wait(2000);
    await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
    await Function_Utility.AssureClaims_Reserve_Utility(data.ReserveType, data.ReserveAmount, data.ReserveStatus)
    await t.switchToMainWindow();
    await t.wait(2000);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back Button")
    await t.wait(2000);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
    await t.wait(2000);


    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window")
    await Function_Utility.AssureClaims_PaymentCorpAddition_Utility(data.BankAccount, data.PayeeType, FetchLastName, data.ReserveType, data.TransactionType, data.Amount)
    //Payment created
    /*===========================================================Payment Creation On Worker Compensation Claim Completed Here============================================================*/





});
});