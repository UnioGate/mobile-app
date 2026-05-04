import SuccessSVG from "@/components/ui/success";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function Withdrawal_Initiated() {
    return (

        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollView_container}
            showsVerticalScrollIndicator={false}
        >

            <View style={styles.heading} >
                <Text style={styles.heading_text} >Withdrawal Initiated </Text>
                <SuccessSVG width={110} height={110} />
            </View>


            {/* withdrawal summary */}
            <View style={styles.withdrawal_summary_wrapper} >
                <Text style={styles.withdrawal_summary_header} >Withdrawal Summary</Text>

                <View style={styles.line_break} />



                <View>
                    <Text>Amount</Text>
                    <Text>₦0</Text>
                </View>

            </View>



            {/* note */}
            <View style={styles.note} >
                <Text style={styles.note_text} >We’ll send you an SMS when funds arrive</Text>
            </View>


            {/* Buttons  */}
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("withdraw_initiated")}
                    style={[styles.button, {
                        backgroundColor: "#253E86"
                    }]} >
                    <Text style={[styles.button_text, {
                        color: "#ffffff"
                    }]} >View Withdrawal Details</Text>
                </TouchableOpacity>


                <TouchableOpacity style={[styles.button]} >
                    <Text style={[styles.button_text, {
                        color: "#253E86"
                    }]} >Done</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}



const styles = StyleSheet.create({
    scrollView_container: {
        display: "flex",
        alignItems: "stretch",
        flexDirection: "column",
        gap: 17,
        width: "100%",
        backgroundColor: '#E9ECF3',
        flex: 1,
        paddingHorizontal: 19,
        paddingBottom: 15,
        paddingTop: 30,
    },


    heading: {
        flexDirection: "column",
        gap: 30,
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

    line_break: {
        width: "100%",
        borderTopWidth: 1,
        borderColor: "#B3B3B3",
        marginTop: 4,
        marginBottom: 7
    },


    note: {
        paddingVertical: 13,
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 0.7,
        borderBottomWidth: 0.7,
        borderColor: "#727171"
    },

    note_text: {
        fontFamily: "Sora_400Regular",
        fontSize: 13,
        color: "#727171"
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
        marginBottom: 20
    },

    button_text: {
        fontFamily: "Sora_400Regular",
        fontSize: 14,
    },
})