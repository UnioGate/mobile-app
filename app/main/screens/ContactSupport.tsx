import ChatIcon from "@/components/icons/ChatIcon";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Mail, Phone } from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import { MainStackParamList } from "../type";



type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;


export default function ContactSupport() {
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
                    Contact Support
                </Text>


                <Pressable>
                </Pressable>

            </View>





            {/* main content  */}
            <ScrollView
                style={{ flex: 1, width: "100%" }}
                contentContainerStyle={styles.scrollView_style}
                showsVerticalScrollIndicator={false} >


                {/* quick options  */}
                <View style={{
                    width: "100%",
                    alignItems: "center",
                    gap: 10
                }} >

                    {/* live chat row */}
                    <Pressable style={styles.row} >

                        <View style={{
                            gap: 8,
                            flexDirection: "row",
                            alignItems: "flex-start"
                        }} >
                            <ChatIcon />

                            <View style={{
                                margin: 0,
                                padding: 0,
                                gap: 6
                            }} >
                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }} >Live Chat</Text>

                                <Text style={{
                                    color: "#10182AB2",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }}>Average response: 2 mins</Text>
                            </View>
                        </View>


                        <Ionicons
                            name="chevron-forward"
                            color={"#4B4848"}
                            size={20}
                        />
                    </Pressable>


                    {/* Email us row  */}
                    <Pressable style={styles.row} >

                        <View style={{
                            gap: 8,
                            flexDirection: "row",
                            alignItems: "flex-start"
                        }} >
                            <Mail color={"#1E1E1E"} size={16} />

                            <View style={{
                                margin: 0,
                                padding: 0,
                                gap: 6
                            }} >
                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }} >Email Us</Text>

                                <Text style={{
                                    color: "#10182AB2",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }}>support@uniogate.ng</Text>
                            </View>
                        </View>


                        <Ionicons
                            name="chevron-forward"
                            color={"#4B4848"}
                            size={20}
                        />
                    </Pressable>



                    {/* call us row  */}
                    <Pressable style={styles.row} >

                        <View style={{
                            gap: 8,
                            flexDirection: "row",
                            alignItems: "flex-start"
                        }} >
                            <Phone color={"#1E1E1E"} size={16} />

                            <View style={{
                                margin: 0,
                                padding: 0,
                                gap: 6
                            }} >
                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }} >Call Us</Text>

                                <Text style={{
                                    color: "#10182AB2",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }}>+234 123 456 7890</Text>
                            </View>
                        </View>


                        <Ionicons
                            name="chevron-forward"
                            color={"#4B4848"}
                            size={20}
                        />
                    </Pressable>

                </View>



                {/* Submit support ticket section  */}
                <View style={{
                    width: "100%",
                    gap: 10
                }}  >

                    <Text style={styles.section_title} >Submit a Support Ticket</Text>

                    <View style={{
                        backgroundColor: "#FFFFFF",
                        width: "100%",
                        borderRadius: 10,
                        padding: 10,
                        gap: 15
                    }} >


                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row"
                        }} >
                            <Text style={styles.support_ticket_text} >What do you need help with?</Text>

                            <Ionicons
                                name="chevron-forward"
                                color={"#4B4848"}
                                size={20}
                            />

                        </View>



                        <View style={{
                            borderWidth: 0.5,
                            borderColor: "#808080",
                            borderRadius: 7,
                        }} >

                            <Pressable style={{
                                paddingVertical: scaleVerticalPadding(10),
                                paddingHorizontal: scaleHorizontalPadding(10)
                            }}>
                                <Text style={styles.support_ticket_text} >Payments</Text>
                            </Pressable>

                            <Divider style={{
                                backgroundColor: "#808080"
                            }} />


                            <Pressable style={{
                                paddingVertical: scaleVerticalPadding(10),
                                paddingHorizontal: scaleHorizontalPadding(10)
                            }}>
                                <Text style={styles.support_ticket_text} >Withdrawals</Text>
                            </Pressable>


                            <Divider style={{
                                backgroundColor: "#808080"
                            }} />


                            <Pressable style={{
                                paddingVertical: scaleVerticalPadding(10),
                                paddingHorizontal: scaleHorizontalPadding(10)
                            }}>
                                <Text style={styles.support_ticket_text} >Account Issues</Text>
                            </Pressable>


                            <Divider style={{
                                backgroundColor: "#808080"
                            }} />


                            <Pressable style={{
                                paddingVertical: scaleVerticalPadding(10),
                                paddingHorizontal: scaleHorizontalPadding(10)
                            }}>
                                <Text style={styles.support_ticket_text} >Technical Problems</Text>
                            </Pressable>


                            <Divider style={{
                                backgroundColor: "#808080"
                            }} />


                            <Pressable style={{
                                paddingVertical: scaleVerticalPadding(10),
                                paddingHorizontal: scaleHorizontalPadding(10)
                            }}>
                                <Text style={styles.support_ticket_text} >Others</Text>
                            </Pressable>

                        </View>



                        <Pressable style={{
                            backgroundColor: "#F4EFEF",
                            borderWidth: 0.5,
                            borderColor: "#808080",
                            width: "auto",
                            marginLeft: "auto",
                            paddingVertical: scaleVerticalPadding(8),
                            paddingHorizontal: scaleHorizontalPadding(8),
                            borderRadius: 7,
                            gap: 12,
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row"
                        }} >

                            <Ionicons
                                name="image-sharp"
                                color={"#10182A"}
                                size={16}
                            />

                            <Text style={styles.support_ticket_text}>Attach Screenshot</Text>

                            <Text style={{
                                color: "#10182AB2",
                                fontSize: scaleFont(12),
                                fontFamily: "Sora_400Regular"
                            }} >(optional)</Text>
                        </Pressable>

                        <TouchableOpacity style={{
                            backgroundColor: "#253E86",
                            borderRadius: 10,
                            padding: 12,
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center"
                        }}

                            activeOpacity={0.7}
                        >
                            <Text style={{
                                color: "#ffffff",
                                fontFamily: "Sora_400Regular",
                                fontSize: scaleFont(15)
                            }}>Submit Ticket</Text>
                        </TouchableOpacity>

                    </View>

                </View>



                {/* Recent Tickets  */}
                <View style={{
                    width: "100%",
                    gap: 10
                }}>
                    <Text style={styles.section_title} >Your Recent Tickets</Text>


                    <View style={{
                        width: "100%",
                        gap: 10
                    }} >

                        {/* row  */}
                        <View style={styles.row} >
                            <View style={{
                                gap: 10
                            }} >
                                <Text style={[styles.support_ticket_text, {
                                    fontSize: scaleFont(16)
                                }]}>Ticket ID

                                    <Text style={{
                                        color: "#253E86",
                                        fontSize: scaleFont(13)
                                    }} > #12345</Text></Text>


                                <Text style={styles.support_ticket_text} >Subject</Text>


                                <Text style={{
                                    color: "#10182AB2",
                                    fontSize: scaleFont(12),
                                    fontFamily: "Sora_400Regular"
                                }} >Last update</Text>
                            </View>


                            <Text style={{
                                backgroundColor: "#199C1E33",
                                fontSize: scaleFont(12),
                                fontFamily: "Sora_400Regular",
                                paddingVertical: scaleVerticalPadding(4),
                                paddingHorizontal: scaleHorizontalPadding(8),
                                borderRadius: 7,
                                textAlign: "center",
                                color: "#0B7C3E"
                            }} >
                                Open
                            </Text>
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
        fontSize: scaleFont(10),
        textAlign: "center"
    },


    scrollView_style: {
        flexGrow: 1,
        alignItems: "stretch",
        gap: 16,
        paddingBottom: scaleVerticalPadding(20),
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(7),
        backgroundColor: "#D3D8E7"
    },

    row: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingVertical: scaleVerticalPadding(9),
        paddingHorizontal: scaleHorizontalPadding(16),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },


    section_title: {
        color: "#10182AB2",
        fontSize: scaleFont(12),
        fontFamily: "Sora_400Regular"
    },

    support_ticket_text: {
        color: "#000000",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular"
    }


})