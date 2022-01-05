import { Selector,Role } from 'testcafe';
import Colors from 'colors'
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import POM_Generic_Claims from '../Functional_POM/POM_Generic_Claims';
import Verification_Utility from '../Functional_Utilities/Verification_Utility'
import POM_Config_Manager from '../Functional_POM/POM_Config_Manager';
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import POM_Home from '../Functional_POM/POM_Home';

const DataIUT = require('../DataFiles/DataIUT1.json');
const DataIUT1 = require('../DataFiles/DataIUT1.json');
const Function_Utility = new Functionality_Utility();
const Nav_Utility = new Navigation_Utility();
const Generic_Utility = new GenericUsages_Utility();
const Verify_Utility = new Verification_Utility();
const Claim_POM = new POM_Generic_Claims();
const POM_Cnfg_Manager = new POM_Config_Manager();
const Verification_Msg = new POM_VerificationMessage();
const Home_POM = new POM_Home();

DataIUT1.forEach(data => {

const LoggedInUser = Role(data.URL , async t => {
    await t.maximizeWindow()
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Configuration Manager')
    await t.wait(5000)
    console.log("Login Into Application!!".green)
},{ preserveUrl: true }
);

fixture `Login_Config`

test('Login_Config', async t => {
	const checkbox = Selector('#calculateCollectionInResBal-input');
	var State='Checked';	
	var Checkbox_Status =null;
        await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
		await t.wait(5000);
        await Nav_Utility.AssureClaims_ElementClickText_Utility(POM_Cnfg_Manager.AssureClaims_TestCafe_POM_Cnfg_Manager_Screen_Name,data.St1,data.St1)      
		await t.wait(4000);
		await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.Assureclaims_Generic_Config_Manager_General_ClaimFrame);
        await Nav_Utility.AssureClaims_ElementClickText_Utility(POM_Cnfg_Manager.AssureClaims_TestCafe_POM_Cnfg_Manager_Tab_Name,data.St2,"Reserve Tab of GC On Configuration Manager");
	    await t.wait(5000);	   
	    await Nav_Utility.AssureClaims_ElementClickText_Utility(POM_Cnfg_Manager.AssureClaims_TestCafe_POM_Cnfg_Manager_Section_Name,data.St3,"Collection Section Of Reserve Tab of GC");    
		
		Checkbox_Status =await Verify_Utility.AssureClaims_VerifyUXCheckbox_Config_Manager_Utility(POM_Cnfg_Manager.AssureClaims_TestCafe_POM_Cnfg_Manager_Calculate_Collections_in_Incurred_Balance,"Calculate Collections in Reserve Incurred Setting of Collection section Of GC");
		Checkbox_Status = await Verify_Utility.AssureClaims_VerifyUXCheckbox_Config_Manager_Utility(POM_Cnfg_Manager.AssureClaims_TestCafe_POM_Cnfg_Manager_Calculate_Collections_in_Reserve_Balance,"Calculate Collections in Reserve Balance Setting of Collection section Of GC");		
		
		
		await t.wait(12000);	
		await Nav_Utility.AssureClaims_WebCheckBoxSelect_Test_Utility(POM_Cnfg_Manager.AssureClaims_TestCafe_POM_Cnfg_Manager_Calculate_Collections_in_Reserve_Balance,State,"Calculate Collections in Reserve Balance Setting of Collection section Of GC ");  		
		await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save_Config,"Save Image Button On General Claim creation Screen");
		await Verify_Utility.AssureClaims_VerifyUXMessage_Config_Manager_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage,false,"General Claim Screen Save");
		Checkbox_Status =await Verify_Utility.AssureClaims_VerifyUXCheckbox_Config_Manager_Utility(POM_Cnfg_Manager.AssureClaims_TestCafe_POM_Cnfg_Manager_Calculate_Collections_in_Incurred_Balance,"Calculate Collections in Reserve Incurred Setting of Collection section Of GC");
		
		
		});
test('logout', async t =>{
		await t.wait(2000)
		await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
		await Function_Utility.AssureClaims_LogoutFromApplication_Config_Manager_Utility();
		await t.navigateTo(data.URL)
});
});


DataIUT.forEach(data1 => {

const LoggedInUser1 = Role(data1.URL , async t => {
	
	await t.navigateTo(data1.URL)
    await t.maximizeWindow()
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data1.Username,data1.Password,data1.DSN,'Claims')
    await t.wait(5000)
    console.log("Login Into Application!!".green)
},{ preserveUrl: true }
);

fixture `LOB_verification`
test('LOB_verification', async t => {
    await t
	
    .wait(15000)
	.navigateTo(data1.URL)
	await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data1.Username,data1.Password,data1.DSN,'Claims')
       console.log("Login Into Application!!".green)
         //Login Into Application
       
        var date = new Date();
        var d = (date.getMonth()+1)+'/'+(date.getDate())+'/'+date.getFullYear();

        var StrClaimNumber = await Function_Utility.AssureClaims_GeneralClaimCreation(d,d,data1.ClaimStatus,data1.GCClaimType,data1.Department,data1.GCPolicyLOB)
        console.log("New General Claim is Created with Claim Number: ".green+StrClaimNumber);

       
         await Function_Utility.AssureClaims_Reserve_Utility(data1.ReserveType,data1.AmountType,data1.ReserveStatus)
         await Function_Utility.AssureClaims_CollectionCorpAddition_Utility(data1.BankAccount,data1.PayeeType,data1.LastName,data1.ReserveType,data1.TransactionType,data1.AmountType)
		
		var RA =data1.AmountType;
		var CA =data1.AmountType;
		var IA = data1.AmountType;
		var PA = data1.AmountType;
		  await Function_Utility.AssureClaims_CollectionCalculation_Utility(RA,PA,CA,IA,"Calculate Collections in Reserve Balance","Check")

		 });
});