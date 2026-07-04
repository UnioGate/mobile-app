import ContactInfoForm from "@/components/EditBusinessInfo/ContactInfoForm";
import TradingInfoForm from "@/components/EditBusinessInfo/TradingInforForm";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BusinessInfoForm from "../../../components/EditBusinessInfo/BusinessInfoForm";
import { MainStackParamList } from "../type";




type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;
export default function EditBusinessInfo() {
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
                        size={22}
                        color="#10182A"
                    />
                </Pressable>


                <Text style={styles.heading}>
                    Edit Business Info
                </Text>


                <Pressable
                >
                </Pressable>

            </View>


            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollView_style}
                showsVerticalScrollIndicator={false} >



                <BusinessInfoForm />
                <ContactInfoForm />
                <TradingInfoForm />




                {/* Button wrapper */}
                <View style={styles.button_wrapper} >

                    <Pressable
                        onPress={() => navigation.goBack()}
                        style={[styles.button]} >
                        <Text style={[styles.button_text, {
                            color: "#253E86"
                        }]} >Cancel</Text>
                    </Pressable>


                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate("edit_business_info")}
                        style={[styles.button, {
                            backgroundColor: "#253E86"
                        }]} >
                        <Text style={[styles.button_text, {
                            color: "#ffffff"
                        }]} >Save Changes</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>


        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D3D8E7",
        display: "flex",
        flexDirection: "column",
        width: "100%"
    },

    header: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(10)
    },


    heading: {
        color: "#000000",
        fontFamily: "PlusJakartaSans_500Medium",
        fontSize: scaleFont(18),
    },

    button_wrapper: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16,
        marginTop: 10
    },

    button: {
        width: "47%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#253E86",
        marginBottom: 20
    },

    button_text: {
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(13),
    },


    scrollView_style: {
        width: "100%",
        flexGrow: 1,
        alignItems: "stretch",
        gap: 16,
        paddingBottom: scaleVerticalPadding(20),
        paddingHorizontal: scaleHorizontalPadding(18),
        paddingVertical: scaleVerticalPadding(10),
        backgroundColor: "#D3D8E7"
    },


})