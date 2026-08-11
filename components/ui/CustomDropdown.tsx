import statesData from "@/data/states.json";
import { DropdownOption, State } from "@/types/types";
import { scaleFont, scaleHorizontalPadding } from "@/utils/utils";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";



interface DropdownOptionProps {
    label?: string;
    dropdownStyle?: ViewStyle;
    labelStyle?: TextStyle;
    currentCountry?: string;
    options?: DropdownOption[]
    value?: string;
    onChange?: (value: string) => void;
    placeholderText?: string
}



const STATE_OPTIONS_SOURCE = statesData as State[];


export default function CustomDropdown({
    label,
    dropdownStyle,
    labelStyle,
    currentCountry,
    options,
    value,
    onChange,
    placeholderText = 'Select State'
}: DropdownOptionProps) {


    const [isFocus, setIsFocus] = useState(false);
    const stateOptions = useMemo<DropdownOption[]>(
        () =>
            STATE_OPTIONS_SOURCE
                .filter((state) => state.country_name === currentCountry)
                .map((state) => ({
                    label: state.name,
                    value: state.name,
                })),
        [currentCountry]
    );





    return (
        <View style={styles.dropdownContainer}  >
            {label && (<Text style={[styles.labelText, labelStyle]}  >{label}</Text>)}
            <Dropdown
                style={[styles.dropdown, dropdownStyle, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={options || stateOptions}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? placeholderText : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                    onChange?.(item.value);
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
        gap: 6,
    },

    labelText: {
        color: "#10182A",
        fontSize: scaleFont(14),
        fontFamily: 'Sora_400Regular',
    },

    dropdown: {
        height: 50,
        borderRadius: 5,
        paddingHorizontal: scaleHorizontalPadding(12),
        backgroundColor: "#CCCCCC1A",
        borderWidth: 1,
        borderColor: "#10182A"
    },

    placeholderStyle: {
        fontSize: scaleFont(16),
    },
    selectedTextStyle: {
        fontSize: scaleFont(16),
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: scaleFont(16),
    },

    icon: {
        marginRight: 5,
    },



})