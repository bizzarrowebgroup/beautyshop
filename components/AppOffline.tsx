import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useNetInfo } from '@react-native-community/netinfo';
import BaseText from './StyledText';
import Colors from '../constants/Colors';

function AppOfflineNotice(props) {
    const netInfo = useNetInfo();

    if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === false)
        return (
            <View style={styles.container}>
                <BaseText>Nessuna connessione a internet</BaseText>
            </View>
        );
    return null;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.ARANCIO,
        height: 80,
        width: '100%',
        paddingTop: Constants.statusBarHeight,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
    },
})

export default AppOfflineNotice;