import { Image } from 'expo-image';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  const contentOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.86);
  const logoRotation = useSharedValue(-5);
  const progress = useSharedValue(0);
  const exitOpacity = useSharedValue(1);

  useEffect(() => {
    if (staticMode) {
      contentOpacity.value = 1;
      logoScale.value = 1;
      logoRotation.value = 0;
      progress.value = 1;
      exitOpacity.value = 1;
      return;
    }

    contentOpacity.value = withTiming(1, {
      duration: 450,
      easing: Easing.out(Easing.cubic),
    });

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
  }, [contentOpacity, exitOpacity, logoRotation, logoScale, onFinish, progress, staticMode]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: exitOpacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { rotate: `${logoRotation.value}deg` },
    ],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: progress.value * PROGRESS_WIDTH,
  }));

  return (
    <Animated.View pointerEvents="none" style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.content, contentStyle]}>
        <Animated.View style={[styles.logoShell, logoStyle]}>
          <Image
            source={require('@/assets/onboarding/onboarding-screen-logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
        </Animated.View>

        <Text style={styles.title}>Uniogate</Text>
        <Text style={styles.subtitle}>Payments without borders</Text>

        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, progressStyle]} />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: '#10182A',
    justifyContent: 'center',
    zIndex: 999,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 32,
    width: '100%',
  },
  logoShell: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 34,
    elevation: 8,
    height: 118,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { height: 10, width: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 22,
    width: 118,
  },
  logo: {
    height: 72,
    width: 72,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 0.4,
    marginTop: 28,
  },
  subtitle: {
    color: '#D9E2FF',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 8,
  },
  progressTrack: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 999,
    height: 5,
    marginTop: 42,
    overflow: 'hidden',
    width: PROGRESS_WIDTH,
  },
  progressFill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    height: '100%',
    width: 0,
  },
});
