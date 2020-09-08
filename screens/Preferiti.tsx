import React, { useContext, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

// CONTEXT
import { AppContext } from '../context/Appcontext';
import { AuthUserContext } from '../navigation/AuthUserProvider';
// COMPONENTS
import Header from '../components/Header';
import Colors from '../constants/Colors';
import BaseText from '../components/StyledText';
import NoFavorites from '../components/svg/NoFavorites';

// import * as firebase from "firebase";
// import "firebase/database";

interface PreferitiProps { }

const Preferiti = (props: PreferitiProps) => {
    const { showToast } = useContext(AppContext);
    const { user, setUser } = React.useContext(AuthUserContext);

    // React.useEffect(() => {
    //     showToast("we have got", "success dio cane", "success", "bottom")
    // })
    // React.useEffect(() => {
    //     // firebase.database()
    //     //     .ref('/users/123')
    //     //     .set({
    //     //         name: 'Ada Lovelace',
    //     //         age: 31,
    //     //     })
    //     //     .then(() => console.log('Data set.'));
    // }, []);
    return (
        <View style={styles.container}>
            <Header hasBack={false} title="Preferiti" />
            {
                user && (
                    <ScrollView style={{
                        marginVertical: 20,
                        marginHorizontal: 20,
                        flex: 1,
                    }}>
                        <BaseText weight={100}>Lorem ipsum dolrem oltre, TO MARE XE UN OMO! 14141419</BaseText>
                    </ScrollView>
                )
            }
            {
                !user && (
                    <View style={{
                        marginVertical: 20,
                        marginHorizontal: 20,
                        flex: 1,
                    }}>
                        <View style={{
                            marginTop: 80,

                        }}>
                            <BaseText textAlign="center" weight={400} size={15}>{"Non ci sono tuoi preferiti qui 😞.\nPotrai trovare tutti i tuoi preferiti.\n\nPer aggiungere un nuovo preferito premi il (♥︎) del menu."}</BaseText>
                        </View>
                        <NoFavorites style={{ position:"absolute", bottom: 0 }} />
                    </View>
                )
            }
        </View>
    );
};
export default Preferiti;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.bg
    }
});
