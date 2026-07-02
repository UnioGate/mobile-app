import ProfilePlaceholder from "@/components/icons/ProfilePlaceholder";
import { withdrawals } from "@/data/mock_withdrawal_tx";
import { teamMembers } from "@/data/team_members_data";
import { TeamMember } from "@/types/types";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { MainStackParamList } from "../../type";



type TransactionRouteProp = RouteProp<
    MainStackParamList,
    "team_member_details"
>


type NavigationProp = NativeStackNavigationProp<MainStackParamList>;



export default function TeamMemberDetails() {
    const route = useRoute<TransactionRouteProp>()
    const { id } = route.params
    const navigation = useNavigation<NavigationProp>();
    const [currentTeamMember, setCurrentTeamMember] = useState<TeamMember | null>(null)

    useEffect(() => {
        const currentMember = teamMembers.find((tm) => tm.id === id)

        setCurrentTeamMember(currentMember ?? null)
    }, [id])


    if (!currentTeamMember) {
        return (
            <View>

                <Text>Team member not found</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable
                    aria-label="back-button"
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons
                        name="chevron-back"
                        size={22}
                        color="#10182A"
                    />
                </Pressable>

                <Text style={styles.heading}>
                    {currentTeamMember?.fullName}
                </Text>

                {/* spacer for centered title */}
                <View style={styles.headerSpacer} />
            </View>

            {/* Main Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >


                <View style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 10,
                    paddingHorizontal: scaleHorizontalPadding(15),
                    paddingVertical: scaleVerticalPadding(5),
                    gap: 12
                }} >

                    <View style={{
                        borderBottomWidth: 0.3,
                        borderBottomColor: "#808080",
                        paddingBottom: 12,
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: 24,
                        flexDirection: "row"
                    }} >


                        <View style={styles.image_wrapper} >
                            <ProfilePlaceholder width={54} height={54} />
                        </View>

                        <View style={{
                            gap: 10,
                            alignItems: "flex-start"
                        }} >
                            <Text style={{
                                color: "#000000",
                                fontSize: scaleFont(14),
                                fontFamily: "Sora_400Regular"
                            }}>{currentTeamMember?.fullName} </Text>

                            <Text style={{
                                color: "#10182AB2",
                                fontFamily: "Sora_400Regular",
                                fontSize: scaleFont(12)
                            }}>{currentTeamMember?.role}</Text>


                            <View style={{
                                backgroundColor: currentTeamMember.status === "active" ? "#009A49" : "#F7AA1A",
                                paddingHorizontal: scaleHorizontalPadding(8),
                                paddingVertical: scaleVerticalPadding(4),
                                borderRadius: 7,
                                width: "auto",
                                borderWidth: 1,
                                borderColor: currentTeamMember.status === "active" ? "#009A49" : "#F7AA1A",
                                marginTop: 3
                            }} >

                                <Text
                                    style={{
                                        color: "#ffffff",
                                        fontSize: scaleFont(12),
                                        fontFamily: "Sora_400Regular"
                                    }}
                                > {currentTeamMember?.status &&
                                    currentTeamMember?.status.charAt(0).toUpperCase()
                                    + currentTeamMember?.status.slice(1)}  </Text>

                            </View>
                        </View>


                    </View>

                    <View style={{
                        gap: 12,
                        borderBottomWidth: 0.3,
                        borderBottomColor: "#808080",
                        paddingBottom: 12
                    }} >
                        <View style={{
                            width: "auto",
                            alignItems: "center",
                            gap: 4,
                            flexDirection: "row"
                        }} >
                            <Ionicons
                                color={"#000000"}
                                size={16}
                                name="call-sharp" />

                            <Text style={styles.details} > {currentTeamMember?.phone} </Text>
                        </View>



                        <View style={{
                            width: "auto",
                            alignItems: "center",
                            gap: 8,
                            flexDirection: "row"
                        }} >
                            <Ionicons
                                color={"#000000"}
                                size={16}
                                name="mail-outline" />

                            <Text style={styles.details} > {currentTeamMember?.email} </Text>
                        </View>

                    </View>


                    <View style={{
                        width: "auto",
                        alignItems: "center",
                        gap: 8,
                        flexDirection: "row",
                        paddingBottom: 3
                    }} >
                        <Ionicons
                            color={"#000000"}
                            name="calendar-clear-outline"
                            size={16}
                        />

                        <Text style={styles.details} > Member since {currentTeamMember?.joinedAt}</Text>
                    </View>

                </View>



                {/* Permission Preview */}
                <View style={{
                    gap: 10
                }} >

                    <Text style={{
                        color: "#10182AB2",
                        fontSize: scaleFont(12),
                        fontFamily: "Sora_400Regular"
                    }} >
                        Permissions
                    </Text>

                    <View style={{
                        width: "100%",
                        backgroundColor: "#ffffff",
                        paddingHorizontal: scaleHorizontalPadding(7),
                        paddingVertical: scaleVerticalPadding(2),
                        borderRadius: 10,
                        gap: 12
                    }} >


                        {/* Process Payment */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            flexDirection: "row",
                            gap: 10,
                        }} >
                            <RadioButton
                                value="false"
                            />

                            <View style={{
                                maxWidth: 230,
                                gap: 4
                            }} >

                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }}>Process Payment</Text>

                            </View>

                        </View>



                        {/* View Balance */}

                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            flexDirection: "row",
                            gap: 10,
                        }} >
                            <RadioButton
                                value="false"
                            />

                            <View style={{
                                maxWidth: 230,
                                gap: 4
                            }} >

                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }}>View Balance</Text>

                            </View>

                        </View>



                        {/* Withdraw funds */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            flexDirection: "row",
                            gap: 10,
                        }} >
                            <RadioButton
                                value="false"
                            />

                            <View style={{
                                maxWidth: 230,
                                gap: 4
                            }} >

                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }}>Withdraw Funds</Text>

                            </View>

                        </View>



                        {/* manage teams  */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            flexDirection: "row",
                            gap: 10,
                        }} >
                            <RadioButton
                                value="false"
                            />

                            <View style={{
                                maxWidth: 230,
                                gap: 4
                            }} >

                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }}>Manage teams</Text>

                            </View>

                        </View>



                        {/* Access settings */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            flexDirection: "row",
                            gap: 10,
                        }} >
                            <RadioButton
                                value="false"
                            />

                            <View style={{
                                maxWidth: 230,
                                gap: 4
                            }} >

                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }}>Access settings</Text>

                            </View>

                        </View>



                        {/* View transactions  */}
                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            flexDirection: "row",
                            gap: 10,
                        }} >
                            <RadioButton
                                value="false"
                            />

                            <View style={{
                                maxWidth: 230,
                                gap: 4
                            }} >

                                <Text style={{
                                    color: "#000000",
                                    fontSize: scaleFont(14),
                                    fontFamily: "Sora_400Regular"
                                }}>View All Transactions</Text>

                            </View>

                        </View>


                    </View>
                </View>




                {/* active summary  */}
                <View style={{
                    gap: 20
                }} >

                    <Text style={{
                        color: "#10182AB2",
                        fontSize: scaleFont(12),
                        fontFamily: "Sora_400Regular"
                    }} >
                        Activity Summary
                    </Text>


                    <View style={styles.summary_card} >

                        <View style={{
                            width: "100%",
                            gap: 20,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center"
                        }} >

                            <View style={styles.summary_metric} >
                                <Text style={styles.summary_metric_number} >156</Text>
                                <Text style={styles.summary_metric_title} >Total Transactions</Text>
                            </View>


                            <View style={styles.summary_metric}>
                                <Text style={styles.summary_metric_number}>₦2.4M</Text>
                                <Text style={styles.summary_metric_title}>Total Volume</Text>
                            </View>
                        </View>

                        <Text style={{
                            color: "#10182A80",
                            fontSize: scaleFont(12),
                            fontFamily: "Sora_400Regular"
                        }} >Last Active today at 2:30 PM</Text>

                    </View>

                </View>




                {/* Recent Activity */}
                <View style={{
                    gap: 10
                }} >

                    <Text style={{
                        color: "#10182AB2",
                        fontSize: scaleFont(12),
                        fontFamily: "Sora_400Regular"
                    }} >
                        Recent Activity
                    </Text>



                    <View style={styles.recent_withdrawal_section_bottom} >

                        {/* The row for withdrawals */}
                        {withdrawals.slice(0, 3).map((tx, id) => (
                            <Pressable
                                onPress={() => navigation.navigate("withdraw_details", {
                                    id: tx.id
                                })}
                                key={tx.id}
                                style={[styles.recent_withdrawal_section_bottom_row, {
                                    borderBottomColor: "#B3B3B3",
                                    borderBottomWidth: id + 1 === 3 ? 0 : 0.4,
                                }]} >

                                <View style={{
                                    alignItems: "flex-start",
                                    gap: 9
                                }} >

                                    <Text style={{
                                        color: "#000000",
                                        fontSize: scaleFont(14),
                                        fontFamily: "Sora_600SemiBold"
                                    }} > ₦{tx.amount.toLocaleString()} </Text>


                                    <Text
                                        numberOfLines={1}
                                        adjustsFontSizeToFit
                                        style={{
                                            color: "#10182AB2",
                                            fontSize: scaleFont(12),
                                            fontFamily: "Sora_400Regular"
                                        }}
                                    > {tx.bank}
                                        {" "}
                                        {tx.account_number.toString().replace(/^.{5}/, "*****")}</Text>
                                </View>


                                <View style={{
                                    width: "auto",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    gap: 5
                                }} >
                                    <View style={{
                                        alignItems: "flex-end",
                                        gap: 12
                                    }} >

                                        <Text style={{
                                            color: tx.status === "Completed" ? "#009A49"
                                                : tx.status === "Pending" ? "#F7AA1A"
                                                    : "#FF0707"
                                            ,
                                            fontSize: scaleFont(10),
                                            fontFamily: "Sora_600SemiBold"
                                        }} > {tx.status} </Text>


                                        <Text style={{
                                            color: "#10182AB2",
                                            fontSize: scaleFont(12),
                                            fontFamily: "Sora_400Regular"
                                        }}
                                        >{tx.date} </Text>
                                    </View>

                                    <Ionicons
                                        name="chevron-forward"
                                        color={"#000000"}
                                        size={20}
                                    />
                                </View>
                            </Pressable>
                        ))}


                    </View>

                </View>



            </ScrollView>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E9ECF3"
    },

    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(14),
    },

    backButton: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
    },

    headerSpacer: {
        width: 32,
    },

    heading: {
        color: "#10182A",
        fontFamily: "PlusJakartaSans_500Medium",
        fontSize: scaleFont(21),
    },

    scrollView: {
        flex: 1,
    },

    scrollViewContent: {
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(5),
        gap: 25,
        flexGrow: 1,
        paddingBottom: scaleVerticalPadding(20)
    },


    summary_card: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingVertical: scaleVerticalPadding(4),
        paddingHorizontal: scaleHorizontalPadding(16),
        alignItems: "center",
        justifyContent: "center",
        gap: 8
    },

    summary_metric: {
        gap: 4,
        alignItems: "center",
        justifyContent: "center",
        width: "47%"
    },

    summary_metric_number: {
        fontSize: scaleFont(24),
        fontFamily: "Sora_600SemiBold",
        color: "#000000"
    },

    summary_metric_title: {
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular",
        color: "#000000"
    },

    recent_withdrawal_section_bottom: {
        borderRadius: 10,
        width: "100%",
        gap: 5,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: scaleHorizontalPadding(6),
    },


    recent_withdrawal_section_bottom_row: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: scaleHorizontalPadding(10),
        paddingVertical: scaleVerticalPadding(10),
    },


    details: {
        color: "#000000",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(14)
    },

    image_wrapper: {
        height: 55,
        width: 55,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
    },


})