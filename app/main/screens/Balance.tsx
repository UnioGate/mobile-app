import CalendarIcon from "@/components/icons/CalendarIcon";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Download, Eye } from "lucide-react-native";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MainStackParamList } from "../type";


type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function Balance() {
    const navigation = useNavigation<OverviewNavigationProp>()



    return (
        <View style={styles.container} >


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
                    Balance
                </Text>


                <View></View>

            </View>





            {/* main content  */}

            <View style={styles.main_component} >

                {/* Balance details  */}
                <View style={styles.balance_details} >
                    <Text style={styles.balance_text} >AVAILABLE BALANCE</Text>

                    <View style={styles.balance_wrapper} >
                        <Text style={styles.balance_amount} >₦247,850.50</Text>

                        <Pressable>
                            <Eye color={"#FFFFFF"} height={12} width={18} />
                        </Pressable>
                    </View>

                    <Text style={styles.date_text} >Last updated: Today 2:45 PM</Text>
                </View>


                {/* Breakdown  */}
                <View style={styles.breakdown_wrapper} >

                    <View style={styles.breakdown_row} >

                        <View style={styles.left_side} >

                            <View style={styles.dot} />

                            <View>
                                <Text style={styles.row_title} >Cleared</Text>
                                <Text style={styles.row_subtitle} >Available now</Text>
                            </View>
                        </View>

                        <Text style={styles.right_side_text} >₦247,850</Text>
                    </View>



                    <View style={[styles.breakdown_row, {
                        borderBottomWidth: 0.5,
                        borderBottomColor: "#FFFFFF80",
                        borderTopWidth: 0.5,
                        borderTopColor: "#FFFFFF80"
                    }]} >

                        <View style={styles.left_side} >

                            <View style={[styles.dot, {
                                backgroundColor: "#FEFB2D"
                            }]} />

                            <View>
                                <Text style={styles.row_title} >Pending</Text>
                                <Text style={styles.row_subtitle} >Pending settlement</Text>
                            </View>
                        </View>

                        <Text style={styles.right_side_text} >₦15,400</Text>
                    </View>



                    <View style={styles.breakdown_row} >

                        <View style={styles.left_side} >

                            <View style={[styles.dot, {
                                backgroundColor: "#FF0707",
                                borderRadius: 999
                            }]} />

                            <View>
                                <Text style={styles.row_title} >On Hold</Text>
                                <Text style={styles.row_subtitle} >Flagged transaction</Text>
                            </View>
                        </View>

                        <Text style={styles.right_side_text} >₦0</Text>
                    </View>

                </View>

            </View>






            {/* Buttons */}
            <View style={styles.button_wrapper} >


                <TouchableOpacity
                    onPress={() => navigation.navigate("withdraw")}
                    style={[styles.button, {
                        backgroundColor: "#253E86"
                    }]} >


                    <Download width={16} height={16} color={"#ffffff"} />


                    <Text style={[styles.button_text, {
                        color: "#ffffff"
                    }]} >Withdraw Funds</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button]} >

                    <CalendarIcon width={16} height={16} color={"#253E86"} />

                    <Text style={[styles.button_text, {
                        color: "#253E86"
                    }]} > Schedule</Text>
                </TouchableOpacity>


            </View>



        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9ECF3',
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 12,
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(20)
    },

    header: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },


    heading: {
        color: "#000000",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(16),
    },




    button_wrapper: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5
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
        marginBottom: 20,
        gap: 8
    },

    button_text: {
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(14),
    },


    main_component: {
        backgroundColor: "#253E86",
        padding: 20,
        borderRadius: 16,
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        gap: 16
    },


    balance_details: {
        width: "auto",
        alignItems: "flex-start",
        gap: 10
    },


    balance_text: {
        color: "#FFFFFFB2",
        fontSize: scaleFont(11),
        fontFamily: "Sora_600SemiBold"
    },


    date_text: {
        color: "#FFFFFFB2",
        fontFamily: "Sora_300Light",
        fontSize: scaleFont(11),
    },

    balance_wrapper: {
        width: "auto",
        flexDirection: "row",
        gap: 11,
        alignItems: "center",
        justifyContent: "center",
    },

    balance_amount: {
        color: "#FFFFFF",
        fontSize: scaleFont(34),
        fontFamily: "Sora_400Regular"
    },


    breakdown_wrapper: {
        width: "100%",
        backgroundColor: "#D0D8E80D",
        padding: 6,
        borderRadius: 8,
        gap: 7
    },


    dot: {
        width: 6,
        height: 6,
        backgroundColor: "#00BF50",
        borderRadius: 999
    },

    breakdown_row: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: scaleVerticalPadding(8)
    },

    left_side: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },

    row_title: {
        color: "#ffffff",
        fontSize: scaleFont(12),
        fontFamily: "Sora_600SemiBold"
    },

    row_subtitle: {
        color: "#FFFFFFB2",
        fontSize: scaleFont(10),
        fontFamily: "Sora_200ExtraLight"
    },



    right_side_text: {
        color: "#ffffff",
        fontSize: scaleFont(13),
        fontFamily: "Sora_600SemiBold"
    }




})