import { scaleVerticalPadding } from "@/utils/utils";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";
import DateOfBirthInput from "../ui/DOBInput";
import CustomInput from "../ui/ReusableInput";


export default function PersonalInformationForm() {
    const [countryCode, setCountryCode] = useState<CountryCode>('NG');
    const [selectedImage, setSelectedImage] = useState<null | string>(null)
    const [countryName, setCountryName] = useState('Nigeria');
    const [showCountryPicker, setShowCountryPicker] = useState(false);

    const [formValues, setFormValues] = useState({
        firstname: "",
        lastname: "",
        emailAddress: "",
        phone: "",
        date: new Date(),
        country: ""
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
                    value={formValues.phone}
                />
            </View>



        </View >
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
        marginVertical: scaleVerticalPadding(30),
        width: "100%",
        gap: 24,
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

})
