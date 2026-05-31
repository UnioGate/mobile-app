import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainStackParamList } from "../type";



type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;



export default function NotificationSettings() {
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
                    Notifications
                </Text>


                <Pressable>
                </Pressable>

            </View>





            {/* main content  */}
            <ScrollView
                style={{ flex: 1, width: "100%" }}
                contentContainerStyle={styles.scrollView_style}
                showsVerticalScrollIndicator={false} >


                {/* Enable notifications  */}
                <View style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#ffffff",
                    flexDirection: "row",
                    paddingVertical: scaleVerticalPadding(5),
                    paddingHorizontal: scaleHorizontalPadding(15),
                    borderRadius: 5
                }} >
                    <Text style={{
                        color: "#000000",
                        fontSize: scaleFont(14),
                        fontFamily: "Sora_400Regular,"
                    }} >Enable Notifications</Text>


                    <Switch />
                </View>


                {/* payments section  */}
                <View style={{
                    width: "100%",
                    gap: 10
                }} >
                    <Text style={{
                        color: "#10182AB2",
                        fontSize: scaleFont(12),
                        fontFamily: "Sora_400Regular"
                    }} >Payments</Text>

                    <View style={{
                        width: "100%",
                        backgroundColor: "#ffffff",
                        borderRadius: 10,
                        paddingHorizontal: scaleHorizontalPadding(15),
                    }} >

                        {/* payment received role */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Payment received</Text>


                            <Switch />
                        </View>

                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        {/* Payment failed row */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Payment failed</Text>


                            <Switch />
                        </View>


                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />




                        {/* Large transactions row */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >


                            <View style={{
                                width: "auto",
                                alignItems: "center",
                                flexDirection: "row",
                                gap: 6
                            }} >


                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(12),
                                    fontFamily: "Sora_400Regular"
                                }} >Large transactions  ({'>'} ₦50k)

                                </Text>


                                <View style={{
                                    backgroundColor: "#199C1E33",
                                    paddingHorizontal: scaleHorizontalPadding(8),
                                    paddingVertical: scaleVerticalPadding(4),
                                    borderRadius: 7
                                }} >
                                    <Text
                                        style={{
                                            color: "#0B7C3E",
                                            fontSize: scaleFont(10),
                                            fontFamily: "Sora_400Regular"
                                        }}
                                    >Admin only</Text>

                                </View>
                            </View>


                            <Switch />
                        </View>




                    </View>
                </View>



                {/* Settlement & withdrawals section  */}
                <View style={{
                    width: "100%",
                    gap: 10
                }} >
                    <Text style={{
                        color: "#10182AB2",
                        fontSize: scaleFont(12),
                        fontFamily: "Sora_400Regular"
                    }} >Settlement & Withdrawals (Admin only) </Text>

                    <View style={{
                        width: "100%",
                        backgroundColor: "#ffffff",
                        borderRadius: 10,
                        paddingHorizontal: scaleHorizontalPadding(15),
                    }} >

                        {/* Settlement completed row */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Settlement completed</Text>


                            <Switch />
                        </View>

                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        {/* Withdrawal completed row */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Withdrawal completed</Text>


                            <Switch />
                        </View>


                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />




                        {/* Withdrawal failed row */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >


                            <View style={{
                                width: "auto",
                                alignItems: "center",
                                flexDirection: "row",
                                gap: 6
                            }} >


                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }} >Withdrawal failed

                                </Text>


                            </View>

                            <Switch />
                        </View>

                    </View>
                </View>



                {/* Accounts */}
                <View style={{
                    width: "100%",
                    gap: 10
                }} >
                    <Text style={{
                        color: "#10182AB2",
                        fontSize: scaleFont(12),
                        fontFamily: "Sora_400Regular"
                    }} >Accounts </Text>

                    <View style={{
                        width: "100%",
                        backgroundColor: "#ffffff",
                        borderRadius: 10,
                        paddingHorizontal: scaleHorizontalPadding(15),
                    }} >

                        {/* Settlement completed row */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Login from new device</Text>


                            <Switch />
                        </View>

                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        {/* Withdrawal completed row */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Team member added/ removed</Text>


                            <Switch />
                        </View>


                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />




                        {/* Withdrawal failed row */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >


                            <View style={{
                                width: "auto",
                                alignItems: "center",
                                flexDirection: "row",
                                gap: 6
                            }} >


                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }} >Verification status updates

                                </Text>


                            </View>

                            <Switch />
                        </View>

                    </View>
                </View>



                {/* marketing and updates row  */}
                <View style={{
                    width: "100%",
                    gap: 10
                }} >
                    <Text style={{
                        color: "#10182AB2",
                        fontSize: scaleFont(12),
                        fontFamily: "Sora_400Regular"
                    }} >Marketing & Updates </Text>

                    <View style={{
                        width: "100%",
                        backgroundColor: "#ffffff",
                        borderRadius: 10,
                        paddingHorizontal: scaleHorizontalPadding(15),
                    }} >

                        {/* Settlement completed row */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Product updates</Text>


                            <Switch />
                        </View>

                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        {/* Withdrawal completed row */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Tips and best practices</Text>


                            <Switch />
                        </View>


                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />




                        {/* Withdrawal failed row */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >


                            <View style={{
                                width: "auto",
                                alignItems: "center",
                                flexDirection: "row",
                                gap: 6
                            }} >


                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }} >Promotional Offers

                                </Text>


                            </View>

                            <Switch />
                        </View>

                    </View>
                </View>




                {/* SMS Options */}
                <View style={{
                    width: "100%",
                    gap: 10
                }} >
                    <Text style={{
                        color: "#10182AB2",
                        fontSize: scaleFont(12),
                        fontFamily: "Sora_400Regular"
                    }} >SMS Options </Text>

                    <View style={{
                        width: "100%",
                        backgroundColor: "#ffffff",
                        borderRadius: 10,
                        paddingHorizontal: scaleHorizontalPadding(15),
                    }} >

                        {/* Settlement completed row */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Payment confirmations</Text>


                            <Switch />
                        </View>

                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        {/* Withdrawal completed row */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Withdrawals</Text>


                            <Switch />
                        </View>


                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />




                        {/* Withdrawal failed row */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >


                            <View style={{
                                width: "auto",
                                alignItems: "center",
                                flexDirection: "row",
                                gap: 6
                            }} >


                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }} >Security alerts

                                </Text>


                            </View>

                            <Switch />
                        </View>

                    </View>
                </View>




                {/* Email Notifications */}
                <View style={{
                    width: "100%",
                    gap: 10
                }} >
                    <Text style={{
                        color: "#10182AB2",
                        fontSize: scaleFont(12),
                        fontFamily: "Sora_400Regular"
                    }} >Email Notifications </Text>

                    <View style={{
                        width: "100%",
                        backgroundColor: "#ffffff",
                        borderRadius: 10,
                        paddingHorizontal: scaleHorizontalPadding(15),
                    }} >

                        {/* Settlement completed row */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Product updates</Text>


                            <Switch />
                        </View>

                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        {/* Withdrawal completed row */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Tips and best practices</Text>


                            <Switch />
                        </View>


                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />




                        {/* Withdrawal failed row */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >


                            <View style={{
                                width: "auto",
                                alignItems: "center",
                                flexDirection: "row",
                                gap: 6
                            }} >


                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }} >Promotional Offers

                                </Text>


                            </View>

                            <Switch />
                        </View>

                    </View>
                </View>



                {/* Button wrapper */}
                <View style={styles.button_wrapper} >

                    <TouchableOpacity style={[styles.button]} >
                        <Text style={[styles.button_text, {
                            color: "#253E86"
                        }]} >Back</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => navigation.navigate("add_bank_account")}
                        style={[styles.button, {
                            backgroundColor: "#253E86"
                        }]} >
                        <Text style={[styles.button_text, {
                            color: "#ffffff"
                        }]} >Save Changes</Text>
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