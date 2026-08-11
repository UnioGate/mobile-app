import { useSaleStore } from "@/stores/saleStore";
import { MainStackParamList } from "@/types/type";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";





type NavigationProp = NativeStackNavigationProp<MainStackParamList>;
export default function TimeOutScreen() {
    const navigation = useNavigation<NavigationProp>();




    const handleRestart = () => {
        useSaleStore.getState().setIsTimeOut(false)
        useSaleStore.getState().resetSale()
        navigation.replace("sales")
    }



    return (
        <View style={styles.timeout_wrapper} >

            <Ionicons name="warning" color={"#FF0707"} size={63} />

            <Text style={styles.timeout_heading} >TIMEOUT</Text>

            <TouchableOpacity
                onPress={handleRestart}
                style={[styles.button, {
                    width: "auto",
                    padding: scaleHorizontalPadding(10),
                    paddingVertical: scaleVerticalPadding(10),
                    marginTop: 7,
                    borderColor: "#253E86"
                }]}
                activeOpacity={0.7}
            >
                <Text style={[styles.buttonText, {
                    color: "#000000",
                    fontSize: scaleFont(20)
                }]} > Restart Payment</Text>
            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({
    // --------------------- styles for the timeout banner  ----------------------------- //
    timeout_wrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 16
    },

    timeout_heading: {
        color: "#FF0707",
        fontSize: scaleFont(48),
        fontFamily: "Sora_400Regular",
        marginVertical: 7
    },


    button: {
        width: "100%",
        borderWidth: 0.5,
        borderColor: "#253E86",
        borderRadius: 10,
        paddingVertical: scaleVerticalPadding(16),
        alignItems: "center",
        justifyContent: "center",
        marginTop: "auto",
    },

    buttonText: {
        color: "#253E86",
        fontSize: scaleFont(18),
        fontFamily: "Sora_400Regular",
    },
})


