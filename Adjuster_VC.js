import { Role } from "testcafe";
import { Selector } from "testcafe";

import POM_VerificationMessage from "../Functional_POM/POM_VerificationMessage";
import Functionality_Utility from "../Functional_Utilities/Functionality_Utility";
import GenericUsages_Utility from "../Functional_Utilities/GenericUsages_Utility";
import POM_WorkersComp_Claims from '../Functional_POM/POM_WorkersComp_Claims';
import Navigation_Utility from "../Functional_Utilities/Navigation_Utility";
import Input_Utility from "../Functional_Utilities/Input_Utility";
import POM_Generic_Claims from "../Functional_POM/POM_Generic_Claims";
import POM_Adjuster from '../Functional_POM/POM_Adjuster';
import Verification_Utility from "../Functional_Utilities/Verification_Utility";

const Function_Utility = new Functionality_Utility();
const Verify_Utility = new Verification_Utility();
const Generic_Utility = new GenericUsages_Utility();
const Verification_Msg = new POM_VerificationMessage();
const WorkersComp_Claims = new POM_WorkersComp_Claims();
const Nav_Utility = new Navigation_Utility();
const In_Utility = new Input_Utility();
const Generic_Claims = new POM_Generic_Claims();
const Adjuster_POM = new POM_Adjuster();

var faker = require('faker');
const DataIUT = require('../DataFiles/DataIUT.json');

DataIUT.forEach(data => {
    let StrClaimNumber = ''
    let AdjusterLastName1 = ''
    let AdjusterLastName2 = ''
    const LoggedInUser = Role(data.URL, async t => {
        await t.wait(3000)
        await t.maximizeWindow()
        console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
        await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username, data.Password, data.DSN, 'Claims')
        await t.wait(5000)
        console.log("Login Into Application!!".green)
    }, { preserveUrl: true }
    );

    fixture`Adjuster_OnClaimScreen`.beforeEach(async t => {
        await t.wait(3000)
        await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
    });

    test('AssureClaims_VC_ClaimLevel_Adjuster_Test_01', async t => {
        await t.wait(5000)
        var date = new Date();
        var d = (date.getMonth() + 1) + '/' + (date.getDate()) + '/' + date.getFullYear();
        /*=========================================================== Vehicle claim creation started here========================================================================================================================================================================================================================================================================================================*/
        console.log("assureclaims_vehicleclaimcreation function is called to create vehicle claim".yellow);
        StrClaimNumber = await Function_Utility.AssureClaims_VehicleAccidentClaimCreation(d,d,data.ClaimStatus,data.GCClaimType,data.Department,data.VAPolicyLOB)
		console.log("new vehicle claim is created with claim number: ".green + StrClaimNumber);
        //vehicle claim creation
        //=======================================================adjuster creation on created claim started here====================================================      
        AdjusterLastName1 = await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility("Adjuster", "Australia", "Victoria", "NA")
        await t.switchToMainWindow()
        await t.click(Selector('#dvbreadcrumbscroll').find('a').withText('reply'));
        await t.wait(3000)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_VehicleAccident_ClaimVCIframe)
        await t.wait(3000)
        AdjusterLastName2 = await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility("Adjuster", "Australia", "Victoria", "NA")
        await t.wait(3000)
        //======================================================adjuster creation on created claim completed here==================================================
    });

    test('AssureClaims_Vehicle_ClaimLevel_Adjuster_Test_02', async t => {
        await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_VehicleAccident_ClaimVCIframe)

        ///==========================================================Verification of Adjuster Current Started here========================================================================================================================================================================================================================================================================================================
        await t.wait(8000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkersComp_Claims.AssureClaims_WorkersComp_Claims_RightChild_Adjuster_Lookup, "Adjuster Lookup")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkersComp_Claims.AssureClaims_WorkersComp_Claims_AdjusterLookup_AdjusterType_Txt, "Adjuster Type TextBox is Clicked");
        const ele_claimAdjuster1 = Generic_Claims.AssureClaims_GenericClaim_Lnk_SelectClaimStatus.nth(1).withText("Claim") && Generic_Claims.AssureClaims_GenericClaim_Lnk_SelectClaimStatus.withText(AdjusterLastName1).with({ visibilityCheck: true })        
        await t.expect(ele_claimAdjuster1.exists).ok('', { timeout: 2000 });
        console.log("Found Adjuster with lastname: ".green + AdjusterLastName1);
        await Nav_Utility.AssureClaims_ElementClick_Utility(ele_claimAdjuster1, "Adjuster Last Name is Clicked")
        await t.wait(3000)
        await Verify_Utility.AssureClaims_CheckedUncheckedStateVerification_Utility(WorkersComp_Claims.AssureClaims_WorkersComp_Adjuster_Checkbox, 'Checked', "Current adjuster");
        await t.switchToMainWindow()
        await t.click(Selector('#dvbreadcrumbscroll').find('a').withText('reply'));
        await t.wait(3000)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_VehicleAccident_ClaimVCIframe)
        await t.wait(8000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkersComp_Claims.AssureClaims_WorkersComp_Claims_RightChild_Adjuster_Lookup, "Adjuster Lookup")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkersComp_Claims.AssureClaims_WorkersComp_Claims_AdjusterLookup_AdjusterType_Txt, "Adjuster Type TextBox is Clicked");
        const ele_claimAdjuster2 = Generic_Claims.AssureClaims_GenericClaim_Lnk_SelectClaimStatus.nth(1).withText("Claim") && Generic_Claims.AssureClaims_GenericClaim_Lnk_SelectClaimStatus.withText(AdjusterLastName2).with({ visibilityCheck: true })
        await t.expect(ele_claimAdjuster2.exists).ok('', { timeout: 2000 });
        console.log("Found Adjuster with lastname: ".green + AdjusterLastName2);
        await Nav_Utility.AssureClaims_ElementClick_Utility(ele_claimAdjuster2, "Adjuster Last Name is Clicked")
        await t.wait(3000)
        await Verify_Utility.AssureClaims_CheckedUncheckedStateVerification_Utility(WorkersComp_Claims.AssureClaims_WorkersComp_Adjuster_Checkbox, 'Unchecked', "not a current adjuster");
         /*==========================================================Verification of Adjuster Current Completed here========================================================================================================================================================================================================================================================================================================*/
        await t.switchToMainWindow()

    });
    test('AssureClaims_GC_ClaimLevel_Adjuster_Test_03', async t => {
        var CreateDate = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
        await Function_Utility.AssureClaims_SearchClaim(StrClaimNumber)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_VehicleAccident_ClaimVCIframe)

        ///==========================================================Verification of Adjuster Current Started here========================================================================================================================================================================================================================================================================================================
        await t.wait(8000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkersComp_Claims.AssureClaims_WorkersComp_Claims_RightChild_Adjuster_Lookup, "Adjuster Lookup")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkersComp_Claims.AssureClaims_WorkersComp_Claims_AdjusterLookup_AdjusterType_Txt, "Adjuster Type TextBox is Clicked");
        await t.pressKey('tab');
        await In_Utility.AssureClaims_SetValue_Utility(WorkersComp_Claims.AssureClaims_WorkersComp_Claims_AdjusterLookup_CreateDate_Txt, CreateDate, "Create Date TextBox");
        const ele_claimAdjuster1 = Generic_Claims.AssureClaims_GenericClaim_Lnk_SelectClaimStatus.nth(1).withText("Claim") && Generic_Claims.AssureClaims_GenericClaim_Lnk_SelectClaimStatus.withText(AdjusterLastName1).with({ visibilityCheck: true })
        await t.expect(ele_claimAdjuster1.exists).ok('', { timeout: 2000 });
        console.log("Found Adjuster with lastname: ".green + AdjusterLastName1);
        await Nav_Utility.AssureClaims_ElementClick_Utility(ele_claimAdjuster1, "Adjuster Last Name is Clicked")
        /*==========================================================Verification of Adjuster Current Completed here========================================================================================================================================================================================================================================================================================================*/
        await t.wait(3000)
        await t.switchToMainWindow()
    }); 
    test.after(async t => {
        await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
        console.log("AssureClaims_LogoutFromApplication_Utility Function Is Called To LogOut From Application!!".yellow);
        await Function_Utility.AssureClaims_LogoutFromApplication_Utility();
    });
});
