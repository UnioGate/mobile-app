import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Text, View } from "react-native";
import BarChartIcon from "./icons/BarChartIcon";
import TapIcon from "./icons/TapIcon";




export default function TransactionChart() {
    return (
        <View style={{
            width: "auto",
            backgroundColor: "#FFFFFF",
            borderRadius: 7,
            alignItems: "flex-start",
        }} >

            <View style={{
                width: "100%",
                backgroundColor: "#ffffff",
                paddingTop: scaleVerticalPadding(9),
                paddingHorizontal: scaleHorizontalPadding(19),
                borderTopLeftRadius: 7,
                borderTopRightRadius: 7,
                gap: 25
            }} >

                <View style={{
                    width: "auto",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 6
                }} >
                    <BarChartIcon />

                    <Text style={{
                        color: "#000000",
                        fontFamily: "Sora_600SemiBold",
                        fontSize: scaleFont(14)
                    }} >Transaction Volume </Text>

                    <Text style={{
                        fontSize: scaleFont(10),
                        color: "#000000",
                        fontFamily: "Sora_300Light"
                    }}>(Last 7 days)</Text>
                </View>

                <View>

                </View>


            </View>

            <View style={{
                width: "100%",
                backgroundColor: "#10182A0D",
                borderBottomLeftRadius: 7,
                borderBottomRightRadius: 7,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 6,
            }} >
                <TapIcon
                    width={10.5}
                    height={14}
                />

                <Text style={{
                    color: "#000000",
                    fontSize: scaleFont(12),
                    fontFamily: "Sora_400Regular"
                }}>Tap a bar to filter transactions</Text>
            </View>

        </View>
    )
}