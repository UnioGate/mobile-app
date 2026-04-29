import SuccessSVG from "@/components/success";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";




export default function CryptoSuccess() {
    return (
        <View style={styles.container} >


            <View style={styles.content}>

                <View style={styles.heading} >
                    <SuccessSVG width={110} height={110} />
                    <Text style={styles.heading_text} >Payment Successful</Text>
                </View>


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


                {/* Transaction block  */}
                <View style={styles.transaction_block} >
                    <Text>chinedu</Text>
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
                        marginTop: 6
                    }]}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("cryptoStepTwo")}
                >
                    <Text style={[styles.buttonText, {
                        color: "#ffffff"
                    }]} > New Sale</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("CryptoSuccess")}
                    style={styles.button}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText} > Done</Text>
                </TouchableOpacity>
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
        gap: 22
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
        paddingHorizontal: 25
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
        marginTop: "auto"
    },

    buttonText: {
        color: "#253E86",
        fontSize: 18,
        fontFamily: 'Sora_400Regular',
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
    }

})
