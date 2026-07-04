import CustomInput from "@/components/ui/ReusableInput";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { StyleSheet, Text, View } from "react-native";





export default function ContactInfoForm() {
    return (
        <View style={styles.form_wrapper} >
            <Text style={styles.form_heading}>Contact Information</Text>



            <View style={styles.inputs_wrapper} >

                <CustomInput
                    keyboardType="default"
                    label="Email Address"
                    placeholder="UnioGate@gmail.com"
                    containerStyle={{
                        borderColor: "#808080",
                        borderWidth: 0.5,
                        backgroundColor: "#ffffff"
                    }}
                    labelStyle={{
                        color: "#10182A",
                        fontSize: scaleFont(12),
                        fontFamily: "Sora_600SemiBold"
                    }}
                />


                <View style={{
                    width: "100%",
                    flexDirection: "row",
                    gap: "6%"
                }} >

                    <View style={styles.halfInput} >
                        <CustomInput
                            label='Phone number'
                            keyboardType="phone-pad"
                            containerStyle={{
                                borderColor: "#808080",
                                borderWidth: 0.5,
                                backgroundColor: "#ffffff"
                            }}
                            labelStyle={{
                                color: "#10182A",
                                fontSize: scaleFont(12),
                                fontFamily: "Sora_600SemiBold"
                            }}
                        />
                    </View>


                    <View style={styles.halfInput} >
                        <CustomInput
                            keyboardType="web-search"
                            label="Website URL"
                            containerStyle={{
                                borderColor: "#808080",
                                borderWidth: 0.5,
                                backgroundColor: "#ffffff"
                            }}
                            labelStyle={{
                                color: "#10182A",
                                fontSize: scaleFont(12),
                                fontFamily: "Sora_600SemiBold"
                            }}
                        />
                    </View>

                </View>


            </View>
        </View >
    )
}




const styles = StyleSheet.create({
    form_wrapper: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingVertical: scaleVerticalPadding(10),
        paddingHorizontal: scaleHorizontalPadding(11),
        gap: 10
    },

    form_heading: {
        color: "#000000",
        fontFamily: "Sora_600SemiBold",
        fontSize: scaleFont(14)
    },

    inputs_wrapper: {
        width: "100%",
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "#808080",
        gap: 10,
        paddingVertical: scaleVerticalPadding(10),
        paddingHorizontal: scaleHorizontalPadding(13)
    },

    halfInput: {
        width: "47%",
    },



})