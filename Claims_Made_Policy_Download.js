//This Testcase was created by 'ANURAG Trivedi' on 21.2
//This testcase verifies the policy with retro and tail date are getting filtered in policy enquire screen on policy download page
//Currently policies with retro amd tail date are avaliable only in the IUT ORACLE env. on dsn RMIUT204_MCON_EROFF
//This Testcase work only IUT ORACLE Env.


import { Role } from "testcafe";
import Functionality_Utility from "../Functional_Utilities/Functionality_Utility";

const Function_Utility = new Functionality_Utility();
const DataIUTORA = require('../DataFiles/DataIUT_ORA.json');


DataIUTORA.forEach(data => {
  const LoggedInUser = Role(data.URL, async t => {
    await t.maximizeWindow()
    console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username, data.Password, data.DSN, 'Claims')
    //Login into Claims zone
    await t.wait(5000)
    console.log("Login Into Application!!".green)
  }, { preserveUrl: true }
  );

  fixture`Policy System Download`.beforeEach(async t => {
    await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
  });

  test('Policy System Download Test_01', async t => {
    console.log("AssureClaims_ClaimsMadePolicy Function is Called To Create Claim".yellow); 
    const StrClaimNumber = await Function_Utility.AssureClaims_ClaimsMadePolicy(data.DateOfEvent,data.DateOfClaim,data.GCClaimType, data.ClaimStatus, data.Department,data.ClaimDateReptd, data.GCCarrierPolicyLOB, data.PolicySystem, data.PolicyName, data.PolicyUnit, data.PolicyCoverage);
    console.log("New Carrier General Claim is Created with Claim Number & Policy Number : ".green+StrClaimNumber+"  "+data.PolicyName);
    await Function_Utility.AssureClaims_LogoutFromApplication_Utility();
  });

  test.after(async t =>{
    await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
    console.log("AssureClaims_LogoutFromApplication_Utility Function Is Called To LogOut From Application!!".yellow);
    await Function_Utility.AssureClaims_LogoutFromApplication_Utility();
    
  });

});



