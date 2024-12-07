import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import RegisterForm from '../../components/RegisterForm'; // Импорт формы регистрации

const RegisterScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <RegisterForm />
            <Button title="Go To Login" onPress={() => navigation.navigate('Login')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
});

export default RegisterScreen;
