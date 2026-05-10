import { scaleFont } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { MainStackParamList } from "../../type";

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function UssdPayment() {
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
                    USSD Payment
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

                    <View style={styles.title_wrapper} >
                        <Text style={styles.title_text} >
                            Amount to pay
                        </Text>
                    </View>

                    <Text style={styles.amountText}>
                        ₦ 8,500
                        <Text style={styles.extra_info} >(including fee)</Text>
                    </Text>

                </View>


                {/* ussd code section  */}
                <View style={styles.ussd_wrapper} >
                    <View style={styles.title_wrapper} >
                        <Text style={styles.title_text} >
                            USSD Code
                        </Text>
                    </View>


                    <View>

                    </View>

                </View>


                {/* Status */}
                <View style={styles.status}>

                    <Ionicons
                        name="alert-circle"
                        size={23}
                        color="#253E86"
                    />

                    <Text style={styles.statusText}>
                        Waiting for USSD confirmation... then animation
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
        flexGrow: 1,
        paddingBottom: 40,
        gap: 18,
    },

    amountDisplay: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        alignItems: "center",
    },

    title_wrapper: {
        width: "100%",
        borderBottomWidth: 0.5,
        borderBottomColor: "#B3B3B3",
        paddingHorizontal: 13,
        paddingVertical: 10
    },

    title_text: {
        fontFamily: "Sora_300Light",
        color: "#10182A",
        fontSize: scaleFont(14)
    },

    amountText: {
        color: "#10182A",
        fontSize: scaleFont(40),
        fontFamily: "Sora_400Regular",
        marginVertical: 24
    },

    extra_info: {
        color: "#000000",
        fontSize: scaleFont(12),
        fontFamily: "Sora_400Regular"
    },

    ussd_wrapper: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        alignItems: "center",
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
        marginTop: "auto",
    },

    buttonText: {
        color: "#253E86",
        fontSize: scaleFont(18),
        fontFamily: "Sora_400Regular",
    },

});