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
    View
} from "react-native";

import Timer from "@/components/icons/Timer";
import LogoReveal from "@/components/LogoReveal";
import { MainStackParamList } from "../../type";

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function BankTransfer() {
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
                        size={22}
                        color="#10182A"
                    />
                </Pressable>

                <Text style={styles.heading}>
                    Bank Transfer
                </Text>

                <Text
                >
                    10:00
                </Text>
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
                            ₦ 8500 + ₦ 152 fee = ₦ 8652 total
                        </Text>
                    </View>

                </View>


                {/* Bank details  */}
                <View style={styles.bank_details_wrapper} >

                    <View style={styles.detail_category}  >
                        <Text style={styles.detail_category_title} >Bank Name</Text>

                        <View style={{
                            width: "auto",
                            alignItems: "center",
                            gap: 10,
                            flexDirection: "row"
                        }} >
                            <Image
                                source={require("../../../../assets/logos/zenith_bank_logo.png")}
                                style={{
                                    width: 32,
                                    height: 36
                                }}
                            />

                            <Text style={[styles.detail_category_value, {
                                fontSize: scaleFont(16)
                            }]} >Zenith Bank</Text>
                        </View>

                    </View>


                    <View style={styles.detail_category} >
                        <Text style={styles.detail_category_title}>Account Number</Text>
                        <Text style={[styles.detail_category_value, {
                            fontSize: scaleFont(24)
                        }]}>1234567890</Text>
                    </View>


                    <View style={styles.detail_category} >
                        <Text style={styles.detail_category_title}>Account Name</Text>
                        <Text style={[styles.detail_category_value, {
                            fontSize: scaleFont(20)
                        }]}>Konfam</Text>
                    </View>


                    <View style={[styles.detail_category, {
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottomWidth: 0,
                        paddingVertical: scaleVerticalPadding(5)
                    }]} >
                        <Text style={[styles.detail_category_value, {
                            fontSize: scaleFont(12)
                        }]} >Valid for 30 minutes</Text>
                        <Timer />
                    </View>

                </View>



                <Text style={styles.info_text} >
                    Transfer exactly ₦ 8652 to the account above.
                    Payment will be confirmed automatically.
                </Text>


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
                        <Text style={styles.statusText} >Waiting for transfer...</Text>
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
        marginBottom: 20,
    },

    heading: {
        color: "#10182A",
        fontFamily: "Sora_500Medium",
        fontSize: scaleFont(22),
    },

    scrollContent: {
        flexGrow: 1,
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




    bank_details_wrapper: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingVertical: scaleVerticalPadding(6),
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 3
    },

    detail_category: {
        width: "100%",
        paddingHorizontal: scaleHorizontalPadding(16),
        gap: 10,
        paddingVertical: scaleVerticalPadding(13),
        borderBottomWidth: 0.5,
        borderBottomColor: "#B3B3B3"
    },


    detail_category_title: {
        color: "#10182AB2",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular"
    },


    detail_category_value: {
        color: "#000000",
        fontFamily: "Sora_400Regular"
    },


    info_text: {
        fontSize: scaleFont(13),
        width: "100%",
        fontFamily: "Sora_400Regular",
        textAlign: "center",
        marginVertical: 16,
        lineHeight: 28
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
        marginTop: "auto",
    },

    buttonText: {
        color: "#253E86",
        fontSize: scaleFont(18),
        fontFamily: "Sora_400Regular",
    },

});