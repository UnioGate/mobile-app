import Edit from "@/components/icons/Edit";
import ProfilePlaceholder from "@/components/icons/ProfilePlaceholder";
import TeamIcon from "@/components/icons/TeamIcon";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CheckCircle, Trash } from "lucide-react-native";
import { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Menu, PaperProvider } from 'react-native-paper';
import { MainStackParamList } from "../type";


type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;



export default function TeamMembers() {
    const [TeamMembersList, setTeamMembersList] = useState(["nedu"])
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedMember, setSelectedMember] = useState<string | null>(null);
    const navigation = useNavigation<OverviewNavigationProp>()




    const openMenu = (member: string) => {
        setSelectedMember(member);
        setMenuVisible(true);
    };

    const closeMenu = () => {
        setMenuVisible(false);
        setSelectedMember(null);
    };



    return (
        <PaperProvider
            theme={{
                colors: {
                    primary: "#253E86",
                    background: "#E9ECF3",
                    surface: "#FFFFFF", // menu background
                    onSurface: "#10182A", // text color
                },
            }}
        >
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Pressable
                        aria-label="back-button"
                        // onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={22}
                            color="#10182A"
                        />
                    </Pressable>

                    <Text style={styles.heading}>
                        Team Members
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


                    {/* Team member summary card  */}
                    <View style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#FFFFFF",
                        borderRadius: 10,
                        paddingHorizontal: scaleHorizontalPadding(12),
                        paddingVertical: scaleVerticalPadding(28),
                        flexDirection: "row",
                        gap: 10
                    }} >

                        <View style={{
                            width: "auto",
                            alignItems: "center",
                            gap: 12,
                            flexDirection: "row"
                        }} >
                            <TeamIcon height={25} width={25} />
                            <Text style={styles.members_count} >Total Members : 0</Text>
                        </View>

                        <Pressable
                            onPress={() => navigation.navigate("add_team_members")}
                            style={styles.add_member_button} >

                            <Ionicons
                                name="add-outline"
                                color={"#253E86"}
                                size={14} />

                            <Text style={[styles.button_text, {
                                color: "#253E86",
                                fontFamily: "Sora_400Regular",
                                fontSize: scaleFont(13)
                            }]} > Add Member</Text>

                        </Pressable>

                    </View>



                    <View style={{
                        width: "100%",
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }} >

                        {
                            TeamMembersList.length < 1 ? (
                                <Text style={{
                                    color: "#10182AB2",
                                    fontSize: scaleFont(20),
                                    fontFamily: "Sora_400Regular"
                                }} >No team member yet</Text>
                            )

                                : (
                                    //    The team list
                                    <View style={{
                                        width: "100%",
                                        flex: 1,
                                        alignItems: "flex-start",
                                        gap: 10
                                    }} >


                                        <Text
                                            style={{
                                                color: "#10182AB2",
                                                fontSize: scaleFont(12),
                                                fontFamily: "Sora_400Regular"
                                            }}
                                        >Team Members</Text>


                                        <View style={{
                                            gap: 14,
                                            width: "100%",
                                            alignItems: "flex-start"
                                        }} >


                                            {/* Team card  */}
                                            <View style={styles.team_card} >

                                                <View style={{
                                                    width: "auto",
                                                    alignItems: "flex-start",
                                                    flexDirection: "row",
                                                    gap: 18
                                                }} >


                                                    <ProfilePlaceholder
                                                        height={43}
                                                        width={43}
                                                    />

                                                    <View style={{
                                                        gap: 8
                                                    }}>

                                                        <Text style={styles.team_member_name}>John Doe</Text>


                                                        <View style={{
                                                            gap: 8
                                                        }}  >

                                                            <Text
                                                                style={styles.details}
                                                            >Sales Representative</Text>


                                                            <View style={{
                                                                width: "auto",
                                                                alignItems: "center",
                                                                gap: 4,
                                                                flexDirection: "row"
                                                            }} >
                                                                <Ionicons
                                                                    color={"#10182AB2"}
                                                                    name="call-sharp" />

                                                                <Text style={styles.details} > +234 800 123 4567</Text>
                                                            </View>

                                                            <Text style={[styles.details, {
                                                                fontStyle: "italic"
                                                            }]} >Joined March 1, 2026</Text>
                                                        </View>
                                                    </View>

                                                </View>


                                                <View style={{
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    gap: 12
                                                }} >

                                                    <View style={{
                                                        backgroundColor: "#009A49",
                                                        paddingHorizontal: scaleHorizontalPadding(8),
                                                        paddingVertical: scaleVerticalPadding(4),
                                                        borderRadius: 7
                                                    }} >
                                                        <Text
                                                            style={{
                                                                color: "#ffffff",
                                                                fontSize: scaleFont(12),
                                                                fontFamily: "Sora_400Regular"
                                                            }}
                                                        >Active</Text>

                                                    </View>

                                                    {/* The menu */}
                                                    <Menu
                                                        visible={menuVisible}
                                                        onDismiss={closeMenu}
                                                        contentStyle={{
                                                            backgroundColor: "#FFFFFF",
                                                            borderRadius: 12,
                                                        }}
                                                        anchor={
                                                            <Pressable onPress={() => openMenu("John Doe")}>
                                                                <Ionicons size={28} name="ellipsis-horizontal" />
                                                            </Pressable>
                                                        }
                                                    >
                                                        <Menu.Item
                                                            onPress={() => { }}
                                                            title="Edit"
                                                            leadingIcon={() => (
                                                                <Edit width={18} height={18} color="#10182A" />
                                                            )}
                                                        />

                                                        <Menu.Item
                                                            onPress={() => { }}
                                                            title="Activate"
                                                            leadingIcon={() => (
                                                                <CheckCircle size={18} color="#009A49" />
                                                            )}
                                                        />

                                                        <Menu.Item
                                                            onPress={() => { }}
                                                            title="Remove"
                                                            titleStyle={{ color: "#FF3B30" }}
                                                            leadingIcon={() => (
                                                                <Trash size={18} color="#FF3B30" />
                                                            )}
                                                        />
                                                    </Menu>
                                                </View>

                                            </View>

                                        </View>

                                    </View>
                                )

                        }

                    </View>


                </ScrollView>
            </SafeAreaView>
        </PaperProvider>
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
        fontFamily: "Sora_600SemiBold",
        fontSize: scaleFont(16),
    },

    scrollView: {
        flex: 1,
    },

    scrollViewContent: {
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(5),
        gap: 16,
        flexGrow: 1,
        paddingBottom: scaleVerticalPadding(20)
    },

    add_member_button: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleVerticalPadding(6),
        paddingHorizontal: scaleHorizontalPadding(6),
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#253E86",
        gap: 4,
        flexWrap: "nowrap",
        textAlign: "center",
        height: "auto"
    },

    button_text: {
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(10),
        flexWrap: "nowrap",
        textAlign: "center"
    },

    members_count: {
        color: "#000000",
        fontSize: scaleFont(14),
        fontFamily: "Sora_600SemiBold"
    },

    team_card: {
        width: "100%",
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: scaleHorizontalPadding(12),
        paddingVertical: scaleVerticalPadding(10),
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: 'space-between',
        gap: 14
    },

    team_member_name: {
        color: "#000000",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular"
    },

    details: {
        color: "#10182AB2",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(12)
    }



})