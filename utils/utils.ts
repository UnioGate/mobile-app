import { logout } from "@/api/logout.api";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import React from "react";
import { Dimensions } from "react-native";
import { showSuccessToast } from "./toastConfig";


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const baseWidth = 375;


export const scaleFont = (size: number) => {
    return (screenWidth / baseWidth) * size
}


export const scaleVerticalPadding = (size: number) => {
    return (screenHeight / 812) * size;
};


export const scaleHorizontalPadding = (size: number) => {
    return (screenWidth / baseWidth) * size;
};



// this formats any balance passed into it, to a .00 format
export const formatBalance = (value: number) => {
    return value.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}



// copy function for global use
export const copyItem = async (item: string) => {
    await Clipboard.setStringAsync(item)
    showSuccessToast("Copied!")
}


// masking email characters
export const maskEmail = (email: string) => {
    const [username, domain] = email.split("@")

    if (!username || !domain) return email;

    // keep the first 2 characters
    if (username.length <= 2) {
        return `${username}***@${domain}`
    }

    const visible = username.slice(0, 2);
    const masked = "*".repeat(username.length - 2);

    return `${visible}${masked}@${domain}`
}



// masking phone numbers
export const maskPhone = (phone: string) => {
    if (phone.length <= 6) return phone;

    return `${phone.slice(0, 3)}${"*".repeat(phone.length - 6)}${phone.slice(-3)}`;
};





// this controls text input change
export const updateFormField = <T extends object, K extends keyof T>(
    name: K,
    value: T[K],
    setter: React.Dispatch<React.SetStateAction<T>>
) => {
    setter((prev) => ({
        ...prev,
        [name]: value,
    }));
};



// This function handles log out all round the app
export const handleLogOut = async () => {
    await logout()
    router.replace("/auth/screens/SignIn")
}