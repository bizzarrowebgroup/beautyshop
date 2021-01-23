import React, { useRef, useCallback } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import Colors from '../constants/Colors';

const SplashScreen = ({ navigation, route }) => {

    return (
        <View style={{ flex: 1, backgroundColor: Colors.light.ARANCIO }}>
            <LottieView
                resizeMode='cover'
                source={require('../assets/animations/intro.json')}
                autoPlay
                loop={false}
                duration={3000}
                onAnimationFinish={() => navigation.navigate('Homepage')}
                enableMergePathsAndroidForKitKatAndAbove
            />
        </View>
    );
}

export default SplashScreen;