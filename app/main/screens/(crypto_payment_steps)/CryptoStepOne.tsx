import { createSale } from "@/api/sales.api";
import { networkOptions } from "@/data/network_data";
import { stableCoinData } from "@/data/stableCoinData";
import { useSaleStore } from "@/stores/saleStore";
import { networkKey, networkOptionData, SalesBody, stableCoinKey, stableCoinOptionData } from "@/types/types";
import { showErrorToast, showSuccessToast } from "@/utils/toastConfig";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { useState } from "react";
import { Animated, Easing, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { MainStackParamList } from "../../type";



type NavigationProp = NativeStackNavigationProp<
    MainStackParamList,
    'sales',
    'stepOne'
>;


type DrawerType = "coin" | "network" | null;

const icon: Record<stableCoinKey, any> = {
    cngn: require("../../../../assets/logos/CNGN.png"),
    usdt: require("../../../../assets/logos/USDT.png"),
    usdc: require("../../../../assets/logos/USDC.png")
}


const networkIcon: Record<networkKey, any> = {
    base: require("../../../../assets/logos/base.png"),
    eth: require("../../../../assets/logos/eth.png"),
    tron: require("../../../../assets/logos/tron.png")
}



export default function CryptoStepOne() {
    const navigation = useNavigation<NavigationProp>();
    const [stableCoin, setStableCoin] = useState<stableCoinOptionData | null>(null)
    const [network, setNetwork] = useState<networkOptionData | null>(null)
    const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
    const translateY = useState(new Animated.Value(300))[0];
    const { sale, setSaleResponse, setSalesData } = useSaleStore();
    const [loading, setLoading] = useState(false)



    // this function controls the drawer
    const toggleDrawer = (drawer: DrawerType) => {
        if (drawer === activeDrawer) return;

        if (drawer) {
            translateY.setValue(300); // reset position
            setActiveDrawer(drawer);

            Animated.timing(translateY, {
                toValue: 0,
                duration: 250,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: 300,
                duration: 200,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }).start(() => setActiveDrawer(null));
        }
    };





    // this function controls the submission
    const submit = async () => {


        if (!sale.currency) {
            showErrorToast("Please select a currency!")
            return;
        }


        if (!sale.network) {
            showErrorToast("Please select a network!")
            return;
        }

        setLoading(true)


        try {
            const payload: SalesBody = {
                amount: sale.amount,
                currency: stableCoin?.title,
                description: sale.description,
                network: network?.title,
                paymentType: sale.paymentType
            }

            console.log("The payload", payload)

            const response = await createSale(payload)


            if (!response.ok || !response.createSalesResponse) {
                showErrorToast(response.error)
                console.error(response.error)
                return;
            }

            showSuccessToast(response.message);
            setSaleResponse(response.createSalesResponse)
            navigation.replace("cryptoStepTwo")

        } catch (error) {
            if (axios.isAxiosError(error)) {
                showErrorToast(
                    error.response?.data?.message ??
                    error.message
                );
                console.log("Status:", error.response?.status);
                console.log("Response Data:", error.response?.data);
                console.log("Response Headers:", error.response?.headers);
                console.log("Request Config:", error.config);
            }
            showErrorToast("Something went wrong");
            console.error(error)
        }

        finally {
            setLoading(false)
        }
    }


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
                    <Pressable
                        onPress={() => toggleDrawer("coin")}
                        style={styles.customSelect} >

                        {stableCoin ? (
                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: 8,
                                    alignItems: "center"
                                }}
                            >
                                <Image
                                    source={icon[stableCoin.img]}
                                    style={{ width: 30, height: 30, }}
                                    resizeMode="contain"
                                />

                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontFamily: "Sora_400Regular"
                                    }}
                                > {stableCoin.title} </Text>
                            </View>
                        ) : (
                            <Text style={styles.customSelectText} >
                                Select Stable coin
                            </Text>
                        )}

                        <Text>
                            <Ionicons name="chevron-down" size={22} color="#10182A" />
                        </Text>

                    </Pressable>


                    {/* select network coin */}
                    <Pressable
                        onPress={() => toggleDrawer("network")}
                        style={styles.customSelect} >

                        {
                            network ? (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        gap: 8,
                                        alignItems: "center"
                                    }}
                                >
                                    <Image
                                        source={networkIcon[network.img]}
                                        style={{ width: 30, height: 30, }}
                                        resizeMode="contain"
                                    />

                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontFamily: "Sora_400Regular"
                                        }}
                                    > {network.title} </Text>
                                </View>
                            ) :
                                (
                                    <Text style={styles.customSelectText} >
                                        Select Network
                                    </Text>
                                )
                        }

                        <Text>
                            <Ionicons name="chevron-down" size={22} color="#10182A" />
                        </Text>

                    </Pressable>

                </View>


                {/* Render button conditionally once the inputs have been selected */}
                {stableCoin && network ? (
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.7}
                        onPress={submit}
                    >
                        {loading ? (
                            <ActivityIndicator color="#ffffff" />
                        )
                            : (
                                <Text style={styles.buttonText} > Continue</Text>
                            )}
                    </TouchableOpacity>
                )
                    :
                    null
                }
            </View>



            {/* The coin options drawer  */}
            {
                activeDrawer === "coin" && (
                    <Animated.View
                        style={[
                            styles.drawer,
                            { transform: [{ translateY }] }
                        ]} >
                        <Text style={styles.drawerText} >Select Stablecoin</Text>


                        <View style={styles.drawer_grid} >

                            {
                                stableCoinData.map((option, i) => (
                                    <Pressable
                                        onPress={() => {
                                            setStableCoin(option)
                                            toggleDrawer(null)
                                            setSalesData({
                                                currency: option.title
                                            })
                                        }}
                                        key={i} style={styles.drawer_option}
                                    >
                                        <View
                                            style={{ marginLeft: "auto" }}>
                                            <Ionicons
                                                name={stableCoin?.title === option.title ? 'checkbox-outline' : 'square-outline'}
                                                size={20}
                                                color="#1D1B20"
                                            />
                                        </View>


                                        <Image
                                            source={icon[option.img]}
                                            style={{ width: 50, height: 50, }}
                                            resizeMode="contain"
                                        />


                                        <View
                                            style={{
                                                gap: 5,
                                                width: "100%",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <Text
                                                style={styles.drawer_option_heading} >
                                                {option.title} </Text>


                                            <Text
                                                numberOfLines={1}
                                                adjustsFontSizeToFit
                                                style={styles.drawer_option_subtitle} > {option.rate} </Text>
                                        </View>

                                    </Pressable>
                                ))
                            }

                        </View>

                    </Animated.View>
                )
            }




            {/* The network options drawer  */}
            {
                activeDrawer === "network" && (
                    <Animated.View
                        style={[
                            styles.drawer,
                            { transform: [{ translateY }] }
                        ]} >
                        <Text style={styles.drawerText} >Select Network</Text>


                        <View style={styles.drawer_grid} >

                            {
                                networkOptions.map((option, i) => (
                                    <Pressable
                                        onPress={() => {
                                            setNetwork(option)
                                            toggleDrawer(null)
                                            setSalesData({
                                                network: option.title
                                            })
                                        }}
                                        key={i} style={styles.drawer_option}
                                    >
                                        <View
                                            style={{ marginLeft: "auto" }}>
                                            <Ionicons
                                                name={network?.title === option.title ? 'checkbox-outline' : 'square-outline'}
                                                size={20}
                                                color="#1D1B20"
                                            />
                                        </View>


                                        <Image
                                            source={networkIcon[option.img]}
                                            style={{ width: 50, height: 50, }}
                                            resizeMode="contain"
                                        />


                                        <View
                                            style={{
                                                gap: 5,
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <Text style={styles.drawer_option_heading} > {option.title} </Text>
                                        </View>

                                    </Pressable>
                                ))
                            }

                        </View>

                    </Animated.View>
                )
            }



        </View >

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E9ECF3",
    },


    content: {
        flex: 1,
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingTop: scaleVerticalPadding(10),
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
        fontSize: scaleFont(22)
    },

    mainContent: {
        gap: 20,
        marginTop: 30
    },

    customSelect: {
        width: "100%",
        backgroundColor: "#ffffff",
        paddingVertical: scaleVerticalPadding(30),
        paddingHorizontal: scaleHorizontalPadding(18),
        borderRadius: 20,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },

    customSelectText: {
        fontSize: scaleFont(15),
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
        paddingHorizontal: scaleHorizontalPadding(10),
        paddingVertical: scaleVerticalPadding(30),
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
    },

    drawerText: {
        fontSize: scaleFont(18),
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
        paddingHorizontal: scaleHorizontalPadding(10),
        paddingVertical: scaleVerticalPadding(4),
        gap: 7,
        position: "relative"
    },

    drawer_option_heading: {
        fontSize: scaleFont(16),
        fontFamily: "Sora_400Regular",
        textAlign: "center"
    },

    drawer_option_subtitle: {
        fontSize: scaleFont(12),
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
        paddingVertical: scaleVerticalPadding(16),
        borderRadius: 10,
        marginBottom: 11,
        marginTop: "auto"
    },

    buttonText: {
        color: "#ffffff",
        fontSize: scaleFont(18),
        fontFamily: 'Sora_400Regular',
    },
})