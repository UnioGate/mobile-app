import FilterIcon from "@/components/icons/FilterIcon";
import TransactionsComponent from "@/components/TransactionsComponent";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import { MainStackParamList } from "../type";



type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function Transactions() {
    const navigation = useNavigation<NavigationProp>();


    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>

                <Pressable
                    aria-label="back-button"
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="chevron-back"
                        size={22}
                        color="#10182A"
                    />
                </Pressable>

                <Text style={styles.heading}>
                    Transactions
                </Text>





                <View style={styles.utilities} >

                    <Pressable>
                        <Ionicons
                            name="search"
                            color={"#1E1E1E"}
                            size={22} />
                    </Pressable>


                    <Pressable>
                        <FilterIcon color={"#1E1E1E"} />
                    </Pressable>

                </View>
            </View>





            {/* Scrollable Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent]}
            >

                <TransactionsComponent />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#E9ECF3",
        paddingHorizontal: scaleHorizontalPadding(13),
        paddingTop: scaleVerticalPadding(20),
    },

    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    heading: {
        color: "#10182A",
        fontFamily: "PlusJakartaSans_600SemiBold",
        fontSize: scaleFont(22),
    },

    utilities: {
        width: "auto",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        flexDirection: "row"
    },

    scrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
        gap: 18,
    },






});