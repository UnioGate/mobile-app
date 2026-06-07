import { scaleFont } from '@/utils/utils';
import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

type AnimatedSplashScreenProps = {
  onFinish: () => void;
  staticMode?: boolean;
};

const LOGO_ANIMATION_DURATION = 650;
const TITLE_ANIMATION_DURATION = 700;
const EXIT_DELAY = LOGO_ANIMATION_DURATION * 2 + TITLE_ANIMATION_DURATION + 350;

export function AnimatedSplashScreen({ onFinish, staticMode = false }: AnimatedSplashScreenProps) {
  const logoScale = useSharedValue(1);
  const logoRotation = useSharedValue(0);
  const exitOpacity = useSharedValue(1);
  const titleWidth = useSharedValue(0);
  const [measuredWidth, setMeasuredWidth] = useState(0);
  const hasStartedAnimation = useRef(false);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { rotate: `${logoRotation.value}deg` },
    ],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    width: titleWidth.value,
  }));

  useEffect(() => {
    if (measuredWidth === 0) {
      return;
    }

    if (staticMode) {
      logoScale.value = 1;
      logoRotation.value = 0;
      titleWidth.value = measuredWidth;
      exitOpacity.value = 1;
      return;
    }

    if (hasStartedAnimation.current) {
      return;
    }

    hasStartedAnimation.current = true;

    logoScale.value = withSequence(
      withTiming(1.28, {
        duration: LOGO_ANIMATION_DURATION,
        easing: Easing.inOut(Easing.cubic),
      }),
      withTiming(1, {
        duration: LOGO_ANIMATION_DURATION,
        easing: Easing.inOut(Easing.cubic),
      })
    );

    logoRotation.value = withSequence(
      withTiming(360, {
        duration: LOGO_ANIMATION_DURATION,
        easing: Easing.inOut(Easing.cubic),
      }),
      withTiming(
        0,
        {
          duration: LOGO_ANIMATION_DURATION,
          easing: Easing.inOut(Easing.cubic),
        },
        (finished) => {
          if (finished) {
            titleWidth.value = withTiming(measuredWidth, {
              duration: TITLE_ANIMATION_DURATION,
              easing: Easing.out(Easing.cubic),
            });
          }
        }
      )
    );

    exitOpacity.value = withDelay(
      EXIT_DELAY,
      withTiming(
        0,
        {
          duration: 450,
          easing: Easing.inOut(Easing.cubic),
        },
        (finished) => {
          if (finished) {
            runOnJS(onFinish)();
          }
        }
      )
    );
  }, [exitOpacity, logoRotation, logoScale, measuredWidth, onFinish, staticMode, titleWidth]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: exitOpacity.value,
  }));




  return (
    <Animated.View pointerEvents="none" style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.content]}>
        <Animated.View style={[styles.logoShell, logoStyle]}>
          <Image
            source={require('../assets/onboarding/logo-blue.png')}
            style={styles.logo}
            contentFit="contain"
          />
        </Animated.View>

        <Text
          style={[styles.title, styles.measurementTitle]}
          onLayout={(event) => {
            setMeasuredWidth(event.nativeEvent.layout.width);
          }}
        >
          UnioGate
        </Text>

        {/* Text wrapper  */}
        <Animated.View
          style={[
            styles.title_wrapper,
            titleStyle,
          ]}
        >
          <Text style={styles.title}>
            UnioGate
          </Text>
        </Animated.View>


      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    zIndex: 999,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 32,
    width: '100%',
    flexDirection: "row",
    gap: 13,
    justifyContent: "center"
  },

  logo: {
    width: "100%",
    height: "100%"
  },


  logoShell: {
    width: 77,
    height: 77,
  },


  title_wrapper: {
    width: 0,
    flexWrap: "nowrap",
    overflow: "hidden",
  },

  title: {
    color: "#233F88",
    fontSize: scaleFont(47),
    fontFamily: "PlusJakartaSans_700Bold",
    flexWrap: "nowrap",
  },

  measurementTitle: {
    opacity: 0,
    position: "absolute",
  },

});
