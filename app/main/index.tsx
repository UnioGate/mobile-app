import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CryptoStepOne from "./screens/(crypto_payment_steps)/CryptoStepOne";
import CryptoStepTwo from "./screens/(crypto_payment_steps)/CryptoStepTwo";
import CryptoSuccess from "./screens/(crypto_payment_steps)/CryptoSuccess";
import BankTransfer from "./screens/(transfer_payment_steps)/BankTransfer";
import PayWithCard from "./screens/(transfer_payment_steps)/PayWithCard";
import TransferStepOne from "./screens/(transfer_payment_steps)/Transfer_step_one";
import UssdPayment from "./screens/(transfer_payment_steps)/UssdPayment";
import AddBankAccount from "./screens/Add_Bank_Account";
import AddTeamMember from "./screens/AddTeamMember";
import Balance from "./screens/Balance";
import BankAccount from "./screens/BankAccount";
import BusinessInformation from "./screens/BusinessInformation";
import BusinessVerification from "./screens/BusinessVerification";
import ContactSupport from "./screens/ContactSupport";
import CreateRoles from "./screens/CreateRoles";
import DisplayCurrencyScreen from "./screens/DisplayCurrencyScreen";
import EditBusinessInfo from "./screens/EditBusinessInfo";
import HelpCenter from "./screens/HelpCenter";
import InvitationSection from "./screens/InvitationSent";
import NotificationSettings from "./screens/NotificationSettings";
import Overview from './screens/Overview';
import PaymentMethods from "./screens/PaymentMethods";
import PersonalVerification from "./screens/PersonalVerification";
import ProfileDetails from "./screens/Profile/ProfileDetails";
import Roles_And_Permissions from "./screens/Roles&Permissions";
import Sales from './screens/Sales';
import SettlementSettings from "./screens/Settlements_settings";
import TapToPay from "./screens/TapToPay";
import TeamMemberDetails from "./screens/team_member_details/[id]";
import TeamMembers from "./screens/TeamMembers";
import TransactionLimitScreen from "./screens/TransactionLimitsScreen";
import Transactions from "./screens/Transactions";
import TransactionDetails from "./screens/transactions/[id]";
import Verification_andKYC from "./screens/Verification&KYC";
import Withdraw from "./screens/withdraw";
import Withdraw_Details from "./screens/withdraw_screens/[id]";
import Withdrawal_Initiated from "./screens/withdraw_screens/Withdrawal_Initiated";
import { MainStackParamList } from './type';



const Stack = createNativeStackNavigator<MainStackParamList>();

export default function Index() {



    return (

        <SafeAreaView style={styles.container} >
            <Stack.Navigator screenOptions={{ headerShown: false }} >

                <Stack.Screen name="overview" component={Overview} />
                <Stack.Screen name="sales" component={Sales} />
                <Stack.Screen name="cryptoStepOne" component={CryptoStepOne} />
                <Stack.Screen name="cryptoStepTwo" component={CryptoStepTwo} />
                <Stack.Screen name="CryptoSuccess" component={CryptoSuccess} />
                <Stack.Screen name="withdraw" component={Withdraw} />
                <Stack.Screen name="withdraw_initiated" component={Withdrawal_Initiated} />
                <Stack.Screen name="withdraw_details" component={Withdraw_Details} />
                <Stack.Screen name="transferStepOne" component={TransferStepOne} />
                <Stack.Screen name="pay_with_card" component={PayWithCard} />
                <Stack.Screen name="bank_transfer" component={BankTransfer} />
                <Stack.Screen name="ussd_payments" component={UssdPayment} />
                <Stack.Screen name="tap_to_pay" component={TapToPay} />
                <Stack.Screen name="transactions" component={Transactions} />
                <Stack.Screen name="transaction_details" component={TransactionDetails} />
                <Stack.Screen name="profile_details" component={ProfileDetails} />
                <Stack.Screen name="balance" component={Balance} />
                <Stack.Screen name="settlement_settings" component={SettlementSettings} />
                <Stack.Screen name="payment_methods" component={PaymentMethods} />
                <Stack.Screen name="display_currency_screen" component={DisplayCurrencyScreen} />
                <Stack.Screen name="team_members" component={TeamMembers} />
                <Stack.Screen name="add_team_members" component={AddTeamMember} />
                <Stack.Screen name="invitation_sent" component={InvitationSection} />
                <Stack.Screen name="team_member_details" component={TeamMemberDetails} />
                <Stack.Screen name="roles_and_permission" component={Roles_And_Permissions} />
                <Stack.Screen name="bank_account" component={BankAccount} />
                <Stack.Screen name="add_bank_account" component={AddBankAccount} />
                <Stack.Screen name="notification_settings" component={NotificationSettings} />
                <Stack.Screen name="tx_limits" component={TransactionLimitScreen} />
                <Stack.Screen name="contact_support" component={ContactSupport} />
                <Stack.Screen name="help_center" component={HelpCenter} />
                <Stack.Screen name="create_roles" component={CreateRoles} />
                <Stack.Screen name="business_information" component={BusinessInformation} />
                <Stack.Screen name="edit_business_info" component={EditBusinessInfo} />
                <Stack.Screen name="verification_and_kyc" component={Verification_andKYC} />
                <Stack.Screen name="personal_verification" component={PersonalVerification} />
                <Stack.Screen name="business_verification" component={BusinessVerification} />

            </Stack.Navigator>



        </SafeAreaView>

    )


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})