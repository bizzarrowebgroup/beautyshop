import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import Colors from '../constants/Colors';
import * as Updates from 'expo-updates';

const SplashScreen = ({ navigation, route }) => {
    useEffect(() => {
        setupUpdates()
    }, []);
    const setupUpdates = async () => {
        Updates.addListener(({ type }) => {
            if (type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
                Alert.alert(
                    'È disponibile una nuova versione',
                    `Per un'esperienza migliore, è necessario riavviare l'app`,
                    [
                        {
                            text: 'Ok', onPress: async () => {
                                await Updates.fetchUpdateAsync();
                                await Updates.reloadAsync();
                            }
                        }
                    ]
                )
            }
        })
    }
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <LottieView
                resizeMode="contain"
                source={require('../assets/animations/intro.json')}
                autoPlay
                loop={false}
                // duration={3000}
                onAnimationFinish={() => navigation.navigate('Homepage')}
                enableMergePathsAndroidForKitKatAndAbove
                style={{ backgroundColor: "white" }}
            />
        </View>
    );
}

export default SplashScreen;