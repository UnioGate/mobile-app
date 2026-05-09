import SuccessSVG from "@/components/ui/success";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";




export default function Withdraw_Details() {
    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollView_container}
            showsVerticalScrollIndicator={false}
        >

            <View style={styles.heading} >
                <Text style={styles.heading_text} >Withdrawal Details </Text>
                <SuccessSVG width={110} height={110} />
                <Text style={{
                    color: "#009A49",
                    fontSize: 22,
                    fontFamily: "PlusJakartaSans_500Medium"
                }}>Completed</Text>
            </View>



            {/* withdrawal info */}
            <View style={styles.withdrawal_summary_wrapper} >
                <Text style={styles.withdrawal_summary_header} >Withdrawal Info</Text>

                <View style={styles.line_break} />


                {/* amount */}
                <View style={styles.withdrawal_summary_row} >
                    <Text style={styles.withdrawal_summary_row_heading} >Amount</Text>
                    <Text style={styles.withdrawal_summary_row_value} >₦0</Text>
                </View>


                {/* fee  */}
                <View style={styles.withdrawal_summary_row} >
                    <Text style={styles.withdrawal_summary_row_heading} >Fee</Text>
                    <Text style={styles.withdrawal_summary_row_value} >₦0</Text>
                </View>


                {/* net amount  */}
                <View style={styles.withdrawal_summary_row} >
                    <Text style={styles.withdrawal_summary_row_heading} >Net Amount</Text>
                    <Text style={styles.withdrawal_summary_row_value} >₦0</Text>
                </View>

                {/* reference */}
                <View style={styles.withdrawal_summary_row} >
                    <Text style={styles.withdrawal_summary_row_heading} >Reference:</Text>

                    <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }} >
                        <Text style={styles.withdrawal_summary_row_value} >WD-2026306-0012</Text>

                        <Ionicons
                            name="copy-outline"
                            size={15}
                            style={{ fontWeight: 500 }} />
                    </View>
                </View>

                {/* bank */}
                <View style={styles.withdrawal_summary_row} >
                    <Text style={styles.withdrawal_summary_row_heading} >Bank:</Text>
                    <Text style={styles.withdrawal_summary_row_value} >GTBank</Text>
                </View>


                {/* account number */}
                <View style={styles.withdrawal_summary_row} >
                    <Text style={styles.withdrawal_summary_row_heading} >Account number:</Text>
                    <Text style={styles.withdrawal_summary_row_value} >0123456789</Text>
                </View>

                {/* account name  */}
                <View style={styles.withdrawal_summary_row} >
                    <Text style={styles.withdrawal_summary_row_heading} >Account Name:</Text>
                    <Text style={styles.withdrawal_summary_row_value} >John Doe</Text>
                </View>


                {/* account name  */}
                <View style={[styles.withdrawal_summary_row, {
                    borderTopWidth: 1,
                    borderColor: "#B3B3B3",
                    paddingTop: 8,
                    marginTop: 4
                }]} >
                    <Text style={styles.withdrawal_summary_row_heading} >Narration - </Text>
                    <Text style={styles.withdrawal_summary_row_value} ></Text>
                </View>


            </View>



            {/* Timeline  */}
            <View>
                <Text style={styles.timeline_header}  >Timeline</Text>

                <View style={styles.timeline_wrapper}  >


                    {/* time initiated  */}
                    <View style={styles.timeline_row} >

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 8
                        }} >
                            <View style={styles.dot} />
                            <Text style={styles.timeline_row_head} >Initiated</Text>
                        </View>



                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 14
                        }} >
                            <View style={{
                                backgroundColor: "#5C5050",
                                width: 3,
                                height: 3,
                                borderRadius: 9999
                            }} />
                            <Text style={styles.timeline_row_value} >March 6, 2026 at 3:15 PM</Text>
                        </View>

                    </View>



                    {/* Processing time  */}
                    <View style={styles.timeline_row} >

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 8
                        }} >
                            <View style={[styles.dot, {
                                backgroundColor: "#F7AA1A"
                            }]} />
                            <Text style={styles.timeline_row_head} >Processing</Text>
                        </View>



                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 14
                        }} >
                            <View style={{
                                backgroundColor: "#5C5050",
                                width: 3,
                                height: 3,
                                borderRadius: 9999
                            }} />
                            <Text style={styles.timeline_row_value} >March 6, 2026 at 3:16 PM</Text>
                        </View>

                    </View>


                    {/* Time completed  */}
                    <View style={styles.timeline_row} >

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 8
                        }} >
                            <View style={[styles.dot, {
                                backgroundColor: "#009A49"
                            }]} />
                            <Text style={[styles.timeline_row_head, {
                                color: "#009A49",
                                fontFamily: "Sora_600SemiBold"
                            }]} >Completed</Text>
                        </View>



                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 14
                        }} >
                            <View style={{
                                backgroundColor: "#5C5050",
                                width: 3,
                                height: 3,
                                borderRadius: 9999
                            }} />
                            <Text style={[styles.timeline_row_value, {
                                color: "#009A49"
                            }]} >March 6, 2026 at 3:45 PM</Text>
                        </View>

                    </View>
                </View>

            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate("withdraw_details")}
                style={[styles.button, {
                    backgroundColor: "#253E86"
                }]} >
                <Text style={[styles.button_text, {
                    color: "#ffffff"
                }]} >Download Receipt (PDF)</Text>
            </TouchableOpacity>


            <Pressable style={styles.support_wrapper}  >
                <Ionicons name="headset-sharp" color={"#10182AB2"} size={14} />
                <Text style={{
                    color: "#10182AB2",
                    fontSize: 12,
                    fontFamily: "Sora_400Regular"
                }} >Contact Support</Text>
            </Pressable>

        </ScrollView>
    )
}



const styles = StyleSheet.create({
    scrollView_container: {
        display: "flex",
        alignItems: "stretch",
        flexDirection: "column",
        gap: 22,
        width: "100%",
        backgroundColor: '#E9ECF3',
        paddingHorizontal: 19,
        paddingBottom: 15,
        paddingTop: 30,
    },


    heading: {
        flexDirection: "column",
        gap: 10,
        alignItems: "center"
    },

    heading_text: {
        color: "#10182A",
        fontSize: 20,
        fontFamily: "Sora_600SemiBold",
    },


    withdrawal_summary_wrapper: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: "column",
        gap: 4,
    },

    withdrawal_summary_header: {
        color: "#000000",
        fontSize: 16,
        fontFamily: "Sora_600SemiBold",
    },

    withdrawal_summary_row: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
        paddingVertical: 3,
    },

    withdrawal_summary_row_heading: {
        color: "#808080",
        fontSize: 12,
        fontFamily: "Sora_400Regular"
    },

    withdrawal_summary_row_value: {
        fontSize: 14,
        color: "#000000",
        fontFamily: "Sora_600SemiBold"
    },

    line_break: {
        width: "100%",
        borderTopWidth: 1,
        borderColor: "#B3B3B3",
        marginTop: 4,
        marginBottom: 7
    },

    timeline_header: {
        color: "#000000",
        fontSize: 16,
        fontFamily: "Sora_600SemiBold",
        marginBottom: 6
    },

    timeline_wrapper: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 15,
        flexDirection: "column",
        gap: 12,
    },

    timeline_row: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 25
    },

    timeline_row_head: {
        color: "#10182ACC",
        fontSize: 14,
        fontFamily: "Sora_400Regular"
    },

    timeline_row_value: {
        color: "#000000",
        fontSize: 14,
        fontFamily: "Sora_400Regular",
        alignItems: "center",
        display: "flex"
    },

    dot: {
        backgroundColor: "#253E86",
        width: 7,
        height: 7,
        borderRadius: 9999
    },

    button: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#253E86",
    },

    button_text: {
        fontFamily: "Sora_400Regular",
        fontSize: 14,
    },

    support_wrapper: {
        width: "auto",
        alignItems: "center",
        flexDirection: "row",
        gap: 4,
        marginLeft: "auto",
        marginBottom: 20
    }

})
