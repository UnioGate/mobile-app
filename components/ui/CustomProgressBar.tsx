import { scaleFont } from "@/utils/utils";
import { DimensionValue, Text, View } from "react-native";


interface CustomProgressBarProps {
    trackColor?: string;
    thumbColor?: string
    amount: number;
    total: number
}



export default function CustomProgressBar({ trackColor = "#D3D8E7", thumbColor = "#253E86", total, amount }: CustomProgressBarProps) {

    const calcProgress = (): DimensionValue => {
        if (total <= 0) return "0%";

        const percentage = Math.min(
            Math.max((amount / total) * 100, 0),
            100
        );

        return `${percentage}%`;
    };

    const progress = calcProgress();


    return (
        <View style={{
            backgroundColor: trackColor,
            width: "100%",
            height: 13,
            borderRadius: 15,
            position: "relative",
            overflow: "hidden"
        }} >

            <Text
                style={{
                    color: "#10182A",
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    zIndex: 999,
                    fontFamily: "Sora_300Light",
                    fontSize: scaleFont(8),
                    textAlign: "center",
                }}
            >
                {progress as string}
            </Text>

            {/* the thumb */}
            <View
                style={{
                    width: calcProgress(),
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    backgroundColor: thumbColor,
                    borderRadius: 15,
                }}
            />


        </View>
    )
}