import { createSale } from "@/api/sales.api";
import { transfer_payment_method } from "@/data/transfer_payment_methods";
import { useSaleStore } from "@/stores/saleStore";
import { SalesBody } from "@/types/types";
import { showErrorToast, showSuccessToast } from "@/utils/toastConfig";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { MainStackParamList } from "../../type";



type NavigationProp = NativeStackNavigationProp<
    MainStackParamList
>;


export default function TransferStepOne() {
    const navigation = useNavigation<NavigationProp>();
    const [loading, setLoading] = useState(false)
    const { sale, setSaleResponse } = useSaleStore()



    const handleSubmit = async () => {

        setLoading(true)


        try {
            const payload: SalesBody = {
                amount: sale.amount,
                description: sale.description,
                paymentType: sale.paymentType,
            }

            console.log("The payload", payload)

            const response = await createSale(payload)


            if (!response.ok || !response.createSalesResponse) {
                showErrorToast(response.error)
                console.error(response.error)
                return;
            }

            showSuccessToast(response.message);
            setSaleResponse(response.createSalesResponse)
            console.log("The transfer response:", response.createSalesResponse)
            navigation.replace("bank_transfer")

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



    // This function routes to the next step based on the current option
    const nextStep = (option: string) => {
        if (option === "Pay with Card") {
            showErrorToast("The 'Pay with Card' feature is not available!")
        }

        else if (option === "Direct transfer") {
            handleSubmit()
        }
        else if (option === "USSD") {
            showErrorToast("The 'USSD' feature is not available!")
        }

    }





    return (
        <View style={styles.content}>
            {/* The header */}
            <View style={styles.header} >

                <Pressable
                    aria-label="back-button"
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="chevron-back"
                        size={22}
                        color="#10182A" />
                </Pressable>


                <Text style={styles.heading} >
                    Choose Payment Method
                </Text>


                <Pressable
                >
                </Pressable>
            </View>



            {/* main content: Payment options  */}
            <View style={styles.methods_flexbox}  >

                {transfer_payment_method.map((option, i) => (
                    <Pressable
                        key={i}
                        style={styles.option_wrapper}
                        onPress={() => nextStep(option.title)}
                    >
                        {/* left side  */}
                        <View style={styles.leftside_wrapper} >
                            {/* Icon  */}
                            <View style={[styles.left_side_icon_wrapper, {
                                backgroundColor: option.background_color,
                            }]} >
                                {option.icon}
                            </View>


                            <View style={styles.text_container} >
                                <Text style={styles.title} > {option.title} </Text>
                                <Text style={styles.subTitle} > {option.subtitle} </Text>
                            </View>

                        </View>



                        {/* Right hand side  */}
                        <View style={[styles.forward_icon, {
                            backgroundColor: option.background_color,
                        }]} >
                            <Ionicons name="arrow-forward" size={15.83} color={option.textColor} />
                        </View>
                    </Pressable>
                ))}

            </View>





            {/* back to sales button  */}
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                disabled={loading}
                onPress={() => navigation.navigate("sales")}
            >
                {loading ? (<ActivityIndicator color="#253E86" />)
                    : <Text style={styles.buttonText} >Back to Sale</Text>
                }
            </TouchableOpacity>

        </View>
    )
}





const styles = StyleSheet.create({

    content: {
        flex: 1,
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingTop: scaleVerticalPadding(10),
        flexDirection: "column",
        gap: 17,
        backgroundColor: "#E9ECF3",
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
        fontFamily: "Sora_600SemiBold",
        fontSize: scaleFont(16)
    },

    methods_flexbox: {
        width: "100%",
        alignItems: "center",
        gap: 37,
        marginTop: 36
    },

    option_wrapper: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "#ffffff",
        borderWidth: 0.7,
        borderColor: "#B3B3B3",
        borderRadius: 20,
        padding: scaleHorizontalPadding(20),
        boxShadow: "0px 4px 6px 0px #00000040"
    },

    leftside_wrapper: {
        width: "auto",
        alignItems: "center",
        gap: 24,
        flexDirection: "row",
    },

    text_container: {
        gap: 10,
        alignItems: "flex-start"
    },

    title: {
        fontSize: scaleFont(16),
        color: "#10182A",
        fontFamily: "Sora_400Regular"
    },


    subTitle: {
        color: "#10182A80",
        fontSize: scaleFont(11),
        fontFamily: "Sora_400Regular"
    },

    left_side_icon_wrapper: {
        height: 55,
        width: 55,
        borderRadius: 10,
        backgroundColor: "#FF070733",
        alignItems: "center",
        justifyContent: "center",
    },


    forward_icon: {
        height: 37,
        width: 37,
        borderRadius: "50%",
        backgroundColor: "#FF070733",
        alignItems: "center",
        justifyContent: "center",
    },

    button: {
        width: "100%",
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleVerticalPadding(16),
        borderRadius: 10,
        marginBottom: 11,
        marginTop: "auto",
        borderWidth: 0.5,
        borderColor: "#253E86"
    },

    buttonText: {
        color: "#253E86",
        fontSize: scaleFont(18),
        fontFamily: 'Sora_400Regular',
    },

})