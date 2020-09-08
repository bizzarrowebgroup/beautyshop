import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Colors from '../../constants/Colors';
import BaseText from '../StyledText';

export default function FormErrorMessage({ error, visible }) {
    if (!error || !visible) {
        return null;
    }

    // return <BaseText style={styles.errorText} size={9}>{error + " 🤦🏼‍♀️"}</BaseText>;
    return <BaseText style={styles.errorText} size={9}>{error}</BaseText>;
}

const styles = StyleSheet.create({
    errorText: {
        marginLeft: 0,
        marginBottom: 5,
        fontWeight: '600',
        color: Colors.light.arancio
    }
});