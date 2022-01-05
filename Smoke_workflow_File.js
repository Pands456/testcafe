import { Role, Selector } from 'testcafe';
import POM_Generic_Claims from '../Functional_POM/POM_Generic_Claims';
import POM_WorkflowLogin from '../Functional_POM/POM_WorkflowLogin';
import Functionality_Utility from '../Functional_Utilities_workflow/Functionality_Utility_workflow_New';
import Navigation_Utility from '../Functional_Utilities_workflow/Navigation_Utility_workflow';
import POM_Workflow_Screen from '../Functional_POM/POM_Workflow_Screen';
import Input_Utility from '../Functional_Utilities_workflow/Input_Utility_workflow_new';
import Verification_Utility from '../Functional_Utilities_workflow/Verification_Utility_workflow_new';
//import GenericUsages_Utility from '../Functional_Utilities_workflow/GenericUsages_Utility';

const DataIUT = require('../DataFiles/DataIUT_workflow.json');

const Function_Utility = new Functionality_Utility();
const Nav_Utility = new Navigation_Utility();
const Claim_POM = new POM_Generic_Claims();
const POM_WorkflowLogin_POM = new POM_WorkflowLogin();
const POM_Workflow_Screen_POM = new POM_Workflow_Screen();
const In_Utility = new Input_Utility();
const Verify_Utility = new Verification_Utility();
//const Generic_Utility = new GenericUsages_Utility();


DataIUT.forEach(data => {

    const LoggedInUser = Role(data.URL_workflow, async t => {
        await t.maximizeWindow()
        await Function_Utility.AssureClaims_LoginIntoApplicationWorkflow_Utility(data.WorkflowUsername, data.WorkflowPassword)
        await t.wait(5000)
            .expect(Selector('Span').withText(data.Workflow_Username).exists).ok()
        console.log("Login Into Application!!".green)

    }, { preserveUrl: true }
    );    

    const FirstUser = Role(data.URL_workflow, async t => {
        await Function_Utility.AssureClaims_LoginIntoApplicationWorkflow_Utility(data.Username1, data.password1)
        await t.wait(5000)
            .expect(Selector('Span').withText(data.Login_Username1).exists).ok()
        console.log("Login Into Application!!".green)
    }, { preserveUrl: true }
    );

    const SecondUser = Role(data.URL_workflow, async t => {
        await Function_Utility.AssureClaims_LoginIntoApplicationWorkflow_Utility(data.username2, data.password2)
        await t.wait(5000)
            .expect(Selector('Span').withText(data.Login_Username2).exists).ok()
        console.log("Login Into Application!!".green)
    }, { preserveUrl: true }
    );

    fixture`ConfigureWorklow`

    var faker = require('faker');
    var Workflow_Name = "Workflow_Name"+faker.random.alpha({ count: 4, upcase: true });
    var Workflow_description = "Workflow_description"+faker.random.alpha({ count: 4, upcase: true });
    const ColHeader = ["WorkFlow Name", "File name", "Document Type", "Record number", "Table name", "Current step", "Status"]
    const ColValue = [Workflow_Name, data.Filename, data.Document_Type, data.Event_Number, "EVENT", "1", "InProcess"]
    const ColHeader1 = ["Date", "User", "Step Details", "Step Instructions", "Comments"]
    const ColValue1 = [Workflow_Name, "", "", "Workflow Initiated", "", data.Login_Username1, data.Workflow_Step1, data.Workflow_Step2]

  
    test('ConfigureWorklow', async t => {
       
        await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
        await Function_Utility.AssureClaims_Workflow_Menu_Item_Open_Utility("Menu", "Configure Workflows", "Workflow","No") 
        await Function_Utility.AssureClaims_Configure_Workflow_Utility("Add", "Configure Workflows", Workflow_Name, Workflow_description)
        await Function_Utility.AssureClaims_Configure_Workflow_Utility("Edit", "Configure Workflows", Workflow_Name, Workflow_description)
        await Function_Utility.AssureClaims_Configure_Workflow_Utility("Delete", "Configure Workflows", Workflow_Name + "_Edit", Workflow_description+"_Edit")
        await Function_Utility.AssureClaims_Configure_Workflow_Utility("Add", "Configure Workflows", Workflow_Name, Workflow_description)
        await Function_Utility.AssureClaims_Configure_Workflow_Utility("Configure Workflow", "Configure Workflows", Workflow_Name, Workflow_description)
        await Function_Utility.AssureClaims_Configure_Workflow_Steps_Utility("Add", "Workflow Steps", Workflow_Name, data.Workflow_Step1, data.Workflow_Step2, data.User1, data.User2, data.Group1,"")
        await Function_Utility.AssureClaims_Configure_Workflow_Steps_Utility("Start trigger condition", "Workflow Steps", Workflow_Name, "", "", "", "", "","")
        await Function_Utility.AssureClaims_Configure_Workflow_Steps_Utility("Add Rule", "Start trigger condition", Workflow_Name, "", "", "", "", "", data.Document_Type)
        await Function_Utility.AssureClaims_Configure_Workflow_Steps_Utility("Delete Rule", "Start trigger condition", Workflow_Name, "", "", "", "", "")
        await Function_Utility.AssureClaims_Configure_Workflow_Steps_Utility("Add Rule", "Start trigger condition", Workflow_Name, "", "", "", "", "", data.Document_Type)

    //Configure Worklow In Application

    });

    test('InitiateWorfkow', async t => {
        await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
        await Function_Utility.AssureClaims_Workflow_Menu_Item_Open_Utility("Menu", "Initiate Document Workflow", "Document list", "No")
        await Function_Utility.AssureClaims_Document_Upload_Workflow_Utility("Upload Documents", "Initiate Document Workflow", data.Filename, "", "", "", "","")
        await Function_Utility.AssureClaims_Document_Upload_Workflow_Utility("Archive", "Initiate Document Workflow", data.Filename, "", "", "", "","")
        await Function_Utility.AssureClaims_Document_Upload_Workflow_Utility("Upload Documents", "Initiate Document Workflow", data.Filename, "", "", "", "","")
        await Function_Utility.AssureClaims_Document_Upload_Workflow_Utility("Associate Documents", "Initiate Document Workflow", data.Filename, "Associate Documents", data.Record_Type, data.Document_Type, data.Event_Number, Workflow_Name)

        //Configure Worklow In Application

    });

    test('Active_Worfklow', async t => {
        await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
        await Function_Utility.AssureClaims_Workflow_Menu_Item_Open_Utility("Menu", "Active Workflows", "Active Workflows", "No")
        await Function_Utility.AssureClaims_Closed_Workflow_Utility("Grid Verification", "Active Workflows", ColHeader, ColValue, Workflow_Name, data.Event_Number)
        //Configure Worklow In Application

    });
    test('logout', async t => {
        await t.wait(2000)//.navigateTo(data.URL)
        await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
        await Function_Utility.AssureClaims_LogoutFromApplication_Workflow_Utility();

    });
 


    test('My_Worfklow', async t => {
        await t.setNativeDialogHandler(() => true).useRole(FirstUser);
        await Function_Utility.AssureClaims_Workflow_Menu_Item_Open_Utility("Menu", "My Workflows", "Document Workflows - Assigned Workflows", "No")
        await Function_Utility.AssureClaims_Closed_Workflow_Utility("Grid Verification", "My Workflows", ColHeader, ColValue, Workflow_Name, data.Event_Number)
        await Function_Utility.AssureClaims_MyWorkflow_Approve_reject_Workflow_Utility(data.Event_Number, data.Comment1, ColHeader1, ColValue1, "Next")
        var len = ColHeader1.length
        len = len + 1;
        ColHeader1[len] = data.Comment1;
        console.log("ColHeader1[" + len + "] is" + ColHeader1[len])

        //Configure Worklow In Application

    });

    test('logout', async t => {
        await t.wait(2000)//.navigateTo(data.URL)
        await t.setNativeDialogHandler(() => true).useRole(FirstUser);
        await Function_Utility.AssureClaims_LogoutFromApplication_Workflow_Utility();

    });


    test('My_Worfklow1', async t => {
        await t.setNativeDialogHandler(() => true).useRole(SecondUser);
        await Function_Utility.AssureClaims_Workflow_Menu_Item_Open_Utility("Menu", "My Workflows", "Document Workflows - Assigned Workflows", "No")
        await Function_Utility.AssureClaims_Closed_Workflow_Utility("Grid Verification", "My Workflow", ColHeader, ColValue, Workflow_Name, data.Event_Number)
        await Function_Utility.AssureClaims_MyWorkflow_Approve_reject_Workflow_Utility(data.Event_Number, data.Comment1, ColHeader1, ColValue1, "Finish")

        //Configure Worklow In Application

    });

});


