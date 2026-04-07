import { fonts } from '@/fonts/fonts';
import { useFonts } from '@expo-google-fonts/plus-jakarta-sans';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomInput from '../ui/ReusableInput';


export default function SignInForm() {

    const [signInMode, setSignInMode] = useState<"emailAddress" | "phoneNumber">("emailAddress")

    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const [fontsLoaded] = useFonts(fonts);

    // Validation function
    const validateEmail = (value: string) => {
        if (!value && signInMode === "emailAddress") return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Enter a valid email';
        return '';
    };

    const validatePhone = (value: string) => {
        if (!value && signInMode === "phoneNumber") return 'Phone number is required';
        if (!/^\d{10,15}$/.test(value)) return 'Enter a valid phone number';
        return '';
    };


    const toggleSignupMode = () => {
        setSignInMode(signInMode === "emailAddress" ? "phoneNumber" : "emailAddress");
    }

    if (!fontsLoaded) return null;


    return (
        <View style={styles.container} >

            <Text style={styles.pageTitle} > Welcome Back</Text>


            {/* The form input  */}
            {signInMode === "phoneNumber" ? (
                <>
                    {/* Phone number input  */}
                    <CustomInput
                        label='Phone number'
                        placeholder="Phone number"
                        keyboardType="phone-pad"
                        value={phone}
                        onBlur={() => setPhoneError(validatePhone(phone))}
                        error={phoneError}
                        onChangeText={(text) => {
                            setPhone(text)
                            if (phoneError) setPhoneError("")
                        }}
                        leftElement={
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../../assets/onboarding/NG-flag.png')} style={{ width: 24, height: 16 }} />
                                <Text style={{ marginLeft: 4, fontSize: 18, }}>+234</Text>
                            </View>
                        }
                    />
                </>
            )
                : (
                    <>
                        {/* Email input  */}
                        <CustomInput
                            label='Email address'
                            placeholder="Enter Email address"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text)
                                if (emailError) setEmailError("")
                            }}
                            onBlur={() => setEmailError(validateEmail(email))}
                            error={emailError}
                        />
                    </>
                )}





            <View style={styles.contentWrapper} >



                <Text style={styles.otherOptionText}
                    onPress={toggleSignupMode}
                >or sign in with {" "}
                    <Text
                        style={styles.option}
                    >{signInMode === "emailAddress" ? "phone number" : "email address"} </Text></Text>


                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText} >Sign in</Text>
                </TouchableOpacity>
            </View>


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
        gap: 36,
        width: "100%",
        paddingHorizontal: 26,
        height: "auto"
    },

    pageTitle: {
        color: "#10182A",
        fontSize: 28,
        fontFamily: "PlusJakartaSans_500Medium"
    },


    contentWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 21,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    },

    otherOptionText: {
        color: "#10182A",
        fontSize: 15,
        fontFamily: 'Sora_400Regular',
    },

    option: {
        color: "#2DBAA4",
        textDecorationLine: "underline"
    },

    button: {
        width: "100%",
        backgroundColor: "#253E86",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        borderRadius: 10,
        marginBottom: 11,
        marginTop: "auto"
    },

    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        fontFamily: 'Sora_400Regular',
    },
})
