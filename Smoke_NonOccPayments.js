import { Selector, Role } from 'testcafe';
import { createTestCafe } from 'testcafe';
//import { dateFormat} from 'testcafe';
import Colors from 'colors'
import Navigation_Utility from '../Functional_Utilities/Navigation_Utility';
import Functionality_Utility from '../Functional_Utilities/Functionality_Utility';
import Maintenance_Functionality_Utility from '../Functional_Utilities/Maintenance_Functionality_Utility';
import Input_Utility from '../Functional_Utilities/Input_Utility'
import POM_Employee from '../Functional_POM/POM_Employee'
import POM_Patient from '../Functional_POM/POM_Patient'
import POM_Driver from '../Functional_POM/POM_Driver'
import POM_Entity from '../Functional_POM/POM_Entity';
import POM_PaymentsCollections from '../Functional_POM/POM_PaymentsCollections';
import POM_FinancialReserves from '../Functional_POM/POM_FinancialReserves';
import POM_Home from '../Functional_POM/POM_Home';
import POM_VerificationMessage from '../Functional_POM/POM_VerificationMessage';
import Verification_Utility from '../Functional_Utilities/Verification_Utility'
import POM_MedicalStaff from '../Functional_POM/POM_MedicalStaff'
import POM_Vehicle from '../Functional_POM/POM_Vehicle'
//import POM_Generic_Claims from '../Functional_POM/POM_Generic_Claims';
import POM_NonOcc_Claims from '../Functional_POM/POM_NonOcc_Claims';
import GenericUsages_Utility from '../Functional_Utilities/GenericUsages_Utility';
import POM_DisabilityPlanManagement from '../Functional_POM/POM_DisabilityPlanManagement'


const DataSTG = require('../DataFiles/DataSTG.json');
//const DataAutoReg = require('../DataFiles/DataAutoReg.json');
const Function_Utility = new Functionality_Utility();
const Nav_Utility = new Navigation_Utility();
const In_Utility = new Input_Utility();
//const Generic_Claims = new POM_Generic_Claims();
const Generic_Utility = new GenericUsages_Utility();
const Verify_Utility = new Verification_Utility();
const Verification_Msg = new POM_VerificationMessage();
const Home_POM = new POM_Home();
const DisabilityPlan_Utility = new POM_DisabilityPlanManagement();
const Reserve_Utility = new POM_FinancialReserves();
const Payment_POM = new POM_PaymentsCollections();
const Maint_Utility = new Maintenance_Functionality_Utility();
const NonOcc_Claims =new POM_NonOcc_Claims();
var faker = require('faker');


//table verify global var
var PaymentBeginDate;
var PaymentThroughDate;
var BenefitsStartFromDate;
var VerifyBenefitsStartFromDate;
var VerifyDisabilityStartDate;
var FirstDayOfNextMonthOfDateHired;
var VerifyBenefitsEligibleDate;
var BenefitsThroughDate;
var VerifyBenefitsThroughDate;
var ActualCalendarDays;
var DaysPaid;
var PlanName;
var StrNonOccClaimNumber;
var LastGrossAmount;
var GrossAmountTemp
var FromDateCalcPayments;
var ToDateCalcPayments;
var PrintDateCalcPayments;
var NewFromDateCalcPayments;
var NewToDateCalcPayments;
var NewPrintDateCalcPayments;
var NewDaysPaid = 0;
var LastFromDateCalcPayments;
var LastToDateCalcPayments;
var LastPrintDateCalcPayments;
var LastDaysPaid;
var GrossAmount;
var LastActualCalendarDays;
var GrossAmountCalcPayments;
var LastGrossAmountTemp;



DataSTG.forEach(data => {
  fixture`Smoke_NonOcc_ClaimsCreation_PaymentsCreation`.beforeEach(async t => {
    await t.wait(8000)
    await t.navigateTo(data.URL);
    await t.maximizeWindow();
  });

 test('AssureClaims_Disability Plan Management_Test_01', async t => {
    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username, data.Password, data.DSN, 'Maintenance')
    console.log("Login Into Application!!".green)
    await t.wait(15000);
    console.log("AssureClaims_Maintenance_DisabilityPlanCreation_Utility Function is Called To Create Disability Management Plan".yellow);
    PlanName = await Maint_Utility.AssureClaims_Maintenance_DisabilityPlanCreation_Utility(data.Insured, data.Country1, data.PlanStatus, data.Premium, data.BankAccount, data.PayPeriodStartDate, data.PreferredPaymentSchedule, data.MonthlyPaymentType, data.PreferredPrintDate, data.PreferredMonthlyDay, data.PreferredDayOfWeekforPayments);
    console.log("New Disability Plan is Created with PlanName: ".green + PlanName);
    await t.wait(15000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(DisabilityPlan_Utility.AssureClaims_DisabilityPlanClasses_Btn_AddPlan, "Add Plan Class");
    await Nav_Utility.AssureClaims_ElementClick_Utility(DisabilityPlan_Utility.AssureClaims_DisabilityPlanClasses_HeaderPlanClass, "HeaderPlanClass")
    await In_Utility.AssureClaims_SetValue_Utility(DisabilityPlan_Utility.AssureClaims_DisabilityPlanClasses_Txt_ClassName, "Class_Test", "Class Name");
    await Nav_Utility.AssureClaims_ElementClick_Utility(DisabilityPlan_Utility.AssureClaims_DisabilityPlanClasses_Tab_EligibilityWaiting, "Eligibility/Waiting");
    await In_Utility.AssureClaims_SetValue_Utility(DisabilityPlan_Utility.AssureClaims_DisabilityPlanClasses_Txt_Quantity_Benefits, data.Quantity_Txt_Benefits, "Quantity")
    await In_Utility.AssureClaims_SetValue_Utility(DisabilityPlan_Utility.AssureClaims_DisabilityPlanClasses_Txt_Quantity_Waitperiod, "2", "Quantity")
    await In_Utility.AssureClaims_SetValue_Utility(DisabilityPlan_Utility.AssureClaims_DisabilityPlanClasses_Txt_Quantity_Durability, "8", "Quantity")
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(DisabilityPlan_Utility.AssureClaims_DisabilityPlanClasses_Txt_EligibleForBenefitsPeriods, data.Period, "Bankaccount Text Box on Maintenance -> Disability Plan Management Page");

    await In_Utility.AssureClaims_ElementWebListSelect_Utility(DisabilityPlan_Utility.AssureClaims_DisabilityPlanClasses_Txt_EligibleForBenefitsFromDateHired, data.FromDateHiredOn, "DateHiredFrom");
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(DisabilityPlan_Utility.AssureClaims_DisabilityPlanClasses_Txt_WaitingPeriodFromDisability, data.WaitingPeriodFromDisability, "Waiting Period From Disability");
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(DisabilityPlan_Utility.AssureClaims_DisabilityPlanClasses_Txt_WaitDurationType, data.WaitDurationType, "Duration type");
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(DisabilityPlan_Utility.AssureClaims_DisabilityPlanClasses_Txt_MaximumDurationOfDisabilityPeriod, data.MaximumDurationOfDisabilityPeriod, "MaximumDuration Of DisabilityPeriod");
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(DisabilityPlan_Utility.AssureClaims_DisabilityPlanClasses_Txt_MaximumDurationOfDisabilityFrom, data.MaximumDurationOfDisabilityPeriodFrom, "MaximumDuration Of DisabilityPeriod From");
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(DisabilityPlan_Utility.AssureClaims_DisabilityPlanClasses_Txt_DetermineWorkWeekDaysType, data.DaysType, "Days Type");
    await Nav_Utility.AssureClaims_ElementClick_Utility(DisabilityPlan_Utility.AssureClaims_DisabilityPlanClasses_Tab_Benefit_Calculation, "Benefit Calculation Tab ")
    await In_Utility.AssureClaims_SetValue_Utility(DisabilityPlan_Utility.AssureClaims_DisabilityPlanClasses_Txt_MonthlyWage_PerAmount, "90", "Monthly Wage Peramount")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On Plan Class Creation Screen");


  });


  test('AssureClaims_NonOccClaim_Payment_Test_02', async t => {

    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username, data.Password, data.DSN, 'Claims')
    console.log("Login Into Application!!".green)
    await t.wait(10000);
    //var d=await Generic_Utility.AssureClaims_CurrentDateInfo_Utility("MM/DD/YYYY");
    var d = await Generic_Utility.AssureClaims_FuturePastDateInfo_Utility(0, 0, -1, "MM/DD/YYYY")
    
    console.log("AssureClaims_Non Occupational Claim Function is Called To Create Non Occupational Claim".yellow);
    StrNonOccClaimNumber = await Function_Utility.AssureClaims_NonOccClaimCreation(d, d, data.NonOcc_ClaimStatus, data.NonOcc_ClaimType, data.NonOcc_Department, data.NonOcc_PolicyLOB, data.NonOcc_EmployeeNo, data.NonOcc_Jurisdiction, PlanName, data.ClassName)
    //console.log("New Non Occ Claim is Created with Claim Number: ".green + StrNonOccClaimNumber);

    //Non Occ Claim Creation
    await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_NonOccClaim_Tab_ClaimInfo, "Claim Info Clicked");
    await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_NonOccClaim_Tab_EmploymentInfo, "Employment Info Clicked");
    var NonOccupationalClaim_Txt_DateHired = await Generic_Utility.AssureClaims_FuturePastDateInfo_Utility(-3, 0, 0, "MM/DD/YYYY")
    NonOccupationalClaim_Txt_DateHired = await Generic_Utility.AssureClaims_AddNumberOfDaysInADate_Utility(NonOccupationalClaim_Txt_DateHired, "MM/DD/YYYY", 1);
    await In_Utility.AssureClaims_SetValue_Utility(NonOcc_Claims.AssureClaims_NonOccClaim_Txt_DateHired, NonOccupationalClaim_Txt_DateHired, "Date Hired");

    await In_Utility.AssureClaims_SetValue_Utility(NonOcc_Claims.AssureClaims_NonOccClaim_Txt_EmpMonthlyRate, "10000", "Monthly Rate");
    await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(NonOcc_Claims.AssureClaims_NonOccClaim_Chk_Monday, "Check", "Monday");
    await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(NonOcc_Claims.AssureClaims_NonOccClaim_Chk_Tuesday, "Check", "Tuesady");
    await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(NonOcc_Claims.AssureClaims_NonOccClaim_Chk_Wednesday, "Check", "wed");
    await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(NonOcc_Claims.AssureClaims_NonOccClaim_Chk_Thursday, "Check", "thu");
    await Nav_Utility.AssureClaims_WebCheckBoxSelect_Utility(NonOcc_Claims.AssureClaims_NonOccClaim_Chk_Friday, "Check", "Fri");
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On General Claim creation Screen");
    
    //NonOccupational Payments Screen Is Opened


    await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_Lst_NonOcc, "List Button On Claim Screen");
    await t.wait(2000);
    await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_Btn_NonOccPayment, "Non Occ Payment Option From The List")
    await t.wait(4000);
    await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_tab_NonOccPayment_Payments_Calculator, "PaymentCalculator On NonOccPayments")
    //await In_Utility.AssureClaims_ElementWebListSelect_Utility(NonOcc_Claims.AssureClaims_Lst_NonOccPayment_ReserveType, data.NonOcc_Payment_ReserveType, "Reserve Type")
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(NonOcc_Claims.AssureClaims_Lst_NonOccPayment_TransactioneType, data.NonOcc_Payment_TransactionType, "TransactionType")
    await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_tab_NonOccPayment_ClaimInfo, "ClaimInfo On NonOccPayments")

    FirstDayOfNextMonthOfDateHired = await Generic_Utility.AssureClaims_SetADayInNextMonthOfAGivenDate_Utility(NonOccupationalClaim_Txt_DateHired, 1);
    console.log("FirstDayOfNextMonthOfDateHired".green + FirstDayOfNextMonthOfDateHired)

    VerifyBenefitsEligibleDate = await Generic_Utility.AssureClaims_AddNumberOfDaysInADate_Utility(FirstDayOfNextMonthOfDateHired, "MM/dd/yyy", 28);
    console.log("VerifyBenefitsEligibleDate".green + VerifyBenefitsEligibleDate)
    await Verify_Utility.AssureClaims_ElementExist_Utility(NonOcc_Claims.AssureClaims_NonOcc_Payments_EligibilityDate, "NOTE: Employee Not Eligible For Benefits. Eligibility Date is:" + VerifyBenefitsEligibleDate + "On Non Occupational Payments Creation Page")

    VerifyDisabilityStartDate = await Verify_Utility.AssureClaims_AttributeFetch_Utility(NonOcc_Claims.AssureClaims_NonOccClaim_Txt_DisabilityStartDate, "value");
    await Verify_Utility.AssureClaims_TextCompare(d, VerifyDisabilityStartDate, "Disability Start Date On Non Occupational Payments Creation Page");



    //   //Verification Of Data On Benefits Period Tab Started From Here

    await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_tab_NonOccPayment_Benefit_Period, "Benefit Period Tab");
    BenefitsStartFromDate = await Generic_Utility.AssureClaims_AddNumberOfDaysInADate_Utility(VerifyDisabilityStartDate, "MM/dd/yyyy", 14);
    console.log("BenefitsStartFromDate".green + BenefitsStartFromDate)
    VerifyBenefitsStartFromDate = await Verify_Utility.AssureClaims_AttributeFetch_Utility(NonOcc_Claims.AssureClaims_Txt_NonOccPayment_BenefitStartDate, "value");
    console.log("VerifyBenefitsStartFromDate".green + VerifyBenefitsStartFromDate)
    await Verify_Utility.AssureClaims_TextCompare(BenefitsStartFromDate, VerifyBenefitsStartFromDate, "Benefits Start date On Non Occupational Payments Creation Page");

    BenefitsThroughDate = await Generic_Utility.AssureClaims_AddNumberOfDaysInADate_Utility(VerifyBenefitsStartFromDate, "MM/dd/yyyy", 55);
    console.log("BenefitsThroughDate".green + BenefitsThroughDate)
    VerifyBenefitsThroughDate = await Verify_Utility.AssureClaims_AttributeFetch_Utility(NonOcc_Claims.AssureClaims_NonOccPayments_Txt_BenefitsThrough, "value");
    console.log("VerifyBenefitsThroughDate".green + VerifyBenefitsThroughDate)
    await Verify_Utility.AssureClaims_TextCompare(BenefitsThroughDate, VerifyBenefitsThroughDate, "Benefits Through date On Non Occupational Payments Creation Page");

    //   //Verification Of Data On PaymentCalculator Tab Started From Here
    await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_tab_NonOccPayment_Payments_Calculator, "PaymentCalculator On NonOccPayments");

    PaymentBeginDate = await Verify_Utility.AssureClaims_AttributeFetch_Utility(NonOcc_Claims.AssureClaims_NonOccPayments_Txt_PaymentBeginnings, "value");
    console.log("PaymentBeginDate".green + PaymentBeginDate)
    await Verify_Utility.AssureClaims_TextCompare(BenefitsStartFromDate, PaymentBeginDate, "Payment Begin Date On Non Occupational Payments Creation Page");

    PaymentThroughDate = await Verify_Utility.AssureClaims_AttributeFetch_Utility(NonOcc_Claims.AssureClaims_NonOccPayments_Txt_PaymentThrough, "value");
    console.log("PaymentThroughDate".green + PaymentThroughDate)
    await Verify_Utility.AssureClaims_TextCompare(BenefitsThroughDate, PaymentThroughDate, "Payment Through Date On Non Occupational Payments Creation Page");

    ActualCalendarDays = await Generic_Utility.AssureClaims_GetActualDaysInAMonthOfAGivenDate_Utility(BenefitsStartFromDate);
    console.log("ActualCalendarDays".green + ActualCalendarDays.toString());
    DaysPaid = await Generic_Utility.AssureClaims_GetDaysPaidInMonth_Utility(BenefitsStartFromDate);
    console.log("DaysPaid".green + DaysPaid);
    GrossAmountTemp = (9000 * DaysPaid) / (ActualCalendarDays);
    console.log("GrossAmountTemp".green + GrossAmountTemp);

    //Gross Amount started
    GrossAmount = await Generic_Utility.AssureClaims_FormatANumber_Utility(GrossAmountTemp);
    console.log("GrossAmountTemp ".green + GrossAmount);
    

    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On General Claim creation Screen");
  });


  test('AssureClaims_NonOccClaim_PaymentBeforeVerifications_Test_03', async t => {

    await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username, data.Password, data.DSN, 'Claims')
    //console.log("Login Into Application!!".green)
    await t.wait(5000)

    await Function_Utility.AssureClaims_SearchClaim(StrNonOccClaimNumber);
    await t.wait(15000);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_NonOcc_ClaimNonOccIFrame)

    await t.wait(8000);
    await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_Lst_NonOcc, "List Button On Claim Screen");
    await t.wait(8000);
    await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_Btn_NonOccPayment, "Non Occ Payment Option From The List")
    await t.wait(8000);
    await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_tab_NonOccPayment_Payments_Calculator, "PaymentCalculator On NonOccPayments")
    await t.wait(1000)
    // await In_Utility.AssureClaims_ElementWebListSelect_Utility(NonOcc_Claims.AssureClaims_Lst_NonOccPayment_ReserveType, data.NonOcc_Payment_ReserveType, "Reserve Type")
    // await t.wait(1000)
    await In_Utility.AssureClaims_ElementWebListSelect_Utility(NonOcc_Claims.AssureClaims_Lst_NonOccPayment_TransactioneType, data.NonOcc_Payment_TransactionType, "TransactionType")
    await t.wait(5000)
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save, "Save Image Button On General Claim creation Screen");
    await t.wait(2000)
    //NonOcc Payment saved successfully
    
    //Verification Of Calculated Payments Started Here ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_NonOccPayments_Img_CalculatePayments, "Click On calculate button")
    await t.wait(2000)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Externalapp_frame)
    var NumberOfMonths = await Generic_Utility.AssureClaim_GetNumberOfMonths_Utility(PaymentBeginDate, PaymentThroughDate);
    console.log("Number of months b/w 2 dates -- NumberOfMonths :" + NumberOfMonths);
  
    //Counts of row in a table 
    const table = Selector('[class="table table-hover filterPadd"]');
    const rows = table.find('tbody > tr');
    const Rowcounts = await rows.count;

    if (NumberOfMonths == Rowcounts) {
      console.log(NumberOfMonths + " is equal to no of row count : "+Rowcounts+": Hence Verification Is Successful".green);
    }

    //table variables for verifications
    FromDateCalcPayments = BenefitsStartFromDate;
    console.log("FromDateCalcPayments :" + FromDateCalcPayments);
    ToDateCalcPayments = await Generic_Utility.AssureClaim_GetLastDayInAMonthOfAGivenDate_Utility(FromDateCalcPayments);
    console.log("ToDateCalcPayments: " + ToDateCalcPayments);
    PrintDateCalcPayments = await Generic_Utility.AssureClaims_SetADayInNextMonthOfAGivenDate_Utility(FromDateCalcPayments, data.PreferredPrintDate);
    console.log("PrintDateCalcPayments :" + PrintDateCalcPayments)
    NewFromDateCalcPayments = FromDateCalcPayments;
    NewFromDateCalcPayments = await Generic_Utility.AssureClaims_SetADayInNextMonthOfAGivenDate_Utility(NewFromDateCalcPayments, 1);
    console.log("NewFromDateCalcPayments :" + NewFromDateCalcPayments)
    NewToDateCalcPayments = await Generic_Utility.AssureClaim_GetLastDayInAMonthOfAGivenDate_Utility(NewFromDateCalcPayments);
    console.log("NewToDateCalcPayments :" + NewToDateCalcPayments)
    NewPrintDateCalcPayments = await Generic_Utility.AssureClaims_SetADayInNextMonthOfAGivenDate_Utility(NewFromDateCalcPayments, data.PreferredPrintDate);
    console.log("NewPrintDateCalcPayments :" + NewPrintDateCalcPayments)
    NewDaysPaid = await Generic_Utility.AssureClaims_GetDayFromDate_Utility(NewToDateCalcPayments);
    console.log("NewDaysPaid :" + NewDaysPaid)
  
    //table last row variables 
    LastFromDateCalcPayments = await Generic_Utility.AssureClaims_SetADayInNextMonthOfAGivenDate_Utility(NewFromDateCalcPayments, 1);
    console.log("LastFromDateCalcPayments :" + LastFromDateCalcPayments)
    LastToDateCalcPayments = PaymentThroughDate;
    console.log("LastToDateCalcPayments :" + LastToDateCalcPayments)
    LastPrintDateCalcPayments = await Generic_Utility.AssureClaims_SetADayInNextMonthOfAGivenDate_Utility(LastFromDateCalcPayments, data.PreferredPrintDate);
    console.log("LastPrintDateCalcPayments :" + LastPrintDateCalcPayments)
    LastDaysPaid = await Generic_Utility.AssureClaims_GetDayFromDate_Utility(LastToDateCalcPayments);
    console.log("LastDaysPaid :" + LastDaysPaid)
    LastActualCalendarDays = await Generic_Utility.AssureClaims_GetActualDaysInAMonthOfAGivenDate_Utility(LastToDateCalcPayments);
    console.log("LastActualCalendarDays :" + LastActualCalendarDays)
    GrossAmountCalcPayments = (9000 * LastDaysPaid) / LastActualCalendarDays;
    console.log("GrossAmountCalcPayments :" + GrossAmountCalcPayments)
    LastGrossAmountTemp = await Generic_Utility.AssureClaims_RoundedValue_Utility(GrossAmountCalcPayments);
    console.log("LastGrossAmountTemp :" + LastGrossAmountTemp)
    LastGrossAmount = await Generic_Utility.AssureClaims_FormatANumber_Utility(LastGrossAmountTemp)
    console.log("LastGrossAmount :" + LastGrossAmount)


    //table verification starts here 
    await Verify_Utility.AssureClaims_TableVerifyText_Utility("0", "1", FromDateCalcPayments, ToDateCalcPayments, PrintDateCalcPayments, GrossAmount, GrossAmount, DaysPaid);
    await Verify_Utility.AssureClaims_TableVerifyText_Utility("1", "2", NewFromDateCalcPayments, NewToDateCalcPayments, NewPrintDateCalcPayments, "$9,000.00", "$9,000.00", NewDaysPaid);
    await Verify_Utility.AssureClaims_TableVerifyText_Utility("2", "3", LastFromDateCalcPayments, LastToDateCalcPayments, LastPrintDateCalcPayments, LastGrossAmount, LastGrossAmount, LastDaysPaid);
    
    //Non occ payments save starts here 
    await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_NonOccPaymentsCalPayment_Btn_Save, "Save the calculate payment ");
   
    //table verification ends here 
    //Verification Of Calculated Payments ends Here
   
    //Verification of future payment screen starts here
    await Verify_Utility.AssureClaims_ElementExist_Utility(NonOcc_Claims.AssureClaims_Generic_AssureclaimText.withText("Future Payments"), "verified for future payment heading");
     //Verification of future payment screen ends here

     //Verification Of Reserve Listing Before Processing Payment Started Here
    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload, "Reload Button On Top Of The Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back Button")
    await t.wait(2000);
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_NonOcc_ClaimNonOccIFrame);
    await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
    
    await t.wait(5000);
    const Header = ["Reserve Type", "Balance", "Paid", "Collection"]
    const Value = [data.NonOcc_Payment_ReserveType, "$0.00", "$0.00", "$0.00"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.NonOcc_Payment_ReserveType, "Non occ tras. reserve listing", Header, Value)
    //Verification Of Reserve Listing Before Processing Payment ends Here
    //Verification Of AutoCheck History Before Processing Payment Started Here
    await Nav_Utility.AssureClaims_ElementClick_Utility(Payment_POM.AssureClaims_ReserveCreation_Btn_Reserve_History, "Transaction History Button")
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_Externalapp_frame);
    await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_btn_autocheck, "Click on auto check btn");

    //verify for first auto trans.
    await In_Utility.AssureClaims_SetValue_Utility(NonOcc_Claims.AssureClaims_Disability_txt_checkdate, PrintDateCalcPayments, "print date")
    const Header1 = ["Check Date", "Claim Number", "Amount"]
    const Value1 = [PrintDateCalcPayments, StrNonOccClaimNumber, GrossAmount]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(PrintDateCalcPayments, "Non occ auto check trans listing", Header1, Value1)

    //verify for second auto trans.
    await In_Utility.AssureClaims_SetValue_Utility(NonOcc_Claims.AssureClaims_Disability_txt_checkdate, NewPrintDateCalcPayments, "print date")
    const Header2 = ["Check Date", "Claim Number", "Amount"]
    const Value2 = [NewPrintDateCalcPayments, StrNonOccClaimNumber, "$9,000.00"]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(NewPrintDateCalcPayments, "Non occ auto check trans listing", Header2, Value2)

    //verify for third auto trans.
    await In_Utility.AssureClaims_SetValue_Utility(NonOcc_Claims.AssureClaims_Disability_txt_checkdate, LastPrintDateCalcPayments, "print date")
    const Header3 = ["Check Date", "Claim Number", "Amount"]
    const Value3 = [LastPrintDateCalcPayments, StrNonOccClaimNumber, LastGrossAmount]
    await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(LastPrintDateCalcPayments, "Non occ auto check trans listing", Header3, Value3)
    //Verification Of AutoCheck History Before Processing Payment ends Here
    await t.switchToMainWindow();
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload, "Reload Button On Top Of The Screen")
    await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_GenericBtn_Back, "Back Button")
    await t.switchToMainWindow();
    await t.wait(5000)
    await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_NonOcc_ClaimNonOccIFrame);
    await t.wait(5000)
  //NonOcc for Manual payment processing
  await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_Lst_NonOcc, "List Button On Claim Screen");
        await t.wait(2000);
        await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_Btn_NonOccPayment,"Non Occ Payment Option From The List")
        await t.wait(4000);
        await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_tab_NonOccPayment_Payments_Calculator,"PaymentCalculator On NonOccPayments")
        //await In_Utility.AssureClaims_ElementWebListSelect_Utility(NonOcc_Claims.AssureClaims_Lst_NonOccPayment_ReserveType,data.NonOcc_Payment_ReserveType,"Reserve Type")
        await In_Utility.AssureClaims_ElementWebListSelect_Utility(NonOcc_Claims.AssureClaims_Lst_NonOccPayment_TransactioneType,data.NonOcc_Payment_TransactionType,"TransactionType")
        await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On General Claim creation Screen");
        await t.wait(3000)
        await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_NonOcc_CalPay,"CalPayment button");
await t.wait(3000)
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_NonOcc_CalPayFrame,"FrameSwitchFururePyment");
await t.wait(5000)
await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_NonOcc_ArrowForward,"CalPayment Continue Arrow button");

await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_NonOcc_Save,"Future Payment button");
await t.wait(3000)
await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_NonOcc_Grid_PrintDate,"First row Selected");
await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_NonOcc_ProcessManualPayments,"Future Payment button");
var CheckNumber = await Verify_Utility.AssureClaims_AttributeFetch_Utility(NonOcc_Claims.AssureClaims_NonOccManualPayment_checkNumber,"Value");
console.log("CheckNumber".green +CheckNumber)
await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_NonOccManaualPayment_Image, "Process Image Button On Process Manual Payment Screen");
await t.wait(3000)
await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_ManualPayment_PrintConfirmPopUp,"popup")
await t.wait(3000);
await t.switchToMainWindow()
await t.wait(4000)
await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload,"Click Reload Button")
await t.wait(4000)
//Second Manual  Processing Of Payment Completed Here

await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_NonOcc_ClaimNonOccIFrame);
await t.wait(3000)
await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_tab_NonOccPayment_Payments_Calculator,"PaymentCalculator On NonOccPayments")
await In_Utility.AssureClaims_ElementWebListSelect_Utility(NonOcc_Claims.AssureClaims_Lst_NonOccPayment_TransactioneType,data.NonOcc_Payment_TransactionType,"TransactionType")
await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_Save,"Save Image Button On General Claim creation Screen");
//NonOcc for Manual payment processing
await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_NonOcc_CalPay,"CalPayment button");
await t.wait(3000)
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_NonOcc_CalPayFrame,"FrameSwitchFururePyment");
await t.wait(2000)
await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_NonOcc_ArrowForward,"CalPayment Continue Arrow button");

await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_NonOcc_Save,"Future Payment button");
await t.wait(3000)
await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_NonOcc_Grid_PrintDate,"First row Selected");
await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_NonOcc_ProcessManualPayments,"Future Payment button");
var CheckNumber2 = await Verify_Utility.AssureClaims_AttributeFetch_Utility(NonOcc_Claims.AssureClaims_NonOccManualPayment_checkNumber,"Value");
console.log("CheckNumber2".green +CheckNumber2)
await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_NonOccManaualPayment_Image, "Process Image Button On Process Manual Payment Screen");
await t.wait(3000)
await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_ManualPayment_PrintConfirmPopUp,"popup")
await t.wait(3000);
await t.switchToMainWindow()
await t.wait(4000)
await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_DefaultView_Img_Reload,"Click Reload Button")
await t.wait(4000)
//Manually Processing Of Payment Completed Here
//Verification Of Reserve Listing After Processing Started Here
await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_NonOccPay_lnk_Breadcrumb,"BreadCrumb Link")
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_NonOcc_ClaimNonOccIFrame,"Frame Switched")
await Nav_Utility.AssureClaims_ElementClick_Utility(Reserve_Utility.AssureClaims_SelectFinancialReserve, "Click On Financial Reserve")
await t.wait(5000);
console.log("GrossAmount ".green +GrossAmount);
const Header4 = ["Reserve Type", "Paid", "Collection"]
const Value4= [data.NonOcc_Payment_ReserveType, GrossAmount, "$0.00"]
await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(data.NonOcc_Payment_ReserveType, "Non occ tras. reserve listing", Header4, Value4)
//Verification Of Reserve Listing Before Processing Payment ends Here

//Verification of transaction histroy listing Started here

await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_NonOccFinancial_TransactionHistory, "Click On transactionHistory ");
await t.wait(5000);
await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_NonOcc_CalPayFrame,"FrameSwitchFururePyment");
await t.wait(5000);
await In_Utility.AssureClaims_SetValue_Utility(NonOcc_Claims.AssureClaims_NonOccPayment_txt_TransactionCheck,CheckNumber,"CheckNumber")
await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_SystemUsers_Btn_FilterSearch,"Click on Search Button")

const Header5 = ["Type", "Check #"]
const Value5 = ["Payment", CheckNumber]
await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(CheckNumber, "Non occ trans. trans listing", Header5, Value5)

await In_Utility.AssureClaims_SetValue_Utility(NonOcc_Claims.AssureClaims_NonOccPayment_txt_TransactionCheck,CheckNumber2,"CheckNumber")

await Nav_Utility.AssureClaims_ElementClick_Utility(NonOcc_Claims.AssureClaims_SystemUsers_Btn_FilterSearch,"Click on Search Button")

const Header6 = ["Type", "Check #"]
const Value6 = ["Payment", CheckNumber2]
await Verify_Utility.AssureClaims_VerifyUXGrid_Utility(CheckNumber2, "Non occ trans. trans listing", Header6, Value6)

});
//Verification ends here
/*===========================================================Claim Delete Is Started Here========================================================================================================================================================================================================================================================================================================*/

test('AssureClaimsDeleteNonOccClaim_Test_04', async t => {
  await Function_Utility.AssureClaims_LoginIntoApplication_Utility(data.Username,data.Password,data.DSN,'Claims')
  console.log("Login Into Application!!".green)
  await t.wait(10000);
  await Function_Utility.AssureClaims_SearchClaim(StrNonOccClaimNumber);
  await Generic_Utility.AssureClaims_DynamicFrameSwitching(Verification_Msg.AssureClaims_NonOcc_ClaimNonOccIFrame)
  await Nav_Utility.AssureClaims_ElementClick_Utility(Home_POM.AssureClaims_Generic_Img_DeleteRecord, "Delete NonOccclaim")
  /*===========================================================Claim Delete Is Completed Here========================================================================================================================================================================================================================================================================================================*/





  });
});
