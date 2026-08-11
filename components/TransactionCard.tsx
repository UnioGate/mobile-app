import { MainStackParamList } from "@/app/main/type";
import { SaleRecord } from "@/types/types";
import { formatTransactionDate, scaleFont, scaleVerticalPadding } from "@/utils/utils";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";







// This function gives the status color
const getStatusStyle = (status?: string) => {
    if (!status) return {};
    switch (status.toLowerCase()) {
        case "confirmed":
        case "successful":
        case "completed":
            return styles.successful;
        case "pending":
            return styles.pending;
        case "failed":
        case "expired":
        case "unsuccessful":
            return styles.unsuccessful;
        default:
            return {};
    }
};

interface txProps {
    tx: SaleRecord
}

type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList, "overview">;

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

const getLogoSource = (tx?: SaleRecord): ImageSourcePropType => {
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

export default function TransactionCard({ tx }: txProps) {
    const navigation = useNavigation<OverviewNavigationProp>();

    const methodText = tx.paymentType === "crypto"
        ? tx.currency.toUpperCase()
        : "Transfer";

    const statusText = tx?.status
        ? tx.status[0].toUpperCase() + tx.status.slice(1)
        : "Pending";

    if (!tx) {
        return null;
    }


    return (
        <Pressable
            onPress={() => {
                if (tx?.id) {
                    navigation.navigate("transaction_details", {
                        id: tx.id
                    });
                }
            }}
            style={styles.history_card}
        >
            <View style={styles.history_card_left_side}>
                <Image
                    source={getLogoSource(tx)}
                    style={{ width: 30, height: 30, marginTop: 7, objectFit: "contain" }}
                />

                <View
                    style={{
                        width: "auto",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center"
                    }}
                >
                    <Text style={styles.curreny}>{methodText}</Text>
                    <Text style={styles.time}>
                        {tx?.createdAt ? formatTransactionDate(tx.createdAt) : ""}
                    </Text>
                </View>
            </View>

            <View style={styles.history_card_right_side}>
                <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={styles.history_amount}
                >
                    ₦{Number(tx?.amount || 0).toLocaleString(
                        undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                    )}
                </Text>

                <Text style={[styles.history_status, getStatusStyle(tx?.status)]}>
                    {statusText}
                </Text>
            </View>
        </Pressable>
    );
}





const styles = StyleSheet.create({


    history_card: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 2,
        marginBottom: scaleVerticalPadding(10)
    },

    history_card_left_side: {
        width: "auto",
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexDirection: "row"
    },

    curreny: {
        fontSize: scaleFont(14),
        color: "#10182A",
        fontFamily: "Sora_400Regular"
    },

    time: {
        fontSize: scaleFont(10),
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
        fontSize: scaleFont(13),
        fontFamily: "Sora_400Regular"
    },

    history_status: {
        fontSize: scaleFont(10),
        fontFamily: "Sora_300Light"
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