
import SignInForm from '@/components/auth/SignInForm';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { AuthStackParamList } from '../types';

export default function SignIn() {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();


    return (
        <View style={styles.container} >
            <KeyboardAvoidingView
                style={styles.keyboardContainer}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
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
            </KeyboardAvoidingView>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },

    keyboardContainer: {
        flex: 1,
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
        fontSize: 15,
        fontFamily: 'Sora_400Regular',
    },

    bottomTextLink: {
        color: "#10182A",
        textDecorationLine: "underline"
    }
})
