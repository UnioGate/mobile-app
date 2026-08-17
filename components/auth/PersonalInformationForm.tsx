import { completeProfile } from "@/api/onboarding.api";
import { useStep } from "@/context/StepContext";
import { CompleteProfileBody } from "@/types/types";
import { showErrorToast, showSuccessToast } from "@/utils/toastConfig";
import { scaleFont, scaleVerticalPadding, updateFormField, uploadImageToCloudinary } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";
import { ActivityIndicator } from "react-native-paper";
import DateOfBirthInput from "../ui/DOBInput";
import CustomInput from "../ui/ReusableInput";


export default function PersonalInformationForm() {
    const [countryCode, setCountryCode] = useState<CountryCode>('NG');
    const [selectedImage, setSelectedImage] = useState<null | string>(null)
    const [countryName, setCountryName] = useState('Nigeria');
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const [showPicker, setShowPicker] = useState(false)
    const [error, setError] = useState("")
    const { setCurrentStep } = useStep();
    const SIGNUP_KEY = "signup_data";
    const [loading, setLoading] = useState(false)

    const [formValues, setFormValues] = useState<CompleteProfileBody>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        dob: null,
        country: "Nigeria",
        inviteBusinessId: "",
        identifier: ""
    })



    // retrieve cached data from the db
    useEffect(() => {
        const getCachedData = async () => {
            const data = await AsyncStorage.getItem(SIGNUP_KEY);

            if (!data) return;

            const signupData = JSON.parse(data);

            setFormValues((prev) => ({
                ...prev,
                email: signupData.email.toLowerCase(),
                type: signupData.type,
                phoneNumber: signupData.phoneNumber,
            }));
        };

        getCachedData();
    }, []);



    // This handles profile picture selection
    const pickImage = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert('Permission to access gallery is required.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };



    // Validation functions
    // validate firstName
    const validateFirstName = (value: string) => {
        if (!value.trim()) return 'Full name is required';
        return ''
    }


    // Validate lastName
    const validateLastName = (value: string) => {
        if (!value.trim()) return 'Last name is required';
        return ''
    }

    // Validate email
    const validateEmail = (value: string) => {
        if (!value.trim()) return "Email is required"

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Enter a valid email';
        return '';
    }


    // validate date of birth
    const validateDOB = (value: Date) => {
        if (!value) return 'Date of Birth is required';


        const today = new Date();

        let age = today.getFullYear() - value.getFullYear();

        const monthDifference = today.getMonth() - value.getMonth();

        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < value.getDate())
        ) {
            age--;
        }

        if (age < 18) {
            return "You must be 18 years or older";
        }

        return ''
    }


    // Validate country
    const validateCountry = (value: string) => {
        if (!value.trim()) return 'Country is required'

        return ''
    }



    // Validate phone number
    const validatePhoneNumber = (value: string) => {
        if (!value.trim()) return 'Phone number is required'

        return ''
    }



    // this function handles the form submission
    const handleNext = async () => {
        const error =
            validateFirstName(formValues.firstName) ||
            validateLastName(formValues.lastName) ||
            validateEmail(formValues.email!) ||
            validateDOB(formValues.dob!) ||
            validateCountry(formValues.country) ||
            validatePhoneNumber(formValues.phoneNumber!);

        if (error) {
            setError(error);
            return;
        }

        setError("");


        try {
            setLoading(true);


            let profileImageUrl: string | null = null;

            if (selectedImage) {
                try {
                    profileImageUrl = await uploadImageToCloudinary(selectedImage);
                } catch (uploadError) {
                    showErrorToast("Failed to upload profile picture");
                    console.error(uploadError);
                    return; // stop here — don't proceed with a broken image state
                }
            }


            const data = await AsyncStorage.getItem(SIGNUP_KEY);

            if (!data) {
                showErrorToast("Failed! Please reauthenticate")
                return;
            };

            const signupData = JSON.parse(data);

            const identifier =
                signupData.type === "email"
                    ? signupData.email.toLowerCase()
                    : signupData.phoneNumber;

            const payload: CompleteProfileBody = {
                identifier,
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                country: formValues.country,
                email: formValues.email?.toLowerCase(),
                phoneNumber: formValues.phoneNumber,
                inviteBusinessId: formValues.inviteBusinessId,
                // profileImageUrl,   see the flag below before adding this
            }

            console.log("signupData", signupData);
            console.log("formValues", formValues);

            console.log("payload", JSON.stringify(payload, null, 2));


            const response = await completeProfile(payload)

            if (!response.ok) {
                showErrorToast(response.error);
                console.error(response.error)
                return;
            }

            if (response.isInvitedRep) {
                // Session already set, this rep is done onboarding.
                router.replace("/main");
            }

            else {

                // Owner path: still needs to create their business.

                // add cached data to db
                const userId = response.userId

                await AsyncStorage.setItem(SIGNUP_KEY, JSON.stringify({
                    ...formValues,
                    userId
                }));

                showSuccessToast(response.message)
                setCurrentStep(2)
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                showErrorToast(
                    error.response?.data?.message ??
                    error.message
                );
                console.log("Status:", error.response?.status);
                console.log("Response Data:", error.response?.data);
                console.log("Response Headers:", error.response?.headers);
                console.log("Request Config:", error.config);

            } else if (error instanceof Error) {
                showErrorToast(error.message);
                console.error(error)
            } else {
                showErrorToast("Something went wrong");
                console.error(error)
            }
        }


        finally {
            setLoading(false)
        }

    };




    return (
        <View style={styles.container}  >

            {/* profile picture input */}
            <Pressable
                onPress={pickImage}
                style={styles.profilePicWrapper} >

                <Image source={
                    selectedImage
                        ? { uri: selectedImage }
                        : require('../../assets/auth/profile.png')
                }

                    style={styles.profileImage}
                />

                <Image source={require('../../assets/auth/camera.png')} style={styles.camera} />
            </Pressable>


            {/* the form inputs  */}
            <View style={styles.formContent} >

                <View style={styles.inputsWrapper} >
                    {/* First name Input */}
                    <View style={{ flexBasis: "50%" }}  >
                        <CustomInput
                            label="First name"
                            keyboardType="default"
                            value={formValues.firstName}
                            onChangeText={(text) => updateFormField("firstName", text, setFormValues)}
                        />
                    </View>

                    {/* last name Input */}
                    <View style={{ flexBasis: "50%" }}  >
                        <CustomInput
                            label="Last name"
                            keyboardType="default"
                            value={formValues.lastName}
                            onChangeText={(text) => updateFormField("lastName", text, setFormValues)}
                        />
                    </View>
                </View>


                {/* the email input  */}
                <CustomInput
                    label="Email Address"
                    keyboardType="email-address"
                    value={formValues.email}
                    onChangeText={(text) => updateFormField("email", text, setFormValues)}
                />


                {/* The D.O.B and Country */}

                <View style={styles.inputsWrapper} >
                    {/* First Input */}
                    <View style={{ flexBasis: "50%" }}  >
                        <DateOfBirthInput
                            date={formValues.dob!}
                            onDateChange={(date) =>
                                updateFormField("dob", date, setFormValues)
                            }
                            showPicker={showPicker}
                            setShowPicker={setShowPicker}
                        />
                    </View>

                    {/* Second Input */}
                    <Pressable
                        onPress={() => setShowCountryPicker(true)}
                        style={{
                            flexBasis: "50%"
                        }} >
                        <CustomInput
                            label='Country'
                            keyboardType="default"
                            editable={false}
                            value={countryName || countryCode}
                            onChangeText={(text) => updateFormField("country", text, setFormValues)}
                            leftElement={
                                <CountryPicker
                                    countryCode={countryCode}
                                    visible={showCountryPicker}
                                    withCallingCode
                                    withFlag
                                    withFilter
                                    onClose={() => setShowCountryPicker(false)}
                                    onSelect={(country) => {
                                        setCountryCode(country.cca2);
                                        setCountryName(country.name as string);
                                        setShowCountryPicker(false);
                                        updateFormField("country", country.name as string, setFormValues)
                                    }}
                                />
                            } />
                    </Pressable>
                </View>


                {/* Phone num */}
                <CustomInput
                    label='Phone number'
                    keyboardType="phone-pad"
                    value={formValues.phoneNumber}
                    onChangeText={(text) => updateFormField("phoneNumber", text, setFormValues)}
                />
            </View>


            {/* The error statement  */}
            {error ? <Text style={styles.errorText}>
                <Ionicons name="alert-circle" size={14} color="red" /> {error}</Text> : null}



            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={handleNext}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#ffffff" />
                ) : (
                    <Text style={styles.buttonText}>Continue</Text>
                )}
            </TouchableOpacity>

        </View >
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 16,
        width: "100%"
    },

    profilePicWrapper: {
        width: 140,
        height: 140,
        borderRadius: 84.5,
        position: "relative"
    },

    camera: {
        position: "absolute",
        bottom: 10,
        right: -6
    },

    formContent: {
        height: "auto",
        marginVertical: scaleVerticalPadding(5),
        width: "100%",
        gap: 12,
    },

    inputsWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },

    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 84.5,
        backgroundColor: "#FFFFFF"
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


    errorText: {
        color: 'red',
        fontSize: scaleFont(12),
        fontFamily: 'Sora_400Regular',
        alignSelf: "flex-start"
    },

})
