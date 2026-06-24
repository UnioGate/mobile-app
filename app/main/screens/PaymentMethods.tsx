import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Checkbox, Switch } from "react-native-paper";




export default function PaymentMethods() {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [checked, setChecked] = useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);



    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable
                    aria-label="back-button"
                    // onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons
                        name="chevron-back"
                        size={22}
                        color="#10182A"
                    />
                </Pressable>

                <Text style={styles.heading}>
                    Payment Methods
                </Text>

                {/* spacer for centered title */}
                <View style={styles.headerSpacer} />
            </View>

            {/* Main Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >

                <Text
                    style={styles.screen_description} >Choose which payment methods your customers can use</Text>



                {/* Accept cryptocurrency payment section  */}
                <View style={styles.crypto_payment_wrapper} >
                    {/* heading */}
                    <View style={styles.crypto_payment_head} >
                        <Text
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={styles.h2} >Accept Cryptocurrency Payment</Text>

                        <Switch
                            value={isSwitchOn}
                            onValueChange={onToggleSwitch}
                            thumbColor="#ffffff"
                            style={{
                                height: 27,
                                width: 27
                            }}
                            trackColor={{ false: "#767577", true: "#253E86" }}
                        />
                    </View>


                    {/* rows wrapper  */}
                    <View style={styles.crypto_payment_rows_wrapper} >

                        {/* row */}

                        {/* USDT  */}
                        <Pressable
                            onPress={() => setChecked(!checked)}
                            style={styles.crypto_payment_row} >

                            <View style={{
                                width: "auto",
                                alignItems: "flex-start",
                                flexDirection: "row"
                            }} >

                                <Checkbox
                                    status={checked ? "checked" : "unchecked"}
                                    color="#253E86"
                                    uncheckedColor="#C0C0C04D"
                                />

                                <View style={{
                                    gap: 8,
                                    paddingVertical: 3
                                }} >
                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(16),
                                        fontFamily: "Sora_400Regular"
                                    }} >
                                        USDT </Text>


                                    <Text
                                        style={{
                                            color: "#10182AB2",
                                            fontSize: scaleFont(12),
                                            fontFamily: "Sora_400Regular"
                                        }}
                                    >2% conversion fee</Text>
                                </View>
                            </View>

                            <Text
                                style={{
                                    backgroundColor: "#C0C0C04D",
                                    fontSize: scaleFont(12),
                                    color: "#10182AB2",
                                    fontFamily: "Sora_400Regular",
                                    borderRadius: 10,
                                    paddingVertical: scaleVerticalPadding(5),
                                    paddingHorizontal: scaleHorizontalPadding(10)
                                }}
                            >TRC- 20</Text>
                        </Pressable>


                        {/* USDC  */}
                        <Pressable
                            onPress={() => setChecked(!checked)}
                            style={styles.crypto_payment_row} >

                            <View style={{
                                width: "auto",
                                alignItems: "flex-start",
                                flexDirection: "row"
                            }} >

                                <Checkbox
                                    status={checked ? "checked" : "unchecked"}
                                    color="#253E86"
                                    onPress={() => setChecked(!checked)}
                                    uncheckedColor="#C0C0C04D"
                                />

                                <View style={{
                                    gap: 8,
                                    paddingVertical: 3
                                }} >
                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(16),
                                        fontFamily: "Sora_400Regular"
                                    }} >
                                        USDC </Text>


                                    <Text
                                        style={{
                                            color: "#10182AB2",
                                            fontSize: scaleFont(12),
                                            fontFamily: "Sora_400Regular"
                                        }}
                                    >2% conversion fee</Text>
                                </View>
                            </View>

                            <Text
                                style={{
                                    backgroundColor: "#C0C0C04D",
                                    fontSize: scaleFont(12),
                                    color: "#10182AB2",
                                    fontFamily: "Sora_400Regular",
                                    borderRadius: 10,
                                    paddingVertical: scaleVerticalPadding(5),
                                    paddingHorizontal: scaleHorizontalPadding(10)
                                }}
                            >Polygon</Text>
                        </Pressable>



                        {/* CNGN */}
                        <Pressable
                            onPress={() => setChecked(!checked)}
                            style={[styles.crypto_payment_row, {
                                borderBottomWidth: 0,
                                paddingBottom: 0
                            }]} >

                            <View style={{
                                width: "auto",
                                alignItems: "flex-start",
                                flexDirection: "row"
                            }} >

                                <Checkbox
                                    status={checked ? "checked" : "unchecked"}
                                    color="#253E86"
                                    onPress={() => setChecked(!checked)}
                                    uncheckedColor="#C0C0C04D"
                                />

                                <View style={{
                                    gap: 8,
                                    paddingVertical: 3
                                }} >
                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(16),
                                        fontFamily: "Sora_400Regular"
                                    }} >
                                        CNGN </Text>


                                    <Text
                                        style={{
                                            color: "#10182AB2",
                                            fontSize: scaleFont(12),
                                            fontFamily: "Sora_400Regular"
                                        }}
                                    >2% conversion fee</Text>
                                </View>
                            </View>

                            <Text
                                style={{
                                    backgroundColor: "#C0C0C04D",
                                    fontSize: scaleFont(12),
                                    color: "#10182AB2",
                                    fontFamily: "Sora_400Regular",
                                    borderRadius: 10,
                                    paddingVertical: scaleVerticalPadding(5),
                                    paddingHorizontal: scaleHorizontalPadding(10)
                                }}
                            >Base</Text>
                        </Pressable>

                    </View>

                </View>




                {/* Accept FIAT Payment section */}
                <View style={styles.crypto_payment_wrapper} >
                    {/* heading */}
                    <View style={styles.crypto_payment_head} >
                        <Text
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={styles.h2} >Accept Fiat Payment</Text>

                        <Switch
                            value={isSwitchOn}
                            onValueChange={onToggleSwitch}
                            thumbColor="#ffffff"
                            style={{
                                height: 27,
                                width: 27
                            }}
                            trackColor={{ false: "#767577", true: "#253E86" }}
                        />
                    </View>


                    {/* rows wrapper  */}
                    <View style={styles.crypto_payment_rows_wrapper} >

                        {/* row */}

                        {/* card payment */}
                        <Pressable
                            onPress={() => setChecked(!checked)}
                            style={styles.crypto_payment_row} >

                            <View style={{
                                width: "auto",
                                alignItems: "flex-start",
                                flexDirection: "row"
                            }} >

                                <Checkbox
                                    status={checked ? "checked" : "unchecked"}
                                    color="#253E86"
                                    uncheckedColor="#C0C0C04D"
                                />

                                <View style={{
                                    gap: 8,
                                    paddingVertical: 3
                                }} >
                                    <Text
                                        style={{
                                            color: "#000000",
                                            fontSize: scaleFont(16),
                                            fontFamily: "Sora_400Regular",
                                            flex: 1,
                                            flexShrink: 1,
                                            flexWrap: "wrap",
                                        }} >
                                        Card Payments
                                        <Text
                                            style={{
                                                fontSize: scaleFont(13),
                                                color: "#10182AB2",
                                                fontFamily: "Sora_300Light"
                                            }} > (Visa, Mastercard, , Paypal)</Text>
                                    </Text>

                                </View>
                            </View>
                        </Pressable>


                        {/* Bank Transfer  */}
                        <Pressable
                            onPress={() => setChecked(!checked)}
                            style={styles.crypto_payment_row} >

                            <View style={{
                                width: "auto",
                                alignItems: "flex-start",
                                flexDirection: "row"
                            }} >

                                <Checkbox
                                    status={checked ? "checked" : "unchecked"}
                                    color="#253E86"
                                    uncheckedColor="#C0C0C04D"
                                />

                                <View style={{
                                    gap: 8,
                                    paddingVertical: 3
                                }} >
                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(16),
                                        fontFamily: "Sora_400Regular"
                                    }} >
                                        Bank Transfer </Text>

                                </View>
                            </View>

                        </Pressable>



                        {/* USSD Payments */}
                        <Pressable
                            onPress={() => setChecked(!checked)}
                            style={styles.crypto_payment_row} >

                            <View style={{
                                width: "auto",
                                alignItems: "flex-start",
                                flexDirection: "row"
                            }} >

                                <Checkbox
                                    status={checked ? "checked" : "unchecked"}
                                    color="#253E86"
                                    uncheckedColor="#C0C0C04D"
                                />

                                <View style={{
                                    gap: 8,
                                    paddingVertical: 3
                                }} >
                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(16),
                                        fontFamily: "Sora_400Regular"
                                    }} >
                                        USSD Payments </Text>

                                </View>
                            </View>

                        </Pressable>

                    </View>

                </View>


                {/* Accept NFC Tap-to-Pay */}
                <View style={styles.crypto_payment_wrapper} >
                    {/* heading */}
                    <View style={styles.crypto_payment_head} >
                        <Text
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={styles.h2} >Accept NFC Tap-to-Pay</Text>

                        <Switch
                            value={isSwitchOn}
                            onValueChange={onToggleSwitch}
                            thumbColor="#ffffff"
                            style={{
                                height: 27,
                                width: 27
                            }}
                            trackColor={{ false: "#767577", true: "#253E86" }}
                        />
                    </View>


                    {/* rows wrapper  */}
                    <View style={styles.crypto_payment_rows_wrapper} >

                        {/* row */}

                        {/* card payment */}
                        <Pressable
                            onPress={() => setChecked(!checked)}
                            style={styles.crypto_payment_row} >

                            <View style={{
                                width: "auto",
                                alignItems: "flex-start",
                                flexDirection: "row"
                            }} >

                                <Checkbox
                                    status={checked ? "checked" : "unchecked"}
                                    color="#253E86"
                                    uncheckedColor="#C0C0C04D"
                                />

                                <View style={{
                                    gap: 8,
                                    paddingVertical: 3
                                }} >
                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(16),
                                        fontFamily: "Sora_400Regular",
                                        flex: 1,
                                        flexShrink: 1,
                                        flexWrap: "wrap"
                                    }} >
                                        Contactless Card
                                    </Text>

                                </View>
                            </View>
                        </Pressable>


                        {/* Bank Transfer  */}
                        <Pressable
                            onPress={() => setChecked(!checked)}
                            style={styles.crypto_payment_row} >

                            <View style={{
                                width: "auto",
                                alignItems: "flex-start",
                                flexDirection: "row"
                            }} >

                                <Checkbox
                                    status={checked ? "checked" : "unchecked"}
                                    color="#253E86"
                                    uncheckedColor="#C0C0C04D"
                                />

                                <View style={{
                                    gap: 8,
                                    paddingVertical: 3
                                }} >
                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(16),
                                        fontFamily: "Sora_400Regular"
                                    }} >
                                        Apple Pay </Text>

                                </View>
                            </View>

                        </Pressable>



                        {/* USSD Payments */}
                        <Pressable
                            onPress={() => setChecked(!checked)}
                            style={styles.crypto_payment_row} >

                            <View style={{
                                width: "auto",
                                alignItems: "flex-start",
                                flexDirection: "row"
                            }} >

                                <Checkbox
                                    status={checked ? "checked" : "unchecked"}
                                    color="#253E86"
                                    onPress={() => setChecked(!checked)}
                                    uncheckedColor="#C0C0C04D"
                                />

                                <View style={{
                                    gap: 8,
                                    paddingVertical: 3
                                }} >
                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(16),
                                        fontFamily: "Sora_400Regular"
                                    }} >
                                        Google Pay </Text>

                                </View>
                            </View>

                        </Pressable>

                        <Text
                            style={{
                                color: "#10182A",
                                fontSize: scaleFont(12),
                                fontFamily: "Sora_400Regular",
                                marginTop: 5
                            }}
                        >Requires NFC-enabled device:
                            <Text
                                style={{
                                    fontSize: scaleFont(11),
                                    fontFamily: "Sora_300Light",
                                }}
                            > Device does not support NFC</Text>
                        </Text>

                    </View>

                </View>


                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText} > Save Changes</Text>
                </TouchableOpacity>


            </ScrollView>
        </View>

    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E9ECF3"
    },

    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(10),
    },

    backButton: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
    },

    headerSpacer: {
        width: 32,
    },

    heading: {
        color: "#10182A",
        fontFamily: "PlusJakartaSans_500Medium",
        fontSize: scaleFont(21),
    },

    scrollView: {
        flex: 1,
    },

    scrollViewContent: {
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(2),
        gap: 16,
        flexGrow: 1,
        paddingBottom: scaleVerticalPadding(20)
    },

    screen_description: {
        fontSize: scaleFont(12),
        color: "#10182AB2",
        fontFamily: "Sora_400Regular",
        textAlign: "center",
        width: "100%"
    },

    crypto_payment_wrapper: {
        backgroundColor: "#FFFFFF",
        width: "100%",
        borderRadius: 10,
        paddingHorizontal: scaleHorizontalPadding(13),
        paddingVertical: scaleVerticalPadding(16),
        gap: 6
    },


    crypto_payment_head: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        gap: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: "#808080",
        paddingBottom: 7
    },

    h2: {
        color: "#000000",
        fontSize: scaleFont(16),
        fontFamily: "Sora_600SemiBold",
        flex: 1,
        flexShrink: 1,
        flexWrap: "wrap",
    },

    crypto_payment_rows_wrapper: {
        width: "100%",
        gap: 4
    },

    crypto_payment_row: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        gap: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: "#808080",
        paddingBottom: 7,
        paddingVertical: scaleVerticalPadding(4),
    },


    button: {
        width: "100%",
        backgroundColor: "#253E86",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleVerticalPadding(16),
        borderRadius: 10,
        marginTop: 20
    },

    buttonText: {
        color: "#ffffff",
        fontSize: scaleFont(18),
        fontFamily: 'Sora_400Regular',
    },


})
