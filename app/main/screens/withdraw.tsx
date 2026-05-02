import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "lucide-react-native";
import { Pressable, StyleSheet, Text } from "react-native";
import { MainStackParamList } from "../type";

type NavigationProp = NativeStackNavigationProp<
    MainStackParamList
>;


export default function Withdraw() {
    const navigation = useNavigation<NavigationProp>();


    return (
        <View style={styles.container} >


            {/* The header */}
            <View style={styles.header} >

                <Pressable
                    aria-label="back-button"
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={22} color="#10182A" />
                </Pressable>


                <Text style={styles.heading} >
                    Withdraw funds
                </Text>

            </View>

        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9ECF3',
        display: "flex",
        flexDirection: "column",
        gap: 17,
        paddingHorizontal: 19,
        paddingBottom: 15,
        paddingTop: 30,
    },

    scrollView_container: {
        display: "flex",
        alignItems: "stretch",
        flexDirection: "column",
        gap: 17,
        width: "100%"
    },

    header: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },

    heading: {
        color: "#10182A",
        fontFamily: "PlusJakartaSans_500Medium",
        fontSize: 22
    },

})