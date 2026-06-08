import { AuthStackParamList } from '@/app/auth/types';
import BusinessInformationForm from '@/components/auth/BusinessInformationForm';
import PersonalInformationForm from '@/components/auth/PersonalInformationForm';
import StepTracker from "@/components/ui/StepTracker";
import { useStep } from '@/context/StepContext';
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from '@/utils/utils';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { router } from 'expo-router';
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function PersonalInformation() {
    const [error, setError] = useState("")
    const { currentStep, setCurrentStep } = useStep();
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    return (
        <View style={styles.container} >


            <ScrollView
                style={{ flex: 1, width: "100%" }}
                contentContainerStyle={styles.scrollView_style}
                showsVerticalScrollIndicator={false}  >

                {/* The page title  */}
                <View style={styles.heading} >
                    <Text
                        style={styles.headingText}
                    >
                        {currentStep === 1 ? "Personal Information" : "Business Information"}
                    </Text>

                    <StepTracker currentStep={currentStep} totalSteps={2} />
                </View>

                {/* The current step form  */}
                {currentStep === 1 && (
                    <PersonalInformationForm />
                )}


                {currentStep === 2 && (
                    <BusinessInformationForm />
                )}


                {/* The error statement  */}
                {error ? <Text style={styles.errorText}>
                    <Ionicons name="alert-circle" size={14} color="red" /> {error}</Text> : null}


                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={() => {
                        if (currentStep === 1) {
                            setCurrentStep(2)
                        }
                        else {
                            router.replace("/CongratulationsScreen")
                        }
                    }}
                >
                    <Text style={styles.buttonText} > Continue</Text>
                </TouchableOpacity>


            </ScrollView>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    scrollView_style: {
        flexGrow: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: scaleHorizontalPadding(20),
        paddingVertical: scaleVerticalPadding(10),
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 16
    },

    heading: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: scaleHorizontalPadding(5),
        gap: 20
    },

    headingText: {
        fontFamily: "PlusJakartaSans_500Medium",
        color: "#10182A",
        fontSize: scaleFont(27)
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
        marginTop: 4,
        fontFamily: 'Sora_400Regular',
    },

})