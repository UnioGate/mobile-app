
import SuccessSVG from "@/components/ui/success";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MainStackParamList } from "../../type";


type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList, "CryptoSuccess">;

export default function CryptoSuccess() {
    const navigation = useNavigation<OverviewNavigationProp>()


    return (
        <View style={styles.container} >


            <View style={styles.content}>

                <View style={styles.heading} >
                    <SuccessSVG width={110} height={110} />
                    <Text style={styles.heading_text} >Payment Successful</Text>
                </View>




                <ScrollView
                    style={{ maxHeight: "100%" }}
                    contentContainerStyle={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Payment summary  */}
                    <View style={styles.payment_summary_wrapper} >

                        <View style={styles.payment_summary_top} >

                            <Image
                                source={require("../../../../assets/logos/USDT.png")}
                                style={{ width: 20, height: 20, }}
                                resizeMode="contain"
                            />

                            <Text style={styles.payment_summary_top_text} >USDT (Tron)</Text>
                        </View>


                        {/* the center  */}
                        <View style={styles.payment_summary_center}  >
                            <Text style={styles.payment_summary_center_amount}  >₦ 8,500</Text>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 8
                                }}
                            >
                                <Ionicons name="checkmark-circle" color={"#009A49"} size={18} />
                                <Text style={styles.payment_summary_center_subtext} >Received 5.15 USDT</Text>
                            </View>
                        </View>


                        <View style={styles.payment_summary_bottom} >
                            <Text style={styles.payment_summary_bottom_text} >Fee: ₦170 </Text>
                            <Text style={styles.payment_summary_bottom_text}>Net: ₦8330</Text>
                        </View>


                    </View>


                    {/* Transaction details block  */}
                    <View style={styles.transaction_block} >
                        <View style={styles.transaction_block_flex} >
                            <Text style={styles.transaction_details_text} >Transaction ID:</Text>
                            <Text style={styles.transaction_details_bold} >KON-202606-1234</Text>
                        </View>


                        <Text style={styles.transaction_details_bold} >Mar 6, 2026 at 2:45 PM</Text>

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




                    {/* Payment status */}
                    <View style={styles.status} >

                        <Ionicons
                            name="time-outline"
                            size={23}
                            color={"#10182AB2"}
                        />

                        <Text style={styles.status_text} >Settling to your account:
                            <Text style={styles.status_text_bold} > Today at 5 PM</Text>
                        </Text>
                    </View>

                    {/* New sale button */}
                    <TouchableOpacity
                        style={[styles.button, {
                            backgroundColor: "#253E86",
                            marginVertical: 20
                        }]}
                        activeOpacity={0.7}
                        onPress={() => navigation.replace("sales")}
                    >
                        <Text style={[styles.buttonText, {
                            color: "#ffffff"
                        }]} > New Sale</Text>
                    </TouchableOpacity>




                    {/* Utility buttons  */}
                    <View style={styles.utility_button_wrapper} >
                        <Pressable style={styles.utility_button} >
                            <Ionicons name="share-social-outline" size={20} color={"#1E1E1E"} />
                            <Text style={styles.utility_button_text} >Share Receipt</Text>
                        </Pressable>


                        <Pressable style={styles.utility_button}>
                            <Ionicons name="print" size={20} color={"#1E1E1E"} />
                            <Text style={styles.utility_button_text}>Print Receipt</Text>
                        </Pressable>
                    </View>


                    <TouchableOpacity
                        onPress={() => navigation.replace("overview")}
                        style={[styles.button, {
                            marginVertical: 12
                        }]}
                        activeOpacity={0.7}

                    >
                        <Text style={styles.buttonText} > Done</Text>
                    </TouchableOpacity>

                </ScrollView>

            </View>


        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E9ECF3",
    },

    content: {
        flex: 1,
        paddingHorizontal: 19,
        paddingTop: 19,
        flexDirection: "column",
        gap: 10
    },

    scrollView: {
        display: "flex",
        alignItems: "center",
        gap: 10,
    },

    heading: {
        flexDirection: "column",
        gap: 30,
        alignItems: "center"
    },

    heading_text: {
        color: "#10182A",
        fontSize: 20,
        fontFamily: "Sora_600SemiBold",
    },

    payment_summary_wrapper: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        alignItems: "center",
    },

    payment_summary_top: {
        paddingVertical: 10,
        width: "100%",
        paddingHorizontal: 20,
        alignItems: "center",
        gap: 8,
        flexDirection: "row"
    },

    payment_summary_top_text: {
        color: "#000000",
        fontSize: 14,
        fontFamily: "Sora_400Regular"
    },

    payment_summary_bottom: {
        paddingVertical: 10,
        width: "100%",
        paddingHorizontal: 20,
        alignItems: "flex-start",
        gap: 6
    },

    payment_summary_bottom_text: {
        color: "#000000",
        fontSize: 14,
        fontFamily: "Sora_300Light"
    },


    payment_summary_center: {
        paddingVertical: 15,
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
        fontSize: 32,
        fontFamily: "Sora_400Regular",
        color: "#10182A"
    },

    payment_summary_center_subtext: {
        color: "#009A49",
        fontSize: 15,
        fontFamily: "Sora_400Regular",
    },

    transaction_block: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        alignItems: "flex-start",
        paddingVertical: 18,
        paddingHorizontal: 25,
        gap: 13,
    },

    transaction_block_flex: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },

    transaction_details_bold: {
        fontSize: 14,
        fontFamily: "Sora_400Regular",
        color: "#000000"
    },

    transaction_details_text: {
        color: "#10182AB2",
        fontSize: 14,
        fontFamily: "Sora_400Regular",
    },

    transaction_details_phoneNumber: {
        color: "#000000",
        fontSize: 14,
        fontFamily: "Sora_300Light"
    },

    button: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#253E86",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        borderRadius: 10,
        marginBottom: 11,
    },

    buttonText: {
        color: "#253E86",
        fontSize: 18,
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
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#B3B3B3"
    },

    utility_button_text: {
        color: "#000000",
        fontSize: 14,
        fontFamily: "Sora_400Regular"
    },

    status: {
        backgroundColor: "#FFFFFF",
        width: "97%",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },

    status_text: {
        color: "#000000",
        fontSize: 14,
        fontFamily: "Sora_400Regular",
    },

    status_text_bold: {
        color: "#000000",
        fontFamily: "Sora_600SemiBold"
    },



})