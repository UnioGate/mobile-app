import BankIcon from "@/components/icons/BankIcon";
import DoubleArrow from "@/components/icons/DoubleArrow";
import Edit from "@/components/icons/Edit";
import NairaSign from "@/components/icons/NairaIcon";
import RolesIcon from "@/components/icons/RolesIcon";
import SettlementIcon from "@/components/icons/SettlementIcon";
import TeamIcon from "@/components/icons/Team";
import WalletIcon from "@/components/icons/WalletIcon";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MainStackParamList } from "../../type";


type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function ProfileDetails() {
    const navigation = useNavigation<OverviewNavigationProp>()



    return (
        <View style={styles.container} >



            {/* Header */}
            <View style={styles.header}>

                <Pressable
                    aria-label="back-button"
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="chevron-back"
                        size={20}
                        color="#10182A"
                    />
                </Pressable>



                <Pressable
                    aria-label="back-button"
                    style={styles.edit_button}
                >
                    <Edit
                        width={17.9}
                        height={17.9}
                        color={"#1E1E1E"}
                    />

                    <Text style={styles.heading}>
                        Edit Profile
                    </Text>
                </Pressable>

            </View>



            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.main_content}
                showsVerticalScrollIndicator={false} >

                <View style={styles.card} >

                    <View style={styles.image_wrapper} >
                        <Image
                            source={require("../../../../assets/overview/user.png")}
                            style={{ width: "70%", aspectRatio: 1, }} />
                    </View>


                    {/* card */}
                    <View style={styles.card_details}  >

                        <Text style={styles.business_name} >Tech Haven Store</Text>
                        <Text style={styles.status} >Tier 2: Personal verified</Text>

                        <TouchableOpacity style={styles.upgrade_button} >
                            <Text style={styles.upgrade_buttonText} >Upgrade Account</Text>
                            <Ionicons
                                name="chevron-forward"
                                size={13}
                                color="#FFFFFF"
                            />
                        </TouchableOpacity>
                    </View>
                </View>


                {/* Account details  */}
                <View style={styles.category_wrapper} >
                    <Text style={styles.category_title} >ACCOUNT</Text>

                    <View style={styles.category_card} >

                        <Pressable
                            onPress={() => navigation.navigate("balance")}
                            style={styles.category_card_row} >

                            {/* left side */}
                            <View style={styles.left_side} >
                                <WalletIcon />
                                <Text style={styles.left_side_text} >Balance & Withdrawals</Text>
                            </View>


                            {/* Right side  */}
                            <View style={styles.right_side} >
                                <Ionicons name="chevron-forward" size={15} color={"#4B4848"} />
                            </View>

                        </Pressable>


                        <Pressable
                            onPress={() => navigation.navigate("settlement_settings")}
                            style={styles.category_card_row} >

                            {/* left side */}
                            <View style={styles.left_side} >
                                <SettlementIcon width={20} height={16} color={"#1E1E1E"} />
                                <Text style={styles.left_side_text} >Settlement Setting : Auto (weekly)</Text>
                            </View>


                            {/* Right side  */}
                            <View style={styles.right_side} >
                                <Ionicons name="chevron-forward" size={15} color={"#4B4848"} />
                            </View>

                        </Pressable>



                        <View style={[styles.category_card_row, {
                            borderBottomWidth: 0
                        }]} >

                            {/* left side */}
                            <View style={styles.left_side} >
                                <DoubleArrow width={20} height={20} color={"#1E1E1E"} />
                                <Text style={styles.left_side_text} >Transaction Limits</Text>
                            </View>


                            {/* Right side  */}
                            <View style={styles.right_side} >
                                <Text style={styles.right_side_text} >Tier 2: ₦10M / ₦15M</Text>
                                <Ionicons name="chevron-forward" size={15} color={"#4B4848"} />
                            </View>

                        </View>

                    </View>
                </View>





                {/* Payments */}
                <View style={styles.category_wrapper} >
                    <Text style={styles.category_title} >PAYMENTS</Text>

                    <View style={styles.category_card} >

                        <Pressable
                            onPress={() => navigation.navigate("payment_methods")}
                            style={styles.category_card_row} >

                            {/* left side */}
                            <View style={styles.left_side} >
                                <WalletIcon />
                                <Text style={styles.left_side_text} >Accepted Payment Methods</Text>
                            </View>


                            {/* Right side  */}
                            <View style={styles.right_side} >
                                <Text style={styles.right_side_text} >Crypto, Fiat</Text>
                                <Ionicons name="chevron-forward" size={15} color={"#4B4848"} />
                            </View>

                        </Pressable>


                        <Pressable
                            onPress={() => navigation.navigate("display_currency_screen")}
                            style={[styles.category_card_row, {
                                borderBottomWidth: 0
                            }]} >

                            {/* left side */}
                            <View style={styles.left_side} >
                                <NairaSign width={18} height={18} color={"#1E1E1E"} />
                                <Text style={styles.left_side_text} >Display Currency NGN</Text>
                            </View>


                            {/* Right side  */}
                            <View style={styles.right_side} >
                                <Ionicons name="chevron-forward" size={15} color={"#4B4848"} />
                            </View>

                        </Pressable>

                    </View>
                </View>


                {/* Team */}
                <View style={styles.category_wrapper} >
                    <Text style={styles.category_title} >TEAM</Text>

                    <View style={styles.category_card} >

                        <Pressable
                            onPress={() => navigation.navigate("team_members")}
                            style={styles.category_card_row} >

                            {/* left side */}
                            <View style={styles.left_side} >
                                <TeamIcon width={20} height={20} color={"#1E1E1E"} />
                                <Text style={styles.left_side_text} >Team Members</Text>
                                <Text style={styles.right_side_text} >3 members</Text>
                            </View>


                            {/* Right side  */}
                            <View style={styles.right_side} >
                                <Ionicons name="chevron-forward" size={15} color={"#4B4848"} />
                            </View>

                        </Pressable>


                        <Pressable
                            onPress={() => navigation.navigate("roles_and_permission")}
                            style={[styles.category_card_row, {
                                borderBottomWidth: 0
                            }]} >

                            {/* left side */}
                            <View style={styles.left_side} >
                                <RolesIcon height={20} width={19} color={"#1E1E1E"} />
                                <Text style={styles.left_side_text} >Roles & Permissions</Text>
                            </View>


                            {/* Right side  */}
                            <View style={styles.right_side} >
                                <Ionicons name="chevron-forward" size={15} color={"#4B4848"} />
                            </View>

                        </Pressable>

                    </View>
                </View>



                {/* BUSINESS */}
                <View style={styles.category_wrapper} >
                    <Text style={styles.category_title} >BUSINESS</Text>

                    <View style={styles.category_card} >

                        <View style={styles.category_card_row} >

                            {/* left side */}
                            <View style={styles.left_side} >
                                <Ionicons name="briefcase" size={21} color={"#1E1E1E"} />
                                <Text style={styles.left_side_text} >Business Information</Text>
                            </View>


                            {/* Right side  */}
                            <View style={styles.right_side} >
                                <Ionicons name="chevron-forward" size={15} color={"#4B4848"} />
                            </View>

                        </View>

                        <View style={styles.category_card_row} >

                            {/* left side */}
                            <View style={styles.left_side} >
                                <Ionicons name="shield-checkmark" size={21} color={"#1E1E1E"} />
                                <Text style={styles.left_side_text} >Verification & KYC</Text>

                                {/* verified tag */}
                                <Text style={styles.verified_tag} >
                                    Verified
                                </Text>
                            </View>


                            {/* Right side  */}
                            <View style={styles.right_side} >
                                <Ionicons name="chevron-forward" size={15} color={"#4B4848"} />
                            </View>

                        </View>


                        <Pressable
                            onPress={() => navigation.navigate("bank_account")}
                            style={[styles.category_card_row, {
                                borderBottomWidth: 0
                            }]} >

                            {/* left side */}
                            <View style={styles.left_side} >
                                <BankIcon width={20} height={20} color={"#1E1E1E"} />
                                <Text style={styles.left_side_text} >Bank Account</Text>
                            </View>


                            {/* Right side  */}
                            <View style={styles.right_side} >
                                <Text style={styles.right_side_text} >Zenith Bank : ****5678</Text>
                                <Ionicons name="chevron-forward" size={15} color={"#4B4848"} />
                            </View>

                        </Pressable>

                    </View>
                </View>


                <Text style={styles.category_title} >SUPPORT & LEGAL</Text>


            </ScrollView >

        </View >
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E9ECF3',
        flex: 1,
        width: "100%"
    },


    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: scaleVerticalPadding(10),
        paddingHorizontal: scaleHorizontalPadding(13),
        paddingTop: scaleVerticalPadding(10),
    },

    heading: {
        color: "#000000",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(16),
    },

    edit_button: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },

    main_content: {
        backgroundColor: "#D3D8E7",
        flexGrow: 1,
        paddingVertical: scaleVerticalPadding(13),
        paddingHorizontal: scaleHorizontalPadding(15),
        alignItems: "stretch",
        gap: 17,
        paddingBottom: scaleVerticalPadding(20),
        borderTopWidth: 0.5,
        borderTopColor: "#B3B3B3",
    },

    card: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderWidth: 0.5,
        borderColor: "#B3B3B3",
        borderRadius: 20,
        paddingVertical: scaleVerticalPadding(10),
        paddingHorizontal: scaleHorizontalPadding(15),
        flexDirection: "row",
        gap: 13,
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },

    image_wrapper: {
        backgroundColor: "#253E86",
        height: 55,
        width: 55,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        borderWidth: 2,
        borderColor: "#B3B3B3"
    },

    card_details: {
        width: "auto",
        alignItems: "flex-start",
        gap: 8
    },

    status: {
        width: "auto",
        color: "#0B7437",
        fontSize: scaleFont(10),
        fontFamily: "Sora_400Regular",
        backgroundColor: "#A4FFE1",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleVerticalPadding(4),
        paddingHorizontal: scaleHorizontalPadding(5),
        borderRadius: 999
    },

    business_name: {
        fontSize: scaleFont(20),
        fontFamily: "PlusJakartaSans_500Medium",
        color: "#000000"
    },



    upgrade_button: {
        width: "auto",
        backgroundColor: "#253E86",
        borderRadius: 10,
        paddingVertical: scaleVerticalPadding(10),
        paddingHorizontal: scaleHorizontalPadding(20),
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
        marginTop: 10
    },

    upgrade_buttonText: {
        color: "#FFFFFF",
        fontSize: scaleFont(10),
        fontFamily: "PlusJakartaSans_600SemiBold",
    },

    category_wrapper: {
        width: "100%",
        gap: 6,
        alignItems: "flex-start",
        height: "auto",
    },

    category_title: {
        color: "#6B6969",
        fontSize: scaleFont(12),
        fontFamily: "Sora_600SemiBold"
    },

    category_card: {
        width: "100%",
        height: "auto",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#B3B3B3",
        borderRadius: 10,
        paddingVertical: scaleVerticalPadding(10),
        paddingHorizontal: scaleHorizontalPadding(3),
        flexDirection: "column",
        gap: 13,
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },

    category_card_row: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: scaleHorizontalPadding(10),
        paddingVertical: scaleVerticalPadding(14),
        borderBottomWidth: 1,
        borderBottomColor: "#B3B3B3",
        flexDirection: "row",
        gap: 20
    },


    left_side: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "flex-start"
    },

    left_side_text: {
        color: "#000000",
        fontSize: scaleFont(12),
        fontFamily: "Sora_400Regular"
    },


    right_side: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "flex-end",
        flexShrink: 1,
    },

    right_side_text: {
        color: "#000000",
        fontSize: scaleFont(10),
        fontFamily: "Sora_300Light",
        flexShrink: 1,
    },


    verified_tag: {
        backgroundColor: "#1CCA65",
        borderRadius: 9,
        paddingVertical: scaleVerticalPadding(2),
        paddingHorizontal: scaleHorizontalPadding(5),
        color: "#ffffff",
        fontSize: scaleFont(8),
        fontFamily: "Sora_400Regular"
    }



})