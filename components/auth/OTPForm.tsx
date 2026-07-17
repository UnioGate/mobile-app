import { requestOTP, verifyOTP } from "@/api/otp.api";
import { AuthStackParamList } from "@/app/auth/types";
import { RequestOTPBody, VerifyOTPBody } from "@/types/types";
import { showErrorToast, showSuccessToast } from "@/utils/toastConfig";
import { maskEmail, maskPhone, scaleFont, scaleVerticalPadding } from "@/utils/utils";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;


type Props = {
    email: string;
    setEmail: React.Dispatch<SetStateAction<string>>
    phone: string;
    setPhone: React.Dispatch<SetStateAction<string>>
    signUpMode: "emailAddress" | "phoneNumber"
    setSignUpMode: React.Dispatch<SetStateAction<"emailAddress" | "phoneNumber">>
    setCurrentForm: React.Dispatch<SetStateAction<"createAccountForm" | "otp">>
};

export default function OTPForm({
    email,
    phone,
    signUpMode,
    setCurrentForm
}: Props) {

    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const [timer, setTimer] = useState(RESEND_SECONDS);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputs = useRef<Array<TextInput | null>>([]);


    // timer for the resend OTP functionality
    useEffect(() => {
        if (timer <= 0) {
            setIsResendDisabled(false);
            return;
        }

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);




    // This function handles change
    const handleChange = (text: string, index: number) => {

        if (text.length > 1) {
            const pasted = text.slice(0, OTP_LENGTH).split("");

            const normalized = Array(OTP_LENGTH)
                .fill("")
                .map((_, i) => pasted[i] ?? "");
            setOtp(normalized);
            const nextFocusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
            inputs.current[nextFocusIndex]?.focus();
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < OTP_LENGTH - 1) {
            inputs.current[index + 1]?.focus();
        }
    };


    // using backspace for deleting digits
    const handleBackspace = (key: string, index: number) => {
        if (key === "Backspace" && index > 0 && !otp[index]) {
            inputs.current[index - 1]?.focus();
        }
    };




    // this function handles the code verification
    const onSubmit = async () => {

        if (otp.some((digit) => digit === "")) {
            showErrorToast("Please enter the complete OTP!")
            return;
        }

        try {
            setLoading(true);

            const payload: VerifyOTPBody = {
                identifier: signUpMode === "emailAddress" ?
                    email.toLocaleLowerCase() : phone,

                code: Number(otp.join(""))
            }

            const response = await verifyOTP(payload);
            showSuccessToast(response.message);
            navigation.replace("PersonalInformation")
            setOtp(Array(OTP_LENGTH).fill(""));
        }

        catch (error) {
            showErrorToast("Verification Failed!");
            console.error(error)
            return;
        }

        finally {
            setLoading(false);
        }
    }


    // This handles resend the OTP code
    const resendOTPCode = async () => {

        try {

            const payload: RequestOTPBody = {
                identifier: signUpMode === "emailAddress" ?
                    email.toLocaleLowerCase() : phone,

                type: signUpMode === "emailAddress" ?
                    "email" : "whatsapp"
            };

            await requestOTP(payload);
            showSuccessToast(
                `A verification code has been sent to your ${signUpMode === "emailAddress" ? "email" : "WhatsApp"
                }.`
            );

            setTimer(RESEND_SECONDS);
            setIsResendDisabled(true);
            setOtp(Array(OTP_LENGTH).fill(""));
            inputs.current[0]?.focus();
        }
        catch (error) {
            console.error("Failed to send OTP!")
        }

    }



    return (
        <View style={styles.screenContainer}>
            <Text style={styles.pageTitle}>OTP Verification</Text>

            <Text style={styles.paragraph}>
                Enter the 6-digit code sent to
                {signUpMode === "emailAddress" ?
                    maskEmail(email)
                    : maskPhone(phone)}.
                {"\n"}
                Didn&apos;t receive a
                code?

                <Text
                    disabled={isResendDisabled}
                    onPress={resendOTPCode}
                    style={styles.tryAgainText}> Try again</Text>
            </Text>

            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (

                    <TextInput
                        key={index}
                        style={[styles.box]}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key, index)}
                        ref={(ref) => {
                            inputs.current[index] = ref;
                        }}
                        textContentType="oneTimeCode"
                        autoComplete="sms-otp"
                        inputMode="numeric"
                    />
                ))}
            </View>



            <View style={styles.bottomSection}>
                <View style={styles.bottom}>
                    {isResendDisabled ? (
                        <Text style={styles.timerText}>Resend code in {timer}s</Text>
                    ) : (
                        <TouchableOpacity
                            disabled={isResendDisabled}
                            onPress={resendOTPCode}>
                            <Text style={styles.bottomSectionText}>Resend Code</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        onPress={() => setCurrentForm("createAccountForm")}
                        style={styles.outlineButton}
                        activeOpacity={0.7}>
                        <Text style={styles.outlineButtonText}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={loading}
                        onPress={onSubmit}
                        style={styles.button}
                        activeOpacity={0.7}>

                        {loading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text style={styles.buttonText}>Confirm</Text>
                        )}

                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        width: "100%",
    },
    pageTitle: {
        color: "#10182A",
        fontSize: scaleFont(32),
        fontFamily: "PlusJakartaSans_600SemiBold",
    },
    paragraph: {
        color: "#10182A",
        fontSize: scaleFont(18),
        textAlign: "center",
        fontFamily: "Sora_300Light",
    },
    tryAgainText: {
        color: "#2DBAA4",
    },
    otpContainer: {
        flexDirection: "row",
        gap: 6,
    },
    box: {
        width: "100%",
        maxWidth: 50,
        height: 60,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#B3B3B3",
        backgroundColor: "#CCCCCC1A",
        textAlign: "center",
        fontSize: scaleFont(20),
    },
    bottom: {
        marginTop: 8,
    },
    timerText: {
        color: "#10182A",
        fontSize: scaleFont(16),
        fontFamily: "Sora_300Light",
    },
    resendText: {
        color: "#253E86",
        fontWeight: "600",
    },
    bottomSection: {
        alignItems: "center",
        gap: 33,
        justifyContent: "center",
        width: "100%",
    },
    bottomSectionText: {
        color: "#10182A",
        fontSize: scaleFont(16),
        fontFamily: "Sora_400Regular",
    },
    buttonWrapper: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 36,
        flexDirection: "row",
    },
    button: {
        flex: 1,
        backgroundColor: "#253E86",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleVerticalPadding(15),
        borderRadius: 10,
        marginBottom: 11,
        borderWidth: 1,
        borderColor: "#253E86",
    },
    outlineButton: {
        flex: 1,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleVerticalPadding(15),
        borderRadius: 10,
        marginBottom: 11,
        borderWidth: 1,
        borderColor: "#10182A",
    },
    outlineButtonText: {
        color: "#10182A",
        fontSize: scaleFont(16),
        fontFamily: "Sora_400Regular",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: scaleFont(16),
        fontFamily: "Sora_400Regular",
    },
});
