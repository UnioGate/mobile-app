import LogoReveal from "@/components/LogoReveal";
import OfflineScreen from "@/components/network/OfflineScreen";
import { useNetwork } from "@/context/NetworkContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true)
  const [hasOnboarded, setHasOnboarded] = useState(false)
  const { isOnline, isCheckingNetwork } = useNetwork()

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem("hasOnboarded");

      if (value === "true") {
        setHasOnboarded(true)
      }

      setLoading(false)
    }

    checkOnboarding()
  }, [])



  // App started with no internet
  if (!isOnline) {
    return <OfflineScreen />
  }


  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LogoReveal />
      </View>
    );
  }

  return (
    <Redirect href={hasOnboarded ? "/auth" : "/onboarding"} />
  );
}