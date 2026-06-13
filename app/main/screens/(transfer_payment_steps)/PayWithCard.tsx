import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";

import LogoReveal from "@/components/LogoReveal";
import { MainStackParamList } from "../../type";

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function PayWithCard() {
    const navigation = useNavigation<NavigationProp>();
    const { width } = useWindowDimensions();

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
                    Card Payment
                </Text>

                <Text
                >
                    10:00
                </Text>
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
                        <Text
                            adjustsFontSizeToFit
                            numberOfLines={1}
                            style={styles.feeBreakdownText}>
                            ₦ 8500 + ₦ 152 fee = ₦ 8652 total
                        </Text>
                    </View>

                </View>


                {/* QR Section */}
                <View style={styles.qrWrapper}>
                    <Image
                        source={{
                            uri: "https://res.cloudinary.com/dwedz2laa/image/upload/v1781208493/zhosd1cger6rbp8pz7rp.png",
                        }}
                        style={[styles.qrBox, { width: Math.min(width * 0.65, 320) }]}
                    />

                    <Text style={styles.qrText}>
                        Scan to Pay
                    </Text>

                </View>


                {/* Payment Link */}
                <View style={styles.paymentLinkWrapper}>

                    <View style={styles.lineBreakFlexbox}>

                        <View style={styles.halfHr} />

                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row"
                        }} >
                            <View style={[styles.hr, {
                                width: "47%"
                            }]} />

                            <Text style={styles.orText}>
                                OR
                            </Text>

                            <View style={[styles.hr, {
                                width: "47%"
                            }]} />
                        </View>

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
                        <Text style={styles.statusText} >Waiting for payment...</Text>
                        <LogoReveal />
                    </View>
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
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingTop: scaleVerticalPadding(10),
    },

    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 25,
    },

    heading: {
        color: "#10182A",
        fontFamily: "Sora_600SemiBold",
        fontSize: scaleFont(22),
    },

    scrollContent: {
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

    qrWrapper: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        alignItems: "center",
        paddingVertical: scaleVerticalPadding(20),
        gap: 16,
    },

    qrBox: {
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
        paddingVertical: scaleVerticalPadding(5),
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
        paddingVertical: scaleVerticalPadding(16),
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
        marginTop: 10,
    },

    buttonText: {
        color: "#253E86",
        fontSize: scaleFont(18),
        fontFamily: "Sora_400Regular",
    },

});
