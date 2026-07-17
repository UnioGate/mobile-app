import { CompleteProfileBody } from "@/types/types";
import { scaleFont, scaleVerticalPadding, updateFormField } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";
import DateOfBirthInput from "../ui/DOBInput";
import CustomInput from "../ui/ReusableInput";


export default function PersonalInformationForm() {
    const [countryCode, setCountryCode] = useState<CountryCode>('NG');
    const [selectedImage, setSelectedImage] = useState<null | string>(null)
    const [countryName, setCountryName] = useState('Nigeria');
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const [showPicker, setShowPicker] = useState(false)
    const [error, setError] = useState("")

    const [formValues, setFormValues] = useState<CompleteProfileBody>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        dob: new Date(),
        country: "",
        inviteBusinessId: "",
        identifier: ""
    })



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
    const handleSubmit = async () => {
        const error =
            validateFirstName(formValues.firstName) ||
            validateLastName(formValues.lastName) ||
            validateEmail(formValues.email!) ||
            validateDOB(formValues.dob) ||
            validateCountry(formValues.country) ||
            validatePhoneNumber(formValues.phoneNumber!);

        if (error) {
            setError(error);
            return;
        }

        setError("");

        // Proceed with API call
        console.log(formValues);
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
                            date={formValues.dob}
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
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText} > Continue</Text>
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
        marginTop: 4,
        fontFamily: 'Sora_400Regular',
    },

})
