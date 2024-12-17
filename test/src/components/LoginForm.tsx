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
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
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
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                    {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        secureTextEntry
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                    />
                    {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                    <Button title="Login" onPress={handleSubmit} loading={isSubmitting} />
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
