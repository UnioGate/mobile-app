import CustomProgressBar from "@/components/ui/CustomProgressBar";
import { tierData } from "@/data/tier_data";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainStackParamList } from "../type";


type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function TransactionLimitScreen() {
    const navigation = useNavigation<OverviewNavigationProp>()


    return (
        <SafeAreaView style={styles.container} >


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
                    Transaction Limits
                </Text>


                <Pressable>
                </Pressable>

            </View>





            {/* main content  */}
            <ScrollView
                style={{ flex: 1, width: "100%" }}
                contentContainerStyle={styles.scrollView_style}
                showsVerticalScrollIndicator={false} >



                {/* current tier */}
                <View style={{
                    width: "100%",
                    backgroundColor: "#ffffff",
                    borderRadius: 10,
                    paddingVertical: scaleVerticalPadding(10),
                    paddingHorizontal: scaleHorizontalPadding(15),
                    alignItems: "flex-start",
                    flexDirection: "column",
                    gap: 14
                }} >



                    <View style={{
                        gap: 12
                    }} >

                        <View style={{
                            backgroundColor: "#253E8633",
                            width: "100%",
                            borderRadius: 5,
                            padding: 10
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "PlusJakartaSans_600SemiBold"
                            }} >
                                Tier 2: Personal Verified
                            </Text>
                        </View>


                        <View style={{
                            gap: 12
                        }} >


                            <View style={{
                                width: "auto",
                                gap: 8,
                                alignItems: "center",
                                flexDirection: "row"
                            }} >
                                <Ionicons name="checkmark"
                                    color={"#2DBAA4"}
                                    size={13}
                                />
                                <Text
                                    style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }}
                                >Daily transaction limit: ₦20M   </Text>
                            </View>

                            <View style={{
                                width: "auto",
                                gap: 8,
                                alignItems: "center",
                                flexDirection: "row"
                            }} >
                                <Ionicons name="checkmark"
                                    color={"#2DBAA4"}
                                    size={13}
                                />
                                <Text
                                    style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }}
                                >Daily withdrawal limit: ₦500K  </Text>
                            </View>

                        </View>
                    </View>


                    <TouchableOpacity style={{
                        backgroundColor: "#2DBAA4CC",
                        borderRadius: 10,
                        padding: 10,
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center"
                    }}

                        activeOpacity={0.7}
                    >
                        <Text style={{
                            color: "#000000",
                            fontFamily: "Sora_300Light",
                            fontSize: scaleFont(12)
                        }}>Upgrade to Tier 3 for higher limits</Text>
                    </TouchableOpacity>
                </View>




                {/* limit overview */}
                <View style={{
                    width: "100%",
                    gap: 10
                }} >

                    <Text style={styles.section_title} >Limit Overview</Text>

                    <View style={{
                        width: "100%",
                        gap: 10
                    }} >

                        {/* Daily transaction limit  */}
                        <View style={{
                            backgroundColor: "#ffffff",
                            paddingVertical: scaleVerticalPadding(7),
                            paddingHorizontal: scaleHorizontalPadding(17),
                            borderRadius: 10,
                            gap: 4
                        }} >

                            <View style={{
                                gap: 10
                            }} >

                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }}>Daily Transaction Limit</Text>



                                {/* The progress bar */}
                                <View style={{
                                    gap: 8
                                }} >

                                    <CustomProgressBar
                                        total={20000000}
                                        amount={4000000} />

                                    <View style={{
                                        width: "100%",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Text style={styles.p_element} > ₦3.2M </Text>
                                        <Text style={styles.p_element}> ₦20M </Text>
                                    </View>

                                </View>

                            </View>


                            <Text style={{
                                color: "#10182AB2",
                                fontSize: scaleFont(11),
                                fontFamily: "Sora_400Regular",
                                marginLeft: "auto"
                            }} >Resets in 8 hours</Text>
                        </View>


                        {/* Daily withdrawal limit  */}
                        <View style={{
                            backgroundColor: "#ffffff",
                            paddingVertical: scaleVerticalPadding(7),
                            paddingHorizontal: scaleHorizontalPadding(17),
                            borderRadius: 10,
                            gap: 4
                        }} >

                            <View style={{
                                gap: 10
                            }} >

                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }}>Daily Withdrawal Limit</Text>



                                {/* The progress bar */}
                                <View style={{
                                    gap: 8
                                }} >

                                    <CustomProgressBar
                                        total={20000000}
                                        amount={4000000} />

                                    <View style={{
                                        width: "100%",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Text style={styles.p_element} > 50k </Text>
                                        <Text style={styles.p_element}> ₦500k </Text>
                                    </View>

                                </View>

                            </View>


                            <Text style={{
                                color: "#10182AB2",
                                fontSize: scaleFont(11),
                                fontFamily: "Sora_400Regular",
                                marginLeft: "auto"
                            }} >Resets in 8 hours</Text>
                        </View>


                        {/* Monthly transaction limit  */}
                        <View style={{
                            backgroundColor: "#ffffff",
                            paddingVertical: scaleVerticalPadding(7),
                            paddingHorizontal: scaleHorizontalPadding(17),
                            borderRadius: 10,
                            gap: 4
                        }} >

                            <View style={{
                                gap: 10
                            }} >

                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }}>Monthly Transaction Limit</Text>



                                {/* The progress bar */}
                                <View style={{
                                    gap: 8
                                }} >

                                    <CustomProgressBar
                                        total={20000000}
                                        amount={4000000} />

                                    <View style={{
                                        width: "100%",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Text style={styles.p_element} > ₦3.2M </Text>
                                        <Text style={styles.p_element}>  ₦400M  </Text>
                                    </View>

                                </View>

                            </View>


                            <Text style={{
                                color: "#10182AB2",
                                fontSize: scaleFont(11),
                                fontFamily: "Sora_400Regular",
                                marginLeft: "auto"
                            }} >Resets in 25 days</Text>
                        </View>

                    </View>


                </View>




                {/* limit overview */}

                <View style={{
                    width: "100%",
                    gap: 10
                }} >

                    <Text style={styles.section_title} >Tier Comparison Table</Text>



                    <View style={styles.table}>

                        {/* Header */}
                        <View style={[styles.row]}>
                            <Text style={[styles.headerText, {
                                textAlign: "left",
                                fontSize: scaleFont(12),
                                flex: 1,
                            }]}>Tier</Text>
                            <Text style={[styles.headerText]}>Daily transaction limit</Text>
                            <Text style={styles.headerText}>Daily withdrawal limit</Text>
                            <Text style={styles.headerText}>Monthly withdrawal limit</Text>
                        </View>

                        {/* Rows */}
                        {tierData.map((item, index) => (
                            <View key={index} style={styles.row}>
                                <Text style={[styles.cell, {
                                    fontSize: scaleFont(11),
                                    flex: 1,
                                    textAlign: "left",
                                }]}>{item.tier}</Text>
                                <Text style={styles.cell}>{item.transaction}</Text>
                                <Text style={styles.cell}>{item.dailyWithdrawal}</Text>
                                <Text style={styles.cell}>{item.monthlyWithdrawal}</Text>
                            </View>
                        ))}

                    </View>
                </View>




                {/* CTA  */}
                <View style={{
                    gap: 10,
                    backgroundColor: "#ffffff",
                    borderRadius: 10,
                    paddingVertical: scaleVerticalPadding(6),
                    paddingHorizontal: scaleHorizontalPadding(16)
                }} >
                    <Text style={styles.p_element} >Increase your limits by upgrading</Text>


                    <TouchableOpacity style={{
                        backgroundColor: "#253E86",
                        borderRadius: 10,
                        padding: 12,
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center"
                    }}

                        activeOpacity={0.7}
                    >
                        <Text style={{
                            color: "#ffffff",
                            fontFamily: "Sora_400Regular",
                            fontSize: scaleFont(15)
                        }}>Upgrade to Tier 3</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D3D8E7',
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%"
    },

    header: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: scaleHorizontalPadding(15),
        paddingVertical: scaleVerticalPadding(9)
    },


    heading: {
        color: "#000000",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(16),
        flex: 1,
        textAlign: "center"
    },

    button_wrapper: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5,
        marginTop: 20
    },

    button: {
        width: "49%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleVerticalPadding(12),
        paddingHorizontal: scaleHorizontalPadding(23),
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "#253E86",
        gap: 8,
        flexWrap: "nowrap",
        textAlign: "center",
        height: "auto"
    },

    button_text: {
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(10),
        textAlign: "center"
    },


    scrollView_style: {
        flexGrow: 1,
        alignItems: "stretch",
        gap: 16,
        paddingBottom: scaleVerticalPadding(20),
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(15),
        backgroundColor: "#D3D8E7"
    },

    section_title: {
        color: "#10182AB2",
        fontSize: scaleFont(12),
        fontFamily: "Sora_400Regular"
    },

    p_element: {
        color: "#000000",
        fontSize: scaleFont(12),
        fontFamily: "Sora_400Regular"
    },


    table: {
        overflow: "hidden",
        gap: 8
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: scaleVerticalPadding(10),
        paddingHorizontal: scaleHorizontalPadding(7),
        backgroundColor: "#D9DEEC",
        borderRadius: 10
    },

    headerText: {
        flex: 1,
        fontSize: 12,
        color: "#000000",
        textAlign: "right",
        fontFamily: "Sora_400Regular"
    },
    cell: {
        flex: 1,
        fontSize: scaleFont(9),
        color: "#000000",
        textAlign: "right",
        fontFamily: "Sora_400Regular"
    },

})