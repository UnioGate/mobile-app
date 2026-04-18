import { fonts } from "@/fonts/fonts";
import { useFonts } from "@expo-google-fonts/sora";
import { Ionicons } from "@expo/vector-icons";
import { BanknoteArrowDown, SmartphoneNfc } from "lucide-react-native";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function Overview() {

    const [fontsLoaded] = useFonts(fonts);

    if (!fontsLoaded) return null;


    return (
        <View style={styles.container} >

            <View style={styles.header} >

                <View style={styles.greeting} >
                    <View style={styles.profilePicWrapper}  >
                        <Image source={require("../../../assets/overview/user.png")} style={{ width: 40, height: 40, marginTop: 7 }} />
                    </View>

                    <Text style={styles.hellotext} >
                        Hello, <Text style={styles.userName} >UnioGate</Text></Text>
                </View>



                <View style={styles.support} >
                    <TouchableOpacity >
                        <Ionicons name="headset-outline" size={22} color="#10182A" />
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.bellButton} >
                        <Ionicons name="notifications-sharp" size={19} color="#10182A" />

                        {/* The red dot on the bell */}
                        <View style={styles.redDot} ></View>

                    </TouchableOpacity>


                </View>
            </View>


            {/* The banner showing the balance and call to action buttons  */}
            <View style={styles.CTABannner} >

                <View style={styles.brief_details} >
                    <Text style={styles.availableBalance} >Available Balance</Text>

                    <View style={styles.amount_wrapper} >
                        <Text style={styles.amount} >₦247,850.50</Text>
                        <TouchableOpacity >
                            <Ionicons name="eye-off" size={19} color="#FFFFFF" /></TouchableOpacity>
                    </View>

                    <Text style={styles.tierStatus} >Tier 2: Personal verified</Text>
                </View>


                {/* CTA buttons */}
                <View style={styles.CTA_buttons_wrapper} >


                    {/* New sale  */}
                    <Pressable style={styles.CTA_button} >
                        <View style={styles.circle} >
                            <Ionicons name="add" size={25} color="#10182A" />
                        </View>
                        <Text style={styles.CTA_button_text} >New Sale</Text>
                    </Pressable>


                    {/* Withdraw */}
                    <Pressable style={styles.CTA_button} >
                        <View style={styles.circle} >
                            <BanknoteArrowDown size={24} color="#253E86" />
                        </View>
                        <Text style={styles.CTA_button_text} >
                            Withdraw
                        </Text>
                    </Pressable>


                    {/* Tap to pay  */}
                    <Pressable style={styles.CTA_button} >
                        <View style={styles.circle} >
                            <SmartphoneNfc size={24} color="#253E86" />
                        </View>
                        <Text style={styles.CTA_button_text} >
                            Tap to Pay
                        </Text>
                    </Pressable>

                </View>

            </View>



            {/* Brief summary of today's activities */}
            <View style={styles.briefSummary} >

                <View style={styles.leftSide} >
                    <View style={styles.text_wrapper} >
                        <Text style={styles.boldText} >24</Text>
                        <Text style={styles.label} >Today's Transaction</Text>
                    </View>
                </View>


                <View style={styles.rightSide} >
                    <View style={styles.text_wrapper} >
                        <Text style={styles.boldText} >128400</Text>
                        <Text style={styles.label} >Today's Revenue</Text>
                    </View>
                </View>

            </View>



            {/* The transaction limit  */}
            <View style={styles.tx_limit} >

            </View>



        </View>
    )
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9ECF3',
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 12,
        paddingHorizontal: 19,
        paddingVertical: 30
    },

    header: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },

    profilePicWrapper: {
        width: 45,
        height: 45,
        borderRadius: "50%",
        borderWidth: 1,
        borderColor: "#253E86",
        overflow: "hidden",
        backgroundColor: "#E9ECF3",
    },
    greeting: {
        display: "flex",
        alignItems: "center",
        gap: 5,
        flexDirection: "row",
    },

    hellotext: {
        fontFamily: 'Sora_400Regular',
        fontSize: 14
    },

    userName: {
        fontFamily: "Sora_300Light",
        fontSize: 14
    },

    support: {
        display: "flex",
        alignItems: "center",
        gap: 15,
        flexDirection: "row",
    },



    bellButton: {
        position: "relative",
        width: 36,
        height: 36,
        backgroundColor: "#253E861A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
    },

    redDot: {
        backgroundColor: "#FF0707",
        height: 10,
        width: 10,
        borderRadius: "50%",
        position: "absolute",
        top: 0,
        right: 0,
    },


    CTABannner: {
        width: "100%",
        height: "auto",
        backgroundColor: "#253E86",
        borderRadius: 40,
        paddingHorizontal: 19,
        paddingVertical: 35,
        display: "flex",
        alignItems: "flex-start",
        gap: 15,
        flexDirection: "column"
    },

    brief_details: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 5
    },

    availableBalance: {
        color: "#FFFFFF",
        fontSize: 14,
        fontFamily: "sora300Light"
    },

    amount_wrapper: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        flexDirection: "row"
    },

    amount: {
        fontSize: 40,
        color: "#FFFFFF",
        fontFamily: "sora400Regular"
    },

    tierStatus: {
        backgroundColor: "#FFFFFF1A",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 9,
        color: "#FFFFFF",
        fontSize: 10,
        fontFamily: "sora300Light"
    },


    CTA_buttons_wrapper: {
        display: "flex",
        alignItems: "center",
        gap: 50,
        justifyContent: "center",
        flexDirection: "row",
        width: "100%",
        maxWidth: 301,
        marginHorizontal: "auto"
    },


    CTA_button: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 6
    },


    CTA_button_text: {
        fontSize: 12,
        color: "#FFFFFF",
        fontFamily: "sora300Light",
        textAlign: "center"
    },

    circle: {
        width: 67,
        height: 67,
        borderRadius: "50%",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#2DBAA4CC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },


    briefSummary: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },

    leftSide: {
        flex: 1,
        borderRightWidth: 0.5,
        borderColor: "#D3D8E7",
        paddingVertical: 23,
        paddingHorizontal: 20,
    },

    rightSide: {
        flex: 1,
        paddingVertical: 23,
        paddingHorizontal: 20,
        borderLeftWidth: 0.5,
        borderColor: "#D3D8E7",
    },

    text_wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2
    },

    boldText: {
        color: "#10182A",
        fontSize: 24,
        fontFamily: "Sora_400Regular"
    },

    label: {
        color: "#797676",
        fontSize: 11,
        fontFamily: "Sora_400Regular"
    },


    tx_limit: {
backgroundColor: "#ffffff",
borderRadius: 20,
width: "100%",
paddingVertical: 23,
paddingHorizontal: 15,
display: "flex",
alignItems: "center",
justifyContent: "center"
    }

})