import React from 'react'
import { StyleSheet, Switch, View } from 'react-native'
import Colors from '../constants/Colors'


/**
 * CustomSwitch custom component 
 * made by jonathan derwith canevese for BWG | BeaytShop 08/11/2020
 * @param enabled true | false
 * @param trackColor { false: '#767577', true: '#81b0ff' },
 * @param bg "#3e3e3e",
 * @param activeColor '#f5dd4b',
 * @param unactiveColor '#f4f3f4'
 */
const CustomSwitch = ({
  isEnabled,
  toggleSwitch,
  trackColor = { false: Colors.light.grigio, true: Colors.light.ARANCIO },
  bg = Colors.light.grigio,
  style
  //activeColor = Colors.light.bianco,
  //unactiveColor = '#f4f3f4'
}) => {
  //const [isEnabled, setIsEnabled] = useState(enabled);
  //const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={style}>
      <Switch
        trackColor={trackColor}
        //thumbColor={isEnabled ? activeColor : unactiveColor}
        ios_backgroundColor={bg}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  )
}

export default CustomSwitch

const styles = StyleSheet.create({})
