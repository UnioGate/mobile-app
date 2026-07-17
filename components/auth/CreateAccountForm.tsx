import { requestOTP } from '@/api/otp.api';
import { RequestOTPBody } from '@/types/types';
import { showErrorToast, showSuccessToast } from '@/utils/toastConfig';
import { scaleFont, scaleVerticalPadding } from '@/utils/utils';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { SetStateAction, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';
import CustomCheckbox from '../ui/CustomCheckbox';
import CustomInput from '../ui/ReusableInput';



type Props = {
    onContinue: () => void;
    email: string;
    setEmail: React.Dispatch<SetStateAction<string>>
    phone: string;
    setPhone: React.Dispatch<SetStateAction<string>>
    signUpMode: "emailAddress" | "phoneNumber"
    setSignUpMode: React.Dispatch<SetStateAction<"emailAddress" | "phoneNumber">>
};


export default function CreateAccountForm({
    onContinue,
    email,
    phone,
    setPhone,
    setEmail,
    setSignUpMode,
    signUpMode
}: Props) {


    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [countryCode, setCountryCode] = useState<CountryCode>('NG');
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const [callingCode, setCallingCode] = useState('234');
    const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false)
    const [loading, setLoading] = useState(false);



    // Validation functions
    // validate email
    const validateEmail = (value: string) => {
        if (!value && signUpMode === "emailAddress") return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Enter a valid email';
        return '';
    };

    // validate phone number
    const validatePhone = (value: string) => {
        if (!value && signUpMode === "phoneNumber") return 'Phone number is required';
        if (!/^\d{10,15}$/.test(value)) return 'Enter a valid phone number';
        return '';
    };


    // toggle signup
    const toggleSignupMode = () => {
        setSignUpMode(signUpMode === "emailAddress" ? "phoneNumber" : "emailAddress");
    }




    // here we validate on submission, then call the OTP
    const getOTP = async () => {

        const error =
            signUpMode === "emailAddress" ? validateEmail(email)
                : validatePhone(phone)

        if (error) {
            if (signUpMode === "emailAddress") {
                setEmailError(error)
            }

            else {
                setPhoneError(error)
            }

            return;
        }

        if (!agreeToTerms) {
            showErrorToast("You must agree to the Terms & Conditions",
                "")
            return;
        }

        // then if the validation passes,
        // we then call our backend to send OTP then move to the OTP screen
        try {
            setLoading(true);


            const payload: RequestOTPBody = {
                identifier: signUpMode === "emailAddress" ?
                    email.toLocaleLowerCase() : phone,

                type: signUpMode === "emailAddress" ?
                    "email" : "whatsapp"
            };

            await requestOTP(payload);
            showSuccessToast(
                `A verification code has been sent to your ${signUpMode === "emailAddress" ? "email" : "WhatsApp"
                }.`
            );

            await AsyncStorage.setItem(
                "signup_data",
                JSON.stringify({
                    email: email,
                    phoneNumber: phone,
                    type: signUpMode === "emailAddress" ?
                        "email" : "whatsapp"
                })
            )
            onContinue()

        }
        catch (error) {
            console.error(error)
        }

        finally {
            setLoading(false);
        }
    }


    return (
        <View style={styles.container} >

            <Text style={styles.pageTitle} > Create Account</Text>


            {/* The form input  */}
            {signUpMode === "phoneNumber" ? (
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
                            inputMode='email'
                            placeholderTextColor="#CCCCCC"
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
                <CustomCheckbox
                    label='Agree with'
                    linkText='Terms & Conditions'
                    path='https://www.uniogate.com/terms'
                    checked={agreeToTerms}
                    setChecked={setAgreeToTerms}
                />

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={getOTP}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <Text style={styles.buttonText}>Sign up</Text>
                    )}
                </TouchableOpacity>

                <Text style={styles.otherOptionText}
                    onPress={toggleSignupMode}
                >or sign up with {" "}
                    <Text
                        style={styles.option}
                    >{signUpMode === "emailAddress" ? "Phone number" : "email address"} </Text></Text>
            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
        gap: 9,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    },

    button: {
        width: "100%",
        backgroundColor: "#253E86",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleVerticalPadding(16),
        borderRadius: 10,
        marginBottom: 11
    },

    buttonText: {
        color: "#ffffff",
        fontSize: scaleFont(18),
        fontFamily: 'Sora_400Regular',
    },

    otherOptionText: {
        color: "#10182A",
        fontSize: scaleFont(15),
        fontFamily: 'Sora_400Regular',
    },

    option: {
        color: "#2DBAA4",
        textDecorationLine: "underline"
    }
})
