import { AuthStackParamList } from '@/app/auth/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";



export default function CongratulationsSection() {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();


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