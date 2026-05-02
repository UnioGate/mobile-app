import { transactions } from "@/data/mock_tx";
import { fonts } from "@/fonts/fonts";
import { LogoKey } from "@/types/types";
import { useFonts } from "@expo-google-fonts/sora";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BanknoteArrowDown, SmartphoneNfc } from "lucide-react-native";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Progress from 'react-native-progress';
import { MainStackParamList } from "../type";

type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList, "overview">;

export default function Overview() {

    const [fontsLoaded] = useFonts(fonts);
    const navigation = useNavigation<OverviewNavigationProp>()



    // This function gives the status color
    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case "successful":
                return styles.successful;
            case "pending":
                return styles.pending;
            case "unsuccessful":
                return styles.unsuccessful;
            default:
                return {};
        }
    };



    const logos: Record<LogoKey, any> = {
        eth: require("../../../assets/logos/eth_icon.png"),
        btc: require("../../../assets/logos/logos_bitcoin.png"),
    };


    if (!fontsLoaded) return null;


    return (
        <View style={styles.container} >

            <View style={styles.header} >

                <View style={styles.greeting} >
                    <View style={styles.profilePicWrapper}  >
                        <Image source={require("../../../assets/overview/user.png")} style={{ width: 40, height: 40, marginTop: 7 }} />
                    </View>

                    <Text style={styles.hellotext} >
                        Hello, <Text style={styles.userName} >UnioGate</Text></Text>
                </View>



                <View style={styles.support} >
                    <TouchableOpacity >
                        <Ionicons name="headset-outline" size={22} color="#10182A" />
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.bellButton} >
                        <Ionicons name="notifications-sharp" size={19} color="#10182A" />

                        {/* The red dot on the bell */}
                        <View style={styles.redDot} ></View>

                    </TouchableOpacity>


                </View>
            </View>

            <ScrollView
                style={{ maxHeight: "100%" }}
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {/* The banner showing the balance and call to action buttons  */}
                <View style={styles.CTABannner} >

                    <View style={styles.brief_details} >
                        <Text style={styles.availableBalance} >Available Balance</Text>

                        <View style={styles.amount_wrapper} >
                            <Text style={styles.amount} >₦247,850.50</Text>
                            <TouchableOpacity >
                                <Ionicons name="eye-off" size={19} color="#FFFFFF" /></TouchableOpacity>
                        </View>

                        <Text style={styles.tierStatus} >Tier 2: Personal verified</Text>
                    </View>


                    {/* CTA buttons */}
                    <View style={styles.CTA_buttons_wrapper} >


                        {/* New sale  */}
                        <Pressable
                            onPress={() => navigation.navigate('sales')}
                            style={styles.CTA_button} >
                            <View style={styles.circle} >
                                <Ionicons name="add" size={25} color="#10182A" />
                            </View>
                            <Text style={styles.CTA_button_text} >New Sale</Text>
                        </Pressable>


                        {/* Withdraw */}
                        <Pressable style={styles.CTA_button} >
                            <View style={styles.circle} >
                                <BanknoteArrowDown size={24} color="#253E86" />
                            </View>
                            <Text style={styles.CTA_button_text} >
                                Withdraw
                            </Text>
                        </Pressable>


                        {/* Tap to pay  */}
                        <Pressable style={styles.CTA_button} >
                            <View style={styles.circle} >
                                <SmartphoneNfc size={24} color="#253E86" />
                            </View>
                            <Text style={styles.CTA_button_text} >
                                Tap to Pay
                            </Text>
                        </Pressable>

                    </View>

                </View>



                {/* Brief summary of today's activities */}
                <View style={styles.briefSummary} >

                    <View style={styles.leftSide} >
                        <View style={styles.text_wrapper} >
                            <Text style={styles.boldText} >24</Text>
                            <Text style={styles.label} >Today&apos;s Transaction</Text>
                        </View>
                    </View>


                    <View style={styles.rightSide} >
                        <View style={styles.text_wrapper} >
                            <Text style={styles.boldText} >128400</Text>
                            <Text style={styles.label} >Today&apos;s Revenue</Text>
                        </View>
                    </View>

                </View>



                {/* The transaction limit tracker  */}
                <View style={styles.tx_limit} >
                    <View style={styles.tx_limit_tracker_heading} >
                        <Text style={styles.tx_limit_tracker_head_text} >Daily Transaction Limit  </Text>
                        <Text style={styles.tx_limit_tracker_head_text} >Tier 2</Text>
                    </View>

                    <View style={{ width: "100%", paddingHorizontal: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                        <Progress.Bar
                            progress={0.5}
                            color="#253E86"
                            unfilledColor="#D3D8E7"
                            borderWidth={0}
                            borderRadius={30}
                            width={null}
                            height={12}
                        />
                        <Text style={styles.transacted_amount} >₦3.2M / ₦5M</Text>
                    </View>


                    <Pressable>
                        <Text style={styles.upgrade_limit_text} >Upgrade to increase limit</Text>
                    </Pressable>

                </View>




                {/* The transaction history  */}
                <View style={styles.tx_history_wrapper} >
                    {/* the heading  */}
                    <View style={styles.tx_history_wrapper_heading} >
                        <Text style={styles.tx_heading_text} >Transactions</Text>

                        <Pressable style={styles.view_all_btn} >
                            <Text style={styles.view_all_btn_text} >View all </Text>
                        </Pressable>
                    </View>

                    <Text style={styles.today_text} >Today </Text>



                    {/* The history  */}
                    <View style={styles.history} >

                        {/* The individual history card  */}
                        {
                            transactions.map((tx, i) => (
                                <View key={i} style={styles.history_card} >

                                    <View style={styles.history_card_left_side} >

                                        <Image
                                            source={logos[tx.image]}
                                            style={{ width: 30, height: 30, marginTop: 7 }}
                                        />

                                        <View
                                            style={{
                                                width: "auto",
                                                display: "flex",
                                                alignItems: "flex-start",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <Text style={styles.curreny}  >{tx.method} </Text>
                                            <Text style={styles.time} >{tx.tx_time.toDateString()} </Text>
                                        </View>
                                    </View>



                                    <View style={styles.history_card_right_side} >
                                        <Text style={styles.history_amount} >
                                            ₦{tx.amount.toLocaleString(
                                                undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            }
                                            )} </Text>

                                        <Text style={[styles.history_status, getStatusStyle(tx.status)]} >{tx.status} </Text>
                                    </View>

                                </View>
                            ))
                        }

                    </View>


                </View>
            </ScrollView>


        </View>
    )
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9ECF3',
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 12,
        paddingHorizontal: 19,
        paddingVertical: 20
    },

    header: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },

    profilePicWrapper: {
        width: 45,
        height: 45,
        borderRadius: "50%",
        borderWidth: 1,
        borderColor: "#253E86",
        overflow: "hidden",
        backgroundColor: "#E9ECF3",
    },
    greeting: {
        display: "flex",
        alignItems: "center",
        gap: 5,
        flexDirection: "row",
    },

    hellotext: {
        fontFamily: 'Sora_400Regular',
        fontSize: 14
    },

    userName: {
        fontFamily: "Sora_300Light",
        fontSize: 14
    },

    support: {
        display: "flex",
        alignItems: "center",
        gap: 15,
        flexDirection: "row",
    },



    bellButton: {
        position: "relative",
        width: 36,
        height: 36,
        backgroundColor: "#253E861A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
    },

    redDot: {
        backgroundColor: "#FF0707",
        height: 10,
        width: 10,
        borderRadius: "50%",
        position: "absolute",
        top: 0,
        right: 0,
    },

    scrollView: {
        display: "flex",
        alignItems: "center",
        gap: 12,
    },

    CTABannner: {
        width: "100%",
        height: "auto",
        backgroundColor: "#253E86",
        borderRadius: 40,
        paddingHorizontal: 19,
        paddingVertical: 35,
        display: "flex",
        alignItems: "flex-start",
        gap: 15,
        flexDirection: "column"
    },

    brief_details: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 5
    },

    availableBalance: {
        color: "#FFFFFF",
        fontSize: 14,
        fontFamily: "sora300Light"
    },

    amount_wrapper: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        flexDirection: "row"
    },

    amount: {
        fontSize: 40,
        color: "#FFFFFF",
        fontFamily: "Sora_400Regular"
    },

    tierStatus: {
        backgroundColor: "#FFFFFF1A",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 9,
        color: "#FFFFFF",
        fontSize: 10,
        fontFamily: "sora300Light"
    },


    CTA_buttons_wrapper: {
        display: "flex",
        alignItems: "center",
        gap: 50,
        justifyContent: "center",
        flexDirection: "row",
        width: "100%",
        maxWidth: 301,
        marginHorizontal: "auto"
    },


    CTA_button: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 6
    },


    CTA_button_text: {
        fontSize: 12,
        color: "#FFFFFF",
        fontFamily: "sora300Light",
        textAlign: "center"
    },

    circle: {
        width: 67,
        height: 67,
        borderRadius: "50%",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#2DBAA4CC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },


    briefSummary: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },

    leftSide: {
        flex: 1,
        borderRightWidth: 0.5,
        borderColor: "#D3D8E7",
        paddingVertical: 18,
        paddingHorizontal: 20,
    },

    rightSide: {
        flex: 1,
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderLeftWidth: 0.5,
        borderColor: "#D3D8E7",
    },

    text_wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2
    },

    boldText: {
        color: "#10182A",
        fontSize: 24,
        fontFamily: "Sora_400Regular"
    },

    label: {
        color: "#797676",
        fontSize: 11,
        fontFamily: "Sora_400Regular"
    },


    tx_limit: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16
    },

    tx_limit_tracker_heading: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10
    },

    tx_limit_tracker_head_text: {
        color: "#10182A",
        fontSize: 14,
        fontFamily: "Sora_400Regular"
    },

    upgrade_limit_text: {
        color: "#253E86",
        textDecorationLine: "underline",
        fontFamily: "Sora_600SemiBold",
        fontSize: 13
    },

    transacted_amount: {
        fontSize: 10,
        color: "#10182A",
        fontFamily: "Sora_400Regular",
        marginLeft: "auto"
    },

    tx_history_wrapper: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        width: "100%",
        paddingHorizontal: 18,
        paddingVertical: 20
    },

    tx_history_wrapper_heading: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10
    },

    tx_heading_text: {
        fontSize: 16,
        color: "#10182A",
        fontFamily: "Sora_600SemiBold",
    },

    view_all_btn: {
        borderWidth: 0.5,
        borderColor: "#253E86",
        paddingVertical: 4,
        paddingHorizontal: 9,
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6
    },

    view_all_btn_text: {
        fontSize: 12,
        color: "#10182A",
        fontFamily: "Sora_400Regular",
    },

    today_text: {
        fontSize: 10,
        color: "#253E86",
        fontFamily: "Sora_300Light",
        marginVertical: 12
    },

    history: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 20,
    },

    history_card: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 2
    },

    history_card_left_side: {
        width: "auto",
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexDirection: "row"
    },

    curreny: {
        fontSize: 14,
        color: "#10182A",
        fontFamily: "Sora_400Regular"
    },

    time: {
        fontSize: 10,
        color: "#B3B3B3",
        fontFamily: "Sora_300Light"
    },



    history_card_right_side: {
        display: "flex",
        alignItems: "flex-end",
        flexDirection: "column",
        gap: 3,
    },

    history_amount: {
        color: "#10182A",
        fontSize: 13,
        fontFamily: "Sora_400Regular"
    },

    history_status: {
        fontSize: 10,
        fontFamily: "sora300Light"
    },

    successful: {
        color: "#009A49"
    },

    pending: {
        color: "#F7931A"
    },

    unsuccessful: {
        color: "#FF0707"
    }




})