import * as React from 'react';
import {
    Image,
    Text,
    TextInput,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableWithoutFeedback, ScrollView
} from 'react-native';
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

const Book = (props: BookProps) => {
    React.useEffect(() => {
        props.navigation.addListener('focus', () => {
            navigate();
        });
    });

    const navigate = () => {
        props.navigation.navigate("NotFound");
        // props.navigation.state.params.refresh(); //NotFound
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={{
                flex: 1,
                justifyContent: "center",
            }}>
                <Image
                    source={require('../assets/images/logoBS.png')}
                    style={styles.image}
                />
                <AppButton
                    onPress={navigate}
                    color={Colors.light.arancioDes}
                    title="Prenota ora la tua esperienza"
                    style={{ marginVertical: 20, marginHorizontal: 20, }} />
            </View> */}
        </SafeAreaView >
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
