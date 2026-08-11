import { parseBankTransferAddress, scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { resolveBankAcct } from "@/api/bank-accounts.api";
import { getSalesById, setSaleToConfirm } from "@/api/sales.api";
import Timer from "@/components/icons/Timer";
import LogoReveal from "@/components/LogoReveal";
import TimeOutScreen from "@/components/TimeOutScreen";
import { useSaleCountdown } from "@/hooks/useCountdown";
import { useSaleStore } from "@/stores/saleStore";
import { bankAccountResolveBody, updateSaleStatus } from "@/types/types";
import { showErrorToast, showSuccessToast } from "@/utils/toastConfig";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { MainStackParamList } from "../../type";

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function BankTransfer() {
    const navigation = useNavigation<NavigationProp>();
    const bankTimeLeft = useSaleStore((s) => s.timeLeft);
    useSaleCountdown()

    const {
        saleResponse,
        resetSale,
        pollResponse,
        setIsTimeOut,
        isTimeOut,
        bankFee,
        accountDetails,
    }
        = useSaleStore();

    const [loading, setLoading] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const isFocused = useIsFocused()


    const fee = bankFee;
    const total = (fee && fee + Number(saleResponse?.amount))


    // Filter the parsed bank details from the response
    const parsed = parseBankTransferAddress(saleResponse?.walletAddress ?? "");



    // with the parsed details available, we can then resolve to get the account name and bank name
    useEffect(() => {

        const getBankDetails = async () => {
            if (!parsed) return;

            setLoading(true)

            try {

                const payload: bankAccountResolveBody = {
                    accountNumber: parsed.accountNumber,
                    bankCode: parsed.bankCode
                }

                const response = await resolveBankAcct(payload);

                if (!response.ok) {
                    console.error("Failed to fetch bank account details:")
                    return;
                }

                useSaleStore.getState().setAccountDetail({
                    accountName: response.accountName,
                    accountNumber: response.accountNumber,
                    bank: parsed.bankName,
                    id: response.accountNumber
                })

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
                setLoading(false)
            }
        }

        getBankDetails()

    }, [parsed?.bankCode])




    // this function cancels a sale and navigates to the home screen
    const cancelSale = () => {

        resetSale()
        navigation.navigate("overview")
    }



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
            useSaleStore.getState().setPollResponse(pollResponse);
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
                txHash: pollResponse?.cryptoTxHash ?? ""
            }

            const response = await setSaleToConfirm(pollResponse?.id, payload)

            if (!response.ok || !response.sale) {
                showErrorToast("failed to update status", response.error)
                return
            }

            showSuccessToast("Status updated successfully!")
            useSaleStore.getState().setPollResponse(response.sale)
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





    if (!saleResponse) {
        return null;
    }



    return (
        <View style={styles.container}>

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
                    Bank Transfer
                </Text>

                <Text
                >
                    {bankTimeLeft.minutes}:{bankTimeLeft.seconds}
                </Text>
            </View>


            {isTimeOut ? (
                <TimeOutScreen />
            ) :
                (
                    <>

                        {/* Scrollable Content */}
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={[styles.scrollContent]}
                        >

                            {/* Amount Display */}
                            <View style={styles.amountDisplay}>

                                <Text style={styles.amountText}>
                                    ₦ {(Number(saleResponse?.amount) + 50).toLocaleString()}
                                </Text>

                                <View style={styles.feeBreakdownWrapper}>
                                    <Text style={styles.feeBreakdownText}>
                                        ₦ {Number(saleResponse?.amount).toLocaleString()} + ₦{fee} fee = ₦ {total?.toLocaleString()} total
                                    </Text>
                                </View>

                            </View>


                            {/* Bank details  */}
                            <View style={styles.bank_details_wrapper} >

                                <View style={styles.detail_category}  >
                                    <Text style={styles.detail_category_title} >Bank Name</Text>

                                    <View style={{
                                        width: "auto",
                                        alignItems: "center",
                                        gap: 10,
                                        flexDirection: "row"
                                    }} >
                                        <Image
                                            source={require("../../../../assets/logos/zenith_bank_logo.png")}
                                            style={{
                                                width: 32,
                                                height: 36
                                            }}
                                        />

                                        <Text style={[styles.detail_category_value, {
                                            fontSize: scaleFont(16),
                                            filter: loading ? "blur(5px)" : "blur(0)"
                                        }]} > {accountDetails?.bank ?? "Bank name"} </Text>
                                    </View>

                                </View>


                                <View style={styles.detail_category} >
                                    <Text style={styles.detail_category_title}>Account Number</Text>
                                    <Text style={[styles.detail_category_value, {
                                        fontSize: scaleFont(24),
                                        filter: loading ? "blur(5px)" : "blur(0)"
                                    }]}>{accountDetails?.accountNumber ?? "000000000"} </Text>
                                </View>


                                <View style={styles.detail_category} >
                                    <Text style={styles.detail_category_title}>Account Name</Text>
                                    <Text style={[styles.detail_category_value, {
                                        fontSize: scaleFont(20),
                                        filter: loading ? "blur(5px)" : "blur(0)"
                                    }]}> {accountDetails?.accountName ?? "Account Name"} </Text>
                                </View>


                                <View style={[styles.detail_category, {
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderBottomWidth: 0,
                                    paddingVertical: scaleVerticalPadding(5)
                                }]} >
                                    <Text style={[styles.detail_category_value, {
                                        fontSize: scaleFont(12)
                                    }]} >Valid for 10 minutes</Text>
                                    <Timer />
                                </View>

                            </View>



                            <Text style={styles.info_text} >
                                Transfer exactly ₦ {total?.toLocaleString()} to the account above.
                                Payment will be confirmed automatically.
                            </Text>


                            {/* Status */}
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
                                    <Text style={styles.statusText} >Waiting for transfer...</Text>
                                    <LogoReveal />
                                </View>
                            </View>


                            {/* Cancel Button */}
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.button}
                                onPress={cancelSale}
                            >
                                <Text style={styles.buttonText}>
                                    Cancel
                                </Text>
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

                        </ScrollView>

                    </>
                )}
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#E9ECF3",
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingTop: scaleVerticalPadding(10),
    },

    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    heading: {
        color: "#10182A",
        fontFamily: "Sora_500Medium",
        fontSize: scaleFont(22),
    },

    scrollContent: {
        flexGrow: 1,
        paddingBottom: scaleVerticalPadding(40),
        gap: 18,
    },

    amountDisplay: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        alignItems: "center",
        paddingVertical: scaleVerticalPadding(22),
    },

    amountText: {
        color: "#10182A",
        fontSize: scaleFont(40),
        fontFamily: "Sora_400Regular",
        marginBottom: 12,
    },

    feeBreakdownWrapper: {
        width: "100%",
        borderTopWidth: 1,
        borderColor: "#D5D5D5",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: scaleVerticalPadding(16),
    },

    feeBreakdownText: {
        color: "#10182A",
        fontSize: scaleFont(15),
        fontFamily: "Sora_300Light",
    },




    bank_details_wrapper: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingVertical: scaleVerticalPadding(6),
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 3
    },

    detail_category: {
        width: "100%",
        paddingHorizontal: scaleHorizontalPadding(16),
        gap: 10,
        paddingVertical: scaleVerticalPadding(13),
        borderBottomWidth: 0.5,
        borderBottomColor: "#B3B3B3"
    },


    detail_category_title: {
        color: "#10182AB2",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular"
    },


    detail_category_value: {
        color: "#000000",
        fontFamily: "Sora_400Regular"
    },


    info_text: {
        fontSize: scaleFont(13),
        width: "100%",
        fontFamily: "Sora_400Regular",
        textAlign: "center",
        marginVertical: 16,
        lineHeight: 28
    },

    status: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        paddingVertical: scaleVerticalPadding(16),
        paddingHorizontal: scaleHorizontalPadding(16),
        flexDirection: "row",
        alignItems: "center",
        gap: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    statusText: {
        color: "#000000",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular",
    },

    button: {
        width: "100%",
        borderWidth: 0.5,
        borderColor: "#253E86",
        borderRadius: 10,
        paddingVertical: scaleVerticalPadding(16),
        alignItems: "center",
        justifyContent: "center",
        marginTop: "auto",
    },

    buttonText: {
        color: "#253E86",
        fontSize: scaleFont(18),
        fontFamily: "Sora_400Regular",
    },


});