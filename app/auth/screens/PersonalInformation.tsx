import BusinessInformationForm from "@/components/auth/BusinessInformationForm";
import StepTracker from "@/components/ui/StepTracker";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";




export default function PersonalInformation() {


    const [error, setError] = useState("")


    return (
        <View style={styles.container} >

            {/* The page title  */}
            <View style={styles.heading} >
                <Text style={styles.headingText} >Personal Information</Text>

                <StepTracker currentStep={1} totalSteps={2} />
            </View>

            {/* The current step form  */}
            {/* <PersonalInformationForm /> */}
            <BusinessInformationForm/>


            {/* The error statement  */}
            {error ? <Text style={styles.errorText}>
                <Ionicons name="alert-circle" size={14} color="red" /> {error}</Text> : null}


            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('PersonalInformation')}
            >
                <Text style={styles.buttonText} > Continue</Text>
            </TouchableOpacity>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        paddingVertical: 28,
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
        paddingHorizontal: 5
    },

    headingText: {
        fontFamily: "PlusJakartaSans_500Medium",
        color: "#10182A",
        fontSize: 27
    },

    button: {
        width: "100%",
        backgroundColor: "#253E86",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        borderRadius: 10,
        marginBottom: 11,
        marginTop: "auto"
    },

    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        fontFamily: 'Sora_400Regular',
    },

    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
        fontFamily: 'Sora_400Regular',
    },

})