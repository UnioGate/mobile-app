
import LogoReveal from "@/components/LogoReveal";
import { showSuccessToast } from "@/utils/toastConfig";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MainStackParamList } from "../../type";



type NavigationProp = NativeStackNavigationProp<
    MainStackParamList,
    'sales',
    'stepOne'
>;



export default function CryptoStepTwo() {
    const navigation = useNavigation<NavigationProp>();
    const [timeOut, setTimeout] = useState(false)
    const [selectedCoin, setSelectedCoin] = useState("CNGN")
    const walletAddress = "TRX1234567890ABCDEFGHIJKLMN90";

    const copyAddress = async () => {
        await Clipboard.setStringAsync(walletAddress);
        showSuccessToast("Copied!")
    };


    return (

        <View style={styles.container}>

            <View style={styles.content}>

                {/* The header */}
                <View style={styles.header} >

                    <Pressable
                        aria-label="back-button"
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="chevron-back" size={22} color="#10182A" />
                    </Pressable>


                    <Text style={styles.heading} >
                        Crypto Payment
                    </Text>



                    <Text
                    >
                        10:00
                    </Text>
                </View>


                {timeOut ? (
                    <View style={styles.timeout_wrapper} >

                        <Ionicons name="warning" color={"#FF0707"} size={63} />

                        <Text style={styles.timeout_heading} >TIMEOUT</Text>

                        <TouchableOpacity
                            onPress={() => navigation.replace("sales")}
                            style={[styles.button, {
                                width: "auto",
                                padding: 10,
                                paddingVertical: 10,
                                marginTop: 7,
                                borderColor: "#253E86"
                            }]}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.buttonText, {
                                color: "#000000",
                                fontSize: 20
                            }]} > Restart Payment</Text>
                        </TouchableOpacity>
                    </View>
                )
                    :

                    (
                        <>
                            <ScrollView
                                style={{ flex: 1 }}
                                contentContainerStyle={styles.mainContent}
                                showsVerticalScrollIndicator={false} >


                                {/* stable coin display */}
                                <View style={styles.cryptoDisplayWrapper} >

                                    {/* USDT display */}
                                    <View
                                        style={[styles.item,
                                        {
                                            borderTopLeftRadius: 9999,
                                            borderBottomLeftRadius: 9999,
                                            borderRightWidth: 1,
                                            borderRightColor: "#B3B3B3",
                                            backgroundColor: selectedCoin === "USDT" ? "#253E86" : "#ffffff",
                                        }]}  >


                                        <Text style={[styles.item_text, {
                                            color: selectedCoin === "USDT" ? "#ffffff" : ""
                                        }]} >
                                            USDT
                                        </Text>


                                    </View>

                                    {/* USDC display  */}
                                    <View style={[styles.item, {
                                        backgroundColor: selectedCoin === "USDC" ? "#253E86" : "#ffffff",
                                    }]}  >
                                        <Text style={[styles.item_text, {
                                            color: selectedCoin === "USDC" ? "#ffffff" : ""
                                        }]} >
                                            USDC
                                        </Text>
                                    </View>


                                    {/* CNGN Display */}
                                    <View style={[styles.item,
                                    {
                                        borderTopRightRadius: 9999,
                                        borderBottomRightRadius: 9999,
                                        borderLeftWidth: 1,
                                        borderLeftColor: "#B3B3B3",
                                        backgroundColor: selectedCoin === "CNGN" ? "#253E86" : "",
                                    }]}  >
                                        <Text style={[styles.item_text, {
                                            color: selectedCoin === "CNGN" ? "#ffffff" : ""
                                        }]} >
                                            CNGN
                                        </Text>
                                    </View>

                                </View>


                                {/* The network display  */}
                                <Text style={styles.network_text} >Ethereum</Text>


                                {/* amount display  */}
                                <View style={styles.amount_display} >
                                    <Text style={styles.amount_text} >₦ 8,500</Text>

                                    <View style={styles.exchange_rate} >
                                        <Text style={styles.equivalent} >5.15 USDT</Text>
                                        <Text style={styles.rate} >1 USDT = ₦1,650</Text>
                                    </View>
                                </View>


                                {/* QR code display  */}
                                <View style={styles.qr_wrapper} >


                                    <Image
                                        source={{
                                            uri: "https://res.cloudinary.com/dwedz2laa/image/upload/v1781208493/zhosd1cger6rbp8pz7rp.png",
                                        }}
                                        style={styles.qr_box}
                                    />



                                    <Text style={styles.qr_text} >Scan to Pay</Text>
                                </View>


                                {/* wallet address display */}
                                <View style={styles.wallet_address_wrapper} >
                                    <Text style={styles.Wallet_address_wrapper_text} >Or copy address</Text>

                                    <View style={styles.address_container} >
                                        <Text style={styles.wallet_address} >
                                            TRX1234****************90</Text>

                                        <Pressable
                                            onPress={copyAddress}
                                        >
                                            <Ionicons
                                                name={'copy-outline'}
                                                size={20}
                                                color="#10182A"
                                            />
                                        </Pressable>
                                    </View>
                                </View>


                                <View style={styles.status} >

                                    <Ionicons
                                        name="alert-circle"
                                        size={23}
                                        color={"#253E86"}
                                    />

                                    <View style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 10
                                    }} >
                                        <Text style={styles.status_text} >Waiting for payment...</Text>
                                        <LogoReveal />
                                    </View>
                                </View>


                            </ScrollView>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("CryptoSuccess")}
                                style={styles.button}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.buttonText} > Cancel Payment</Text>
                            </TouchableOpacity>
                        </>
                    )
                }



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
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingTop: scaleVerticalPadding(10),
        flexDirection: "column",
        gap: 20
    },


    header: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },

    heading: {
        color: "#10182A",
        fontFamily: "PlusJakartaSans_500Medium",
        fontSize: scaleFont(22)
    },

    mainContent: {
        gap: 17,
        alignItems: "center",
        paddingBottom: scaleHorizontalPadding(10)
    },

    cryptoDisplayWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
        marginHorizontal: "auto"
    },

    item: {
        backgroundColor: "#ffffff",
        paddingVertical: 6,
        paddingHorizontal: 23,
        width: "33%",
        alignItems: "center",
        justifyContent: "center"
    },

    item_text: {
        color: "#10182AB2",
        fontSize: scaleFont(15),
        fontFamily: "Sora_300Light"
    },

    network_text: {
        fontSize: scaleFont(14),
        color: "#10182ACC",
        fontFamily: "Sora_400Regular"
    },

    amount_display: {
        width: "100%",
        paddingVertical: scaleVerticalPadding(10),
        borderRadius: 10,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "space-between"
    },

    amount_text: {
        color: "#10182A",
        fontSize: scaleFont(40),
        fontFamily: "Sora_400Regular",
        marginBottom: 10
    },

    exchange_rate: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 0.5,
        borderTopColor: "#E9ECF3",
        paddingVertical: scaleVerticalPadding(10),
        gap: 6
    },

    equivalent: {
        color: "#10182ACC",
        fontSize: scaleFont(20),
        fontFamily: "Sora_400Regular",
    },

    rate: {
        color: "#10182A80",
        fontSize: scaleFont(15),
        fontFamily: "Sora_400Regular",
    },

    qr_wrapper: {
        width: "100%",
        paddingVertical: scaleVerticalPadding(17),
        borderRadius: 20,
        backgroundColor: "#ffffff",
        alignItems: "center",
        gap: 15

    },

    qr_box: {
        width: 240,
        height: 240,
        backgroundColor: "#E9ECF3",
        objectFit: "cover"
    },

    qr_text: {
        color: "#000000",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(18)
    },

    wallet_address_wrapper: {
        width: "100%",
        alignItems: "flex-start",
        gap: 6,
    },

    Wallet_address_wrapper_text: {
        color: "#10182ACC",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular",
    },

    address_container: {
        width: "100%",
        borderWidth: 0.5,
        borderColor: "#10182ACC",
        backgroundColor: "#CCCCCC1A",
        borderRadius: 5,
        padding: scaleHorizontalPadding(15),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    wallet_address: {
        color: "#000000",
        fontSize: scaleFont(16),
        fontFamily: "Sora_400Regular",
    },


    status: {
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 4px 4px 0px #00000040",
        width: "97%",
        paddingVertical: scaleVerticalPadding(16),
        paddingHorizontal: scaleHorizontalPadding(16),
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },

    status_text: {
        color: "#000000",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular",
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
        marginTop: "auto"
    },

    buttonText: {
        color: "#253E86",
        fontSize: scaleFont(18),
        fontFamily: 'Sora_400Regular',
    },



    // --------------------- styles for the timeout banner  ----------------------------- //
    timeout_wrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 16
    },

    timeout_heading: {
        color: "#FF0707",
        fontSize: scaleFont(48),
        fontFamily: "Sora_400Regular",
        marginVertical: 7
    }



})