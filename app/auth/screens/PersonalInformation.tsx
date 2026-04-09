import DateOfBirthInput from "@/components/ui/DOBInput";
import CustomInput from "@/components/ui/ReusableInput";
import StepTracker from "@/components/ui/StepTracker";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';




export default function PersonalInformation() {
     const [countryCode, setCountryCode] = useState<CountryCode>('NG');
    const [formValues, setFormValues] = useState({
        firstname: "",
        lastname: "",
        emailAddress: "",
        phone: "",
        date: new Date(),
        country: ""
    })


    return (
        <View style={styles.container} >

            {/* The page title  */}
            <View style={styles.heading} >
                <Text style={styles.headingText} >Personal Information</Text>

                <StepTracker currentStep={2} totalSteps={6} />
            </View>


            {/* profile picture */}
            <View style={styles.profilePicWrapper} >
                <Image source={require('../../../assets/auth/profile.png')} />
                <Image source={require('../../../assets/auth/camera.png')} style={styles.camera} />
            </View>


            {/* the form inputs  */}
            <View style={styles.formContent} >

                <View style={styles.inputsWrapper} >
                    {/* First name Input */}
                    <View style={{ flexBasis: "50%" }}  >
                        <CustomInput
                            label="First name"
                            keyboardType="default"
                            value={formValues.firstname}
                        />
                    </View>

                    {/* last name Input */}
                    <View style={{ flexBasis: "50%" }}  >
                        <CustomInput
                            label="Last name"
                            keyboardType="default"
                            value={formValues.lastname}
                        />
                    </View>
                </View>


                {/* the email input  */}
                <CustomInput
                    label="Email Address"
                    keyboardType="email-address"
                    value={formValues.emailAddress}
                />


                {/* The D.O.B and Coubtry */}

                <View style={styles.inputsWrapper} >
                    {/* First Input */}
                    <View style={{ flexBasis: "50%" }}  >
                        <DateOfBirthInput />
                    </View>

                    {/* Second Input */}
                    <View style={{ flexBasis: "50%" }}  >
                        <CustomInput
                        label='Country'
                        keyboardType="default"
                        value={countryCode}
                        leftElement={
                            <CountryPicker
                                countryCode={countryCode}
                                withCallingCode
                                withFlag
                                withFilter
                                onSelect={(country) => {
                                    setCountryCode(country.cca2)
                                }}
                            />
                        }/>
                    </View>
                </View>


                {/* Phone num */}
                <CustomInput
                    label='Phone number'
                    keyboardType="phone-pad"
                    value={formValues.phone}
                />
            </View>


            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('PersonalInformation')}
            >
                <Text style={styles.buttonText} > Continue</Text>
            </TouchableOpacity>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        paddingVertical: 28,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 16
    },

    heading: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 5
    },

    headingText: {
        fontFamily: "PlusJakartaSans_500Medium",
        color: "#10182A",
        fontSize: 27
    },

    profilePicWrapper: {
        width: 169,
        height: 169,
        borderRadius: "50%",
        position: "relative"
    },

    camera: {
        position: "absolute",
        bottom: 10,
        right: -6
    },

    formContent: {
        height: "auto",
        marginVertical: 30,
        width: "100%",
        gap: 10,
    },

    inputsWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
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