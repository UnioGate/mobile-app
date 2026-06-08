
import SignInForm from '@/components/auth/SignInForm';
import { scaleFont } from '@/utils/utils';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { AuthStackParamList } from '../types';

export default function SignIn() {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();


    return (
        <View style={styles.container} >
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <SignInForm />

                {/* This is the bottom text on the page  */}
                <View style={styles.bottomTextWrapper}>
                    <Text style={styles.bottomText}  >Don’t have an account? {" "}
                        <Text
                            onPress={() => navigation.navigate('CreateAccount')}
                            style={styles.bottomTextLink}
                        >Register</Text>
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },

    content: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column"
    },

    bottomTextWrapper: {
        paddingBottom: 12
    },

    bottomText: {
        color: "#CCCCCCCC",
        fontSize: scaleFont(15),
        fontFamily: 'Sora_400Regular',
    },

    bottomTextLink: {
        color: "#2DBAA4",
        textDecorationLine: "underline"
    }
})
