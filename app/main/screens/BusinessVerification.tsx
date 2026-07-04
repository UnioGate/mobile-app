import BriefcaseIcon from "@/components/icons/BriefcaseIcon";
import ImageIcon from "@/components/icons/ImageIcon";
import CustomDropdown from "@/components/ui/CustomDropdown";
import CustomInput from "@/components/ui/ReusableInput";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MainStackParamList } from "../type";



type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;
export default function BusinessVerification() {
    const navigation = useNavigation<OverviewNavigationProp>()


    return (
        <View style={styles.container} >


            {/* Header */}
            <View style={styles.header}>

                <Pressable
                    aria-label="back-button"
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="chevron-back"
                        size={22}
                        color="#10182A"
                    />
                </Pressable>


                <Text style={styles.heading}>
                    Business Verification
                </Text>


                <Pressable>
                </Pressable>

            </View>



            {/* main content  */}
            <ScrollView
                style={{ flex: 1, width: "100%" }}
                contentContainerStyle={styles.scrollView_style}
                showsVerticalScrollIndicator={false} >

                {/* current tier */}
                <View style={{
                    width: "100%",
                    backgroundColor: "#ffffff",
                    borderRadius: 10,
                    paddingVertical: scaleVerticalPadding(10),
                    paddingHorizontal: scaleHorizontalPadding(15),
                    alignItems: "flex-start",
                    flexDirection: "column",
                    gap: 14
                }} >



                    <View style={{
                        width: "100%",
                        alignItems: "flex-start",
                        gap: 8,
                        flexDirection: "row",
                        padding: 0,
                        backgroundColor: "#6D4CFF1A",
                        paddingVertical: scaleVerticalPadding(12),
                        paddingHorizontal: scaleHorizontalPadding(10),
                        borderRadius: 10,
                    }} >

                        <BriefcaseIcon />


                        <View style={{
                            gap: 12,
                            justifyContent: "flex-start",
                            alignItems: "flex-start"
                        }} >

                            <View style={{
                                width: "100%",
                                borderRadius: 10,
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10
                            }} >

                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_600SemiBold"
                                }} >
                                    Verify your business to unlock Tier 3
                                </Text>
                            </View>


                            <View style={{
                                gap: 12
                            }} >


                                <View style={{
                                    width: "auto",
                                    gap: 8,
                                    alignItems: "center",
                                    flexDirection: "row"
                                }} >
                                    <Ionicons name="checkmark"
                                        color={"#2DBAA4"}
                                        size={18}
                                    />
                                    <Text
                                        style={{
                                            color: "#000000",
                                            fontSize: scaleFont(14),
                                            fontFamily: "Sora_400Regular"
                                        }}
                                    >CAC Registration Certificate  </Text>
                                </View>

                                <View style={{
                                    width: "auto",
                                    gap: 8,
                                    alignItems: "center",
                                    flexDirection: "row"
                                }} >
                                    <Ionicons name="checkmark"
                                        color={"#2DBAA4"}
                                        size={18}
                                    />
                                    <Text
                                        style={{
                                            color: "#000000",
                                            fontSize: scaleFont(14),
                                            fontFamily: "Sora_400Regular"
                                        }}
                                    >TIN Certificate (optional)  </Text>
                                </View>

                            </View>
                        </View>
                    </View>

                </View>




                {/* CAC registration Number */}
                <View style={styles.card_wrapper} >
                    <CustomInput
                        label="CAC Registration Number"
                        placeholder="12345678"
                        labelStyle={{
                            color: "#000000",
                            fontSize: scaleFont(12),
                            fontFamily: "Sora_600SemiBold"
                        }}

                        containerStyle={{
                            borderColor: "#808080",
                            backgroundColor: "#ffffff"
                        }}
                    />


                    <CustomDropdown
                        label="Business Type"
                        dropdownStyle={{
                            borderColor: "#808080",
                            backgroundColor: "#ffffff"
                        }}
                    />


                    <CustomDropdown
                        label="Date of Regristration"
                        dropdownStyle={{
                            borderColor: "#808080",
                            backgroundColor: "#ffffff"
                        }}
                    />


                    <CustomDropdown
                        label="Tax Identification Number (TIN)"
                        dropdownStyle={{
                            borderColor: "#808080",
                            backgroundColor: "#ffffff"
                        }}
                    />

                </View>



                {/* upload CAC certificate */}
                <Pressable style={styles.card_wrapper} >
                    <Text style={styles.card_heading} >Upload CAC Certificate</Text>

                    <View style={{
                        width: "100%",
                        borderWidth: 0.5,
                        borderColor: "#808080",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        borderRadius: 7,
                        paddingVertical: scaleVerticalPadding(7)
                    }} >
                        <ImageIcon color={"#10182A"} />
                        <Text style={{
                            color: "#10182A",
                            fontSize: scaleFont(13),
                            fontFamily: "Sora_400Regular"
                        }} >Upload as PDF or image</Text>
                    </View>

                </Pressable>



                {/* proof of address */}
                <Pressable style={styles.card_wrapper} >
                    <Text style={styles.card_heading} >Upload CAC Certificate</Text>

                    <View style={{
                        width: "100%",
                        borderWidth: 0.5,
                        borderColor: "#808080",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        borderRadius: 7,
                        paddingVertical: scaleVerticalPadding(7)
                    }} >
                        <ImageIcon color={"#10182A"} />
                        <Text style={{
                            color: "#10182A",
                            fontSize: scaleFont(13),
                            fontFamily: "Sora_400Regular"
                        }} >Upload as PDF or image</Text>
                    </View>

                </Pressable>



                {/* TIN certificate */}
                <Pressable style={styles.card_wrapper} >
                    <Text style={styles.card_heading} >Upload TIN Certificate (optional)</Text>

                    <View style={{
                        width: "100%",
                        borderWidth: 0.5,
                        borderColor: "#808080",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        borderRadius: 7,
                        paddingVertical: scaleVerticalPadding(7)
                    }} >
                        <ImageIcon color={"#10182A"} />
                        <Text style={{
                            color: "#10182A",
                            fontSize: scaleFont(13),
                            fontFamily: "Sora_400Regular"
                        }} >Upload as PDF or image</Text>
                    </View>

                </Pressable>


            </ScrollView>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D3D8E7',
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%"
    },

    header: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(10)
    },


    heading: {
        color: "#000000",
        fontFamily: "PlusJakartaSans_500Medium",
        fontSize: scaleFont(21),
        flex: 1,
        textAlign: "center"
    },

    button_wrapper: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "4%",
    },

    button: {
        width: "46%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleVerticalPadding(14),
        paddingHorizontal: scaleHorizontalPadding(23),
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "#253E86",
        gap: 8,
        flexWrap: "nowrap",
        textAlign: "center",
        height: "auto"
    },

    button_text: {
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(13),
        textAlign: "center"
    },


    scrollView_style: {
        flexGrow: 1,
        alignItems: "stretch",
        gap: 16,
        paddingBottom: scaleVerticalPadding(20),
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(2),
        backgroundColor: "#D3D8E7"
    },

    card_wrapper: {
        width: "100%",
        backgroundColor: "#ffffff",
        paddingHorizontal: scaleHorizontalPadding(14),
        paddingVertical: scaleVerticalPadding(10),
        borderRadius: 10,
        gap: 10
    },

    card_heading: {
        color: "#000000",
        fontFamily: "Sora_600SemiBold",
        fontSize: scaleFont(12)
    }


})