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
import POM_ClaimScan from "../Functional_POM/POM_ClaimScan";
import POM_Home  from "../Functional_POM/POM_Home";

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
const ClaimScan = new POM_ClaimScan();
const Home_POM=new POM_Home();

const DataIUT = require('../DataFiles/DataSTG.json');

var  strClaimNumber;

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

    
    fixture `Premonition`.beforeEach(async t => {
        await t.wait(3000)
      await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
    });



test('Premonition_PreSuit_Test', async t => {
     	 
        var date = new Date();
        var d = (date.getMonth()+1)+'/'+(date.getDate()-1)+'/'+date.getFullYear();
        await t.wait(5000)
       strClaimNumber=await Function_Utility.AssureClaims_GeneralClaimCreation(d,d,data.ClaimStatus,data.GCClaimType,data.Department,data.GCPolicyLOB)
                
                await t.wait(3000)

                await Nav_Utility.AssureClaims_ElementClick_Utility(Generic_Claims.AssureClaims_GenericClaim_Btn_Jurisdiction,"Jurisdiction Lookup")
                await t.wait(2000);        
                const ele4 = Generic_Claims.AssureClaims_GenericClaim_Lnk_Jurisdiction.withText(data.Jurisdiction).with({ visibilityCheck: true })
                await t.expect(ele4.exists).ok('', { timeout: 20000 })
                await Nav_Utility.AssureClaims_ElementClick_Utility(ele4,"Jurisdiction Option")
        
                await t.wait(2000)
               
                await In_Utility.AssureClaims_SetValue_Utility(Generic_Claims.AssureClaims_GenericClaim_Txt_JurisdictionCounty,data.JurisdictionCounty,"Jurisdiction County")
                await t.wait(2000)
                await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On General Claim creation Screen");
                
		
		console.log("New General Claim is Created with Claim Number: ".green + strClaimNumber);
		/*===================================General Claim is Created===================================================================================================================================*/
        
        
        await Nav_Utility.AssureClaims_ElementClick_Utility(ClaimScan.AssureClaims_ClaimScan_morebtn, "Three Dot Button On Claim ToolBar")
        await t.wait(2000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(ClaimScan.AssureClaims_ClaimScan_ClickClaimScanBtn,"ClaimScan Option From The List")
        await t.wait(10000)
		
        console.log("Claim Scan App is Open!!".green)
		/*=============================== Claim Scan App is opened in Pop Up Window=====================================================================================================================*/

		
        await Function_Utility.AssureClaims_PremonitionApp_Utility_PreSuit()  
        
        /*============================================================Pre Suit verification is done on Claim Scan App================================================================================================*/
        console.log("Claim Scan App is Closed!!".green)


		
});


test('Premonition_InSuit_Test_01', async t => {


        await Function_Utility.AssureClaims_SearchClaim(strClaimNumber)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)
		await t.wait(2000)
        await Function_Utility.AssureClaims_Create_New_Litigation(data.CourtName,data.County,data.VenueState,data.MatterName)
        /*=====================================================Litigation data required for In Suit is entered here========================================================================================================================*/

        await t.wait(5000)

});

test('Premonition_InSuit_Test_02', async t => {
        await t.wait(5000)
        await Function_Utility.AssureClaims_SearchClaim(strClaimNumber)
 
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GenericClaim_ClaimGCIframe)

        await Nav_Utility.AssureClaims_ElementClick_Utility(ClaimScan.AssureClaims_ClaimScan_morebtn, "Three Dot Button On Claim ToolBar")
        await t.wait(2000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(ClaimScan.AssureClaims_ClaimScan_ClickClaimScanBtn,"ClaimScan Option From The List")

        console.log("Claim Scan App is Opened!!".green)
        await t.wait(30000)

		/*====================================================================Claim Scan button is Clicked from the Claims toolbar========================================*/

       await Function_Utility.AssureClaims_PremonitionApp_Utility_InSuit()
	    console.log("Claim Scan App is Closed!!".green)

        /*====================================================================In Suit verification is done on Claim Scan App====================================================*/

	    await Function_Utility.AssureClaims_LogoutFromApplication_Utility();
	    console.log("LoggedOut!!".green)
});




});