import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const baseWidth = 375;


export const scaleFont = (size: number) => {
    return (screenWidth / baseWidth) * size
}