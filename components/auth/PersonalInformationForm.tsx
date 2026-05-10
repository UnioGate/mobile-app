import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";
import DateOfBirthInput from "../ui/DOBInput";
import CustomInput from "../ui/ReusableInput";



export default function PersonalInformationForm() {
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
        <View style={styles.container}  >


            {/* profile picture */}
            <View style={styles.profilePicWrapper} >
                <Image source={require('../../assets/auth/profile.png')} />
                <Image source={require('../../assets/auth/camera.png')} style={styles.camera} />
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


                {/* The D.O.B and Country */}

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
                            } />
                    </View>
                </View>


                {/* Phone num */}
                <CustomInput
                    label='Phone number'
                    keyboardType="phone-pad"
                    value={formValues.phone}
                />
            </View>



        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 16
    },

    profilePicWrapper: {
        width: 169,
        height: 169,
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

})
