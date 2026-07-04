import CustomDropdown from "@/components/ui/CustomDropdown";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { StyleSheet, Text, View } from "react-native";





export default function TradingInfoForm() {
    return (
        <View style={styles.form_wrapper} >
            <Text style={styles.form_heading}> Trading Information </Text>



            < View style={styles.inputs_wrapper} >

                < View style={{
                    width: "100%",
                    flexDirection: "row",
                    gap: "6%"
                }} >


                    < View style={styles.halfInput} >
                        <CustomDropdown
                            label="Industry Type"
                            dropdownStyle={{
                                backgroundColor: "#ffffff",
                                borderColor: "#808080",
                                borderWidth: 0.5
                            }}
                            labelStyle={{
                                color: "#10182A",
                                fontSize: scaleFont(12),
                                fontFamily: "Sora_600SemiBold"
                            }}
                        />
                    </View>


                    < View style={styles.halfInput} >
                        <CustomDropdown
                            label="Year Established"
                            dropdownStyle={{
                                backgroundColor: "#ffffff",
                                borderColor: "#808080",
                                borderWidth: 0.5
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
        </View>
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