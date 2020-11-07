import React from 'react'
import { AppState, Platform, View } from 'react-native'
import Colors from '../constants/Colors';
import BaseText from './StyledText';

const SecurityScreen = () => {
  return (
    <View style={{
      flex: 1,
      backgroundColor: Colors.light.ARANCIO,
      alignItems: "center",
      justifyContent: "center"
    }}>
      <BaseText
        weight={700}
        size={30}
        color={Colors.light.bianco}
      >
        {"BeautyShop"}
      </BaseText>
    </View>
  );
}

const showSecurityScreenFromAppState = appState =>
  ['background', 'inactive'].includes(appState)

const withSecurityScreenIOS = Wrapped => {
  return class WithSecurityScreen extends React.Component {
    state = {
      showSecurityScreen: showSecurityScreenFromAppState(AppState.currentState)
    }

    componentDidMount() {
      AppState.addEventListener('change', this.onChangeAppState)
    }

    componentWillUnmount() {
      AppState.removeEventListener('change', this.onChangeAppState)
    }

    onChangeAppState = nextAppState => {
      const showSecurityScreen = showSecurityScreenFromAppState(nextAppState)

      this.setState({ showSecurityScreen })
    }

    render() {
      return this.state.showSecurityScreen
        ? <SecurityScreen />
        : <Wrapped {...this.props} />
    }
  }
}

const withSecurityScreenAndroid = Wrapped => Wrapped

export const withSecurityScreen = Platform.OS === 'ios'
  ? withSecurityScreenIOS
  : withSecurityScreenAndroid