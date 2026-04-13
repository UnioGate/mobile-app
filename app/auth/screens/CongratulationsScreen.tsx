import { StyleSheet, Text } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";





export default function CongratulationsSection() {
    return (
        <View style={styles.container} >

            <Text>Congrats</Text>
        </View>
    )
}




const styles = StyleSheet.create({

    container: {
        flex: 1,
    }



})