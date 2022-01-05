
import { Selector, Role } from 'testcafe';

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
import POM_LobParameters from '../Functional_POM/POM_LobParameters';
import POM_FinancialReserves from '../Functional_POM/POM_FinancialReserves';




const DataSTG = require('../DataFiles/DataSTG.json');
const Home_POM = new POM_Home();
//const DataAutoReg = require('../DataFiles/DataAutoReg.json');
const Function_Utility = new Functionality_Utility();
const Nav_Utility = new Navigation_Utility();
const Generic_Utility = new GenericUsages_Utility();
const Verification_Msg = new POM_VerificationMessage();
const In_Utility = new Input_Utility();
const Diary_Creation = new POM_DiaryList();
const Verify_Utility = new Verification_Utility();
const Diary_Utilities = new POM_DiaryUtilities();
const AttachCreateDiary_POM = new POM_AttachCreateDiary();
const Search_POM = new POM_Search();
const Event_POM = new POM_Document_Event();
const GenSysPar_POM = new POM_GeneralSystemParameter();
const Lobpar_POM = new POM_LobParameters();
const Reserve_Utility = new POM_FinancialReserves();
const Payment_POM = new POM_PaymentsCollections();



var faker = require('faker');
const menu = Selector('#side-menu');
var date = new Date();
var d = (date.getMonth() + 1) + '/' + (date.getDate()) + '/' + date.getFullYear();
var UserFirstName = faker.name.firstName();
//Global Variable Declaration
var StrWCClaimNumber;
var StrClaimNumber;


DataSTG.forEach(data => {
    fixture`Reserve_Recovery_Suite_Smoke`.beforeEach(async t => {
        await t.wait(5000)
        await t.navigateTo(data.URL);
        await t.maximizeWindow();
    });


    /*test('AssureClaims_Reserve_Recover_utilitiessettings_Test01', async t => {

        await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username, data.Password, data.DSN, 'Utilities')
        console.log("Login Into Application!!".green)
        await t.wait(2000);
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_UtilitiesIframe);
        await t.wait(8000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(Lobpar_POM.AssureClaimsApp_Lnk_LOBParameter.withText('Line Of Business Parameter Setup'), "Click on LOB Parameter Link")
        await t.wait(5000);
        await t.switchToMainWindow();
        await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_LOBParameterSetupIframe);
        await t.wait(8000);

        //Lob Settings for Wc claims 
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(Lobpar_POM.AssureclaimsApp_Lobwcclaim_drpdpwn, data.loblistWc, "select wc claims");
        await t.pressKey('tab');
        await Nav_Utility.AssureClaims_ElementClick_Utility(Lobpar_POM.AssureClaimsApp_LOBParameterReserveRecovery_Btn_Diaries, "Click on reserve/incurred Button")
        await t.wait(5000)
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Lobpar_POM.AssureClaims_chkAddRecoveryReservetoTotalBalanceAmount, 'Check', "Check for recvery reserve")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Lobpar_POM.AssureClaims_chkAddRecoveryReservetoTotalIncurredAmount, 'Check', "check incurred collection")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Lobpar_POM.AssureClaims_CalculatCollectionsinReserveBalancePerReserve, 'Check', "Check for recvery reserve")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Lobpar_POM.AssureClaims_CalculatCollectionsinReserveBalancePerReserve, 'Check', "check incurred collection")

        // Lob Settings for Gc claims
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(Lobpar_POM.AssureclaimsApp_Lobwcclaim_drpdpwn, data.loblistGc, "select Gc claims");
        await t.pressKey('tab');
        await Nav_Utility.AssureClaims_ElementClick_Utility(Lobpar_POM.AssureClaimsApp_LOBParameterReserveRecovery_Btn_Diaries, "Click on reserve/incurred Button")
        await t.wait(5000);
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Lobpar_POM.AssureClaims_CalculatCollectionsinReserveBalancePerReserve, 'Check', "Check for recvery reserve for GC")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Lobpar_POM.AssureClaims_CalculatCollectionsinReserveBalancePerReserve, 'Check', "check incurred collection For Gc")

        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Click on Utilities Save Button")
        await t.wait(4000);
    });
    test('AssureClaims_Reserve_Non_RecoveryOnGC_Test07', async t => {

        await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username, data.Password, data.DSN, 'Claims')
        console.log("Login Into Application!!".green)
        await t.wait(2000);

        //======Claim Creation Started Here=====================
        console.log("AssureClaims_GeneralClaimCreation Function is Called To Create Claim".yellow);
        StrClaimNumber = await Function_Utility.AssureClaims_GeneralClaimCreation(d, d, data.ClaimStatus, data.GCClaimType, data.Department, data.GCPolicyLOB)
        console.log("New General Claim is Created with Claim Number: ".green + StrClaimNumber);
        //Claim Creation  completed
        await t.wait(3000)
        //claimnat is created onGC
        await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility("Claimant", "Australia", "Victoria", "NA");


        //non recovery reserve created ofExpense Type
        await Function_Utility.AssureClaims_Reserve_Utility(data.NR_ReserveType, data.Amount, data.ReserveStatus)

        //non-recovery reserve created of loss Type
        await Function_Utility.AssureClaims_NReserve_Utility(data.Loss_ReserveType, data.Amount, data.ReserveStatus)


        // Collection is Created for Non recovery reserve type Loss Type

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window")
        await Function_Utility.AssureClaims_CollectionCorpAddition_Utility(data.BankAccount, data.PayeeType, data.LastName, data.Loss_ReserveType, data.TransactionType_Loss, data.Amount)

        // Collection is Created for Non recovery reserve type Expense Type

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow_2, "Grid Window 2 selected");
        await Function_Utility.AssureClaims_CollectionCorpAddition_Utility(data.BankAccount, data.PayeeType, data.LastName, data.NR_ReserveType, data.TransactionType_Expense, data.Amount)

        //verification on reserve listing 
        const Header7 = ["Reserve Type", "Incurred", "Collection"]
        const Value7 = [data.Loss_ReserveType, data.Amount, "$5.00"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.Loss_ReserveType, "GC.reserve listing", Header7, Value7)

        const Header8 = ["Reserve Type", "Incurred", "Collection"]
        const Value8 = [data.NR_ReserveType, data.Amount, "$5.00"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.NR_ReserveType, "GCreserve listing", Header8, Value8)


    });*/

    test('AssureClaims_Reserve_Non_RecoveryOnWc_Test07', async t => {
        await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username, data.Password, data.DSN, 'Claims')
        console.log("Login Into Application!!".green)
        await t.wait(2000);
        //login to  "Claims
        await t.wait(3000)

        var d = await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
        console.log("AssureClaims_WorkersCompClaimCreation Function is Called To Create Worker Compensation Claim".yellow);
        StrWCClaimNumber = await Function_Utility.AssureClaims_WorkersCompClaimCreation(d, d, data.WCClaimStatus, data.WCClaimType, data.Department, data.WCPolicyLOB, data.WCJurisdiction)
        console.log("New Worker Compensation Claim is Created with Claim Number: ".green + StrWCClaimNumber);
        //Worker Compensation Claim Creation
        await t.wait(3000)

        //non-recovery reserve created of Loss Type
        await Function_Utility.AssureClaims_Reserve_Utility(data.Loss_ReserveType, data.Amount, data.ReserveStatus)

        //non-recovery reserve created of Expense Type
        await Function_Utility.AssureClaims_NReserve_Utility(data.NR_ReserveType, data.Amount, data.ReserveStatus)

        //recovery reserve created
        await Function_Utility.AssureClaims_NReserve_Utility(data.ReserveType, data.Amount, data.ReserveStatus)

        //Collection for Recovery Reserve Type
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window 2 selected");
        await Function_Utility.AssureClaims_CollectionCorpAddition_Utility(data.BankAccount, data.PayeeType, data.LastName, data.ReserveType, data.TransactionType_R, data.Amount)

        //Collection for Expense Recovery Type
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow_2, "Grid Window")
        await Function_Utility.AssureClaims_CollectionCorpAddition_Utility(data.BankAccount, data.PayeeType, data.LastName, data.TransactionType_Expense, data.TransactionType, data.Amount)

        //Collection for Loss Recovery Type
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow_3, "Grid Window")
        await Function_Utility.AssureClaims_CollectionCorpAddition_Utility(data.BankAccount, data.PayeeType, data.LastName, data.Loss_ReserveType, data.TransactionType_Loss, data.Amount)

        //verification on reserve listing 
        const Header9 = ["Reserve Type", "Incurred", "Collection"]
        const Value9 = [data.Loss_ReserveType, data.Amount, "$5.00"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.Loss_ReserveType, "GC.reserve listing", Header9, Value9)

        const Header10 = ["Reserve Type", "Incurred", "Collection"]
        const Value10 = [data.ReserveType, data.Amount, "$5.00"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ReserveType, "GC.reserve listing", Header10, Value10)

        const Header11 = ["Reserve Type", "Incurred", "Collection"]
        const Value11 = [data.NR_ReserveType, data.Amount, "$5.00"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.NR_ReserveType, "GCreserve listing", Header11, Value11)


    });
});