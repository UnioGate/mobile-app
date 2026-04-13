import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CongratulationsSection from './screens/CongratulationsScreen';
import CreateAccount from './screens/CreateAccount';
import PersonalInformation from './screens/PersonalInformation';
import SignIn from './screens/SignIn';
import type { AuthStackParamList } from './types';


const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function Index() {
    const navigation = useNavigation();


    return (
        <SafeAreaView style={styles.container}>

            {/* The top navigation bar  */}
            <View style={styles.navbar} >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={22} color="#10182A" />
                </TouchableOpacity>


                <TouchableOpacity >
                    <Ionicons name="headset-outline" size={22} color="#10182A" />
                </TouchableOpacity>
            </View>


            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="CreateAccount" component={CreateAccount} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="PersonalInformation" component={PersonalInformation} />
                <Stack.Screen name="Congratulations" component={CongratulationsSection} />
            </Stack.Navigator>


        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: "#ffffff"
    },

    navbar: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 5,
        paddingHorizontal: 14,
        flexDirection: "row"
    },


});