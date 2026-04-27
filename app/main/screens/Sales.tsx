import { payment_method } from "@/data/payment_methods";
import { methodKey } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Delete } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MainStackParamList } from '../type';
import { showSuccessToast } from "@/utils/toastConfig";


type NavigationProp = NativeStackNavigationProp<
    MainStackParamList,
    'sales'
>;



export default function Sales() {
    const navigation = useNavigation<NavigationProp>();
    const [selectedMethod, setSelectedMethod] = useState('crypto')
    const [amount, setAmount] = useState("0");
    const [addCustomer, setAddCustomer] = useState(false);


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
        setAmount(prev => {
            // prevent multiple dots
            if (value === "." && prev.includes(".")) return prev;

            // replace initial 0
            if (prev === "0" && value !== ".") {
                return String(value);
            }

            return prev + value;
        });
    };

    const handleDelete = () => {
        setAmount(prev => {
            if (prev.length <= 1) return "0";
            return prev.slice(0, -1);
        });
    };

    const handleClear = () => {
        setAmount("0");
        showSuccessToast("Cleared", "Amount has been reset");
    };


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
                    <Text style={styles.amount} >₦ {formattedAmount}</Text>
                </View>

                {/* description section  */}
                <View style={styles.description_section} >
                    <TextInput
                        placeholder="Add description..."
                        style={styles.description_input}
                    />
                </View>
            </View>


            <ScrollView
                style={{ flex: 1 }}
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
                                    onPress={() => setSelectedMethod(option.title)}
                                    key={i}
                                    style={styles.method_item} >
                                    <Image
                                        source={icon[option.image]}
                                        style={{ width: 20, height: 20, }}
                                    />

                                    <View style={{
                                        gap: 6
                                    }} >

                                        <Text
                                            style={styles.method_title}
                                        > {option.title} </Text>

                                        <Text
                                            style={styles.method_subtitle}
                                        > {option.subtitle} </Text>
                                    </View>

                                    {selectedMethod === option.title && (
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
                    >Add Customer Info</Text>


                    <Switch
                        value={addCustomer}
                        onValueChange={setAddCustomer}
                        trackColor={{ false: "#3C3C434D", true: "#34C759" }}
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
                            activeOpacity={0.7}
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
            >
                <Text style={styles.buttonText} > Continue</Text>
            </TouchableOpacity>

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
        paddingHorizontal: 19,
        paddingBottom: 15,
        paddingTop: 30,
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
        fontSize: 22
    },

    clear_btn: {
        color: "#253E86",
        textDecorationLine: "underline",
        fontSize: 14,
        fontFamily: "PlusJakartaSans_500Medium",
    },

    amount_display: {
        height: 180,
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },

    amount_wrapper: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    amount: {
        fontFamily: "Sora_400Regular",
        color: "#10182A",
        fontSize: 40
    },

    description_section: {
        width: "100%",
        borderTopWidth: 0.5,
        borderColor: "#B3B3B3",
        paddingVertical: 5,
        paddingHorizontal: 25
    },

    description_input: {
        color: "#10182AB2",
        fontFamily: "Sora_400Regular",
        fontSize: 13
    },

    payment_method_wrapper: {
        width: "100%",
        flexDirection: "column",
        gap: 12,
    },

    payment_method_text: {
        fontSize: 15,
        color: "#10182A",
        fontFamily: "Sora_400Regular",
    },

    methods_grid: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 14
    },


    method_item: {
        width: "48%",
        backgroundColor: "#fff",
        flexDirection: "row",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 20,
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
        fontSize: 14,
        fontFamily: "Sora_400Regular",
    },

    method_subtitle: {
        color: "#B3B3B3",
        fontSize: 13,
        fontFamily: "Sora_400Regular",
    },

    save_customer_section: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
    },

    save_customer_text: {
        color: "#000000",
        fontSize: 15,
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
        height: 60,
        backgroundColor: "#fff",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        position: "relative"
    },

    key_text: {
        fontSize: 24,
        fontFamily: "PlusJakartaSans_600SemiBold"
    },


    button: {
        width: "100%",
        backgroundColor: "#253E86",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        borderRadius: 10,
        marginBottom: 11,
        marginTop: "auto"
    },

    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        fontFamily: 'Sora_400Regular',
    },



})
