import { Role } from "testcafe";
import POM_VerificationMessage from "../Functional_POM/POM_VerificationMessage";
import Functionality_Utility from "../Functional_Utilities/Functionality_Utility";
import GenericUsages_Utility from "../Functional_Utilities/GenericUsages_Utility";
import Maintenance_Functionality_Utility from "../Functional_Utilities/Maintenance_Functionality_Utility";
import POM_WorkersComp_Claims from '../Functional_POM/POM_WorkersComp_Claims';
import Navigation_Utility from "../Functional_Utilities/Navigation_Utility";
import Verification_Utility from "../Functional_Utilities/Verification_Utility";
import Input_Utility from "../Functional_Utilities/Input_Utility";
import POM_Generic_Claims from "../Functional_POM/POM_Generic_Claims";
import POM_Document_Event from "../Functional_POM/POM_Document_Event";

const Function_Utility = new Functionality_Utility();
const Generic_Utility = new GenericUsages_Utility();
const Maint_Utility = new Maintenance_Functionality_Utility();
const Verification_Msg = new POM_VerificationMessage();
const WorkersComp_Claims = new POM_WorkersComp_Claims();
const Nav_Utility = new Navigation_Utility();
const Verify_Utility = new Verification_Utility();
const In_Utility = new Input_Utility();
const Generic_Claims = new POM_Generic_Claims();
const Document_Event = new POM_Document_Event();

const DataIUT = require('../DataFiles/DataIUT.json');


DataIUT.forEach(data => {
    let StrWCClaimNumber = ''
    let PILastName = ''
    const LoggedInUser = Role(data.URL, async t => {
        await t.wait(3000)
        await t.maximizeWindow()
        console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
        await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username, data.Password, data.DSN, 'Claims')
        await t.wait(5000)
        console.log("Login Into Application!!".green)
    }, { preserveUrl: true }
    );

    fixture `EventLevel_PI_OnClaimScreen`.beforeEach(async t => {
        await t.wait(3000)
      await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
    });

    test('AssureClaims_EventLevel_PersonInvolved_Test_01', async t => {

        await t.wait(5000)

            var date = new Date();
            var d = (date.getMonth()+1)+'/'+(date.getDate())+'/'+date.getFullYear();
        //var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
        /*=========================================================== Worker Compensation Claim Creation Started Here========================================================================================================================================================================================================================================================================================================*/
        
        console.log("AssureClaims_WorkersCompClaimCreation Function is Called To Create Worker Compensation Claim".yellow);
        StrWCClaimNumber = await Function_Utility.AssureClaims_WorkersCompClaimCreation(d, d, data.WCClaimStatus, data.WCClaimType, data.Department, data.WCPolicyLOB, data.WCJurisdiction)
        console.log("New Worker Compensation Claim is Created with Claim Number: ".green + StrWCClaimNumber);
       
        //Worker Compensation Claim Creation
        
        /*===========================================================Worker Compensation Claim Creation Completed Here========================================================================================================================================================================================================================================================================================================*/

        await t.wait(3000)

        /*==========================================================Adding Med Staff As PI On Created WC Claim Started Here========================================================================================================================================================================================================================================================================================================*/
        console.log("AssureClaims_PersonInvolvedAddNewEntity_Utility Function is Called To Create  Med Staff As PI On Created WC Claim".yellow); 
        PILastName = await Maint_Utility.AssureClaims_PersonInvolvedAddNewEntity_Utility("Medical Staff", "NA", "NA","NA");
        console.log("Med Sfaff is added as Person Involved on Created Claim ".green);
    });
/*=========================================================================================================================================================================*/
    test('AssureClaims_EventLevel_PersonInvolved_Test_02', async t => {
        await t.wait(5000)
        await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
        
        ///==========================================================Verification of Claim PI and Event PI Started here========================================================================================================================================================================================================================================================================================================
        await t.wait(3000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkersComp_Claims.AssureClaims_WorkersComp_Claims_Tab_Employeeinfo,"WC Empolyee Info Tab")
        var EmpLastName = await Verify_Utility.AssureClaims_AttributeFetch_Utility(WorkersComp_Claims.AssureClaims_WorkersComp_EmployeeInfo_Tab_LastName,"value");
        console.log("Emp Last Name: " + EmpLastName)
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkersComp_Claims.AssureClaims_WorkersComp_Claims_RightChild_PI_Lookup,"WC PI Lookup")
        await t.wait(2000)
        
        console.log("Finding PI with lastname: "+PILastName);
        await In_Utility.AssureClaims_SetValue_Utility(WorkersComp_Claims.AssureClaims_WorkersComp_Claims_PILookup_Name_Txt, PILastName, "PI Name TextBox");
        
        const ele_claimPI = Generic_Claims.AssureClaims_GenericClaim_Lnk_SelectClaimStatus.nth(2).withText("Claim") && Generic_Claims.AssureClaims_GenericClaim_Lnk_SelectClaimStatus.withText(PILastName).with({ visibilityCheck: true })
        await t.expect(ele_claimPI.exists).ok('', { timeout: 2000 });
        console.log("Found PI with lastname: ".green+PILastName);

        console.log("Finding employee with lastname: "+EmpLastName);
        await In_Utility.AssureClaims_SetValue_Utility(WorkersComp_Claims.AssureClaims_WorkersComp_Claims_PILookup_Name_Txt, EmpLastName, "PI Name TextBox");
        const ele_eventEmployee = Generic_Claims.AssureClaims_GenericClaim_Lnk_SelectClaimStatus.nth(2).withText("Event") && Generic_Claims.AssureClaims_GenericClaim_Lnk_SelectClaimStatus.withText(EmpLastName).with({ visibilityCheck: true })
        await t.expect(ele_eventEmployee.exists).ok('', { timeout: 2000 })
        console.log("Found employee with lastname: "+EmpLastName)
    /*==========================================================Verification of Claim PI and Event PI Completed here========================================================================================================================================================================================================================================================================================================*/

        await Nav_Utility.AssureClaims_ElementClick_Utility(ele_eventEmployee,"WC PI Lookup")
        await t.switchToMainWindow()
        
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_EventFrame);
        await t.click('#lookup_lastname');
        await Verify_Utility.AssureClaims_VerifyElementValue_Utility(Document_Event.AssureClaims_PIEmp_LastName, EmpLastName, "Last Name Textbox On Event PI Screen");
        return EmpLastName;
     /*=========================================================Event Level PI Verification completed here===============================================================================================================================*/

    });

    test.after(async t =>{
        await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
        console.log("AssureClaims_LogoutFromApplication_Utility Function Is Called To LogOut From Application!!".yellow);
        await Function_Utility.AssureClaims_LogoutFromApplication_Utility();
        
      });
});
