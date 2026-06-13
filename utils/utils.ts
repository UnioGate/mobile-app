import * as Clipboard from "expo-clipboard";
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