import { scaleFont } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomDropdown from "../ui/CustomDropdown";
import CustomInput from "../ui/ReusableInput";

type UploadedLogo = {
    name: string;
    uri: string;
};

export default function BusinessInformationForm() {
    const [error, setError] = useState("");
    const [logoImage, setLogoImage] = useState<string | null>(null)
    const [formValues, setFormValues] = useState({
        firstname: "",
        lastname: "",
        emailAddress: "",
        phone: "",
        date: new Date(),
        country: "",
        companyName: "",
        address: "",
    });



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
        <View style={styles.container}>
            {/* Company name input */}
            <CustomInput
                label="Company/ Trading name"
                keyboardType="default"
                value={formValues.companyName}
            />

            {/* Company address input */}
            <CustomInput
                label="Address"
                keyboardType="default"
                value={formValues.address}
            />

            <View style={styles.inputsWrapper}>
                {/* State dropdown */}
                <View style={styles.halfInput}>
                    <CustomDropdown label="State" />
                </View>

                {/* city / town input */}
                <View style={styles.halfInput}>
                    <CustomInput
                        label="City / Town"
                        keyboardType="default"
                        value={formValues.address}
                    />
                </View>
            </View>

            <View style={styles.inputsWrapper}>
                {/* postal code input */}
                <View style={styles.halfInput}>
                    <CustomInput
                        label="Postal code"
                        placeholder="Optional"
                        keyboardType="default"
                        value={formValues.address}
                    />
                </View>

                {/* Primary currency dropdown */}
                <View style={styles.halfInput}>
                    <CustomDropdown label="Primary Currency" />
                </View>
            </View>

            {/* Business logo uploader */}
            <View style={styles.logoWrapper}>
                <Text style={styles.logoLabel}>Business Logo (Optional)</Text>

                <Pressable
                    onPress={pickImage}
                    style={styles.uploadBox}
                >

                    <View style={styles.uploadIconWrapper}>
                        <Ionicons name="image" size={18} color="#10182A" />
                    </View>
                    <Text style={styles.uploadTitle}>
                        {logoImage ? "Image selected" : "Upload your image here"}
                    </Text>
                    <Text style={styles.uploadSubTitle}>
                        {logoImage ?? "Max file size up to 500mb"}
                    </Text>
                    {logoImage ?
                        <Image
                            source={{ uri: logoImage }}
                            style={styles.logoPreview}
                            contentFit="contain" /> : null}
                </Pressable>

            </View>

            {/* The error statement  */}
            {error ? (
                <Text style={styles.errorText}>
                    <Ionicons name="alert-circle" size={14} color="red" /> {error}
                </Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "stretch",
        flexDirection: "column",
        gap: 16,
    },

    halfInput: {
        flexBasis: "50%",
    },

    inputsWrapper: {
        width: "100%",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },

    logoWrapper: {
        width: "100%",
        gap: 6,
        alignSelf: "stretch",
    },

    logoLabel: {
        fontSize: scaleFont(13),
        color: "#10182A",
        fontFamily: "Sora_400Regular",
    },

    uploadBox: {
        width: "100%",
        minHeight: 140,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "#000000CC",
        borderRadius: 12,
        backgroundColor: "#F8F7F7",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
    },

    uploadIconWrapper: {
        width: 30,
        height: 30,
        borderRadius: 6,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },

    uploadTitle: {
        color: "#10182A",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular",
    },

    uploadSubTitle: {
        color: "#6B7280",
        fontSize: scaleFont(11),
        fontFamily: "Sora_400Regular",
    },

    logoPreview: {
        width: "100%",
        height: 120,
        marginTop: 12,
        borderRadius: 8,
    },

    errorText: {
        color: "red",
        fontSize: scaleFont(12),
        marginTop: 4,
        fontFamily: "Sora_400Regular",
    },
});
