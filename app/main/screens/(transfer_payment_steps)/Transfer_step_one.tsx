import { transfer_payment_method } from "@/data/transfer_payment_methods";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MainStackParamList } from "../../type";



type NavigationProp = NativeStackNavigationProp<
    MainStackParamList,
    'sales',
    'stepOne'
>;


export default function TransferStepOne() {
    const navigation = useNavigation<NavigationProp>();



    return (
        <View style={styles.content}>
            {/* The header */}
            <View style={styles.header} >

                <Pressable
                    aria-label="back-button"
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={18} color="#10182A" />
                </Pressable>


                <Text style={styles.heading} >
                    Choose Payment Method
                </Text>


                <Pressable
                >
                </Pressable>
            </View>



            {/* main content: Payment options  */}
            <View style={styles.methods_flexbox}  >

                {transfer_payment_method.map((option, i) => (
                    <Pressable
                        key={i}
                        style={styles.option_wrapper}
                        onPress={() => navigation.navigate(option.route)}
                    >
                        {/* left side  */}
                        <View style={styles.leftside_wrapper} >
                            {/* Icon  */}
                            <View style={[styles.left_side_icon_wrapper, {
                                backgroundColor: option.background_color,
                            }]} >
                                <Ionicons name={option.icon} size={35} color={option.textColor} />
                            </View>


                            <View style={styles.text_container} >
                                <Text style={styles.title} > {option.title} </Text>
                                <Text style={styles.subTitle} > {option.subtitle} </Text>
                            </View>

                        </View>



                        {/* Right hand side  */}
                        <View style={[styles.forward_icon, {
                            backgroundColor: option.background_color,
                        }]} >
                            <Ionicons name="arrow-forward" size={15.83} color={option.textColor} />
                        </View>
                    </Pressable>
                ))}

            </View>





            {/* back to sales button  */}
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("sales")}
            >
                <Text style={styles.buttonText} >Back to Sale</Text>
            </TouchableOpacity>

        </View>
    )
}





const styles = StyleSheet.create({

    content: {
        flex: 1,
        paddingHorizontal: 19,
        paddingTop: 30,
        flexDirection: "column",
        gap: 17,
        backgroundColor: "#E9ECF3",
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
        fontFamily: "Sora_600SemiBold",
        fontSize: 16
    },

    methods_flexbox: {
        width: "100%",
        alignItems: "center",
        gap: 37,
        marginTop: 36
    },

    option_wrapper: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "#ffffff",
        borderWidth: 0.7,
        borderColor: "#B3B3B3",
        borderRadius: 20,
        padding: 20,
        boxShadow: "0px 4px 6px 0px #00000040"
    },

    leftside_wrapper: {
        width: "auto",
        alignItems: "center",
        gap: 24,
        flexDirection: "row",
    },

    text_container: {
        gap: 10,
        alignItems: "flex-start"
    },

    title: {
        fontSize: 16,
        color: "#10182A",
        fontFamily: "Sora_400Regular"
    },


    subTitle: {
        color: "#10182A80",
        fontSize: 11,
        fontFamily: "Sora_400Regular"
    },

    left_side_icon_wrapper: {
        height: 55,
        width: 55,
        borderRadius: 10,
        backgroundColor: "#FF070733",
        alignItems: "center",
        justifyContent: "center",
    },


    forward_icon: {
        height: 37,
        width: 37,
        borderRadius: "50%",
        backgroundColor: "#FF070733",
        alignItems: "center",
        justifyContent: "center",
    },

    button: {
        width: "100%",
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        borderRadius: 10,
        marginBottom: 11,
        marginTop: "auto",
        borderWidth: 0.5,
        borderColor: "#253E86"
    },

    buttonText: {
        color: "#253E86",
        fontSize: 18,
        fontFamily: 'Sora_400Regular',
    },

})