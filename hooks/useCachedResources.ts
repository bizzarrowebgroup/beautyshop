import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

//import {
//  Montserrat_300Light,
//  Montserrat_400Regular,
//  Montserrat_600SemiBold,
//  Montserrat_700Bold,
//} from '@expo-google-fonts/montserrat';
// old 
//import {
//  WorkSans_100Thin,
//  WorkSans_200ExtraLight,
//  WorkSans_300Light,
//  WorkSans_400Regular,
//  WorkSans_500Medium,
//  WorkSans_600SemiBold,
//  WorkSans_700Bold,
//  WorkSans_800ExtraBold,
//  WorkSans_900Black,
//  WorkSans_100Thin_Italic,
//  WorkSans_200ExtraLight_Italic,
//  WorkSans_300Light_Italic,
//  WorkSans_400Regular_Italic,
//  WorkSans_500Medium_Italic,
//  WorkSans_600SemiBold_Italic,
//  WorkSans_700Bold_Italic,
//  WorkSans_800ExtraBold_Italic,
//  WorkSans_900Black_Italic
//} from '@expo-google-fonts/work-sans';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          ...Ionicons.font,
          //Montserrat_300Light,
          //Montserrat_400Regular,
          //Montserrat_600SemiBold,
          //Montserrat_700Bold,
          //WorkSans_100Thin,
          //WorkSans_200ExtraLight,
          //WorkSans_300Light,
          //WorkSans_400Regular,
          //WorkSans_500Medium,
          //WorkSans_600SemiBold,
          //WorkSans_700Bold,
          //WorkSans_800ExtraBold,
          //WorkSans_900Black,
          //WorkSans_100Thin_Italic,
          //WorkSans_200ExtraLight_Italic,
          //WorkSans_300Light_Italic,
          //WorkSans_400Regular_Italic,
          //WorkSans_500Medium_Italic,
          //WorkSans_600SemiBold_Italic,
          //WorkSans_700Bold_Italic,
          //WorkSans_800ExtraBold_Italic,
          //WorkSans_900Black_Italic
          'Gilroy_Black': require('../assets/fonts/Gilroy-Black.ttf'),
          'Gilroy_BlackItalic': require('../assets/fonts/Gilroy-BlackItalic.ttf'),
          'Gilroy_Bold': require('../assets/fonts/Gilroy-Bold.ttf'),
          'Gilroy_BoldItalic': require('../assets/fonts/Gilroy-BoldItalic.ttf'),
          'Gilroy_ExtraBold': require('../assets/fonts/Gilroy-ExtraBold.ttf'),
          'Gilroy_ExtraBoldItalic': require('../assets/fonts/Gilroy-ExtraBoldItalic.ttf'),
          'Gilroy_Heavy': require('../assets/fonts/Gilroy-Heavy.ttf'),
          'Gilroy_HeavyItalic': require('../assets/fonts/Gilroy-HeavyItalic.ttf'),
          'Gilroy_Light': require('../assets/fonts/Gilroy-Light.ttf'),
          'Gilroy_LightItalic': require('../assets/fonts/Gilroy-LightItalic.ttf'),
          'Gilroy_Medium': require('../assets/fonts/Gilroy-Medium.ttf'),
          'Gilroy_MediumItalic': require('../assets/fonts/Gilroy-MediumItalic.ttf'),
          'Gilroy_Regular': require('../assets/fonts/Gilroy-Regular.ttf'),
          'Gilroy_RegularItalic': require('../assets/fonts/Gilroy-RegularItalic.ttf'),
          'Gilroy_SemiBold': require('../assets/fonts/Gilroy-SemiBold.ttf'),
          'Gilroy_SemiBoldItalic': require('../assets/fonts/Gilroy-SemiBoldItalic.ttf'),
          'Gilroy_Thin': require('../assets/fonts/Gilroy-Thin.ttf'),
          'Gilroy_ThinItalic': require('../assets/fonts/Gilroy-ThinItalic.ttf'),
          'Gilroy_UltraLight': require('../assets/fonts/Gilroy-UltraLight.ttf'),
          'Gilroy_UltraLightItalic': require('../assets/fonts/Gilroy-UltraLightItalic.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
