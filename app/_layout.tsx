import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import { AnimatedSplashScreen } from '@/components/AnimatedSplashScreen';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { toastConfig } from '@/utils/toastConfig';

// Temporarily keep the custom splash screen visible and static so it can be edited.
// Set this to false to restore the timed animated splash flow.
const SHOW_STATIC_SPLASH = true;

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isNativeSplashHidden, setIsNativeSplashHidden] = useState(false);
  const [isAnimatedSplashVisible, setIsAnimatedSplashVisible] = useState(true);

  const SHOW_STATIC_SPLASH = true;

  const handleRootLayout = useCallback(() => {
    if (!isNativeSplashHidden) {
      void SplashScreen.hideAsync();
      setIsNativeSplashHidden(true);
    }
  }, [isNativeSplashHidden]);

  return (
    <View style={{ flex: 1 }} onLayout={handleRootLayout}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="main" />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <Toast config={toastConfig} />
        <StatusBar style="auto" />
        {isAnimatedSplashVisible ? (
          <AnimatedSplashScreen
            staticMode={SHOW_STATIC_SPLASH}
            onFinish={() => setIsAnimatedSplashVisible(false)}
          />
        ) : null}
      </ThemeProvider>
    </View>
  );
}
