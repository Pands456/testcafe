import { Selector,Role } from 'testcafe';
import Colors from 'colors'
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import POM_Generic_Claims from '../Functional_POM/POM_Generic_Claims';
const DataIUT = require('../DataFiles/DataIUT.json');

const Function_Utility = new Functionality_Utility();
const Nav_Utility = new Navigation_Utility();
const Claim_POM = new POM_Generic_Claims();

DataIUT.forEach(data => {

const LoggedInUser = Role(data.URL , async t => {
    await t.maximizeWindow()
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
    await t.wait(5000)
    console.log("Login Into Application!!".green)
},{ preserveUrl: true }
);

fixture `Login`

test('Login', async t => {
        //await t.navigateTo(data.URL)
        await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
        await t .click(Selector('#menuBar').find('a').withText('Document').nth(0))
        .click(Selector('#menu_DocumentRoot').find('a').withText('General Claim'))
        .switchToIframe(Selector('#claimgc_-1'))
        var date = new Date();
        var d = (date.getMonth()+1)+'/'+(date.getDate()-1)+'/'+date.getFullYear();
        await t.wait(10000);
        const Payfroze = Selector('#paymntfrozenflag');
        Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(Claim_POM.AssureClaims_GenericClaim_Btn_ClaimType, "Check", "Payment Frozen Checkbox");
        //GC Claim Save
        //Login Into Application        
});

test('logout', async t =>{
await t.wait(2000)//.navigateTo(data.URL)
await t.setNativeDialogHandler(() => true).useRole(LoggedInUser);
await Function_Utility.AssureClaims_LogoutFromApplication_Utility();
})
});


