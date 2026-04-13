import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomDropdown from "../ui/CustomDropdown";
import CustomInput from "../ui/ReusableInput";

export default function BusinessInformationForm() {
    const [error, setError] = useState("");
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
                <Pressable style={styles.uploadBox}>
                    <View style={styles.uploadIconWrapper}>
                        <Ionicons name="image" size={18} color="#10182A" />
                    </View>
                    <Text style={styles.uploadTitle}>Upload your image here</Text>
                    <Text style={styles.uploadSubTitle}>Max file size up to 500mb</Text>
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
        alignItems: "center",
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
    },

    logoLabel: {
        fontSize: 14,
        color: "#10182A",
        fontFamily: "Sora_400Regular",
    },

    uploadBox: {
        width: "100%",
        minHeight: 140,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "#9CA3AF",
        borderRadius: 12,
        backgroundColor: "#CCCCCC1A",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
    },

    uploadIconWrapper: {
        width: 30,
        height: 30,
        borderRadius: 6,
        backgroundColor: "#E5E7EB",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },

    uploadTitle: {
        color: "#10182A",
        fontSize: 16,
        fontFamily: "Sora_400Regular",
    },

    uploadSubTitle: {
        color: "#6B7280",
        fontSize: 12,
        fontFamily: "Sora_400Regular",
    },

    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 4,
        fontFamily: "Sora_400Regular",
    },
});
