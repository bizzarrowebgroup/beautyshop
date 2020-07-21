import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Header from '../components/Header';
import Colors from '../constants/Colors';

interface PreferitiProps { }

const Preferiti = (props: PreferitiProps) => {
    return (
        <View style={styles.container}>
            <Header hasBack={false} title="Preferiti"/>
        </View>
    );
};
export default Preferiti;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.bg
    }
});
