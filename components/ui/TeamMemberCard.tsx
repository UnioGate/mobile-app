import { MainStackParamList } from "@/app/main/type";
import { TeamMember } from "@/types/types";
import {
    scaleFont,
    scaleHorizontalPadding,
    scaleVerticalPadding,
} from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ProfilePlaceholder from "../icons/ProfilePlaceholder";

type OverviewNavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface TeamMemberCardProps {
    data: TeamMember;
    menuVisible: boolean;
    onToggleMenu: () => void;
    closeMenu: () => void;
}

export default function TeamMembersCard({
    data,
    closeMenu,
    menuVisible,
    onToggleMenu
}: TeamMemberCardProps) {


    const navigation = useNavigation<OverviewNavigationProp>();

    return (
        <Pressable
            onPress={(e) => {
                e.stopPropagation()
                closeMenu();
                navigation.navigate("team_member_detail");
            }}
            style={[
                styles.team_card,
                menuVisible && {
                    zIndex: 9999,
                    elevation: 9999,
                },
            ]}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 18,
                }}
            >
                <ProfilePlaceholder height={43} width={43} />

                <View style={{ gap: 8 }}>
                    <Text style={styles.team_member_name}>{data.fullName}</Text>

                    <View style={{ gap: 8 }}>
                        <Text style={styles.details}>{data.role}</Text>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 4,
                            }}
                        >
                            <Ionicons
                                name="call-sharp"
                                color="#10182AB2"
                            />

                            <Text style={styles.details}>{data.phone}</Text>
                        </View>

                        <Text
                            style={[
                                styles.details,
                                {
                                    fontFamily: "PlusJakartaSans_400Regular_Italic",
                                },
                            ]}
                        >
                            Joined {data.joinedAt}
                        </Text>
                    </View>
                </View>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                }}
            >
                <View
                    style={{
                        backgroundColor:
                            data.status === "active" ? "#009A49" : "#F7AA1A",
                        paddingHorizontal: scaleHorizontalPadding(8),
                        paddingVertical: scaleVerticalPadding(4),
                        borderRadius: 7,
                    }}
                >
                    <Text
                        style={{
                            color: "#fff",
                            fontFamily: "Sora_400Regular",
                            fontSize: scaleFont(12),
                        }}
                    >
                        {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                    </Text>
                </View>

                <View style={styles.menu_container}>
                    <Pressable
                        hitSlop={8}
                        onPress={(e) => {
                            e.stopPropagation();
                            onToggleMenu();
                        }}
                        style={styles.menu_button}
                    >
                        <Ionicons
                            name="ellipsis-horizontal"
                            size={28}
                        />
                    </Pressable>

                    {menuVisible && (
                        <View style={styles.menu}>
                            <Pressable
                                style={styles.menu_item}
                                onPress={(e) => {
                                    e.stopPropagation();
                                    closeMenu();
                                    navigation.navigate("team_member_detail");
                                }}
                            >
                                <Ionicons
                                    name="pencil-outline"
                                    size={16}
                                />
                                <Text style={styles.menu_item_text}>Edit</Text>
                            </Pressable>

                            <Pressable
                                style={styles.menu_item}
                                onPress={(e) => {
                                    e.stopPropagation();
                                    closeMenu();
                                }}
                            >
                                <Ionicons
                                    name="checkmark-circle"
                                    size={16}
                                    color="#009A49"
                                />
                                <Text
                                    style={[
                                        styles.menu_item_text,
                                        { color: "#009A49" },
                                    ]}
                                >
                                    Activate
                                </Text>
                            </Pressable>

                            <Pressable
                                style={styles.menu_item}
                                onPress={(e) => {
                                    e.stopPropagation();
                                    closeMenu();
                                }}
                            >
                                <Ionicons
                                    name="trash-outline"
                                    size={16}
                                    color="#D92D20"
                                />
                                <Text
                                    style={[
                                        styles.menu_item_text,
                                        { color: "#D92D20" },
                                    ]}
                                >
                                    Remove
                                </Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    team_card: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: scaleHorizontalPadding(12),
        paddingVertical: scaleVerticalPadding(10),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        overflow: "visible",
        position: "relative",
    },

    team_member_name: {
        color: "#000",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular",
    },

    details: {
        color: "#10182AB2",
        fontSize: scaleFont(12),
        fontFamily: "Sora_400Regular",
    },

    menu_container: {
        position: "relative",
        overflow: "visible",
    },

    menu_button: {
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
    },

    menu: {
        position: "absolute",
        top: 38,
        right: 0,

        width: 170,

        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E5E7EB",

        zIndex: 99999,
        elevation: 99999,

        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 8,
    },

    menu_item: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: scaleHorizontalPadding(12),
        paddingVertical: scaleVerticalPadding(12),
    },

    menu_item_text: {
        fontSize: scaleFont(12),
        fontFamily: "Sora_400Regular",
        color: "#000",
    },
});