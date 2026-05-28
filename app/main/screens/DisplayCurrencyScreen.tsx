import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";




export default function DisplayCurrencyScreen() {
    return (
        <SafeAreaView style={styles.container}>
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
                    Display Currency
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

                <Text style={styles.screen_description} >
                    Choose your primary currency for displaying prices
                </Text>



                <View style={styles.input_wrapper}  >
                    <Ionicons
                        name="search"
                        color={"#10182AB2"}
                        size={14}
                    />

                    <TextInput
                        placeholder="Search Currencies"
                        style={{
                            width: "100%",
                            fontSize: scaleFont(12),
                            color: "#10182A66",
                            fontFamily: "Sora_400Regular"
                        }}
                    />
                </View>




                {/* Currencies display  */}
                <View style={{
                    gap: 15
                }} >

                    <View style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row"
                    }} >
                        <Text
                            style={{
                                color: "#10182AB2",
                                fontSize: scaleFont(13),
                                fontFamily: "Sora_400Regular",
                            }}
                        >Common Currencies</Text>

                        <Pressable style={{
                            width: "auto",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4
                        }}>
                            <Text style={styles.view_all_btn} >See All</Text>
                            <Ionicons
                                name="chevron-forward"
                                color={"#253E86"}
                                size={15} />
                        </Pressable>
                    </View>


                    <View style={styles.list_wrapper} >



                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingVertical: scaleVerticalPadding(8),
                            paddingHorizontal: scaleHorizontalPadding(9),
                            borderBottomWidth: 0.5,
                            borderBottomColor: "#808080"
                        }} >

                            <View style={{
                                width: "auto",
                                gap: 10,
                                alignItems: "center",
                                flexDirection: "row"
                            }} >
                                <RadioButton
                                    value=""
                                />

                                <Image
                                    source={require("../../../assets/onboarding/NG-flag.png")}
                                    style={{
                                        width: 31,
                                        height: 21
                                    }}
                                />

                                <Text
                                    style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }}
                                >Nigerian Naira</Text>
                            </View>


                            <View style={{
                                width: "auto",
                                gap: 8,
                                alignItems: "center",
                                flexDirection: "row"
                            }} >
                                <Text style={{
                                    color: "#10182A99",
                                    fontSize: scaleFont(12),
                                    fontFamily: "Sora_400Regular"
                                }} >NGN</Text>


                                <Text
                                    style={{
                                        fontSize: scaleFont(13),
                                        color: "#10182A99",
                                        fontFamily: "Sora_600SemiBold"
                                    }}
                                >$</Text>
                            </View>
                        </View>



                    </View>

                </View>



                <Text
                    style={{
                        color: "#10182AB2",
                        fontSize: scaleFont(12),
                        fontFamily: "Sora_400Regular",
                        textAlign: "center"
                    }}
                >Crypto and fiat payments will still be accepted. This only changes display.</Text>


                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText} > Save Changes</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
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
        paddingVertical: scaleVerticalPadding(5),
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

    input_wrapper: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 7,
        padding: 4,
        paddingHorizontal: scaleHorizontalPadding(20),
        flexDirection: "row",
        gap: 6,
        alignItems: "center"
    },

    view_all_btn: {
        color: "#10182AB2",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(12)
    },

    list_wrapper: {
        backgroundColor: "#ffffff",
        borderRadius: 10
    }
})