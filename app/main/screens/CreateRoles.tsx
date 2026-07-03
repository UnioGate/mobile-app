import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import { MainStackParamList } from "../type";





type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function CreateRoles() {
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
                    Create Role
                </Text>


                <Pressable>
                </Pressable>

            </View>





            {/* main content  */}
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollView_style}
                showsVerticalScrollIndicator={false} >


                {/* Role name input */}
                <View style={{
                    width: "100%",
                    backgroundColor: "#ffffff",
                    borderRadius: 10,
                    paddingVertical: scaleVerticalPadding(9),
                    paddingHorizontal: scaleHorizontalPadding(13),
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 6
                }}  >

                    <View style={{
                        width: "100%",
                        gap: 10
                    }} >
                        <Text style={{
                            fontFamily: "Sora_400Regular",
                            fontSize: scaleFont(12),
                            color: "#10182AB2"
                        }}>Role name</Text>

                        <TextInput
                            style={{
                                borderColor: "#B3B3B3",
                                borderWidth: 0.5,
                                borderRadius: 5,
                                paddingVertical: scaleVerticalPadding(12),
                                paddingHorizontal: scaleHorizontalPadding(10),
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular",
                                color: "#10182AB2"
                            }}
                        />
                    </View>

                    <Divider style={{
                        backgroundColor: "#B3B3B3"
                    }} />

                    <TextInput
                        style={{
                            paddingVertical: scaleVerticalPadding(12),
                            paddingHorizontal: scaleHorizontalPadding(10),
                            fontSize: scaleFont(12),
                            fontFamily: "Sora_400Regular",
                            color: "#808080"
                        }}
                        placeholder="Description (optional)"
                    />

                </View>



                {/* Permission */}
                <View style={{
                    gap: 10
                }}>
                    <Text style={{
                        color: "#10182AB2",
                        fontFamily: "Sora_400Regular",
                        fontSize: scaleFont(12)
                    }}>Permission</Text>




                    <View style={{
                        width: "100%",
                        backgroundColor: "#ffffff",
                        borderRadius: 10,
                        paddingHorizontal: scaleHorizontalPadding(14),
                        paddingVertical: scaleVerticalPadding(4)
                    }} >

                        {/* Process Payments row  */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Process payments</Text>

                            <Switch />
                        </View>


                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />

                        {/* View all transactions row  */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >View all transactions</Text>

                            <Switch />
                        </View>

                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        {/* View settlement settings row */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >View settlement settings</Text>

                            <Switch />
                        </View>

                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        {/* View Balance */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >View balance</Text>

                            <Switch />
                        </View>


                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        {/* Initiate withdrawals */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Initiate withdrawals</Text>

                            <Switch />
                        </View>


                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        {/* View financial reports  */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >View financial reports</Text>

                            <Switch />
                        </View>


                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        {/* View team members  */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >View team members</Text>

                            <Switch />
                        </View>

                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        {/* Edit team members  */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Edit team members</Text>

                            <Switch />
                        </View>


                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        {/* View remove team members  */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Remove team members</Text>

                            <Switch />
                        </View>

                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        {/* Access settings  */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Access settings</Text>

                            <Switch />
                        </View>


                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        {/* Edit business info  */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Edit business info</Text>

                            <Switch />
                        </View>


                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        {/* Manage payment methods  */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Manage payments methods</Text>

                            <Switch />
                        </View>


                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        {/* View KYC documents  */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >View KYC documents</Text>

                            <Switch />
                        </View>


                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        {/* Manage bank documents  */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Manage bank documents</Text>

                            <Switch />
                        </View>


                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />


                        {/* Edit settlement settings  */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingVertical: scaleVerticalPadding(5),
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }} >Edit settlement settings</Text>

                            <Switch />
                        </View>
                    </View>



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
                            onPress={() => navigation.navigate("invitation_sent")}
                            style={[styles.button, {
                                backgroundColor: "#253E86"
                            }]} >
                            <Text style={[styles.button_text, {
                                color: "#ffffff"
                            }]} >Send Invite</Text>
                        </TouchableOpacity>

                    </View>


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
        fontSize: scaleFont(21),
    },

    button_wrapper: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16,
        marginTop: 20
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
        gap: 28,
        paddingBottom: scaleVerticalPadding(20),
        paddingHorizontal: scaleHorizontalPadding(18),
        paddingVertical: scaleVerticalPadding(10),
        backgroundColor: "#D3D8E7"
    },
})