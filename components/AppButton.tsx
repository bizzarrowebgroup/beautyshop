import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import BaseText from './StyledText';


export default function AppButton({ style, title, onPress, color = Colors.light.grigio }) {
    return (
        <TouchableOpacity
            style={[styles.button, style, { backgroundColor: color }]}
            onPress={onPress}>
            <BaseText color={Colors.light.nero} size={15} weight={400} styles={styles.buttonText} textAlign="center">{title}</BaseText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
    },
    buttonText: {
        textTransform: 'uppercase'
    }
});