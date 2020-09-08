import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import Form from '../components/Form/Form';
import FormField from '../components/Form/FormField';
import FormButton from '../components/Form/FormButton';
import FormErrorMessage from '../components/Form/FormErrorMessage';
// import IconButton from '../components/IconButton';
import { passwordReset } from '../network/Firebase';
// import useStatusBar from '../hooks/useStatusBar';
import Colors from '../constants/Colors';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .label('Email')
        .email('Enter a valid email')
        .required('Please enter a registered email')
});

const ForgotPasswordScreen = ({ navigation }) => {
    const [customError, setCustomError] = useState('');

    async function handlePasswordReset(values) {
        const { email } = values;

        try {
            await passwordReset(email);
            navigation.navigate('Esplora');
        } catch (error) {
            setCustomError(error.message);
        }
    }
    return (
        <View style={styles.container}>
            <View style={{ marginTop: 50 }}>
                <Form
                    initialValues={{ email: '' }}
                    validationSchema={validationSchema}
                    onSubmit={values => handlePasswordReset(values)}
                >
                    <FormField
                        name="email"
                        leftIcon="email"
                        placeholder="Inserisci email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        autoFocus={true}
                    />
                    <FormButton title="Invia password di recupero" color={Colors.light.arancioDes} />
                    {<FormErrorMessage error={customError} visible={true} />}
                </Form>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: Colors.light.viola
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    }
});

export default ForgotPasswordScreen
