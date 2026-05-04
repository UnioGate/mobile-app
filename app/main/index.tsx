import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CryptoStepOne from "./screens/(crypto_payment_steps)/CryptoStepOne";
import CryptoStepTwo from "./screens/(crypto_payment_steps)/CryptoStepTwo";
import CryptoSuccess from "./screens/(crypto_payment_steps)/CryptoSuccess";
import Overview from './screens/Overview';
import Sales from './screens/Sales';
import Withdraw from "./screens/withdraw";
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

            </Stack.Navigator>



        </SafeAreaView>

    )


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})