import { requestOTP } from '@/api/otp.api';
import { RequestOTPBody } from '@/types/types';
import { showSuccessToast } from '@/utils/toastConfig';
import { scaleFont, scaleVerticalPadding } from '@/utils/utils';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { SetStateAction, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';
import { ActivityIndicator } from 'react-native-paper';
import CustomInput from '../ui/ReusableInput';



interface SignInFormProps {
    email: string;
    setEmail: React.Dispatch<SetStateAction<string>>
    phone: string;
    setPhone: React.Dispatch<SetStateAction<string>>
    signInMode: "emailAddress" | "phoneNumber"
    setSignInMode: React.Dispatch<SetStateAction<"emailAddress" | "phoneNumber">>
    step: "signin_step" | "otp_step";
    setStep: React.Dispatch<SetStateAction<"signin_step" | "otp_step">>
}

export default function SignInForm({
    email,
    phone,
    setEmail,
    setPhone,
    setSignInMode,
    signInMode,
    setStep,
    step
}: SignInFormProps) {

    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [countryCode, setCountryCode] = useState<CountryCode>('NG');
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const [callingCode, setCallingCode] = useState('234');
    const [loading, setLoading] = useState(false)



    // Validation function
    // validate email
    const validateEmail = (value: string) => {
        if (!value && signInMode === "emailAddress") return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Enter a valid email';
        return '';
    };


    // validate phone number
    const validatePhone = (value: string) => {
        if (!value && signInMode === "phoneNumber") return 'Phone number is required';
        if (!/^\d{10,15}$/.test(value)) return 'Enter a valid phone number';
        return '';
    };



    // toggle signup mode
    const toggleSignupMode = () => {
        setSignInMode(signInMode === "emailAddress" ? "phoneNumber" : "emailAddress");
    }



    // here we validate on submission, then call the OTP
    const getOTP = async () => {

        const error =
            signInMode === "emailAddress" ? validateEmail(email)
                : validatePhone(phone)

        if (error) {
            if (signInMode === "emailAddress") {
                setEmailError(error)
            }

            else {
                setPhoneError(error)
            }

            return;
        }

        // then if the validation passes,
        // we then call our backend to send OTP then move to the OTP screen
        try {
            setLoading(true);


            const payload: RequestOTPBody = {
                identifier: signInMode === "emailAddress" ?
                    email.toLocaleLowerCase() : phone,

                type: signInMode === "emailAddress" ?
                    "email" : "whatsapp"
            };

            await requestOTP(payload);
            showSuccessToast(
                `A verification code has been sent to your ${signInMode === "emailAddress" ? "email" : "WhatsApp"
                }.`
            );

            await AsyncStorage.setItem(
                "signup_data",
                JSON.stringify({
                    email: email,
                    phoneNumber: phone,
                    type: signInMode === "emailAddress" ?
                        "email" : "whatsapp"
                })
            )

            setStep("otp_step")


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
                    onPress={getOTP}
                    style={styles.button}
                    activeOpacity={0.7}
                >

                    {loading ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <Text style={styles.buttonText}>Sign in</Text>
                    )}
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
