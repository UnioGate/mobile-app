import { createBusiness } from "@/api/onboarding.api";
import { CompleteBusinessInformationBody, CompleteProfileBody, Currency, DropdownOption } from "@/types/types";
import { showErrorToast, showSuccessToast } from "@/utils/toastConfig";
import { scaleFont, scaleVerticalPadding, updateFormField, uploadImageToCloudinary } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import currencies from "../../data/country-by-currency-code.json";
import CustomDropdown from "../ui/CustomDropdown";
import CustomInput from "../ui/ReusableInput";



export default function BusinessInformationForm() {
    const SIGNUP_KEY = "signup_data";
    const [cachedData, setCachedData] = useState<CompleteProfileBody | null>(null)
    const [error, setError] = useState("");
    const [logoImage, setLogoImage] = useState<string | null>(null)
    const currenciesData = currencies as Currency[]
    const [currencyOption, setCurrencyOptions] = useState<DropdownOption[]>([])
    const [loading, setLoading] = useState(false)
    const [uploadingLogo, setUploadingLogo] = useState(false);


    const [formValues, setFormValues] = useState<CompleteBusinessInformationBody>({
        address: "",
        city: "",
        name: "",
        postalCode: "",
        primaryCurrency: "",
        town: "",
    });



    // retrieve cached data from the db
    useEffect(() => {
        const getCachedData = async () => {
            const data = await AsyncStorage.getItem(SIGNUP_KEY);

            if (!data) return;

            const signupData = JSON.parse(data);

            console.log(signupData)
            setCachedData(signupData)
        };

        getCachedData();
    }, []);



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



    // here we filter currency based on the country
    useEffect(() => {

        if (!cachedData?.country) return;


        const data = currenciesData
            .filter((c) => c.country === cachedData?.country)
            .map((c) => ({
                label: c.currency_code,
                value: c.currency_code
            }))

        console.log("Currencies:", data);

        setCurrencyOptions(data)
    }, [cachedData])




    // Validation functions
    // validate company name
    const validateCompanyName = (value: string) => {
        if (!value.trim()) return 'Company name is required';
        return ''
    }


    // Validate address
    const validateAddress = (value: string) => {
        if (!value.trim()) return 'Address is required';
        return ''
    }

    // Validate state
    const validateState = (value: string) => {
        if (!value.trim()) return "State is required"

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please select your state of residence';
        return '';
    }



    // Validate city
    const validateCity = (value: string) => {
        if (!value.trim()) return 'City is required'

        return ''
    }


    // Validate postal code
    const validatePostalCode = (value: string) => {
        if (!value) return 'Postal code is required'

        return ''
    }


    // Validate currency
    const validateCurrency = (value: string) => {
        if (!value.trim()) return 'Please select your primary currency'

        return ''
    }



    const handleSubmit = async () => {
        const error =
            validateAddress(formValues.address) ||
            validateCity(formValues.city) ||
            validateCompanyName(formValues.name) ||
            validateCurrency(formValues.primaryCurrency) ||
            validatePostalCode(formValues.postalCode) ||
            validateState(formValues.town);

        if (error) {
            setError(error);
            return;
        }


        setError("")

        /// now we submit to the B.E
        try {
            setLoading(true)

            let logoUrl: string | null = null;

            if (logoUrl) {
                setUploadingLogo(true);

                try {
                    logoUrl = await uploadImageToCloudinary(logoImage ?? "");
                } catch (uploadError) {
                    showErrorToast("Failed to upload business logo");
                    console.error(uploadError);
                    return; // stop - don't submit with a broken/missing logo
                }
                finally {
                    setUploadingLogo(false);
                }
            }

            const payload: CompleteBusinessInformationBody = {
                userId: cachedData?.userId,
                name: formValues.name,
                address: formValues.address,
                city: formValues.city,
                town: formValues.town,
                postalCode: formValues.postalCode,
                primaryCurrency: formValues.primaryCurrency,
                // image: logoUrl
            }

            console.log("payload:", JSON.stringify(payload, null, 2));

            const response = await createBusiness(payload)

            if (!response.ok) {
                showErrorToast(response.error)
                console.error(response.error)
                return;
            }

            // remove cached data from local storage
            await AsyncStorage.removeItem(SIGNUP_KEY);
            showSuccessToast(response.message)
            // then navigate to the main screen
            router.replace("/main")
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

            } else if (error instanceof Error) {
                showErrorToast(error.message);
                console.error(error)
            } else {
                showErrorToast("Something went wrong");
                console.error(error)
            }
        }

        finally {
            setLoading(false)
        }
    }


    return (
        <View style={styles.container}>

            {/* Company name input */}
            <CustomInput
                label="Company/Trading name"
                keyboardType="default"
                value={formValues.name}
                onChangeText={(text) => updateFormField("name", text, setFormValues)}
            />

            {/* Company address input */}
            <CustomInput
                label="Address"
                keyboardType="default"
                value={formValues.address}
                onChangeText={(text) => updateFormField("address", text, setFormValues)}
            />

            <View style={styles.inputsWrapper}>
                {/* State dropdown */}
                <View style={styles.halfInput}>
                    <CustomDropdown
                        label="State"
                        currentCountry={cachedData?.country}
                        value={formValues.city}
                        onChange={(value) =>
                            updateFormField("city", value, setFormValues)
                        }
                    />
                </View>

                {/* city / town input */}
                <View style={styles.halfInput}>
                    <CustomInput
                        label="City / Town"
                        keyboardType="default"
                        value={formValues.town}
                        onChangeText={(text) => updateFormField("town", text, setFormValues)}
                    />
                </View>
            </View>

            <View style={styles.inputsWrapper}>
                {/* postal code input */}
                <View style={styles.halfInput}>
                    <CustomInput
                        label="Postal code"
                        keyboardType="number-pad"
                        value={formValues.postalCode}
                        onChangeText={(text) =>
                            updateFormField("postalCode", text, setFormValues)
                        }
                    />
                </View>

                {/* Primary currency dropdown */}
                <View style={styles.halfInput}>
                    <CustomDropdown
                        options={currencyOption}
                        label="Primary Currency"
                        value={formValues.primaryCurrency}
                        onChange={(value) =>
                            updateFormField("primaryCurrency", value, setFormValues)
                        }
                    />
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


            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#ffffff" />
                ) : (
                    <Text style={styles.buttonText}>Complete Setup</Text>
                )}
            </TouchableOpacity>
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

    button: {
        width: "100%",
        backgroundColor: "#253E86",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleVerticalPadding(16),
        borderRadius: 10,
        marginBottom: 11,
        marginTop: "auto"
    },

    buttonText: {
        color: "#ffffff",
        fontSize: scaleFont(18),
        fontFamily: 'Sora_400Regular',
    },


    errorText: {
        color: 'red',
        fontSize: scaleFont(12),
        fontFamily: 'Sora_400Regular',
        alignSelf: "flex-start"
    },
});
