import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import RegisterForm from '../../components/RegisterForm'; // Импорт формы регистрации

const RegisterScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <RegisterForm />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Уже есть аккаунт? Войдите</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    linkText: {
        color: '#007BFF',
        textAlign: 'center',
        marginTop: 20,
        textDecorationLine: 'underline',
        fontSize: 14,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
});

export default RegisterScreen;
