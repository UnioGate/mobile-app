import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MainStackParamList } from "../type";



type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;
export default function Verification_andKYC() {
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
                    Verification & KYC
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
                        gap: 12
                    }} >

                        <View style={{
                            backgroundColor: "#253E8633",
                            width: "100%",
                            borderRadius: 10,
                            padding: 10
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_600SemiBold"
                            }} >
                                Tier 2: Personal Verified
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
                                >Daily transaction limit: ₦20M   </Text>
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
                                >Daily withdrawal limit: ₦500K  </Text>
                            </View>

                        </View>
                    </View>


                    <TouchableOpacity
                        style={{
                            backgroundColor: "#2DBAA4CC",
                            borderRadius: 10,
                            padding: 10,
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center"
                        }}

                        activeOpacity={0.7}
                    >
                        <Text style={{
                            color: "#000000",
                            fontFamily: "Sora_300Light",
                            fontSize: scaleFont(12)
                        }}>Upgrade to Tier 3 for higher limits</Text>
                    </TouchableOpacity>
                </View>



                {/* Verification steps  */}
                <View style={{
                    gap: 10,
                    width: "100%"
                }} >


                    <Text style={{
                        color: "#10182AB2",
                        fontFamily: "Sora_400Regular",
                        fontSize: scaleFont(12)
                    }} >Verification Steps</Text>


                    <View style={styles.step_wrapper} >


                        {/* step 1  */}
                        <View style={styles.step_card} >
                            <View style={styles.content} >

                                <View style={{
                                    width: "100%",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }} >

                                    <Text style={{
                                        color: "#000000",
                                        fontFamily: "Sora_600SemiBold",
                                        fontSize: scaleFont(14)
                                    }}>Step 1: Personal Verification</Text>

                                    <Text style={{
                                        color: "#0B7C3E",
                                        fontFamily: "Sora_400Regular",
                                        fontSize: scaleFont(13)
                                    }}>Verified</Text>
                                </View>

                                <View style={{
                                    gap: 9
                                }}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            marginBottom: 8,
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <Text style={{ marginRight: 8 }}>•</Text>
                                        <Text style={{
                                            flex: 1,
                                            color: "#000000",
                                            fontFamily: "Sora_400Regular",
                                            fontSize: scaleFont(14)
                                        }}>Identity verified with NIN</Text>
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            marginBottom: 8,
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <Text style={{ marginRight: 8 }}>•</Text>
                                        <Text style={{
                                            flex: 1,
                                            color: "#000000",
                                            fontFamily: "Sora_400Regular",
                                            fontSize: scaleFont(14)
                                        }}>Verified on March 1, 2026</Text>
                                    </View>
                                </View>

                            </View>

                            <TouchableOpacity style={styles.step_card_btn}>
                                <Text style={styles.step_card_btn_text} >View Documents</Text>
                            </TouchableOpacity>
                        </View>



                        {/* step 2  */}
                        <View style={styles.step_card} >
                            <View style={styles.content} >

                                <View style={{
                                    width: "100%",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }} >

                                    <Text style={{
                                        color: "#000000",
                                        fontFamily: "Sora_600SemiBold",
                                        fontSize: scaleFont(14)
                                    }}>Step 2: Business Verification</Text>

                                    <Text style={{
                                        color: "#FF070B",
                                        fontFamily: "Sora_400Regular",
                                        fontSize: scaleFont(13)
                                    }}>Not Started</Text>
                                </View>

                                <View style={{
                                    gap: 9
                                }}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            marginBottom: 8,
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <Text style={{ marginRight: 8 }}>•</Text>
                                        <Text style={{
                                            flex: 1,
                                            color: "#000000",
                                            fontFamily: "Sora_400Regular",
                                            fontSize: scaleFont(14)
                                        }}>CAC Certificate</Text>
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            marginBottom: 8,
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <Text style={{ marginRight: 8 }}>•</Text>
                                        <Text style={{
                                            flex: 1,
                                            color: "#000000",
                                            fontFamily: "Sora_400Regular",
                                            fontSize: scaleFont(14)
                                        }}>Proof of Address</Text>
                                    </View>


                                    <View
                                        style={{
                                            flexDirection: "row",
                                            marginBottom: 8,
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <Text style={{ marginRight: 8 }}>•</Text>
                                        <Text style={{
                                            flex: 1,
                                            color: "#000000",
                                            fontFamily: "Sora_400Regular",
                                            fontSize: scaleFont(14)
                                        }}>Tax Identification Number (TIN)</Text>
                                    </View>
                                </View>

                            </View>

                            <TouchableOpacity style={styles.step_card_btn}>
                                <Text style={styles.step_card_btn_text} >Start Business Verification</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>




                {/* Documents Uploaded  */}
                <View style={{
                    gap: 10,
                    width: "100%"
                }} >


                    <Text style={{
                        color: "#10182AB2",
                        fontFamily: "Sora_400Regular",
                        fontSize: scaleFont(12)
                    }} >Documents Uploaded</Text>


                    <View style={styles.step_wrapper} >
                        {/* step 1  */}
                        <View style={styles.step_card} >
                            <View style={styles.content} >

                                <View style={{
                                    width: "100%",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }} >

                                    <Text style={{
                                        color: "#000000",
                                        fontFamily: "Sora_600SemiBold",
                                        fontSize: scaleFont(14)
                                    }}>NIN Card</Text>

                                    <Text style={{
                                        color: "#0B7C3E",
                                        fontFamily: "Sora_400Regular",
                                        fontSize: scaleFont(13)
                                    }}>Verified</Text>
                                </View>

                                <View style={{
                                    gap: 9
                                }}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            marginBottom: 8,
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <Text style={{ marginRight: 8 }}>•</Text>
                                        <Text style={{
                                            flex: 1,
                                            color: "#000000",
                                            fontFamily: "Sora_400Regular",
                                            fontSize: scaleFont(14)
                                        }}>Uploaded: March 1, 2026</Text>
                                    </View>

                                </View>

                            </View>

                            <TouchableOpacity style={styles.step_card_btn}>
                                <Text style={styles.step_card_btn_text} >View Documents</Text>
                            </TouchableOpacity>
                        </View>


                    </View>

                </View>



                {/* Verification Timeline  */}
                <View style={{
                    gap: 10,
                    width: "100%"
                }} >


                    <Text style={{
                        color: "#10182AB2",
                        fontFamily: "Sora_400Regular",
                        fontSize: scaleFont(12)
                    }} >Verification Timeline</Text>


                    <View style={styles.step_wrapper} >
                        {/* step 1  */}
                        <View style={styles.step_card} >
                            <View style={styles.content} >

                                <View style={{
                                    width: "100%",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }} >

                                    <Text style={{
                                        color: "#000000",
                                        fontFamily: "Sora_600SemiBold",
                                        fontSize: scaleFont(14)
                                    }}>Verification Timeline</Text>
                                </View>

                                <View style={{
                                    gap: 9
                                }}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            marginBottom: 8,
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <Text style={{ marginRight: 8 }}>•</Text>
                                        <Text style={{
                                            flex: 1,
                                            color: "#000000",
                                            fontFamily: "Sora_400Regular",
                                            fontSize: scaleFont(14)
                                        }}>Expected completion: 1-3 business days</Text>
                                    </View>

                                </View>

                            </View>
                        </View>


                    </View>

                </View>



                {/* Button wrapper */}
                <View style={styles.button_wrapper} >

                    <Pressable
                        onPress={() => navigation.goBack()}
                        style={[styles.button]} >
                        <Text style={[styles.button_text, {
                            color: "#253E86"
                        }]} >Cancel</Text>
                    </Pressable>


                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate("invitation_sent")}
                        style={[styles.button, {
                            backgroundColor: "#253E86"
                        }]} >
                        <Text style={[styles.button_text, {
                            color: "#ffffff"
                        }]} >Send Invite</Text>
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
        marginTop: 10
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
        paddingVertical: scaleVerticalPadding(15),
        backgroundColor: "#D3D8E7"
    },

    step_wrapper: {
        width: "100%",
        gap: 12
    },


    step_card: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingVertical: scaleVerticalPadding(10),
        paddingHorizontal: scaleHorizontalPadding(14),
        gap: 2
    },

    content: {
        gap: 12,
        width: "100%"
    },

    step_card_btn: {
        marginLeft: "auto",
        backgroundColor: "#253E86",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: 5,
        paddingVertical: scaleVerticalPadding(5),
        paddingHorizontal: scaleHorizontalPadding(7)

    },

    step_card_btn_text: {
        color: "#ffffff",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(12)
    }
})