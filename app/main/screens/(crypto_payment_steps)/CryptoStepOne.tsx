import { stableCoinData } from "@/data/stableCoinData";
import { stableCoinKey } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MainStackParamList } from "../../type";



type NavigationProp = NativeStackNavigationProp<
    MainStackParamList,
    'sales',
    'stepOne'
>;


const icon: Record<stableCoinKey, any> = {
    cngn: require("../../../../assets/logos/CNGN.png"),
    usdt: require("../../../../assets/logos/USDT.png"),
    usdc: require("../../../../assets/logos/USDC.png")
}



export default function CryptoStepOne() {
    const navigation = useNavigation<NavigationProp>();
    const [stableCoin, setStableCoin] = useState("")
    const [network, setNetwork] = useState("")
    const [checked, setChecked] = useState(false);

    return (

        <View style={styles.container} >



            <View style={styles.content}>
                {/* The header */}
                <View style={styles.header} >

                    <Pressable
                        aria-label="back-button"
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="chevron-back" size={22} color="#10182A" />
                    </Pressable>


                    <Text style={styles.heading} >
                        Crypto Payment
                    </Text>



                    <Pressable
                    >
                    </Pressable>
                </View>


                {/* select coin and network  */}
                <View style={styles.mainContent} >


                    {/* select stable coin */}
                    <View style={styles.customSelect} >

                        <Text style={styles.customSelectText} >
                            Select Stable coin
                        </Text>

                        <Text>
                            <Ionicons name="chevron-down" size={22} color="#10182A" />
                        </Text>

                    </View>


                    {/* select netwirk coin */}
                    <View style={styles.customSelect} >

                        <Text style={styles.customSelectText} >
                            Select Network
                        </Text>

                        <Text>
                            <Ionicons name="chevron-down" size={22} color="#10182A" />
                        </Text>

                    </View>

                </View>
            </View>



            {/* The coin options  */}
            <View style={styles.drawer} >
                <Text style={styles.drawerText} >Select Stablecoin</Text>


                <View style={styles.drawer_grid} >

                    {
                        stableCoinData.map((option, i) => (
                            <Pressable
                                onPress={() => setStableCoin(option.title)}
                                key={i} style={styles.drawer_option}
                            >
                                <View
                                    style={{ marginLeft: "auto" }}>
                                    <Ionicons
                                        name={stableCoin === option.title ? 'checkbox-outline' : 'square-outline'}
                                        size={20}
                                        color="#1D1B20"
                                    />
                                </View>


                                <Image
                                    source={icon[option.img]}
                                    style={{ width: 50, height: 50, objectFit: "contain", }}
                                />


                                <View
                                    style={{
                                        gap: 5,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Text style={styles.drawer_option_heading} > {option.title} </Text>
                                    <Text style={styles.drawer_option_subtitle} > {option.rate} </Text>
                                </View>

                            </Pressable>
                        ))
                    }

                </View>

            </View>


            {/* Render button conditionally once the inputs have been selected */}
            {stableCoin.trim() !== "" && network.trim() !== "" ? (
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                // onPress={handleContinue}
                >
                    <Text style={styles.buttonText} > Continue</Text>
                </TouchableOpacity>
            )
                :
                null
            }

        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E9ECF3",
    },


    content: {
        flex: 1,
        paddingHorizontal: 19,
        paddingTop: 30,
        flexDirection: "column",
        gap: 17
    },

    header: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },

    heading: {
        color: "#10182A",
        fontFamily: "PlusJakartaSans_500Medium",
        fontSize: 22
    },

    mainContent: {
        display: "flex",
        gap: 20,
        marginTop: 50
    },

    customSelect: {
        width: "100%",
        backgroundColor: "#ffffff",
        paddingVertical: 30,
        paddingHorizontal: 18,
        borderRadius: 20,
        justifyContent: "space-between",
        flexDirection: "row"
    },

    customSelectText: {
        fontSize: 15,
        color: "#000000",
        fontFamily: "Sora_400Regular"
    },

    drawer: {
        backgroundColor: "#ffffff",
        width: "100%",
        height: "auto",
        position: "absolute",
        bottom: 0,
        left: 0,
        paddingHorizontal: 10,
        paddingVertical: 30,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        gap: 20
    },

    drawerText: {
        fontSize: 18,
        color: "#000000",
        fontFamily: "Sora_600SemiBold"
    },

    drawer_grid: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5
    },

    drawer_option: {
        width: "31%",
        backgroundColor: "#fff",
        flexDirection: "column",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#10182A66",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 4,
        gap: 7,
        position: "relative"
    },

    drawer_option_heading: {
        fontSize: 16,
        fontFamily: "Sora_400Regular"
    },

    drawer_option_subtitle: {
        fontSize: 12,
        color: "#10182A80",
        fontFamily: "Sora_300Light",
        marginBottom: 5
    },


    button: {
        width: "100%",
        backgroundColor: "#253E86",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        borderRadius: 10,
        marginBottom: 11,
        marginTop: "auto"
    },

    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        fontFamily: 'Sora_400Regular', 
    },
})