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
import POM_Litigation from "../Functional_POM/POM_Litigation";
import POM_Home  from "../Functional_POM/POM_Home";
import POM_Callverisk from "../Functional_POM/POM_Callverisk";


const Function_Utility = new Functionality_Utility();
const Generic_Utility = new GenericUsages_Utility();
const Maint_Utility = new Maintenance_Functionality_Utility();
const Verification_Msg = new POM_VerificationMessage();
const WorkersComp_Claims = new POM_WorkersComp_Claims();
const Nav_Utility = new Navigation_Utility();
const Verify_Utility = new Verification_Utility();
const In_Utility = new Input_Utility();
const Generic_Claims = new POM_Generic_Claims();
const Litigation = new POM_Litigation();
const Call_Verisk = new POM_Callverisk();
const Home_POM=new POM_Home();

const DataIUT = require('../DataFiles/DataIUT_ORA.json');

var  strClaimNumber;
var LocationAdress1;
var LocationAdress2;
var State;
var Country;
var ZipCode;

DataIUT.forEach(data => {
    // let StrClaimNumber = ''
 
    const LoggedInUser = Role(data.URL, async t => {
        await t.wait(3000)
        await t.maximizeWindow()
        console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
        await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username, data.Password, data.DSN, 'Claims')
        await t.wait(5000)
        console.log("Login Into Application!!".green)
    }, { preserveUrl: true }
    );

    
    fixture `Verisk`.beforeEach(async t => {
        await t.wait(3000)
      await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
    });



test('Verisk_Test', async t => {
     	 await t.wait(50000)
        var date = new Date();
        var d = (date.getMonth()+1)+'/'+(date.getDate()-1)+'/'+date.getFullYear();
        await t.wait(5000)
       strClaimNumber=await Function_Utility.AssureClaims_GeneralClaimCreation(d,d,data.ClaimStatus,data.GCClaimType,data.Department,data.GCPolicyLOB)
                
                await t.wait(3000)
				await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_Event_Detail_Tab_General_claim,"Event Detail Tab On General claim Creation Screen");
				await t.wait(5000)
				await In_Utility.AssureClaims_SetValue_Utility(Generic_Claims.AssureClaims_Location_Address_1,"4133 Veterans Memorial Drive","LocationAdress1");
	            await t.wait(4000);

		        await In_Utility.AssureClaims_SetValue_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_Eventtab_Country,"USA","Country")
                await t.pressKey('tab')
		
		        await In_Utility.AssureClaims_SetValue_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_Eventtab_State,"NY","State")
                await t.pressKey('tab')
		
		
		 
			   
			   await In_Utility.AssureClaims_SetValue_Utility(Generic_Claims.AssureClaims_Eventtab_city,"Batavia","City");
	             await t.wait(4000);
				 await In_Utility.AssureClaims_SetValue_Utility(Generic_Claims.AssureClaims_Eventtab_zipcode,"140201234","ZipCode");
	             await t.wait(4000);
				

               
                await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On General Claim creation Screen");
                
		
		console.log("New General Claim is Created with Claim Number: ".green + strClaimNumber);
		/*===================================General Claim is Created===================================================================================================================================*/
        
        
         await Nav_Utility.AssureClaims_ElementClick_Utility(Call_Verisk.AssureClaims_Callverisk_morebtn, "Three Dot Button On Claim ToolBar")
         await t.wait(2000)
         await Nav_Utility.AssureClaims_ElementClick_Utility(Call_Verisk.AssureClaims_Callverisk_ClickCallveriskBtn,"CallVerisk Option From The List")
         await t.wait(10000)
		
         console.log("Verisk pop up is Opened!!".green)
		 /*=============================== Call Verisk App is opened in Pop Up Window=====================================================================================================================*/
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Call_Verisk.AssureClaims_Callverisk_Hailreport,'Check',"Hail Report checkbox on Verisk Report Pop Up Window");
		await t.wait(5000)
		await Nav_Utility.AssureClaims_ElementClick_Utility(Call_Verisk.AssureClaims_download_veriskreport,"Verisk Report download button is clicked");
		await t.wait(5000)
		  await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Call_Verisk.AssureClaims_Callverisk_HailHistoryreport,'Check',"Hail History Report Checkbox on Verisk Report Pop Up Window");
		  await t.wait(5000)
		  await Nav_Utility.AssureClaims_ElementClick_Utility(Call_Verisk.AssureClaims_download_veriskreport,"Verisk Report download button is clicked");
		  await t.wait(5000)
		 await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Call_Verisk.AssureClaims_Callverisk_windReports,'Check',"Wind Report Checkbox on Verisk Report Pop Up Window");
		 await t.wait(5000)
		  await Nav_Utility.AssureClaims_ElementClick_Utility(Call_Verisk.AssureClaims_download_veriskreport,"Verisk Report download button is clicked");
		  await t.wait(5000)
		  await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Call_Verisk.AssureClaims_Callverisk_windHistoryReports,'Check',"Wind History Report Checkbox on Verisk Report Pop Up Window");
		  await t.wait(5000)
		  await Nav_Utility.AssureClaims_ElementClick_Utility(Call_Verisk.AssureClaims_download_veriskreport,"Verisk Report download button is clicked");
		  await t.wait(5000)
		 await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Call_Verisk.AssureClaims_Callverisk_lightningReports,'Check',"Lightening Report Checkbox on Verisk Report Pop Up Window");
		  await t.wait(5000)
		  await Nav_Utility.AssureClaims_ElementClick_Utility(Call_Verisk.AssureClaims_download_veriskreport,"Verisk Report download button is clicked");
		  await t.wait(5000)
		  await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Call_Verisk.AssureClaims_Callverisk_lightningHistoryReports,'Check',"Lightening History Report Checkbox on Verisk Report Pop Up Window");
		  await t.wait(5000)
		  await Nav_Utility.AssureClaims_ElementClick_Utility(Call_Verisk.AssureClaims_download_veriskreport,"Verisk Report download button is clicked");
		await t.wait(5000)
		await Nav_Utility.AssureClaims_ElementClick_Utility(Call_Verisk.AssureClaims_Veriskreports_btnCancelmemo,"Cancel button is clicked"); 
		await t.wait(4000)
		//await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_Claim_Info_Tab_General_claim,"Claim Info Tab On General claim Creation Screen");
		await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload,"Image reload");
        await t.switchToMainWindow();
		await t.wait(8000)
		
		
		
		
		
		
        
 });




});