
import SignInForm from '@/components/auth/SignInForm';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { AuthStackParamList } from '../types';

export default function SignIn({ }) {
       const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();


    return (
        <SafeAreaView style={styles.container} >
            <SignInForm/>





            {/* This is the bottom text on the page  */}
            <Text style={styles.bottomText}  >Don’t have an account? {" "}
                <Text
                    onPress={() => navigation.navigate('CreateAccount')}
                    style={styles.bottomTextLink}
                >Register</Text></Text>
        </SafeAreaView>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column"
    },


    bottomText: {
        color: "#CCCCCCCC",
        fontSize: 15,
        fontFamily: 'Sora_400Regular',
    },

    bottomTextLink: {
        color: "#10182A",
        textDecorationLine: "underline"
    }
})