import { deleteAccount } from "@/api/bank-accounts.api";
import LogoReveal from "@/components/LogoReveal";
import { UseBankAccountStore } from "@/stores/bankStore";
import { showErrorToast, showSuccessToast } from "@/utils/toastConfig";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { useState } from "react";
import { Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Divider } from "react-native-paper";
import { MainStackParamList } from "../type";


type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function BankAccount() {
    const navigation = useNavigation<OverviewNavigationProp>()
    const [deletingID, setDeletingID] = useState<string | null>(null)
    const [fetchingAccounts, setFetchingAccts] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const fetchAccounts = UseBankAccountStore((s) => s.fetchAccounts)
    const accounts = UseBankAccountStore((s) => s.accounts)



    // delete bank accts
    const deleteBankAccount = async (id: string) => {

        if (!accounts) {
            return;
        }

        try {

            setDeletingID(id)

            const response = await deleteAccount(id)

            if (!response.ok) {
                showErrorToast(response.error)
                return;
            }


            showSuccessToast(response.message)
            fetchAccounts()


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
            setDeletingID(null)
        }
    }




    // refresh functionality
    // This handles the screen refresh function
    const onRefresh = () => {

        setRefreshing(true)

        fetchAccounts()

        setRefreshing(false)
    }




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
                    Bank Account
                </Text>


                <Pressable
                    onPress={() => navigation.navigate("add_bank_account")}
                >
                    <Text
                        style={{
                            color: "#253E86",
                            fontSize: scaleFont(12),
                            fontFamily: "PlusJakartaSans_500Medium"
                        }}
                    >Add Account</Text>
                </Pressable>

            </View>





            {/* main content  */}
            {fetchingAccounts ? (
                <>
                    <ScrollView
                        style={{ flex: 1, width: "100%" }}
                        contentContainerStyle={[, {
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }]}
                        showsVerticalScrollIndicator={false}

                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        <LogoReveal backgroundColor="#D3D8E7" />
                    </ScrollView>
                </>
            ) : accounts.length < 1 ? (
                <>

                    <ScrollView
                        style={{ flex: 1, width: "100%" }}
                        contentContainerStyle={[, {
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }]}
                        showsVerticalScrollIndicator={false} >
                        <Text style={{
                            color: "#000000",
                            fontFamily: "Sora_600SemiBold",
                            fontSize: scaleFont(14),
                        }}>No bank accounts have been saved yet.</Text>
                    </ScrollView>

                </>
            )

                : (
                    <ScrollView
                        style={{ flex: 1, width: "100%" }}
                        contentContainerStyle={styles.scrollView_style}
                        showsVerticalScrollIndicator={false}


                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >

                        <View style={{
                            gap: 10
                        }}
                        >

                            {accounts.map((acct) => (
                                <View
                                    key={acct.id}
                                    style={{
                                        backgroundColor: "#ffffff",
                                        borderRadius: 10,
                                        paddingVertical: scaleVerticalPadding(10),
                                        paddingHorizontal: scaleHorizontalPadding(15)
                                    }} >


                                    {/* Bank name  */}
                                    <View style={{
                                        width: "100%",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        flexDirection: "row",
                                        paddingVertical: scaleVerticalPadding(7),
                                        paddingTop: scaleVerticalPadding(1)
                                    }} >

                                        <View style={{
                                            alignItems: "flex-start",
                                            justifyContent: "space-between",
                                            flexDirection: "row",
                                            gap: 10,
                                        }} >
                                            <Image
                                                source={require("../../../assets/logos/GTBank_logo.svg.png")}
                                                style={{
                                                    height: 20,
                                                    width: 20
                                                }}
                                            />

                                            <View style={{
                                                gap: 9,
                                            }} >
                                                <Text style={{
                                                    color: "#000000",
                                                    fontFamily: "Sora_600SemiBold",
                                                    fontSize: scaleFont(14),
                                                }} > {acct.accountName} </Text>

                                                <Text style={{
                                                    color: "#10182AB2",
                                                    fontSize: scaleFont(12),
                                                    fontFamily: "Sora_300Light"
                                                }} > {acct.accountNumber} </Text>
                                            </View>
                                        </View>

                                        <View style={{
                                            backgroundColor: "#199C1E33",
                                            borderRadius: 7,
                                            paddingVertical: scaleVerticalPadding(4),
                                            paddingHorizontal: scaleHorizontalPadding(8),
                                            gap: 6,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }} >
                                            <Ionicons
                                                size={11}
                                                color={"#0B7C3E"}
                                                name="checkmark"
                                            />
                                            <Text
                                                style={{
                                                    color: "#0B7C3E",
                                                    fontSize: scaleFont(12),
                                                    fontFamily: "Sora_400Regular"
                                                }}
                                            >Verified</Text>
                                        </View>

                                    </View>

                                    <Divider style={{
                                        backgroundColor: "#808080"
                                    }} />

                                    {/* Primary account */}
                                    <View style={{
                                        width: "100%",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        flexDirection: "row",
                                        paddingVertical: scaleVerticalPadding(7),
                                        paddingTop: scaleVerticalPadding(10)
                                    }} >

                                        <View style={{
                                            alignItems: "flex-start",
                                            justifyContent: "space-between",
                                            flexDirection: "row",
                                            gap: 10,
                                        }} >

                                            <View style={{
                                                gap: 9,
                                            }} >
                                                <Text style={{
                                                    color: "#000000",
                                                    fontFamily: "Sora_600SemiBold",
                                                    fontSize: scaleFont(14),
                                                }} >{acct.accountName}</Text>
                                            </View>
                                        </View>

                                        {accounts.indexOf(acct) === 0 && (
                                            <View style={{
                                                backgroundColor: "#253E8633",
                                                borderRadius: 7,
                                                paddingVertical: scaleVerticalPadding(4),
                                                paddingHorizontal: scaleHorizontalPadding(8),
                                                gap: 6,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }} >

                                                <Text
                                                    style={{
                                                        color: "#253E86",
                                                        fontSize: scaleFont(12),
                                                        fontFamily: "Sora_400Regular"
                                                    }}
                                                >Primary Account</Text>
                                            </View>
                                        )}

                                    </View>



                                    <Divider style={{
                                        backgroundColor: "#808080"
                                    }} />


                                    <View style={styles.button_wrapper} >

                                        {/* <TouchableOpacity style={[styles.button, {
                                            borderColor: "#808080"
                                        }]} >
                                            <Text style={[styles.button_text, {
                                                color: "#000000",
                                            }]} >Change  Account</Text>
                                        </TouchableOpacity> */}


                                        <TouchableOpacity
                                            onPress={() => deleteBankAccount(acct.id)}
                                            style={[styles.button, {
                                                borderColor: "#FF070B",
                                                marginLeft: "auto"
                                            }]} >

                                            {deletingID === acct.id ? (
                                                <ActivityIndicator color="#FF070B" />
                                            ) : (
                                                <Text style={
                                                    [styles.button_text, {
                                                        color: "#FF070B"
                                                    }]
                                                } >Remove  Account</Text>
                                            )}
                                        </TouchableOpacity>

                                    </View>


                                </View>
                            ))}

                        </View>





                        {/* Button wrapper */}
                        <View style={[styles.button_wrapper, {
                            marginTop: 2
                        }]} >

                            <Pressable
                                onPress={() => navigation.goBack()}
                                style={[styles.button]} >
                                <Text style={[styles.button_text, {
                                    color: "#253E86"
                                }]} >Cancel</Text>
                            </Pressable>


                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => navigation.navigate("add_bank_account")}
                                style={[styles.button, {
                                    backgroundColor: "#253E86"
                                }]} >
                                <Text style={[styles.button_text, {
                                    color: "#ffffff"
                                }]} >Add Account</Text>
                            </TouchableOpacity>

                        </View>


                    </ScrollView >
                )
            }



        </View >
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D3D8E7',
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%"
    },

    header: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: scaleHorizontalPadding(10),
        paddingVertical: scaleVerticalPadding(13)
    },


    heading: {
        color: "#000000",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(18),
        flex: 1,
        textAlign: "center"
    },

    button_wrapper: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5,
        marginTop: 20
    },

    button: {
        width: "49%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleVerticalPadding(12),
        paddingHorizontal: scaleHorizontalPadding(23),
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "#253E86",
        gap: 8,
        flexWrap: "nowrap",
        textAlign: "center",
        height: "auto"
    },

    button_text: {
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(13),
        textAlign: "center"
    },


    scrollView_style: {
        flexGrow: 1,
        alignItems: "stretch",
        gap: 12,
        paddingBottom: scaleVerticalPadding(20),
        paddingHorizontal: scaleHorizontalPadding(10),
        paddingVertical: scaleVerticalPadding(5),
        backgroundColor: "#D3D8E7"
    },


})