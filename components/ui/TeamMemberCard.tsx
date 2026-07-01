import { MainStackParamList } from "@/app/main/type";
import { TeamMember } from "@/types/types";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ProfilePlaceholder from "../icons/ProfilePlaceholder";

type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface TeamMemberCardProps {
    data: TeamMember
}


export default function TeamMembersCard({ data }: TeamMemberCardProps) {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation<OverviewNavigationProp>()



    const toggleMenu = () => {
        setMenuVisible((visible) => !visible);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };



    return (
        <Pressable
            onPress={() => {
                closeMenu();
                navigation.navigate("team_member_detail");
            }}
            style={styles.team_card} >

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

                    <Text style={styles.team_member_name}> {data.fullName} </Text>


                    <View style={{
                        gap: 8
                    }}  >

                        <Text
                            style={styles.details}
                        > {data.role} </Text>


                        <View style={{
                            width: "auto",
                            alignItems: "center",
                            gap: 4,
                            flexDirection: "row"
                        }} >
                            <Ionicons
                                color={"#10182AB2"}
                                name="call-sharp" />

                            <Text style={styles.details} >{data.phone} </Text>
                        </View>

                        <Text style={[styles.details, {
                            fontFamily: "PlusJakartaSans_400Regular_Italic"
                        }]} >Joined {data.joinedAt} </Text>
                    </View>
                </View>

            </View>


            <View style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12
            }} >

                <View style={{
                    backgroundColor: data.status === "active" ? "#009A49" : "#F7AA1A",
                    borderColor: data.status === "active" ? "#009A49" : "#F7AA1A",
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
                    > {data.status.charAt(0).toUpperCase() + data.status.slice(1)}</Text>

                </View>

                {/* The menu */}
                <View style={styles.menu_container}>

                    <Pressable
                        accessibilityLabel="Open team member actions"
                        accessibilityRole="button"
                        hitSlop={8}
                        onPress={(e) => {
                            e.stopPropagation();
                            toggleMenu();
                        }}
                        style={styles.menu_button}
                    >
                        <Ionicons size={28} name="ellipsis-horizontal" />
                    </Pressable>

                    {menuVisible && (
                        <View style={styles.menu}>
                            <Pressable
                                onPress={(e) => {
                                    e.stopPropagation();
                                    closeMenu();
                                    navigation.navigate("team_member_detail");
                                }}
                                style={styles.menu_item}
                            >
                                <Ionicons color="#10182A" name="person-outline" size={16} />
                                <Text style={styles.menu_item_text}>View profile</Text>
                            </Pressable>

                            <Pressable
                                onPress={(e) => {
                                    e.stopPropagation();
                                    closeMenu();
                                }}
                                style={styles.menu_item}
                            >
                                <Ionicons color="#10182A" name="create-outline" size={16} />
                                <Text style={styles.menu_item_text}>Edit member</Text>
                            </Pressable>

                            <Pressable
                                onPress={(e) => {
                                    e.stopPropagation();
                                    closeMenu();
                                }}
                                style={styles.menu_item}
                            >
                                <Ionicons color="#D92D20" name="trash-outline" size={16} />
                                <Text style={[styles.menu_item_text, styles.destructive_menu_item_text]}>Remove</Text>
                            </Pressable>
                        </View>
                    )}

                </View>
            </View>

        </Pressable >
    )
}


const styles = StyleSheet.create({

    team_card: {
        width: "100%",
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: scaleHorizontalPadding(12),
        paddingVertical: scaleVerticalPadding(10),
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: 'space-between',
        gap: 14,
        overflow: "visible",
        position: "relative",
        zIndex: 1
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
    },

    menu_container: {
        position: "relative",
        zIndex: 10
    },

    menu_button: {
        alignItems: "center",
        justifyContent: "center"
    },

    menu: {
        backgroundColor: "#FFFFFF",
        borderColor: "#E5E7EB",
        borderRadius: 10,
        borderWidth: 1,
        elevation: 4,
        minWidth: 150,
        paddingVertical: scaleVerticalPadding(6),
        position: "absolute",
        right: 0,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        top: 34,
        zIndex: 20
    },

    menu_item: {
        alignItems: "center",
        flexDirection: "row",
        gap: 8,
        paddingHorizontal: scaleHorizontalPadding(12),
        paddingVertical: scaleVerticalPadding(10)
    },

    menu_item_text: {
        color: "#10182A",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(12)
    },

    destructive_menu_item_text: {
        color: "#D92D20"
    }

})
