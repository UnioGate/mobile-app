import { useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomDropdown from "../ui/CustomDropdown";
import CustomInput from "../ui/ReusableInput";



export default function BusinessInformationForm() {
    const [formValues, setFormValues] = useState({
        firstname: "",
        lastname: "",
        emailAddress: "",
        phone: "",
        date: new Date(),
        country: "",
        companyName: "",
        address: "",
    })



    return (
        <View style={styles.container} >

            {/* Company name input */}
            <CustomInput
                label="Company/ Trading name"
                keyboardType="default"
                value={formValues.companyName}
            />

            {/* Comapny address input  */}
            <CustomInput
                label="Address"
                keyboardType="default"
                value={formValues.address}
            />


            <View style={styles.inputsWrapper} >

                {/* State dropdown */}
                <View style={{ flexBasis: "50%" }}  >
                    <CustomDropdown />
                </View>


                {/* city / town  Input */}
                <View style={{ flexBasis: "50%" }}  >
                    <CustomInput
                        label="City / Town"
                        keyboardType="default"
                        value={formValues.address}
                    />
                </View>

            </View>


            <View style={styles.inputsWrapper} >
                {/* postal code input */}
                <View style={{ flexBasis: "50%" }}  >
                    <CustomInput
                        label="Postal code"
                        placeholder="Optional"
                        keyboardType="default"
                        value={formValues.address}
                    />
                </View>

                {/* Primary currency dropdown */}
                <View style={{ flexBasis: "50%" }}  >

                </View>
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

    inputsWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },


})