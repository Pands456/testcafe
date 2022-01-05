import { Selector,Role } from 'testcafe';
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
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import Verification_Utility from '../Functional_Utilities/Verification_Utility'
import POM_MedicalStaff from '../Functional_POM/POM_MedicalStaff'
import POM_Vehicle from '../Functional_POM/POM_Vehicle'
import POM_Search from '../Functional_POM/POM_Search';

const DataIUT = require('../DataFiles/DataSTG.json');
const Function_Utility = new Functionality_Utility();
const Nav_Utility = new Navigation_Utility();
const In_Utility = new Input_Utility();
const Maint_Utility = new Maintenance_Functionality_Utility();
const Employee_POM = new POM_Employee();
const Medstaff_POM = new POM_MedicalStaff();
const PatTrack_POM = new POM_Patient();
const Driver_POM = new POM_Driver();
const Vehicle_POM = new POM_Vehicle();
const Entity_POM = new POM_Entity();
const Verify_Utility = new Verification_Utility();
const Verification_Msg = new POM_VerificationMessage();
const Home_POM = new POM_Home();
var faker = require('faker');

DataIUT.forEach(data => {
const LoggedInUser = Role(data.URL , async t => {
    await t.maximizeWindow()
    console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Maintenance')
    await t.wait(5000)
    console.log("Login Into Application!!".green)
},{ preserveUrl: true }
);

fixture `Maintenance_Exhaustive_Smoke`.beforeEach(async t => {
  await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
});

test('AssureClaims_Employee_Test_01', async t => {
        var Violations = "Viol"+faker.random.alphaNumeric(4).toUpperCase();
        console.log("AssureClaims_MaintenanceAddNewEntity_Utility Function is Called To Create Employee".yellow);
        var EmployeNumber = await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Utility("Employee",data.Department, data.Country,data.State);
        console.log("New Employee is Created with Employee Number: ".green+EmployeNumber);
        //New Employee Is Created

        await Nav_Utility.AssureClaims_ElementClick_Utility(Employee_POM.AssureClaims_Employee_Tab_EmployeeInfo,"Employee Info Tab On Employee Creation Screen");
        await In_Utility.AssureClaims_SetValue_Utility(Employee_POM.AssureClaims_Employee_Txt_NumberOfViolations,Violations,"Number Of Violations Textbox On Employee Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Employee_POM.AssureClaims_Employee_Tab_Addresses,"Addresses Tab On Employee Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Employee_POM.AssureClaims_Employee_Tab_EntityIDType,"Entity Type Tab On Employee Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Employee_POM.AssureClaims_Employee_Tab_Supplementals,"Supplementals Tab On Employee Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Employee_POM.AssureClaims_Employee_Tab_Employee,"Employee Tab On Employee Creation Screen");
        //Verification Of All the Tabs Completed Here

        console.log("AssureClaims_MaintenanceEditEntity_Utility Function is Called To Edit The Created Employee".yellow);
        var EmployeeLastName = await Maint_Utility.AssureClaims_MaintenanceEditEntity_Utility("Employee","NA","NA","NA");
        console.log("Created Employee is Edited with New Employee Last Name: ".green+EmployeeLastName);
        //Created Employee Is Edited Here
        
        await Function_Utility.AssureClaims_GenericDelete_Utility("False", "Employee Creation Screen", "NA", "NA");
        await Function_Utility.AssureClaims_GenericDelete_Utility("True", "Employee Creation Screen", "NA", "NA");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "Employee Creation Screen");
        //Created Employee Is Deleted Here       
});

test('AssureClaims_MedicalStaff_Test_02', async t => {
        var AlsoKnownAs = faker.name.firstName();
        console.log("AssureClaims_MaintenanceAddNewEntity_Utility Function is Called To Create Medical Staff".yellow);
        var MedStaffLastName = await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Utility("Medical Staff","NA", "NA","NA");
        console.log("New Medical Staff is Created with Last Name: ".green+MedStaffLastName);
        //New Medical Staff Is Created

        await Nav_Utility.AssureClaims_ElementClick_Utility(Medstaff_POM.AssureClaims_MedicalStaff_Tab_Staff,"Staff Tab On Medical Staff Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Medstaff_POM.AssureClaims_MedicalStaff_Tab_StaffInfo,"Staff Info Tab On Medical Staff Creation Screen");
        await In_Utility.AssureClaims_SetValue_Utility(Medstaff_POM.AssureClaims_MedicalStaff_Txt_AlsoKnownAs,AlsoKnownAs,"Also Known As Textbox On Medical Staff Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Medstaff_POM.AssureClaims_MedicalStaff_Tab_FacilityInfo,"Facility Info Tab On Medical Staff Creation Screen");
        await In_Utility.AssureClaims_SetValue_Utility(Medstaff_POM.AssureClaims_MedicalStaff_Txt_StaffStatus,data.MedicalStaffStatus,"Staff Status Textbox On Medical Staff Creation Screen");
        await t.pressKey('tab')
        await Nav_Utility.AssureClaims_ElementClick_Utility(Medstaff_POM.AssureClaims_MedicalStaff_Tab_Addresses,"Addresses Tab On Medical Staff Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Medstaff_POM.AssureClaims_MedicalStaff_Tab_EntityIDType,"Entity Type Tab On Medical Staff Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Medstaff_POM.AssureClaims_MedicalStaff_Tab_Supplementals,"Supplementals Tab On Medical Staff Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Medstaff_POM.AssureClaims_MedicalStaff_Tab_Staff,"Medical Staff Tab On Medical Staff Creation Screen");
        //Verification Of All the Tabs Completed Here

        console.log("AssureClaims_MaintenanceEditEntity_Utility Function is Called To Edit The Created Medical Staff".yellow);
        var MedLastName = await Maint_Utility.AssureClaims_MaintenanceEditEntity_Utility("Medical Staff","NA","NA","NA");
        console.log("Created Medical Staff is Edited with New Last Name: ".green+MedLastName);
        //Created Medical Staff Entity Is Edited Here

        await Function_Utility.AssureClaims_GenericDelete_Utility("False", "Medical staff Creation Screen", "", "");
        await Function_Utility.AssureClaims_GenericDelete_Utility("True", "Medical Staff Creation Screen", "", "");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "Medical Staff Creation Screen");
        //Created Medical Staff Entity Is Deleted Here       
});

test('AssureClaims_PatientTracking_Test_03', async t => {
        var MedRecordNumber = faker.name.firstName();
        var NumOfBirths = faker.random.number({min:100,max:999});
        console.log("AssureClaims_MaintenanceAddNewEntity_Utility Function is Called To Create Patient Tracking".yellow);
        var PatTrackLastName = await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Utility("Patient","NA", "NA","NA");
        console.log("New Patient is Created with Last Name: ".green+PatTrackLastName);
        //New Patient Is Created

        await Nav_Utility.AssureClaims_ElementClick_Utility(PatTrack_POM.AssureClaims_Patient_Tab_AdmissionInfo,"Admission info Tab On Patient Tracking Creation Screen");
        await In_Utility.AssureClaims_SetValue_Utility(PatTrack_POM.AssureClaims_MaintPatient_Txt_MedicalRecordNumber,MedRecordNumber,"Medical Record Number On Patient Tracking Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(PatTrack_POM.AssureClaims_Patient_Tab_PatientFacilityInfo,"Patient Facility Info Tab On Patient Tracking Creation Screen");
        await In_Utility.AssureClaims_SetValue_Utility(PatTrack_POM.AssureClaims_MaintPatient_Txt_PatientWeight,"70","Patient Weight Textbox On Patient Tracking Creation Screen");
        await t.pressKey('tab')
        await Nav_Utility.AssureClaims_ElementClick_Utility(PatTrack_POM.AssureClaims_Patient_Tab_PhysicianDiagnosisInfo,"Patient Diagnosis Info Tab On Patient Tracking Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(PatTrack_POM.AssureClaims_MaintPatient_Btn_DisabilityType,"Disability Type Button On Patient Tracking Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Selector('[role="button"]').withText(data.DisabilityType),data.DisabilityType+" On Lookup Window");
        await Nav_Utility.AssureClaims_ElementClick_Utility(PatTrack_POM.AssureClaims_Patient_Btn_IllnessType,"Illness Type Lookup Button On Patient Tracking Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Selector('[role="button"]').withText(data.IllnessType),data.IllnessType+" On Lookup Window");
        await Nav_Utility.AssureClaims_ElementClick_Utility(PatTrack_POM.AssureClaims_Patient_Tab_NewbornInfo,"New Born Info Tab On Patient Tracking Creation Screen");
        await In_Utility.AssureClaims_SetValue_Utility(PatTrack_POM.AssureClaims_MaintPatient_Txt_NoOfLiveBirths,NumOfBirths.toString(),"Number Of Births Textbox On Patient Tracking Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(PatTrack_POM.AssureClaims_Patient_Tab_Addresses,"Addresses Tab On Patient Tracking Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(PatTrack_POM.AssureClaims_Patient_Tab_EntityIDType,"Entity Type Tab On Patient Tracking Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(PatTrack_POM.AssureClaims_Patient_Tab_Supplementals,"Supplementals Tab On Patient Tracking Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(PatTrack_POM.AssureClaims_Patient_Tab_Patient,"Patient Tab On Patient Tracking Creation Screen");
        //Verification Of All the Tabs Completed Here

        console.log("AssureClaims_MaintenanceEditEntity_Utility Function is Called To Edit The Created Patient Tracking".yellow);
        var PatLastName = await Maint_Utility.AssureClaims_MaintenanceEditEntity_Utility("Patient","NA","NA","NA");
        console.log("Created Patient is Edited with New Last Name: ".green+PatLastName);
        //Created Patient Entity Is Edited Here

        await Function_Utility.AssureClaims_GenericDelete_Utility("False", "Patient Creation Screen", "", "");
        await Function_Utility.AssureClaims_GenericDelete_Utility("True", "Patient Creation Screen", "", "");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "Patient Creation Screen");
        //Created Patient Entity Is Deleted Here       
});

test('AssureClaims_Driver_Test_04', async t => {
        console.log("AssureClaims_MaintenanceAddNewEntity_Utility Function is Called To Create Driver".yellow);
        var DriverLastName = await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Utility("Driver", 1, data.Country, data.State);
        console.log("New Driver is Created with Last Name: ".green+DriverLastName);
        //New Driver Is Created

        await Nav_Utility.AssureClaims_ElementClick_Utility(Driver_POM.AssureClaims_Driver_Tab_Supplementals,"Supplementals Tab On Driver Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Employee_POM.AssureClaims_Employee_Tab_Addresses,"Addresses Tab On Driver Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Driver_POM.AssureClaims_Driver_Tab_Driver,"Driver Tab On Driver Creation Screen");
        //Verification Of All the Tabs Completed Here

        console.log("AssureClaims_MaintenanceEditEntity_Utility Function is Called To Edit The Created Driver".yellow);
        var DvLastName = await Maint_Utility.AssureClaims_MaintenanceEditEntity_Utility("Driver","NA","NA","NA");
        console.log("Created Driver is Edited with New Last Name: ".green+DvLastName);
        //Created Driver Entity Is Edited Here

        await Function_Utility.AssureClaims_GenericDelete_Utility("False", "Driver Creation Screen", "", "");
        await Function_Utility.AssureClaims_GenericDelete_Utility("True", "Driver Creation Screen", "", "");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "Driver Creation Screen");
        await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
        //Created Driver Entity Is Deleted Here 
        //First Type Of Driver Completed Here 

        console.log("AssureClaims_MaintenanceAddNewEntity_Utility Function is Called To Create Driver".yellow);
        var DriverLastName = await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Utility("Driver", 2, data.Country, data.State);
        console.log("New Driver is Created with Last Name: ".green+DriverLastName);
        //New Driver Is Created

        await Nav_Utility.AssureClaims_ElementClick_Utility(Driver_POM.AssureClaims_Driver_Tab_Supplementals,"Supplementals Tab On Driver Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Employee_POM.AssureClaims_Employee_Tab_Addresses,"Addresses Tab On Driver Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Driver_POM.AssureClaims_Driver_Tab_Driver,"Driver Tab On Driver Creation Screen");
        //Verification Of All the Tabs Completed Here

        console.log("AssureClaims_MaintenanceEditEntity_Utility Function is Called To Edit The Created Driver".yellow);
        var DvLastName = await Maint_Utility.AssureClaims_MaintenanceEditEntity_Utility("Driver","NA","NA","NA");
        console.log("Created Driver is Edited with New Last Name: ".green+DvLastName);
        //Created Driver Entity Is Edited Here

        await Function_Utility.AssureClaims_GenericDelete_Utility("False", "Driver Creation Screen", "", "");
        await Function_Utility.AssureClaims_GenericDelete_Utility("True", "Driver Creation Screen", "", "");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "Driver Creation Screen");
        //Created Driver Entity Is Deleted Here 
        //Second Type Of Driver Completed Here    
});

test.after(async t =>{
        await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
        console.log("AssureClaims_LogoutFromApplication_Utility Function Is Called To LogOut From Application!!".yellow);
        await Function_Utility.AssureClaims_LogoutFromApplication_Utility()
})
test("AssureClaims_Entity_Test_05", async t=>{
        console.log("AssureClaims_MaintenanceAddNewEntity_Utility Function is Called To Create Entity".yellow);
        var LastName = await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Utility("Entity", data.EntityType, "SSN","");
        console.log("New Entity is Created with Last Name: ".green+LastName);
        //New Entity Is Created

        await Nav_Utility.AssureClaims_ElementClick_Utility(Entity_POM.AssureClaims_Entity_Tab_ContactInfo,"Contact Info Tab On Entity Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Entity_POM.AssureClaims_Entity_Tab_OperatingAs,"Operating As Tab On Entity Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Entity_POM.AssureClaims_Entity_Tab_Addresses,"Addresses Tab On Entity Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Entity_POM.AssureClaims_Entity_Tab_EntityIDType,"Entity ID Type Tab On Entity Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Entity_POM.AssureClaims_Entity_Tab_Supplementals,"Supplementals Tab On Entity Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Entity_POM.AssureClaims_Entity_Tab_Entity,"Entity Tab On Entity Creation Screen");
        //Verification Of All the Tabs Completed Here

        console.log("AssureClaims_MaintenanceEditEntity_Utility Function is Called To Edit The Created Entity".yellow);
        var EnLastName = await Maint_Utility.AssureClaims_MaintenanceEditEntity_Utility("Entity","NA","NA","NA");
        console.log("Created Entity is Edited with New Last Name: ".green+EnLastName);
        //Created Entity Is Edited Here

        await Function_Utility.AssureClaims_GenericDelete_Utility("False", "Entity Creation Screen", "", "");
        await Function_Utility.AssureClaims_GenericDelete_Utility("True", "Entity Creation Screen", "", "");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "Entity Creation Screen");
        await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
        //Created Entity Is Deleted Here 
});

test('AssureClaims_Vehicle_Test_06', async t => {
        
        console.log("AssureClaims_MaintenanceAddNewEntity_Utility Function is Called To Create Vehicle".yellow);
        var VehicleID = await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Utility("Vehicle","NA","NA","NA");
        console.log("New Vehicle is Created with ID: ".green+VehicleID);
        //New Vehicle Is Created
       
        console.log("AssureClaims_MaintenanceEditEntity_Utility Function is Called To Edit The Created Vehicle".yellow);
        var LicenseNumber = await Maint_Utility.AssureClaims_MaintenanceEditEntity_Utility("Vehicle","NA","NA","NA");
        console.log("Created Vehicle is Edited with New Vehicle LicenseNumber: ".green+LicenseNumber);
        //Created Vehicle Is Edited Here
       
        await Nav_Utility.AssureClaims_ElementClick_Utility(Vehicle_POM.AssureClaims_Vehicle_Tab_Vehicle_Detail,"Vehicle Detail On Vehicle Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Vehicle_POM.AssureClaims_Vehicle_Tab_Supplementals,"Supplementals Tab On Vehicle Creation Screen");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On Vehicle creation Screen");
        await Function_Utility.AssureClaims_GenericDelete_Utility("False", "Vehicle Creation Screen", "NA", "NA");
        await Function_Utility.AssureClaims_GenericDelete_Utility("True", "Vehicle Creation Screen", "NA", "NA");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "Vehicle Creation Screen");
        //Created Vehicle Is Deleted Here       
});


});



