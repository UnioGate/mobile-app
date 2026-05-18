import { Dimensions } from "react-native";

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