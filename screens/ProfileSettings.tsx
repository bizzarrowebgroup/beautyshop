import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import Header from '../components/Header'
import BaseText from '../components/StyledText'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import { AppContext } from '../context/Appcontext'

const ProfileSettings = ({ navigation }) => {
  const {
    currentUser,
    showToast
  } = useContext(AppContext);
  useEffect(() => {
    // console.log("--currentUser", currentUser)
    if (currentUser == undefined || currentUser.length <= 0) {
      showToast(
        "ERRORE GENERICO",
        "Non riesco a recuperare le tue informazioni",
        "error",
        "bottom",
        4000
      );
      navigation.goBack();
    }
  }, [currentUser])
  if (currentUser == undefined || currentUser.length <= 0) return <View></View>;
  const { cookie, notificationsEnabled, privacy, newsletter } = currentUser;

  const [isNotificationsEnabled, setNotificationEnabled] = React.useState(notificationsEnabled);
  const [isNewslettersEnabled, setNewsletterEnabled] = React.useState(newsletter);
  const [isCookiesEnabled, setCookieEnabled] = React.useState(cookie);
  const [isPrivacysEnabled, setPrivacyEnabled] = React.useState(privacy);
  const toggleNotifications = () => {
    //alert("ti_succhio_il_pene")
    setNotificationEnabled(!isNotificationsEnabled)
  }
  const toggleNewsletter = () => {
    setNewsletterEnabled(!isNewslettersEnabled)
  }
  const togglePrivacy = () => {
    setPrivacyEnabled(!isPrivacysEnabled)
  }
  const toggleCookie = () => {
    setCookieEnabled(!isCookiesEnabled)
  }
  /**
   "notificationsEnabled": false,
    "cookie": false,
    "privacy": true,
    "newsletter": false,
   */
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar style="light" />
      <Header hasBack={true} title={`Impostazioni`} onPress={() => navigation.goBack()} />
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View style={styles.contentRows}>
          <View style={styles.contentInfo}>
            <BaseText size={20} weight={700} styles={{ marginBottom: 10 }}>{"Promemoria"}</BaseText>
            <BaseText>
              {"Ricevi le notifiche riguardarti gli appuntamenti in programma, come ritardi o variazioni.\nRicevi inoltre promemoria per le prenotazioni, richieste di recensione, informazioni sul prezzo e altri avvisi relativi alle tue attività su BeautyShop."}
            </BaseText>
          </View>
          <View style={styles.contentRowsMain}>
            <View style={styles.switchRow}>
              <BaseText>{"Notifica in App"}</BaseText>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  width: 64,
                  height: 40,
                  borderRadius: 32,
                  //padding: 4,
                  backgroundColor: isNotificationsEnabled
                    ? Colors.light.ARANCIO
                    : Colors.light.grigio,
                  marginRight: 20,
                  justifyContent: "center"
                }}
                onPress={toggleNotifications}
              >
                <View style={{
                  width: 28,
                  height: 28,
                  borderRadius: 32,
                  backgroundColor: Colors.light.bianco,
                  left: isNotificationsEnabled ? 30 : 8,
                }} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentInfo}>
            <BaseText size={20} weight={700} styles={{ marginBottom: 10 }}>{"Calendario"}</BaseText>
            <BaseText>
              {"Aggiungi direttamente sul tuo calendario l’appuntamento fissato. Dimenticarsi, sarà impossibile!"}
            </BaseText>
          </View>
          <View style={styles.contentRowsMain}>
            <View style={styles.switchRow}>
              <BaseText>{"Aggiunta calendario automatica"}</BaseText>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  width: 64,
                  height: 40,
                  borderRadius: 32,
                  backgroundColor: Colors.light.grigio,
                  marginRight: 20,
                  justifyContent: "center"
                }}
                onPress={() => { }}
              >
                <View style={{
                  width: 28,
                  height: 28,
                  borderRadius: 32,
                  backgroundColor: Colors.light.bianco,
                  left: 8,
                }} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentInfo}>
            <BaseText size={20} weight={700} styles={{ marginBottom: 10 }}>{"Aggiornamenti da BeautyShop"}</BaseText>
            <BaseText>
              {"Ricevi notizie promozionali:"}
            </BaseText>
          </View>
          <View style={styles.contentRowsMain}>
            <View style={styles.switchRow}>
              <BaseText>{"Email"}</BaseText>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  width: 64,
                  height: 40,
                  borderRadius: 32,
                  //padding: 4,
                  backgroundColor: isNewslettersEnabled
                    ? Colors.light.ARANCIO
                    : Colors.light.grigio,
                  marginRight: 20,
                  justifyContent: "center"
                }}
                onPress={toggleNewsletter}
              >
                <View style={{
                  width: 28,
                  height: 28,
                  borderRadius: 32,
                  backgroundColor: Colors.light.bianco,
                  left: isNewslettersEnabled ? 30 : 8,
                }} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentInfo}>
            <BaseText size={20} weight={700} styles={{ marginBottom: 10 }}>{"Localizzazione"}</BaseText>
            <BaseText>
              {"Trova facilmente i parrucchieri più vicini a te. Scopri subito quanto distano."}
            </BaseText>
          </View>
          <View style={styles.contentRowsMain}>
            <View style={styles.switchRow}>
              <BaseText>{"Localizzazione"}</BaseText>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  width: 64,
                  height: 40,
                  borderRadius: 32,
                  backgroundColor: Colors.light.grigio,
                  marginRight: 20,
                  justifyContent: "center"
                }}
                onPress={() => { }}
              >
                <View style={{
                  width: 28,
                  height: 28,
                  borderRadius: 32,
                  backgroundColor: Colors.light.bianco,
                  left: 8,
                }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ProfileSettings;

const styles = StyleSheet.create({
  content: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    top: -50,
    backgroundColor: Colors.light.bianco,
    height: Layout.window.height - 180,
  },
  contentRows: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  contentInfo: {
    marginVertical: 20,
    //marginTop: 40
  },
  contentRowsMain: {
    borderBottomColor: "rgba(165, 165, 165, 0.86)",
    borderBottomWidth: 1
  },
  switchRow: {
    marginTop: 20,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    width: "100%"
  }
})
