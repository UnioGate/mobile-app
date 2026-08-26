import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Image, StyleSheet, Text, View } from "react-native";




export default function MaintenanceScreen() {
    return (
        <View style={styles.wrapper} >
            <Image
                source={require("../../../assets/icons/maintenance_logo.png")}
                style={{
                    height: 90,
                    width: 90,
                    marginBottom: 20
                }}
            />
            < Text style={styles.heading} >
                We’re Under Maintenance
            </Text >

            <Text style={styles.p} >
                We’ll be back shortly. Thanks for your patience
            </Text>
        </View >
    )
}



const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleVerticalPadding(20),
        paddingHorizontal: scaleHorizontalPadding(13),
        flexGrow: 1,
        flex: 1,
        gap: 10,
        backgroundColor: '#E9ECF3',
    },

    heading: {
        color: "#000000",
        fontSize: scaleFont(32),
        fontFamily: "Sora_600SemiBold",
        textAlign: "center"
    },

    p: {
        color: "#000000",
        fontSize: scaleFont(15),
        fontFamily: "Sora_400Regular",
        textAlign: "center"
    }
})