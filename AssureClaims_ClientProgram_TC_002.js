import { Selector,Role } from 'testcafe';
import Colors from 'colors'
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import Maintenance_Functionality_Utility from '../Functional_Utilities/Maintenance_Functionality_Utility';
import MaintenanceChildAddition_Utility from '../Functional_Utilities/MaintenanceChildAddition_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import Verification_Utility from '../Functional_Utilities/Verification_Utility'
import POM_Home from '../Functional_POM/POM_Home';
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import POM_ClientProgram from '../Functional_POM/POM_ClientProgram'


const DataIUT = require('../DataFiles/DataIUT.json');
const Function_Utility = new Functionality_Utility();
const Nav_Utility = new Navigation_Utility();
const Maint_Utility = new Maintenance_Functionality_Utility();
const MaintChild_Utility = new MaintenanceChildAddition_Utility(); 
const Verify_Utility = new Verification_Utility();
const Verification_Msg = new POM_VerificationMessage();
const Home_POM = new POM_Home();
const ClientProgram_POM = new POM_ClientProgram();
const Generic_Utility = new GenericUsages_Utility();
var faker = require('faker');

DataIUT.forEach(data => {
const LoggedInUser = Role(data.URL , async t => {
    await t.maximizeWindow()
    console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Maintenance')
    await t.wait(15000)
    console.log("Login Into Application!!".green)
},{ preserveUrl: true }
);

fixture `Maintenance_Exhaustive_Smoke`.beforeEach(async t => {
  await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
});

test('AssureClaims_ClientProgam_Test_01', async t => {
        console.log("AssureClaims_MaintenanceAddNewEntity_Utility Function is Called To Create ClientProgram".yellow);
        var ClientProgramNumber = await Maint_Utility.AssureClaims_MaintenanceAddNewEntity_Utility("ClientProgram",data.ClientProgramstatus, data.ClientProgramType,data.ClientProgramRevenueType);
		console.log("New ClientProgram is Created with ClientProgram Number: ".green+ClientProgramNumber);
		//New Client Program Is Created

		console.log("AssureClaims_MaintenanceEditEntity_Utility Function is Called To Edit The Created ClientProgram".yellow);
        var ClientProgramName = await Maint_Utility.AssureClaims_MaintenanceEditEntity_Utility("ClientProgram","NA","NA","NA");
        console.log("Created ClientProgram is Edited with New Client program Name: ".green+ClientProgramName);
        //Created Client Program Is Edited Here

	    var SyndicateNumber = await MaintChild_Utility.AssureClaims_MaintenanceChildAddition_ClientProgram_Utility("Syndicate/Insurer","Australia","Victoria","NA")
		console.log("New Syndicate is Created with Syndicate Number : ".green+SyndicateNumber);
		//New Syndicate Is Created

		console.log("AssureClaims_MaintenanceChildAddition_EditEntity_Utility Function is Called To Edit The Created Syndicate/Insurer".yellow);
        var SyndicateName = await MaintChild_Utility.AssureClaims_MaintenanceChildAddition_EditEntity_Utility("Syndicate/Insurer","NA","NA","NA");
        console.log("Created Syndicate is Edited with New Syndicate Name: ".green+SyndicateName);
        //Created Syndicate Is Edited Here

		var UMRNumber = await MaintChild_Utility.AssureClaims_MaintenanceChildAddition_ClientProgram_Utility("UMR","General Claims","NA","100")
		console.log("New UMR is Created with UMR Number : ".green+UMRNumber);
		//New UMR Is Created

		console.log("AssureClaims_MaintenanceChildAddition_EditEntity_Utility Function is Called To Edit The Created UMR".yellow);
        var UMRNo = await MaintChild_Utility.AssureClaims_MaintenanceChildAddition_EditEntity_Utility("UMR","NA","NA","NA");
        console.log("Created UMR is Edited with New UMR Number: ".green+UMRNo);
        //Created UMR Is Edited Here

		console.log("PolicyTracking Creation From Maintenance_Test_03 Started".rainbow);
        await t.wait(10000)
        console.log("Login Into Application->Maintenance!!".green)
		await t.switchToMainWindow();
        var PolicyName = await Maint_Utility.AssureClaims_PolicyTrackingCreation_ClientProgram(data.Premium,data.InternalPolicyStatus,data.InternalPolicyLOB,data.InternalInsurer,data.InternalInsured,data.InternalInsured1,data.InternalCoverageType,data.InternalPolicyLimit,data.InternalPolicyMco,ClientProgramName,SyndicateName,UMRNo);
		console.log("New Internal Policy is Created with Policy Name: ".green+PolicyName);
        //new Policy is Created with Client Program Name, Insurer and UMR
  
        
        // await Nav_Utility.AssureClaims_ElementClick_Utility(ClientProgram_POM.AssureClaims_ClientProgram_Btn_DeleteRecord,"Delete Button")
        // await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_DeleteCancel,"Cancel Button On Confirm Delete PopUp On ");
        // await Nav_Utility.AssureClaims_ElementClick_Utility(ClientProgram_POM.AssureClaims_ClientProgram_Btn_DeleteRecord,"Delete Button")
        // await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_DeleteOK,"Ok Button On Confirm Delete PopUp On ");
        // await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "UMR Creation Screen");
        // //Created UMR Is Deleted Here

        // await t.wait(2000)
        // await t.switchToMainWindow();
        // await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Generic_ClientProgram_Frame);

        // await Nav_Utility.AssureClaims_ElementClick_Utility(ClientProgram_POM.AssureClaims_ClientProgram_Btn_DeleteRecord,"Delete Button")
        // await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_DeleteCancel,"Cancel Button On Confirm Delete PopUp On ");
        // await Nav_Utility.AssureClaims_ElementClick_Utility(ClientProgram_POM.AssureClaims_ClientProgram_Btn_DeleteRecord,"Delete Button")
        // await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_DeleteOK,"Ok Button On Confirm Delete PopUp On ");
        // await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "UMR Creation Screen");
        // //Created Syndicate Is Deleted Here

        // await t.wait(2000)
        // await Nav_Utility.AssureClaims_ElementClick_Utility(ClientProgram_POM.AssureClaims_ClientProgram_Btn_DeleteRecord,"Delete Button")
        // await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_DeleteCancel,"Cancel Button On Confirm Delete PopUp On ");
        // await Nav_Utility.AssureClaims_ElementClick_Utility(ClientProgram_POM.AssureClaims_ClientProgram_Btn_DeleteRecord,"Delete Button")
        // await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_DeleteOK,"Ok Button On Confirm Delete PopUp On ");
        // await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_RecordDeleteMessage, false, "UMR Creation Screen");
        // //Created Client Program Is Deleted Here
            
});

});