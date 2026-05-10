import { scaleFont } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    Dimensions,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { MainStackParamList } from "../../type";

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const screenWidth = Dimensions.get("window").width;

export default function PayWithCard() {
    const navigation = useNavigation<NavigationProp>();

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
                        size={20}
                        color="#10182A"
                    />
                </Pressable>

                <Text style={styles.heading}>
                    Card Payment
                </Text>

                <View style={{ width: 20 }} />
            </View>


            {/* Scrollable Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                {/* Amount Display */}
                <View style={styles.amountDisplay}>

                    <Text style={styles.amountText}>
                        ₦ 8,500
                    </Text>

                    <View style={styles.feeBreakdownWrapper}>
                        <Text style={styles.feeBreakdownText}>
                            ₦ 8500 + ₦ 152 fee = ₦ 8652 total
                        </Text>
                    </View>

                </View>


                {/* QR Section */}
                <View style={styles.qrWrapper}>

                    <View style={styles.qrBox} />

                    <Text style={styles.qrText}>
                        Scan to Pay
                    </Text>

                </View>


                {/* Payment Link */}
                <View style={styles.paymentLinkWrapper}>

                    <View style={styles.lineBreakFlexbox}>

                        <View style={styles.halfHr} />

                        <Text style={styles.orText}>
                            OR
                        </Text>

                        <View style={styles.halfHr} />

                    </View>


                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.sendLinkButton}
                    >

                        <Ionicons
                            name="arrow-redo"
                            size={18}
                            color="#FFFFFF"
                        />

                        <Text style={styles.sendLinkButtonText}>
                            Send Payment Link
                        </Text>

                    </TouchableOpacity>

                    <View style={styles.hr} />

                </View>


                {/* Status */}
                <View style={styles.status}>

                    <Ionicons
                        name="alert-circle"
                        size={23}
                        color="#253E86"
                    />

                    <Text style={styles.statusText}>
                        Waiting for payment... then animation
                    </Text>

                </View>


                {/* Cancel Button */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.button}
                    onPress={() => navigation.replace("transferStepOne")}
                >
                    <Text style={styles.buttonText}>
                        Cancel
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#E9ECF3",
        paddingHorizontal: 19,
        paddingTop: 20,
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
        fontFamily: "Sora_600SemiBold",
        fontSize: scaleFont(16),
    },

    scrollContent: {
        paddingBottom: 40,
        gap: 18,
    },

    amountDisplay: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        alignItems: "center",
        paddingVertical: 22,
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
        paddingTop: 16,
    },

    feeBreakdownText: {
        color: "#10182A",
        fontSize: scaleFont(15),
        fontFamily: "Sora_300Light",
    },

    qrWrapper: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        alignItems: "center",
        paddingVertical: 20,
        gap: 16,
    },

    qrBox: {
        width: screenWidth * 0.65,
        aspectRatio: 1,
        borderRadius: 14,
        backgroundColor: "#E9ECF3",
    },

    qrText: {
        color: "#000000",
        fontSize: scaleFont(18),
        fontFamily: "Sora_400Regular",
    },

    paymentLinkWrapper: {
        width: "100%",
        alignItems: "center",
        paddingVertical: 5,
    },

    lineBreakFlexbox: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginBottom: 14,
    },

    halfHr: {
        width: "44%",
        height: 0.5,
        backgroundColor: "#10182AB2",
    },

    orText: {
        color: "#10182A",
        fontFamily: "Sora_400Regular",
    },

    hr: {
        width: "100%",
        height: 0.5,
        backgroundColor: "#10182AB2",
        marginTop: 16,
    },

    sendLinkButton: {
        width: "100%",
        backgroundColor: "#253E86",
        borderRadius: 10,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
    },

    sendLinkButtonText: {
        color: "#FFFFFF",
        fontSize: scaleFont(18),
        fontFamily: "Sora_400Regular",
    },

    status: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        paddingVertical: 16,
        paddingHorizontal: 16,
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
        flex: 1,
        color: "#000000",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular",
    },

    button: {
        width: "100%",
        borderWidth: 0.5,
        borderColor: "#253E86",
        borderRadius: 10,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#253E86",
        fontSize: scaleFont(18),
        fontFamily: "Sora_400Regular",
    },

});