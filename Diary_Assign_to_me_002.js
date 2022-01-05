import { Selector,Role } from 'testcafe';

import Colors from 'colors';
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import Input_Utility from '../Functional_Utilities/Input_Utility';
import POM_DiaryList from '../Functional_POM/POM_DiaryList';
import POM_DiaryUtilities from '../Functional_POM/POM_DiaryUtilities';
import Verification_Utility from '../Functional_Utilities/Verification_Utility'
import POM_AttachCreateDiary from '../Functional_POM/POM_AttachCreateDiary'
import POM_Search from '../Functional_POM/POM_Search'
import POM_Home from '../Functional_POM/POM_Home';
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';
import POM_Document_Event from '../Functional_POM/POM_Document_Event';
import POM_GeneralSystemParameter from '../Functional_POM/POM_GeneralSystemParameter';

const Home_POM = new POM_Home();
const DataIUT = require('../DataFiles/DataIUT.json');


//const DataAutoReg = require('../DataFiles/DataAutoReg.json');
const Function_Utility = new Functionality_Utility();
const Nav_Utility=new Navigation_Utility();
const Generic_Utility = new GenericUsages_Utility();
const Verification_Msg = new POM_VerificationMessage();
const In_Utility = new Input_Utility();
const Diary_Creation = new POM_DiaryList();
const Verify_Utility = new Verification_Utility();
const Diary_Utilities=new POM_DiaryUtilities();
const AttachCreateDiary_POM = new POM_AttachCreateDiary();
const Search_POM = new POM_Search();
const Payment_POM = new POM_PaymentsCollections();
const Event_POM = new POM_Document_Event();
const GenSysPar_POM=new POM_GeneralSystemParameter();

var faker = require('faker');
const menu = Selector('#side-menu');

var date = new Date();
var d = (date.getMonth()+1)+'/'+(date.getDate())+'/'+date.getFullYear();  
var TaskName1;
var UserLastName=faker.name.lastName();
var UserFirstName=faker.name.firstName();
var DiaryOwner=UserFirstName+" "+UserLastName;    
//Global Variable Declaration


DataIUT.forEach(data => {
  fixture `Diary_Suite_Smoke`.beforeEach(async t => {
        await t.wait(5000)
        await t.navigateTo(data.URL);
        await t.maximizeWindow();
      });
       test('AssureClaims_UserCreation_Test_01', async t => {
        await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Security')
        console.log("Login Into Application!!".green)
        //User Is Created
      console.log("AssureClaims_SMSUserAddEditDelete_Utility Function is Called To Create User"); 
       await Function_Utility.AssureClaims_SMSUserAddEditDelete_Utility('Add',UserLastName,UserFirstName,'NA',data.DSN,'Administrator')
       console.log("User Created :"+UserFirstName)      
});

   test('AssureClaims_DiaryPeek_Route_Test_02', async t => {

     await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Utilities')
     console.log("Login Into Application!!".green)
      await t.wait(4000);
      await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_UtilitiesIframe);
      await t.wait(8000)
      await Nav_Utility.AssureClaims_ElementClick_Utility(GenSysPar_POM.AssureClaimsApp_Lnk_GenSysParaSetup.withText('General System Parameter Setup'),"Click on Genreal System Parameter Link")
      await t.wait(8000);
      await t.switchToMainWindow();
      await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GeneralSystemParameterSetupIframe);
      await t.wait(8000);
      await Nav_Utility.AssureClaims_ElementClick_Utility(GenSysPar_POM.AssureClaimsApp_GenSysParaSetup_Btn_Diaries,"Click on Diaries/Fields Button")
      await t.wait(5000)
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(GenSysPar_POM.AssureClaimsApp_GenSysParaSetup_Chk_DefaultAssignedToDairyCurrentUser,'UnCheck',"Uncheck Default Assigned To Diary User Check Box")
      await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(GenSysPar_POM.AssureClaims_GenSysParaSetup_Chk_AllowDiaryPeek,'Check',"Check Allow Global Peek for Diaries CheckBox")
      await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Click on Utilities Save Button")
      await t.wait(10000);

    
     await Generic_Utility.AssureClaims_Generic_ZoneSwitching("Claims")
     await t.setNativeDialogHandler(() => true);
     await t.eval(() => location.reload(true));
     await t.wait(10000);
     //Zone Switched to "Claims" 

     console.log("AssureClaims_Diary_Creation_Utility Function is Called To Create Diary"); 
     TaskName1= await Function_Utility.AssureClaims_Diary_Creation_Utility(UserFirstName);
     console.log("Diary Created with Taskname : "+TaskName1); 

     //Steps for Peek Diary
     await t.wait(8000);
     await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaimsApp_DiariesPeek_Btn_Peek,"Click on peek button")
     await In_Utility.AssureClaims_SetValue_Utility(Diary_Creation.AssureClaims_DiaryCreation_Txt_AvailableUsers,UserFirstName,"Available User TextBox")
     await t.pressKey('tab');
     await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_DiaryCreation_Btn_Peek,"Click on peek button")
     await t.wait(2000);
	 await In_Utility.AssureClaims_SetValue_Utility(Diary_Creation.AssureClaimsApp_Diaries_Txt_TaskName,TaskName1,"TaskName1 TextBox")
	 await t.wait(4000);
     await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_SystemUsers_Btn_FilterSearchTaskName1,"Click on Search Button")
	 await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaimsApp_SystemUsers_Img_RowSelector,"Select the user")
     await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_btnAssignToMeDiary, "Assign to me btn clicked" )
     await t.wait(2000)
	 console.log("Diary is assigned to logged in user!!".green)
	 await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_btn_diary_home, "Click on Home button" )
	 
	 
	
     await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaimsApp_Diaries_Img_DropDown,"Click on DropDown")
     await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Diary_Creation.AssureClaimsApp_Diaries_Chk_ActiveDiaries,'Check',"Checked Active Diaries Check Box")
     await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Diary_Creation.AssureClaimsApp_Diaries_Chk_ShowNotes,'Check',"Checked Show Notes Check Box")
	 await In_Utility.AssureClaims_SetValue_Utility(Diary_Creation.AssureClaimsApp_Diaries_Txt_TaskName,TaskName1,"TaskName1 TextBox")
     await t.pressKey('tab');
     await t.wait(1000);
	 const ColHead = ["Assigned User","Assigning User"];
     const ColVal = [data.Username.toLowerCase(),data.Username.toLowerCase()]; 
     await Verify_Utility.AssureClaims_VerifyUXGrid_Utility('ABC','Diary Grid View',ColHead,ColVal)

      await t.switchToMainWindow();
      await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload,"Image reload");
      await t.switchToMainWindow();

 });
 });