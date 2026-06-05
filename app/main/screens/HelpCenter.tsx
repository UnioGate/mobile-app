import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Divider } from "react-native-paper";
import { MainStackParamList } from "../type";



type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;
export default function HelpCenter() {
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
                        size={20}
                        color="#10182A"
                    />
                </Pressable>


                <Text style={styles.heading}>
                    Help Center
                </Text>


                <Pressable>
                </Pressable>

            </View>





            {/* main content  */}
            <ScrollView
                style={{ flex: 1, width: "100%" }}
                contentContainerStyle={styles.scrollView_style}
                showsVerticalScrollIndicator={false} >



                {/* Search bar  */}
                <View style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 10,
                    width: "100%",
                    paddingVertical: scaleVerticalPadding(15),
                    paddingHorizontal: scaleHorizontalPadding(14),
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10
                }} >

                    <Ionicons
                        name="search"
                        size={13}
                        color={"#10182A99"}
                    />

                    <TextInput style={{
                        fontSize: scaleFont(14),
                        padding: 1,
                        width: "100%",
                        fontFamily: "Sora_400Regular",
                        color: "#000000"
                    }}
                        keyboardType="default"
                    />

                </View>


                {/* Popular Topics section */}


                <View style={{
                    width: "100%",
                    gap: 10
                }} >
                    <Text style={styles.section_title} >Popular Topics</Text>

                    <View style={{
                        width: "100%",
                        alignItems: "center",
                        gap: 10
                    }}>

                        {/* Getting started row */}
                        <Pressable style={styles.row} >

                            <View style={{
                                gap: 8,
                                flexDirection: "row",
                                alignItems: "flex-start"
                            }} >
                                <Ionicons name="chatbox" />

                                <View style={{
                                    margin: 0,
                                    padding: 0,
                                    gap: 6
                                }} >
                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }} >Getting Started</Text>

                                    <Text style={{
                                        color: "#10182AB2",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }}>4 articles</Text>
                                </View>
                            </View>


                            <Ionicons
                                name="chevron-forward"
                                color={"#4B4848"}
                                size={20}
                            />
                        </Pressable>




                        {/* Processing payments row  */}
                        <Pressable style={styles.row} >

                            <View style={{
                                gap: 8,
                                flexDirection: "row",
                                alignItems: "flex-start"
                            }} >
                                <Ionicons name="chatbox" />

                                <View style={{
                                    margin: 0,
                                    padding: 0,
                                    gap: 6
                                }} >
                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }} >Processing Payments</Text>

                                    <Text style={{
                                        color: "#10182AB2",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }}>5 articles</Text>
                                </View>
                            </View>


                            <Ionicons
                                name="chevron-forward"
                                color={"#4B4848"}
                                size={20}
                            />
                        </Pressable>




                        {/* Withdrawals & settlements */}
                        <Pressable style={styles.row} >

                            <View style={{
                                gap: 8,
                                flexDirection: "row",
                                alignItems: "flex-start"
                            }} >
                                <Ionicons name="chatbox" />

                                <View style={{
                                    margin: 0,
                                    padding: 0,
                                    gap: 6
                                }} >
                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }} >Withdrawals & Settlements</Text>

                                    <Text style={{
                                        color: "#10182AB2",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }}>3 articles</Text>
                                </View>
                            </View>


                            <Ionicons
                                name="chevron-forward"
                                color={"#4B4848"}
                                size={20}
                            />
                        </Pressable>



                        {/* Verification  */}
                        <Pressable style={styles.row} >

                            <View style={{
                                gap: 8,
                                flexDirection: "row",
                                alignItems: "flex-start"
                            }} >
                                <Ionicons name="chatbox" />

                                <View style={{
                                    margin: 0,
                                    padding: 0,
                                    gap: 6
                                }} >
                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }} >Verification</Text>

                                    <Text style={{
                                        color: "#10182AB2",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }}>6 articles</Text>
                                </View>
                            </View>


                            <Ionicons
                                name="chevron-forward"
                                color={"#4B4848"}
                                size={20}
                            />
                        </Pressable>



                        {/* Troubleshooting  */}
                        <Pressable style={styles.row} >

                            <View style={{
                                gap: 8,
                                flexDirection: "row",
                                alignItems: "flex-start"
                            }} >
                                <Ionicons name="chatbox" />

                                <View style={{
                                    margin: 0,
                                    padding: 0,
                                    gap: 6
                                }} >
                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }} >Troubleshooting</Text>

                                    <Text style={{
                                        color: "#10182AB2",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }}>6 articles</Text>
                                </View>
                            </View>


                            <Ionicons
                                name="chevron-forward"
                                color={"#4B4848"}
                                size={20}
                            />
                        </Pressable>




                        {/* Fees & Limits  */}
                        <Pressable style={styles.row} >

                            <View style={{
                                gap: 8,
                                flexDirection: "row",
                                alignItems: "flex-start"
                            }} >
                                <Ionicons name="chatbox" />

                                <View style={{
                                    margin: 0,
                                    padding: 0,
                                    gap: 6
                                }} >
                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }} >Fees & Limits</Text>

                                    <Text style={{
                                        color: "#10182AB2",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }}>6 articles</Text>
                                </View>
                            </View>


                            <Ionicons
                                name="chevron-forward"
                                color={"#4B4848"}
                                size={20}
                            />
                        </Pressable>


                    </View>

                </View>




                <View style={{
                    width: "100%",
                    gap: 10
                }} >
                    <Text style={styles.section_title} >FAQS</Text>

                    <View style={{
                        backgroundColor: "#ffffff",
                        width: "100%",
                        paddingVertical: scaleVerticalPadding(8),
                        paddingHorizontal: scaleHorizontalPadding(15),
                        borderRadius: 10,
                        gap: 8
                    }} >

                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row"
                        }} >


                            <View style={{
                                width: "auto",
                                alignItems: "center",
                                gap: 8,
                                flexDirection: "row"
                            }} >

                                <Ionicons name="add" />

                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }}>How long do settlement take?</Text>
                            </View>


                            <Ionicons
                                name="chevron-forward"
                                color={"#4B4848"}
                                size={20}
                            />
                        </View>


                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />



                        <Text style={{
                            color: "#10182AB2",
                            fontSize: scaleFont(12),
                            fontFamily: "Sora_400Regular"
                        }} >Settlements typically take 1 - 2 business days. Monitor the status in the settlement tab for updates.</Text>


                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row"
                        }} >

                            <Text style={{
                                color: "#10182AB2",
                                fontSize: scaleFont(12),
                                fontFamily: "Sora_400Regular"
                            }}>
                                Helpful?
                            </Text>


                            <View style={{
                                width: "auto",
                                alignItems: "center",
                                gap: 30,
                                flexDirection: "row"
                            }} >


                                <Pressable>
                                    <Ionicons name="thumbs-down" />
                                </Pressable>


                                <Pressable>
                                    <Ionicons name="thumbs-down" />
                                </Pressable>


                            </View>
                        </View>

                    </View>
                </View>




                <View style={{
                    width: "100%",
                    gap: 10
                }} >
                    <Text style={styles.section_title} >Still need help?</Text>


                    <View style={{
                        backgroundColor: "#ffffff",
                        width: "100%",
                        paddingVertical: scaleVerticalPadding(8),
                        paddingHorizontal: scaleHorizontalPadding(15),
                        borderRadius: 10,
                        gap: 8
                    }} >



                        {/* Contact support  */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row"
                        }} >


                            <View style={{
                                width: "auto",
                                alignItems: "center",
                                gap: 8,
                                flexDirection: "row"
                            }}>

                                <Ionicons name="add" />

                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }}>Contact Support</Text>

                            </View>

                        </View>

                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />

                        {/* Live chat */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row"
                        }} >


                            <View style={{
                                width: "auto",
                                alignItems: "center",
                                gap: 8,
                                flexDirection: "row"
                            }}>

                                <Ionicons name="add" />

                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }}>Live Chat</Text>

                            </View>

                        </View>

                    </View>

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
        paddingVertical: scaleVerticalPadding(9)
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
        fontSize: scaleFont(10),
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

    section_title: {
        color: "#10182AB2",
        fontSize: scaleFont(12),
        fontFamily: "Sora_400Regular"
    },

    row: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingVertical: scaleVerticalPadding(6),
        paddingHorizontal: scaleHorizontalPadding(16),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

})