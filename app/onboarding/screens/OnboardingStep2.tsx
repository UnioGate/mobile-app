import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from '@/utils/utils';
import { useFonts } from '@expo-google-fonts/plus-jakarta-sans';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../../../fonts/fonts';

const { width, height } = Dimensions.get('window');

export default function OnboardingStep1() {

  const stepInfoAnim = useRef(new Animated.Value(400)).current;

  useEffect(() => {
    Animated.timing(stepInfoAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) return null;



  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.top} >

        <View style={styles.wrapper} >
          <Image source={require('../../../assets/onboarding/onboarding-screen-logo.png')} style={styles.image} />
          <Text style={styles.heading}>
            Welcome to <Text style={styles.name}>UnioGate</Text>
          </Text>
        </View>

        <Text style={styles.subtext}>Built for Seamless Payments.</Text>


        {/* The current step Image  */}
        <View style={styles.imageWrapper}  >
          <Image source={require('../../../assets/onboarding/payments.png')} style={styles.stepImage} />
        </View>
      </View>


      {/* Step info section  */}
      <Animated.View
        style={[{ transform: [{ translateY: stepInfoAnim }] }, { width: '100%' }]}
      >
        <LinearGradient
          colors={['#FFFFFF', 'rgba(37, 62, 134, 0.2)']}
          style={styles.stepInfo}
        >
          <Text style={styles.step_info_paragraph}>
            Every transaction is automatically converted on the vendor’s end—fast, precise, and reliable.
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={() => router.push('/auth')}>
            <Text style={styles.buttonText} >Get Started</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#253E86',
    gap: "23%",
  },

  top: {
    flex: 1,
    paddingTop: scaleVerticalPadding(30),
    paddingHorizontal: scaleHorizontalPadding(24),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "10%",
  },

  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  image: {
    width: 50,
    height: 50,
    resizeMode: "cover"
  },

  heading: {
    fontFamily: 'PlusJakartaSans_300Light',
    color: '#ffffff',
    fontSize: scaleFont(24),
  },

  name: {
    fontFamily: "PlusJakartaSans_500Medium"
  },

  subtext: {
    color: '#ffffff',
    fontSize: scaleFont(35),
    textAlign: "center",
    fontFamily: "PlusJakartaSans_600SemiBold"
  },

  imageWrapper: {
    width: width * 0.9,
    height: height * 0.22,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  stepImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  stepInfo: {
    marginTop: "auto",
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: "auto",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: "15%",
    paddingHorizontal: scaleHorizontalPadding(20),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    overflow: "hidden",
  },

  step_info_paragraph: {
    fontSize: scaleFont(16),
    textAlign: "center",
    lineHeight: 30,
    fontFamily: 'Sora_400Regular',
  },

  button: {
    backgroundColor: "#2DBAA4",
    borderWidth: 2,
    borderColor: "#000000",
    padding: 17,
    borderRadius: 10,
    flexShrink: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000000",
    marginTop: 10
  },

  buttonText: {
    fontSize: scaleFont(16),
    fontFamily: 'Sora_400Regular',
  }

});