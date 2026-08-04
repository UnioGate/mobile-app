import { useSaleStore } from "@/stores/saleStore";
import { SaleRecord } from "@/types/types";
import { copyItem, scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MainStackParamList } from "../../type";


type TransactionRouteProp = RouteProp<
    MainStackParamList,
    "transaction_details"
>

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;


export default function TransactionDetails() {
    const route = useRoute<TransactionRouteProp>()
    const { id } = route.params
    const navigation = useNavigation<NavigationProp>();
    const [currentTransaction, setCurrentTransaction] = useState<SaleRecord>()
    const { salesHistory } = useSaleStore()

    useEffect(() => {
        const currentTx = salesHistory.find((tx) => tx.id === id)

        setCurrentTransaction(currentTx)
    }, [id])



    const statusColor =
        currentTransaction?.status.toLowerCase() === "confirmed"
            ? "#009A49"
            : currentTransaction?.status.toLowerCase() === "pending"
                ? "#F7AA1A"
                : currentTransaction?.status.toLowerCase() === "expired"
                    ? "#FF0707"
                    : "#B3B3B3";


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
                    Transactions details
                </Text>

                <View>
                </View>

            </View>



            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.main_content}
                showsVerticalScrollIndicator={false} >

                <View style={[styles.label, {
                    backgroundColor: statusColor
                }]} >
                    <Ionicons name="checkmark-circle" size={30} color={"#FFFFFF"} />
                    <Text style={styles.label_text} >
                        {currentTransaction?.status &&
                            currentTransaction?.status[0].toUpperCase() +
                            currentTransaction?.status.slice(1)} </Text>
                </View>



                {/* The details  */}
                <View style={styles.details_wrapper} >


                    {/* Transaction ID */}
                    <View style={styles.details_row} >

                        <Text
                            style={styles.details_heading}
                        >Transaction ID</Text>

                        <Pressable

                            onPress={() => copyItem(currentTransaction?.id ?? "")}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10
                            }}>
                            <Text style={styles.details_value} > {currentTransaction?.id.slice(0, 10)} </Text>

                            <Text
                            >
                                <Ionicons
                                    name="copy-outline"
                                    color={"#1E1E1E"}
                                    size={14.4} />
                            </Text>
                        </Pressable>
                    </View>

                    {/* Date & Time  */}
                    <View style={styles.details_row} >

                        <Text
                            style={styles.details_heading}
                        >Date & Time:</Text>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10
                        }}>
                            <Text style={styles.details_value} >March 6, 2026 at 2:45 PM</Text>
                        </View>
                    </View>


                    {/* payment method */}
                    <View style={styles.details_row} >

                        <Text
                            style={styles.details_heading}
                        >Payment Method:</Text>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10
                        }}>
                            <Text style={styles.details_value} >
                                {currentTransaction?.currency}
                                {" "}
                                on
                                {" "}
                                {currentTransaction && currentTransaction?.network[0].toUpperCase() + currentTransaction?.network?.slice(1)}
                                {" "}
                                Network </Text>
                        </View>
                    </View>



                    {/* customer */}
                    <View style={[styles.details_row, {
                        alignItems: "flex-start"
                    }]} >

                        <Text
                            style={styles.details_heading}
                        >Customer:</Text>

                        <View style={{
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: 10
                        }}>
                            <Text style={styles.details_value} >John Doe </Text>

                            <Text style={[styles.details_value, {
                                fontFamily: "Sora_300Light"
                            }]} >johndoe@gmail.com</Text>

                            <Text style={[styles.details_value, {
                                fontFamily: "Sora_300Light"
                            }]} >0812 345 6789</Text>
                        </View>
                    </View>



                    {/* Processed By */}
                    <View style={styles.details_row} >

                        <Text
                            style={styles.details_heading}
                        >Processed By:</Text>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10
                        }}>
                            <Text style={styles.details_value} >Alex Smith</Text>
                        </View>
                    </View>


                    {/* Amount paid */}
                    <View style={styles.details_row} >

                        <Text
                            style={styles.details_heading}
                        >Amount Paid:</Text>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10
                        }}>
                            <Text style={[styles.details_value, {
                                fontFamily: "Sora_600SemiBold",
                                fontSize: scaleFont(20)
                            }]} >₦ {currentTransaction?.amount}</Text>
                        </View>
                    </View>



                    {/* Our Fee */}
                    <View style={styles.details_row} >

                        <Text
                            style={styles.details_heading}
                        >Our Fee:</Text>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10
                        }}>

                            <Text style={[styles.details_value, {
                                fontSize: scaleFont(20)
                            }]} >

                                <Text
                                    style={{
                                        fontFamily: "Sora_600SemiBold",
                                    }}
                                >₦ {currentTransaction?.amount && (0.2 * Number(currentTransaction?.amount))}</Text>

                                <Text
                                    style={{
                                        fontFamily: "Sora_300Light",
                                        fontSize: scaleFont(17),
                                    }}
                                > (2%)</Text>
                            </Text>
                        </View>
                    </View>


                    {/* Gas fee  */}
                    <View style={[styles.details_row, {
                        borderBottomWidth: 0,
                    }]} >

                        <Text
                            style={styles.details_heading}
                        >Gas Fee:</Text>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10
                        }}>

                            <Text style={[styles.details_value, {
                                fontSize: scaleFont(20)
                            }]} >

                                <Text
                                    style={{
                                        fontFamily: "Sora_600SemiBold",
                                    }}
                                >₦ 0</Text>

                                <Text
                                    style={{
                                        fontFamily: "Sora_300Light",
                                        fontSize: scaleFont(17),
                                    }}
                                > (absorbed)</Text>
                            </Text>
                        </View>
                    </View>


                </View>



                {/* Net amount  */}
                <View style={styles.net_amount_wrapper} >
                    <Text style={styles.net_amount_label} >Net Amount</Text>

                    <Text style={styles.net_amount_value} >₦ 8330</Text>
                </View>


                {/* blockchain details */}
                <View style={styles.blockchain_wrapper} >

                    {/* Blockchain Network */}
                    <View style={styles.blockchain_wrapper_row} >

                        <Text style={styles.blockchain_wrapper_label} >
                            Blockchain Network: </Text>


                        <Text style={styles.blockchain_wrapper_value} >
                            Tron
                        </Text>

                    </View>

                    {/* Transaction Hash */}
                    <View style={styles.blockchain_wrapper_row} >

                        <Text style={styles.blockchain_wrapper_label} >
                            Transaction Hash: </Text>


                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10
                        }} >
                            <Text style={styles.blockchain_wrapper_value} > 0×1234....5678 </Text>

                            <Pressable>
                                <Ionicons
                                    name="copy-outline"
                                    size={14.4}
                                    color={"#1E1E1E"}
                                />
                            </Pressable>
                        </View>

                    </View>


                    {/* Confirmations */}
                    <View style={styles.blockchain_wrapper_row} >

                        <Text style={styles.blockchain_wrapper_label} >
                            Confirmations: </Text>


                        <Text style={styles.blockchain_wrapper_value} >
                            12 Confirmations
                        </Text>

                    </View>


                    {/*Block number   */}
                    <View style={styles.blockchain_wrapper_row} >

                        <Text style={styles.blockchain_wrapper_label} >
                            Block Number: </Text>


                        <Text style={styles.blockchain_wrapper_value} >
                            4567801
                        </Text>

                    </View>

                </View>



                {/* View on TronScan button  */}
                <Pressable style={styles.tronscan_btn} >
                    <Text style={styles.tronscan_text} >View on TronScan</Text>
                </Pressable>


                <View style={styles.utilities_btn_wrapper} >
                    <Pressable style={styles.utilities_btn} >
                        <Ionicons
                            name="share-social-outline"
                            size={20}
                            color={"#1E1E1E"} />
                        <Text style={styles.utilities_btn_text} >Share Receipt</Text>
                    </Pressable>


                    <Pressable style={styles.utilities_btn} >
                        <Ionicons
                            name="print"
                            size={20}
                            color={"#1E1E1E"} />
                        <Text style={styles.utilities_btn_text} >Print Receipt</Text>
                    </Pressable>
                </View>


                <View style={styles.utilities_btn_wrapper} >
                    <Pressable style={styles.utilities_btn} >
                        <Ionicons
                            name="return-up-back-outline"
                            size={20}
                            color={"#1E1E1E"} />
                        <Text style={styles.utilities_btn_text} >Issue Refund</Text>
                    </Pressable>


                    <Pressable style={styles.utilities_btn} >
                        <Ionicons
                            name="alert-circle-outline"
                            size={20}
                            color={"#1E1E1E"} />
                        <Text style={styles.utilities_btn_text} >Report Issue</Text>
                    </Pressable>
                </View>



            </ScrollView>



        </View >
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        width: "100%"
    },

    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
        paddingHorizontal: scaleHorizontalPadding(13),
        paddingTop: scaleVerticalPadding(12),
    },

    heading: {
        color: "#10182A",
        fontFamily: "PlusJakartaSans_500Medium",
        fontSize: scaleFont(18),
    },

    main_content: {
        backgroundColor: "#D3D8E7",
        flexGrow: 1,
        paddingVertical: scaleVerticalPadding(8),
        paddingHorizontal: scaleHorizontalPadding(15),
        alignItems: "stretch",
        gap: 17,
        paddingBottom: scaleVerticalPadding(20)
    },

    label: {
        borderRadius: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        paddingVertical: scaleVerticalPadding(10),
    },

    label_text: {
        color: "#ffffff",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(24)
    },

    details_wrapper: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: scaleHorizontalPadding(15),
        alignItems: "center",
        gap: 10
    },


    details_row: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: "#B3B3B3",
        paddingVertical: scaleVerticalPadding(8)
    },

    details_heading: {
        color: "#10182AB2",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular"
    },


    details_value: {
        color: "#000000",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular"
    },

    net_amount_wrapper: {
        width: "100%",
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#B3B3B3",
        borderRadius: 10,
        padding: scaleHorizontalPadding(20),
        flexDirection: "row"
    },

    net_amount_label: {
        color: "#10182A",
        fontSize: scaleFont(17),
        fontFamily: "Sora_400Regular"
    },

    net_amount_value: {
        color: "#10182A",
        fontSize: scaleFont(20),
        fontFamily: "PlusJakartaSans_600SemiBold"
    },


    blockchain_wrapper: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: scaleHorizontalPadding(15),
        alignItems: "center",
        gap: 10
    },

    blockchain_wrapper_row: {
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: "#B3B3B3",
        paddingVertical: 10
    },

    blockchain_wrapper_label: {
        color: "#10182AB2",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular"
    },

    blockchain_wrapper_value: {
        color: "#000000",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular"
    },


    tronscan_btn: {
        width: "auto",
        marginHorizontal: "auto"
    },

    tronscan_text: {
        color: "#253E86",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(14)
    },

    utilities_btn_wrapper: {
        width: "93%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginHorizontal: "auto"
    },

    utilities_btn: {
        backgroundColor: "#FFFFFF",
        padding: scaleHorizontalPadding(10),
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        borderRadius: 5,
        flexDirection: "row",
        borderWidth: 0.5,
        borderColor: "#B3B3B3",
        width: "45%"
    },


    utilities_btn_text: {
        color: "#000000",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular"
    }





})