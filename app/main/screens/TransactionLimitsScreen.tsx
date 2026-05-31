import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
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
                    paddingVertical: scaleVerticalPadding(5),
                    paddingHorizontal: scaleHorizontalPadding(15)
                }} >

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
        gap: 12,
        paddingBottom: scaleVerticalPadding(20),
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(15),
        backgroundColor: "#D3D8E7"
    },



})