import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ProfileCommentService } from '../api/profileCommentService';

const ProfileCommentForm = ({ commentTo }) => {
    const validationSchema = Yup.object({
        text: Yup.string()
            .required('Комментарий обязателен')
            .min(3, 'Минимум 3 символа'),
        rating: Yup.number()
            .required('Рейтинг обязателен')
            .min(1, 'Минимум 1')
            .max(5, 'Максимум 5'),
    });

    const initialValues = {
        text: '',
        rating: '',
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const profileCommentW = {
                text: values.text,
                rating: Number(values.rating),  // Преобразуем строку в число
                commentTo,
            };
            const success = await ProfileCommentService.createProfileComment(profileCommentW);
            if (success) {
                Alert.alert('Успех', 'Комментарий отправлен!');
                resetForm();
            } else {
                Alert.alert('Ошибка', 'Не удалось отправить комментарий');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Ошибка', 'Произошла ошибка при отправке комментария');
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.componentContainer}>
                    <TextInput
                        style={[styles.textArea, touched.text && errors.text ? styles.errorInput : null]}
                        placeholder="Введите ваш комментарий"
                        multiline
                        numberOfLines={4}
                        onChangeText={handleChange('text')}
                        onBlur={handleBlur('text')}
                        value={values.text}
                    />
                    {touched.text && errors.text && (
                        <Text style={styles.errorText}>{errors.text}</Text>
                    )}

                    <TextInput
                        style={[styles.input, touched.rating && errors.rating ? styles.errorInput : null]}
                        placeholder="Рейтинг (1-5)"
                        keyboardType="numeric"
                        onChangeText={handleChange('rating')}
                        onBlur={handleBlur('rating')}
                        value={values.rating.toString()}
                    />
                    {touched.rating && errors.rating && (
                        <Text style={styles.errorText}>{errors.rating}</Text>
                    )}

                    <Button title="Отправить" onPress={handleSubmit} />
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    componentContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    textArea: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
        textAlignVertical: 'top',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 8,
    },
});

export default ProfileCommentForm;
