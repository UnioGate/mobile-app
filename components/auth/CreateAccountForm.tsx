import { AuthStackParamList } from '@/app/auth/types';
import { fonts } from '@/fonts/fonts';
import { scaleFont, scaleVerticalPadding } from '@/utils/utils';
import { useFonts } from '@expo-google-fonts/plus-jakarta-sans';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';
import CustomCheckbox from '../ui/CustomCheckbox';
import CustomInput from '../ui/ReusableInput';

export default function CreateAccountForm() {

    const [signUpMode, setSignUpMode] = useState<"emailAddress" | "phoneNumber">("emailAddress")

    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [countryCode, setCountryCode] = useState<CountryCode>('NG');
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const [callingCode, setCallingCode] = useState('234');

    const [fontsLoaded] = useFonts(fonts);

    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    // Validation function
    const validateEmail = (value: string) => {
        if (!value && signUpMode === "emailAddress") return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Enter a valid email';
        return '';
    };

    const validatePhone = (value: string) => {
        if (!value && signUpMode === "phoneNumber") return 'Phone number is required';
        if (!/^\d{10,15}$/.test(value)) return 'Enter a valid phone number';
        return '';
    };


    const toggleSignupMode = () => {
        setSignUpMode(signUpMode === "emailAddress" ? "phoneNumber" : "emailAddress");
    }

    if (!fontsLoaded) return null;


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
                    path='/terms&condtions'
                />

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('PersonalInformation')}
                >
                    <Text style={styles.buttonText} > Sign up</Text>
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
        paddingHorizontal: 26,
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
