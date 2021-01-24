import * as React from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback, ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
interface BookProps {

}
import * as haptics from '../constants/Vibration';

import * as Animate from 'react-native-animatable';
import StepIndicator from 'react-native-step-indicator';
import AppButton from '../components/AppButton';
import Loader from '../components/Loader';

const tagli = [
  {
    title: 'Taglio donna',
    desc: 'Spigolature, rotondità e proporzioni possono essere riequilibrate con il giusto taglio e una pettinatura adatta.',
    price: '25'
  },
  {
    title: 'Taglio uomo',
    desc: 'Spigolature, rotondità e proporzioni possono essere riequilibrate con il giusto taglio e una pettinatura adatta.',
    price: '14'
  },
  {
    title: 'Taglio completo',
    desc: 'Spigolature, rotondità e proporzioni possono essere riequilibrate con il giusto taglio e una pettinatura adatta.',
    price: '30'
  }
]

const servizi = [
  { label: 'Taglio donna' },
  { label: 'Piega' },
  { label: 'Trattamenti' },
  { label: 'Colore' },
  { label: 'Ondulazione' },
  { label: 'Extension' },
  { label: 'Acconciature' },
  { label: 'Permanente' },
  { label: 'Non lo so' },
];

const Book = ({ route, navigation }) => {
  //console.log(route,"route")
  //console.log(navigation,"navigation")

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      navigate();
    });
  });

  const navigate = () => {
    navigation.navigate("NotFound");
  }
  return (
    <SafeAreaView style={styles.container}>
    </SafeAreaView>
  );
};

export default Book;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.violaDes,
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: "center"
  }
});
