import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  //Image,
  //Text,
  PixelRatio,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

import BaseText from '../components/StyledText';
// SVG
import Desk from '../components/svg/Desk';
import Intro2 from '../components/svg/Intro2';
import Intro3 from '../components/svg/Intro3';
import Intro4 from '../components/svg/Intro4';
import Colors from '../constants/Colors';

export default function IntroScreen({ navigation }) {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const { width, height } = Dimensions.get('window');

  const setSliderPage = (event: any) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };
  const scrollerPage = React.useRef();
  const onBtnPress = () => {
    //console.log("--pageIndex--", pageIndex)
    let pagination = (pageIndex > 0 ? pageIndex + 1 : 1) * width;
    //console.log("--pagination--", pagination)
    if (scrollerPage) scrollerPage.current.scrollTo({ x: pagination, y: 0, animated: true })
    if (pageIndex === 3) navigation.navigate("Homepage")
  }
  const { currentPage: pageIndex } = sliderState;
  //console.log("PAVI SIZES", {
  //  height,
  //  width
  //})
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.bianco }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={{ flex: 1 }}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={(event: any) => {
          setSliderPage(event);
        }}
        ref={scrollerPage}
      >
        <View style={{ width, height }}>
          <Desk height={320} style={[styles.imageStyle, {
            maxHeight: width < 400 ? PixelRatio.getPixelSizeForLayoutSize(140) : PixelRatio.getPixelSizeForLayoutSize(320),
          }]} />
          <View style={styles.wrapper}>
            <BaseText weight={600} styles={styles.header}>{"Benvenuto in BeautyShop"}</BaseText>
            <BaseText weight={300} styles={styles.paragraph}>{"Trova facilmente il tuo salone e scopri subito prezzi e disponibilità. Prenotare non è mai stato così semplice."}</BaseText>
          </View>
        </View>
        <View style={{ width, height }}>
          <Intro2 height={320} style={[styles.imageStyle, {
            maxHeight: width < 400 ? PixelRatio.getPixelSizeForLayoutSize(140) : PixelRatio.getPixelSizeForLayoutSize(320),
          }]} />
          <View style={styles.wrapper}>
            <BaseText weight={600} styles={styles.header}>{"Il tuo salone di bellezza di fiducia"}</BaseText>
            <BaseText weight={300} styles={styles.paragraph}>{"Attiva la localizzazione e troverai subito i saloni ed i centri estetici più vicini a te."}</BaseText>
          </View>
        </View>
        <View style={{ width, height }}>
          <Intro3 height={320} style={[styles.imageStyle, {
            maxHeight: width < 400 ? PixelRatio.getPixelSizeForLayoutSize(140) : PixelRatio.getPixelSizeForLayoutSize(320),
          }]} />
          <View style={styles.wrapper}>
            <BaseText weight={600} styles={styles.header}>{"Nella tua tasca, sempre"}</BaseText>
            <BaseText weight={300} styles={styles.paragraph}>{"Beautyshop non solo ti ricorderà sempre quand’è il tuo appuntamento, ma ti farà sapere se ci sono ritardi."}</BaseText>
          </View>
        </View>
        <View style={{ width, height }}>
          <Intro4 height={320} style={[styles.imageStyle, {
            maxHeight: width < 400 ? PixelRatio.getPixelSizeForLayoutSize(140) : PixelRatio.getPixelSizeForLayoutSize(320),
          }]} />
          <View style={styles.wrapper}>
            <BaseText weight={600} styles={styles.header}>{"E se ti dimenticassi?"}</BaseText>
            <BaseText weight={300} styles={styles.paragraph}>{"Attivando le notifiche riceverai prima dell’appuntamento il promemoria della prenotazione, così da non dimenticarti mai più."}</BaseText>
          </View>
        </View>
      </ScrollView>
      <View style={styles.paginationWrapper}>
        {Array.from(Array(4).keys()).map((key, index) => (
          <View style={[
            styles.paginationDots, {
              opacity: pageIndex === index ? 1 : 0.2,
              height: pageIndex === index ? 10 : 7,
              width: pageIndex === index ? 10 : 7,
              borderRadius: pageIndex === index ? 10 / 2 : 7 / 2,
              backgroundColor: pageIndex === index ? Colors.light.ARANCIO : "#C4C4C4"
            }]}
            key={index}
          />
        ))}
      </View>
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={onBtnPress}
        style={[styles.paginationButton, {
          backgroundColor: Colors.light.ARANCIO
        }]}
      >
        <BaseText color={Colors.light.bianco} weight={700} letterSpacing={0.77} size={13}>{pageIndex === 3 ? "Inizia" : "Avanti"}</BaseText>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  imageStyle: {
    //maxWidth: '80%',
    //alignSelf: "center",
    //flex: 1
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    //marginVertical: 30,
  },
  header: {
    fontSize: 35,
    marginBottom: 20,
    marginHorizontal: 50,
    textAlign: "center"
  },
  paragraph: {
    fontSize: 15,
    marginHorizontal: 90,
    marginBottom: 40,
    textAlign: "center"
  },
  paginationWrapper: {
    marginBottom: 20,
    //position: 'absolute',
    //bottom: 200,
    //left: 0,
    //right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    marginLeft: 10,
  },
  paginationButton: {
    height: 70,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 30,
    //flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
})
