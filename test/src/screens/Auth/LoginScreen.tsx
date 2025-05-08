import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigations/AuthStack';
import LoginForm from '../../components/LoginForm';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <LoginForm />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkText}>Еще нет аккаунта? Зарегистрируйтесь</Text>    
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

export default LoginScreen;
