import { resolveBankAcct } from "@/api/bank-accounts.api";
import { withdrawBank } from "@/api/withdraw.api";
import { UseBankAccountStore } from "@/stores/bankStore";
import { useSaleStore } from "@/stores/saleStore";
import { useTierStore } from "@/stores/tierStore";
import { useWalletStore } from "@/stores/WalletStore";
import { bankAccountResolveBody, BankWithdrawRequest, myAccount } from "@/types/types";
import { showErrorToast, showSuccessToast } from "@/utils/toastConfig";
import { formatBalance, scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { MainStackParamList } from "../type";

type NavigationProp = NativeStackNavigationProp<
    MainStackParamList
>;


export default function Withdraw() {
    const navigation = useNavigation<NavigationProp>();
    const { walletBalance } = useWalletStore()
    const [withdrawalAmount, setWithdrawalAmount] = useState("")
    const [processing, setProcessing] = useState(false)
    const { tierDetails } = useTierStore()
    const [selectedAccount, setSelectedAccount] = useState<myAccount | null>(null)
    const [fetchingName, setFetchingName] = useState(false)
    const { accountDetails } = useSaleStore()
    const accounts = UseBankAccountStore((s) => s.accounts)


    console.log(accounts)

    // with the parsed details available, we can then resolve to get the account name and bank name
    useEffect(() => {

        const getBankDetails = async () => {
            if (!accounts || !selectedAccount) return;

            setFetchingName(true)

            try {

                const payload: bankAccountResolveBody = {
                    accountNumber: selectedAccount.accountNumber,
                    bankCode: selectedAccount.bank
                }


                console.log("Resolving account:", payload);

                const response = await resolveBankAcct(payload);

                if (!response.ok) {
                    console.error("Failed to fetch bank account details:", response.error)
                    return;
                }

                useSaleStore.getState().setAccountDetail({
                    accountName: response.accountName,
                    accountNumber: response.accountNumber,
                    bank: selectedAccount.accountName,
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
                setFetchingName(false)
            }
        }

        getBankDetails()

    }, [selectedAccount?.bank])



    // submission function
    const submit = async () => {
        if (!withdrawalAmount) {
            showErrorToast("Please enter an amount");
            return;
        }

        if (Number(withdrawalAmount) > Number(walletBalance)) {
            showErrorToast("Insufficient balance. Please enter a lower amount.");
            return;
        }


        if (Number(withdrawalAmount) > Number(tierDetails?.dailyWithdrawalLimit)) {
            showErrorToast("Withdrawal amount exceeds your daily withdrawal limit.");
            return;
        }

        if (Number(withdrawalAmount) > Number(tierDetails?.monthlyWithdrawalLimit)) {
            showErrorToast("Withdrawal amount exceeds your monthly withdrawal limit.");
            return;
        }

        // then add validation for the amount left


        setProcessing(true)

        try {

            const payload: BankWithdrawRequest = {
                amount: withdrawalAmount,
                bankAccountId: selectedAccount?.id ?? "",
                walletId: ""
            }


            const response = await withdrawBank(payload)

            if (!response?.ok) {
                console.error("Failed to place withdrawal", response.error);
                showErrorToast(response.error)
                return;
            }

            console.log(response);
            showSuccessToast(response.message)
            useWalletStore.setState({
                walletBalance: response.newBalance
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
            setProcessing(false)
        }
    }


    return (
        <View style={styles.container} >


            {/* The header */}
            <View style={styles.header} >

                <Pressable
                    aria-label="back-button"
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={22} color="#10182A" />
                </Pressable>


                <Text style={styles.heading} >
                    Withdraw funds
                </Text>


                <Text></Text>

            </View>


            {/* balance */}
            <View style={styles.balance_box} >
                <Text style={styles.balance_box_heading} >Available to withdraw</Text>
                <Text style={styles.balance} >₦ {formatBalance(Number(walletBalance))} </Text>
            </View>




            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollView_container}
                showsVerticalScrollIndicator={false}
            >

                {/* Amount to withdraw section   */}
                <View style={styles.withdraw_form} >

                    {/* The amount input  */}
                    <View style={styles.amount_wrapper} >
                        <Text style={styles.amount_wrapper_heading}  >Amount to withdraw</Text>

                        {/* the amount input  */}
                        <View style={styles.amount_input_wrapper} >

                            <View style={{
                                width: "60%",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 2,
                            }} >
                                <Text style={styles.naira_sign} >₦</Text>
                                <TextInput
                                    keyboardType="number-pad"
                                    style={styles.text_input}
                                    value={withdrawalAmount}
                                    onChangeText={(value) => {
                                        setWithdrawalAmount(value)
                                    }}
                                />
                            </View>

                            <TouchableOpacity
                                onPress={submit}
                                disabled={processing}
                                activeOpacity={0.7}
                                style={styles.amount_wrapper_button} >
                                {processing ? (
                                    <ActivityIndicator color="#ffffff" />
                                ) : (
                                    <Text style={styles.amount_wrapper_button_text} >
                                        Withdraw
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>


                        {/* The fee */}
                        <Text style={styles.fee} >Fee:
                            <Text style={{
                                fontFamily: "Sora_600SemiBold"
                            }}> ₦ 0</Text>
                        </Text>


                        {/* The line break */}
                        <View style={styles.hr} />


                        {/* save account button */}
                        <Pressable>
                            <Text style={styles.save_button_text} >Saved bank account</Text>
                        </Pressable>

                        {/* Account details  */}
                        <View style={styles.account_details_wrapper} >

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "flex-start",
                                    gap: 8
                                }}
                            >
                                <Image
                                    source={{ uri: "https://res.cloudinary.com/dwedz2laa/image/upload/v1777704436/mtsddnvmqt1qlijnqvhh.png" }}
                                    style={{ width: 20, height: 20 }}
                                    resizeMode="cover"
                                />

                                <View style={{
                                    gap: 8
                                }}>
                                    <Text style={styles.account_number} >{accountDetails?.bank}  </Text>
                                    <Text style={styles.account_number} >{accountDetails?.accountNumber} </Text>
                                    <Text style={styles.account_name} > {accountDetails?.accountName} </Text>
                                </View>
                            </View>


                            <Pressable style={styles.change_bank_button} >

                                <Text style={[styles.save_button_text, {
                                    color: "#253E86",
                                    fontSize: scaleFont(10),
                                    fontFamily: "Sora_600SemiBold"
                                }]} >Change Bank</Text>

                                <Ionicons name="chevron-forward" color={"#253E86"} size={11} />
                            </Pressable>
                        </View>


                        {/* note input  */}
                        {/* <View style={styles.amount_input_wrapper} >

                            <TextInput
                                keyboardType="default"
                                style={[styles.text_input, {
                                    color: "#808080",
                                    fontSize: 12,
                                    textAlign: "center"
                                }]}
                                placeholder="Add note (optional)"
                            />


                        </View> */}

                    </View>

                </View>


                <View style={styles.amount_breakdown}  >

                    <View style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 10,
                        paddingVertical: 8
                    }} >
                        <Text style={styles.amount_breakdown_row_heading} >Withdrawal Amount</Text>
                        <Text style={styles.amount_breakdown_row_value} >₦ {withdrawalAmount}</Text>
                    </View>


                    <View
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row",
                            gap: 10,
                            paddingVertical: 8,
                            borderTopWidth: 0.5,
                            borderBottomWidth: 0.5,
                            borderColor: "#B3B3B3"
                        }}
                    >
                        <Text style={styles.amount_breakdown_row_heading} >Total to Receive</Text>
                        <Text style={styles.amount_breakdown_row_value}>₦ 0</Text>
                    </View>


                    <View
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row",
                            gap: 10,
                            paddingVertical: 8
                        }}
                    >
                        <Text style={styles.amount_breakdown_row_heading}>Funds arrive in 5 -30 minutes</Text>
                    </View>

                </View>


                {/* Limit error */}
                {/* <View style={styles.limit} >

                    <Ionicons
                        name="alert-circle"
                        size={23}
                        color={"#FF070B"}
                    />

                    <Text style={styles.limit_text} >You have ₦0 remaining in your daily limit</Text>
                </View> */}


                {/* note */}
                <View style={styles.note} >
                    <Text style={styles.note_text} >You’ll receive an OTP to confirm this withdrawal</Text>
                </View>


                {/* Buttons */}
                <View style={styles.button_wrapper} >

                    <TouchableOpacity style={[styles.button]} >
                        <Text style={[styles.button_text, {
                            color: "#253E86"
                        }]} >Cancel</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => navigation.navigate("withdraw_initiated")}
                        style={[styles.button, {
                            backgroundColor: "#253E86"
                        }]} >
                        <Text style={[styles.button_text, {
                            color: "#ffffff"
                        }]} >Withdraw 0</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView >



        </View >
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9ECF3',
        display: "flex",
        flexDirection: "column",
        gap: 17,
        paddingHorizontal: scaleHorizontalPadding(15),
        paddingBottom: scaleVerticalPadding(15),
        paddingTop: scaleVerticalPadding(10),
    },

    scrollView_container: {
        display: "flex",
        alignItems: "stretch",
        flexDirection: "column",
        gap: 17,
        width: "100%"
    },

    header: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },

    heading: {
        color: "#10182A",
        fontFamily: "PlusJakartaSans_500Medium",
        fontSize: scaleFont(22)
    },

    balance_box: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 18,
        alignItems: "center",
        justifyContent: "center",
        gap: 8
    },

    balance_box_heading: {
        color: "#808080",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular"
    },

    balance: {
        color: "#10182A",
        fontSize: scaleFont(32),
        fontFamily: "Sora_600SemiBold"
    },

    withdraw_form: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 18,
        alignItems: "center",
        justifyContent: "center",
        gap: 4
    },

    amount_wrapper: {
        width: "100%",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 4
    },

    amount_wrapper_heading: {
        color: "#808080",
        fontSize: scaleFont(12),
        fontFamily: "Sora_400Regular"
    },

    amount_input_wrapper: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 0.5,
        borderColor: "#B3B3B3",
        paddingHorizontal: 7,
        paddingVertical: 1,
        borderRadius: 5
    },

    amount_wrapper_button: {
        backgroundColor: "#253E86",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 5
    },

    amount_wrapper_button_text: {
        color: "#ffffff",
        fontSize: scaleFont(12),
        fontFamily: "Sora_400Regular"
    },

    text_input: {
        width: "100%",
        height: "100%",
        fontSize: scaleFont(24),
        fontFamily: "Sora_400Regular",
        color: "#000000"
    },

    naira_sign: {
        fontSize: scaleFont(24),
        fontFamily: "Sora_400Regular",
        color: "#000000"
    },

    fee: {
        color: "#808080",
        fontSize: scaleFont(12),
        fontFamily: "PlusJakartaSans_600SemiBold",
        marginHorizontal: "auto",
        marginVertical: 4,
    },

    hr: {
        width: "100%",
        height: 1,
        backgroundColor: "#E0E0E0",
        marginVertical: 10,
    },

    save_button_text: {
        color: "#808080",
        fontSize: scaleFont(12),
        fontFamily: "Sora_400Regular"
    },

    account_details_wrapper: {
        borderColor: "#B3B3B3",
        borderWidth: 0.5,
        width: "100%",
        padding: 13,
        paddingHorizontal: 8,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 15,
        gap: 10
    },

    change_bank_button: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },

    account_number: {
        color: "#000000",
        fontSize: scaleFont(13),
        fontFamily: "Sora_400Regular"
    },

    account_name: {
        color: "#514B4B",
        fontSize: scaleFont(10),
    },

    amount_breakdown: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 18,
        gap: 8
    },

    amount_breakdown_row_heading: {
        color: "#808080",
        fontSize: scaleFont(12),
        fontFamily: "Sora_400Regular"
    },

    amount_breakdown_row_value: {
        fontSize: 20,
        color: "#000000",
        fontFamily: "Sora_400Regular"
    },

    note: {
        paddingVertical: 13,
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 0.7,
        borderBottomWidth: 0.7,
        borderColor: "#727171"
    },

    note_text: {
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(13),
        color: "#727171"
    },


    button_wrapper: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16
    },

    button: {
        width: "47%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#253E86",
        marginBottom: 20
    },

    button_text: {
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(13),
    },


    limit: {
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 4px 4px 0px #00000040",
        width: "97%",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },

    limit_text: {
        color: "#FF070B",
        fontSize: scaleFont(13),
        fontFamily: "Sora_400Regular",
    }



})

