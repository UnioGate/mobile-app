import { getBanks, resolveBankAcct, saveBankAccount } from "@/api/bank-accounts.api";
import CustomCheckbox from "@/components/ui/CustomCheckbox";
import CustomDropdown from "@/components/ui/CustomDropdown";
import { bankAccountBody, bankAccountResolveBody, DropdownOption } from "@/types/types";
import { showErrorToast, showSuccessToast } from "@/utils/toastConfig";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding, updateFormField } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { MainStackParamList } from "../type";

type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;


export default function AddBankAccount() {
    const navigation = useNavigation<OverviewNavigationProp>();
    const [confirmation, setConfirmation] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resolving, setResolving] = useState(false)
    const [bankOptions, setBankOptions] = useState<DropdownOption[]>([])
    const [incompleteNumber, setIncompleteNumber] = useState(false)
    const [resolvedName, setResolvedName] = useState("");
    const [formValues, setFormValues] = useState({
        accountNumber: "",
        bankName: "",
        bankCode: ""
    });
    const [errors, setErrors] = useState({
        bank: "",
        accountNumber: "",
        accountName: "",
        confirmation: "",
    });



    // this fetches the bank accts on page load
    useEffect(() => {
        const fetchBanks = async () => {
            const response = await getBanks();

            if (response.ok) {
                const options: DropdownOption[] = response.banks.map((bank) => ({
                    label: bank.name,
                    value: bank.code,
                }));
                setBankOptions(options);
            } else {
                showErrorToast(response.error ?? "Failed to fetch banks!");
            }
        };

        fetchBanks();
    }, []);




    // validation function
    const validateForm = () => {
        const newErrors = {
            bank: "",
            accountNumber: "",
            accountName: "",
            confirmation: "",
        };

        if (!formValues.bankCode) {
            newErrors.bank = "Please select a bank.";
        }

        if (!formValues.accountNumber) {
            newErrors.accountNumber = "Please enter your account number.";
        } else if (!/^\d{10}$/.test(formValues.accountNumber)) {
            newErrors.accountNumber = "Account number must be exactly 10 digits.";
        }

        if (!resolvedName) {
            newErrors.accountName = "Please verify your account number.";
        }

        if (!confirmation) {
            newErrors.confirmation = "Please confirm that the information is accurate.";
        }

        setErrors(newErrors);

        return !Object.values(newErrors).some(Boolean);
    };



    // This handles the form submission
    const handleSubmit = async () => {


        if (!validateForm()) {
            showErrorToast("Please complete all required fields.");
            return;
        }

        setLoading(true);

        try {
            const payload: bankAccountBody = {
                accountNumber: formValues.accountNumber,
                bankCode: formValues.bankCode,
                bankName: formValues.bankName
            }

            console.log("The payload", payload)

            const response = await saveBankAccount(payload);

            if (!response.ok) {
                showErrorToast(response.error)
                console.error(response.error)
                return;
            }

            showSuccessToast(response.message);
            setFormValues({
                accountNumber: "",
                bankCode: "",
                bankName: ""
            })

        } catch (error) {
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
            showErrorToast("Something went wrong");
            console.error(error)
        }

        finally {
            setLoading(false)
        }
    }




    // This function finds the an account number if it exists
    const findBankAcct = async (data: bankAccountResolveBody) => {

        if (!data.bankCode) {
            showErrorToast("Please select a bank.");
            return;
        }

        if (!/^\d{10}$/.test(data.accountNumber)) {
            setIncompleteNumber(true);
            setResolvedName("");
            return;
        }

        setIncompleteNumber(false);
        setResolving(true)

        try {
            const response = await resolveBankAcct(data);

            if (!response.ok) {
                showErrorToast(response.error)
                console.error(response.error)
                setResolvedName("")
                return;
            }

            setResolvedName(response.accountName);

        } catch (error) {

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


            showErrorToast("Something went wrong");
            console.error(error)
        }
        finally {
            setResolving(false)
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
                    Add Bank Account
                </Text>


                <Pressable>
                </Pressable>

            </View>





            {/* main content  */}
            <ScrollView
                style={{ flex: 1, width: "100%" }}
                contentContainerStyle={styles.scrollView_style}
                showsVerticalScrollIndicator={false}>

                {/* the form  */}
                <View style={{
                    backgroundColor: "#ffffff",
                    paddingVertical: scaleVerticalPadding(15),
                    paddingHorizontal: scaleHorizontalPadding(14),
                    gap: 10,
                    borderRadius: 10
                }} >

                    {/* Select bank  */}

                    <View style={{
                        width: "100%",
                        gap: 10
                    }} >

                        <Text
                            style={{
                                color: "#000000",
                                fontSize: scaleFont(12),
                                fontFamily: "Sora_600SemiBold"
                            }}
                        >Select Bank</Text>

                        <CustomDropdown
                            dropdownStyle={{
                                borderColor: "#808080",
                                backgroundColor: "#ffffff"
                            }}
                            options={bankOptions}
                            onChange={(value: string) => {
                                const selected = bankOptions.find((option) => option.value === value);
                                setFormValues((prev) => ({
                                    ...prev,
                                    bankCode: value,
                                    bankName: selected ? String(selected.label) : "",
                                }));
                            }}
                        />

                    </View>


                    {/* Account Number */}
                    <View style={{
                        width: "100%",
                        gap: 10
                    }} >

                        <Text
                            style={{
                                color: "#000000",
                                fontSize: scaleFont(12),
                                fontFamily: "Sora_600SemiBold"
                            }}
                        >Account Number</Text>

                        <TextInput
                            placeholder="0123456789"
                            keyboardType="number-pad"
                            maxLength={10}
                            style={{
                                width: "100%",
                                borderWidth: 0.5,
                                borderColor: incompleteNumber ? "red" : "#808080",
                                borderRadius: 7,
                                paddingVertical: scaleVerticalPadding(12),
                                paddingHorizontal: scaleHorizontalPadding(6),
                                fontSize: scaleFont(12),
                                fontFamily: "Sora_400Regular",
                                color: "#000000"
                            }}
                            onChangeText={(text) => updateFormField("accountNumber", text, setFormValues)}
                            onBlur={() => findBankAcct({
                                accountNumber: formValues.accountNumber,
                                bankCode: formValues.bankCode
                            })}
                        />

                        {errors.accountNumber && (
                            <Text style={styles.errorText}>
                                {errors.accountNumber}
                            </Text>
                        )}

                    </View>




                    {/* Account name  */}
                    <View style={{
                        width: "100%",
                        gap: 10
                    }} >

                        <Text
                            style={{
                                color: "#000000",
                                fontSize: scaleFont(12),
                                fontFamily: "Sora_600SemiBold"
                            }}
                        >Account Name</Text>

                        <TextInput
                            placeholder={resolving ? "Verifying..." : "Account name will appear here"}
                            value={resolvedName}
                            keyboardType="default"
                            style={{
                                width: "100%",
                                borderWidth: 0.5,
                                borderColor: "#808080",
                                borderRadius: 7,
                                paddingVertical: scaleVerticalPadding(12),
                                paddingHorizontal: scaleHorizontalPadding(6),
                                fontSize: scaleFont(12),
                                fontFamily: "Sora_400Regular",
                                color: "#000000"
                            }}
                            readOnly
                        />

                    </View>
                </View>


                <View>
                    <CustomCheckbox
                        label="I confirm this information is accurate."
                        linkText=""
                        path=""
                        checked={confirmation}
                        setChecked={setConfirmation}
                    />
                </View>


                {/* Button wrapper */}
                <View style={styles.button_wrapper} >

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[styles.button]} >
                        <Text style={[styles.button_text, {
                            color: "#253E86"
                        }]} >Cancel</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={[styles.button, {
                            backgroundColor: "#253E86"
                        }]} >

                        {loading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text style={[styles.button_text, {
                                color: "#ffffff"
                            }]} >Add Account</Text>
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
        borderBottomWidth: 0.5,
        borderBottomColor: "#B3B3B3",
        paddingHorizontal: scaleHorizontalPadding(15),
        paddingVertical: scaleVerticalPadding(9)
    },


    heading: {
        color: "#000000",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(21),
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
        fontSize: scaleFont(13),
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


    errorText: {
        color: "#FF070B",
        fontSize: scaleFont(10),
        fontFamily: "Sora_400Regular",
    },


})