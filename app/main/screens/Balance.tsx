import CalendarIcon from "@/components/icons/CalendarIcon";
import EyeClosed from "@/components/icons/EyeClosed";
import ReloadIcon from "@/components/icons/Reload";
import TransactionChart from "@/components/TransactionChart";
import { withdrawals } from "@/data/mock_withdrawal_tx";
import { formatBalance, scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronDown, Download, EyeIcon } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MainStackParamList } from "../type";


type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function Balance() {
    const navigation = useNavigation<OverviewNavigationProp>()
    const balance = 24740.5;
    const [showBalance, setShowBalance] = useState(true)
    const [isBreakdownOpen, setIsBreakdownOpen] = useState(true);



    // Masking logic for balance
    const displayBalance = showBalance
        ? `₦${formatBalance(balance)}`
        : "₦ *******";


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
                    Balance
                </Text>


                <Pressable>
                    <ReloadIcon />
                </Pressable>

            </View>





            {/* main content  */}
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollView_style}
                showsVerticalScrollIndicator={false} >



                <View style={styles.main_component} >

                    {/* Balance details  */}
                    <View style={styles.balance_details} >
                        <Text style={styles.balance_text} >Available Balance</Text>

                        <View style={styles.balance_wrapper} >
                            <Text style={styles.balance_amount} >{displayBalance}</Text>

                            <Pressable
                                onPress={() => setShowBalance((prev) => !prev)}
                            >
                                {showBalance ? (
                                    <EyeIcon
                                        height={22}
                                        width={22}
                                        color={"#ffffff"}
                                    />
                                ) :
                                    (<EyeClosed
                                        height={22}
                                        width={22}
                                        color={"#ffffff"} />)}
                            </Pressable>
                        </View>


                        <View style={{
                            width: "auto",
                            alignItems: "center",
                            flexDirection: "row",
                            gap: 6
                        }} >

                            <View style={[styles.dot, {
                                backgroundColor: "#FFFFFF",
                                borderRadius: 999,
                                width: 4,
                                height: 4,
                            }]} />
                            <Text style={styles.date_text} >Last updated: Today 2:45 PM</Text>

                        </View>

                    </View>


                    {/* Breakdown  */}
                    <View style={styles.breakdown_wrapper} >

                        {/* Heading  */}
                        <Pressable
                            onPress={() => setIsBreakdownOpen(prev => !prev)}
                            style={{
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: "row"
                            }}
                        >
                            <Text style={{
                                fontSize: scaleFont(13),
                                fontFamily: "Sora_600SemiBold",
                                color: "#000000"
                            }}>
                                Balance Breakdown
                            </Text>

                            <ChevronDown
                                style={{
                                    transform: [
                                        { rotate: isBreakdownOpen ? "0deg" : "-90deg" }
                                    ]
                                }}
                            />
                        </Pressable>

                        {isBreakdownOpen && (
                            <>
                                <View style={styles.breakdown_row}>
                                    <View style={styles.left_side}>
                                        <View style={styles.dot} />
                                        <View style={styles.text_wrapper}>
                                            <Text style={styles.row_title}>Cleared</Text>
                                            <Text style={styles.row_subtitle}>Available now</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.right_side_text}>₦247,850</Text>
                                </View>

                                <View style={[
                                    styles.breakdown_row,
                                    {
                                        borderBottomWidth: 0.5,
                                        borderBottomColor: "#FFFFFF80",
                                        borderTopWidth: 0.5,
                                        borderTopColor: "#FFFFFF80"
                                    }
                                ]}>
                                    <View style={styles.left_side}>
                                        <View style={[styles.dot, { backgroundColor: "#FEFB2D" }]} />
                                        <View style={styles.text_wrapper}>
                                            <Text style={styles.row_title}>Pending</Text>
                                            <Text style={styles.row_subtitle}>Pending settlement</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.right_side_text}>₦15,400</Text>
                                </View>

                                <View style={styles.breakdown_row}>
                                    <View style={styles.left_side}>
                                        <View style={[styles.dot, { backgroundColor: "#FF0707" }]} />
                                        <View style={styles.text_wrapper}>
                                            <Text style={styles.row_title}>On Hold</Text>
                                            <Text style={styles.row_subtitle}>Flagged transaction</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.right_side_text}>₦0</Text>
                                </View>
                            </>
                        )}

                    </View>

                </View>






                {/* Buttons */}
                <View style={styles.button_wrapper} >

                    <TouchableOpacity
                        onPress={() => navigation.navigate("withdraw")}
                        style={[styles.button, {
                            backgroundColor: "#253E86"
                        }]} >


                        <Download width={16} height={16} color={"#ffffff"} />


                        <Text
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={[styles.button_text, {
                                color: "#ffffff"
                            }]} >Withdraw Funds</Text>
                    </TouchableOpacity>

                    <Pressable
                        onPress={() => navigation.navigate("settlement_settings")}
                        style={[styles.button]} >

                        <CalendarIcon />

                        <Text style={[styles.button_text, {
                            color: "#253E86"
                        }]} > Settlement Schedule</Text>
                    </Pressable>

                </View>



                {/* Automatic settlement */}
                <View style={styles.automatic_settlement_wrapper} >

                    <View style={{
                        width: "auto",
                        alignItems: "flex-start",
                        flexDirection: "row",
                        gap: 8,

                    }} >
                        <Ionicons
                            name="time-sharp"
                            color={"#10182A"}
                            size={22}
                        />



                        <View>

                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(16),
                                fontFamily: "Sora_400Regular"
                            }} >Automatic</Text>

                            <Text style={{
                                color: "#000000",
                                fontFamily: "Sora_300Light",
                                marginVertical: 8
                            }} >Weekly on Fridays at 5:00 PM</Text>

                            <Text
                                style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }}
                            >Next: March 8, 2026</Text>
                        </View>
                    </View>



                    <TouchableOpacity style={styles.settings_button} >

                        <Ionicons
                            name="settings-sharp"
                            color={"#253E86"}
                            size={10} />

                        <Text
                            numberOfLines={1}
                            adjustsFontSizeToFit style={[styles.button_text, {
                                color: "#253E86",
                                fontFamily: "Sora_600SemiBold",
                                fontSize: scaleFont(7)
                            }]} > Change Settings</Text>

                    </TouchableOpacity>

                </View>


                {/* Transaction chart */}
                <TransactionChart />


                {/* Recent withdrawals section */}
                <View style={styles.recent_withdrawal_section} >
                    {/* top  */}
                    <View style={styles.recent_withdrawal_section_top} >

                        <View style={{
                            width: "auto",
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: 8
                        }} >
                            <Ionicons
                                name="card"
                                size={16}
                                color={"#1E1E1E"} />
                            <Text style={styles.recent_withdrawal_section_title} >Recent Withdrawals</Text>
                        </View>


                        <Pressable style={{
                            width: "auto",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4
                        }}>
                            <Text style={styles.view_all_btn} >View All</Text>
                            <Ionicons
                                name="chevron-forward"
                                color={"#253E86"}
                                size={17} />
                        </Pressable>

                    </View>


                    {/* bottom */}
                    <View style={styles.recent_withdrawal_section_bottom} >

                        {/* The row for withdrawals */}
                        {withdrawals.slice(0, 3).map((tx, id) => (
                            <Pressable
                                key={tx.id}
                                style={[styles.recent_withdrawal_section_bottom_row, {
                                    borderBottomColor: "#B3B3B3",
                                    borderBottomWidth: id + 1 === 3 ? 0 : 0.4,
                                }]} >

                                <View style={{
                                    alignItems: "flex-start",
                                    gap: 9
                                }} >

                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_600SemiBold"
                                    }} > ₦{tx.amount.toLocaleString()} </Text>


                                    <Text
                                        style={{
                                            color: "#10182AB2",
                                            fontSize: scaleFont(12),
                                            fontFamily: "Sora_400Regular"
                                        }}
                                    > {tx.bank} </Text>
                                </View>


                                <View style={{
                                    width: "auto",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    gap: 5
                                }} >
                                    <View style={{
                                        alignItems: "flex-end",
                                        gap: 7
                                    }} >

                                        <Text style={{
                                            color: tx.status === "Completed" ? "#009A49"
                                                : tx.status === "Pending" ? "#F7AA1A"
                                                    : "#FF0707"
                                            ,
                                            fontSize: scaleFont(10),
                                            fontFamily: "Sora_600SemiBold"
                                        }} > {tx.status} </Text>


                                        <Text style={{
                                            color: "#10182AB2",
                                            fontSize: scaleFont(12),
                                            fontFamily: "Sora_400Regular"
                                        }}
                                        >{tx.date} </Text>
                                    </View>

                                    <Ionicons
                                        name="chevron-forward"
                                        color={"#000000"}
                                        size={20}
                                    />
                                </View>
                            </Pressable>
                        ))}


                    </View>
                </View>


            </ScrollView >





        </View >
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9ECF3',
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },

    header: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderBottomColor: "#B3B3B3",
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(8)
    },


    heading: {
        color: "#000000",
        fontFamily: "PlusJakartaSans_500Medium",
        fontSize: scaleFont(22),
    },

    button_wrapper: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5,
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
        flexWrap: "nowrap",
        textAlign: "center"
    },


    scrollView_style: {
        width: "100%",
        flexGrow: 1,
        alignItems: "stretch",
        gap: 12,
        paddingBottom: scaleVerticalPadding(20),
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(10),
        backgroundColor: "#D3D8E7"
    },


    main_component: {
        backgroundColor: "#253E86",
        padding: 14,
        borderRadius: 20,
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        gap: 16
    },


    balance_details: {
        width: "auto",
        alignItems: "flex-start",
        gap: 4
    },


    balance_text: {
        color: "#FFFFFF",
        fontSize: scaleFont(14),
        fontFamily: "Sora_300Light",
    },


    date_text: {
        color: "#FFFFFF",
        fontFamily: "Sora_300Light",
        fontSize: scaleFont(10),
    },

    balance_wrapper: {
        width: "auto",
        flexDirection: "row",
        gap: 11,
        alignItems: "center",
        justifyContent: "center",
    },

    balance_amount: {
        color: "#FFFFFF",
        fontSize: scaleFont(34),
        fontFamily: "Sora_400Regular"
    },


    breakdown_wrapper: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        padding: 14,
        borderRadius: 10,
        gap: 7
    },


    dot: {
        width: 6,
        height: 6,
        backgroundColor: "#00BF50",
        borderRadius: 999
    },

    breakdown_row: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: scaleVerticalPadding(3)
    },

    left_side: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },

    text_wrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14
    },

    row_title: {
        color: "#000000",
        fontSize: scaleFont(12),
        fontFamily: "Sora_600SemiBold"
    },

    row_subtitle: {
        color: "#000000",
        fontSize: scaleFont(10),
        fontFamily: "Sora_200ExtraLight"
    },


    right_side_text: {
        color: "#000000",
        fontSize: scaleFont(12),
        fontFamily: "Sora_600SemiBold"
    },


    automatic_settlement_wrapper: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 7,
        paddingHorizontal: 8,
        paddingVertical: 18,
        flexDirection: "row",
        gap: 12,
        justifyContent: "space-between",
        alignItems: "flex-start"
    },

    settings_button: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleVerticalPadding(7),
        paddingHorizontal: scaleHorizontalPadding(6),
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "#253E86",
        gap: 4,
        flexWrap: "nowrap",
        textAlign: "center",
        height: "auto"
    },


    recent_withdrawal_section: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#B3B3B3",
        borderRadius: 7,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingHorizontal: scaleHorizontalPadding(10),
        paddingVertical: scaleVerticalPadding(13),
        gap: 14
    },

    view_all_btn: {
        color: "#253E86",
        fontFamily: "Sora_600SemiBold",
        fontSize: scaleFont(14)
    },


    recent_withdrawal_section_top: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10
    },

    recent_withdrawal_section_title: {
        color: "#000000",
        fontFamily: "Sora_600SemiBold",
        fontSize: scaleFont(16)
    },


    recent_withdrawal_section_bottom: {
        borderColor: "#B3B3B3",
        borderWidth: 0.4,
        borderRadius: 7,
        width: "100%",
        gap: 5
    },


    recent_withdrawal_section_bottom_row: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: scaleHorizontalPadding(10),
        paddingVertical: scaleVerticalPadding(10),
    }






})