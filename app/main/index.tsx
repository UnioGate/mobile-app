import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native";
import Overview from './screens/Overview';
import { MainStackParamList } from './type';



const Stack = createNativeStackNavigator<MainStackParamList>();

export default function Index() {
    const navigation = useNavigation();

    return (

        <SafeAreaView>
            <Stack.Navigator screenOptions={{ headerShown: false }} >

                <Stack.Screen name="overview" component={Overview} />



            </Stack.Navigator>



        </SafeAreaView>

    )


}
