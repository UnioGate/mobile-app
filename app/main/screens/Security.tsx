import BiometricIcon from "@/components/icons/BiometricsIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import WithdrawalIcon from "@/components/icons/WithdrawalsIcon";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import { MainStackParamList } from "../type";



type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;

const activityLogs = [
    "Logged in from new device",
    "Password changed",
    "Withdrawal attempted",
    "Timestamp and location",
];


export default function SecurityScreen() {
    const navigation = useNavigation<OverviewNavigationProp>()


    return (
        <View
            style={styles.container}
        >


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
                    Security
                </Text>


                <Pressable>
                </Pressable>

            </View>





            {/* main content  */}
            <ScrollView
                style={{ flex: 1, width: "100%" }}
                contentContainerStyle={styles.scrollView_style}
                showsVerticalScrollIndicator={false} >

                {/* Login method */}
                <View style={styles.section_wrapper} >
                    <Text style={styles.section_title}>Login Method</Text>


                    <View style={styles.card}>
                        <Text style={styles.card_title} >Current Phone Number</Text>

                        <View style={styles.ring} >
                            <Text style={{
                                color: "#000000",
                                fontFamily: "Sora_400Regular",
                                fontSize: scaleFont(12)
                            }} >+234 801 234 5678</Text>
                        </View>

                        <Pressable style={styles.outline_button} >
                            <Text style={styles.outline_button_text} >Change Phone Number</Text>
                        </Pressable>

                    </View>
                </View>


                {/* Biometric Login */}
                <View style={styles.section_wrapper} >
                    <Text style={styles.section_title}>Biometric Login</Text>


                    <View style={styles.card}>

                        <View style={[styles.ring, {
                            paddingVertical: scaleVerticalPadding(1)
                        }]} >


                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 8
                            }} >
                                <BiometricIcon />

                                <Text style={{
                                    color: "#000000",
                                    fontFamily: "Sora_400Regular",
                                    fontSize: scaleFont(14)
                                }} >Enable Fingerprint/Face ID</Text>
                            </View>


                            <Switch
                            />
                        </View>

                        <Text style={{
                            color: "#10182AB2",
                            fontFamily: "Sora_400Regular",
                            fontSize: scaleFont(10),
                            marginHorizontal: "auto"
                        }}>Login faster with biometrics</Text>

                    </View>
                </View>




                {/* PIN Setup (Admin only) */}
                <View style={styles.section_wrapper} >
                    <Text style={styles.section_title}>PIN Setup (Admin only)</Text>


                    <View style={styles.card}>

                        <View style={[styles.ring, {
                            paddingVertical: scaleVerticalPadding(1)
                        }]} >


                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 8
                            }} >
                                <WithdrawalIcon />

                                <Text style={{
                                    color: "#000000",
                                    fontFamily: "Sora_400Regular",
                                    fontSize: scaleFont(14)
                                }} >Require PIN for withdrawals</Text>
                            </View>


                            <Switch
                            />
                        </View>


                        <Pressable style={styles.outline_button} >
                            <Text style={styles.outline_button_text} >Set 4-digit PIN</Text>
                        </Pressable>

                    </View>
                </View>




                {/* Active Sessions */}
                <View style={styles.section_wrapper} >
                    <Text style={styles.section_title}>Active Sessions</Text>


                    <View style={styles.card}>

                        <View style={{
                            width: "100%",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            flexDirection: "row"
                        }} >

                            <View style={{
                                gap: 4,
                                flexDirection: "row",
                                alignItems: "flex-start"
                            }} >

                                <PhoneIcon />

                                <View style={{
                                    gap: 6,
                                    padding: 0,
                                    margin: 0,
                                    alignItems: "flex-start",
                                    justifyContent: "flex-start"
                                }} >
                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }} >iPhone 13 Pro</Text>


                                    <Text style={{
                                        color: "#10182A80",
                                        fontSize: scaleFont(13),
                                        fontFamily: "Sora_400Regular"
                                    }}  >Lagos, Nigeria</Text>


                                    <Text style={{
                                        color: "#10182A80",
                                        fontSize: scaleFont(10),
                                        fontFamily: "Sora_300Light"
                                    }}  >Last active: 2 minutes ago</Text>
                                </View>
                            </View>

                            <Text style={{
                                color: "#253E86",
                                fontFamily: "Sora_400Regular",
                                fontSize: scaleFont(12),
                                backgroundColor: "#253E8633",
                                borderRadius: 7,
                                paddingVertical: scaleVerticalPadding(4),
                                paddingHorizontal: scaleHorizontalPadding(8)
                            }} >This Device</Text>
                        </View>

                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        <Pressable style={styles.outline_button} >
                            <Text style={styles.outline_button_text} >Sign Out</Text>
                        </Pressable>

                    </View>
                </View>



                {/* Activity Log */}
                <View style={styles.section_wrapper}>
                    <Text style={styles.section_title}>Activity Log</Text>

                    <View style={[styles.card, {
                        gap: 8
                    }]}>
                        {activityLogs.map((item, index) => (
                            <View key={index} style={styles.logItem}>
                                <View style={styles.bullet} />
                                <Text style={styles.logText}>{item}</Text>
                            </View>
                        ))}
                    </View>
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
                        }]} >Save changes</Text>
                    </TouchableOpacity>

                </View>
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
        paddingHorizontal: scaleHorizontalPadding(15),
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
        fontSize: scaleFont(13),
        textAlign: "center"
    },


    scrollView_style: {
        flexGrow: 1,
        alignItems: "stretch",
        gap: 16,
        paddingBottom: scaleVerticalPadding(20),
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(4),
        backgroundColor: "#D3D8E7"
    },

    section_wrapper: {
        gap: 10
    },


    section_title: {
        color: "#10182AB2",
        fontSize: scaleFont(12),
        fontFamily: "Sora_400Regular"
    },


    card: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingVertical: scaleVerticalPadding(10),
        paddingHorizontal: scaleHorizontalPadding(12),
        gap: 10
    },

    card_title: {
        color: "#000000",
        fontSize: scaleFont(12),
        fontFamily: "Sora_600SemiBold"
    },

    ring: {
        borderWidth: 0.5,
        borderColor: "#808080",
        borderRadius: 7,
        paddingHorizontal: scaleHorizontalPadding(6),
        paddingVertical: scaleVerticalPadding(12),
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },


    outline_button: {
        borderColor: "#253E86",
        borderWidth: 0.5,
        marginLeft: "auto",
        paddingVertical: scaleVerticalPadding(10),
        paddingHorizontal: scaleHorizontalPadding(15),
        borderRadius: 7,
        textAlign: "center"
    },

    outline_button_text: {
        fontSize: scaleFont(12),
        fontFamily: "Sora_400Regular",
        color: "#253E86"
    },

    logItem: {
        flexDirection: "row",
        alignItems: "center",
    },

    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#000",
        marginRight: 10,
    },

    logText: {
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular",
        color: "#10182A",
    },


})