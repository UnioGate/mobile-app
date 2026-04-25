import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Overview from './screens/Overview';
import Sales from './screens/Sales';
import { MainStackParamList } from './type';



const Stack = createNativeStackNavigator<MainStackParamList>();

export default function Index() {



    return (

        <SafeAreaView style={styles.container} >
            <Stack.Navigator screenOptions={{ headerShown: false }} >

                <Stack.Screen name="overview" component={Overview} />
                <Stack.Screen name="sales" component={Sales} />



            </Stack.Navigator>



        </SafeAreaView>

    )


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})