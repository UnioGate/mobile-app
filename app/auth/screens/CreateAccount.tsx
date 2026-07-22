import CreateAccountForm from '@/components/auth/CreateAccountForm';
import OTPForm from '@/components/auth/OTPForm';
import SupportIcon from '@/components/icons/SupportIcon';
import { fonts } from '@/fonts/fonts';
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from '@/utils/utils';
import { useFonts } from '@expo-google-fonts/plus-jakarta-sans';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { AuthStackParamList } from '../types';



export default function CreateAccount() {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const [currentForm, setCurrentForm] = useState<"createAccountForm" | "otp">("createAccountForm");
    const [signUpMode, setSignUpMode] = useState<"emailAddress" | "phoneNumber">("emailAddress")
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');



    const [fontsLoaded] = useFonts(fonts);

    if (!fontsLoaded) return null;


    return (
        <View style={styles.container} >

            <View style={styles.navbar}>

                <View style={{ width: 25 }} />


                <TouchableOpacity
                    onPress={() => router.push("/main/screens/ContactSupport")}
                >
                    <SupportIcon height={22} width={22} color="#10182A" />
                </TouchableOpacity>
            </View>

            {
                currentForm === "createAccountForm" ? (
                    <CreateAccountForm
                        onContinue={() => setCurrentForm("otp")}
                        email={email}
                        setEmail={setEmail}
                        phone={phone}
                        setPhone={setPhone}
                        signUpMode={signUpMode}
                        setSignUpMode={setSignUpMode}
                    />
                )
                    : (
                        <OTPForm
                            email={email}
                            setEmail={setEmail}
                            phone={phone}
                            setPhone={setPhone}
                            signUpMode={signUpMode}
                            setSignUpMode={setSignUpMode}
                            setCurrentForm={setCurrentForm}
                        />
                    )
            }

            {/* This is the bottom text on the page  */}
            <Text style={styles.bottomText}  >Have an account? {" "}
                <Text
                    onPress={() => navigation.navigate('SignIn')}
                    style={styles.bottomTextLink}
                >Log in</Text></Text>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        paddingHorizontal: scaleHorizontalPadding(16),
        paddingVertical: scaleVerticalPadding(10),
        paddingTop: scaleVerticalPadding(5),
        gap: 16
    },


    bottomText: {
        color: "#CCCCCCCC",
        fontSize: scaleFont(15),
        fontFamily: 'Sora_400Regular',
        marginTop: "auto"
    },

    bottomTextLink: {
        color: "#10182A",
        textDecorationLine: "underline"
    },



    navbar: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
})
