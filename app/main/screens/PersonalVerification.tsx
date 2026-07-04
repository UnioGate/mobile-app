import CameraIcon from "@/components/icons/CameraIcon";
import CustomCheckbox from "@/components/ui/CustomCheckbox";
import CustomInput from "@/components/ui/ReusableInput";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CameraIcon as LucideCameraIcon, UserIcon } from "lucide-react-native";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Divider, RadioButton } from "react-native-paper";
import { MainStackParamList } from "../type";


type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function PersonalVerification() {
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
                    Personal Verification
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
                    paddingVertical: scaleVerticalPadding(10),
                    paddingHorizontal: scaleHorizontalPadding(15),
                    alignItems: "flex-start",
                    flexDirection: "column",
                    gap: 14
                }} >



                    <View style={{
                        width: "100%",
                        alignItems: "flex-start",
                        gap: 8,
                        flexDirection: "row",
                        padding: 0
                    }} >

                        <View style={{
                            backgroundColor: "#253E86",
                            height: 30,
                            width: 30,
                            borderRadius: "50%",
                            alignItems: "center",
                            justifyContent: "center"
                        }} >
                            <UserIcon color={"#ffffff"} height={16} width={16} />
                        </View>



                        <View style={{
                            gap: 12,
                            justifyContent: "flex-start",
                            alignItems: "flex-start"
                        }} >

                            <View style={{
                                width: "100%",
                                borderRadius: 10,
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10
                            }} >

                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_600SemiBold"
                                }} >
                                    Verify your identity to unlock Tier 2
                                </Text>
                            </View>


                            <View style={{
                                gap: 12
                            }} >


                                <View style={{
                                    width: "auto",
                                    gap: 8,
                                    alignItems: "center",
                                    flexDirection: "row"
                                }} >
                                    <Ionicons name="checkmark"
                                        color={"#2DBAA4"}
                                        size={18}
                                    />
                                    <Text
                                        style={{
                                            color: "#000000",
                                            fontSize: scaleFont(14),
                                            fontFamily: "Sora_400Regular"
                                        }}
                                    >Daily transaction limit: ₦20M   </Text>
                                </View>

                                <View style={{
                                    width: "auto",
                                    gap: 8,
                                    alignItems: "center",
                                    flexDirection: "row"
                                }} >
                                    <Ionicons name="checkmark"
                                        color={"#2DBAA4"}
                                        size={18}
                                    />
                                    <Text
                                        style={{
                                            color: "#000000",
                                            fontSize: scaleFont(14),
                                            fontFamily: "Sora_400Regular"
                                        }}
                                    >Daily withdrawal limit: ₦500K  </Text>
                                </View>

                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={{
                            backgroundColor: "#2DBAA4CC",
                            borderRadius: 10,
                            padding: 10,
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center"
                        }}

                        activeOpacity={0.7}
                    >
                        <Text style={{
                            color: "#000000",
                            fontFamily: "Sora_300Light",
                            fontSize: scaleFont(12)
                        }}>Upgrade to Tier 3 for higher limits</Text>
                    </TouchableOpacity>
                </View>


                {/* Type selection */}
                <View style={styles.form_wrapper} >
                    <Text style={styles.form_heading}>Step 1: ID Type Selection</Text>



                    <View style={[styles.inputs_wrapper, {
                        paddingVertical: scaleVerticalPadding(3),
                        paddingHorizontal: scaleHorizontalPadding(7),
                    }]} >


                        {/* NIN option row */}
                        <View style={{
                            width: "100%",
                            flexDirection: "row",
                            gap: 12,
                            alignItems: "flex-start"
                        }}>

                            <RadioButton value="" />

                            <View style={{
                                gap: 4
                            }} >
                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }} >NIN (National ID Number)</Text>

                                <Text style={{
                                    color: "#10182AB2",
                                    fontSize: scaleFont(12),
                                    fontFamily: "Sora_400Regular"
                                }} >Format: 11 digits</Text>
                            </View>
                        </View>

                        <Divider />

                        {/* Driver’s License option row */}
                        <View
                            style={{
                                width: "100%",
                                flexDirection: "row",
                                gap: 12,
                                alignItems: "flex-start",
                            }}
                        >
                            <RadioButton value="" />

                            <View
                                style={{
                                    flex: 1,
                                    gap: 4,
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular",
                                    }}
                                >
                                    Driver's License
                                </Text>

                                <Text
                                    style={{
                                        color: "#10182AB2",
                                        fontSize: scaleFont(12),
                                        fontFamily: "Sora_400Regular",
                                    }}
                                >
                                    Issued by the Federal Road Safety Corps (FRSC)
                                </Text>
                            </View>
                        </View>
                        <Divider />

                        {/* International Passport option row */}
                        <View
                            style={{
                                width: "100%",
                                flexDirection: "row",
                                gap: 12,
                                alignItems: "flex-start",
                            }}
                        >
                            <RadioButton value="" />

                            <View
                                style={{
                                    flex: 1,
                                    gap: 4,
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular",
                                    }}
                                >
                                    Driver's License
                                </Text>

                                <Text
                                    style={{
                                        color: "#10182AB2",
                                        fontSize: scaleFont(12),
                                        fontFamily: "Sora_400Regular",
                                    }}
                                >
                                    Issued by the Federal Road Safety Corps (FRSC)
                                </Text>
                            </View>
                        </View>

                    </View>
                </View>


                {/* NIN form */}
                <View style={styles.form_wrapper} >
                    <Text style={styles.form_heading}>Steps 2: Enter NIN</Text>

                    <View style={styles.inputs_wrapper} >

                        <CustomInput
                            keyboardType="number-pad"
                            containerStyle={{
                                borderColor: "#808080",
                                borderWidth: 0.5,
                                backgroundColor: "#ffffff"
                            }}
                            labelStyle={{
                                display: "none"
                            }}
                        />

                        <TextInput
                            keyboardType="default"
                            placeholder="Description (optional)"

                            style={{
                                color: "#10182AB2",
                                fontFamily: "Sora_400Regular",
                                fontSize: scaleFont(12),
                                padding: 0
                            }}
                        />
                    </View>
                </View >




                {/* step 3: upload documents */}
                <View style={styles.form_wrapper} >
                    <Text style={styles.form_heading}>Steps 3: Upload Documents</Text>


                    {/* NIN photo input  */}
                    <View style={{
                        width: "100%",
                        gap: 16,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "center"
                    }} >

                        <Pressable style={{
                            backgroundColor: "#FFFFFF",
                            borderRadius: 7,
                            paddingVertical: scaleVerticalPadding(8),
                            paddingHorizontal: scaleHorizontalPadding(13),
                            gap: 4,
                            width: "48%",
                            alignItems: "center",
                            justifyContent: "center"
                        }} >
                            <Text style={{
                                color: "#10182AB2",
                                fontSize: scaleFont(12),
                                fontFamily: "Sora_400Regular",
                                textAlign: "center"
                            }} >Upload front of NIN card</Text>
                            <CameraIcon style={{ width: 100 }} />
                        </Pressable>


                        <Pressable style={{
                            backgroundColor: "#FFFFFF",
                            borderRadius: 7,
                            paddingVertical: scaleVerticalPadding(8),
                            paddingHorizontal: scaleHorizontalPadding(13),
                            gap: 4,
                            width: "48%",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Text style={{
                                color: "#10182AB2",
                                fontSize: scaleFont(12),
                                fontFamily: "Sora_400Regular",
                                textAlign: "center"
                            }}>Upload back of NIN card</Text>

                            <CameraIcon style={{ width: 100 }} />
                        </Pressable>

                    </View>

                    <Pressable style={{
                        backgroundColor: "#ffffff",
                        borderRadius: 10,
                        paddingVertical: scaleVerticalPadding(9),
                        paddingHorizontal: scaleHorizontalPadding(21),
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <View style={{
                            gap: 5
                        }} >
                            <View style={{
                                gap: 8,
                                alignItems: "center",
                                flexDirection: "row"
                            }}>
                                <Text style={{
                                    color: "#000000",
                                    fontFamily: "Sora_400Regular",
                                    fontSize: scaleFont(14)
                                }} >Take a selfie</Text>
                                <LucideCameraIcon height={14} width={16} />
                            </View>

                            <Text style={{
                                color: "#10182AB2",
                                fontFamily: "Sora_400Regular",
                                fontSize: scaleFont(12)
                            }} >Hold your ID next to your face</Text>
                        </View>


                        <Image
                            source={require("../../../assets/personal_verification/NIN-is-mandatory-SGF 1.png")}
                            height={100}
                            width={100}
                        />
                    </Pressable>

                </View>



                <CustomCheckbox
                    label="I confirm this information is accurate."
                    linkText=""
                    path=""
                />



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

            </ScrollView>
        </View>


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
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(10)
    },


    heading: {
        color: "#000000",
        fontFamily: "PlusJakartaSans_500Medium",
        fontSize: scaleFont(21),
        flex: 1,
        textAlign: "center"
    },

    button_wrapper: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "4%",
    },

    button: {
        width: "46%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleVerticalPadding(14),
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
        fontSize: scaleFont(13),
        textAlign: "center"
    },


    scrollView_style: {
        flexGrow: 1,
        alignItems: "stretch",
        gap: 16,
        paddingBottom: scaleVerticalPadding(20),
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(2),
        backgroundColor: "#D3D8E7"
    },


    form_wrapper: {
        width: "100%",
        gap: 10
    },

    form_heading: {
        color: "#10182AB2",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(12)
    },

    inputs_wrapper: {
        width: "100%",
        borderRadius: 10,
        gap: 10,
        paddingVertical: scaleVerticalPadding(15),
        paddingHorizontal: scaleHorizontalPadding(13),
        backgroundColor: "#ffffff"
    },

    halfInput: {
        width: "47%",
    },


})
