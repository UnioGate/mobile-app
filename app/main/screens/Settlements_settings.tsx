import {
    scaleFont,
    scaleHorizontalPadding,
    scaleVerticalPadding,
} from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Switch } from 'react-native-paper';
import { MainStackParamList } from "../type";

type OverviewNavigationProp =
    NativeStackNavigationProp<MainStackParamList>;

export default function SettlementSettings() {
    const navigation = useNavigation<OverviewNavigationProp>();
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);



    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable
                    aria-label="back-button"
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons
                        name="chevron-back"
                        size={22}
                        color="#10182A"
                    />
                </Pressable>

                <Text style={styles.heading}>
                    Settlement Settings
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



                {/* main content  */}
                <View style={styles.main_content} >

                    {/* The automatic settlement radio button section  */}
                    <View style={styles.automatic_settlement_card} >

                        <View style={{
                            alignItems: "center",
                            width: "100%",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingHorizontal: scaleHorizontalPadding(8),
                            paddingVertical: scaleVerticalPadding(14),
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10
                        }} >

                            <View style={{
                                width: "auto",
                                alignItems: "center",
                                flexDirection: "row",
                                gap: 8
                            }} >

                                <Ionicons name="card" />
                                <Text
                                    style={{
                                        color: "#000000",
                                        fontSize: scaleFont(16),
                                        fontFamily: "Sora_600SemiBold"
                                    }}
                                >Automatic Settlement</Text>
                            </View>

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

                        <View style={{
                            backgroundColor: "#253E8633",
                            width: "100%",
                            paddingHorizontal: scaleHorizontalPadding(8),
                            paddingVertical: scaleVerticalPadding(10)
                        }}>
                            <Text
                                style={{
                                    color: "#253E86",
                                    fontSize: scaleFont(12),
                                    fontFamily: "Sora_400Regular",
                                }}
                            >Funds automatically settle to your bank on schedule</Text>
                        </View>
                    </View>




                    {/* The settlement frequency section  */}
                    <View style={styles.settlement_frequency_section} >
                        <Text style={styles.settlement_frequency_section_title} >
                            SETTLEMENT FREQUENCY
                        </Text>



                        <Text
                            style={{
                                color: "#10182AB2",
                                fontStyle: "italic",
                                fontSize: scaleFont(12),
                                fontFamily: "PlusJakartaSans_400Regular"
                            }}
                        >
                            Settlements process within 30 minutes of scheduled time.</Text>

                    </View>






                    {/* Minimum balance card  */}
                    <View style={styles.minimum_card_wrapper}  >
                        <Text style={styles.minimum_card_title} >Minimum balance for auto-settlement</Text>
                        <Text style={styles.minimum_card_p} >Settlement only happens if balance exceeds this amount</Text>

                        <Text style={styles.amount_tag} >₦5,000</Text>
                    </View>



                    {/* fund to settle card */}
                    <View style={styles.fund_settle_card} >
                        <Text style={styles.fund_settle_card_title} >FUNDS SETTLE TO</Text>

                        <View style={{
                            width: "auto",
                            alignItems: "flex-start",
                            flexDirection: "row",
                            gap: 10,
                            marginTop: 6
                        }}>
                            <Text>Image here</Text>

                            <View style={{
                                gap: 9
                            }} >
                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_600SemiBold"
                                }} >GTBank </Text>


                                <Text style={{
                                    color: "#10182AB2",
                                    fontSize: scaleFont(12),
                                    fontFamily: "Sora_300Light"
                                }}>****789</Text>
                            </View>
                        </View>

                    </View>




                </View>








                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText} > Save Changes</Text>
                </TouchableOpacity>




            </ScrollView>
        </SafeAreaView >
    );
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
        paddingVertical: scaleVerticalPadding(14),
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
        fontFamily: "Sora_600SemiBold",
        fontSize: scaleFont(16),
    },

    scrollView: {
        flex: 1,
    },

    scrollViewContent: {
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(18),
        gap: 16,
        flex: 1,
    },


    button: {
        width: "100%",
        backgroundColor: "#253E86",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleVerticalPadding(16),
        borderRadius: 10,
        marginTop: "auto"
    },

    buttonText: {
        color: "#ffffff",
        fontSize: scaleFont(18),
        fontFamily: 'Sora_400Regular',
    },

    main_content: {
        width: "100%",
        flex: 1,
        gap: 28
    },

    automatic_settlement_card: {
        borderRadius: 10,
        width: "100%",
        backgroundColor: "#ffffff",
        flexDirection: "column",
        alignItems: "flex-start",
        overflow: "hidden"
    },


    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    label: {
        fontSize: 16,
        marginLeft: 8,
    },



    minimum_card_wrapper: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingVertical: scaleVerticalPadding(12),
        paddingHorizontal: scaleHorizontalPadding(15),
        gap: 4,
        alignItems: "flex-start"
    },


    minimum_card_title: {
        color: "#000000",
        fontSize: scaleFont(16),
        fontFamily: "Sora_600SemiBold"
    },

    minimum_card_p: {
        fontSize: scaleFont(12),
        color: "#10182AB2",
        fontFamily: "Sora_300Light"
    },

    amount_tag: {
        backgroundColor: "#C1C0C033",
        borderWidth: 0.5,
        borderColor: "#808080",
        borderRadius: 9,
        paddingHorizontal: scaleHorizontalPadding(6),
        paddingVertical: scaleVerticalPadding(2),
        color: "#000000",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular",
        marginLeft: "auto",
        marginTop: 4
    },

    fund_settle_card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingHorizontal: scaleHorizontalPadding(10),
        paddingVertical: scaleVerticalPadding(10),
    },

    fund_settle_card_title: {
        fontSize: scaleFont(12),
        color: "#10182A80",
        fontFamily: "Sora_300Light",
        width: "100%",
        paddingBottom: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: "#808080"
    },

    settlement_frequency_section: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingHorizontal: scaleHorizontalPadding(10),
        paddingVertical: scaleVerticalPadding(10),
        gap: 12
    },

    settlement_frequency_section_title: {
        fontSize: scaleFont(12),
        color: "#10182A80",
        fontFamily: "Sora_300Light",
        width: "100%",
        paddingBottom: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: "#808080"
    }



});