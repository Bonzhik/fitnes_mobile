import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from './Button';
import { AuthService } from '../api/authService';
import { Gender } from '../dtos/dtos';

const RegisterForm = () => {
    const initialValues = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        height: '',
        weight: '',
        categoryId: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Неправильная почта').required('Почта обязательно'),
        password: Yup.string().min(6, 'Пароль больше 6 символов').required('Пароль обязательно'),
        firstName: Yup.string().required('Имя обязательно'),
        lastName: Yup.string().required('Фамилия обязательно'),
        height: Yup.number().required('Рост обязательно'),
        weight: Yup.number().required('Вес обязательно'),
        categoryId: Yup.number().required('Категория обязательно'),
    });

    const handleSubmit = async (values: typeof initialValues) => {
        try {
            const response = await AuthService.register({
                ...values,
                height: Number(values.height),
                weigth: Number(values.weight),
                categoryId: Number(values.categoryId),
                description: '',
                gender: Gender.MALE
            });
            console.log('Registration successful:', response);
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                <View style={styles.container}>
                    <Text style={styles.label}>Имя</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите имя"
                        onChangeText={handleChange('firstName')}
                        onBlur={handleBlur('firstName')}
                        value={values.firstName}
                    />
                    {touched.firstName && errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

                    <Text style={styles.label}>Фамилия</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите фамилию"
                        onChangeText={handleChange('lastName')}
                        onBlur={handleBlur('lastName')}
                        value={values.lastName}
                    />
                    {touched.lastName && errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

                    <Text style={styles.label}>Пчота</Text>
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

                    <Text style={styles.label}>Рост</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите рост"
                        keyboardType="numeric"
                        onChangeText={handleChange('height')}
                        onBlur={handleBlur('height')}
                        value={values.height}
                    />
                    {touched.height && errors.height && <Text style={styles.error}>{errors.height}</Text>}

                    <Text style={styles.label}>Вес</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите вес"
                        keyboardType="numeric"
                        onChangeText={handleChange('weight')}
                        onBlur={handleBlur('weight')}
                        value={values.weight}
                    />
                    {touched.weight && errors.weight && <Text style={styles.error}>{errors.weight}</Text>}

                    <Text style={styles.label}>Категория</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Выберите категорию"
                        keyboardType="numeric"
                        onChangeText={handleChange('categoryId')}
                        onBlur={handleBlur('categoryId')}
                        value={values.categoryId}
                    />
                    {touched.categoryId && errors.categoryId && <Text style={styles.error}>{errors.categoryId}</Text>}

                    <Button title="Зарегистрироваться" onPress={handleSubmit} loading={isSubmitting} />
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

export default RegisterForm;
