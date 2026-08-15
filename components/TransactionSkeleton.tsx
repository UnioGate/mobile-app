import { scaleVerticalPadding } from "@/utils/utils";
import { StyleSheet, View } from "react-native";

export function TransactionSkeleton() {
    return (
        <View style={styles.history_card}>
            <View style={styles.history_card_left_side}>
                <View style={styles.skeleton_logo} />

                <View style={styles.skeleton_text_wrapper}>
                    <View style={styles.skeleton_currency} />
                    <View style={styles.skeleton_time} />
                </View>
            </View>

            <View style={styles.skeleton_right_side}>
                <View style={styles.skeleton_amount} />
                <View style={styles.skeleton_status} />
            </View>
        </View>
    );
}





const styles = StyleSheet.create({

    history_card: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 2,
        marginBottom: scaleVerticalPadding(10),
        marginVertical: scaleVerticalPadding(15)
    },

    history_card_left_side: {
        width: "auto",
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexDirection: "row"
    },


    skeleton_logo: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#E5E7EB",
    },

    skeleton_text_wrapper: {
        gap: 6,
    },

    skeleton_currency: {
        width: 75,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#E5E7EB",
    },

    skeleton_time: {
        width: 55,
        height: 9,
        borderRadius: 5,
        backgroundColor: "#E5E7EB",
    },

    skeleton_right_side: {
        alignItems: "flex-end",
        gap: 6,
    },

    skeleton_amount: {
        width: 75,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#E5E7EB",
    },

    skeleton_status: {
        width: 45,
        height: 9,
        borderRadius: 5,
        backgroundColor: "#E5E7EB",
    },
})