import { scaleFont } from "@/utils/utils";
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
    View
} from "react-native";
import { MainStackParamList } from "../type";



type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function TapToPay() {
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
                    Tap to Pay
                </Text>

                <View style={{ width: 20 }} />
            </View>


            {/* Scrollable Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent]}
            >

                {/* Amount Display */}
                <View style={styles.amountDisplay}>

                    <Text style={styles.amountText}>
                        ₦ 8,500
                    </Text>

                    <View style={styles.feeBreakdownWrapper}>
                        <Text style={styles.feeBreakdownText}>
                            Fee: ₦152
                        </Text>
                    </View>

                </View>



                {/* instruction */}
                <View style={styles.instruction_wrapper} >
                    <Text style={styles.instruction_text} >
                        Hold customer’s phone or card near device</Text>

                    <Image
                        source={require("../../../assets/images/tap_to_pay.webp")}
                        style={styles.instruction_img} />
                </View>




                {/* Status */}
                <View style={styles.status}>

                    <Ionicons
                        name="checkmark-circle"
                        size={23}
                        color="#009A49"
                    />

                    <Text style={styles.statusText}>
                        Ready to accept payment
                    </Text>

                </View>



                <View style={styles.card_types_wrapper} >
                    <Image
                        source={require("../../../assets/images/users.webp")}
                        style={styles.card_types} />

                    <Text style={styles.instruction_text} >
                        Apple Pay, Google Pay supported</Text>

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
        flexGrow: 1,
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

    instruction_wrapper: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        alignItems: "center",
        paddingTop: 22,
        overflow: "hidden",
        marginVertical: 15
    },


    instruction_text: {
        color: "#000000",
        fontSize: scaleFont(16),
        fontFamily: "Sora_400Regular",
        textAlign: "center",
        paddingHorizontal: 13
    },

    instruction_img: {
        width: "100%",
        objectFit: "cover",
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


    card_types_wrapper: {
        width: "85%",
        marginHorizontal: "auto",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        marginBottom: 60,
        marginTop: 10
    },

    card_types: {
        width: "100%",
        maxWidth: 238,
        objectFit: "contain",
    },

    button: {
        width: "100%",
        borderWidth: 0.5,
        borderColor: "#253E86",
        borderRadius: 10,
        paddingVertical: 16,
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