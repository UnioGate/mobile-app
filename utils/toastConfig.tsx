// utils/toastConfig.tsx

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export const toastConfig = {
  error: ({ text1, text2 }: any) => (
    <View style={{
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#F04438',
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    }}>

      <View style={{
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: '#FEE4E2',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
      }}>
        <Ionicons name="warning-outline" size={18} color="#F04438" />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '600', color: '#10182A' }}>
          {text1}
        </Text>
        <Text style={{ color: '#667085', fontSize: 13 }}>
          {text2}
        </Text>
      </View>

      <Pressable onPress={() => Toast.hide()}>
        <Ionicons name="close" size={18} color="#98A2B3" />
      </Pressable>
    </View>
  )
};