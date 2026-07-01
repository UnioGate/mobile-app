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



    const openMenu = () => {
        setMenuVisible(true);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };



    return (
        <Pressable
            onPress={() => navigation.navigate("team_member_detail")}
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
                <View>

                    <Pressable onPress={(e) => {
                        e.stopPropagation()
                        openMenu()
                    }}
                    >
                        <Ionicons size={28} name="ellipsis-horizontal" />
                    </Pressable>


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