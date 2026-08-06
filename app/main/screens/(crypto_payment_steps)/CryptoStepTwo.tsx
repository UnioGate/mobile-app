
import { getSalesById, setSaleToConfirm } from "@/api/sales.api";
import LogoReveal from "@/components/LogoReveal";
import { useSaleCountdown } from "@/hooks/useCountdown";
import { useSaleStore } from "@/stores/saleStore";
import { useWalletStore } from "@/stores/WalletStore";
import { updateSaleStatus } from "@/types/types";
import { showErrorToast, showSuccessToast } from "@/utils/toastConfig";
import { maskAddress, scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import * as Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { MainStackParamList } from "../../type";




type NavigationProp = NativeStackNavigationProp<
    MainStackParamList,
    'sales',
    'stepOne'
>;


export default function CryptoStepTwo() {
    const navigation = useNavigation<NavigationProp>();
    const { width } = useWindowDimensions();

    const {
        saleResponse,
        sale,
        isTimeOut,
        setIsTimeOut,
        pollResponse,
        resetSale } = useSaleStore();

    const selectedCoin = sale.currency;
    const { rate, fetchRates } = useWalletStore()
    const [confirming, setConfirming] = useState(false)
    const timeLeft = useSaleStore((s) => s.timeLeft);
    const isFocused = useIsFocused()
    useSaleCountdown()

    // this useEffect fetches the current exchange rate
    useEffect(() => {
        fetchRates()
    }, [])



    // this handles the polling functionality on the frontend
    useEffect(() => {
        const saleId = saleResponse?.id;
        if (!saleId) return;

        const pollInterval = setInterval(async () => {
            const response = await getSalesById(saleId);

            if (!response.ok) {
                // Don't stop polling on a transient network error - just skip this tick.
                console.error(response.error);
                return;
            }

            const pollResponse = response.sale;

            // re-renders with the fresh data.
            useSaleStore.getState().setPollResponse(pollResponse); // update this line, instead of using the saleResponse, create another state for the poll response
            console.log("updated sales data:", pollResponse)

            if (pollResponse.status === "confirmed") {
                clearInterval(pollInterval);
                resetSale()
                navigation.navigate("CryptoSuccess");
            } else if (pollResponse.status === "expired") {
                clearInterval(pollInterval);
                setIsTimeOut(true);
            }
        }, 4000); // every 4s - the sale window is 10 minutes, no need to hammer the API

        // Cleanup: stop polling if the user navigates away from this screen
        // before the sale resolves.
        return () => clearInterval(pollInterval);
    }, [saleResponse?.id, isFocused]);



    // this handles the copy functionality
    const copyAddress = async () => {
        await Clipboard.setStringAsync(saleResponse?.walletAddress ?? "");
        showSuccessToast("Wallet address copied!")
    };



    // this function cancels a sale and navigates to the home screen
    const cancelSale = () => {

        resetSale()
        navigation.navigate("overview")
    }


    // this function updates a transaction status to completed
    const updateStatus = async () => {

        setConfirming(true)

        try {

            if (!pollResponse) {
                showErrorToast("No poll data available")
                return;
            }

            const payload: updateSaleStatus = {
                amountPaid: pollResponse && (Number(pollResponse?.amount) + 50).toString(),
                txHash: pollResponse?.cryptoTxHash ?? "nohashwasavailbale"
            }

            const response = await setSaleToConfirm(pollResponse?.id, payload)

            if (!response.ok || !response.sale) {
                showErrorToast("failed to update status", response.error)
                return
            }

            showSuccessToast("Status updated successfully!")
            useSaleStore.getState().setPollResponse(response.sale)
            resetSale()
            navigation.replace("CryptoSuccess")


        } catch (error) {
            if (axios.isAxiosError(error)) {
                showErrorToast(
                    error.response?.data?.message ??
                    error.message
                );
                console.log("Status:", error.response?.status);
                console.log("Response Data:", error.response?.data);
                console.log("Response Headers:", error.response?.headers);
                console.log("Request Config:", error.config);
            }
            showErrorToast("Something went wrong");
            console.error(error)
        }

        finally {
            setConfirming(false)
        }
    }




    if (sale.currency !== "USDT" && sale.currency !== "USDC") {
        return null;
    }

    const currentRateInNGN = rate.rates[sale?.currency ?? "USDT"].NGN



    return (

        <View style={styles.container}>

            <View style={styles.content}>

                {/* The header */}
                <View style={styles.header} >

                    <Pressable
                        aria-label="back-button"
                        onPress={() => {
                            isTimeOut ? navigation.replace("sales") : navigation.goBack()
                        }}
                    >
                        <Ionicons name="chevron-back" size={22} color="#10182A" />
                    </Pressable>


                    <Text style={styles.heading} >
                        Crypto Payment
                    </Text>



                    <Text
                        style={[styles.timeLeft, {
                            color: isTimeOut ? "#FF0707" : "#253E86",
                        }]}
                    >
                        {timeLeft.minutes}:{timeLeft.seconds}
                    </Text>
                </View>


                {isTimeOut ? (
                    <View style={styles.timeout_wrapper} >

                        <Ionicons name="warning" color={"#FF0707"} size={63} />

                        <Text style={styles.timeout_heading} >TIMEOUT</Text>

                        <TouchableOpacity
                            onPress={() => navigation.replace("sales")}
                            style={[styles.button, {
                                width: "auto",
                                padding: scaleHorizontalPadding(10),
                                paddingVertical: scaleVerticalPadding(10),
                                marginTop: 7,
                                borderColor: "#253E86"
                            }]}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.buttonText, {
                                color: "#000000",
                                fontSize: scaleFont(20)
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
                                <Text style={styles.network_text} >
                                    {sale.network && sale.network[0].toUpperCase() + sale.network.slice(1)} </Text>


                                {/* amount display  */}
                                <View style={styles.amount_display} >
                                    <Text style={styles.amount_text} >₦{Number(saleResponse?.amount).toLocaleString()} </Text>

                                    <View style={styles.exchange_rate} >
                                        <Text style={styles.equivalent} >
                                            {(Number(sale.amount) / currentRateInNGN).toFixed(2)}
                                            {" "}
                                            {sale.currency}</Text>
                                        <Text style={styles.rate} >1 {sale.currency} = ₦{currentRateInNGN}</Text>
                                    </View>
                                </View>


                                {/* QR code display  */}
                                <View style={styles.qr_wrapper} >


                                    <Image
                                        source={{
                                            uri: saleResponse?.qrCode,
                                        }}
                                        style={[styles.qr_box, {
                                            width: Math.min(width * 0.65, 320)
                                        }]}
                                    />

                                    <Text style={styles.qr_text} >Scan to Pay
                                    </Text>
                                </View>


                                {/* wallet address display */}
                                <View style={styles.wallet_address_wrapper} >
                                    <Text style={styles.Wallet_address_wrapper_text} >Or copy address</Text>

                                    <View style={styles.address_container} >
                                        <Text style={styles.wallet_address} >
                                            {maskAddress(saleResponse?.walletAddress ?? '')}</Text>

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
                                        name={pollResponse?.status === "confirmed" ? "checkmark-circle" : "alert-circle"}
                                        size={23}
                                        color={pollResponse?.status === "confirmed" ? "#009A49" : pollResponse?.status === "expired" ? "#FF0707" : "#253E86"}
                                    />

                                    {pollResponse?.status === "pending" ? (
                                        <View style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: 10
                                        }} >
                                            <Text style={styles.status_text} >Waiting for payment...</Text>
                                            <LogoReveal />
                                        </View>)
                                        : pollResponse?.status === "confirmed" ? (
                                            <View style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: 10
                                            }} >
                                                <Text style={styles.status_text} >Payment detected, Confirming...</Text>
                                                <LogoReveal />
                                            </View>
                                        )
                                            :
                                            (
                                                <View style={{
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    gap: 10
                                                }} >
                                                    <Text style={styles.status_text} >Payment detected, Confirming...</Text>
                                                    <LogoReveal />
                                                </View>
                                            )
                                    }
                                </View>


                            </ScrollView>

                            <TouchableOpacity
                                onPress={cancelSale}
                                style={styles.button}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.buttonText} > Cancel Payment</Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={updateStatus}
                                style={styles.button}
                                activeOpacity={0.7}
                                disabled={confirming}
                            >
                                {confirming ? (
                                    <ActivityIndicator />
                                )
                                    : (
                                        <Text style={styles.buttonText} > Confirm payment</Text>
                                    )
                                }
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

    timeLeft: {
        fontSize: scaleFont(14),
        fontFamily: "PlusJakartaSans_500Medium"
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
        gap: 10

    },

    qr_box: {
        height: 200,
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