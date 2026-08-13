import { StyleSheet, View } from "react-native";

export const BankDetailSkeleton = () => {
    return (
        <View style={{ gap: 8 }}>
            <View style={styles.skeletonLarge} />
            <View style={styles.skeletonMedium} />
            <View style={styles.skeletonSmall} />
        </View>
    );
};


const styles = StyleSheet.create({
    skeletonLarge: {
        width: 110,
        height: 14,
        borderRadius: 4,
        backgroundColor: "#E0E0E0",
    },

    skeletonMedium: {
        width: 130,
        height: 13,
        borderRadius: 4,
        backgroundColor: "#E0E0E0",
    },

    skeletonSmall: {
        width: 90,
        height: 10,
        borderRadius: 4,
        backgroundColor: "#E0E0E0",
    },
})