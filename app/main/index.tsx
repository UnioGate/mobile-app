import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Overview from './screens/Overview';
import { MainStackParamList } from './type';



const Stack = createNativeStackNavigator<MainStackParamList>();

export default function Index() {
    const navigation = useNavigation();


    return (

        <SafeAreaView style={styles.container} >
            <Stack.Navigator screenOptions={{ headerShown: false }} >

                <Stack.Screen name="overview" component={Overview} />



            </Stack.Navigator>



        </SafeAreaView>

    )


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})