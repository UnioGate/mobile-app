import CreateAccountForm from '@/components/auth/CreateAccountForm';
import OTPForm from '@/components/auth/OTPForm';
import { fonts } from '@/fonts/fonts';
import { useFonts } from '@expo-google-fonts/plus-jakarta-sans';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { AuthStackParamList } from '../types';

export default function CreateAccount({ }) {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const [currentForm, setCurrentForm] = useState("otpForm")


    const [fontsLoaded] = useFonts(fonts);

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={styles.container} >


            {
                currentForm === "createAccountForm" ? (
                    <CreateAccountForm />
                )
                    : (
                        <OTPForm />
                    )
            }





            {/* This is the bottom text on the page  */}
            <Text style={styles.bottomText}  >Have an account? {" "}
                <Text
                    onPress={() => navigation.navigate('SignIn')}
                    style={styles.bottomTextLink}
                >Log in</Text></Text>
        </SafeAreaView>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column"
    },


    bottomText: {
        color: "#CCCCCCCC",
        fontSize: 15,
        fontFamily: 'Sora_400Regular',
    },

    bottomTextLink: {
        color: "#10182A",
        textDecorationLine: "underline"
    }
})
