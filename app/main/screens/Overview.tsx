import EyeClosed from "@/components/icons/EyeClosed";
import NFCIcon from "@/components/icons/NFCPayments";
import SupportIcon from "@/components/icons/SupportIcon";
import WithdrawIcon from "@/components/icons/WithdrawIcon";
import TransactionCard from "@/components/TransactionCard";
import CustomProgressBar from "@/components/ui/CustomProgressBar";
import { useCurrentUser } from "@/stores/authStore";
import { useSaleStore } from "@/stores/saleStore";
import { useWalletStore } from "@/stores/WalletStore";
import { SaleRecord } from "@/types/types";
import { formatBalance, getDateLabel, scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EyeIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MainStackParamList } from "../type";

type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList, "overview">;

export default function Overview() {
    const navigation = useNavigation<OverviewNavigationProp>()
    const [showBalance, setShowBalance] = useState(true)
    const user = useCurrentUser()
    const { salesHistory,
        fetchSalesHistory,
        todaySales,
        filterTodaySales,
        sumDailyTx,
        sumTodayTX,
    }
        = useSaleStore()

    const { fetchBalance,
        walletBalance,
    } = useWalletStore()



    // Masking logic for balance
    const displayBalance = showBalance
        ? `₦${formatBalance(Number(walletBalance))}`
        : `₦ ${"*".repeat(walletBalance.length)}`;


    // this useEffect fetches sales history
    useEffect(() => {
        fetchSalesHistory();
        fetchBalance()
    }, []);


    // this useEffect calls the function to filter out today's sales
    useEffect(() => {
        filterTodaySales();
        sumDailyTx();
    }, [salesHistory]);


    // sorting the array according to the latest before grouping them
    const sortedSales = [...(salesHistory ?? [])].sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );


    // This groups the transaction according to the transaction date
    const groupedSales = sortedSales?.reduce((acc, sale) => {
        const label = getDateLabel(sale.createdAt);

        if (!acc[label]) {
            acc[label] = [];
        }

        acc[label].push(sale);

        return acc;
    }, {} as Record<string, SaleRecord[]>);






    return (
        <View style={styles.container} >

            <View style={styles.header} >

                <View style={styles.greeting} >
                    <Pressable
                        onPress={() => navigation.navigate("profile_details")}
                        style={styles.profilePicWrapper}  >
                        <Image source={require("../../../assets/overview/user.png")} style={{ width: 40, height: 40, marginTop: 7 }} />
                    </Pressable>

                    <Text style={styles.hellotext} >
                        Hello, <Text style={styles.userName} > {user?.firstName} {user?.lastName} </Text></Text>
                </View>



                <View style={styles.support} >
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate("contact_support")}
                    >

                        <SupportIcon height={22} width={22} color={"#10182A"} />
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => navigation.navigate("notification_settings")}
                        style={styles.bellButton} >
                        <Ionicons
                            name="notifications-sharp"
                            size={22}
                            color="#10182A" />

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
                            <Text
                                numberOfLines={1}
                                adjustsFontSizeToFit
                                style={styles.amount}
                            >{displayBalance} </Text>

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
                        <Pressable
                            onPress={() => navigation.navigate('withdraw')}
                            style={styles.CTA_button} >
                            <View style={styles.circle} >
                                <WithdrawIcon
                                    height={24}
                                    width={24}
                                    color={"#253E86"}
                                />
                            </View>
                            <Text style={styles.CTA_button_text} >
                                Withdraw
                            </Text>
                        </Pressable>


                        {/* Tap to pay  */}
                        <Pressable style={styles.CTA_button} >
                            <View style={styles.circle} >
                                <NFCIcon
                                    height={24}
                                    width={24}
                                    color="#253E86"
                                />
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
                            <Text style={styles.boldText} >{todaySales.length}</Text>
                            <Text style={styles.label} >Today&apos;s Transaction</Text>
                        </View>
                    </View>


                    <View style={styles.rightSide} >
                        <View style={styles.text_wrapper} >
                            <Text
                                adjustsFontSizeToFit
                                numberOfLines={1}
                                style={styles.boldText} >₦{sumTodayTX.toLocaleString()} </Text>


                            <Text
                                adjustsFontSizeToFit
                                numberOfLines={1}
                                style={styles.label} >Today&apos;s Revenue</Text>
                        </View>
                    </View>

                </View>



                {/* The transaction limit tracker  */}
                <View style={styles.tx_limit} >
                    <View style={styles.tx_limit_tracker_heading} >
                        <Text style={styles.tx_limit_tracker_head_text} >Daily Transaction Limit  </Text>
                        <Text style={styles.tx_limit_tracker_head_text} >Tier 2</Text>
                    </View>

                    <View style={{
                        width: "100%",
                        paddingHorizontal: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 5
                    }}>
                        <CustomProgressBar
                            total={5000000}
                            amount={sumTodayTX}
                            textColor="#ffffff"
                        />
                        <Text style={styles.transacted_amount} >₦3.2M / ₦5M</Text>
                    </View>


                    <Pressable
                        onPress={() => navigation.navigate("tx_limits")}
                    >
                        <Text style={styles.upgrade_limit_text} >Upgrade to increase limit</Text>
                    </Pressable>

                </View>




                {/* The transaction history  */}
                <View style={styles.tx_history_wrapper} >
                    {/* the heading  */}
                    <View style={styles.tx_history_wrapper_heading} >
                        <Text style={styles.tx_heading_text} >Transactions</Text>

                        <Pressable
                            onPress={() => navigation.navigate("transactions")}
                            style={styles.view_all_btn} >
                            <Text style={styles.view_all_btn_text} >View all </Text>
                        </Pressable>
                    </View>

                    {groupedSales &&
                        Object.entries(groupedSales).slice(0, 1).map(([label, sales]) => (
                            <View key={label}>
                                <Text style={styles.today_text}>{label}</Text>

                                {sales.slice(0, 5).map((tx) => (
                                    <TransactionCard key={tx.id} tx={tx} />
                                ))}
                            </View>
                        ))}


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
        gap: 1,
        paddingTop: scaleVerticalPadding(20),
        width: "100%"
    },

    header: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: scaleHorizontalPadding(10),
    },

    profilePicWrapper: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
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
        fontSize: scaleFont(14)
    },

    userName: {
        fontFamily: "Sora_300Light",
        fontSize: scaleFont(14)
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
        borderRadius: 18,
    },

    redDot: {
        backgroundColor: "#FF0707",
        height: 10,
        width: 10,
        borderRadius: 5,
        position: "absolute",
        top: 0,
        right: 0,
    },

    scrollView: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        paddingVertical: scaleVerticalPadding(12),
        paddingHorizontal: scaleHorizontalPadding(10),
    },

    CTABannner: {
        width: "100%",
        height: "auto",
        backgroundColor: "#253E86",
        borderRadius: 40,
        paddingHorizontal: 19,
        paddingTop: 35,
        paddingBottom: 18,
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
        fontSize: scaleFont(14),
        fontFamily: "Sora_300Light"
    },

    amount_wrapper: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        flexDirection: "row",
        justifyContent: "center"
    },

    amount: {
        fontSize: scaleFont(40),
        color: "#FFFFFF",
        fontFamily: "Sora_400Regular"
    },

    tierStatus: {
        backgroundColor: "#FFFFFF1A",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 9,
        color: "#FFFFFF",
        fontSize: scaleFont(10),
        fontFamily: "Sora_300Light"
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
        fontSize: scaleFont(12),
        color: "#FFFFFF",
        fontFamily: "Sora_300Light",
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
        paddingVertical: scaleVerticalPadding(13),
        paddingHorizontal: 20,
    },

    rightSide: {
        flex: 1,
        paddingVertical: scaleVerticalPadding(13),
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
        fontSize: scaleFont(24),
        fontFamily: "Sora_400Regular"
    },

    label: {
        color: "#797676",
        fontSize: scaleFont(11),
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
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular"
    },

    upgrade_limit_text: {
        color: "#253E86",
        textDecorationLine: "underline",
        fontFamily: "Sora_600SemiBold",
        fontSize: scaleFont(13)
    },

    transacted_amount: {
        fontSize: scaleFont(10),
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
        fontSize: scaleFont(16),
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
        fontSize: scaleFont(12),
        color: "#10182A",
        fontFamily: "Sora_400Regular",
    },

    today_text: {
        fontSize: scaleFont(10),
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



})
