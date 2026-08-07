import { MainStackParamList } from "@/app/main/type";
import { useSaleStore } from "@/stores/saleStore";
import { GroupedTx, SaleRecord } from "@/types/types";
import { capitalizeWord, getDateLabel, scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";



type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function TransactionsComponent() {
    const navigation = useNavigation<NavigationProp>()
    const { salesHistory } = useSaleStore()

    // This groups the transaction according to the transaction date
    const groupedTransactions = useMemo(() => {

        const groups: Record<string, GroupedTx> = {}


        // sorting the array according to the latest before grouping them
        const sortedSales = [...(salesHistory ?? [])].sort(
            (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )

        sortedSales.forEach((tx) => {

            const label = getDateLabel(tx.createdAt);

            if (!groups[label]) {
                groups[label] = {
                    date: label,
                    transactions: [],
                    totalAmount: 0,
                    totalCount: 0,
                };
            }

            groups[label].transactions.push(tx);
            groups[label].totalAmount += Number(tx.amount);
            groups[label].totalCount += 1;
        })

        return Object.values(groups);

    }, [salesHistory])

    // This handles the display of the different logos
    const logos: Record<Lowercase<NonNullable<SaleRecord["currency"]>>, ImageSourcePropType> = {
        cngn: require("../assets/logos/CNGN.png"),
        usdc: require("../assets/logos/USDC.png"),
        usdt: require("../assets/logos/USDT.png"),
        ngn: require("../assets/logos/card.png"),
        "": require("../assets/logos/card.png")
    };



    if (!salesHistory || salesHistory.length < 1) {
        return null;
    }




    return (
        <View style={styles.container} >

            <View style={styles.main_content} >

                {groupedTransactions.map((group) => (

                    <View key={group.date} style={{ width: "100%", gap: 10 }}>

                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.date_text}>{group.date}</Text>

                            <View style={styles.summary}>
                                <Text
                                    adjustsFontSizeToFit
                                    numberOfLines={1}
                                    style={styles.summary_text}>
                                    Total Transactions {group.totalCount}
                                </Text>

                                <Text
                                    adjustsFontSizeToFit
                                    numberOfLines={1}
                                    style={styles.summary_text}>
                                    Total Sales ₦ {group.totalAmount.toLocaleString()}
                                </Text>
                            </View>
                        </View>

                        {/* Transactions */}
                        {group.transactions.map((tx, index) => (
                            <Pressable
                                key={index}
                                onPress={() => navigation.navigate("transaction_details", {
                                    id: tx.id
                                })}

                                style={styles.tx_row}>

                                <View style={styles.name}>
                                    <Image
                                        source={logos[tx.currency.toLowerCase() as keyof typeof logos]}
                                        style={{
                                            width: 23.75,
                                            height: 20,
                                            marginTop: 7,
                                            alignSelf: "flex-start",
                                            objectFit: "contain"
                                        }}
                                    />

                                    <View style={{
                                        gap: 8,
                                        alignItems: "flex-start"
                                    }} >
                                        <Text
                                            adjustsFontSizeToFit
                                            numberOfLines={1}
                                            style={styles.method_text}>

                                            {tx.paymentType === "crypto" ? (tx.currency.toUpperCase() + " " + `(${capitalizeWord(tx.network)})`)
                                                : "bank details here"}

                                        </Text>


                                        <Text
                                            adjustsFontSizeToFit
                                            numberOfLines={1}
                                            style={styles.recipient}>{tx.walletAddress.slice(0, 4) + "****" + tx.walletAddress.slice(-4)}</Text>
                                    </View>
                                </View>

                                <Text style={styles.the_amount}>
                                    ₦ {Number(tx.amount).toLocaleString()}
                                </Text>

                                <Text
                                    style={[
                                        styles.status,
                                        {
                                            color:
                                                tx.status.toLowerCase() === "confirmed"
                                                    ? "#009A49"
                                                    : tx.status.toLowerCase() === "pending"
                                                        ? "#E8A317"
                                                        : "#D92D20"
                                        }
                                    ]}
                                >
                                    {capitalizeWord(tx.status)}
                                </Text>

                                <Text style={styles.time}>
                                    {new Date(tx.createdAt).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    }).toUpperCase()}
                                </Text>

                                <Pressable style={styles.view_button}>
                                    <Ionicons
                                        name="chevron-forward"
                                        size={23}
                                        color="#10182AB2" />
                                </Pressable>
                            </Pressable>
                        ))}

                    </View>
                ))}


            </View>



        </View>
    )
}





const styles = StyleSheet.create({
    container: {
        width: "100%",
        gap: 10,
        alignItems: "center",
        justifyContent: "center"
    },

    header: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },

    date_text: {
        color: "#000000",
        fontSize: scaleFont(16),
        fontFamily: "Sora_600SemiBold"
    },

    summary: {
        width: "auto",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        gap: 13
    },

    summary_text: {
        color: "#000000",
        fontSize: scaleFont(12),
        fontFamily: "Sora_300Light"
    },


    main_content: {
        width: "100%",
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },

    tx_row: {
        width: "100%",
        borderRadius: 5,
        backgroundColor: "#fff",
        paddingVertical: scaleVerticalPadding(14),
        paddingHorizontal: scaleHorizontalPadding(7),
        flexDirection: "row",
        alignItems: "flex-start",
    },

    name: {
        flex: 3,
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 8,
    },

    method_text: {
        color: "#000000",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular"
    },

    recipient: {
        color: "#10182AB2",
        fontSize: scaleFont(12),
        fontFamily: "Sora_400Regular"
    },

    the_amount: {
        flex: 1.5,
        textAlign: "center",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(10),
        color: "#000",
    },

    status: {
        flex: 1,
        textAlign: "center",
        fontFamily: "Sora_600SemiBold",
        fontSize: scaleFont(9),
    },

    time: {
        flex: 1,
        textAlign: "right",
        color: "#10182AB2",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(10),
    },

    view_button: {
        width: 24,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center"
    }


})