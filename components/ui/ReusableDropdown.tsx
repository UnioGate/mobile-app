import { DropdownOption } from "@/types/types";
import { scaleFont, scaleHorizontalPadding } from "@/utils/utils";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";



interface ReusableDropdownOptionProps {
    label?: string;
    options: DropdownOption[];
    placeholder?: string
}


export default function ReusableDropdown({ label, options, placeholder }: ReusableDropdownOptionProps) {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);



    return (
        <View style={styles.dropdownContainer}  >
            {label && (<Text style={styles.labelText}  >{label}</Text>)}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={options}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? placeholder : "...`"}
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
        gap: 6,
    },

    labelText: {
        color: "#10182A",
        fontSize: scaleFont(14),
        fontFamily: 'Sora_400Regular',
    },

    dropdown: {
        height: 40,
        borderRadius: 5,
        paddingHorizontal: scaleHorizontalPadding(5),
        backgroundColor: "#CCCCCC1A",
        borderWidth: 1,
        borderColor: "#10182A"
    },

    placeholderStyle: {
        fontSize: scaleFont(14),
    },
    selectedTextStyle: {
        fontSize: scaleFont(14),
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: scaleFont(14),
    },

    icon: {
        marginRight: 5,
    },



})