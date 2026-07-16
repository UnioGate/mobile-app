import CreateAccountForm from '@/components/auth/CreateAccountForm';
import OTPForm from '@/components/auth/OTPForm';
import { fonts } from '@/fonts/fonts';
import { scaleFont, scaleVerticalPadding } from '@/utils/utils';
import { useFonts } from '@expo-google-fonts/plus-jakarta-sans';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { AuthStackParamList } from '../types';



export default function CreateAccount() {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const [currentForm, setCurrentForm] = useState<"createAccountForm" | "otp">("otp");
    const [signUpMode, setSignUpMode] = useState<"emailAddress" | "phoneNumber">("emailAddress")
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');



    const [fontsLoaded] = useFonts(fonts);

    if (!fontsLoaded) return null;


    return (
        <View style={styles.container} >

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
        justifyContent: "space-between",
        flexDirection: "column",
        paddingVertical: scaleVerticalPadding(13)
    },


    bottomText: {
        color: "#CCCCCCCC",
        fontSize: scaleFont(15),
        fontFamily: 'Sora_400Regular',
    },

    bottomTextLink: {
        color: "#10182A",
        textDecorationLine: "underline"
    }
})
