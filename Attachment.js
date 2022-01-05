import { Selector } from 'testcafe';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
const DataIUT = require('../DataFiles/DataIUT.json');

const Function_Utility = new Functionality_Utility();

fixture`New Fixture`
    .page`https://dev-assure-claims.dxc-rmcl.com/riskmasterux/#/login?clientId=3f28130450c00018`;

DataIUT.forEach(data => {
    test('New Test', async t => {
        await t
            .maximizeWindow()
        await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username, data.Password, data.DSN, 'Claims')
        console.log("Login Into Application!!".green)
        //Login Into Application
        var date = new Date();
        var d = (date.getMonth() + 1) + '/' + (date.getDate() - 1) + '/' + date.getFullYear();
        await Function_Utility.AssureClaims_GeneralClaimCreation(d, d, data.ClaimStatus, data.GCClaimType, data.Department, data.GCPolicyLOB)
        await t.click(Selector('#Attach\\ Documents i').withText('attach_file'))
        await t.switchToIframe('#externalapp')
        await t.click(Selector('#addicon i').withText('add'))
        await t.click('#uploadfile')
        //await t.setNativeDialogHandler(() => true)
        await t.setFilesToUpload('#uploadfile', ['../Uploads/risk_assessment.pdf'])
        await t.typeText('#Title', 'saiii')
     
    });
});