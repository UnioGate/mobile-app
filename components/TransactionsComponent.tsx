import { MainStackParamList } from "@/app/main/type";
import { useSaleStore } from "@/stores/saleStore";
import { SaleRecord } from "@/types/types";
import { capitalizeWord, getDateLabel, parseBankTransferAddress, scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useMemo } from "react";
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface GroupedSales {
    date: string;
    transactions: SaleRecord[];
    totalAmount: number;
    totalCount: number;
}

const logos: Record<string, ImageSourcePropType> = {
    cngn: require("../assets/logos/CNGN.png"),
    usdc: require("../assets/logos/USDC.png"),
    usdt: require("../assets/logos/USDT.png"),
    ngn: require("../assets/logos/CNGN.png"),
    card: require("../assets/logos/CNGN.png"),
    btc: require("../assets/logos/logos_bitcoin.png"),
    eth: require("../assets/logos/eth_icon.png"),
    tron: require("../assets/logos/tron.png"),
    base: require("../assets/logos/base.png"),
    "": require("../assets/logos/CNGN.png")
};

const getLogoSource = (tx: SaleRecord): ImageSourcePropType => {
    const defaultLogo = require("../assets/logos/CNGN.png");
    if (!tx) return defaultLogo;

    const currencyKey = tx.currency ? tx.currency.toLowerCase() : "";
    if (currencyKey && logos[currencyKey]) {
        return logos[currencyKey];
    }

    const networkKey = tx.network ? tx.network.toLowerCase() : "";
    if (networkKey && logos[networkKey]) {
        return logos[networkKey];
    }

    const paymentTypeKey = tx.paymentType ? tx.paymentType.toLowerCase() : "";
    if (paymentTypeKey && logos[paymentTypeKey]) {
        return logos[paymentTypeKey];
    }

    return defaultLogo;
};

export default function TransactionsComponent() {
    const navigation = useNavigation<NavigationProp>();
    const { salesHistory, fetchSalesHistory, isLoadingHistory } = useSaleStore();

    useEffect(() => {
        if (!salesHistory || salesHistory.length === 0) {
            fetchSalesHistory();
        }
    }, []);

    // This groups the transactions according to the transaction date
    const groupedTransactions = useMemo(() => {
        if (!salesHistory || salesHistory.length === 0) return [];

        const sorted = [...salesHistory].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        const groups: Record<string, GroupedSales> = {};

        sorted.forEach((tx) => {
            const label = getDateLabel(tx.createdAt);

            if (!groups[label]) {
                groups[label] = {
                    date: label,
                    transactions: [],
                    totalAmount: 0,
                    totalCount: 0
                };
            }

            groups[label].transactions.push(tx);
            groups[label].totalAmount += Number(tx.amount || 0);
            groups[label].totalCount += 1;
        });

        return Object.values(groups);
    }, [salesHistory]);

    if (isLoadingHistory && (!salesHistory || salesHistory.length === 0)) {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: scaleFont(14), color: "#797676", fontFamily: "Sora_400Regular" }}>
                    Loading transactions...
                </Text>
            </View>
        );
    }

    if (!salesHistory || salesHistory.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: scaleFont(14), color: "#797676", fontFamily: "Sora_400Regular", marginTop: 20 }}>
                    No transactions found
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.main_content}>
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
                                    Transactions: {group.totalCount}
                                </Text>

                                <Text
                                    adjustsFontSizeToFit
                                    numberOfLines={1}
                                    style={styles.summary_text}>
                                    Total Sales: ₦ {group.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </Text>
                            </View>
                        </View>

                        {/* Transactions */}
                        {group.transactions.map((tx) => {
                            const methodText = tx.paymentType === "crypto"
                                ? tx.currency.toUpperCase()
                                : "Transfer";

                            const statusLower = tx.status ? tx.status.toLowerCase() : "";
                            const statusColor =
                                statusLower === "confirmed" || statusLower === "completed" || statusLower === "successful"
                                    ? "#009A49"
                                    : statusLower === "pending"
                                        ? "#E8A317"
                                        : "#D92D20";

                            const statusFormatted = tx.status
                                ? tx.status.charAt(0).toUpperCase() + tx.status.slice(1)
                                : "Pending";

                            const timeFormatted = tx.createdAt
                                ? new Date(tx.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true
                                }).toUpperCase()
                                : "";


                            const parsed = parseBankTransferAddress(tx.walletAddress)

                            return (
                                <Pressable
                                    key={tx.id}
                                    onPress={() => navigation.navigate("transaction_details", {
                                        id: tx.id
                                    })}
                                    style={styles.tx_row}>

                                    <View style={styles.name}>
                                        <Image
                                            source={getLogoSource(tx)}
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
                                        }}>
                                            <Text
                                                adjustsFontSizeToFit
                                                numberOfLines={1}
                                                style={styles.method_text}>{methodText}</Text>

                                            <Text
                                                adjustsFontSizeToFit
                                                numberOfLines={1}
                                                style={styles.recipient}>
                                                {tx.paymentType === "crypto" ? `${capitalizeWord(tx.network)} Network` : (`${parsed?.accountNumber}: ${" "}  ${parsed?.bankName}`)}
                                            </Text>
                                        </View>
                                    </View>

                                    <Text style={styles.the_amount}>
                                        ₦ {Number(tx.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Text>

                                    <Text style={[styles.status, { color: statusColor }]}>
                                        {statusFormatted}
                                    </Text>

                                    <Text style={styles.time}>
                                        {timeFormatted}
                                    </Text>

                                    <View style={styles.view_button}>
                                        <Ionicons
                                            name="chevron-forward"
                                            size={23}
                                            color="#10182AB2" />
                                    </View>
                                </Pressable>
                            );
                        })}
                    </View>
                ))}
            </View>
        </View>
    );
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