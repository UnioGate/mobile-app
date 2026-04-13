import { fonts } from "@/fonts/fonts";
import { useFonts } from "@expo-google-fonts/plus-jakarta-sans";
import { router } from 'expo-router';
import LottieView from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";




export default function CongratulationsSection() {
    const [fontsLoaded] = useFonts(fonts);


    return (
        <View style={styles.container} >


            <LottieView
                source={require("../../../assets/images/success.json")}
                autoPlay
                loop={false}
                style={{ width: 200, height: 200 }}
            />

            <Text style={styles.heading} >Congratulations</Text>
            <Text style={styles.p} >Your account is ready to use</Text>
            <Text
             onPress={() => router.replace('/main')}
            style={styles.p} >Go to main screen</Text>
        </View>
    )
}




const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12
    },


    heading: {
        color: "#253E86",
        fontSize: 32,
        fontFamily: 'Sora_600SemiBold',
    },

    p: {
        color: "#10182A",
        fontSize: 14,
        fontFamily: 'Sora_400Regular',
    }


})
