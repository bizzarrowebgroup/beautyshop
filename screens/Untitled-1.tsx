{/* {!isLogged && (
                        <>
                            <View>
                                <Text style={[styles.text, { marginLeft: 20 }]}>Email</Text>
                                <View style={styles.input}>
                                    <TextInput
                                        value={registerEmail}
                                        onChangeText={e => {
                                            SetRegEmail(e)
                                        }}
                                        style={{ width: "100%", height: "100%", marginLeft: 10, fontFamily: "Montserrat_300Light" }} />
                                    <Ionicons name="ios-mail" size={24} color="black" style={{
                                        position: "absolute",
                                        right: 15,
                                    }} />
                                </View>
                                <Text style={[styles.text, { marginLeft: 20 }]}>Password</Text>
                                <View style={styles.input}>
                                    <TextInput
                                        secureTextEntry={secureText}
                                        value={registerPass}
                                        onChangeText={e => {
                                            SetRegPass(e)
                                        }}
                                        style={{ width: "100%", height: "100%", marginLeft: 10, fontFamily: "Montserrat_300Light" }} />
                                    <Ionicons onPress={() => {
                                        setSecure(!secureText)
                                    }} name="ios-lock" size={24} color="black" style={{
                                        position: "absolute",
                                        right: 15,
                                    }} />
                                </View>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <TouchableOpacity style={styles.btn} onPress={logIn}>
                                    <Text style={[styles.bold, { color: Colors.light.nero, fontSize: 15, marginLeft: 20 }]}>Accedi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btn, {
                                    backgroundColor: Colors.light.bianco
                                }]}>
                                    <Text style={[styles.bold, { color: Colors.light.arancioDes, fontSize: 15, marginLeft: 20 }]}>Registrati con tua Email</Text>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 40, marginVertical: 10, height: 1, backgroundColor: Colors.light.arancioDes }} />
                                <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
                                    <Ionicons.Button
                                        borderRadius={10}
                                        name="logo-google"
                                        backgroundColor="white"
                                        color={Colors.light.arancioDes}
                                        onPress={() => { onPressGoogleLogin() }}>
                                        <Text style={[styles.bold, { position: "absolute", right: 10, color: Colors.light.arancioDes, fontSize: 15, }]}>Accedi con Google</Text>
                                    </Ionicons.Button>
                                </View>
                                {signInWithAppleAvailable && <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
                                    <Ionicons.Button
                                        borderRadius={10}
                                        name="logo-apple"
                                        backgroundColor="black"
                                        onPress={() => { onPressAppleLogin() }}>
                                        <Text style={[styles.bold, { position: "absolute", right: 10, color: Colors.light.bianco, fontSize: 15 }]}>Accedi con Apple</Text>
                                    </Ionicons.Button>
                                </View>}
                                <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
                                    <Ionicons.Button
                                        borderRadius={10}
                                        name="logo-facebook"
                                        backgroundColor="#3b5998"
                                        onPress={() => { console.warn("diocan") }}>
                                        <Text style={[styles.bold, { position: "absolute", right: 10, color: Colors.light.bianco, fontSize: 15 }]}>Accedi con Facebook</Text>
                                    </Ionicons.Button>
                                </View>
                            </View>
                        </>
                    )} */}