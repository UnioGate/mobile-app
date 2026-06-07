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

// const SHOW_STATIC_SPLASH = false;

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isNativeSplashHidden, setIsNativeSplashHidden] = useState(false);
  const [isAnimatedSplashVisible, setIsAnimatedSplashVisible] = useState(true);

  const handleAnimatedSplashFinish = useCallback(() => {
    setIsAnimatedSplashVisible(false);
  }, []);

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
            onFinish={handleAnimatedSplashFinish}
          />
        ) : null}
      </ThemeProvider>
    </View>
  );
}
