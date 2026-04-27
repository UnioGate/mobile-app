import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Toast, { ToastShowParams } from "react-native-toast-message";

type ToastProps = {
  text1?: string;
  text2?: string;
};

type VariantStyle = {
  borderColor: string;
  iconBg: string;
  iconColor: string;
  iconName: keyof typeof Ionicons.glyphMap;
};

const styles = {
  card: {
    width: "90%" as const,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginRight: 10,
  },
  title: {
    fontWeight: "600" as const,
    color: "#10182A",
  },
  subtitle: {
    color: "#667085",
    fontSize: 13,
  },
};

const CustomToast = ({ text1, text2, variant }: ToastProps & { variant: VariantStyle }) => (
  <View style={[styles.card, { borderColor: variant.borderColor }]}>
    <View style={[styles.iconBox, { backgroundColor: variant.iconBg }]}> 
      <Ionicons name={variant.iconName} size={18} color={variant.iconColor} />
    </View>

    <View style={{ flex: 1 }}>
      {!!text1 && <Text style={styles.title}>{text1}</Text>}
      {!!text2 && <Text style={styles.subtitle}>{text2}</Text>}
    </View>

    <Pressable onPress={() => Toast.hide()}>
      <Ionicons name="close" size={18} color="#98A2B3" />
    </Pressable>
  </View>
);

export const toastConfig = {
  error: (props: ToastProps) => (
    <CustomToast
      {...props}
      variant={{
        borderColor: "#F04438",
        iconBg: "#FEE4E2",
        iconColor: "#F04438",
        iconName: "warning-outline",
      }}
    />
  ),
  success: (props: ToastProps) => (
    <CustomToast
      {...props}
      variant={{
        borderColor: "#12B76A",
        iconBg: "#D1FADF",
        iconColor: "#12B76A",
        iconName: "checkmark-circle-outline",
      }}
    />
  ),
};

const baseToastOptions: Pick<ToastShowParams, "position" | "topOffset"> = {
  position: "top",
  topOffset: 60,
};

export const showErrorToast = (text1: string, text2?: string) => {
  Toast.show({
    type: "error",
    text1,
    text2,
    ...baseToastOptions,
  });
};

export const showSuccessToast = (text1: string, text2?: string) => {
  Toast.show({
    type: "success",
    text1,
    text2,
    ...baseToastOptions,
  });
};
