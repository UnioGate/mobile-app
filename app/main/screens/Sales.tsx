import CustomInput from "@/components/ui/ReusableInput";
import { payment_method } from "@/data/payment_methods";
import { useSaleStore } from "@/stores/saleStore";
import { methodKey } from "@/types/types";
import { showErrorToast, showSuccessToast } from "@/utils/toastConfig";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Delete } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MainStackParamList } from '../type';


type NavigationProp = NativeStackNavigationProp<
    MainStackParamList,
    'sales',
    'stepOne'
>;



export default function Sales() {
    const navigation = useNavigation<NavigationProp>();
    const [addCustomer, setAddCustomer] = useState(false);
    const [showRecipientModal, setShowRecipientModal] = useState(false);
    const { setSalesData, sale, resetSale } = useSaleStore();
    const amount = sale.amount;
    const selectedMethod = sale.paymentType

    const [recipient, setRecipient] = useState({
        customer_Name: "",
        customer_phone: "",
        customer_email_address: "",
    });


    const formattedAmount = useMemo(() => {
        if (!amount) return "0";

        const parts = amount.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return parts.join(".");
    }, [amount]);




    const icon: Record<methodKey, any> = {
        card: require("../../../assets/logos/card.png"),
        crypto: require("../../../assets/logos/crypto_method.png"),
        nfc: require("../../../assets/logos/nfc_method.png")
    }



    const handleKeyPress = (value: string | number) => {
        const currentAmount = sale.amount
        // prevent multiple dots
        if (value === "." && currentAmount.includes(".")) return;

        // replace initial 0
        if (currentAmount === "0" && value !== ".") {
            setSalesData({
                amount: String(value)
            });
            return;
        }

        setSalesData({
            amount: currentAmount + value
        })
    };


    const handleDelete = () => {
        const currentAmount = sale.amount;

        if (currentAmount.length <= 1) {
            setSalesData({
                amount: "0",
            });
            return;
        }

        setSalesData({
            amount: currentAmount.slice(0, -1),
        });
    };



    const handleClear = () => {
        resetSale()
        showSuccessToast("Cleared", "Amount has been reset");
    };


    // Handle change function
    const handleChange = (id: string, value: string) => {
        setRecipient(prev => ({
            ...prev,
            [id]: value
        }))
    }


    const handleContinue = () => {

        if (selectedMethod === "bank_transfer") {
            navigation.navigate("transferStepOne")
            return;
        }

        else if (selectedMethod === "crypto") {
            navigation.navigate("cryptoStepOne")
            return;
        }

        if (selectedMethod === "nfc") {
            navigation.navigate("tap_to_pay")
            return;
        }
    }



    // This function handles the submission
    const submit = async () => {
        if (amount.length < 1) {
            showErrorToast("Please enter an amount!")
            return;
        }

        if (!selectedMethod || selectedMethod.trim() === "") {
            showErrorToast("Select a payment method",
                "Select a payment method from the options")
            return;
        }

        handleContinue()

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
                    New Sale
                </Text>



                <Pressable
                    onPress={handleClear}
                >
                    <Text style={styles.clear_btn} >
                        Clear
                    </Text>
                </Pressable>
            </View>



            {/* The amount display */}
            <View style={styles.amount_display} >

                <View style={styles.amount_wrapper} >
                    <Text
                        style={styles.amount}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >
                        ₦ {formattedAmount}</Text>
                </View>

                {/* description section  */}
                <View style={styles.description_section} >
                    <TextInput
                        placeholder="Add description..."
                        style={styles.description_input}
                        keyboardType="default"
                        value={sale.description}
                        onChangeText={(value) => {
                            setSalesData({
                                description: value
                            })
                        }}
                    />
                </View>
            </View>


            <ScrollView
                contentContainerStyle={styles.scrollView_container}
                showsVerticalScrollIndicator={false}
            >
                {/* Payment method section  */}
                <View style={styles.payment_method_wrapper} >
                    <Text style={styles.payment_method_text} >Select Payment Method</Text>


                    {/* The methods grid  */}
                    <View style={styles.methods_grid} >
                        {
                            payment_method.map((option, i) => (
                                <Pressable
                                    onPress={() => {
                                        setSalesData({
                                            paymentType: option.value
                                        })
                                        console.log(option.value)
                                    }}
                                    key={i}
                                    style={styles.method_item} >
                                    <Image
                                        source={icon[option.image]}
                                        style={{ width: 20, height: 20, objectFit: "contain" }}
                                    />

                                    <View style={{
                                        gap: 6
                                    }} >

                                        <Text
                                            numberOfLines={1}
                                            adjustsFontSizeToFit
                                            style={styles.method_title}
                                        > {option.title} </Text>

                                        <Text
                                            numberOfLines={1}
                                            adjustsFontSizeToFit
                                            style={styles.method_subtitle}
                                        > {option.subtitle} </Text>
                                    </View>

                                    {selectedMethod === option.value && (
                                        <View
                                            style={styles.selected}
                                        >

                                            <Ionicons
                                                name="checkmark-circle"
                                                size={18}
                                                color="#10182A"
                                            />
                                        </View>

                                    )}

                                </Pressable>
                            ))
                        }

                    </View>

                </View>


                {/* Save customer info  */}
                <View style={styles.save_customer_section} >
                    <Text
                        style={styles.save_customer_text}
                    >
                        Add Customer Info</Text>


                    <Switch
                        value={addCustomer}
                        onValueChange={setAddCustomer}
                        trackColor={{
                            false: "#3C3C434D",
                            true: "#34C759"
                        }}
                        thumbColor={"#ffffff"}
                        ios_backgroundColor={'#d1d5db'}
                    />
                </View>


                {/* keypad  */}
                <View style={styles.keypad_grid} >

                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0].map((char, i) => (
                        <TouchableOpacity
                            key={i}
                            style={styles.key}
                            onPress={() => handleKeyPress(char)}
                            activeOpacity={0.5}
                        >

                            <Text
                                style={styles.key_text}
                            >
                                {char}
                            </Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        style={styles.key}
                        onPress={handleDelete}
                    >
                        <Text
                            style={styles.key_text}
                        >
                            <Delete color={"#10182A"} size={26} />
                        </Text>
                    </TouchableOpacity>

                </View>


            </ScrollView>


            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={submit}
            >
                <Text style={styles.buttonText} > Continue</Text>
            </TouchableOpacity>


            <Modal
                visible={showRecipientModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowRecipientModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>


                        {/* Customer name input */}
                        <CustomInput
                            value={recipient.customer_Name}
                            label="Customer Name"
                            keyboardType="default"
                            id="customer_Name"
                            onChangeText={(text) => handleChange("customer_Name", text)}
                        />

                        {/* Customer phone number input */}
                        <CustomInput
                            label="Phone Number"
                            value={recipient.customer_phone}
                            id="customer_phone"
                            keyboardType="phone-pad"
                            onChangeText={(text) => handleChange("customer_phone", text)}
                        />


                        {/* Customer email input */}
                        <CustomInput
                            label="Email Address"
                            id="customer_email_address"
                            value={recipient.customer_email_address}
                            keyboardType="email-address"
                            onChangeText={(text) => handleChange("customer_email_address", text)}
                        />


                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                setShowRecipientModal(true);
                            }}
                        >
                            <Text style={styles.modalButtonText}>Complete</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modalButton, { backgroundColor: "#F24822", marginTop: 0 }]}
                            onPress={() => setShowRecipientModal(false)}>
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9ECF3',
        display: "flex",
        flexDirection: "column",
        gap: 17,
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingTop: scaleVerticalPadding(10),
    },

    scrollView_container: {
        display: "flex",
        flexGrow: 1,
        alignItems: "stretch",
        flexDirection: "column",
        gap: 17,
        width: "100%",
        paddingBottom: scaleVerticalPadding(35),
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

    clear_btn: {
        color: "#253E86",
        textDecorationLine: "underline",
        fontSize: 14,
        fontFamily: "PlusJakartaSans_500Medium",
    },

    amount_display: {
        minHeight: 180,
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },

    amount_wrapper: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: scaleHorizontalPadding(10)
    },

    amount: {
        fontFamily: "Sora_400Regular",
        color: "#10182A",
        fontSize: scaleFont(40)
    },

    description_section: {
        width: "100%",
        borderTopWidth: 0.5,
        borderColor: "#B3B3B3",
        paddingVertical: scaleVerticalPadding(5),
        paddingHorizontal: scaleHorizontalPadding(10)
    },

    description_input: {
        color: "#10182AB2",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(13)
    },

    payment_method_wrapper: {
        width: "100%",
        flexDirection: "column",
        gap: 12,
    },

    payment_method_text: {
        fontSize: scaleFont(15),
        color: "#10182A",
        fontFamily: "Sora_400Regular",
    },

    methods_grid: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "4%"
    },


    method_item: {
        width: "48%",
        backgroundColor: "#fff",
        flexDirection: "row",
        borderRadius: 10,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingHorizontal: scaleHorizontalPadding(10),
        paddingVertical: scaleVerticalPadding(20),
        gap: 7,
        position: "relative"
    },

    selected: {
        position: "absolute",
        right: 8,
        top: 8
    },


    method_title: {
        color: "#000000",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular",
    },

    method_subtitle: {
        maxWidth: "90%",
        color: "#B3B3B3",
        fontSize: scaleFont(13),
        fontFamily: "Sora_400Regular",
        flexWrap: "wrap",
        flexShrink: 1,
    },

    save_customer_section: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
    },

    save_customer_text: {
        color: "#000000",
        fontSize: scaleFont(15),
        fontFamily: "Sora_400Regular"
    },

    keypad_grid: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 10
    },

    key: {
        width: "31%",
        minHeight: 56,
        backgroundColor: "#fff",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        position: "relative"
    },

    key_text: {
        fontSize: scaleFont(24),
        fontFamily: "Sora_600SemiBold"
    },


    button: {
        width: "100%",
        backgroundColor: "#253E86",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleVerticalPadding(16),
        borderRadius: 10,
        marginBottom: 11,
        marginTop: "auto"
    },

    buttonText: {
        color: "#ffffff",
        fontSize: scaleFont(18),
        fontFamily: 'Sora_400Regular',
    },


    // Modal styles

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        padding: 20,
    },

    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 23,
        gap: 13,
        alignItems: "center"
    },

    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 10,
    },

    modalButton: {
        backgroundColor: "#253E86",
        paddingHorizontal: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 23,
        maxWidth: 321,
        width: "100%",
        paddingVertical: 10
    },

    modalButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: scaleFont(18),
        fontFamily: "Sora_400Regular",
    },
})
