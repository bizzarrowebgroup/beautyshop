import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';


export default function AppTextInput({
    leftIcon,
    width = '100%',
    rightIcon,
    handlePasswordVisibility,
    ...otherProps
}) {
    return (
        <View style={[styles.container, { width }]}>
            {leftIcon && (
                <MaterialCommunityIcons
                    name={leftIcon}
                    size={20}
                    color={Colors.light.violaDes}
                    style={styles.icon}
                />
            )}
            <TextInput
                style={[styles.input, { maxWidth: rightIcon ? 220 : 240, }]}
                placeholderTextColor={Colors.light.violaDes}
                {...otherProps}
            />
            {rightIcon && (
                <TouchableOpacity onPress={handlePasswordVisibility} style={styles.rightIconStyles}>
                    <MaterialCommunityIcons
                        name={rightIcon}
                        size={20}
                        color={Colors.light.violaDes}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.bianco,
        borderRadius: 5,
        flexDirection: 'row',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1.5,
        borderColor: "#DE9182",
    },
    icon: {
        marginRight: 10
    },
    input: {
        width: '100%',
        fontSize: 18,
        color: Colors.light.nero
    },
    rightIconStyles: {
        position: 'absolute',
        right: 10,
        alignSelf: 'center'
    }
});