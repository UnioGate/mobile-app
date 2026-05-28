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
import Withdraw_Details from "./screens/(withdraw_screens)/Withdraw_Details";
import Withdrawal_Initiated from "./screens/(withdraw_screens)/Withdrawal_Initiated";
import Balance from "./screens/Balance";
import DisplayCurrencyScreen from "./screens/DisplayCurrencyScreen";
import Overview from './screens/Overview';
import PaymentMethods from "./screens/PaymentMethods";
import ProfileDetails from "./screens/Profile/ProfileDetails";
import Sales from './screens/Sales';
import SettlementSettings from "./screens/Settlements_settings";
import TapToPay from "./screens/TapToPay";
import TeamMembers from "./screens/TeamMembers";
import Transactions from "./screens/Transactions";
import TransactionDetails from "./screens/transactions/[id]";
import Withdraw from "./screens/withdraw";
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

            </Stack.Navigator>



        </SafeAreaView>

    )


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})