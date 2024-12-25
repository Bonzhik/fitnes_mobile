import React, { useContext } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from './Button'; // общий компонент кнопки
import { AuthService } from '../api/authService'; // Импорт сервиса
import { AuthContext } from '../contexts/AuthContext';

const LoginForm = () => {
    const initialValues = { email: '', password: '' };
    const auth = useContext(AuthContext);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Неправильная почта').required('Почта обязательно'),
        password: Yup.string().min(6, 'Пароль больше 6 символов').required('Пароль обязательно'),
    });

    const handleSubmit = async (values: typeof initialValues) => {
        try {
            const response = await AuthService.login(values);
            auth?.login();

            console.log('Login successful:', response);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                <View style={styles.container}>
                    <Text style={styles.label}>Почта</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите почту"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                    {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                    <Text style={styles.label}>Пароль</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите пароль"
                        secureTextEntry
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                    />
                    {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                    <Button title="Войти" onPress={handleSubmit} loading={isSubmitting} />
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
});

export default LoginForm;
