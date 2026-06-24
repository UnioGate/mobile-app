import { commonCurrencies } from "@/data/common_currencies";
import { scaleFont, scaleHorizontalPadding, scaleVerticalPadding } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { MainStackParamList } from "../type";

const INITIAL_VISIBLE_CURRENCIES = 5;

type DisplayCurrencyNavigationProp = NativeStackNavigationProp<MainStackParamList, "display_currency_screen">;

type DisplayCurrencyScreenProps = {
    navigation: DisplayCurrencyNavigationProp;
};

const currencyFlags = {
    GHC: require("../../../assets/countries_flag_images/GHC.png"),
    GBP: require("../../../assets/countries_flag_images/GBP.png"),
    NGN: require("../../../assets/countries_flag_images/NGN.png"),
    USD: require("../../../assets/countries_flag_images/USD.png"),
    ZAR: require("../../../assets/countries_flag_images/ZAR.png"),
    ZES: require("../../../assets/countries_flag_images/ZES.png"),
};

export default function DisplayCurrencyScreen({ navigation }: DisplayCurrencyScreenProps) {
    const [selectedCurrency, setSelectedCurrency] = useState(commonCurrencies[0]?.abbreviation ?? "");
    const [searchQuery, setSearchQuery] = useState("");
    const [showAllCurrencies, setShowAllCurrencies] = useState(false);

    const filteredCurrencies = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        if (!normalizedQuery) {
            return commonCurrencies;
        }

        return commonCurrencies.filter((currency) => (
            currency.title.toLowerCase().includes(normalizedQuery)
            || currency.abbreviation.toLowerCase().includes(normalizedQuery)
        ));
    }, [searchQuery]);

    const visibleCurrencies = showAllCurrencies || searchQuery.trim()
        ? filteredCurrencies
        : filteredCurrencies.slice(0, INITIAL_VISIBLE_CURRENCIES);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    accessibilityLabel="Back button"
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons
                        name="chevron-back"
                        size={22}
                        color="#10182A"
                    />
                </Pressable>

                <Text style={styles.heading}>Display Currency</Text>

                <View style={styles.headerSpacer} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.screenDescription}>
                    Choose your primary currency for displaying prices
                </Text>

                <View style={styles.inputWrapper}>
                    <Ionicons
                        name="search"
                        color="#10182AB2"
                        size={14}
                    />

                    <TextInput
                        placeholder="Search Currencies"
                        placeholderTextColor="#10182A66"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        style={styles.searchInput}
                    />
                </View>

                <View style={styles.currencySection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Common Currencies</Text>

                        {!searchQuery.trim() && filteredCurrencies.length > INITIAL_VISIBLE_CURRENCIES ? (
                            <Pressable
                                accessibilityRole="button"
                                onPress={() => setShowAllCurrencies((currentValue) => !currentValue)}
                                style={styles.viewAllButton}
                            >
                                <Text style={styles.viewAllButtonText}>
                                    {showAllCurrencies ? "Show Less" : "See All"}
                                </Text>
                                <Ionicons
                                    name={showAllCurrencies ? "chevron-up" : "chevron-forward"}
                                    color="#253E86"
                                    size={15}
                                />
                            </Pressable>
                        ) : null}
                    </View>

                    <View style={styles.listWrapper}>
                        {visibleCurrencies.length ? visibleCurrencies.map((currency, index) => (
                            <Pressable
                                key={currency.abbreviation}
                                accessibilityRole="radio"
                                accessibilityState={{ checked: selectedCurrency === currency.abbreviation }}
                                onPress={() => setSelectedCurrency(currency.abbreviation)}
                                style={[
                                    styles.currencyRow,
                                    index === visibleCurrencies.length - 1 && styles.lastCurrencyRow,
                                ]}
                            >
                                <View style={styles.currencyInfo}>
                                    <RadioButton.Android
                                        value={currency.abbreviation}
                                        status={selectedCurrency === currency.abbreviation ? "checked" : "unchecked"}
                                        onPress={() => setSelectedCurrency(currency.abbreviation)}
                                        color="#253E86"
                                    />

                                    <Image
                                        source={currencyFlags[currency.image]}
                                        style={styles.currencyFlag}
                                    />

                                    <Text style={styles.currencyTitle}>{currency.title}</Text>
                                </View>

                                <View style={styles.currencyMeta}>
                                    <Text style={styles.currencyAbbreviation}>{currency.abbreviation}</Text>
                                    <Text style={styles.currencySign}>{currency.sign}</Text>
                                </View>
                            </Pressable>
                        )) : (
                            <Text style={styles.emptyState}>No currencies match your search.</Text>
                        )}
                    </View>
                </View>

                <Text style={styles.disclaimer}>
                    Crypto and fiat payments will still be accepted. This only changes display.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E9ECF3",
    },
    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(10),
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
        fontSize: scaleFont(21),
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        paddingHorizontal: scaleHorizontalPadding(19),
        paddingVertical: scaleVerticalPadding(5),
        gap: 16,
        flexGrow: 1,
        paddingBottom: scaleVerticalPadding(20),
    },
    screenDescription: {
        fontSize: scaleFont(12),
        color: "#10182AB2",
        fontFamily: "Sora_400Regular",
        textAlign: "center",
        width: "100%",
    },
    inputWrapper: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 7,
        padding: 4,
        paddingHorizontal: scaleHorizontalPadding(20),
        flexDirection: "row",
        gap: 6,
        alignItems: "center",
    },
    searchInput: {
        flex: 1,
        fontSize: scaleFont(12),
        color: "#10182A",
        fontFamily: "Sora_400Regular",
    },
    currencySection: {
        gap: 15,
    },
    sectionHeader: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    sectionTitle: {
        color: "#10182AB2",
        fontSize: scaleFont(13),
        fontFamily: "Sora_400Regular",
    },
    viewAllButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    viewAllButtonText: {
        color: "#10182AB2",
        fontFamily: "Sora_400Regular",
        fontSize: scaleFont(12),
    },
    listWrapper: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
    },
    currencyRow: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: scaleVerticalPadding(8),
        paddingHorizontal: scaleHorizontalPadding(9),
        borderBottomWidth: 0.5,
        borderBottomColor: "#808080",
    },
    lastCurrencyRow: {
        borderBottomWidth: 0,
    },
    currencyInfo: {
        flex: 1,
        gap: 10,
        alignItems: "center",
        flexDirection: "row",
    },
    currencyFlag: {
        width: 31,
        height: 21,
    },
    currencyTitle: {
        flex: 1,
        color: "#000000",
        fontSize: scaleFont(14),
        fontFamily: "Sora_400Regular",
    },
    currencyMeta: {
        gap: 8,
        alignItems: "center",
        flexDirection: "row",
    },
    currencyAbbreviation: {
        color: "#10182A99",
        fontSize: scaleFont(12),
        fontFamily: "Sora_400Regular",
    },
    currencySign: {
        fontSize: scaleFont(13),
        color: "#10182A99",
        fontFamily: "Sora_600SemiBold",
    },
    emptyState: {
        color: "#10182A99",
        fontSize: scaleFont(12),
        fontFamily: "Sora_400Regular",
        padding: scaleVerticalPadding(16),
        textAlign: "center",
    },
    disclaimer: {
        color: "#10182AB2",
        fontSize: scaleFont(12),
        fontFamily: "Sora_400Regular",
        textAlign: "center",
    },
    button: {
        width: "100%",
        backgroundColor: "#253E86",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleVerticalPadding(16),
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: scaleFont(18),
        fontFamily: "Sora_400Regular",
    },
});
