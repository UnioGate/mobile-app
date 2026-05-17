import { MainStackParamList } from "@/app/main/type";
import { transactions } from "@/data/mock_tx";
import { GroupedTx } from "@/types/types";
import { scaleFont } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";



type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function TransactionsComponent() {
    const navigation = useNavigation<NavigationProp>()

    const groupedTransactions = useMemo(() => {

        const groups: Record<string, GroupedTx> = {}

        transactions.forEach((tx) => {

            const date = new Date(tx.tx_time)

            const formattedDate = date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
            })

            if (!groups[formattedDate]) {
                groups[formattedDate] = {
                    date: formattedDate,
                    transactions: [],
                    totalAmount: 0,
                    totalCount: 0
                }
            }

            groups[formattedDate].transactions.push(tx)
            groups[formattedDate].totalAmount += tx.amount
            groups[formattedDate].totalCount += 1
        })

        return Object.values(groups)

    }, [])


    return (
        <View style={styles.container} >

            <View style={styles.main_content} >

                {groupedTransactions.map((group) => (

                    <View key={group.date} style={{ width: "100%", gap: 10 }}>

                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.date_text}>{group.date}</Text>

                            <View style={styles.summary}>
                                <Text style={styles.summary_text}>
                                    Total Transactions {group.totalCount}
                                </Text>

                                <Text style={styles.summary_text}>
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
                                        source={require("../assets/logos/eth_icon.png")}
                                        style={{ width: 20, aspectRatio: 1 }}
                                    />

                                    <View>
                                        <Text style={styles.method_text}>{tx.method}</Text>
                                        <Text style={styles.recipient}>{tx.recipient}</Text>
                                    </View>
                                </View>

                                <Text style={styles.the_amount}>
                                    ₦ {tx.amount.toLocaleString()}
                                </Text>

                                <Text
                                    style={[
                                        styles.status,
                                        {
                                            color:
                                                tx.status === "Completed"
                                                    ? "#009A49"
                                                    : tx.status === "Pending"
                                                        ? "#E8A317"
                                                        : "#D92D20"
                                        }
                                    ]}
                                >
                                    {tx.status}
                                </Text>

                                <Text style={styles.time}>
                                    {new Date(tx.tx_time).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    }).toUpperCase()}
                                </Text>

                                <Pressable style={styles.view_button}>
                                    <Ionicons name="chevron-forward" size={13} color="#10182AB2" />
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
        fontSize: scaleFont(10),
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
        backgroundColor: "#ffffff",
        paddingVertical: 14,
        paddingHorizontal: 7,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 10
    },

    name: {
        width: "30.6%",
        height: "auto",
        gap: 8,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row"
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
        width: "20.5%",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(10),
        color: "#000000",
        flexShrink: 0,
        flexWrap: "nowrap"
    },

    status: {
        width: "19.6%",
        fontFamily: "Sora_600SemiBold",
        fontSize: scaleFont(9),
    },

    time: {
        color: "#10182AB2",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(10),
    },

    view_button: {
        width: "2.9%",
        alignSelf: "center"
    }


})