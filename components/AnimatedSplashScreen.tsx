import { scaleFont } from '@/utils/utils';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

type AnimatedSplashScreenProps = {
  onFinish: () => void;
  staticMode?: boolean;
};

const SPLASH_DURATION = 2200;
const PROGRESS_WIDTH = 190;




export function AnimatedSplashScreen({ onFinish, staticMode = false }: AnimatedSplashScreenProps) {

  const logoScale = useSharedValue(1.5);
  const logoRotation = useSharedValue(360);
  const progress = useSharedValue(0);
  const exitOpacity = useSharedValue(1);

  const titleWidth = useSharedValue(0);
  const [measuredWidth, setMeasuredWidth] = useState(0);

  const titleStyle = useAnimatedStyle(() => ({
    width: titleWidth.value,
  }));

  useEffect(() => {
    if (staticMode) {
      logoScale.value = 1;
      logoRotation.value = 0;
      progress.value = 1;
      exitOpacity.value = 1;
      return;
    }


    logoScale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 700, easing: Easing.inOut(Easing.cubic) }),
        withTiming(1, { duration: 700, easing: Easing.inOut(Easing.cubic) })
      ),
      -1,
      true
    );

    logoRotation.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 900, easing: Easing.inOut(Easing.cubic) }),
        withTiming(-5, { duration: 900, easing: Easing.inOut(Easing.cubic) })
      ),
      -1,
      true
    );

    progress.value = withTiming(1, {
      duration: SPLASH_DURATION,
      easing: Easing.out(Easing.cubic),
    });

    exitOpacity.value = withDelay(
      SPLASH_DURATION,
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
  }, [exitOpacity, logoRotation, logoScale, onFinish, progress, staticMode]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: exitOpacity.value,
  }));




  return (
    <Animated.View pointerEvents="none" style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.content]}>
        <Animated.View style={[styles.logoShell]}>
          <Image
            source={require('../assets/onboarding/logo-blue.png')}
            style={styles.logo}
            contentFit="contain"
          />
        </Animated.View>

        {/* Text wrapper  */}
        <Animated.View
          style={[
            styles.title_wrapper,
            titleStyle,
          ]}
        >
          <Text
            style={styles.title}
            onLayout={(e) => {
              const width = e.nativeEvent.layout.width;
              setMeasuredWidth(width);

              titleWidth.value = withTiming(width, {
                duration: 1000,
              });
            }}
          >
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
    backgroundColor: "red"
  },


  title_wrapper: {
    width: 0,
    flexWrap: "nowrap",
    overflow: "hidden"
  },

  title: {
    color: "#233F88",
    fontSize: scaleFont(47),
    fontFamily: "PlusJakartaSans_700Bold",
    flexWrap: "nowrap",
  }

});
