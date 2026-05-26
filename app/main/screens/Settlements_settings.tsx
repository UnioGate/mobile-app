import {
    scaleFont,
    scaleHorizontalPadding,
    scaleVerticalPadding,
} from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { MainStackParamList } from "../type";

type OverviewNavigationProp =
    NativeStackNavigationProp<MainStackParamList>;

export default function SettlementSettings() {
    const navigation = useNavigation<OverviewNavigationProp>();

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
    }



});