import ImageIcon from "@/components/icons/ImageIcon";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import { MainStackParamList } from "../type";



type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function BusinessInformation() {
    const navigation = useNavigation<OverviewNavigationProp>()
    const [logoImage, setLogoImage] = useState<string | null>(null)



    // This handles business logo selection
    const pickImage = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert('Permission to access gallery is required.')
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        })

        if (!result.canceled) {
            setLogoImage(result.assets[0].uri)
        }
    }


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
                    Business Information
                </Text>


                <Pressable
                    onPress={() => navigation.navigate("edit_business_info")}
                >
                    <Text style={{
                        color: "#253E86",
                        fontSize: scaleFont(14),
                        fontFamily: "PlusJakartaSans_500Medium"
                    }} >Edit</Text>
                </Pressable>

            </View>





            {/* main content  */}
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollView_style}
                showsVerticalScrollIndicator={false} >


                {/* image card  */}
                <View style={{
                    width: "100%",
                    backgroundColor: "#ffffff",
                    height: "auto",
                    borderRadius: 10,
                    paddingVertical: scaleVerticalPadding(12),
                    paddingHorizontal: scaleHorizontalPadding(13),
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    display: "flex",
                    gap: 18
                }} >

                    <View style={{
                        width: 77,
                        height: 77,
                        borderRadius: "50%",
                        overflow: "hidden",
                        alignItems: "center",
                        justifyContent: "center"
                    }} >
                        {logoImage ? (
                            <Image
                                source={{ uri: logoImage }}
                                style={styles.logo_image_style} />
                        ) : (
                            <Image
                                source={require("../../../assets/onboarding/logo-blue.png")}
                                style={styles.logo_image_style}
                            />
                        )}
                    </View>

                    <Text
                        style={{
                            color: "#233F88",
                            fontFamily: "PlusJakartaSans_600SemiBold",
                            fontSize: scaleFont(24)
                        }}
                    >UnioGate</Text>


                    <Pressable
                        onPress={pickImage}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 8,
                            borderWidth: 0.3,
                            borderColor: "#10182AB2",
                            paddingVertical: scaleVerticalPadding(4),
                            paddingHorizontal: scaleHorizontalPadding(10),
                            borderRadius: 7
                        }} >
                        <ImageIcon />

                        <Text style={{
                            color: "#233F88",
                            fontSize: scaleFont(12),
                            fontFamily: "Sora_400Regular"
                        }}>Change logo</Text>
                    </Pressable>

                </View>


                {/* Business Details card */}
                <View style={{
                    gap: 10
                }} >
                    <Text style={{
                        color: "#10182AB2",
                        fontFamily: "Sora_400Regular",
                        fontSize: scaleFont(12)
                    }}>Business Details</Text>

                    {/* card */}
                    <View style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: 10,
                        padding: scaleHorizontalPadding(2)
                    }} >

                        {/* business Name */}
                        <View style={styles.card_row} >
                            <Text style={styles.card_row_text} >Business Name</Text>
                        </View>

                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />

                        {/* Business Address */}
                        <View style={styles.card_row} >
                            <Text style={styles.card_row_text} >Business Address</Text>
                        </View>


                    </View>
                </View>



                {/* Contact Information card */}
                <View style={{
                    gap: 10
                }} >
                    <Text style={{
                        color: "#10182AB2",
                        fontFamily: "Sora_400Regular",
                        fontSize: scaleFont(12)
                    }}>Contact Information</Text>

                    {/* card */}
                    <View style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: 10,
                        padding: scaleHorizontalPadding(2)
                    }} >

                        {/* Email address */}
                        <View style={styles.card_row} >
                            <Text style={styles.card_row_text} >Email address</Text>
                        </View>

                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />

                        {/* Phone number */}
                        <View style={styles.card_row} >
                            <Text style={styles.card_row_text} >Phone number</Text>
                        </View>

                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />

                        {/* Website url link */}
                        <View style={styles.card_row} >
                            <Text
                                onPress={() => Linking.openURL("https://www.unn.edu.ng")}
                                style={[styles.card_row_text, {
                                    color: "blue",
                                    textDecorationLine: "underline"
                                }]} >Website url link</Text>
                        </View>


                    </View>
                </View>




                {/* Trading Information card */}
                <View style={{
                    gap: 10
                }} >
                    <Text style={{
                        color: "#10182AB2",
                        fontFamily: "Sora_400Regular",
                        fontSize: scaleFont(12)
                    }}>Trading Information</Text>

                    {/* card */}
                    <View style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: 10,
                        padding: scaleHorizontalPadding(2)
                    }} >

                        {/* Industry Type */}
                        <View style={styles.card_row} >
                            <Text style={styles.card_row_text} >Industry Type</Text>
                        </View>

                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />

                        {/* Year Established */}
                        <View style={styles.card_row} >
                            <Text style={styles.card_row_text} >Year Established</Text>
                        </View>

                        <Divider style={{
                            backgroundColor: "#808080"
                        }} />

                        {/* Registration Type */}
                        <View style={styles.card_row} >
                            <Text style={styles.card_row_text} >Registration Type</Text>
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
                        onPress={() => navigation.navigate("edit_business_info")}
                        style={[styles.button, {
                            backgroundColor: "#253E86"
                        }]} >
                        <Text style={[styles.button_text, {
                            color: "#ffffff"
                        }]} >Edit Info</Text>
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

    card_row: {
        paddingHorizontal: scaleHorizontalPadding(7),
        paddingVertical: scaleVerticalPadding(13),
        alignItems: "center",
        flexDirection: "row"
    },

    card_row_text: {
        color: "#10182AB2",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(14)
    },


    logo_image_style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    }




})