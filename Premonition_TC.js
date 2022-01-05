import { Selector } from 'testcafe';
//import Colors from 'colors'
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
const AssureClaims_DataSTG = require('../DataFiles/DataSTG.json');

const Function_Utility = new Functionality_Utility();

fixture `New Fixture`
    .page `https://riskmaster-demo.cm-csc.com/riskmasterux/`;

AssureClaims_DataSTG.forEach(data => {
test('New Test', async t => {
    await t
        .maximizeWindow()
		await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
        console.log("Login Into Application!!".green)
         //Login Into Application
        
        var date = new Date();
        var d = (date.getMonth()+1)+'/'+(date.getDate()-1)+'/'+date.getFullYear();
       
        await Function_Utility.AssureClaims_GeneralClaimCreation(d,d,data.ClaimStatus,data.GCClaimType,data.Department,data.GCPolicyLOB,data.Jurisdiction,data.JurisdictionCounty)
		
		console.log("General Claim is Created!!".green)
		await Function_Utility.AssureClaims_ClaimScan_Utility()
		
		// Claim Scan button is Clicked from the Claims toolbar//
	
	

		await Function_Utility.AssureClaims_PremonitionApp_Utility()
		console.log("Premonition App is Closed!!".green)
	 
		await Function_Utility.LogoutFromApplication()
		console.log("LoggedOut!!".green)
   
});});