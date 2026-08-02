import { logout } from "@/api/logout.api";
import { tierData } from "@/data/tier_data";
import { useTierStore } from "@/stores/tierStore";
import { currentTier } from "@/types/types";
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





// this truncates and mask the wallet address
export const maskAddress = (address: string) => {
    if (address.length <= 6) return address;

    return `${address.slice(0, 7)}${"*".repeat(15)}${address.slice(-3)}`
}





// This helper functions help format the date then check if it is today, yesterday, or another day
export const formatTransactionDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date()

    const isToday = date.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1)

    const isYesterday = date.toDateString() === yesterday.toDateString();


    const time = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    })
        .toLowerCase();


    if (isToday) {
        return `Today, ${time.toUpperCase()}`
    }


    if (isYesterday) {
        return `Yesterday, ${time.toUpperCase()}`
    }

    return `${date.toLocaleDateString([], {
        weekday: "long"
    })}, ${time}`;
}






// Date label helper
export const getDateLabel = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();

    if (date.toDateString() === today.toDateString()) {
        return "Today";
    }

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
    }

    return date.toLocaleDateString([], {
        weekday: "long",
    });
};







// this function fetches the tiers
export const getTierDetails = (tier: currentTier) => {

    const userTier = tierData.find((t) => t.title === tier)
    useTierStore.setState({
        tierDetails: userTier
    });
}




// this function calculates the amount of sales left
export const calcSalesLeft = (limit: number, totalSalesToday: number) => {

    const result = limit - totalSalesToday
    return result;
}






// This functions converts numbers into short form
export const formatCompactNumbers = (value: number): string => {
    const units = [
        { value: 1_000_000_000_000, suffix: "T" },
        { value: 1_000_000_000, suffix: "B" },
        { value: 1_000_000, suffix: "M" },
        { value: 1_000, suffix: "K" },
    ];

    for (const unit of units) {
        if (value >= unit.value) {
            return `₦${(value / unit.value)
                .toFixed(1)
                .replace(/\.0$/, "")
                }${unit.suffix}`
        }
    }

    return value.toString()
}