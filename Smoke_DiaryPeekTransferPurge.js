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
var TaskName2;
var UserLastName=faker.name.lastName();
var UserFirstName=faker.name.firstName();
var DiaryOwner=UserFirstName+" "+UserLastName;
const ColHead = ["Assigned User","Assigning User"]
const ColVal = [UserFirstName.toLowerCase(),'autouser']       
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
       await Function_Utility.AssureClaims_SMSUserAddEditDelete_Utility('Add',UserLastName,UserFirstName,'NA',data.DSN,'Training')
       console.log("User Created :"+UserFirstName)      
});

  test('AssureClaims_DiaryPeek_Route_Test_02', async t => {

    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Utilities')
    console.log("Login Into Application!!".green)
     await t.wait(2000);
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
     await t.wait(4000);

    
    await Generic_Utility.AssureClaims_Generic_ZoneSwitching("Claims")
    await t.setNativeDialogHandler(() => true);
    await t.eval(() => location.reload(true));
    await t.wait(10000);
    //Zone Switched to "Claims" 

    console.log("AssureClaims_Diary_Creation_Utility Function is Called To Create Diary"); 
    TaskName1= await Function_Utility.AssureClaims_Diary_Creation_Utility(UserFirstName);
    console.log("Diary Created with Taskname : "+TaskName1); 

    //Steps for Peek Diary
    await t.wait(4000);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaimsApp_DiariesPeek_Btn_Peek,"Click on peek button")
    await In_Utility.AssureClaims_SetValue_Utility(Diary_Creation.AssureClaims_DiaryCreation_Txt_AvailableUsers,UserFirstName,"Available User TextBox")
    await t.pressKey('tab');
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_DiaryCreation_Btn_Peek,"Click on peek button")
    await t.wait(2000);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaimsApp_Diaries_Img_DropDown,"Click on DropDown")
    await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Diary_Creation.AssureClaimsApp_Diaries_Chk_ActiveDiaries,'Check',"Checked Active Diaries Check Box")
    await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Diary_Creation.AssureClaimsApp_Diaries_Chk_ShowNotes,'Check',"Checked Show Notes Check Box")
    await t.pressKey('tab');
    await t.wait(1000);

    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload,"Image reload");
    await t.switchToMainWindow();

    //Diary2 Created
    console.log("AssureClaims_Diary_Creation_Utility Function is Called To Create Diary");
    TaskName2 = await Function_Utility.AssureClaims_Diary_Creation_Utility(data.Username);
    console.log("Diary Created with Taskname : "+TaskName2); 
    await t.wait(4000)

    //Diary Route Begins Here
    await In_Utility.AssureClaims_SetValue_Utility(Diary_Creation.AssureClaimsApp_Diaries_Txt_TaskName, TaskName2,"TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_SystemUsers_Btn_FilterSearchTaskName,"Click on Search Button")
    await Nav_Utility.AssureClaims_ElementClick_Utility(AttachCreateDiary_POM.AssureClaims_AttachCreate_Btn_SelectGrid, "Grid Button Selected")
    await t.wait(2000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_DiariesRoute_Btn_Route,"Route Diary Button On DiaryList")
    await In_Utility.AssureClaims_SetValue_Utility(Diary_Creation.AssureClaims_DiariesRoute_Btn_RouteDiaryTo,UserFirstName,"Available User TextBox")
    await t.pressKey('tab');
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_DiariesRoute_Btn_Route,"Split Button On RouteDiary Page")
    await t.wait(4000)
    //Diary Route Ends Here

    //Routed Diary Verification Begins For Assigning User
    await In_Utility.AssureClaims_SetValue_Utility(Diary_Creation.AssureClaimsApp_Diaries_Txt_TaskName, TaskName2,"TaskName TextBox")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_SystemUsers_Btn_FilterSearchTaskName,"Click on Search Button")
    await Verify_Utility.AssureClaims_ElementNotExist_Utility(Diary_Creation.AssureClaimsApp_Diaries_Img_RowSelector,"TaskName");
    await t.wait(2000)
  });

  test('AssureClaims_TransferDiary_Test_03', async t => {

    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(UserFirstName, 'abkabk1', data.DSN, 'Utilities')
    //Login with New User
    await t.wait(4000);
    //Transfer Diary Utility Is Called
    var ToOwner=data.Username+" "+data.Username;
    console.log("AssureClaims_DiaryUtilities_TransferPurge_Utilityy Function is Called To TransferDiary"); 
    await Function_Utility.AssureClaims_DiaryUtilities_TransferPurge_Utility("Transfer", 'NA',UserFirstName, ToOwner, 'NA', d, d, TaskName2)

    //Zone Switched To Claims
    await Generic_Utility.AssureClaims_Generic_ZoneSwitching("Claims")
    await t.wait(10000)
    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Diaries:Diary List");
    await t.wait(4000)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.Assureclaims_Generic_DiaryFrame, "Diary Frame");
    await t.wait(2000);
    await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaims_Diary_Txt_NoRecordAvailable.withText("No Records Available."),"No records Available text ")
    //Diary will not be dispalyed in Diary List now 
  });


  test('AssureClaims_PurgeDiary_Test_04', async t => {
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
    console.log("Login Into Application!!".green)
    //Login with Data json User to verify the Transfer Dairies
    await t.wait(3000)
    await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Diaries:Diary List");
    await t.wait(4000)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.Assureclaims_Generic_DiaryFrame, "Diary Frame");
    await t.wait(3000);
    await In_Utility.AssureClaims_SetValue_Utility(Diary_Utilities.AssureClaims_TaskName_DiaryVerification, TaskName2, "TaskName")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Utilities.AssureClaims_SystemUsers_Btn_FilterSearchTaskName, "Search Button Clicked")

      //Zone Switched To Utilities
    await Generic_Utility.AssureClaims_Generic_ZoneSwitching("Utilities");
    await t.wait(4000)

    //PurgeDiary Utility Is Called
    console.log("AssureClaims_DiaryUtilities_TransferPurge_Utility Function is Called To Purge Created Diary"); 
    await Function_Utility.AssureClaims_DiaryUtilities_TransferPurge_Utility("Purge",DiaryOwner,'NA','NA','Open',d,d,'NA')

      //Zone Switched To Claims
       await Generic_Utility.AssureClaims_Generic_ZoneSwitching("Claims");
       await t.wait(10000);
       await Nav_Utility.AssureClaims_MenuOptionClick_Utility("Diaries:Diary List");
       await t.wait(2000)
       await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.Assureclaims_Generic_DiaryFrame, "Diary Frame");
       await t.wait(2000);
 
       //click on history button to verify
       await Nav_Utility.AssureClaims_ElementClick_Utility(Diary_Creation.AssureClaims_Diaries_Btn_History,"Click on History button")
       await t.wait(6000);
       
      
       await Verify_Utility.AssureClaims_ElementExist_Utility(Diary_Creation.AssureClaims_Diary_History_Lbl_TaskName.withText(TaskName2), TaskName2+": Created Taskname of Diary")
       await t.wait(3000);

       await Function_Utility.AssureClaims_LogoutFromApplication_Utility()
       console.log("AssureClaims_LogoutFromApplication_Utility Function Is Called To LogOut From Application!!".yellow);
});

test('AssureClaims_Utilities_ReverseSettings_Test_05', async t => {

  await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Utilities')
  console.log("Login Into Application!!".green)
   await t.wait(4000);
   await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_UtilitiesIframe);
   await t.wait(4000)
   await Nav_Utility.AssureClaims_ElementClick_Utility(GenSysPar_POM.AssureClaimsApp_Lnk_GenSysParaSetup.withText('General System Parameter Setup'),"Click on Genreal System Parameter Link")
   await t.wait(4000);
   await t.switchToMainWindow();
   await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GeneralSystemParameterSetupIframe);
   await t.wait(6000);
   await Nav_Utility.AssureClaims_ElementClick_Utility(GenSysPar_POM.AssureClaimsApp_GenSysParaSetup_Btn_Diaries,"Click on Diaries/Fields Button")
   await t.wait(4000)
   await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(GenSysPar_POM.AssureClaimsApp_GenSysParaSetup_Chk_DefaultAssignedToDairyCurrentUser,'Check',"Uncheck Default Assigned To Diary User Check Box")
   await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(GenSysPar_POM.AssureClaims_GenSysParaSetup_Chk_AllowDiaryPeek,'UnCheck',"Check Allow Global Peek for Diaries CheckBox")
   await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Click on Utilities Save Button")
   await t.wait(4000);
  
});

});

