import { scaleFont, scaleVerticalPadding } from '@/utils/utils';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';
import CustomInput from '../ui/ReusableInput';



export default function SignInForm() {

    const [signInMode, setSignInMode] = useState<"emailAddress" | "phoneNumber">("emailAddress")

    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [countryCode, setCountryCode] = useState<CountryCode>('NG');
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const [callingCode, setCallingCode] = useState('234');



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
                            <Pressable
                                onPress={() => setShowCountryPicker(true)}
                                style={{
                                    width: "auto",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                }}
                            >
                                <CountryPicker
                                    countryCode={countryCode}
                                    visible={showCountryPicker}
                                    withCallingCode
                                    withFlag
                                    withFilter
                                    onClose={() => setShowCountryPicker(false)}
                                    onSelect={(country) => {
                                        setCountryCode(country.cca2);
                                        setCallingCode(country.callingCode[0]);
                                        setShowCountryPicker(false);
                                    }}
                                />

                                <Text
                                    style={{
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular",
                                        color: "#10182A",
                                    }}
                                >
                                    +{callingCode}
                                </Text>

                                <Ionicons
                                    name="chevron-down"
                                    style={{
                                        marginLeft: 6,
                                    }}
                                    color={"#10182A"}
                                    size={16}
                                />
                            </Pressable>
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
        height: "auto"
    },

    pageTitle: {
        color: "#10182A",
        fontSize: scaleFont(28),
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
        fontSize: scaleFont(15),
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
        paddingVertical: scaleVerticalPadding(16),
        borderRadius: 10,
        marginBottom: 11,
        marginTop: "auto"
    },

    buttonText: {
        color: "#ffffff",
        fontSize: scaleFont(18),
        fontFamily: 'Sora_400Regular',
    },
})
