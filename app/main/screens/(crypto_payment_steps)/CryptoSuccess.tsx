
import SuccessSVG from "@/components/ui/success";
import { useSaleStore } from "@/stores/saleStore";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MainStackParamList } from "../../type";


type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList, "CryptoSuccess">;

export default function CryptoSuccess() {
    const navigation = useNavigation<OverviewNavigationProp>()
    const { pollResponse, resetSale } = useSaleStore()


    if (!pollResponse) {
        return
    }

    return (
        <View style={styles.container} >


            <ScrollView
                style={{ maxHeight: "100%" }}
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.heading} >
                    <SuccessSVG width={110} height={110} />
                    <Text style={styles.heading_text} >Payment Successful</Text>
                </View>




                <View
                    style={styles.content}
                >
                    {/* Payment summary  */}
                    <View style={styles.payment_summary_wrapper} >

                        <View style={styles.payment_summary_top} >

                            <Image
                                source={pollResponse?.paymentType === "crypto" ?
                                    (require("../../../../assets/logos/USDT.png"))
                                    :
                                    require("../../../../assets/logos/CNGN.png")
                                }
                                style={{ width: 20, height: 20, }}
                                resizeMode="contain"
                            />

                            <Text style={styles.payment_summary_top_text} >

                                {pollResponse && pollResponse.paymentType === "crypto" ? (
                                    <>
                                        {pollResponse.currency}
                                        {(pollResponse.network)}
                                    </>
                                ) : (
                                    "NGN"
                                )}

                            </Text>
                        </View>


                        {/* the center  */}
                        <View style={styles.payment_summary_center}  >
                            <Text style={styles.payment_summary_center_amount}  >₦{Number(pollResponse?.amountPaid).toLocaleString()} </Text>

                            {pollResponse.paymentType === "crypto" ? (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 8
                                    }}
                                >
                                    <Ionicons name="checkmark-circle" color={"#009A49"} size={20} />
                                    <Text style={styles.payment_summary_center_subtext} >Received 5.15 USDT</Text>
                                </View>
                            ) :
                                (
                                    null
                                )}
                        </View>


                        <View style={styles.payment_summary_bottom} >
                            <Text style={styles.payment_summary_bottom_text} >Fee: ₦{Number(pollResponse.amountPaid) - Number(pollResponse.amount)} </Text>
                            <Text style={styles.payment_summary_bottom_text}>Net: ₦{Number(pollResponse.amount).toLocaleString()} </Text>
                        </View>


                    </View>


                    {/* Transaction details block  */}
                    <View style={styles.transaction_block} >
                        <View style={styles.transaction_block_flex} >
                            <Text style={styles.transaction_details_text} >Transaction ID:</Text>
                            <Text
                                numberOfLines={1}
                                adjustsFontSizeToFit
                                style={styles.transaction_details_bold} >{pollResponse.initiatorId}</Text>
                        </View>


                        <Text style={styles.transaction_details_bold} >
                            {new Date(pollResponse.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}{" "}
                            at{" "}
                            {new Date(pollResponse.createdAt).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                            })}
                        </Text>

                        <View style={styles.transaction_block_flex}>
                            <Ionicons name="person" color={"#10182AB2"} size={16} />
                            <Text style={styles.transaction_details_text}>John Doe </Text>

                            {/* The dot  */}
                            <View
                                style={{
                                    width: 3,
                                    height: 3,
                                    borderRadius: 3,
                                    backgroundColor: '#1E1E1E',
                                }}
                            />

                            <Text style={styles.transaction_details_phoneNumber} >0812 345 6789</Text>
                        </View>

                    </View>


                    {/* New sale button */}
                    <TouchableOpacity
                        style={[styles.button, {
                            backgroundColor: "#253E86",
                            marginVertical: 20
                        }]}
                        activeOpacity={0.7}
                        onPress={() => {
                            resetSale()
                            navigation.replace("sales")
                        }}
                    >
                        <Text style={[styles.buttonText, {
                            color: "#ffffff"
                        }]} > New Sale</Text>
                    </TouchableOpacity>




                    {/* Utility buttons  */}
                    <View style={styles.utility_button_wrapper} >
                        <Pressable style={[styles.utility_button, {
                            // iOS shadow
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,

                            // Android shadow
                            elevation: 5,
                        }]} >
                            <Ionicons name="share-social-outline" size={20} color={"#1E1E1E"} />
                            <Text style={styles.utility_button_text} >Share Receipt</Text>
                        </Pressable>


                        <Pressable style={styles.utility_button}>
                            <Ionicons name="print" size={20} color={"#1E1E1E"} />
                            <Text style={styles.utility_button_text}>Print Receipt</Text>
                        </Pressable>
                    </View>


                    <TouchableOpacity
                        onPress={() => {
                            resetSale()
                            navigation.replace("overview")
                        }}
                        style={[styles.button, {
                            marginVertical: 12
                        }]}
                        activeOpacity={0.7}

                    >
                        <Text style={styles.buttonText} > Done</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView >


        </View >
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E9ECF3",
    },

    content: {
        flex: 1,
        flexDirection: "column",
        gap: 10
    },

    scrollView: {
        display: "flex",
        alignItems: "stretch",
        gap: 10,
        paddingTop: scaleVerticalPadding(19),
        paddingHorizontal: scaleHorizontalPadding(19),
        flexGrow: 1
    },

    heading: {
        flexDirection: "column",
        gap: 30,
        alignItems: "center"
    },

    heading_text: {
        color: "#10182A",
        fontSize: scaleFont(20),
        fontFamily: "Sora_600SemiBold",
    },

    payment_summary_wrapper: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        alignItems: "center",
    },

    payment_summary_top: {
        paddingVertical: scaleVerticalPadding(10),
        width: "100%",
        paddingHorizontal: scaleHorizontalPadding(20),
        alignItems: "center",
        gap: 8,
        flexDirection: "row"
    },

    payment_summary_top_text: {
        color: "#000000",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular"
    },

    payment_summary_bottom: {
        paddingVertical: scaleVerticalPadding(10),
        width: "100%",
        paddingHorizontal: scaleHorizontalPadding(20),
        alignItems: "flex-start",
        gap: 6
    },

    payment_summary_bottom_text: {
        color: "#000000",
        fontSize: scaleFont(14),
        fontFamily: "Sora_300Light"
    },


    payment_summary_center: {
        paddingVertical: scaleVerticalPadding(15),
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopColor: "#B3B3B3",
        borderBottomColor: "#B3B3B3",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 12
    },

    payment_summary_center_amount: {
        fontSize: scaleFont(32),
        fontFamily: "Sora_400Regular",
        color: "#10182A"
    },

    payment_summary_center_subtext: {
        color: "#009A49",
        fontSize: scaleFont(15),
        fontFamily: "Sora_400Regular",
    },

    transaction_block: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        alignItems: "flex-start",
        paddingVertical: scaleVerticalPadding(18),
        paddingHorizontal: scaleHorizontalPadding(25),
        gap: 13,
    },

    transaction_block_flex: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },

    transaction_details_bold: {
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular",
        color: "#000000"
    },

    transaction_details_text: {
        color: "#10182AB2",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular",
    },

    transaction_details_phoneNumber: {
        color: "#000000",
        fontSize: scaleFont(14),
        fontFamily: "Sora_300Light"
    },

    button: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#253E86",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleVerticalPadding(16),
        borderRadius: 10,
        marginBottom: 11,
    },

    buttonText: {
        color: "#253E86",
        fontSize: scaleFont(18),
        fontFamily: 'Sora_400Regular',
    },

    utility_button_wrapper: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },

    utility_button: {
        backgroundColor: "#ffffff",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingVertical: scaleVerticalPadding(10),
        paddingHorizontal: scaleHorizontalPadding(20),
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#B3B3B3"
    },

    utility_button_text: {
        color: "#000000",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular"
    },

})