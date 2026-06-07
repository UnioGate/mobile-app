import { scaleFont, scaleHorizontalPadding } from '@/utils/utils';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

interface CustomInputProps extends TextInputProps {
    leftElement?: React.ReactNode;
    containerStyle?: ViewStyle;
    label?: string;
    error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
    leftElement,
    label,
    containerStyle,
    error,
    style,
    ...textInputProps
}) => {
    return (
        <View style={styles.inputWrapper} >
            <Text style={styles.label} >{label && label}</Text>
            <View style={[
                styles.container,
                containerStyle,
                error ? styles.errorBorder : null
            ]}>

                {leftElement && <View style={styles.left}>{leftElement}</View>}
                <TextInput
                    style={[styles.input, style]}
                    {...textInputProps}
                />
            </View>
            {error ? <Text style={styles.errorText}>      <Ionicons name="alert-circle" size={14} color="red" /> {error}</Text> : null}
        </View>
    );
};

export default CustomInput;

const styles = StyleSheet.create({

    inputWrapper: {
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: 6
    },

    label: {
        fontSize: scaleFont(14),
        color: "#10182A",
        fontFamily: 'Sora_400Regular',
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#10182A',
        borderRadius: 5,
        paddingHorizontal: scaleHorizontalPadding(12),
        height: 50,
        width: '100%',
        backgroundColor: "#CCCCCC1A"
    },
    left: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: scaleFont(18),
        fontFamily: 'Sora_400Regular',
    },

    errorText: {
        color: 'red',
        fontSize: scaleFont(12),
        marginTop: 4,
        fontFamily: 'Sora_400Regular',
    },
    errorBorder: {
        borderColor: 'red',
    },
});