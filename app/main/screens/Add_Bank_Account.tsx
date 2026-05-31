import CustomCheckbox from "@/components/ui/CustomCheckbox";
import CustomDropdown from "@/components/ui/CustomDropdown";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainStackParamList } from "../type";

type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;


export default function AddBankAccount() {
    const navigation = useNavigation<OverviewNavigationProp>()



    return (
        <SafeAreaView style={styles.container} >


            {/* Header */}
            <View style={styles.header}>

                <Pressable
                    aria-label="back-button"
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="chevron-back"
                        size={20}
                        color="#10182A"
                    />
                </Pressable>


                <Text style={styles.heading}>
                    Add Bank Account
                </Text>


                <Pressable>
                </Pressable>

            </View>





            {/* main content  */}
            <ScrollView
                style={{ flex: 1, width: "100%" }}
                contentContainerStyle={styles.scrollView_style}
                showsVerticalScrollIndicator={false} >




                {/* the form  */}
                <View style={{
                    backgroundColor: "#ffffff",
                    paddingVertical: scaleVerticalPadding(15),
                    paddingHorizontal: scaleHorizontalPadding(14),
                    gap: 10,
                    borderRadius: 10
                }} >


                    {/* Select bank  */}

                    <View style={{
                        width: "100%",
                        gap: 10
                    }} >

                        <Text
                            style={{
                                color: "#000000",
                                fontSize: scaleFont(12),
                                fontFamily: "Sora_600SemiBold"
                            }}
                        >Select Bank</Text>

                        <CustomDropdown />

                    </View>


                    {/* Account Number */}
                    <View style={{
                        width: "100%",
                        gap: 10
                    }} >

                        <Text
                            style={{
                                color: "#000000",
                                fontSize: scaleFont(12),
                                fontFamily: "Sora_600SemiBold"
                            }}
                        >Account Number</Text>

                        <TextInput
                            placeholder="0123456789"
                            keyboardType="number-pad"
                            style={{
                                width: "100%",
                                borderWidth: 0.5,
                                borderColor: "#808080",
                                borderRadius: 7,
                                paddingVertical: scaleVerticalPadding(12),
                                paddingHorizontal: scaleHorizontalPadding(6),
                                fontSize: scaleFont(12),
                                fontFamily: "Sora_400Regular",
                                color: "#000000"
                            }}
                        />

                    </View>




                    {/* Account name  */}
                    <View style={{
                        width: "100%",
                        gap: 10
                    }} >

                        <Text
                            style={{
                                color: "#000000",
                                fontSize: scaleFont(12),
                                fontFamily: "Sora_600SemiBold"
                            }}
                        >Account Name</Text>

                        <TextInput
                            placeholder="Uniogate"
                            keyboardType="default"
                            style={{
                                width: "100%",
                                borderWidth: 0.5,
                                borderColor: "#808080",
                                borderRadius: 7,
                                paddingVertical: scaleVerticalPadding(12),
                                paddingHorizontal: scaleHorizontalPadding(6),
                                fontSize: scaleFont(12),
                                fontFamily: "Sora_400Regular",
                                color: "#000000"
                            }}
                        />

                    </View>




                </View>


                <View>
                    <CustomCheckbox
                        label={`I confirm this information is accurate. `}
                        linkText=""
                        path=""
                        subtext="For security, only business accounts in your registered name can be added"
                    />
                </View>


                {/* Button wrapper */}
                <View style={styles.button_wrapper} >

                    <TouchableOpacity style={[styles.button]} >
                        <Text style={[styles.button_text, {
                            color: "#253E86"
                        }]} >Cancel</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => navigation.navigate("add_bank_account")}
                        style={[styles.button, {
                            backgroundColor: "#253E86"
                        }]} >
                        <Text style={[styles.button_text, {
                            color: "#ffffff"
                        }]} >Add Account</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </SafeAreaView>
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
        borderBottomWidth: 0.5,
        borderBottomColor: "#B3B3B3",
        paddingHorizontal: scaleHorizontalPadding(15),
        paddingVertical: scaleVerticalPadding(9)
    },


    heading: {
        color: "#000000",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(16),
        flex: 1,
        textAlign: "center"
    },

    button_wrapper: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5,
        marginTop: 20
    },

    button: {
        width: "49%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleVerticalPadding(12),
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
        fontSize: scaleFont(10),
        textAlign: "center"
    },


    scrollView_style: {
        flexGrow: 1,
        alignItems: "stretch",
        gap: 12,
        paddingBottom: scaleVerticalPadding(20),
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(15),
        backgroundColor: "#D3D8E7"
    },



})