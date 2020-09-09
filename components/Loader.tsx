import React from 'react'
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  View,
  ActivityIndicator,
  Animated,
  Easing
} from 'react-native'

type LoaderProps = {
  color?: string;
  size: "large" | "small";
  style?: StyleProp<ViewStyle>;
  animating?: boolean;
}

const Loader = ({ color, size, style, animating }: LoaderProps) => {

  //const [spinValue, setspinValue] = React.useState();
  const spinValue = React.useMemo(() => new Animated.Value(0), []);

  Animated.loop(
    Animated.timing(
      spinValue,
      {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true
      }
    )
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.containter}>
      <Animated.Image
        source={require('../assets/images/logoBS.png')}
        style={[{ transform: [{ rotate: spin }] }, styles.image]}
      />
      <ActivityIndicator
        animating={animating}
        color={color}
        size={size}
        style={[style, { marginTop: 40 }]}
      />
    </View>
  )
}

export default Loader;

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    alignItems: "center",
    //alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#F4C36C"
  },
  image: {
    width: 50,
    height: 50,
    paddingBottom: 40
  }
});
