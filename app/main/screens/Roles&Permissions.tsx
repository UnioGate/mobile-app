import PadlockIcon from "@/components/icons/PadlockIcon";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import { MainStackParamList } from "../type";


type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function Roles_And_Permissions() {
    const navigation = useNavigation<OverviewNavigationProp>()



    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable
                    aria-label="back-button"
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons
                        name="chevron-back"
                        size={22}
                        color="#10182A"
                    />
                </Pressable>

                <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    maxWidth: "90%"
                }} >
                    <Text style={styles.heading}>
                        Roles & Permissions
                    </Text>

                    <Text style={styles.screen_description} >
                        Manage what team members can do in the app.
                    </Text>
                </View>

                {/* spacer for centered title */}
                <View style={styles.headerSpacer} />
            </View>

            {/* Main Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >



                <View style={{
                    gap: 28,
                    width: "100%"
                }} >


                    {/* Default roles section  */}
                    <View style={{
                        gap: 6,
                        alignItems: "center",
                        width: "100%"
                    }} >

                        {/* top  */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row"
                        }} >
                            <Text
                                style={{
                                    fontFamily: "Sora_400Regular",
                                    fontSize: scaleFont(12)
                                }}
                            >Default Roles</Text>


                            <Pressable
                                onPress={() => navigation.navigate("create_roles")}
                                style={styles.settings_button} >

                                <Ionicons
                                    name="add-sharp"
                                    color={"#253E86"}
                                    size={17} />

                                <Text style={[styles.button_text, {
                                    color: "#253E86",
                                    fontFamily: "Sora_400Regular",
                                    fontSize: scaleFont(12)
                                }]} > Create Roles</Text>

                            </Pressable>

                        </View>

                        <View style={{
                            backgroundColor: "#FFFFFF",
                            width: "100%",
                            borderRadius: 10,
                            gap: 1
                        }} >

                            {/* rows  */}
                            <View style={{
                                width: "100%",
                                paddingVertical: scaleVerticalPadding(15),
                                paddingHorizontal: scaleHorizontalPadding(15),
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: "row"
                            }} >

                                <View style={{
                                    gap: 5,
                                    alignItems: "flex-start",
                                    maxWidth: 260,
                                }} >
                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }} >Admin (You)</Text>

                                    <Text style={{
                                        color: "#10182AB2",
                                        fontSize: scaleFont(12),
                                        fontFamily: "Sora_400Regular"
                                    }}>Full access to everything</Text>
                                </View>


                                <PadlockIcon />
                            </View>

                            <Divider style={{
                                backgroundColor: "#808080"
                            }} />


                            <View style={{
                                width: "100%",
                                paddingVertical: scaleVerticalPadding(15),
                                paddingHorizontal: scaleHorizontalPadding(15),
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: "row"
                            }} >

                                <View style={{
                                    gap: 5,
                                    alignItems: "flex-start",
                                    maxWidth: 260,
                                }} >

                                    <View style={{
                                        width: "auto",
                                        alignItems: "center",
                                        gap: 10,
                                        flexDirection: "row",
                                        justifyContent: "center"
                                    }}>

                                        <Text style={{
                                            color: "#000000",
                                            fontSize: scaleFont(14),
                                            fontFamily: "Sora_400Regular"
                                        }} >Manager</Text>

                                        <View
                                            style={{
                                                width: 5,
                                                height: 5,
                                                backgroundColor: "#10182AB2",
                                                borderRadius: "50%"
                                            }}
                                        />

                                        <Text style={{
                                            color: "#10182AB2",
                                            fontSize: scaleFont(11),
                                            fontFamily: "Sora_400Regular"
                                        }} >2 members</Text>
                                    </View>

                                    <Text style={{
                                        color: "#10182AB2",
                                        fontSize: scaleFont(12),
                                        fontFamily: "Sora_400Regular"
                                    }}>Can view financials, manage payments</Text>
                                </View>


                                <Pressable style={styles.edit_btn} >
                                    <Text style={styles.edit_btn_text} >Edit</Text>
                                </Pressable>

                            </View>


                            <Divider style={{
                                backgroundColor: "#808080"
                            }} />





                            <View style={{
                                width: "100%",
                                paddingVertical: scaleVerticalPadding(15),
                                paddingHorizontal: scaleHorizontalPadding(15),
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: "row"
                            }} >

                                <View style={{
                                    gap: 5,
                                    alignItems: "flex-start",
                                    maxWidth: 260,
                                }} >

                                    <View style={{
                                        width: "auto",
                                        alignItems: "center",
                                        gap: 10,
                                        flexDirection: "row",
                                        justifyContent: "center"
                                    }}>

                                        <Text style={{
                                            color: "#000000",
                                            fontSize: scaleFont(14),
                                            fontFamily: "Sora_400Regular"
                                        }} >Sales Representative</Text>

                                        <View
                                            style={{
                                                width: 5,
                                                height: 5,
                                                backgroundColor: "#10182AB2",
                                                borderRadius: "50%"
                                            }}
                                        />

                                        <Text style={{
                                            color: "#10182AB2",
                                            fontSize: scaleFont(11),
                                            fontFamily: "Sora_400Regular"
                                        }} >3 members</Text>
                                    </View>

                                    <Text style={{
                                        color: "#10182AB2",
                                        fontSize: scaleFont(12),
                                        fontFamily: "Sora_400Regular"
                                    }}>Can process payments only</Text>
                                </View>


                                <Pressable style={styles.edit_btn} >
                                    <Text style={styles.edit_btn_text} >Edit</Text>
                                </Pressable>

                            </View>


                        </View>

                    </View>


                    <View style={{
                        gap: 6,
                        alignItems: "center",
                        width: "100%"
                    }} >

                        {/* top  */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row"
                        }} >
                            <Text
                                style={{
                                    fontFamily: "Sora_400Regular",
                                    fontSize: scaleFont(12)
                                }}
                            >Custom Roles</Text>
                        </View>

                        <View style={{
                            backgroundColor: "#FFFFFF",
                            width: "100%",
                            borderRadius: 10,
                            gap: 5
                        }} >


                            <View style={{
                                width: "100%",
                                paddingVertical: scaleVerticalPadding(15),
                                paddingHorizontal: scaleHorizontalPadding(15),
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: "row"
                            }} >

                                <View style={{
                                    gap: 5,
                                    alignItems: "flex-start",
                                    maxWidth: 260,
                                }} >

                                    <View style={{
                                        width: "auto",
                                        alignItems: "center",
                                        gap: 10,
                                        flexDirection: "row",
                                        justifyContent: "center"
                                    }}>

                                        <Text style={{
                                            color: "#000000",
                                            fontSize: scaleFont(14),
                                            fontFamily: "Sora_400Regular"
                                        }} >Role Name</Text>

                                        <View
                                            style={{
                                                width: 5,
                                                height: 5,
                                                backgroundColor: "#10182AB2",
                                                borderRadius: "50%"
                                            }}
                                        />

                                        <Text style={{
                                            color: "#10182AB2",
                                            fontSize: scaleFont(11),
                                            fontFamily: "Sora_400Regular"
                                        }} >Member count</Text>
                                    </View>

                                    <Text style={{
                                        color: "#10182AB2",
                                        fontSize: scaleFont(12),
                                        fontFamily: "Sora_400Regular"
                                    }}>Summary of permission</Text>
                                </View>


                                <Pressable style={styles.edit_btn} >
                                    <Text style={styles.edit_btn_text} >Edit</Text>
                                </Pressable>

                            </View>

                        </View>

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
                        }]} >Save changes</Text>
                    </TouchableOpacity>

                </View>



            </ScrollView>
        </View>



    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E9ECF3"
    },

    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(10),
    },

    backButton: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
    },

    headerSpacer: {
        width: "10%",
    },

    heading: {
        color: "#10182A",
        fontFamily: "PlusJakartaSans_500Medium",
        fontSize: scaleFont(21),
    },

    scrollView: {
        flex: 1,
    },

    scrollViewContent: {
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(5),
        gap: 16,
        flexGrow: 1,
        paddingBottom: scaleVerticalPadding(20)
    },

    screen_description: {
        fontSize: scaleFont(12),
        color: "#10182AB2",
        fontFamily: "Sora_400Regular",
        textAlign: "center",
        width: "100%"
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



    settings_button: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleVerticalPadding(4),
        paddingHorizontal: scaleHorizontalPadding(4),
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "#253E86",
        gap: 4,
        flexWrap: "nowrap",
        textAlign: "center",
        height: "auto"
    },


    edit_btn: {
        width: "auto",
        borderWidth: 1,
        borderColor: "#009A49",
        paddingHorizontal: scaleHorizontalPadding(12),
        paddingVertical: scaleVerticalPadding(4),
        borderRadius: 7
    },

    edit_btn_text: {
        color: "#009A49",
        fontSize: scaleFont(12),
        fontFamily: "Sora_400Regular"
    }


})
