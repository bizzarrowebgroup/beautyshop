import { Dimensions } from 'react-native';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function wp(percentage) {
  const value = (percentage * width) / 100;
  return Math.round(value);
}

export default {
  window: {
    width,
    height,
  },
  wp,
  isSmallDevice: width < 375,
};
