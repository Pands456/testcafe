import { Selector,Role } from 'testcafe';
import { createTestCafe } from 'testcafe';
import { ClientFunction } from 'testcafe';
import Colors from 'colors'
import Input_Utility from '../Functional_Utilities/Input_Utility';
import Verification_Utility from '../Functional_Utilities/Verification_Utility';
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import POM_DataCollection from '../Functional_POM/POM_DataCollection';
import POM_Home from '../Functional_POM/POM_Home';

const AssureClaims_DataIUT = require('../DataFiles/DataIUT.json');
const In_Utility = new Input_Utility();
const Nav_Utility = new Navigation_Utility();
const Verify_Utility = new Verification_Utility();
const Function_Utility = new Functionality_Utility();
const Generic_Utility = new GenericUsages_Utility();
const Verification_Msg = new POM_VerificationMessage();
const DataCollectionConfig_POM = new POM_DataCollection();
const Home_POM = new POM_Home();
const getLocation = ClientFunction(() => window.location.href);
var faker = require('faker');

AssureClaims_DataIUT.forEach(data => {
const LoggedInUser = Role(data.URL , async t => {
    await t.maximizeWindow()
    console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Utilities')
    await t.wait(5000)
    console.log("Login Into Application!!".green)
},{ preserveUrl: true }
);

fixture `DataCollection`.beforeEach(async t => {
  await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
});

test('AssureClaims_DataCollection_TC_001', async t => {
    //=====================================================Audience Creation Started Here====================================================================
    console.log("AssureClaims_Audience_Utility Function is Called To Create Audience".yellow); 
    var AudienceName = "Audience"+faker.random.alpha({ count: 4, upcase: true })   
    await Function_Utility.AssureClaims_Audience_Utility("Create",AudienceName,data.Origin,"Yes","Yes","","","","NA" )
    console.log("New Audience is Created with Audience Name: ".green+AudienceName)
    //Audience Creation
   //=====================================================Audience Creation Completed Here====================================================================
    
        var ConfigurationName = "Data Collection: GC"+faker.random.alpha({ count: 4, upcase: true });
        await t.switchToMainWindow();
        await t.wait(2000);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Btn_HomeOfUtilities,"Click on Home Button On Utilities Screen");
        await t.wait(20000);
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_UtilitiesIframe);       
        await Nav_Utility.AssureClaims_ElementClick_Utility(DataCollectionConfig_POM.AssureClaims_Utility_Lnk_DataCollectionConfiguration,"Click on Data Collection Configuration Link");
        await t.switchToMainWindow();
        await t.wait(2000);
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_DataCollectionConfigIframe);
        await t.wait(2000);
        console.log(await getLocation());
        console.log("Data Collection Configuration Screen Is Opened Up".green);
        await Nav_Utility.AssureClaims_ElementClick_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Btn_AddNew,"Click on Add New Button On Data Collection Configuration")
        await t.wait(2000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Lnk_CreateANewOne,"Click on Create A New One Link")
        //Step1: Data Collection Info
        await In_Utility.AssureClaims_SetValue_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Txt_Name,ConfigurationName,"Name On Data Collection Configuration Screen")
        await In_Utility.AssureClaims_SetValue_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Txt_Description,ConfigurationName,"Description On Data Collection Configuration Screen")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Chk_Active,"Check","Active Checkbox On Data Collection Configuration Screen")                   
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Chk_SaveAsDraft,"Check","Save As Draft Checkbox On Data Collection Configuration Screen")                   
        //Step2: View Configuration
        await Nav_Utility.AssureClaims_ElementClick_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Tab_ViewConfiguration,"View Configurstion Tab On Data Collection Configuration Screen")
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Lst_ReporterView,data.ReporterView,"Reporter View On Data Collection Configuration Screen")
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Lst_ApproverView,data.ApproverView,"Approver View On Data Collection Configuration Screen")
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Lst_Type,"General Claim","Type On Data Collection Configuration Screen")
        await Nav_Utility.AssureClaims_ElementClick_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Btn_Add,"Add Button On Data Collection Configuration Screen")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Chk_Attachment,"Check","Attachment Checkbox On Data Collection Configuration Screen")                    
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Chk_Claimant,"Check","Claimant Checkbox On Data Collection Configuration Screen")                     
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Chk_Notes,"Check","Notes Checkbox On Data Collection Configuration Screen")                     
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Chk_PersonInvolved,"Check","PersonInvolved Checkbox On Data Collection Configuration Screen")                    
        //Step3: Login Configuration
        await Nav_Utility.AssureClaims_ElementClick_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Tab_LoginConfiguration,"Click on Login Configurstion Tab On Data Collection Configuration")
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Lst_LoginType,"User Name","Login Type On Data Collection Configuration Screen")
        await In_Utility.AssureClaims_SetValue_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Txt_UserName,"EMP NUM","User Name On Data Collection Configuration Screen")
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Lst_UserNameTable,"EMPLOYEE","User Name Table On Data Collection Configuration Screen")
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Lst_UserNameField,"Employee Number","User Name Field On Data Collection Configuration Screen")
        //Step4: Access Configuration
        await Nav_Utility.AssureClaims_ElementClick_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Tab_AccessConfiguration,"Click on Access Configurstion Tab On Data Collection Configuration")
        await In_Utility.AssureClaims_SetValueAndTabOut_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Txt_LoginUserName,data.Username,"Login User Name On Data Collection Configuration Screen")
        await t.wait(2000)
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Lst_LinkExpirationTime,AudienceName,"Link Expiration Time On Data Collection Configuration Screen")
        await In_Utility.AssureClaims_SetValueAndTabOut_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Txt_Reporter,data.ReporterEmailID,"Reporter Mail Users On Data Collection Configuration Screen")
        await In_Utility.AssureClaims_SetValueAndTabOut_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Txt_Approver,data.ApproverEmailID,"Approvers On Data Collection Configuration Screen")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Chk_AssignDiary,"Check","Assign Diary Checkbox On Data Collection Configuration Screen")                    
        await In_Utility.AssureClaims_SetValueAndTabOut_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Txt_AssignDiaryToUser,data.Username,"Assign Diary To User/Group On Data Collection Configuration Screen")
        //Step5: Page Configuration
        await Nav_Utility.AssureClaims_ElementClick_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Tab_PageConfiguration,"Click on Page Configurstion Tab On Data Collection Configuration")
        await Nav_Utility.AssureClaims_ElementClick_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Lst_Theme,"Theme On Data Collection Configuration")
        await Nav_Utility.AssureClaims_ElementClick_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Lst_SelectedTheme,"Selected Theme On Data Collection Configuration")        
        //Step6: Mail Configuration
        await Nav_Utility.AssureClaims_ElementClick_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Tab_MailConfiguration,"Click on Mail Configurstion Tab On Data Collection Configuration")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Chk_NotifyApprover,"Check","Notify Approver Checkbox On Data Collection Configuration Screen")                    
        //Save Data Collection Configuration
        await Nav_Utility.AssureClaims_ElementClick_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Btn_Save,"Click on Save Button On Data Collection Configuration")
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, "Data Collection Configuration Screen")
        console.log("New Data Collection Configuration is Created with Name: ".green+ConfigurationName);
        
        //Navigate Back to Data Collection Configuration List Screen And Verify The Existance Of Created Configuration 
        await Nav_Utility.AssureClaims_ElementClick_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Btn_Back,"Click on Back Button On Data Collection Configuration")
        await t.wait(5000);
        await In_Utility.AssureClaims_SetValueAndTabOut_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Txt_ConfigNameFilterOnGrid,ConfigurationName,"Configuration Name On Data Collection Configuration List Screen")
        const eleNameOnGrid = DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Txt_ConfigNameOnGrid.withText(ConfigurationName)
        await Verify_Utility.AssureClaims_ElementExist_Utility(eleNameOnGrid)
        console.log("Newly Created Data Collection Configuration with Name: ".green+ConfigurationName+" is displayed on Data Collection Configuration List Screen")

        //Delete the above created Data Collection Configuration
        await Nav_Utility.AssureClaims_ElementClick_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Select_ConfigRowOnGrid,"Select Created Data Collection Configuration Row")
        await Nav_Utility.AssureClaims_ElementClick_Utility(DataCollectionConfig_POM.AssureClaims_DataCollectionConfig_Btn_Delete,"Click on Delete Button On Data Collection Configuration")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_DeleteOK,"Ok Button On Confirm Delete PopUp On Data Collection Configuration");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_DeleteMessage, false, "Data Collection Configuration Screen")
        console.log("Data Collection Configuration is Deleted with Name: ".green+ConfigurationName);
       
    //=====================================================Audience Deletion Started Here====================================================================
    await t.switchToMainWindow();
    await t.wait(2000);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Btn_HomeOfUtilities,"Click on Home Button On Utilities Screen");
    console.log("AssureClaims_Audience_Utility Function is Called To Delete Audience".yellow); 
    await Function_Utility.AssureClaims_Audience_Utility("Delete",AudienceName,"NA","NA","NA","NA","NA","NA","NA" )
    console.log("Audience is Deleted with Audience Name: ".green+AudienceName);
    //Audience Deletion
    //=====================================================Audience Deletion Completed Here====================================================================
    
});

test.after(async t =>{
        await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
        console.log("AssureClaims_LogoutFromApplication_Utility Function Is Called To LogOut From Application!!".yellow);
        await Function_Utility.AssureClaims_LogoutFromApplication_Utility();
        
});
});