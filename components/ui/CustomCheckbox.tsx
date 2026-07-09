import { scaleFont } from '@/utils/utils';
import { Ionicons } from '@expo/vector-icons';
import React, { ReactNode, SetStateAction } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface CustomCheckboxProps {
    label: ReactNode,
    linkText: string,
    path: string,
    subtext?: string;
    checked: boolean;
    setChecked: React.Dispatch<SetStateAction<boolean>>
}

export default function CustomCheckbox({
    label,
    linkText,
    path,
    subtext,
    checked, setChecked
}: CustomCheckboxProps) {

    return (
        <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setChecked(!checked)}>
                <Ionicons
                    name={checked ? 'checkbox-outline' : 'square-outline'}
                    size={24}
                    color="#1D1B20"
                />
            </TouchableOpacity>


            <View style={{
                gap: 4
            }} >
                <Text style={styles.checkboxLabel}>
                    {label} {" "}
                    <Text
                        onPress={() => Linking.openURL(path)}
                        style={styles.checkboxLink}>
                        {linkText}</Text>
                </Text>

                <Text style={styles.subtext} >{subtext}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: "flex-start",
        width: "100%",
        display: "flex",
        gap: 11
    },

    checkboxLabel: {
        fontSize: 15,
        fontFamily: 'Sora_400Regular',
        color: "#10182A"
    },

    checkboxLink: {
        textDecorationLine: 'underline'
    },

    subtext: {
        color: "#10182AB2",
        fontSize: scaleFont(12),
        fontFamily: "Sora_400Regular"
    }
});