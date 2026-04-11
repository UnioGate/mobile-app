import { DropdownOption } from "@/types/types";
import statesData from "@/data/states.json";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";






export default function CustomDropdown() {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const currentCountry = "NG";
    const stateOptions = useMemo<DropdownOption[]>(
        () =>
            statesData
                .filter((state) => state.country_code === currentCountry)
                .map((state) => ({
                    label: state.name,
                    value: state.name,
                })),
        [currentCountry]
    );





    return (
        <View style={styles.dropdownContainer}  >
            <Text style={styles.labelText}  >State</Text>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={stateOptions}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select State' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                }}
            />

        </View>

    )
}



const styles = StyleSheet.create({
    dropdownContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 4,
    },

    labelText: {
        color: "#10182A",
        fontSize: 13,
        fontFamily: 'Sora_400Regular',
    },

    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },

    dropdown: {
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: "#CCCCCC1A",
        borderWidth: 1,
        borderColor: "#10182A"
    },

    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

    icon: {
        marginRight: 5,
    },



})
