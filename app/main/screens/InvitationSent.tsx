

import LottieView from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";




export default function InvitationSection() {



    return (
        <View style={styles.container} >


            <LottieView
                source={require("../../../assets/images/success.json")}
                autoPlay
                loop={false}
                style={{ width: 200, height: 200 }}
            />

            <Text style={styles.heading} >Invitation Sent</Text>
            <Text style={styles.p} >Only invited users can access link</Text>

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
