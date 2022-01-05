import { Selector,Role } from 'testcafe';
import { ClientFunction } from 'testcafe';
import Colors from 'colors';

import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Verification_Utility from '../Functional_Utilities/Verification_Utility'
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import Input_Utility from '../Functional_Utilities/Input_Utility';
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import POM_Home from '../Functional_POM/POM_Home';
import POM_GeneralSystemParameter from '../Functional_POM/POM_GeneralSystemParameter';
import POM_WorkLossRestriction  from '../Functional_POM/POM_WorkLossRestriction';

const DataIUT = require('../DataFiles/DataIUT.json');
//const DataSTG = require('../DataFiles/DataSTG.json');
//const DataAutoReg = require('../DataFiles/DataAutoReg.json');
const Function_Utility = new Functionality_Utility();
const Nav_Utility=new Navigation_Utility();
const Generic_Utility = new GenericUsages_Utility();
const In_Utility = new Input_Utility();
const Verify_Utility = new Verification_Utility();
const Verification_Msg = new POM_VerificationMessage();
const Home_POM = new POM_Home();
const GenSysPara_POM=new POM_GeneralSystemParameter();
const WorkLoss_POM=new POM_WorkLossRestriction();

DataIUT.forEach(data => {
  fixture `UtilitySettingForWorklossRestriction`.beforeEach(async t => {
        await t.wait(5000)
        await t.navigateTo(data.URL);
        await t.maximizeWindow();
      });

      test('UtilitySetting_Test_01', async t => {

        await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Utilities')
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_UtilitiesIframe);
        await Nav_Utility.AssureClaims_ElementClick_Utility(GenSysPara_POM.AssureClaimsApp_Lnk_GenSysParaSetup.withText('General System Parameter Setup'),"General System ParameterSetup Link")
        await t.wait(5000)
        await t.switchToMainWindow();
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_GeneralSystemParameterSetupIframe);
        await t.wait(6000);
        await Nav_Utility.AssureClaims_ElementClick_Utility(GenSysPara_POM.AssureClaimsApp_GenSysParaSetup_Btn_Funds,"Click on Funds Setting Button")
        await t.wait(4000);
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(GenSysPara_POM.AssureClaimsApp_GenSysParaSetup_Chk_WorklossRestrictionFromDateToDate,'Check',"Create Work Loss and Restriction Records From Funds From/To Dates")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Click on Utilities Save Button")
        //===============================General System Parameter->FundsSetting->Create Work Loss and Restriction Records From Funds From/To Dates=======================================================================================================
        await t.wait(4000);
        await t.switchToMainWindow();
        await Nav_Utility.AssureClaims_ElementClick_Utility(GenSysPara_POM.AssureClaimsApp_GenSysParaSetup_Btn_BackToUtility,"Back to Utility Screen")
        await t.switchToMainWindow();
        await t.wait(2000);
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_UtilitiesIframe);
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_Utility_Lnk_WorkLossRestrictionsMapping,"Work Loss/Restrictions Mapping")
        await t.wait(10000)
        await t.switchToMainWindow();
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_WorkLossRestrictionsMappingIframe);
        await t.wait(2000);
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(WorkLoss_POM.AssureClaims_Utility_Chk_LOBWC,'Check',"WC Worker's Compensation")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(WorkLoss_POM.AssureClaims_Utility_Chk_RecordTypeWorkLoss,'Check',"WorkLoss Record Type")
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_Utility_Txt_TransTypeLookup,"IV","IV Investigation Expense")
        await t.pressKey('tab');
        await t.wait(20000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_Utility_Btn_AddRecord,"Add Record")
        await t.wait(10000)
        //==================================================Work Loss/Restrictions Mapping->Add Record of WorkLoss(IV Investigation Expense)==============================================================================================================

        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(WorkLoss_POM.AssureClaims_Utility_Chk_LOBWC,'Check',"WC Worker's Compensation")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(WorkLoss_POM.AssureClaims_Utility_Chk_RecordTypeWorkLoss,'Check',"WorkLoss Record Type")
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_Utility_Txt_TransTypeLookup,"IV","IV Investigation Expense")
        await t.pressKey('tab');
        await t.wait(20000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_Utility_Btn_AddRecord,"Add Record")
        await Verify_Utility.AssureClaims_ElementExist_Utility(WorkLoss_POM.AssureClaims_Utility_VerifyTxt_RecordExist.withText('Record already exists.'), "Verify Text Record already exists.");
        //==================================================Work Loss/Restrictions Mapping->Add Record of WorkLoss(IV Investigation Expense),Again add to verify Record already exists. msg ============================================================================================================

        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_Utility_Btn_SelectRecord,"Select Created Record")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_Utility_Btn_DeleteRecord,"Delete Record")
        //=========================================================Delete Created Record===============================================================================================================================================================================
   
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(WorkLoss_POM.AssureClaims_Utility_Chk_LOBWC,'Check',"WC Worker's Compensation")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(WorkLoss_POM.AssureClaims_Utility_Chk_RecordTypeRestriction,'Check',"Restriction Record Type")
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_Utility_Txt_TransTypeLookup,"EXF","EXF Expert Witness Fees")
        await t.pressKey('tab');
        await t.wait(20000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_Utility_Btn_AddRecord,"Add Record")
        await t.wait(10000)
        //==================================================Work Loss/Restrictions Mapping->Add Record of Restriction(EXF Expert Witness Fees)==============================================================================================================
        
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(WorkLoss_POM.AssureClaims_Utility_Chk_LOBWC,'Check',"WC Worker's Compensation")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(WorkLoss_POM.AssureClaims_Utility_Chk_RecordTypeRestriction,'Check',"Restriction Record Type")
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_Utility_Txt_TransTypeLookup,"EXF","EXF Expert Witness Fees")
        await t.pressKey('tab');
        await t.wait(20000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_Utility_Btn_AddRecord,"Add Record")
        await Verify_Utility.AssureClaims_ElementExist_Utility(WorkLoss_POM.AssureClaims_Utility_VerifyTxt_RecordExist.withText('Record already exists.'), "Verify Text Record already exists.");
        //==================================================Work Loss/Restrictions Mapping->Add Record of Restriction(EXF Expert Witness Fees),Again add to verify Record already exists. msg ============================================================================================================

        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_Utility_Btn_SelectRecord,"Select Created Record")
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_Utility_Btn_DeleteRecord,"Delete Record")
         //=========================================================Delete Created Record===============================================================================================================================================================================

        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(WorkLoss_POM.AssureClaims_Utility_Chk_LOBWC,'Check',"WC Worker's Compensation")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(WorkLoss_POM.AssureClaims_Utility_Chk_RecordTypeWorkLoss,'Check',"WorkLoss Record Type")
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_Utility_Txt_TransTypeLookup,"IV","IV Investigation Expense")
        await t.pressKey('tab');
        await t.wait(10000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_Utility_Btn_AddRecord,"Add Record")
        await t.wait(10000)
        //==================================================Work Loss/Restrictions Mapping->Add Record of WorkLoss(IV Investigation Expense)==============================================================================================================

        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(WorkLoss_POM.AssureClaims_Utility_Chk_LOBWC,'Check',"WC Worker's Compensation")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(WorkLoss_POM.AssureClaims_Utility_Chk_RecordTypeRestriction,'Check',"Restriction Record Type")
        await In_Utility.AssureClaims_SetValue_Utility(WorkLoss_POM.AssureClaims_Utility_Txt_TransTypeLookup,"EXF","EXF Expert Witness Fees")
        await t.pressKey('tab');
        await t.wait(10000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(WorkLoss_POM.AssureClaims_Utility_Btn_AddRecord,"Add Record")
        await t.wait(10000)
        //==================================================Work Loss/Restrictions Mapping->Add Record of Restriction(EXF Expert Witness Fees)==============================================================================================================       
        
         });
});

