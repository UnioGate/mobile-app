import { MainStackParamList } from "@/app/main/type";
import { SaleRecord, SalesBody } from "@/types/types";
import { formatTransactionDate, scaleFont, scaleVerticalPadding } from "@/utils/utils";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";







// This function gives the status color
const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
        case "completed":
            return styles.successful;
        case "pending":
            return styles.pending;
        case "failed":
            return styles.unsuccessful;
        case "expired":
            return styles.unsuccessful;
        default:
            return {};
    }
};


interface txProps {
    tx: SaleRecord
}


type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList, "overview">;


export default function TransactionCard({ tx }: txProps) {
    const navigation = useNavigation<OverviewNavigationProp>()


    const logos: Record<Lowercase<NonNullable<SalesBody["currency"]>>, ImageSourcePropType> = {
        cngn: require("../assets/logos/CNGN.png"),
        usdc: require("../assets/logos/USDC.png"),
        usdt: require("../assets/logos/USDT.png"),
        ngn: require("../assets/logos/card.png"),
        "": require("../assets/logos/card.png")
    };



    return (
        <Pressable
            onPress={() => navigation.navigate("transaction_details", {
                id: tx.id
            })}
            style={styles.history_card} >

            <View style={styles.history_card_left_side} >

                <Image
                    source={logos[tx.currency.toLowerCase() as keyof typeof logos]}
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
                    <Text style={styles.curreny}  >{tx.currency.toUpperCase()} </Text>
                    <Text style={styles.time} >
                        {formatTransactionDate(tx.createdAt)}
                    </Text>
                </View>
            </View>



            <View style={styles.history_card_right_side} >
                <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={styles.history_amount} >
                    ₦{Number(tx.amount).toLocaleString(
                        undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                    )} </Text>

                <Text style={[styles.history_status, getStatusStyle(tx.status)]} >{tx.status[0].toUpperCase() + tx.status.slice(1)} </Text>
            </View>

        </Pressable>
    )
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