import { Selector, Role } from 'testcafe';
import { createTestCafe } from 'testcafe';
import Colors from 'colors';

import Verification_Utility from '../Functional_Utilities/Verification_Utility';
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import Maintenance_Functionality_Utility from '../Functional_Utilities/Maintenance_Functionality_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import Input_Utility from '../Functional_Utilities/Input_Utility';
import POM_WorkLossRestriction from '../Functional_POM/POM_WorkLossRestriction';
import POM_Enhanced_Notes from '../Functional_POM/POM_Enhanced_Notes';
import POM_Employee from '../Functional_POM/POM_Employee'
import POM_Patient from '../Functional_POM/POM_Patient'
import POM_Driver from '../Functional_POM/POM_Driver'
import POM_Entity from '../Functional_POM/POM_Entity'
import POM_Home from '../Functional_POM/POM_Home';
import POM_FinancialReserves from '../Functional_POM/POM_FinancialReserves';
import POM_ClaimComment from '../Functional_POM/POM_ClaimComment';
import POM_CommentSummary from '../Functional_POM/POM_CommentSummary';
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import POM_MedicalStaff from '../Functional_POM/POM_MedicalStaff';
import POM_Claimant from '../Functional_POM/POM_Claimant';
import POM_Search from '../Functional_POM/POM_Search'
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';
import POM_AttachCreateDiary from "../Functional_POM/POM_AttachCreateDiary";
import POM_GeneralSystemParameter from '../Functional_POM/POM_GeneralSystemParameter';

const DataIUT = require('../DataFiles/DataBurp.json');
const GenSysPara_POM = new POM_GeneralSystemParameter();
const Function_Utility = new Functionality_Utility();
const Generic_Utility = new GenericUsages_Utility();
const Nav_Utility = new Navigation_Utility();
const In_Utility = new Input_Utility();
const Verify_Utility = new Verification_Utility();

const AttachCreateDiary_POM = new POM_AttachCreateDiary();
const WorkLoss_POM = new POM_WorkLossRestriction();
const Home_POM = new POM_Home();
const Verification_Msg = new POM_VerificationMessage();
const Payment_POM = new POM_PaymentsCollections();
const Reserve_Utility = new POM_FinancialReserves();
const Claimant_POM = new POM_Claimant();
const Search_POM = new POM_Search();


//global variables
var StrWCClaimNumber;


DataIUT.forEach(data => {
    const LoggedInUser = Role(data.URL, async t => {
        await t.maximizeWindow()
        console.log("AssureClaims_LoginIntoApplication_Utility Function is Called To Login Into Application".yellow);
        await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username, data.Password, data.DSN, 'Claims')
        //Login into Claims zone
        await t.wait(5000)
        console.log("Login Into Application!!".green)
    }, { preserveUrl: true }
    );

    fixture`WC_ExhaustiveSmoke`.beforeEach(async t => {
        await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
    });

    test('AssureClaims_WorkLoss_TC_001', async t => {
        /*=========================================================== Utilities settings Started Here ========================================================================================================================================================================================================================================================================================================*/
        // await Generic_Utility.AssureClaims_Generic_ZoneSwitching("Utilities")
        // await t.setNativeDialogHandler(() => true);
        // await t.eval(() => location.reload(true));
        // await t.wait(8000);
        // await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_UtilitiesIframe);
        // await t.wait(3000)
        // await Nav_Utility.AssureClaims_ElementClick_Utility(GenSysPara_POM.AssureClaimsApp_Lnk_GenSysParaSetup.withText('General System Parameter Setup'), "General System ParameterSetup Link")
        // await t.wait(10000)
        // await t.switchToMainWindow();
        // await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GeneralSystemParameterSetupIframe);
        // await t.wait(10000);
        // await Nav_Utility.AssureClaims_ElementClick_Utility(GenSysPara_POM.AssureClaimsApp_GenSysParaSetup_Btn_Funds, "Click on Funds Setting Button")
        // await t.wait(6000);
        // await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(GenSysPara_POM.AssureClaimsApp_GenSysParaSetup_Chk_WorklossRestrictionFromDateToDate, 'Check', "Create Work Loss and Restriction Records From Funds From/To Dates")
        // await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Click on Utilities Save Button")
        /*=========================================================== Utilities settings end Here ========================================================================================================================================================================================================================================================================================================*/

        /*=========================================================== Worker Compensation Claim Creation Started Here========================================================================================================================================================================================================================================================================================================*/
        var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
        console.log("AssureClaims_WorkersCompClaimCreation Function is Called To Create Worker Compensation Claim".yellow);
        await t.wait(8000)
        StrWCClaimNumber = await Function_Utility.AssureClaims_WorkersCompClaimCreation(d, d, data.WCClaimStatus, data.WCClaimType, data.Department, data.WCPolicyLOB, data.WCJurisdiction)
        console.log("New Worker Compensation Claim is Created with Claim Number: ".green + StrWCClaimNumber);
        //Worker Compensation Claim Creation
        /*===========================================================Worker Compensation Claim Creation Completed Here========================================================================================================================================================================================================================================================================================================*/
        /*=========================================================== Add Workloss Creation started Here========================================================================================================================================================================================================================================================================================================*/
        await t.wait(3000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Icon_3dots, "Person involve link");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Lnk_PIClaim.withText("Smith, John"), "PI link")
        await t.wait(5000);
        await t.switchToMainWindow();
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PIEventFrame);
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_PiWorkLoss, "Select the workloss tab");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_AddPIWorkloss, "Add new workloss");

        //Local variables for LastWorkday/ReturnWorkDay ===============================================================================================================================================================================================
        var NewDate = new Date(d);
        NewDate.setDate(NewDate.getDate() - 4);
        var LastWorkDay = await Generic_Utility.AssureClaims_formatDatetoMMDDYYYY(NewDate);
        console.log("LastWorkDay: ".green + LastWorkDay.toString());
        var NewDate1 = new Date(d);
        NewDate1.setDate(NewDate1.getDate() - 1);
        var ReturnWorkDay = await Generic_Utility.AssureClaims_formatDatetoMMDDYYYY(NewDate1);
        console.log("ReturnWorkDay: ".green + ReturnWorkDay.toString());
        //Local variables for LastWorkday/ReturnWorkDay ends ==============================================================================================================================================================================================

        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_datelastworked, LastWorkDay, "Put last workdate ");
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_datereturned, ReturnWorkDay, "Put return workdate ");
        //calculate Duration=================================================================================================================================================================================================================================
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Calculate_Duration, "Calculate duration");
        //calculate Duration ends ==========================================================================================================================================================================================================================
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On PI Screen");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " PI Screen");
        var duration = await Verify_Utility.AssureClaims_AttributeFetch_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_duration, "value");
        console.log("duration:" + duration);
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PIEventFrame);
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_PiWorkLoss, "Select the workloss tab");
        const ColHeader = ["Last Work Day", "Return To Work", "Duration"]
        const ColValue = [LastWorkDay, ReturnWorkDay, duration]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(LastWorkDay, "Work loss Grid", ColHeader, ColValue);
        /*=========================================================== Add Workloss Creation ends Here========================================================================================================================================================================================================================================================================================================*/

        // Add New Workloss and check the overlapping Dates senerios==========================================================================================================================================================================================================================================
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_AddPIWorkloss, "Add new workloss");
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_datelastworked, LastWorkDay, "Put last workdate ");
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_datereturned, ReturnWorkDay, "Put return workdate ");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On PI Screen");
        //Verify the toast message====================================================================================================================================================================================================================================================================================

        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Close, "Close the toast");
        console.log('Last Work Date can not be the same for any two work loss periods is not acceptable is verified.');
        var NewDate3 = new Date(LastWorkDay);
        NewDate3.setDate(NewDate3.getDate() - 1);
        var LastWorkDayNew = await Generic_Utility.AssureClaims_formatDatetoMMDDYYYY(NewDate3);
        console.log("LastWorkDayNew: ".green + LastWorkDayNew.toString());
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_datelastworked, LastWorkDayNew, "Put last workdate ");
        //Verify the toast message=======================================================================================================================================================================================================================================================================================
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On PI Screen");

        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Close, "Close the toast");
        console.log('Return To Work Date can not be the same for any two work loss periods is not acceptable is verified.')

        //New Local variables for LastWorkday/ReturnWorkDay ==============================================================================================================================================================================================================================================================
        var NewWorklossDate = new Date(d);
        NewWorklossDate.setDate(NewWorklossDate.getDate() + 1);
        var New_WorklossDate = await Generic_Utility.AssureClaims_formatDatetoMMDDYYYY(NewWorklossDate);
        console.log("New_WorklossDate: ".green + New_WorklossDate.toString());

        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_datelastworked, New_WorklossDate, "Put last workdate ");
        //New Local variables for ReturnWorkDay ==============================================================================================================================================================================================================================================================
        var NewReturnlossDate = new Date(d);
        NewReturnlossDate.setDate(NewReturnlossDate.getDate() + 4);
        var New_ReturnlossDate = await Generic_Utility.AssureClaims_formatDatetoMMDDYYYY(NewReturnlossDate);
        console.log("New_ReturnlossDate: ".green + New_ReturnlossDate.toString());
        await t.wait(2000);
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_datereturned, "cleanup");
        await t.pressKey('ctrl+a delete')
        await t.wait(2000);
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_datereturned, New_ReturnlossDate, "Put return workdate ");
        //Calculate the new duration for next workloss==============================================================================================================================================================================================================================================================
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Calculate_Duration, "Calculate duration");
        //Calculate the new duration for next workloss ends==============================================================================================================================================================================================================================================================
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On PI Screen");
        await Verify_Utility.AssureClaims_VerifyUXMessage_Utility(Verification_Msg.AssureClaims_Generic_SaveMessage, false, " PI Screen");
        var duration2 = await Verify_Utility.AssureClaims_AttributeFetch_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_duration, "value");
        console.log("duration2: " + duration2);
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PIEventFrame);
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_PiWorkLoss, "Select the workloss tab");

        //Verify the New workloss/returnloss ==============================================================================================================================================================================================================================================================
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_FilterLastWorkDay, New_WorklossDate, "Filter New_WorklossDate")
        const ColHeader1 = ["Last Work Day", "Return To Work", "Duration"]
        const ColValue1 = [New_WorklossDate, New_ReturnlossDate, duration2]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(New_WorklossDate, "Work loss Grid", ColHeader1, ColValue1);

        //Verify the total duration==============================================================================================================================================================================================================================================================
        var TotalDuration = parseInt(duration) + parseInt(duration2);
        console.log("Total duration:" + TotalDuration);

        /*=========================================================== Verify the workloss on claims screen started Here========================================================================================================================================================================================================================================================================================================*/
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload, "reload btn pressed");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PIEventFrame);
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Icon_3dots_Claim, "Claim link");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Lnk_PIClaim.withText(StrWCClaimNumber), "Claim Link")

        await t.switchToMainWindow();
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_MedicalInfo_Tab, "Medical tab open");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_WorkLoss, "Click on workloss btn");


        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_FilterLastWorkDay, LastWorkDay, "Filter New_WorklossDate")
        const ColHeader3 = ["Last Work Day", "Return To Work", "Duration"]
        const ColValue3 = [LastWorkDay, ReturnWorkDay, duration]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(LastWorkDay, "Work loss Grid", ColHeader3, ColValue3);

        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_FilterLastWorkDay, New_WorklossDate, "Filter New_WorklossDate")
        const ColHeader4 = ["Last Work Day", "Return To Work", "Duration"]
        const ColValue4 = [New_WorklossDate, New_ReturnlossDate, duration2]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(New_WorklossDate, "Work loss Grid", ColHeader4, ColValue4);

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_DeleteIcon, "Delete the Workloss")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_done.withText("done"), "Done with ok")

        /*=========================================================== Verify the workloss on claims screen started Here========================================================================================================================================================================================================================================================================================================*/

    });

    test('AssureClaims_Restriction_TC_002', async t => {

        await Function_Utility.AssureClaims_SearchClaim(StrWCClaimNumber)
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
        /*=========================================================== Add Workloss Creation started Here========================================================================================================================================================================================================================================================================================================*/
        await t.wait(3000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Icon_3dots, "Person involve link");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Lnk_PIClaim.withText("Smith, John"), "PI link")
        await t.wait(5000);
        await t.switchToMainWindow();
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PIEventFrame);
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_PiRestricted, "Select the restriction tab");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_AddPIWorkloss, "Add new restriction");
        var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");

        await t.wait(5000)
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_datefirstrestrct, d, "Put FirstRestrictionDay ");
        await t.wait(3000);
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_datelastrestrct, d, "Put LastRestrictionDay ");

        await t.wait(6000);
        //calculate Duration ends==============================================================================================================================================================================================================================================================
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "save PI");
        await t.wait(2000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "save PI");
        await t.wait(10000);

        // await t.wait(3000);
        var Resduration = await Verify_Utility.AssureClaims_AttributeFetch_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_duration, "value");
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PIEventFrame);
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_PiRestricted, "Select the restricted tab");
        const Header = ["First Day Restricted", "Last Day Restricted", "Duration"]
        const Value = [d, d, Resduration]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(d, "Restriction Grid", Header, Value);
        /*=========================================================== Add Workloss Creation ends Here========================================================================================================================================================================================================================================================================================================*/
        // Add New Workloss and check the overlapping Dates senerios==============================================================================================================================================================================================================================================================
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_AddPIWorkloss, "Add new restriction");
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_datefirstrestrct, d, "Put  FirstRestrictionDay");

        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On PI Screen");
        //Verify the toast message==============================================================================================================================================================================================================================================================
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Close, "Close the toast");

        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_datefirstrestrct, d, "Put last workdate ");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On PI Screen");
        //Verify the toast message==============================================================================================================================================================================================================================================================
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Close, "Close the toast");

        //New Local variables for New_LastRestrictionDay/New_FirstRestrictionDay==============================================================================================================================================================================================================================================================
        var resDate1 = new Date(d);
        resDate1.setDate(resDate1.getDate() + 1);
        var New_FirstRestrictionDay = await Generic_Utility.AssureClaims_formatDatetoMMDDYYYY(resDate1);
        console.log("New_FirstRestrictionDay: ".green + New_FirstRestrictionDay.toString());

        var resDate2 = new Date(d);
        resDate2.setDate(resDate2.getDate() + 3);
        var New_LastRestrictionDay = await Generic_Utility.AssureClaims_formatDatetoMMDDYYYY(resDate2);
        console.log("New_LastRestrictionDay: ".green + New_LastRestrictionDay.toString());
        //New Local variables for New_LastRestrictionDay/New_FirstRestrictionDay==============================================================================================================================================================================================================================================================

        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_datefirstrestrct, New_FirstRestrictionDay, "Put first workdate ");
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_datelastrestrct, New_LastRestrictionDay, "Put last workdate ");

        await t.click(Selector('#Save i').withText('save'));
        var Resduration2 = await Verify_Utility.AssureClaims_AttributeFetch_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_duration, "value");
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PIEventFrame);
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_PiRestricted, "Select the restriction tab");

        //Verify the New workloss/returnloss==============================================================================================================================================================================================================================================================
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_FilterLastWorkDay, New_FirstRestrictionDay, "Filter New_FirstRestrictionDay")
        const Header1 = ["First Day Restricted", "Last Day Restricted", "Duration"]
        const Value1 = [New_FirstRestrictionDay, New_LastRestrictionDay, Resduration2]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(New_FirstRestrictionDay, "Restriction Grid", Header1, Value1);

        //Verify the total duration
        var ResTotalDuration = parseInt(Resduration) + parseInt(Resduration2);
        console.log("ResTotalDuration:" + ResTotalDuration);

        /*=========================================================== Verify the workloss on claims screen started Here========================================================================================================================================================================================================================================================================================================*/
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload, "reload btn pressed");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back btn pressed");
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_PIEventFrame);
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Icon_3dots_Claim, "Claim link");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Lnk_PIClaim.withText(StrWCClaimNumber), "Claim Link")

        await t.switchToMainWindow();
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkerCompensation_ClaimWCIFrame)
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_MedicalInfo_Tab, "Medical tab open");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_Restrictions, "Click on Restriction btn");


        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_FilterLastWorkDay, d, "Filter FirstRestrictionDay")
        const Header2 = ["First Day Restricted", "Last Day Restricted", "Duration"]
        const Value2 = [d, d, Resduration]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(d, "Restriction Grid", Header2, Value2);

        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_FromToDate_Txt_FilterLastWorkDay, New_FirstRestrictionDay, "Filter New_FirstRestrictionDay")
        const Header3 = ["First Day Restricted", "Last Day Restricted", "Duration"]
        const Value3 = [New_FirstRestrictionDay, New_LastRestrictionDay, Resduration2]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(New_FirstRestrictionDay, "Restriction Grid", Header3, Value3);
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window");
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_DeleteIcon, "Delete the Workloss")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_FromToDate_Btn_done.withText("done"), "Done with ok")


        /*=========================================================== Verify the workloss on claims screen started Here========================================================================================================================================================================================================================================================================================================*/

    });

});


