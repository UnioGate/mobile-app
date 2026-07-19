
import SignInForm from '@/components/auth/SignInForm';
import SupportIcon from '@/components/icons/SupportIcon';
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from '@/utils/utils';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { AuthStackParamList } from '../types';

export default function SignIn() {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();


    return (
        <View style={styles.container} >

            <View style={styles.navbar}>

                <View style={{ width: 25 }} />


                <TouchableOpacity
                    onPress={() => router.push("/main/screens/ContactSupport")}
                >
                    <SupportIcon height={22} width={22} color="#10182A" />
                </TouchableOpacity>
            </View>


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
        paddingHorizontal: scaleHorizontalPadding(20),
        paddingVertical: scaleVerticalPadding(10),
        paddingTop: scaleVerticalPadding(5),
        gap: 16
    },

    content: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column"
    },

    bottomTextWrapper: {
        paddingBottom: scaleVerticalPadding(12)
    },

    bottomText: {
        color: "#CCCCCCCC",
        fontSize: scaleFont(15),
        fontFamily: 'Sora_400Regular',
    },

    bottomTextLink: {
        color: "#2DBAA4",
        textDecorationLine: "underline"
    },

    navbar: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
})
