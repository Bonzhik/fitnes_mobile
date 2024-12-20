import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from './Button';
import { AuthService } from '../api/authService';

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
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        height: Yup.number().required('Height is required'),
        weight: Yup.number().required('Weight is required'),
        categoryId: Yup.number().required('Category ID is required'),
    });

    const handleSubmit = async (values: typeof initialValues) => {
        try {
            const response = await AuthService.register({
                ...values,
                height: Number(values.height),
                weigth: Number(values.weight),
                categoryId: Number(values.categoryId),
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
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your first name"
                        onChangeText={handleChange('firstName')}
                        onBlur={handleBlur('firstName')}
                        value={values.firstName}
                    />
                    {touched.firstName && errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your last name"
                        onChangeText={handleChange('lastName')}
                        onBlur={handleBlur('lastName')}
                        value={values.lastName}
                    />
                    {touched.lastName && errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

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

                    <Text style={styles.label}>Height</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your height"
                        keyboardType="numeric"
                        onChangeText={handleChange('height')}
                        onBlur={handleBlur('height')}
                        value={values.height}
                    />
                    {touched.height && errors.height && <Text style={styles.error}>{errors.height}</Text>}

                    <Text style={styles.label}>Weight</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your weight"
                        keyboardType="numeric"
                        onChangeText={handleChange('weight')}
                        onBlur={handleBlur('weight')}
                        value={values.weight}
                    />
                    {touched.weight && errors.weight && <Text style={styles.error}>{errors.weight}</Text>}

                    <Text style={styles.label}>Category ID</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your category ID"
                        keyboardType="numeric"
                        onChangeText={handleChange('categoryId')}
                        onBlur={handleBlur('categoryId')}
                        value={values.categoryId}
                    />
                    {touched.categoryId && errors.categoryId && <Text style={styles.error}>{errors.categoryId}</Text>}

                    <Button title="Register" onPress={handleSubmit} loading={isSubmitting} />
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
