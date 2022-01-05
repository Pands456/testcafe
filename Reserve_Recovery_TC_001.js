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




const DataSTG = require('../DataFiles/DataSTG1.json');
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


    test('AssureClaims_Reserve_Recover_utilitiessettings_Test01', async t => {

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
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Lobpar_POM.AssureClaims_CalculateCollectioninReservBalance, 'Check', "Check for recvery reserve")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(GenSysPar_POM.AssureClaims_CalculateCollectioninIncurredBalance, 'Uncheck', "uncheck incurred collection")
        // Lob Settings for Pc claims
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(Lobpar_POM.AssureclaimsApp_Lobwcclaim_drpdpwn, data.loblistPc, "select Pc claims");
        await t.pressKey('tab');
        await Nav_Utility.AssureClaims_ElementClick_Utility(Lobpar_POM.AssureClaimsApp_LOBParameterReserveRecovery_Btn_Diaries, "Click on reserve/incurred Button")
        await t.wait(5000)
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Lobpar_POM.AssureClaims_CalculateCollectioninReservBalance, 'Check', "Check for recvery reserve")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(GenSysPar_POM.AssureClaims_CalculateCollectioninIncurredBalance, 'Uncheck', "uncheck incurred collection")
        // Lob Settings for Gc claims
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(Lobpar_POM.AssureclaimsApp_Lobwcclaim_drpdpwn, data.loblistGc, "select Gc claims");
        await t.pressKey('tab');
        await Nav_Utility.AssureClaims_ElementClick_Utility(Lobpar_POM.AssureClaimsApp_LOBParameterReserveRecovery_Btn_Diaries, "Click on reserve/incurred Button")
        await t.wait(5000);
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Lobpar_POM.AssureClaims_chkAddRecoveryReservetoTotalBalanceAmount_Gc, 'Check', "Check for recvery reserve")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Lobpar_POM.AssureClaims_chkAddRecoveryReservetoTotalIncurredAmount_Gc, 'Uncheck', "uncheck incurred collection")
        // Lob Settings for Vc claims
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(Lobpar_POM.AssureclaimsApp_Lobwcclaim_drpdpwn, data.loblistVc, "select vc claims");
        await t.pressKey('tab');
        await Nav_Utility.AssureClaims_ElementClick_Utility(Lobpar_POM.AssureClaimsApp_LOBParameterReserveRecovery_Btn_Diaries, "Click on reserve/incurred Button")
        await t.wait(5000);
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Lobpar_POM.AssureClaims_chkAddRecoveryReservetoTotalBalanceAmount_Vc, 'Check', "Check for recvery reserve")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Lobpar_POM.AssureClaims_chkAddRecoveryReservetoTotalIncurredAmount_Vc, 'Uncheck', "uncheck incurred collection")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Click on Utilities Save Button")
        await t.wait(4000);
    });
    test('AssureClaims_WCReserveRecovery_Test_02', async t => {


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
        //recovery reserve created
        await Function_Utility.AssureClaims_Reserve_Utility(data.ReserveType, data.Amount, data.ReserveStatus)
      
        //non-recovery reserve created
        await Function_Utility.AssureClaims_NReserve_Utility(data.NR_ReserveType, data.Amount, data.ReserveStatus)
        
        // Collection is Created for Non recovery reserve type 

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window")
        await Function_Utility.AssureClaims_NCollectionCorpAddition_Utility(data.BankAccount, data.PayeeType, data.LastName, data.ReserveType, data.TransactionType, data.Amount)
        
        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow_2, "Grid Window 2 selected");
        await Function_Utility.AssureClaims_NCollectionCorpAddition_Utility(data.BankAccount, data.PayeeType, data.LastName, data.ReserveType, data.TransactionType_R, data.Amount)
        // Collection is Created for  recovery reserve type 
        await t.wait(3000)

        //verification on reserve listing 
      const Header1 = ["Reserve Type", "Incurred", "Collection"]
        const Value1 = [data.ReserveType, data.Amount, "$5.00"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ReserveType, "Wc.reserve listing", Header1, Value1)

        const Header2 = ["Reserve Type", "Incurred", "Collection"]
        const Value2 = [data.NR_ReserveType, data.Amount , "$5.00"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.NR_ReserveType, "Wcreserve listing", Header2, Value2)

});


    test('AssureClaims_Reserve_RecoveryOnPC_Test03', async t => {
        await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username, data.Password, data.DSN, 'Claims')
        console.log("Login Into Application!!".green)
        await t.wait(2000);
       

        console.log("AssureClaims_PropertyClaimCreation Function is Called To Create Property Claim".yellow);
        StrClaimNumber = await Function_Utility.AssureClaims_PropertyClaimCreation(d, d, data.ClaimStatus, data.PCClaimType, data.Department, data.PCPolicyLOB, data.PropertyId)
        console.log("New Property Claim is Created with Claim Number: ".green + StrClaimNumber);
        //Property Claim Creation

        await t.wait(3000)
        //recovery reserve created
        await Function_Utility.AssureClaims_Reserve_Utility(data.ReserveType, data.Amount, data.ReserveStatus)

        //non-recovery reserve created
        await Function_Utility.AssureClaims_NReserve_Utility(data.NR_ReserveType, data.Amount, data.ReserveStatus)

        // Collection is Created for Non recovery reserve type 

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window")
        await Function_Utility.AssureClaims_NCollectionCorpAddition_Utility(data.BankAccount, data.PayeeType, data.LastName, data.ReserveType, data.TransactionType, data.Amount)

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow_2, "Grid Window 2 selected");
        await Function_Utility.AssureClaims_NCollectionCorpAddition_Utility(data.BankAccount, data.PayeeType, data.LastName, data.ReserveType, data.TransactionType_R, data.Amount)
        // Collection is Created for  recovery reserve type 
        await t.wait(3000)
        //verification on reserve listing 
        const Header3 = ["Reserve Type", "Incurred", "Collection"]
        const Value3 = [data.ReserveType, data.Amount, "$5.00"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ReserveType, "Wc.reserve listing", Header3, Value3)

        const Header4 = ["Reserve Type", "Incurred", "Collection"]
        const Value4 = [data.NR_ReserveType, data.Amount, "$5.00"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.NR_ReserveType, "Wcreserve listing", Header4, Value4)
     
    });

    test('AssureClaims_Reserve_RecoveryOnVC_Test04', async t => {
        await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username, data.Password, data.DSN, 'Claims')
        console.log("Login Into Application!!".green)
        await t.wait(2000);

        //Vehicle Claim Created
        console.log("AssureClaims_VehicleAccidentClaimCreation Function is Called To Create Vehicle Claim".yellow);
        StrClaimNumber = await Function_Utility.AssureClaims_VehicleAccidentClaimCreation(d, d, data.ClaimStatus, data.VAClaimType, data.Department, data.VAPolicyLOB)
        console.log("New Vehicle Claim is Created with Claim Number: ".green + StrClaimNumber);
      
        //recovery reserve created
        await Function_Utility.AssureClaims_Reserve_Utility(data.ReserveType, data.Amount, data.ReserveStatus)

        //non-recovery reserve created
        await Function_Utility.AssureClaims_NReserve_Utility(data.NR_ReserveType, data.Amount, data.ReserveStatus)

        // Collection is Created for Non recovery reserve type 

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window")
        await Function_Utility.AssureClaims_NCollectionCorpAddition_Utility(data.BankAccount, data.PayeeType, data.LastName, data.ReserveType, data.TransactionType, data.Amount)

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow_2, "Grid Window 2 selected");
        await Function_Utility.AssureClaims_NCollectionCorpAddition_Utility(data.BankAccount, data.PayeeType, data.LastName, data.ReserveType, data.TransactionType_R, data.Amount)
        // Collection is Created for  recovery reserve type 
        await t.wait(3000)
        //verification on reserve listing 
        const Header5 = ["Reserve Type", "Incurred", "Collection"]
        const Value5 = [data.ReserveType, data.Amount, "$5.00"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ReserveType, "Wc.reserve listing", Header5, Value5)

        const Header6 = ["Reserve Type", "Incurred", "Collection"]
        const Value6 = [data.NR_ReserveType, data.Amount, "$5.00"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.NR_ReserveType, "Wcreserve listing", Header6, Value6)

});
    test('AssureClaims_Reserve_RecoveryOnGC_Test05', async t => {
        await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username, data.Password, data.DSN, 'Claims')
        console.log("Login Into Application!!".green)
        await t.wait(2000);

    
        //====== Gc Claim Creation Started Here=====================
       console.log("AssureClaims_GeneralClaimCreation Function is Called To Create Claim".yellow);
        StrClaimNumber = await Function_Utility.AssureClaims_GeneralClaimCreation(d, d, data.ClaimStatus, data.GCClaimType, data.Department, data.GCPolicyLOB)
        console.log("New General Claim is Created with Claim Number: ".green + StrClaimNumber);
        //Claim Creation  completed
        await t.wait(3000)
        //claimnat is created onGC
        await Function_Utility.AssureClaims_ClaimEventEntityAddition_Utility("Claimant", "Australia", "Victoria", "NA");


        //recovery reserve created
        await Function_Utility.AssureClaims_Reserve_Utility(data.ReserveType, data.Amount, data.ReserveStatus)

        //non-recovery reserve created
        await Function_Utility.AssureClaims_NReserve_Utility(data.NR_ReserveType, data.Amount, data.ReserveStatus)

        // Collection is Created for Non recovery reserve type 

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window")
        await Function_Utility.AssureClaims_NCollectionCorpAddition_Utility(data.BankAccount, data.PayeeType, data.LastName, data.ReserveType, data.TransactionType, data.Amount)

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow_2, "Grid Window 2 selected");
        await Function_Utility.AssureClaims_NCollectionCorpAddition_Utility(data.BankAccount, data.PayeeType, data.LastName, data.ReserveType, data.TransactionType_R, data.Amount)
        // Collection is Created for  recovery reserve type 
        await t.wait(3000)
        //verification on reserve listing 
        const Header7 = ["Reserve Type", "Incurred", "Collection"]
        const Value7 = [data.ReserveType, data.Amount, "$5.00"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ReserveType, "Wc.reserve listing", Header7, Value7)

        const Header8 = ["Reserve Type", "Incurred", "Collection"]
        const Value8 = [data.NR_ReserveType, data.Amount, "$5.00"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.NR_ReserveType, "Wcreserve listing", Header8, Value8)
  
    });
    
    test('AssureClaims_Reserve_RecoveryOnGC_Test06', async t => {
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
        
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(Lobpar_POM.AssureclaimsApp_Lobwcclaim_drpdpwn, data.loblistGc, "select Gc claims");
        await t.pressKey('tab');
        await Nav_Utility.AssureClaims_ElementClick_Utility(Lobpar_POM.AssureClaimsApp_LOBParameterReserveRecovery_Btn_Diaries, "Click on reserve/incurred Button")
        await t.wait(5000);
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Lobpar_POM.AssureClaims_chkAddRecoveryReservetoTotalBalanceAmount_Gc, 'Check', "Check for recvery reserve")
        await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Lobpar_POM.AssureClaims_chkAddRecoveryReservetoTotalIncurredAmount_Gc, 'Check', "Check for incurred collection");
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Click on Utilities Save Button")
        await t.wait(4000);

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


        //recovery reserve created
        await Function_Utility.AssureClaims_Reserve_Utility(data.ReserveType, data.Amount, data.ReserveStatus)

        //non-recovery reserve created
        await Function_Utility.AssureClaims_NReserve_Utility(data.NR_ReserveType, data.Amount, data.ReserveStatus)

        // Collection is Created for Non recovery reserve type 

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow, "Grid Window")
        await Function_Utility.AssureClaims_NCollectionCorpAddition_Utility(data.BankAccount, data.PayeeType, data.LastName, data.ReserveType, data.TransactionType, data.Amount)

        await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.gridwindow_2, "Grid Window 2 selected");
        await Function_Utility.AssureClaims_NCollectionCorpAddition_Utility(data.BankAccount, data.PayeeType, data.LastName, data.ReserveType, data.TransactionType_R, data.Amount)
        // Collection is Created for  recovery reserve type 
        await t.wait(3000)
        //verification on reserve listing 
        const Header7 = ["Reserve Type", "Incurred", "Collection"]
        const Value7 = [data.ReserveType, data.Amount, "$5.00"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.ReserveType, "GC.reserve listing", Header7, Value7)

        const Header8 = ["Reserve Type", "Incurred", "Collection"]
        const Value8 = [data.NR_ReserveType, data.Amount, "$5.00"]
        await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.NR_ReserveType, "GCreserve listing", Header8, Value8)

        
});



});
