import { addTeamMember } from "@/api/businessService.api";
import { inviteBody } from "@/types/types";
import { showErrorToast } from "@/utils/toastConfig";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding, updateFormField } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Divider, RadioButton } from "react-native-paper";
import { MainStackParamList } from "../type";
;

type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;


export default function AddTeamMember() {
    const navigation = useNavigation<OverviewNavigationProp>()
    const [loading, setLoading] = useState(false)
    const [formValues, setFormValues] = useState({
        email: ""
    })



    // Validation functions
    const validateEmail = (value: string) => {
        if (!value.trim()) return "Email is required"

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Enter a valid email';
        return '';
    }




    // this function sends an invite to team members
    const addMember = async () => {

        const error =
            validateEmail(formValues.email);


        if (error) {
            showErrorToast(error)
            return;
        }

        try {
            setLoading(true)
            const payload: inviteBody = {
                identifier: formValues.email.toLowerCase(),
                type: "email"
            }

            const response = await addTeamMember(payload)

            if (!response.ok) {
                console.error(response.error)
                showErrorToast(response.error)
                return;
            }

            setFormValues({
                email: ""
            })
            navigation.navigate("invitation_sent")
            return;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                showErrorToast(
                    error.response?.data?.message ??
                    error.message
                );
                console.log("Status:", error.response?.status);
                console.log("Response Data:", error.response?.data);
                console.log("Response Headers:", error.response?.headers);
                console.log("Request Config:", error.config);
            }
        }
        finally {
            setLoading(false)
        }
    }


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

                <Text style={styles.heading}>
                    Add Team Member
                </Text>

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
                    width: "100%",
                    gap: 33,
                }} >


                    <View style={{
                        backgroundColor: "#ffffff",
                        width: "100%",
                        borderRadius: 10,
                        gap: 1
                    }} >

                        {/* Full name input */}
                        {/* <View style={{
                            width: "100%",
                            paddingHorizontal: scaleHorizontalPadding(10),
                            paddingVertical: scaleVerticalPadding(4)
                        }} >

                            <TextInput
                                placeholder="Full name"
                                style={{
                                    fontSize: scaleFont(14),
                                    color: "#10182AB2",
                                    fontFamily: "Sora_400Regular"
                                }}
                            />

                        </View> */}

                        {/* <Divider style={{
                            backgroundColor: "#808080"
                        }} /> */}


                        {/* Phone number */}
                        {/* <View style={{
                            width: "100%",
                            paddingHorizontal: scaleHorizontalPadding(10),
                            paddingVertical: scaleVerticalPadding(4)
                        }} >

                            <TextInput
                                keyboardType="phone-pad"
                                placeholder="Phone number"
                                style={{
                                    fontSize: scaleFont(14),
                                    color: "#10182AB2",
                                    fontFamily: "Sora_400Regular"
                                }}
                            />

                        </View> */}


                        {/* <Divider style={{
                            backgroundColor: "#808080"
                        }} /> */}


                        {/* Email address (optional) */}
                        <View style={{
                            width: "100%",
                            paddingHorizontal: scaleHorizontalPadding(10),
                            paddingVertical: scaleVerticalPadding(4)
                        }} >

                            <TextInput
                                keyboardType="email-address"
                                placeholder="Email address"
                                style={{
                                    fontSize: scaleFont(14),
                                    color: "#10182AB2",
                                    fontFamily: "Sora_400Regular"
                                }}
                                value={formValues.email}
                                onChangeText={(text) => updateFormField("email", text, setFormValues)}
                            />

                        </View>

                    </View>


                    {/* assign role section  */}
                    <View style={{
                        gap: 10,
                        display: "none"
                    }} >

                        <Text style={{
                            color: "#10182AB2",
                            fontSize: scaleFont(12),
                            fontFamily: "Sora_400Regular"
                        }} >
                            Assign Role
                        </Text>

                        <View style={{
                            width: "100%",
                            backgroundColor: "#ffffff",
                            paddingHorizontal: scaleHorizontalPadding(7),
                            paddingVertical: scaleVerticalPadding(5),
                            borderRadius: 10
                        }} >


                            {/* manager */}
                            <View style={{
                                width: "100%",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                flexDirection: "row",
                                gap: 12,
                                paddingVertical: scaleVerticalPadding(12),
                            }} >
                                <RadioButton
                                    value="false"
                                />

                                <View style={{
                                    maxWidth: 230,
                                    gap: 4
                                }} >

                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }}>Manager</Text>


                                    <Text style={{
                                        color: "#10182AB2",
                                        fontSize: scaleFont(12),
                                        fontFamily: "Sora_400Regular"
                                    }} >Can view balance and all transactions.
                                        Cannot withdraw.</Text>
                                </View>

                            </View>

                            <Divider style={{
                                backgroundColor: "#808080"
                            }} />



                            {/* sales rep */}

                            <View style={{
                                width: "100%",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                flexDirection: "row",
                                gap: 12,
                                paddingVertical: scaleVerticalPadding(12),
                            }} >
                                <RadioButton
                                    value="false"
                                />

                                <View style={{
                                    maxWidth: 230,
                                    gap: 4
                                }} >

                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }}>Sales Representative</Text>


                                    <Text style={{
                                        color: "#10182AB2",
                                        fontSize: scaleFont(12),
                                        fontFamily: "Sora_400Regular"
                                    }} >Can process payment only. Cannot view balance or settings.</Text>
                                </View>

                            </View>

                            <Divider style={{
                                backgroundColor: "#808080"
                            }} />



                            <View style={{
                                width: "100%",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                flexDirection: "row",
                                gap: 12,
                                paddingVertical: scaleVerticalPadding(12),
                            }} >
                                <RadioButton
                                    value="false"
                                />

                                <View style={{
                                    maxWidth: 230,
                                    gap: 4
                                }} >

                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }}>Custom Role</Text>


                                    <Text style={{
                                        color: "#10182AB2",
                                        fontSize: scaleFont(12),
                                        fontFamily: "Sora_400Regular"
                                    }} >Custom Role description.</Text>
                                </View>

                            </View>


                        </View>
                    </View>


                    {/* Permission Preview */}
                    <View style={{
                        gap: 10,
                        display: "none"
                    }} >

                        <Text style={{
                            color: "#10182AB2",
                            fontSize: scaleFont(12),
                            fontFamily: "Sora_400Regular"
                        }} >
                            Permission Preview
                        </Text>

                        <View style={{
                            width: "100%",
                            backgroundColor: "#ffffff",
                            paddingHorizontal: scaleHorizontalPadding(7),
                            paddingVertical: scaleVerticalPadding(2),
                            borderRadius: 10,
                            gap: 12
                        }} >


                            {/* Process Payment */}
                            <View style={{
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                flexDirection: "row",
                                gap: 10,
                            }} >
                                <RadioButton
                                    value="false"
                                />

                                <View style={{
                                    maxWidth: 230,
                                    gap: 4
                                }} >

                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }}>Process Payment</Text>

                                </View>

                            </View>


                            {/* View Balance */}

                            <View style={{
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                flexDirection: "row",
                                gap: 10,
                            }} >
                                <RadioButton
                                    value="false"
                                />

                                <View style={{
                                    maxWidth: 230,
                                    gap: 4
                                }} >

                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }}>View Balance</Text>

                                </View>

                            </View>
                            {/* ------------------------------------------- */}

                            <View style={{
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                flexDirection: "row",
                                gap: 10,
                            }} >
                                <RadioButton
                                    value="false"
                                />

                                <View style={{
                                    maxWidth: 230,
                                    gap: 4
                                }} >

                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }}>View Transactions</Text>

                                </View>

                            </View>


                            <View style={{
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                flexDirection: "row",
                                gap: 10,
                            }} >
                                <RadioButton
                                    value="false"
                                />

                                <View style={{
                                    maxWidth: 230,
                                    gap: 4
                                }} >

                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }}>Withdraw Funds</Text>

                                </View>

                            </View>


                        </View>
                    </View>



                    {/* Invite Method */}
                    <View style={{
                        gap: 10,
                        display: "none"
                    }} >

                        <Text style={{
                            color: "#10182AB2",
                            fontSize: scaleFont(12),
                            fontFamily: "Sora_400Regular"
                        }} >
                            Invite Method
                        </Text>

                        <View style={{
                            width: "100%",
                            backgroundColor: "#ffffff",
                            paddingHorizontal: scaleHorizontalPadding(7),
                            paddingVertical: scaleVerticalPadding(2),
                            borderRadius: 10,
                            gap: 12
                        }} >



                            {/* View Balance */}

                            <View style={{
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                flexDirection: "row",
                                gap: 10,
                            }} >
                                <RadioButton
                                    value="false"
                                />

                                <View style={{
                                    maxWidth: 230,
                                    gap: 4
                                }} >

                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }}>Send SMS invitation</Text>

                                </View>

                            </View>




                            <View style={{
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                flexDirection: "row",
                                gap: 10,
                            }} >
                                <RadioButton
                                    value="false"
                                />

                                <View style={{
                                    maxWidth: 230,
                                    gap: 4
                                }} >

                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }}>Send email invitation</Text>

                                </View>

                            </View>



                            <View style={{
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                flexDirection: "row",
                                gap: 10,
                            }} >
                                <RadioButton
                                    value="false"
                                />

                                <View style={{
                                    maxWidth: 230,
                                    gap: 4
                                }} >

                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_400Regular"
                                    }}>Generate invite link</Text>
                                </View>

                                <Pressable >
                                    <Ionicons
                                        size={17}
                                        name="copy-outline"
                                        style={{
                                            alignSelf: "center",
                                            marginVertical: "auto"
                                        }}
                                    />
                                </Pressable>

                            </View>


                        </View>
                    </View>

                </View>

                <View style={styles.button_wrapper} >

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[styles.button]} >
                        <Text style={[styles.button_text, {
                            color: "#253E86"
                        }]} >Cancel</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={addMember}
                        style={[styles.button, {
                            backgroundColor: "#253E86"
                        }]} >
                        {loading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text style={[styles.button_text, {
                                color: "#ffffff"
                            }]} >Send Invite</Text>
                        )}
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
        alignItems: "center",
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
        width: 32,
    },

    heading: {
        color: "#10182A",
        fontFamily: "Sora_600SemiBold",
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


    button_wrapper: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16,
        marginTop: 25
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

})
